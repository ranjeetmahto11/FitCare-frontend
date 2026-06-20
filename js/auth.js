// ── Goal Icon Map ─────────────────────────
function getGoalIcon(goalType) {
    const map = {
        LOSE_FAT: {
            icon: 'bi-fire',
            color: '#ff4d6d',
            bg: 'rgba(255,77,109,0.12)'
        },
        GAIN_WEIGHT: {
            icon: 'bi-lightning-fill',
            color: '#00d68f',
            bg: 'rgba(0,214,143,0.12)'
        },
        SIX_PACK_ABS: {
            icon: 'bi-bullseye',
            color: '#ffd166',
            bg: 'rgba(255,209,102,0.12)'
        },
        BUILD_BICEPS: {
            icon: 'bi-person-arms-up',
            color: '#4d9de0',
            bg: 'rgba(77,157,224,0.12)'
        },
        BUILD_MUSCLE: {
            icon: 'bi-trophy-fill',
            color: '#9b59b6',
            bg: 'rgba(155,89,182,0.12)'
        },
        IMPROVE_ENDURANCE: {
            icon: 'bi-heart-pulse-fill',
            color: '#ff9f43',
            bg: 'rgba(255,159,67,0.12)'
        },
        GET_FLEXIBLE: {
            icon: 'bi-arrow-repeat',
            color: '#00d68f',
            bg: 'rgba(0,214,143,0.12)'
        },
        MAINTAIN_FITNESS: {
            icon: 'bi-shield-check',
            color: '#4d9de0',
            bg: 'rgba(77,157,224,0.12)'
        }
    };

    const g = map[goalType] || {
        icon: 'bi-activity',
        color: '#8892b0',
        bg: 'rgba(136,146,176,0.12)'
    };

    return `
        <div style="width:56px;
                    height:56px;
                    border-radius:50%;
                    background:${g.bg};
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    margin:0 auto;">
            <i class="bi ${g.icon}"
               style="font-size:24px;
                      color:${g.color};">
            </i>
        </div>`;
}

// ── Phase Icon Map ────────────────────────
function getPhaseIcon(icon) {
    const map = {
        'FOUNDATION':    'bi-building',
        'ACCELERATION':  'bi-lightning-fill',
        'DEFINITION':    'bi-bullseye',
        'FATBURN':       'bi-fire',
        'CORE':          'bi-circle-fill',
        'GROWTH':        'bi-graph-up-arrow',
        'PEAK':          'bi-trophy-fill',
    };
    const cls = map[icon] || 'bi-circle';
    return `<i class="bi ${cls}"></i>`;
}