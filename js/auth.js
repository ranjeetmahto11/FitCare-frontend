// =============================================
//  FitCare — Auth & UI Helpers
// =============================================

// ── Toast ─────────────────────────────────────
function showToast(message, type = 'success') {
    let container = document.querySelector(
        '.fc-toast-container');

    if (!container) {
        container = document.createElement('div');
        container.className = 'fc-toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `fc-toast ${type}`;

    const icons = {
        success: 'bi-check-circle-fill',
        error:   'bi-exclamation-circle-fill',
        warning: 'bi-exclamation-triangle-fill'
    };

    toast.innerHTML = `
        <i class="bi ${icons[type]
            || icons.success} me-2"></i>
        ${message}`;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity    = '0';
        toast.style.transition = 'opacity 0.3s';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// ── Button Loading ────────────────────────────
function setLoading(btn, loading) {
    if (loading) {
        btn.disabled = true;
        btn.dataset.original = btn.innerHTML;
        btn.innerHTML = `
            <span class="spinner-border
                spinner-border-sm me-2">
            </span>Loading...`;
    } else {
        btn.disabled  = false;
        btn.innerHTML =
            btn.dataset.original || btn.innerHTML;
    }
}

// ── Password Toggle ───────────────────────────
function togglePassword(inputId, btn) {
    const input = document.getElementById(inputId);
    const icon  = btn.querySelector('i');
    if (input.type === 'password') {
        input.type     = 'text';
        icon.className = 'bi bi-eye-slash';
    } else {
        input.type     = 'password';
        icon.className = 'bi bi-eye';
    }
}

// ── Helpers ───────────────────────────────────
function getInitials(name) {
    if (!name) return 'U';
    return name.split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

function formatDate(date = new Date()) {
    const d   = new Date(date);
    const y   = d.getFullYear();
    const m   = String(
        d.getMonth() + 1).padStart(2, '0');
    const day = String(
        d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
}

function formatDateDisplay(dateStr) {
    if (!dateStr) return '—';
    return new Date(dateStr)
        .toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
}

function getGreeting(name) {
    const hour = new Date().getHours();
    let greet  = 'Good Morning';
    if (hour >= 12 && hour < 17)
        greet = 'Good Afternoon';
    else if (hour >= 17)
        greet = 'Good Evening';
    return `${greet}, ${name}! 👋`;
}

function getGoalIcon(goalType) {
    const icons = {
        LOSE_FAT:          '🔥',
        GAIN_WEIGHT:       '💪',
        SIX_PACK_ABS:      '🎯',
        BUILD_BICEPS:      '💪',
        BUILD_MUSCLE:      '🏋️',
        IMPROVE_ENDURANCE: '🏃',
        GET_FLEXIBLE:      '🧘',
        MAINTAIN_FITNESS:  '⚖️'
    };
    return icons[goalType] || '🏋️';
}

function formatGoalType(goalType) {
    if (!goalType) return '—';
    return goalType
        .replace(/_/g, ' ')
        .toLowerCase()
        .replace(/\b\w/g, l => l.toUpperCase());
}

function getBmiColor(category) {
    const colors = {
        'Underweight': '#4d9de0',
        'Normal':      '#00d68f',
        'Overweight':  '#ffd166',
        'Obese':       '#ff4d6d'
    };
    return colors[category] || '#8892b0';
}

function getDifficultyBadge(difficulty) {
    const map = {
        EASY:      { cls: 'green', text: 'Easy' },
        MODERATE:  { cls: 'yellow', text: 'Moderate' },
        HARD:      { cls: 'red', text: 'Hard' },
        VERY_HARD: { cls: 'red', text: 'Very Hard' }
    };
    const d = map[difficulty]
        || { cls: 'blue', text: difficulty };
    return `<span class="fc-badge ${d.cls}">
                ${d.text}
            </span>`;
}

function emptyHTML(icon, title, message) {
    return `
        <div class="text-center py-5"
             style="color:var(--text-muted);">
            <i class="bi ${icon} fs-1
                d-block mb-3"
               style="opacity:0.4;"></i>
            <div style="font-weight:600;
                        font-size:16px;
                        margin-bottom:8px;">
                ${title}
            </div>
            <div style="font-size:14px;">
                ${message}
            </div>
        </div>`;
}

function errorHTML(message) {
    return `
        <div class="text-center py-4"
             style="color:var(--danger);">
            <i class="bi bi-exclamation-circle
                fs-2 d-block mb-2"></i>
            ${message}
        </div>`;
}

// ── Load Navbar ───────────────────────────────
function loadNavbar() {
    const user = getUser();
    if (!user) return;
    const nameEl   =
        document.getElementById('navUserName');
    const avatarEl =
        document.getElementById('navAvatar');
    if (nameEl)   nameEl.textContent = user.name;
    if (avatarEl) avatarEl.textContent =
        getInitials(user.name);
}

// ── Logout ────────────────────────────────────
function logout() {
    clearStorage();
    showToast('Logged out successfully');
    setTimeout(() => {
        window.location.href = '/pages/login.html';
    }, 500);
}

// Auto load navbar
document.addEventListener('DOMContentLoaded',
    () => { loadNavbar(); });