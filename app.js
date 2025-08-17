// Supabase configuration
const SUPABASE_URL = 'https://wfbazlvgkqldorosrgie.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmYmF6bHZna3FsZG9yb3NyZ2llIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU0MjEzNDMsImV4cCI6MjA3MDk5NzM0M30.w4sGMvleVZaDt7EgVZJ_xZOeLk_ZJA5EectKpeLL2oE';

// Initialize Supabase client (Fixed - use supabase instead of supabaseClient)
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Global variables (Fixed - declare before any functions)
let currentUser = null;
let currentRole = null;

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the app after DOM is loaded
    showHome();
});

// Show sections
function showHome() {
    document.getElementById('homeSection').classList.remove('hidden');
    document.getElementById('loginSection').classList.add('hidden');
    document.getElementById('roleContent').classList.add('hidden');
    document.getElementById('logoutBtn').style.display = 'none';
}

function showLogin(role) {
    currentRole = role;
    document.getElementById('homeSection').classList.add('hidden');
    document.getElementById('loginSection').classList.remove('hidden');
    document.getElementById('roleContent').classList.add('hidden');
    document.getElementById('loginTitle').textContent = role.replace('_', ' ').toUpperCase() + ' Login';
}

// Login functionality
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        try {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('username', username)
                .eq('role', currentRole)
                .single();
                
            if (error || !data) {
                alert('Invalid credentials');
                return;
            }
            
            // Simple password verification (in production, use proper hashing)
            if (data.password_hash !== password) {
                alert('Invalid credentials');
                return;
            }
            
            currentUser = data;
            document.getElementById('loginSection').classList.add('hidden');
            document.getElementById('roleContent').classList.remove('hidden');
            document.getElementById('logoutBtn').style.display = 'block';
            
            // Load role-specific interface
            switch(currentRole) {
                case 'admin':
                    loadAdminInterface();
                    break;
                case 'team_leader':
                    loadTeamLeaderInterface();
                    break;
                case 'invigilator':
                    loadInvigilatorInterface();
                    break;
                case 'judge':
                    loadJudgeInterface();
                    break;
                case 'announcer':
                    loadAnnouncerInterface();
                    break;
            }
            
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed');
        }
    });
});

function logout() {
    currentUser = null;
    currentRole = null;
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    showHome();
}

// Utility functions
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.querySelector('.container').insertBefore(alertDiv, document.querySelector('.container').firstChild);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// Calculate grade from score
function calculateGrade(score) {
    if (score >= 90) return 'A+';
    if (score >= 70) return 'A';
    if (score >= 60) return 'B';
    if (score >= 50) return 'C';
    return 'F';
}

// Calculate points from grade
async function calculatePoints(grade) {
    const { data, error } = await supabase
        .from('points')
        .select('points')
        .eq('type', 'grade')
        .eq('description', grade)
        .single();
    
    return data ? data.points : 0;
}
