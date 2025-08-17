// Main application logic
document.addEventListener('DOMContentLoaded', function() {
    const loginScreen = document.getElementById('loginScreen');
    const dashboard = document.getElementById('dashboard');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const roleSelect = document.getElementById('roleSelect');
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    
    // Check if user is already logged in
    const currentUser = getCurrentUser();
    if (currentUser.id) {
        showDashboard(currentUser);
    }

    loginBtn.addEventListener('click', handleLogin);
    logoutBtn.addEventListener('click', logout);

    async function handleLogin() {
        const role = roleSelect.value;
        const usernameVal = username.value.trim();
        const passwordVal = password.value.trim();

        if (!role || !usernameVal || !passwordVal) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        try {
            let user = null;
            
            switch (role) {
                case 'admin':
                    user = await loginAdmin(usernameVal, passwordVal);
                    break;
                case 'team_leader':
                    user = await loginTeamLeader(usernameVal, passwordVal);
                    break;
                case 'invigilator':
                    user = await loginInvigilator(usernameVal, passwordVal);
                    break;
                case 'judge':
                    user = await loginJudge(usernameVal, passwordVal);
                    break;
                case 'announcer':
                    // Announcer uses admin credentials for now
                    user = await loginAdmin(usernameVal, passwordVal);
                    if (user) user.role = 'announcer';
                    break;
            }

            if (user) {
                setCurrentUser(user);
                showDashboard(user);
                showNotification('Login successful');
            } else {
                showNotification('Invalid credentials', 'error');
            }
        } catch (error) {
            console.error('Login error:', error);
            showNotification('Login failed', 'error');
        }
    }

    async function loginAdmin(username, password) {
        const { data, error } = await supabase
            .from('admins')
            .select('*')
            .eq('username', username)
            .eq('password', password)
            .single();
        
        if (error || !data) return null;
        return { ...data, role: 'admin' };
    }

    async function loginTeamLeader(teamName, password) {
        const { data, error } = await supabase
            .from('teams')
            .select('*')
            .eq('name', teamName)
            .eq('password', password)
            .eq('leader_access', true)
            .single();
        
        if (error || !data) return null;
        return { ...data, role: 'team_leader' };
    }

    async function loginInvigilator(username, password) {
        const { data, error } = await supabase
            .from('invigilators')
            .select('*')
            .eq('username', username)
            .eq('password', password)
            .single();
        
        if (error || !data) return null;
        return { ...data, role: 'invigilator' };
    }

    async function loginJudge(username, password) {
        const { data, error } = await supabase
            .from('judges')
            .select('*')
            .eq('username', username)
            .eq('password', password)
            .single();
        
        if (error || !data) return null;
        return { ...data, role: 'judge' };
    }

    function showDashboard(user) {
        loginScreen.classList.add('hidden');
        dashboard.classList.remove('hidden');
        
        document.getElementById('dashboardTitle').textContent = `${user.role.replace('_', ' ').toUpperCase()} Dashboard`;
        document.getElementById('userInfo').textContent = `Welcome, ${user.name || user.username}`;
        
        // Load role-specific content
        loadRoleContent(user);
    }

    function loadRoleContent(user) {
        const content = document.getElementById('content');
        
        switch (user.role) {
            case 'admin':
                loadAdminContent(content);
                break;
            case 'team_leader':
                loadTeamLeaderContent(content, user);
                break;
            case 'invigilator':
                loadInvigilatorContent(content, user);
                break;
            case 'judge':
                loadJudgeContent(content, user);
                break;
            case 'announcer':
                loadAnnouncerContent(content);
                break;
        }
    }
});

