async function loadJudgeInterface() {
    const content = `
        <h3>Judge Dashboard</h3>
        <div id="judgeContent">
            <div class="card">
                <div class="card-header">
                    <h5>Pending Results</h5>
                </div>
                <div class="card-body">
                    <div id="pendingResults"></div>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('roleContent').innerHTML = content;
    await loadJudgePendingResults();
}

async function loadJudgePendingResults() {
    // Get judge record
    const { data: judge } = await supabase
        .from('judges')
        .select('id')
        .eq('user_id', currentUser.id)
        .single();
        
    if (!judge) {
        document.getElementById('pendingResults').innerHTML = '<p>No judge record found.</p>';
        return;
    }
    
    // Get assigned competitions with pending results
    const { data: assignments } = await supabase
        .from('judge_assignments')
        .select(`
            *,
            competitions(id, name)
        `)
        .eq('judge_id', judge.id);
    
    if (!assignments || assignments.length === 0) {
        document.getElementById('pendingResults').innerHTML = '<p>No competitions assigned.</p>';
        return;
    }
    
    let pendingHTML = '';
    
    for (const assignment of assignments) {
        // Check if there are reported participants for this competition
        const { data: results } = await supabase
            .from('results')
            .select('*, participants(name)')
            .eq('competition_id', assignment.competitions.id)
            .eq('result_status', 'pending');
            
        if (results && results.length > 0) {
            pendingHTML += `
                <div class="card mb-3">
                    <div class="card-body">
                        <h6>${assignment.competitions.name}</h6>
                        <p>Participants reported: ${results.length}</p>
                        <button class="btn btn-primary" onclick="openPointEntry(${assignment.competitions.id}, '${assignment.competitions.name}')">
                            Enter Points
                        </button>
                    </div>
                </div>
            `;
        }
    }
    
    if (pendingHTML === '') {
        pendingHTML = '<p>No pending results to judge.</p>';
    }
    
    document.getElementById('pendingResults').innerHTML = pendingHTML;
}

async function openPointEntry(competitionId, competitionName) {
    const { data: results } = await supabase
        .from('results')
        .select('*, participants(name)')
        .eq('competition_id', competitionId)
        .eq('result_status', 'pending')
        .order('code_letter');
    
    const content = `
        <div class="card">
            <div class="card-header">
                <h5>${competitionName} - Point Entry</h5>
            </div>
            <div class="card-body">
                <form id="pointEntryForm">
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Code Letter</th>
                                    <th>Points (out of 100)</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${results?.map(result => `
                                    <tr>
                                        <td><strong>${result.code_letter}</strong></td>
                                        <td>
                                            <input type="number" 
                                                   class="form-control" 
                                                   id="points_${result.id}"
                                                   min="0" 
                                                   max="100" 
                                                   value="${result.score || ''}"
                                                   required>
                                        </td>
                                    </tr>
                                `).join('') || '<tr><td colspan="2">No participants found</td></tr>'}
                            </tbody>
                        </table>
                    </div>
                    
                    <div class="mt-3">
                        <button type="submit" class="btn btn-success">Submit All Points</button>
                        <button type="button" class="btn btn-secondary" onclick="loadJudgeInterface()">Back</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.getElementById('judgeContent').innerHTML = content;
    
    document.getElementById('pointEntryForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        try {
            for (const result of results || []) {
                const pointsInput = document.getElementById(`points_${result.id}`);
                const points = parseInt(pointsInput.value);
                const grade = calculateGrade(points);
                
                const { error } = await supabase
                    .from('results')
                    .update({
                        score: points,
                        grade: grade,
                        result_status: 'submitted'
                    })
                    .eq('id', result.id);
                    
                if (error) {
                    console.error('Error updating result:', error);
                }
            }
            
            showAlert('Points submitted successfully!', 'success');
            setTimeout(() => {
                loadJudgeInterface();
            }, 2000);
            
        } catch (error) {
            showAlert('Error submitting points: ' + error.message, 'danger');
        }
    });
}
