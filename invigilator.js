async function loadInvigilatorInterface() {
    const content = `
        <h3>Invigilator Dashboard</h3>
        <div id="invigilatorContent">
            <div class="card">
                <div class="card-header">
                    <h5>My Assigned Competitions</h5>
                </div>
                <div class="card-body">
                    <div id="assignedCompetitions"></div>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('roleContent').innerHTML = content;
    await loadInvigilatorCompetitions();
}

async function loadInvigilatorCompetitions() {
    // Get invigilator record
    const { data: invigilator } = await supabase
        .from('invigilators')
        .select('id')
        .eq('user_id', currentUser.id)
        .single();
        
    if (!invigilator) {
        document.getElementById('assignedCompetitions').innerHTML = '<p>No invigilator record found.</p>';
        return;
    }
    
    // Get assigned competitions
    const { data: schedules } = await supabase
        .from('schedule_invigilators')
        .select(`
            *,
            schedules(*, competitions(name))
        `)
        .eq('invigilator_id', invigilator.id);
    
    if (!schedules || schedules.length === 0) {
        document.getElementById('assignedCompetitions').innerHTML = '<p>No competitions assigned.</p>';
        return;
    }
    
    // Sort by schedule date
    schedules.sort((a, b) => new Date(a.schedules.scheduled_date) - new Date(b.schedules.scheduled_date));
    
    const competitionsHTML = schedules.map(schedule => `
        <div class="card mb-3">
            <div class="card-body">
                <h6>${schedule.schedules.competitions.name}</h6>
                <p><strong>Stage:</strong> ${schedule.schedules.stage_number}</p>
                <p><strong>Date:</strong> ${new Date(schedule.schedules.scheduled_date).toLocaleString()}</p>
                <button class="btn btn-primary" onclick="openCompetitionReporting(${schedule.schedules.competition_id}, '${schedule.schedules.competitions.name}')">
                    Report Participants
                </button>
            </div>
        </div>
    `).join('');
    
    document.getElementById('assignedCompetitions').innerHTML = competitionsHTML;
}

async function openCompetitionReporting(competitionId, competitionName) {
    const content = `
        <div class="card">
            <div class="card-header">
                <h5>${competitionName} - Report Participants</h5>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                        <h6>Manual Entry</h6>
                        <form id="manualParticipantForm">
                            <div class="mb-3">
                                <select class="form-select" id="participantSelect" required>
                                    <option value="">Select Participant</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <input type="text" class="form-control" id="chessNumber" placeholder="Chess Number" required>
                            </div>
                            <button type="submit" class="btn btn-primary">Report Participant</button>
                        </form>
                    </div>
                    <div class="col-md-6">
                        <h6>QR Scanner</h6>
                        <div id="qr-reader" style="width: 100%; height: 200px;"></div>
                        <button id="startScan" class="btn btn-success mt-2">Start QR Scan</button>
                    </div>
                </div>
                
                <div class="mt-4">
                    <h6>Code Letter Assignment</h6>
                    <div class="btn-group" role="group">
                        <input type="radio" class="btn-check" name="codeMethod" id="alphabetic" value="alphabetic" checked>
                        <label class="btn btn-outline-primary" for="alphabetic">Alphabetic Order</label>
                        
                        <input type="radio" class="btn-check" name="codeMethod" id="random" value="random">
                        <label class="btn btn-outline-primary" for="random">Random on Submit</label>
                    </div>
                </div>
                
                <div class="mt-4">
                    <h6>Reported Participants</h6>
                    <div id="reportedParticipants"></div>
                </div>
                
                <div class="mt-3">
                    <button class="btn btn-success" onclick="submitReports(${competitionId})">Submit All Reports</button>
                    <button class="btn btn-secondary" onclick="loadInvigilatorInterface()">Back</button>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('invigilatorContent').innerHTML = content;
    await loadCompetitionParticipants(competitionId);
    setupQRScanner();
    setupParticipantReporting(competitionId);
}

async function loadCompetitionParticipants(competitionId) {
    const { data: participants } = await supabase
        .from('competition_participants')
        .select(`
            *,
            participants(name)
        `)
        .eq('competition_id', competitionId);
    
    const select = document.getElementById('participantSelect');
    select.innerHTML = '<option value="">Select Participant</option>';
    
    participants?.forEach(cp => {
        const option = document.createElement('option');
        option.value = cp.participant_id;
        option.textContent = cp.participants.name;
        select.appendChild(option);
    });
}

let reportedParticipants = [];

function setupParticipantReporting(competitionId) {
    document.getElementById('manualParticipantForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const participantId = document.getElementById('participantSelect').value;
        const chessNumber = document.getElementById('chessNumber').value;
        
        // Get participant name
        const { data: participant } = await supabase
            .from('participants')
            .select('name')
            .eq('id', participantId)
            .single();
            
        // Add to reported list
        const codeMethod = document.querySelector('input[name="codeMethod"]:checked').value;
        let codeLetter = '';
        
        if (codeMethod === 'alphabetic') {
            codeLetter = String.fromCharCode(65 + reportedParticipants.length); // A, B, C...
        }
        
        reportedParticipants.push({
            participantId,
            participantName: participant.name,
            chessNumber,
            codeLetter
        });
        
        updateReportedParticipantsList();
        e.target.reset();
    });
}

function updateReportedParticipantsList() {
    const tableHTML = `
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Participant</th>
                    <th>Chess Number</th>
                    <th>Code Letter</th>
                </tr>
            </thead>
            <tbody>
                ${reportedParticipants.map(p => `
                    <tr>
                        <td>${p.participantName}</td>
                        <td>${p.chessNumber}</td>
                        <td>${p.codeLetter}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    
    document.getElementById('reportedParticipants').innerHTML = tableHTML;
}

function setupQRScanner() {
    let html5QrcodeScanner = null;
    
    document.getElementById('startScan').addEventListener('click', () => {
        if (html5QrcodeScanner) {
            html5QrcodeScanner.clear();
        }
        
        html5QrcodeScanner = new Html5QrcodeScanner(
            "qr-reader", 
            { fps: 10, qrbox: 250 }
        );
        
        html5QrcodeScanner.render((decodedText) => {
            // Assuming QR contains chess number
            document.getElementById('chessNumber').value = decodedText;
            html5QrcodeScanner.clear();
        });
    });
}

async function submitReports(competitionId) {
    if (reportedParticipants.length === 0) {
        showAlert('No participants reported!', 'warning');
        return;
    }
    
    const codeMethod = document.querySelector('input[name="codeMethod"]:checked').value;
    
    // If random method, assign random code letters now
    if (codeMethod === 'random') {
        const letters = [];
        for (let i = 0; i < reportedParticipants.length; i++) {
            letters.push(String.fromCharCode(65 + i));
        }
        
        // Shuffle the letters
        for (let i = letters.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [letters[i], letters[j]] = [letters[j], letters[i]];
        }
        
        reportedParticipants.forEach((participant, index) => {
            participant.codeLetter = letters[index];
        });
        
        updateReportedParticipantsList();
    }
    
    // Save to database
    try {
        for (const participant of reportedParticipants) {
            const { error } = await supabase
                .from('results')
                .insert([{
                    competition_id: competitionId,
                    participant_id: participant.participantId,
                    code_letter: participant.codeLetter,
                    score: 0, // Will be updated by judge
                    result_status: 'pending'
                }]);
                
            if (error) {
                console.error('Error saving participant:', error);
            }
        }
        
        showAlert('All participants reported successfully!', 'success');
        setTimeout(() => {
            loadInvigilatorInterface();
        }, 2000);
        
    } catch (error) {
        showAlert('Error submitting reports: ' + error.message, 'danger');
    }
}
