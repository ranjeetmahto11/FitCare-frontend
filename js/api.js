// =============================================
//  FitCare — API
//  Live Backend: Render
// =============================================

const API_BASE =
    'https://fitcare-backend-coab.onrender.com/api';

// ── Storage ───────────────────────────────────
function getToken() {
    return localStorage.getItem('fitcare_token');
}

function saveToken(token) {
    localStorage.setItem('fitcare_token', token);
}

function getUser() {
    const u = localStorage.getItem('fitcare_user');
    return u ? JSON.parse(u) : null;
}

function saveUser(user) {
    localStorage.setItem(
        'fitcare_user', JSON.stringify(user));
}

function clearStorage() {
    localStorage.removeItem('fitcare_token');
    localStorage.removeItem('fitcare_user');
}

// ── Auth Guards ───────────────────────────────
function requireAuth() {
    const token = getToken();
    if (!token) {
        window.location.href =
            '/pages/login.html';
        return false;
    }

    // Check token expiry
    try {
        const payload = JSON.parse(
            atob(token.split('.')[1]));
        const now = Date.now() / 1000;
        if (payload.exp && payload.exp < now) {
            // Token expired
            localStorage.clear();
            window.location.href =
                '/pages/login.html';
            return false;
        }
    } catch (e) {
        localStorage.clear();
        window.location.href =
            '/pages/login.html';
        return false;
    }

    return true;
}

function redirectIfLoggedIn() {
    const token = getToken();
    if (!token) return;

    try {
        const payload = JSON.parse(
            atob(token.split('.')[1]));
        const now = Date.now() / 1000;
        if (payload.exp && payload.exp > now) {
            window.location.href =
                '/pages/dashboard.html';
        } else {
            localStorage.clear();
        }
    } catch (e) {
        localStorage.clear();
    }
}

// ── Base API Call ─────────────────────────────
async function apiCall(
        endpoint,
        method = 'GET',
        body = null) {

    const headers = {
        'Content-Type': 'application/json'
    };

    const token = getToken();
    if (token) {
        headers['Authorization'] =
            `Bearer ${token}`;
    }

    const config = { method, headers };
    if (body) {
        config.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(
            `${API_BASE}${endpoint}`, config);
        const data = await response.json();

        if (response.status === 401) {
            localStorage.clear();
            window.location.href =
                '/pages/login.html';
            return;
        }

        return { status: response.status, data };

    } catch (error) {
        console.error('API Error:', error);
        return {
            status: 500,
            data: {
                success: false,
                message:
                    'Cannot connect to server. '
                    + 'Please try again.'
            }
        };
    }
}

// ── Public APIs (No Login) ────────────────────
async function apiGetAllGoalsPublic() {
    return await apiCall('/goals/all');
}

async function apiGetRoadmapPublic(goalType) {
    return await apiCall(
        `/roadmap/${goalType}`);
}

// ── Auth APIs ─────────────────────────────────
async function apiRegister(payload) {
    return await apiCall(
        '/auth/register', 'POST', payload);
}

async function apiLogin(payload) {
    return await apiCall(
        '/auth/login', 'POST', payload);
}

async function apiGuestLogin() {
    return await apiCall(
        '/auth/guest', 'POST');
}

// ── User APIs ─────────────────────────────────
async function apiGetProfile() {
    return await apiCall('/users/me');
}

async function apiGetBmi() {
    return await apiCall('/users/bmi');
}

// ── Goal APIs ─────────────────────────────────
async function apiGetAllGoals() {
    return await apiCall('/goals/all');
}

async function apiSetGoal(payload) {
    return await apiCall(
        '/goals/set', 'POST', payload);
}

async function apiGetMyGoal() {
    return await apiCall('/goals/my');
}

async function apiAdvanceWeek() {
    return await apiCall(
        '/goals/advance-week', 'POST');
}

// ── Roadmap APIs ──────────────────────────────
async function apiGetMyRoadmap() {
    return await apiCall('/roadmap/my');
}