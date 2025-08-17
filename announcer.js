async function loadAnnouncerInterface() {
    const content = `
        <h3>Announcer Dashboard</h3>
        <div class="row">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">
                        <h5>Pending Results</h5>
                    </div>
                    <div class="card-body">
                        <div id="pendingResults"></div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">
                        <h5>Published Results</h5>
                    </div>
                    <div class="card-body">
                        <div id="publishedResults"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('roleContent').innerHTML = content;
    await loadAnnouncerResults();
}

async function loadAnnouncerResults() {
    // Load submitted results (pending publication)
    const { data: pendingResults } = await supabase
        .from('results')
        .select(`
            *,
            competitions(name),
            participants(name)
        `)
        .eq('result_status', 'submitted');
    
    // Group by competition
    const groupedPending = {};
    pendingResults?.forEach(result => {
        const compName = result.competitions.name;
        if (!groupedPending[compName]) {
            groupedPending[compName] = [];
        }
        groupedPending[compName].push(result);
    });
    
    let pendingHTML = '';
    for (const [compName, results] of Object.entries(groupedPending)) {
        pendingHTML += `
            <div class="card mb-3">
                <div class="card-body">
                    <h6>${compName}</h6>
                    <p>Results ready: ${results.length}</p>
                    <button class="btn btn-primary btn-sm" onclick="previewResults('${compName}', ${JSON.stringify(results.map(r => r.competition_id)).replace(/"/g, '&quot;')})">
                        Preview
                    </button>
                    <button class="btn btn-success btn-sm" onclick="publishResults('${compName}', ${JSON.stringify(results.map(r => r.competition_id)).replace(/"/g, '&quot;')})">
                        Publish
                    </button>
                </div>
            </div>
        `;
    }
    
    if (pendingHTML === '') {
        pendingHTML = '<p>No pending results.</p>';
    }
    
    document.getElementById('pendingResults').innerHTML = pendingHTML;
    
    // Load published results
    const { data: publishedResults } = await supabase
        .from('results')
        .select(`
            *,
            competitions(name),
            participants(name)
        `)
        .eq('result_status', 'published');
    
    const groupedPublished = {};
    publishedResults?.forEach(result => {
        const compName = result.competitions.name;
        if (!groupedPublished[compName]) {
            groupedPublished[compName] = [];
        }
        groupedPublished[compName].push(result);
    });
    
    let publishedHTML = '';
    for (const [compName, results] of Object.entries(groupedPublished)) {
        publishedHTML += `
            <div class="card mb-3">
                <div class="card-body">
                    <h6>${compName}</h6>
                    <p>Published: ${results.length} results</p>
                    <small class="text-muted">Published on: ${new Date(results[0].created_at).toLocaleDateString()}</small>
                </div>
            </div>
        `;
    }
    
    if (publishedHTML === '') {
        publishedHTML = '<p>No published results.</p>';
    }
    
    document.getElementById('publishedResults').innerHTML = publishedHTML;
}

async function previewResults(competitionName, competitionIds) {
    const competitionId = competitionIds[0]; // Assuming single competition
    
    const { data: results } = await supabase
        .from('results')
        .select(`
            *,
            participants(name, teams(name))
        `)
        .eq('competition_id', competitionId)
        .eq('result_status', 'submitted')
        .order('score', { ascending: false });
    
    const modalHTML = `
        <div class="modal fade" id="previewModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${competitionName} - Results Preview</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Position</th>
                                    <th>Participant</th>
                                    <th>Team</th>
                                    <th>Score</th>
                                    <th>Grade</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${results?.map((result, index) => `
                                    <tr>
                                        <td>${index + 1}</td>
                                        <td>${result.participants.name}</td>
                                        <td>${result.participants.teams.name}</td>
                                        <td>${result.score}</td>
                                        <td>${result.grade}</td>
                                    </tr>
                                `).join('') || '<tr><td colspan="5">No results found</td></tr>'}
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-success" onclick="publishResults('${competitionName}', [${competitionId}])" data-bs-dismiss="modal">Publish</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('previewModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    const modal = new bootstrap.Modal(document.getElementById('previewModal'));
    modal.show();
}

async function publishResults(competitionName, competitionIds) {
    const competitionId = competitionIds[0];
    
    try {
        const { error } = await supabase
            .from('results')
            .update({ result_status: 'published' })
            .eq('competition_id', competitionId)
            .eq('result_status', 'submitted');
            
        if (error) {
            showAlert('Error publishing results: ' + error.message, 'danger');
        } else {
            showAlert(`Results for ${competitionName} published successfully!`, 'success');
            await loadAnnouncerResults();
        }
        
    } catch (error) {
        showAlert('Error publishing results: ' + error.message, 'danger');
    }
}
