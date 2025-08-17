async function loadTeamLeaderInterface() {
    const content = `
        <div class="row">
            <div class="col-md-3">
                <div class="list-group">
                    <a href="#" class="list-group-item list-group-item-action active" onclick="showTeamLeaderSection('main')">Main</a>
                    <a href="#" class="list-group-item list-group-item-action" onclick="showTeamLeaderSection('setup')">Setup</a>
                </div>
            </div>
            <div class="col-md-9">
                <div id="teamLeaderContent"></div>
            </div>
        </div>
    `;
    
    document.getElementById('roleContent').innerHTML = content;
    showTeamLeaderSection('main');
}

async function showTeamLeaderSection(section) {
    // Update active menu item
    document.querySelectorAll('.list-group-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.classList.add('active');
    
    const contentDiv = document.getElementById('teamLeaderContent');
    
    switch(section) {
        case 'main':
            await loadTeamLeaderMain(contentDiv);
            break;
        case 'setup':
            await loadTeamLeaderSetup(contentDiv);
            break;
    }
}

async function loadTeamLeaderMain(contentDiv) {
    // Get team info for current user
    const { data: team } = await supabase
        .from('teams')
        .select('*')
        .eq('id', currentUser.team_id) // Assume team_id is stored in user
        .single();
        
    const { data: participants } = await supabase
        .from('participants')
        .select('*, categories(name)')
        .eq('team_id', team?.id);
    
    contentDiv.innerHTML = `
        <h3>Welcome, ${currentUser.username}</h3>
        <div class="alert alert-info">
            <h5>Latest Updates & Alerts</h5>
            <p>No new updates at this time.</p>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h5>Team Participants (${team?.name || 'Unknown Team'})</h5>
            </div>
            <div class="card-body">
                <div class="row">
                    ${await generateParticipantsByCategory(participants)}
                </div>
            </div>
        </div>
    `;
}

async function generateParticipantsByCategory(participants) {
    const categories = {};
    
    participants?.forEach(participant => {
        const categoryName = participant.categories.name;
        if (!categories[categoryName]) {
            categories[categoryName] = [];
        }
        categories[categoryName].push(participant);
    });
    
    let html = '';
    for (const [categoryName, categoryParticipants] of Object.entries(categories)) {
        html += `
            <div class="col-md-6 mb-3">
                <h6>${categoryName}</h6>
                <ul class="list-group">
                    ${categoryParticipants.map(p => `
                        <li class="list-group-item">${p.name}</li>
                    `).join('')}
                </ul>
            </div>
        `;
    }
    
    return html;
}

async function loadTeamLeaderSetup(contentDiv) {
    // Check if user has setup access
    const { data: access } = await supabase
        .from('team_leader_access')
        .select('can_access_setup')
        .eq('team_leader_id', currentUser.id)
        .single();
        
    if (!access?.can_access_setup) {
        contentDiv.innerHTML = `
            <div class="alert alert-warning">
                <h5>Access Restricted</h5>
                <p>You don't have permission to access the setup section. Please contact an administrator.</p>
            </div>
        `;
        return;
    }
    
    contentDiv.innerHTML = `
        <h3>Participant Registration</h3>
        <div class="card">
            <div class="card-header">
                <h5>Register Participant to Competition</h5>
            </div>
            <div class="card-body">
                <form id="registerParticipantForm">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="mb-3">
                                <select class="form-select" id="participantSelect" required>
                                    <option value="">Select Participant</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3">
                                <select class="form-select" id="competitionSelect" required>
                                    <option value="">Select Competition</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Register</button>
                </form>
            </div>
        </div>
        
        <div class="card mt-4">
            <div class="card-header">
                <h5>Registered Participants</h5>
            </div>
            <div class="card-body">
                <div id="registeredParticipants"></div>
            </div>
        </div>
    `;
    
    await loadTeamLeaderData();
    setupTeamLeaderForms();
}

async function loadTeamLeaderData() {
    // Load team participants
    const { data: participants } = await supabase
        .from('participants')
        .select('*')
        .eq('team_id', currentUser.team_id);
        
    const participantSelect = document.getElementById('participantSelect');
    participantSelect.innerHTML = '<option value="">Select Participant</option>';
    participants?.forEach(participant => {
        const option = document.createElement('option');
        option.value = participant.id;
        option.textContent = participant.name;
        participantSelect.appendChild(option);
    });
    
    // Load competitions
    const { data: competitions } = await supabase
        .from('competitions')
        .select('*');
        
    const competitionSelect = document.getElementById('competitionSelect');
    competitionSelect.innerHTML = '<option value="">Select Competition</option>';
    competitions?.forEach(competition => {
        const option = document.createElement('option');
        option.value = competition.id;
        option.textContent = competition.name;
        competitionSelect.appendChild(option);
    });
    
    await loadRegisteredParticipants();
}

async function loadRegisteredParticipants() {
    const { data: registered } = await supabase
        .from('competition_participants')
        .select(`
            *,
            participants(name),
            competitions(name)
        `)
        .eq('participants.team_id', currentUser.team_id);
    
    const tableHTML = `
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Participant</th>
                    <th>Competition</th>
                    <th>Main Participant</th>
                </tr>
            </thead>
            <tbody>
                ${registered?.map(reg => `
                    <tr>
                        <td>${reg.participants.name}</td>
                        <td>${reg.competitions.name}</td>
                        <td>${reg.is_main_participant ? 'Yes' : 'No'}</td>
                    </tr>
                `).join('') || '<tr><td colspan="3">No registrations found</td></tr>'}
            </tbody>
        </table>
    `;
    
    document.getElementById('registeredParticipants').innerHTML = tableHTML;
}

function setupTeamLeaderForms() {
    document.getElementById('registerParticipantForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const participantId = document.getElementById('participantSelect').value;
        const competitionId = document.getElementById('competitionSelect').value;
        
        const { error } = await supabase
            .from('competition_participants')
            .insert([{
                competition_id: competitionId,
                participant_id: participantId,
                is_main_participant: true
            }]);
            
        if (error) {
            showAlert('Error registering participant: ' + error.message, 'danger');
        } else {
            showAlert('Participant registered successfully!', 'success');
            e.target.reset();
            await loadRegisteredParticipants();
        }
    });
}
