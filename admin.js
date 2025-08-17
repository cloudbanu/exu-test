// Admin functionality
function loadAdminContent(content) {
    content.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Navigation Cards -->
            <div class="bg-white p-6 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow" onclick="showSetup()">
                <div class="flex items-center">
                    <div class="bg-blue-100 p-3 rounded-lg">
                        <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                    </div>
                    <div class="ml-4">
                        <h3 class="text-lg font-semibold text-gray-800">Setup</h3>
                        <p class="text-gray-600 text-sm">Manage teams, judges, competitions</p>
                    </div>
                </div>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow" onclick="showDashboard()">
                <div class="flex items-center">
                    <div class="bg-green-100 p-3 rounded-lg">
                        <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                        </svg>
                    </div>
                    <div class="ml-4">
                        <h3 class="text-lg font-semibold text-gray-800">Dashboard</h3>
                        <p class="text-gray-600 text-sm">View statistics and status</p>
                    </div>
                </div>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow" onclick="showResults()">
                <div class="flex items-center">
                    <div class="bg-yellow-100 p-3 rounded-lg">
                        <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <div class="ml-4">
                        <h3 class="text-lg font-semibold text-gray-800">Results</h3>
                        <p class="text-gray-600 text-sm">View competition results</p>
                    </div>
                </div>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow" onclick="showSchedule()">
                <div class="flex items-center">
                    <div class="bg-purple-100 p-3 rounded-lg">
                        <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                    </div>
                    <div class="ml-4">
                        <h3 class="text-lg font-semibold text-gray-800">Schedule</h3>
                        <p class="text-gray-600 text-sm">Manage competition schedule</p>
                    </div>
                </div>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow" onclick="showSettings()">
                <div class="flex items-center">
                    <div class="bg-gray-100 p-3 rounded-lg">
                        <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>
                        </svg>
                    </div>
                    <div class="ml-4">
                        <h3 class="text-lg font-semibold text-gray-800">Settings</h3>
                        <p class="text-gray-600 text-sm">Application settings</p>
                    </div>
                </div>
            </div>
        </div>

        <div id="adminContent" class="mt-8">
            <!-- Dynamic admin content will be loaded here -->
        </div>
    `;
    
    showDashboard(); // Show dashboard by default
}

async function showSetup() {
    const adminContent = document.getElementById('adminContent');
    adminContent.innerHTML = `
        <div class="bg-white rounded-lg shadow-sm">
            <div class="border-b border-gray-200">
                <nav class="flex space-x-8" aria-label="Tabs">
                    <button class="admin-tab-btn active" data-tab="teams">Teams</button>
                    <button class="admin-tab-btn" data-tab="categories">Categories</button>
                    <button class="admin-tab-btn" data-tab="participants">Participants</button>
                    <button class="admin-tab-btn" data-tab="competitions">Competitions</button>
                    <button class="admin-tab-btn" data-tab="invigilators">Invigilators</button>
                    <button class="admin-tab-btn" data-tab="judges">Judges</button>
                </nav>
            </div>
            <div class="p-6">
                <div id="setupContent">
                    <!-- Setup content will be loaded here -->
                </div>
            </div>
        </div>
    `;
    
    // Add tab functionality
    const tabBtns = document.querySelectorAll('.admin-tab-btn');
    tabBtns.forEach(btn => {
        btn.className = 'py-2 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300';
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => {
                b.className = 'py-2 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300';
            });
            btn.className = 'py-2 px-1 border-b-2 font-medium text-sm border-blue-500 text-blue-600';
            loadSetupTab(btn.dataset.tab);
        });
    });
    
    // Set active tab
    document.querySelector('[data-tab="teams"]').className = 'py-2 px-1 border-b-2 font-medium text-sm border-blue-500 text-blue-600';
    loadSetupTab('teams');
}

async function loadSetupTab(tab) {
    const setupContent = document.getElementById('setupContent');
    
    switch (tab) {
        case 'teams':
            await loadTeamsSetup(setupContent);
            break;
        case 'categories':
            await loadCategoriesSetup(setupContent);
            break;
        case 'participants':
            await loadParticipantsSetup(setupContent);
            break;
        case 'competitions':
            await loadCompetitionsSetup(setupContent);
            break;
        case 'invigilators':
            await loadInvigilatorsSetup(setupContent);
            break;
        case 'judges':
            await loadJudgesSetup(setupContent);
            break;
    }
}

async function loadTeamsSetup(content) {
    const { data: teams, error } = await supabase.from('teams').select('*').order('created_at', { ascending: false });
    
    content.innerHTML = `
        <div class="mb-6">
            <h3 class="text-lg font-semibold mb-4">Create Team</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <input type="text" id="teamName" placeholder="Team Name" class="p-3 border rounded-lg">
                <input type="password" id="teamPassword" placeholder="Team Password" class="p-3 border rounded-lg">
                <button onclick="createTeam()" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">Create Team</button>
            </div>
        </div>
        
        <div>
            <h3 class="text-lg font-semibold mb-4">Teams (${teams?.length || 0})</h3>
            <div class="overflow-x-auto">
                <table class="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr class="bg-gray-50">
                            <th class="border border-gray-300 px-4 py-2 text-left">Name</th>
                            <th class="border border-gray-300 px-4 py-2 text-left">Points</th>
                            <th class="border border-gray-300 px-4 py-2 text-left">Leader Access</th>
                            <th class="border border-gray-300 px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${teams?.map(team => `
                            <tr>
                                <td class="border border-gray-300 px-4 py-2">${team.name}</td>
                                <td class="border border-gray-300 px-4 py-2">${team.total_points}</td>
                                <td class="border border-gray-300 px-4 py-2">
                                    <span class="px-2 py-1 text-xs rounded ${team.leader_access ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                                        ${team.leader_access ? 'Enabled' : 'Disabled'}
                                    </span>
                                </td>
                                <td class="border border-gray-300 px-4 py-2">
                                    <button onclick="toggleLeaderAccess(${team.id}, ${!team.leader_access})" 
                                            class="text-sm px-3 py-1 rounded ${team.leader_access ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}">
                                        ${team.leader_access ? 'Disable' : 'Enable'}
                                    </button>
                                </td>
                            </tr>
                        `).join('') || '<tr><td colspan="4" class="text-center py-4 text-gray-500">No teams found</td></tr>'}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

async function createTeam() {
    const name = document.getElementById('teamName').value.trim();
    const password = document.getElementById('teamPassword').value.trim();
    
    if (!name || !password) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    const { data, error } = await supabase
        .from('teams')
        .insert({ name, password });
    
    if (error) {
        showNotification('Failed to create team', 'error');
        return;
    }
    
    showNotification('Team created successfully');
    loadSetupTab('teams');
}

async function toggleLeaderAccess(teamId, access) {
    const { error } = await supabase
        .from('teams')
        .update({ leader_access: access })
        .eq('id', teamId);
    
    if (error) {
        showNotification('Failed to update team access', 'error');
        return;
    }
    
    showNotification('Team access updated');
    loadSetupTab('teams');
}

// Continue with other setup functions...
async function showDashboard() {
    const adminContent = document.getElementById('adminContent');
    
    // Fetch dashboard statistics
    const [competitions, results, teams] = await Promise.all([
        supabase.from('competitions').select('*'),
        supabase.from('results').select('*'),
        supabase.from('teams').select('*')
    ]);
    
    const totalCompetitions = competitions.data?.length || 0;
    const completedCompetitions = competitions.data?.filter(c => c.status === 'completed').length || 0;
    const pendingResults = results.data?.filter(r => r.status === 'pending').length || 0;
    
    adminContent.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div class="bg-white p-6 rounded-lg shadow-sm">
                <div class="flex items-center">
                    <div class="bg-blue-100 p-3 rounded-lg">
                        <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                        </svg>
                    </div>
                    <div class="ml-4">
                        <p class="text-2xl font-bold text-gray-800">${totalCompetitions}</p>
                        <p class="text-gray-600 text-sm">Total Competitions</p>
                    </div>
                </div>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow-sm">
                <div class="flex items-center">
                    <div class="bg-green-100 p-3 rounded-lg">
                        <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <div class="ml-4">
                        <p class="text-2xl font-bold text-gray-800">${completedCompetitions}</p>
                        <p class="text-gray-600 text-sm">Completed</p>
                    </div>
                </div>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow-sm">
                <div class="flex items-center">
                    <div class="bg-yellow-100 p-3 rounded-lg">
                        <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <div class="ml-4">
                        <p class="text-2xl font-bold text-gray-800">${totalCompetitions - completedCompetitions}</p>
                        <p class="text-gray-600 text-sm">Pending</p>
                    </div>
                </div>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow-sm">
                <div class="flex items-center">
                    <div class="bg-red-100 p-3 rounded-lg">
                        <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                        </svg>
                    </div>
                    <div class="ml-4">
                        <p class="text-2xl font-bold text-gray-800">${pendingResults}</p>
                        <p class="text-gray-600 text-sm">Pending Results</p>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="bg-white p-6 rounded-lg shadow-sm">
                <h3 class="text-lg font-semibold mb-4">Team Points Status</h3>
                <div class="space-y-2">
                    ${teams.data?.sort((a, b) => b.total_points - a.total_points).slice(0, 5).map((team, index) => `
                        <div class="flex justify-between items-center p-2 rounded ${index === 0 ? 'bg-yellow-50' : ''}">
                            <span class="font-medium">${index + 1}. ${team.name}</span>
                            <span class="font-bold text-blue-600">${team.total_points} pts</span>
                        </div>
                    `).join('') || '<p class="text-gray-500">No teams found</p>'}
                </div>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow-sm">
                <h3 class="text-lg font-semibold mb-4">Recent Activities</h3>
                <div class="space-y-2">
                    <p class="text-sm text-gray-600">Dashboard loaded successfully</p>
                    <p class="text-sm text-gray-600">System status: Active</p>
                </div>
            </div>
        </div>
    `;
}

// Admin functionality - Complete implementation
function loadAdminContent(content) {
    content.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Navigation Cards -->
            <div class="bg-white p-6 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow" onclick="showSetup()">
                <div class="flex items-center">
                    <div class="bg-blue-100 p-3 rounded-lg">
                        <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                    </div>
                    <div class="ml-4">
                        <h3 class="text-lg font-semibold text-gray-800">Setup</h3>
                        <p class="text-gray-600 text-sm">Manage teams, judges, competitions</p>
                    </div>
                </div>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow" onclick="showDashboard()">
                <div class="flex items-center">
                    <div class="bg-green-100 p-3 rounded-lg">
                        <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                        </svg>
                    </div>
                    <div class="ml-4">
                        <h3 class="text-lg font-semibold text-gray-800">Dashboard</h3>
                        <p class="text-gray-600 text-sm">View statistics and status</p>
                    </div>
                </div>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow" onclick="showResults()">
                <div class="flex items-center">
                    <div class="bg-yellow-100 p-3 rounded-lg">
                        <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <div class="ml-4">
                        <h3 class="text-lg font-semibold text-gray-800">Results</h3>
                        <p class="text-gray-600 text-sm">View competition results</p>
                    </div>
                </div>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow" onclick="showSchedule()">
                <div class="flex items-center">
                    <div class="bg-purple-100 p-3 rounded-lg">
                        <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                    </div>
                    <div class="ml-4">
                        <h3 class="text-lg font-semibold text-gray-800">Schedule</h3>
                        <p class="text-gray-600 text-sm">Manage competition schedule</p>
                    </div>
                </div>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow" onclick="showSettings()">
                <div class="flex items-center">
                    <div class="bg-gray-100 p-3 rounded-lg">
                        <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>
                        </svg>
                    </div>
                    <div class="ml-4">
                        <h3 class="text-lg font-semibold text-gray-800">Settings</h3>
                        <p class="text-gray-600 text-sm">Application settings</p>
                    </div>
                </div>
            </div>
        </div>

        <div id="adminContent" class="mt-8">
            <!-- Dynamic admin content will be loaded here -->
        </div>
    `;
    
    showDashboard(); // Show dashboard by default
}

async function showSetup() {
    const adminContent = document.getElementById('adminContent');
    adminContent.innerHTML = `
        <div class="bg-white rounded-lg shadow-sm">
            <div class="border-b border-gray-200">
                <nav class="flex space-x-8" aria-label="Tabs">
                    <button class="admin-tab-btn active" data-tab="teams">Teams</button>
                    <button class="admin-tab-btn" data-tab="categories">Categories</button>
                    <button class="admin-tab-btn" data-tab="participants">Participants</button>
                    <button class="admin-tab-btn" data-tab="competitions">Competitions</button>
                    <button class="admin-tab-btn" data-tab="invigilators">Invigilators</button>
                    <button class="admin-tab-btn" data-tab="judges">Judges</button>
                </nav>
            </div>
            <div class="p-6">
                <div id="setupContent">
                    <!-- Setup content will be loaded here -->
                </div>
            </div>
        </div>
    `;
    
    // Add tab functionality
    const tabBtns = document.querySelectorAll('.admin-tab-btn');
    tabBtns.forEach(btn => {
        btn.className = 'py-2 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300';
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => {
                b.className = 'py-2 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300';
            });
            btn.className = 'py-2 px-1 border-b-2 font-medium text-sm border-blue-500 text-blue-600';
            loadSetupTab(btn.dataset.tab);
        });
    });
    
    // Set active tab
    document.querySelector('[data-tab="teams"]').className = 'py-2 px-1 border-b-2 font-medium text-sm border-blue-500 text-blue-600';
    loadSetupTab('teams');
}

async function loadSetupTab(tab) {
    const setupContent = document.getElementById('setupContent');
    
    switch (tab) {
        case 'teams':
            await loadTeamsSetup(setupContent);
            break;
        case 'categories':
            await loadCategoriesSetup(setupContent);
            break;
        case 'participants':
            await loadParticipantsSetup(setupContent);
            break;
        case 'competitions':
            await loadCompetitionsSetup(setupContent);
            break;
        case 'invigilators':
            await loadInvigilatorsSetup(setupContent);
            break;
        case 'judges':
            await loadJudgesSetup(setupContent);
            break;
    }
}

async function loadTeamsSetup(content) {
    const { data: teams, error } = await supabase.from('teams').select('*').order('created_at', { ascending: false });
    
    content.innerHTML = `
        <div class="mb-6">
            <h3 class="text-lg font-semibold mb-4">Create Team</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <input type="text" id="teamName" placeholder="Team Name" class="p-3 border rounded-lg">
                <input type="password" id="teamPassword" placeholder="Team Password" class="p-3 border rounded-lg">
                <button onclick="createTeam()" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">Create Team</button>
            </div>
        </div>
        
        <div>
            <h3 class="text-lg font-semibold mb-4">Teams (${teams?.length || 0})</h3>
            <div class="overflow-x-auto">
                <table class="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr class="bg-gray-50">
                            <th class="border border-gray-300 px-4 py-2 text-left">Name</th>
                            <th class="border border-gray-300 px-4 py-2 text-left">Points</th>
                            <th class="border border-gray-300 px-4 py-2 text-left">Leader Access</th>
                            <th class="border border-gray-300 px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${teams?.map(team => `
                            <tr>
                                <td class="border border-gray-300 px-4 py-2">${team.name}</td>
                                <td class="border border-gray-300 px-4 py-2">${team.total_points}</td>
                                <td class="border border-gray-300 px-4 py-2">
                                    <span class="px-2 py-1 text-xs rounded ${team.leader_access ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                                        ${team.leader_access ? 'Enabled' : 'Disabled'}
                                    </span>
                                </td>
                                <td class="border border-gray-300 px-4 py-2">
                                    <button onclick="toggleLeaderAccess(${team.id}, ${!team.leader_access})" 
                                            class="text-sm px-3 py-1 rounded mr-2 ${team.leader_access ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}">
                                        ${team.leader_access ? 'Disable' : 'Enable'}
                                    </button>
                                    <button onclick="deleteTeam(${team.id})" class="text-sm px-3 py-1 bg-red-500 text-white rounded">Delete</button>
                                </td>
                            </tr>
                        `).join('') || '<tr><td colspan="4" class="text-center py-4 text-gray-500">No teams found</td></tr>'}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

async function createTeam() {
    const name = document.getElementById('teamName').value.trim();
    const password = document.getElementById('teamPassword').value.trim();
    
    if (!name || !password) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    const { data, error } = await supabase
        .from('teams')
        .insert({ name, password });
    
    if (error) {
        showNotification('Failed to create team', 'error');
        return;
    }
    
    showNotification('Team created successfully');
    document.getElementById('teamName').value = '';
    document.getElementById('teamPassword').value = '';
    loadSetupTab('teams');
}

async function toggleLeaderAccess(teamId, access) {
    const { error } = await supabase
        .from('teams')
        .update({ leader_access: access })
        .eq('id', teamId);
    
    if (error) {
        showNotification('Failed to update team access', 'error');
        return;
    }
    
    showNotification('Team access updated');
    loadSetupTab('teams');
}

async function deleteTeam(teamId) {
    if (!confirm('Are you sure you want to delete this team? This will also delete all associated participants.')) {
        return;
    }
    
    const { error } = await supabase
        .from('teams')
        .delete()
        .eq('id', teamId);
    
    if (error) {
        showNotification('Failed to delete team', 'error');
        return;
    }
    
    showNotification('Team deleted successfully');
    loadSetupTab('teams');
}

async function loadCategoriesSetup(content) {
    const { data: categories, error } = await supabase.from('categories').select('*').order('created_at', { ascending: false });
    
    content.innerHTML = `
        <div class="mb-6">
            <h3 class="text-lg font-semibold mb-4">Create Category</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input type="text" id="categoryName" placeholder="Category Name" class="p-3 border rounded-lg">
                <div class="flex items-center space-x-4">
                    <label class="flex items-center">
                        <input type="checkbox" id="isGeneral" class="mr-2">
                        <span class="text-sm">General Category</span>
                    </label>
                    <label class="flex items-center">
                        <input type="checkbox" id="isStage" class="mr-2">
                        <span class="text-sm">Stage Item</span>
                    </label>
                    <button onclick="createCategory()" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">Create</button>
                </div>
            </div>
        </div>
        
        <div>
            <h3 class="text-lg font-semibold mb-4">Categories (${categories?.length || 0})</h3>
            <div class="overflow-x-auto">
                <table class="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr class="bg-gray-50">
                            <th class="border border-gray-300 px-4 py-2 text-left">Name</th>
                            <th class="border border-gray-300 px-4 py-2 text-left">Type</th>
                            <th class="border border-gray-300 px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${categories?.map(category => `
                            <tr>
                                <td class="border border-gray-300 px-4 py-2">${category.name}</td>
                                <td class="border border-gray-300 px-4 py-2">
                                    <span class="px-2 py-1 text-xs rounded mr-1 ${category.is_general ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}">
                                        ${category.is_general ? 'General' : 'Regular'}
                                    </span>
                                    ${category.is_stage ? '<span class="px-2 py-1 text-xs rounded bg-purple-100 text-purple-800">Stage</span>' : ''}
                                </td>
                                <td class="border border-gray-300 px-4 py-2">
                                    <button onclick="deleteCategory(${category.id})" class="text-sm px-3 py-1 bg-red-500 text-white rounded">Delete</button>
                                </td>
                            </tr>
                        `).join('') || '<tr><td colspan="3" class="text-center py-4 text-gray-500">No categories found</td></tr>'}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

async function createCategory() {
    const name = document.getElementById('categoryName').value.trim();
    const isGeneral = document.getElementById('isGeneral').checked;
    const isStage = document.getElementById('isStage').checked;
    
    if (!name) {
        showNotification('Please enter category name', 'error');
        return;
    }
    
    const { data, error } = await supabase
        .from('categories')
        .insert({ name, is_general: isGeneral, is_stage: isStage });
    
    if (error) {
        showNotification('Failed to create category', 'error');
        return;
    }
    
    showNotification('Category created successfully');
    document.getElementById('categoryName').value = '';
    document.getElementById('isGeneral').checked = false;
    document.getElementById('isStage').checked = false;
    loadSetupTab('categories');
}

async function deleteCategory(categoryId) {
    if (!confirm('Are you sure you want to delete this category?')) {
        return;
    }
    
    const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', categoryId);
    
    if (error) {
        showNotification('Failed to delete category', 'error');
        return;
    }
    
    showNotification('Category deleted successfully');
    loadSetupTab('categories');
}

async function loadParticipantsSetup(content) {
    const [participants, teams, categories] = await Promise.all([
        supabase.from('participants').select('*, teams(name), categories(name)').order('created_at', { ascending: false }),
        supabase.from('teams').select('*'),
        supabase.from('categories').select('*')
    ]);
    
    content.innerHTML = `
        <div class="mb-6">
            <h3 class="text-lg font-semibold mb-4">Add Participant</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                <input type="text" id="participantName" placeholder="Participant Name" class="p-3 border rounded-lg">
                <select id="participantTeam" class="p-3 border rounded-lg">
                    <option value="">Select Team</option>
                    ${teams.data?.map(team => `<option value="${team.id}">${team.name}</option>`).join('') || ''}
                </select>
                <select id="participantCategory" class="p-3 border rounded-lg">
                    <option value="">Select Category</option>
                    ${categories.data?.map(cat => `<option value="${cat.id}">${cat.name}</option>`).join('') || ''}
                </select>
                <input type="text" id="chestNumber" placeholder="Chest Number" class="p-3 border rounded-lg">
                <button onclick="addParticipant()" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">Add</button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Maximum Registrations:</label>
                    <input type="number" id="maxRegistrations" value="3" min="1" class="p-3 border rounded-lg w-full">
                </div>
            </div>
        </div>
        
        <div>
            <h3 class="text-lg font-semibold mb-4">Participants (${participants.data?.length || 0})</h3>
            <div class="overflow-x-auto">
                <table class="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr class="bg-gray-50">
                            <th class="border border-gray-300 px-4 py-2 text-left">Name</th>
                            <th class="border border-gray-300 px-4 py-2 text-left">Team</th>
                            <th class="border border-gray-300 px-4 py-2 text-left">Category</th>
                            <th class="border border-gray-300 px-4 py-2 text-left">Chest No.</th>
                            <th class="border border-gray-300 px-4 py-2 text-left">Registrations</th>
                            <th class="border border-gray-300 px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${participants.data?.map(participant => `
                            <tr>
                                <td class="border border-gray-300 px-4 py-2">${participant.name}</td>
                                <td class="border border-gray-300 px-4 py-2">${participant.teams?.name || 'N/A'}</td>
                                <td class="border border-gray-300 px-4 py-2">${participant.categories?.name || 'N/A'}</td>
                                <td class="border border-gray-300 px-4 py-2">${participant.chest_number || 'N/A'}</td>
                                <td class="border border-gray-300 px-4 py-2">${participant.current_registrations}/${participant.max_registrations}</td>
                                <td class="border border-gray-300 px-4 py-2">
                                    <button onclick="deleteParticipant(${participant.id})" class="text-sm px-3 py-1 bg-red-500 text-white rounded">Delete</button>
                                </td>
                            </tr>
                        `).join('') || '<tr><td colspan="6" class="text-center py-4 text-gray-500">No participants found</td></tr>'}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

async function addParticipant() {
    const name = document.getElementById('participantName').value.trim();
    const teamId = document.getElementById('participantTeam').value;
    const categoryId = document.getElementById('participantCategory').value;
    const chestNumber = document.getElementById('chestNumber').value.trim();
    const maxRegistrations = parseInt(document.getElementById('maxRegistrations').value);
    
    if (!name || !teamId || !categoryId) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    const { data, error } = await supabase
        .from('participants')
        .insert({ 
            name, 
            team_id: parseInt(teamId), 
            category_id: parseInt(categoryId),
            chest_number: chestNumber || null,
            max_registrations: maxRegistrations || 3
        });
    
    if (error) {
        showNotification('Failed to add participant', 'error');
        return;
    }
    
    showNotification('Participant added successfully');
    document.getElementById('participantName').value = '';
    document.getElementById('participantTeam').value = '';
    document.getElementById('participantCategory').value = '';
    document.getElementById('chestNumber').value = '';
    document.getElementById('maxRegistrations').value = '3';
    loadSetupTab('participants');
}

async function deleteParticipant(participantId) {
    if (!confirm('Are you sure you want to delete this participant?')) {
        return;
    }
    
    const { error } = await supabase
        .from('participants')
        .delete()
        .eq('id', participantId);
    
    if (error) {
        showNotification('Failed to delete participant', 'error');
        return;
    }
    
    showNotification('Participant deleted successfully');
    loadSetupTab('participants');
}

async function loadCompetitionsSetup(content) {
    const [competitions, categories] = await Promise.all([
        supabase.from('competitions').select('*, categories(name)').order('created_at', { ascending: false }),
        supabase.from('categories').select('*')
    ]);
    
    content.innerHTML = `
        <div class="mb-6">
            <h3 class="text-lg font-semibold mb-4">Create Competition</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <input type="text" id="competitionName" placeholder="Competition Name" class="p-3 border rounded-lg">
                <select id="competitionCategory" class="p-3 border rounded-lg">
                    <option value="">Select Category</option>
                    ${categories.data?.map(cat => `<option value="${cat.id}">${cat.name}</option>`).join('') || ''}
                </select>
                <div class="flex items-center">
                    <label class="flex items-center">
                        <input type="checkbox" id="isGroupItem" class="mr-2">
                        <span class="text-sm">Group Item</span>
                    </label>
                </div>
                <button onclick="createCompetition()" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">Create</button>
            </div>
        </div>
        
        <div>
            <h3 class="text-lg font-semibold mb-4">Competitions (${competitions.data?.length || 0})</h3>
            <div class="overflow-x-auto">
                <table class="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr class="bg-gray-50">
                            <th class="border border-gray-300 px-4 py-2 text-left">Name</th>
                            <th class="border border-gray-300 px-4 py-2 text-left">Category</th>
                            <th class="border border-gray-300 px-4 py-2 text-left">Type</th>
                            <th class="border border-gray-300 px-4 py-2 text-left">Status</th>
                            <th class="border border-gray-300 px-4 py-2 text-left">Stage</th>
                            <th class="border border-gray-300 px-4 py-2 text-left">Schedule</th>
                            <th class="border border-gray-300 px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${competitions.data?.map(comp => `
                            <tr>
                                <td class="border border-gray-300 px-4 py-2">${comp.name}</td>
                                <td class="border border-gray-300 px-4 py-2">${comp.categories?.name || 'N/A'}</td>
                                <td class="border border-gray-300 px-4 py-2">
                                    <span class="px-2 py-1 text-xs rounded ${comp.is_group_item ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}">
                                        ${comp.is_group_item ? 'Group' : 'Individual'}
                                    </span>
                                </td>
                                <td class="border border-gray-300 px-4 py-2">
                                    <span class="px-2 py-1 text-xs rounded ${getStatusColor(comp.status)}">
                                        ${comp.status}
                                    </span>
                                </td>
                                <td class="border border-gray-300 px-4 py-2">${comp.stage_number || 'N/A'}</td>
                                <td class="border border-gray-300 px-4 py-2">${comp.scheduled_at ? new Date(comp.scheduled_at).toLocaleDateString() : 'Not scheduled'}</td>
                                <td class="border border-gray-300 px-4 py-2">
                                    <button onclick="deleteCompetition(${comp.id})" class="text-sm px-3 py-1 bg-red-500 text-white rounded">Delete</button>
                                </td>
                            </tr>
                        `).join('') || '<tr><td colspan="7" class="text-center py-4 text-gray-500">No competitions found</td></tr>'}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function getStatusColor(status) {
    switch (status) {
        case 'pending': return 'bg-yellow-100 text-yellow-800';
        case 'ongoing': return 'bg-blue-100 text-blue-800';
        case 'completed': return 'bg-green-100 text-green-800';
        default: return 'bg-gray-100 text-gray-800';
    }
}

async function createCompetition() {
    const name = document.getElementById('competitionName').value.trim();
    const categoryId = document.getElementById('competitionCategory').value;
    const isGroupItem = document.getElementById('isGroupItem').checked;
    
    if (!name || !categoryId) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    const { data, error } = await supabase
        .from('competitions')
        .insert({ 
            name, 
            category_id: parseInt(categoryId),
            is_group_item: isGroupItem
        });
    
    if (error) {
        showNotification('Failed to create competition', 'error');
        return;
    }
    
    showNotification('Competition created successfully');
    document.getElementById('competitionName').value = '';
    document.getElementById('competitionCategory').value = '';
    document.getElementById('isGroupItem').checked = false;
    loadSetupTab('competitions');
}

async function deleteCompetition(competitionId) {
    if (!confirm('Are you sure you want to delete this competition?')) {
        return;
    }
    
    const { error } = await supabase
        .from('competitions')
        .delete()
        .eq('id', competitionId);
    
    if (error) {
        showNotification('Failed to delete competition', 'error');
        return;
    }
    
    showNotification('Competition deleted successfully');
    loadSetupTab('competitions');
}

async function loadInvigilatorsSetup(content) {
    const { data: invigilators, error } = await supabase.from('invigilators').select('*').order('created_at', { ascending: false });
    
    content.innerHTML = `
        <div class="mb-6">
            <h3 class="text-lg font-semibold mb-4">Create Invigilator</h3>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <input type="text" id="invigilatorName" placeholder="Name" class="p-3 border rounded-lg">
                <input type="text" id="invigilatorUsername" placeholder="Username" class="p-3 border rounded-lg">
                <input type="password" id="invigilatorPassword" placeholder="Password" class="p-3 border rounded-lg">
                <button onclick="createInvigilator()" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">Create</button>
            </div>
        </div>
        
        <div>
            <h3 class="text-lg font-semibold mb-4">Invigilators (${invigilators?.length || 0})</h3>
            <div class="overflow-x-auto">
                <table class="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr class="bg-gray-50">
                            <th class="border border-gray-300 px-4 py-2 text-left">Name</th>
                            <th class="border border-gray-300 px-4 py-2 text-left">Username</th>
                            <th class="border border-gray-300 px-4 py-2 text-left">Created</th>
                            <th class="border border-gray-300 px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${invigilators?.map(invigilator => `
                            <tr>
                                <td class="border border-gray-300 px-4 py-2">${invigilator.name}</td>
                                <td class="border border-gray-300 px-4 py-2">${invigilator.username}</td>
                                <td class="border border-gray-300 px-4 py-2">${new Date(invigilator.created_at).toLocaleDateString()}</td>
                                <td class="border border-gray-300 px-4 py-2">
                                    <button onclick="deleteInvigilator(${invigilator.id})" class="text-sm px-3 py-1 bg-red-500 text-white rounded">Delete</button>
                                </td>
                            </tr>
                        `).join('') || '<tr><td colspan="4" class="text-center py-4 text-gray-500">No invigilators found</td></tr>'}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

async function createInvigilator() {
    const name = document.getElementById('invigilatorName').value.trim();
    const username = document.getElementById('invigilatorUsername').value.trim();
    const password = document.getElementById('invigilatorPassword').value.trim();
    
    if (!name || !username || !password) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    const { data, error } = await supabase
        .from('invigilators')
        .insert({ name, username, password });
    
    if (error) {
        showNotification('Failed to create invigilator', 'error');
        return;
    }
    
    showNotification('Invigilator created successfully');
    document.getElementById('invigilatorName').value = '';
    document.getElementById('invigilatorUsername').value = '';
    document.getElementById('invigilatorPassword').value = '';
    loadSetupTab('invigilators');
}

async function deleteInvigilator(invigilatorId) {
    if (!confirm('Are you sure you want to delete this invigilator?')) {
        return;
    }
    
    const { error } = await supabase
        .from('invigilators')
        .delete()
        .eq('id', invigilatorId);
    
    if (error) {
        showNotification('Failed to delete invigilator', 'error');
        return;
    }
    
    showNotification('Invigilator deleted successfully');
    loadSetupTab('invigilators');
}

async function loadJudgesSetup(content) {
    const [judges, competitions, assignments] = await Promise.all([
        supabase.from('judges').select('*').order('created_at', { ascending: false }),
        supabase.from('competitions').select('*'),
        supabase.from('competition_judges').select('*, competitions(name), judges(name)')
    ]);
    
    content.innerHTML = `
        <div class="mb-6">
            <h3 class="text-lg font-semibold mb-4">Create Judge</h3>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <input type="text" id="judgeName" placeholder="Name" class="p-3 border rounded-lg">
                <input type="text" id="judgeUsername" placeholder="Username" class="p-3 border rounded-lg">
                <input type="password" id="judgePassword" placeholder="Password" class="p-3 border rounded-lg">
                <button onclick="createJudge()" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">Create</button>
            </div>
        </div>
        
        <div class="mb-6">
            <h3 class="text-lg font-semibold mb-4">Assign Judge to Competition</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <select id="assignJudge" class="p-3 border rounded-lg">
                    <option value="">Select Judge</option>
                    ${judges.data?.map(judge => `<option value="${judge.id}">${judge.name}</option>`).join('') || ''}
                </select>
                <select id="assignCompetition" class="p-3 border rounded-lg">
                    <option value="">Select Competition</option>
                    ${competitions.data?.map(comp => `<option value="${comp.id}">${comp.name}</option>`).join('') || ''}
                </select>
                <button onclick="assignJudgeToCompetition()" class="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">Assign</button>
            </div>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
                <h3 class="text-lg font-semibold mb-4">Judges (${judges.data?.length || 0})</h3>
                <div class="overflow-x-auto">
                    <table class="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr class="bg-gray-50">
                                <th class="border border-gray-300 px-4 py-2 text-left">Name</th>
                                <th class="border border-gray-300 px-4 py-2 text-left">Username</th>
                                <th class="border border-gray-300 px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${judges.data?.map(judge => `
                                <tr>
                                    <td class="border border-gray-300 px-4 py-2">${judge.name}</td>
                                    <td class="border border-gray-300 px-4 py-2">${judge.username}</td>
                                    <td class="border border-gray-300 px-4 py-2">
                                        <button onclick="deleteJudge(${judge.id})" class="text-sm px-3 py-1 bg-red-500 text-white rounded">Delete</button>
                                    </td>
                                </tr>
                            `).join('') || '<tr><td colspan="3" class="text-center py-4 text-gray-500">No judges found</td></tr>'}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div>
                <h3 class="text-lg font-semibold mb-4">Judge Assignments (${assignments.data?.length || 0})</h3>
                <div class="overflow-x-auto">
                    <table class="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr class="bg-gray-50">
                                <th class="border border-gray-300 px-4 py-2 text-left">Judge</th>
                                <th class="border border-gray-300 px-4 py-2 text-left">Competition</th>
                                <th class="border border-gray-300 px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${assignments.data?.map(assignment => `
                                <tr>
                                    <td class="border border-gray-300 px-4 py-2">${assignment.judges?.name}</td>
                                    <td class="border border-gray-300 px-4 py-2">${assignment.competitions?.name}</td>
                                    <td class="border border-gray-300 px-4 py-2">
                                        <button onclick="removeJudgeAssignment(${assignment.id})" class="text-sm px-3 py-1 bg-red-500 text-white rounded">Remove</button>
                                    </td>
                                </tr>
                            `).join('') || '<tr><td colspan="3" class="text-center py-4 text-gray-500">No assignments found</td></tr>'}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

async function createJudge() {
    const name = document.getElementById('judgeName').value.trim();
    const username = document.getElementById('judgeUsername').value.trim();
    const password = document.getElementById('judgePassword').value.trim();
    
    if (!name || !username || !password) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    const { data, error } = await supabase
        .from('judges')
        .insert({ name, username, password });
    
    if (error) {
        showNotification('Failed to create judge', 'error');
        return;
    }
    
    showNotification('Judge created successfully');
    document.getElementById('judgeName').value = '';
    document.getElementById('judgeUsername').value = '';
    document.getElementById('judgePassword').value = '';
    loadSetupTab('judges');
}

async function assignJudgeToCompetition() {
    const judgeId = document.getElementById('assignJudge').value;
    const competitionId = document.getElementById('assignCompetition').value;
    
    if (!judgeId || !competitionId) {
        showNotification('Please select both judge and competition', 'error');
        return;
    }
    
    const { data, error } = await supabase
        .from('competition_judges')
        .insert({ judge_id: parseInt(judgeId), competition_id: parseInt(competitionId) });
    
    if (error) {
        showNotification('Failed to assign judge', 'error');
        return;
    }
    
    showNotification('Judge assigned successfully');
    document.getElementById('assignJudge').value = '';
    document.getElementById('assignCompetition').value = '';
    loadSetupTab('judges');
}

async function deleteJudge(judgeId) {
    if (!confirm('Are you sure you want to delete this judge?')) {
        return;
    }
    
    const { error } = await supabase
        .from('judges')
        .delete()
        .eq('id', judgeId);
    
    if (error) {
        showNotification('Failed to delete judge', 'error');
        return;
    }
    
    showNotification('Judge deleted successfully');
    loadSetupTab('judges');
}

async function removeJudgeAssignment(assignmentId) {
    const { error } = await supabase
        .from('competition_judges')
        .delete()
        .eq('id', assignmentId);
    
    if (error) {
        showNotification('Failed to remove assignment', 'error');
        return;
    }
    
    showNotification('Assignment removed successfully');
    loadSetupTab('judges');
}

async function showDashboard() {
    const adminContent = document.getElementById('adminContent');
    
    // Fetch dashboard statistics
    const [competitions, results, teams, participants] = await Promise.all([
        supabase.from('competitions').select('*'),
        supabase.from('results').select('*'),
        supabase.from('teams').select('*'),
        supabase.from('participants').select('*')
    ]);
    
    const totalCompetitions = competitions.data?.length || 0;
    const completedCompetitions = competitions.data?.filter(c => c.status === 'completed').length || 0;
    const pendingResults = results.data?.filter(r => r.status === 'pending').length || 0;
    const publishedResults = results.data?.filter(r => r.status === 'published').length || 0;
    
    adminContent.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div class="bg-white p-6 rounded-lg shadow-sm">
                <div class="flex items-center">
                    <div class="bg-blue-100 p-3 rounded-lg">
                        <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                        </svg>
                    </div>
                    <div class="ml-4">
                        <p class="text-2xl font-bold text-gray-800">${totalCompetitions}</p>
                        <p class="text-gray-600 text-sm">Total Competitions</p>
                    </div>
                </div>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow-sm">
                <div class="flex items-center">
                    <div class="bg-green-100 p-3 rounded-lg">
                        <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <div class="ml-4">
                        <p class="text-2xl font-bold text-gray-800">${completedCompetitions}</p>
                        <p class="text-gray-600 text-sm">Completed</p>
                    </div>
                </div>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow-sm">
                <div class="flex items-center">
                    <div class="bg-yellow-100 p-3 rounded-lg">
                        <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <div class="ml-4">
                        <p class="text-2xl font-bold text-gray-800">${pendingResults}</p>
                        <p class="text-gray-600 text-sm">Pending Results</p>
                    </div>
                </div>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow-sm">
                <div class="flex items-center">
                    <div class="bg-purple-100 p-3 rounded-lg">
                        <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                        </svg>
                    </div>
                    <div class="ml-4">
                        <p class="text-2xl font-bold text-gray-800">${publishedResults}</p>
                        <p class="text-gray-600 text-sm">Published Results</p>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="bg-white p-6 rounded-lg shadow-sm">
                <h3 class="text-lg font-semibold mb-4">Team Points Status</h3>
                <div class="space-y-2 max-h-80 overflow-y-auto">
                    ${teams.data?.sort((a, b) => b.total_points - a.total_points).map((team, index) => `
                        <div class="flex justify-between items-center p-2 rounded ${index === 0 ? 'bg-yellow-50' : index === 1 ? 'bg-gray-50' : index === 2 ? 'bg-orange-50' : ''}">
                            <span class="font-medium">${index + 1}. ${team.name}</span>
                            <span class="font-bold text-blue-600">${team.total_points} pts</span>
                        </div>
                    `).join('') || '<p class="text-gray-500">No teams found</p>'}
                </div>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow-sm">
                <h3 class="text-lg font-semibold mb-4">System Statistics</h3>
                <div class="space-y-4">
                    <div class="flex justify-between items-center">
                        <span class="text-gray-600">Total Teams:</span>
                        <span class="font-semibold">${teams.data?.length || 0}</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-gray-600">Total Participants:</span>
                        <span class="font-semibold">${participants.data?.length || 0}</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-gray-600">Teams with Leader Access:</span>
                        <span class="font-semibold">${teams.data?.filter(t => t.leader_access).length || 0}</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-gray-600">System Status:</span>
                        <span class="font-semibold text-green-600">Active</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

async function showResults() {
    const adminContent = document.getElementById('adminContent');
    
    adminContent.innerHTML = `
        <div class="bg-white rounded-lg shadow-sm p-6">
            <div class="mb-6">
                <h2 class="text-xl font-semibold mb-4">Results - Password Protected</h2>
                <div class="max-w-md">
                    <input type="password" id="resultsPassword" placeholder="Enter password" class="p-3 border rounded-lg w-full mb-4">
                    <button onclick="verifyResultsPassword()" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 w-full">
                        View Results
                    </button>
                </div>
            </div>
            <div id="resultsContent" class="hidden">
                <!-- Results content will be loaded here after password verification -->
            </div>
        </div>
    `;
}

async function verifyResultsPassword() {
    const password = document.getElementById('resultsPassword').value;
    const currentUser = getCurrentUser();
    
    if (password === 'admin123' || password === currentUser.password) {
        document.getElementById('resultsContent').classList.remove('hidden');
        await loadResultsContent();
        showNotification('Password verified');
    } else {
        showNotification('Invalid password', 'error');
    }
}

async function loadResultsContent() {
    const resultsContent = document.getElementById('resultsContent');
    
    const [teams, categories] = await Promise.all([
        supabase.from('teams').select('*').order('total_points', { ascending: false }),
        supabase.from('categories').select('*')
    ]);
    
    // Get stage and non-stage categories
    const stageCategories = categories.data?.filter(c => c.is_stage && !c.is_general) || [];
    const nonStageCategories = categories.data?.filter(c => !c.is_stage && !c.is_general) || [];
    
    // Calculate Kalaprathipa (top scorer in stage items)
    const stageResults = await supabase
        .from('results')
        .select(`
            *, 
            participants(*, teams(name)), 
            competitions(*, categories(*))
        `)
        .eq('status', 'published');
    
    const stagePoints = {};
    const nonStagePoints = {};
    
    stageResults.data?.forEach(result => {
        if (result.competitions?.categories?.is_stage && !result.competitions?.categories?.is_general) {
            const teamName = result.participants?.teams?.name;
            if (teamName) {
                stagePoints[teamName] = (stagePoints[teamName] || 0) + (result.team_points || 0);
            }
        } else if (!result.competitions?.categories?.is_stage && !result.competitions?.categories?.is_general) {
            const teamName = result.participants?.teams?.name;
            if (teamName) {
                nonStagePoints[teamName] = (nonStagePoints[teamName] || 0) + (result.team_points || 0);
            }
        }
    });
    
    const kalaprathipa = Object.entries(stagePoints).sort(([,a], [,b]) => b - a)[0];
    const sargaprathipa = Object.entries(nonStagePoints).sort(([,a], [,b]) => b - a)[0];
    
    resultsContent.innerHTML = `
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div class="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white p-6 rounded-lg">
                <h3 class="text-lg font-semibold mb-2">Overall Champion</h3>
                <p class="text-2xl font-bold">${teams.data?.[0]?.name || 'N/A'}</p>
                <p class="text-sm opacity-90">${teams.data?.[0]?.total_points || 0} points</p>
            </div>
            
            <div class="bg-gradient-to-r from-purple-400 to-purple-600 text-white p-6 rounded-lg">
                <h3 class="text-lg font-semibold mb-2">Kalaprathipa (Stage Items)</h3>
                <p class="text-2xl font-bold">${kalaprathipa?.[0] || 'N/A'}</p>
                <p class="text-sm opacity-90">${kalaprathipa?.[1] || 0} points</p>
            </div>
            
            <div class="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-6 rounded-lg">
                <h3 class="text-lg font-semibold mb-2">Sargaprathipa (Non-Stage Items)</h3>
                <p class="text-2xl font-bold">${sargaprathipa?.[0] || 'N/A'}</p>
                <p class="text-sm opacity-90">${sargaprathipa?.[1] || 0} points</p>
            </div>
        </div>
        
        <div class="bg-white border rounded-lg">
            <div class="p-4 border-b">
                <h3 class="text-lg font-semibold">Team Standings</h3>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team Name</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Points</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage Points</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Non-Stage Points</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        ${teams.data?.map((team, index) => `
                            <tr class="${index < 3 ? 'bg-yellow-50' : ''}">
                                <td class="px-4 py-4 whitespace-nowrap">
                                    <span class="text-sm font-medium text-gray-900">
                                        ${index + 1}
                                        ${index === 0 ? '🏆' : index === 1 ? '🥈' : index === 2 ? '🥉' : ''}
                                    </span>
                                </td>
                                <td class="px-4 py-4 whitespace-nowrap">
                                    <div class="text-sm font-medium text-gray-900">${team.name}</div>
                                </td>
                                <td class="px-4 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900 font-semibold">${team.total_points}</div>
                                </td>
                                <td class="px-4 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">${stagePoints[team.name] || 0}</div>
                                </td>
                                <td class="px-4 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">${nonStagePoints[team.name] || 0}</div>
                                </td>
                            </tr>
                        `).join('') || '<tr><td colspan="5" class="text-center py-4 text-gray-500">No teams found</td></tr>'}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

async function showSchedule() {
    const adminContent = document.getElementById('adminContent');
    
    const [competitions, invigilators, schedules] = await Promise.all([
        supabase.from('competitions').select('*, categories(name)'),
        supabase.from('invigilators').select('*'),
        supabase.from('competitions').select('*, competition_invigilators(*, invigilators(name))').order('scheduled_at', { ascending: true })
    ]);
    
    adminContent.innerHTML = `
        <div class="bg-white rounded-lg shadow-sm">
            <div class="p-6 border-b">
                <h2 class="text-xl font-semibold">Competition Schedule Management</h2>
            </div>
            
            <div class="p-6">
                <div class="mb-8">
                    <h3 class="text-lg font-semibold mb-4">Schedule Competition</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        <select id="scheduleCompetition" class="p-3 border rounded-lg">
                            <option value="">Select Competition</option>
                            ${competitions.data?.map(comp => `<option value="${comp.id}">${comp.name} (${comp.categories?.name})</option>`).join('') || ''}
                        </select>
                        <input type="datetime-local" id="scheduleDateTime" class="p-3 border rounded-lg">
                        <input type="text" id="stageNumber" placeholder="Stage Number" class="p-3 border rounded-lg">
                        <select id="scheduleInvigilator" class="p-3 border rounded-lg">
                            <option value="">Select Invigilator</option>
                            ${invigilators.data?.map(inv => `<option value="${inv.id}">${inv.name}</option>`).join('') || ''}
                        </select>
                        <button onclick="scheduleCompetition()" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">Schedule</button>
                    </div>
                </div>
                
                <div>
                    <h3 class="text-lg font-semibold mb-4">Scheduled Competitions</h3>
                    <div class="overflow-x-auto">
                        <table class="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr class="bg-gray-50">
                                    <th class="border border-gray-300 px-4 py-2 text-left">Competition</th>
                                    <th class="border border-gray-300 px-4 py-2 text-left">Category</th>
                                    <th class="border border-gray-300 px-4 py-2 text-left">Date & Time</th>
                                    <th class="border border-gray-300 px-4 py-2 text-left">Stage</th>
                                    <th class="border border-gray-300 px-4 py-2 text-left">Invigilator</th>
                                    <th class="border border-gray-300 px-4 py-2 text-left">Status</th>
                                    <th class="border border-gray-300 px-4 py-2 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${schedules.data?.map(comp => `
                                    <tr>
                                        <td class="border border-gray-300 px-4 py-2">${comp.name}</td>
                                        <td class="border border-gray-300 px-4 py-2">${comp.categories?.name || 'N/A'}</td>
                                        <td class="border border-gray-300 px-4 py-2">${comp.scheduled_at ? new Date(comp.scheduled_at).toLocaleString() : 'Not scheduled'}</td>
                                        <td class="border border-gray-300 px-4 py-2">${comp.stage_number || 'N/A'}</td>
                                        <td class="border border-gray-300 px-4 py-2">${comp.competition_invigilators?.[0]?.invigilators?.name || 'Not assigned'}</td>
                                        <td class="border border-gray-300 px-4 py-2">
                                            <span class="px-2 py-1 text-xs rounded ${getStatusColor(comp.status)}">
                                                ${comp.status}
                                            </span>
                                        </td>
                                        <td class="border border-gray-300 px-4 py-2">
                                            <button onclick="updateCompetitionStatus('${comp.id}', 'ongoing')" class="text-xs px-2 py-1 bg-blue-500 text-white rounded mr-1">Start</button>
                                            <button onclick="updateCompetitionStatus('${comp.id}', 'completed')" class="text-xs px-2 py-1 bg-green-500 text-white rounded">Complete</button>
                                        </td>
                                    </tr>
                                `).join('') || '<tr><td colspan="7" class="text-center py-4 text-gray-500">No competitions scheduled</td></tr>'}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `;
}

async function scheduleCompetition() {
    const competitionId = document.getElementById('scheduleCompetition').value;
    const dateTime = document.getElementById('scheduleDateTime').value;
    const stageNumber = document.getElementById('stageNumber').value.trim();
    const invigilatorId = document.getElementById('scheduleInvigilator').value;
    
    if (!competitionId || !dateTime) {
        showNotification('Please select competition and date/time', 'error');
        return;
    }
    
    // Update competition schedule
    const { error: compError } = await supabase
        .from('competitions')
        .update({ 
            scheduled_at: dateTime,
            stage_number: stageNumber || null
        })
        .eq('id', competitionId);
    
    if (compError) {
        showNotification('Failed to schedule competition', 'error');
        return;
    }
    
    // Assign invigilator if selected
    if (invigilatorId) {
        const { error: invError } = await supabase
            .from('competition_invigilators')
            .insert({ competition_id: parseInt(competitionId), invigilator_id: parseInt(invigilatorId) });
    }
    
    showNotification('Competition scheduled successfully');
    document.getElementById('scheduleCompetition').value = '';
    document.getElementById('scheduleDateTime').value = '';
    document.getElementById('stageNumber').value = '';
    document.getElementById('scheduleInvigilator').value = '';
    showSchedule();
}

async function updateCompetitionStatus(competitionId, status) {
    const { error } = await supabase
        .from('competitions')
        .update({ status })
        .eq('id', competitionId);
    
    if (error) {
        showNotification('Failed to update competition status', 'error');
        return;
    }
    
    showNotification(`Competition ${status} successfully`);
    showSchedule();
}

async function showSettings() {
    const adminContent = document.getElementById('adminContent');
    
    adminContent.innerHTML = `
        <div class="bg-white rounded-lg shadow-sm">
            <div class="p-6 border-b">
                <h2 class="text-xl font-semibold">Application Settings</h2>
            </div>
            
            <div class="p-6 space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <h3 class="text-lg font-semibold mb-4">Team Leader Access Control</h3>
                        <div class="space-y-2">
                            <button onclick="enableAllTeamAccess()" class="bg-green-600 text-white px-4 py-2 rounded mr-2">
                                Enable All Teams
                            </button>
                            <button onclick="disableAllTeamAccess()" class="bg-red-600 text-white px-4 py-2 rounded">
                                Disable All Teams
                            </button>
                        </div>
                        <p class="text-sm text-gray-600 mt-2">Control access to setup for team leaders</p>
                    </div>
                    
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <h3 class="text-lg font-semibold mb-4">System Information</h3>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span>Version:</span>
                                <span>1.0.0</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Database:</span>
                                <span class="text-green-600">Connected</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Last Updated:</span>
                                <span>${new Date().toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="bg-red-50 p-4 rounded-lg border border-red-200">
                    <h3 class="text-lg font-semibold text-red-800 mb-4">Danger Zone</h3>
                    <div class="space-y-2">
                        <button onclick="resetAllResults()" class="bg-red-600 text-white px-4 py-2 rounded mr-2">
                            Reset All Results
                        </button>
                        <button onclick="clearAllData()" class="bg-red-800 text-white px-4 py-2 rounded">
                            Clear All Data
                        </button>
                    </div>
                    <p class="text-sm text-red-600 mt-2">These actions cannot be undone. Use with extreme caution.</p>
                </div>
            </div>
        </div>
    `;
}

async function enableAllTeamAccess() {
    if (!confirm('Enable access for all teams?')) return;
    
    const { error } = await supabase
        .from('teams')
        .update({ leader_access: true })
        .neq('id', 0);
    
    if (error) {
        showNotification('Failed to enable team access', 'error');
        return;
    }
    
    showNotification('All teams now have leader access');
}

async function disableAllTeamAccess() {
    if (!confirm('Disable access for all teams?')) return;
    
    const { error } = await supabase
        .from('teams')
        .update({ leader_access: false })
        .neq('id', 0);
    
    if (error) {
        showNotification('Failed to disable team access', 'error');
        return;
    }
    
    showNotification('All teams access disabled');
}

async function resetAllResults() {
    if (!confirm('This will delete all results and reset team points. Continue?')) return;
    
    const { error } = await supabase
        .from('results')
        .delete()
        .neq('id', 0);
    
    if (!error) {
        await supabase
            .from('teams')
            .update({ total_points: 0 })
            .neq('id', 0);
        
        showNotification('All results reset successfully');
    } else {
        showNotification('Failed to reset results', 'error');
    }
}

async function clearAllData() {
    const confirmation = prompt('Type "DELETE ALL DATA" to confirm this action:');
    if (confirmation !== 'DELETE ALL DATA') {
        showNotification('Action cancelled', 'error');
        return;
    }
    
    // This would delete all data - implement with extreme caution
    showNotification('This feature is disabled for safety', 'error');
}
