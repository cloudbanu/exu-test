// Fix the showAdminSection function to handle event properly
async function showAdminSection(section) {
    // Update active menu item
    document.querySelectorAll('.list-group-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Find the clicked element
    const clickedElement = event ? event.target : document.querySelector('.list-group-item');
    if (clickedElement) {
        clickedElement.classList.add('active');
    }
    
    const contentDiv = document.getElementById('adminContent');
    
    switch(section) {
        case 'dashboard':
            await loadAdminDashboard(contentDiv);
            break;
        case 'setup':
            await loadAdminSetup(contentDiv);
            break;
        case 'schedule':
            await loadAdminSchedule(contentDiv);
            break;
        case 'results':
            await loadAdminResults(contentDiv);
            break;
        case 'settings':
            await loadAdminSettings(contentDiv);
            break;
    }
}

async function loadAdminInterface() {
    const content = `
        <div class="row">
            <div class="col-md-3">
                <div class="list-group">
                    <a href="#" class="list-group-item list-group-item-action active" onclick="showAdminSection('dashboard')">Dashboard</a>
                    <a href="#" class="list-group-item list-group-item-action" onclick="showAdminSection('setup')">Setup</a>
                    <a href="#" class="list-group-item list-group-item-action" onclick="showAdminSection('schedule')">Schedule</a>
                    <a href="#" class="list-group-item list-group-item-action" onclick="showAdminSection('results')">Results</a>
                    <a href="#" class="list-group-item list-group-item-action" onclick="showAdminSection('settings')">Settings</a>
                </div>
            </div>
            <div class="col-md-9">
                <div id="adminContent"></div>
            </div>
        </div>
    `;
    
    document.getElementById('roleContent').innerHTML = content;
    showAdminSection('dashboard');
}

async function showAdminSection(section) {
    // Update active menu item
    document.querySelectorAll('.list-group-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.classList.add('active');
    
    const contentDiv = document.getElementById('adminContent');
    
    switch(section) {
        case 'dashboard':
            await loadAdminDashboard(contentDiv);
            break;
        case 'setup':
            await loadAdminSetup(contentDiv);
            break;
        case 'schedule':
            await loadAdminSchedule(contentDiv);
            break;
        case 'results':
            await loadAdminResults(contentDiv);
            break;
        case 'settings':
            await loadAdminSettings(contentDiv);
            break;
    }
}

async function loadAdminDashboard(contentDiv) {
    // Fetch dashboard data
    const { data: competitions } = await supabase.from('competitions').select('*');
    const { data: results } = await supabase.from('results').select('*');
    
    const totalCompetitions = competitions?.length || 0;
    const completedCompetitions = results?.filter(r => r.result_status === 'published').length || 0;
    const pendingResults = results?.filter(r => r.result_status === 'pending').length || 0;
    
    contentDiv.innerHTML = `
        <h3>Admin Dashboard</h3>
        <div class="row g-4">
            <div class="col-md-3">
                <div class="card text-center">
                    <div class="card-body">
                        <h5 class="card-title">${totalCompetitions}</h5>
                        <p class="card-text">Total Competitions</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card text-center">
                    <div class="card-body">
                        <h5 class="card-title">${completedCompetitions}</h5>
                        <p class="card-text">Completed</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card text-center">
                    <div class="card-body">
                        <h5 class="card-title">${totalCompetitions - completedCompetitions}</h5>
                        <p class="card-text">Pending</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card text-center">
                    <div class="card-body">
                        <h5 class="card-title">${pendingResults}</h5>
                        <p class="card-text">Pending Results</p>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="mt-4">
            <h5>Team Point Status</h5>
            <div id="teamPointStatus"></div>
        </div>
    `;
    
    await loadTeamPointStatus();
}

async function loadTeamPointStatus() {
    // Complex query to calculate team points
    const { data: teams } = await supabase.from('teams').select('*');
    const teamPoints = [];
    
    for (const team of teams || []) {
        const { data: participants } = await supabase
            .from('participants')
            .select('id')
            .eq('team_id', team.id);
            
        let totalPoints = 0;
        for (const participant of participants || []) {
            const { data: results } = await supabase
                .from('results')
                .select('grade, score')
                .eq('participant_id', participant.id)
                .eq('result_status', 'published');
                
            for (const result of results || []) {
                totalPoints += await calculatePoints(result.grade);
            }
        }
        
        teamPoints.push({ name: team.name, points: totalPoints });
    }
    
    teamPoints.sort((a, b) => b.points - a.points);
    
    const tableHTML = `
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Team</th>
                    <th>Points</th>
                </tr>
            </thead>
            <tbody>
                ${teamPoints.map((team, index) => `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${team.name}</td>
                        <td>${team.points}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    
    document.getElementById('teamPointStatus').innerHTML = tableHTML;
}

async function loadAdminSetup(contentDiv) {
    contentDiv.innerHTML = `
        <h3>Setup</h3>
        <div class="row">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">
                        <h5>Create Team</h5>
                    </div>
                    <div class="card-body">
                        <form id="createTeamForm">
                            <div class="mb-3">
                                <input type="text" class="form-control" id="teamName" placeholder="Team Name" required>
                            </div>
                            <div class="mb-3">
                                <input type="password" class="form-control" id="teamPassword" placeholder="Team Password" required>
                            </div>
                            <button type="submit" class="btn btn-primary">Create Team</button>
                        </form>
                    </div>
                </div>
                
                <div class="card mt-3">
                    <div class="card-header">
                        <h5>Add Category</h5>
                    </div>
                    <div class="card-body">
                        <form id="addCategoryForm">
                            <div class="mb-3">
                                <input type="text" class="form-control" id="categoryName" placeholder="Category Name" required>
                            </div>
                            <div class="mb-3">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="isGeneral">
                                    <label class="form-check-label" for="isGeneral">
                                        General Category
                                    </label>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary">Add Category</button>
                        </form>
                    </div>
                </div>
            </div>
            
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">
                        <h5>Create Judge</h5>
                    </div>
                    <div class="card-body">
                        <form id="createJudgeForm">
                            <div class="mb-3">
                                <input type="text" class="form-control" id="judgeUsername" placeholder="Username" required>
                            </div>
                            <div class="mb-3">
                                <input type="text" class="form-control" id="judgeName" placeholder="Judge Name" required>
                            </div>
                            <div class="mb-3">
                                <input type="password" class="form-control" id="judgePassword" placeholder="Password" required>
                            </div>
                            <button type="submit" class="btn btn-primary">Create Judge</button>
                        </form>
                    </div>
                </div>
                
                <div class="card mt-3">
                    <div class="card-header">
                        <h5>Add Competition</h5>
                    </div>
                    <div class="card-body">
                        <form id="addCompetitionForm">
                            <div class="mb-3">
                                <input type="text" class="form-control" id="competitionName" placeholder="Competition Name" required>
                            </div>
                            <div class="mb-3">
                                <select class="form-select" id="competitionCategory" required>
                                    <option value="">Select Category</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="isGroup">
                                    <label class="form-check-label" for="isGroup">
                                        Group Competition
                                    </label>
                                </div>
                            </div>
                            <div class="mb-3">
                                <input type="number" class="form-control" id="maxParticipants" placeholder="Max Participants" value="1" min="1">
                            </div>
                            <button type="submit" class="btn btn-primary">Add Competition</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    await loadCategories();
    setupAdminForms();
}

async function loadCategories() {
    const { data: categories } = await supabase.from('categories').select('*');
    const select = document.getElementById('competitionCategory');
    select.innerHTML = '<option value="">Select Category</option>';
    
    categories?.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        select.appendChild(option);
    });
}

function setupAdminForms() {
    // Team creation form
    document.getElementById('createTeamForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('teamName').value;
        const password = document.getElementById('teamPassword').value;
        
        const { error } = await supabase
            .from('teams')
            .insert([{ name, team_password: password }]);
            
        if (error) {
            showAlert('Error creating team: ' + error.message, 'danger');
        } else {
            showAlert('Team created successfully!', 'success');
            e.target.reset();
        }
    });
    
    // Category form
    document.getElementById('addCategoryForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('categoryName').value;
        const isGeneral = document.getElementById('isGeneral').checked;
        
        const { error } = await supabase
            .from('categories')
            .insert([{ name, is_general: isGeneral }]);
            
        if (error) {
            showAlert('Error adding category: ' + error.message, 'danger');
        } else {
            showAlert('Category added successfully!', 'success');
            e.target.reset();
            await loadCategories();
        }
    });
    
    // Judge creation form
    document.getElementById('createJudgeForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('judgeUsername').value;
        const name = document.getElementById('judgeName').value;
        const password = document.getElementById('judgePassword').value;
        
        // Create user first
        const { data: user, error: userError } = await supabase
            .from('users')
            .insert([{ username, password_hash: password, role: 'judge' }])
            .select()
            .single();
            
        if (userError) {
            showAlert('Error creating judge user: ' + userError.message, 'danger');
            return;
        }
        
        // Create judge record
        const { error: judgeError } = await supabase
            .from('judges')
            .insert([{ user_id: user.id, name }]);
            
        if (judgeError) {
            showAlert('Error creating judge: ' + judgeError.message, 'danger');
        } else {
            showAlert('Judge created successfully!', 'success');
            e.target.reset();
        }
    });
    
    // Competition form
    document.getElementById('addCompetitionForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('competitionName').value;
        const categoryId = document.getElementById('competitionCategory').value;
        const isGroup = document.getElementById('isGroup').checked;
        const maxParticipants = document.getElementById('maxParticipants').value;
        
        const { error } = await supabase
            .from('competitions')
            .insert([{ 
                name, 
                category_id: categoryId, 
                is_group: isGroup, 
                max_participants: parseInt(maxParticipants)
            }]);
            
        if (error) {
            showAlert('Error adding competition: ' + error.message, 'danger');
        } else {
            showAlert('Competition added successfully!', 'success');
            e.target.reset();
        }
    });
}

async function loadAdminSchedule(contentDiv) {
    contentDiv.innerHTML = `
        <h3>Schedule Management</h3>
        <div class="row">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">
                        <h5>Create Schedule</h5>
                    </div>
                    <div class="card-body">
                        <form id="scheduleForm">
                            <div class="mb-3">
                                <select class="form-select" id="scheduleCompetition" required>
                                    <option value="">Select Competition</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <input type="number" class="form-control" id="stageNumber" placeholder="Stage Number" required>
                            </div>
                            <div class="mb-3">
                                <input type="datetime-local" class="form-control" id="scheduledDate" required>
                            </div>
                            <button type="submit" class="btn btn-primary">Create Schedule</button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">
                        <h5>Assign Invigilator</h5>
                    </div>
                    <div class="card-body">
                        <form id="assignInvigilatorForm">
                            <div class="mb-3">
                                <select class="form-select" id="scheduleSelect" required>
                                    <option value="">Select Schedule</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <select class="form-select" id="invigilatorSelect" required>
                                    <option value="">Select Invigilator</option>
                                </select>
                            </div>
                            <button type="submit" class="btn btn-primary">Assign</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    await loadScheduleData();
    setupScheduleForms();
}

async function loadScheduleData() {
    // Load competitions
    const { data: competitions } = await supabase.from('competitions').select('*');
    const competitionSelect = document.getElementById('scheduleCompetition');
    competitionSelect.innerHTML = '<option value="">Select Competition</option>';
    competitions?.forEach(comp => {
        const option = document.createElement('option');
        option.value = comp.id;
        option.textContent = comp.name;
        competitionSelect.appendChild(option);
    });
    
    // Load schedules
    const { data: schedules } = await supabase
        .from('schedules')
        .select('*, competitions(name)');
    const scheduleSelect = document.getElementById('scheduleSelect');
    scheduleSelect.innerHTML = '<option value="">Select Schedule</option>';
    schedules?.forEach(schedule => {
        const option = document.createElement('option');
        option.value = schedule.id;
        option.textContent = `${schedule.competitions.name} - Stage ${schedule.stage_number}`;
        scheduleSelect.appendChild(option);
    });
    
    // Load invigilators
    const { data: invigilators } = await supabase.from('invigilators').select('*');
    const invigilatorSelect = document.getElementById('invigilatorSelect');
    invigilatorSelect.innerHTML = '<option value="">Select Invigilator</option>';
    invigilators?.forEach(inv => {
        const option = document.createElement('option');
        option.value = inv.id;
        option.textContent = inv.name;
        invigilatorSelect.appendChild(option);
    });
}

function setupScheduleForms() {
    document.getElementById('scheduleForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const competitionId = document.getElementById('scheduleCompetition').value;
        const stageNumber = document.getElementById('stageNumber').value;
        const scheduledDate = document.getElementById('scheduledDate').value;
        
        const { error } = await supabase
            .from('schedules')
            .insert([{
                competition_id: competitionId,
                stage_number: parseInt(stageNumber),
                scheduled_date: scheduledDate
            }]);
            
        if (error) {
            showAlert('Error creating schedule: ' + error.message, 'danger');
        } else {
            showAlert('Schedule created successfully!', 'success');
            e.target.reset();
            await loadScheduleData();
        }
    });
    
    document.getElementById('assignInvigilatorForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const scheduleId = document.getElementById('scheduleSelect').value;
        const invigilatorId = document.getElementById('invigilatorSelect').value;
        
        const { error } = await supabase
            .from('schedule_invigilators')
            .insert([{
                schedule_id: scheduleId,
                invigilator_id: invigilatorId
            }]);
            
        if (error) {
            showAlert('Error assigning invigilator: ' + error.message, 'danger');
        } else {
            showAlert('Invigilator assigned successfully!', 'success');
            e.target.reset();
        }
    });
}

async function loadAdminResults(contentDiv) {
    contentDiv.innerHTML = `
        <h3>Results (Password Protected)</h3>
        <div class="card">
            <div class="card-body">
                <form id="resultsPasswordForm">
                    <div class="mb-3">
                        <input type="password" class="form-control" id="resultsPassword" placeholder="Enter Password" required>
                    </div>
                    <button type="submit" class="btn btn-primary">Access Results</button>
                </form>
            </div>
        </div>
        <div id="resultsContent" class="mt-4" style="display: none;"></div>
    `;
    
    document.getElementById('resultsPasswordForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const password = document.getElementById('resultsPassword').value;
        
        if (password === 'admin123') { // Change this to your desired password
            document.getElementById('resultsContent').style.display = 'block';
            await loadResultsContent();
        } else {
            showAlert('Invalid password', 'danger');
        }
    });
}

async function loadResultsContent() {
    const resultsContent = document.getElementById('resultsContent');
    resultsContent.innerHTML = `
        <div class="row">
            <div class="col-md-4">
                <div class="card">
                    <div class="card-header">
                        <h5>Kalaprathipa</h5>
                        <small>Top scorer in stage items (non-general)</small>
                    </div>
                    <div class="card-body" id="kalaprathipa"></div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card">
                    <div class="card-header">
                        <h5>Sargaprathipa</h5>
                        <small>Top scorer in non-stage items (non-general)</small>
                    </div>
                    <div class="card-body" id="sargaprathipa"></div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card">
                    <div class="card-header">
                        <h5>Overall Champion</h5>
                        <small>Highest total points</small>
                    </div>
                    <div class="card-body" id="overallChampion"></div>
                </div>
            </div>
        </div>
    `;
    
    // Load the special awards (this would require more complex queries)
    await loadSpecialAwards();
}

async function loadSpecialAwards() {
    // This is a simplified version - you'd need to implement the logic
    // to categorize competitions as stage/non-stage items
    const teamPointStatus = document.getElementById('teamPointStatus');
    if (teamPointStatus && teamPointStatus.innerHTML) {
        const champion = teamPointStatus.querySelector('tbody tr:first-child td:nth-child(2)');
        if (champion) {
            document.getElementById('overallChampion').innerHTML = `<h4>${champion.textContent}</h4>`;
            document.getElementById('kalaprathipa').innerHTML = `<h4>${champion.textContent}</h4>`;
            document.getElementById('sargaprathipa').innerHTML = `<h4>${champion.textContent}</h4>`;
        }
    }
}

async function loadAdminSettings(contentDiv) {
    contentDiv.innerHTML = `
        <h3>Settings</h3>
        <div class="card">
            <div class="card-header">
                <h5>Team Leader Access</h5>
            </div>
            <div class="card-body">
                <form id="teamLeaderAccessForm">
                    <div class="mb-3">
                        <select class="form-select" id="teamLeaderSelect" required>
                            <option value="">Select Team Leader</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="canAccessSetup">
                            <label class="form-check-label" for="canAccessSetup">
                                Can Access Setup
                            </label>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Update Access</button>
                </form>
            </div>
        </div>
    `;
    
    // Load team leaders
    const { data: teamLeaders } = await supabase
        .from('users')
        .select('*')
        .eq('role', 'team_leader');
        
    const select = document.getElementById('teamLeaderSelect');
    teamLeaders?.forEach(leader => {
        const option = document.createElement('option');
        option.value = leader.id;
        option.textContent = leader.username;
        select.appendChild(option);
    });
    
    document.getElementById('teamLeaderAccessForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const teamLeaderId = document.getElementById('teamLeaderSelect').value;
        const canAccessSetup = document.getElementById('canAccessSetup').checked;
        
        const { error } = await supabase
            .from('team_leader_access')
            .upsert([{
                team_leader_id: teamLeaderId,
                can_access_setup: canAccessSetup
            }]);
            
        if (error) {
            showAlert('Error updating access: ' + error.message, 'danger');
        } else {
            showAlert('Access updated successfully!', 'success');
        }
    });
}
