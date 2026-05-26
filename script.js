/**
 * Ridiculous Life Formula Generator
 * Main Architecture and Core Logic
 */

// Global state variables for caching calculated metrics
let currentCalculatedChaos = 0;
let currentDiagnosis = "";

// --- DOM Element Registries ---
const sliders = {
    stress: document.getElementById('slider-stress'),
    caffeine: document.getElementById('slider-caffeine'),
    confidence: document.getElementById('slider-confidence'),
    commonsense: document.getElementById('slider-commonsense'),
    witnesses: document.getElementById('slider-witnesses'),
    awkwardness: document.getElementById('slider-awkwardness'),
    snacks: document.getElementById('slider-snacks'),
    pressure: document.getElementById('slider-pressure')
};

const buttons = {
    calculate: document.getElementById('btn-calculate'),
    randomize: document.getElementById('btn-randomize'),
    report: document.getElementById('btn-report'),
    copy: document.getElementById('btn-copy'),
    submitScore: document.getElementById('btn-submit-score')
};

const outputs = {
    resultsCard: document.getElementById('results-card'),
    finalDiagnosis: document.getElementById('final-diagnosis'),
    reportBox: document.getElementById('report-box'),
    reportText: document.getElementById('report-text'),
    leaderboardBody: document.getElementById('leaderboard-body'),
    nicknameInput: document.getElementById('nickname-input'),
    submitBox: document.getElementById('leaderboard-submit-box'),
    scenario: document.getElementById('scenario-select')
};

// --- Initialization Event Bindings ---
document.addEventListener('DOMContentLoaded', () => {
    setupSliderListeners();
    setupActionButtons();
    renderLeaderboard();
});

/**
 * Attaches real-time display value listeners to range elements
 */
function setupSliderListeners() {
    Object.keys(sliders).forEach(key => {
        sliders[key].addEventListener('input', (e) => {
            const badge = document.getElementById(`val-${key}`);
            if (badge) badge.textContent = e.target.value;
        });
    });
}

/**
 * Attaches structural click handlers to programmatic execution buttons
 */
function setupActionButtons() {
    buttons.calculate.addEventListener('click', generateFormulasAndShowResults);
    buttons.randomize.addEventListener('click', randomizeSlidersValues);
    buttons.report.addEventListener('click', generateFakeScientificReport);
    buttons.copy.addEventListener('click', copyResultsToClipboard);
    buttons.submitScore.addEventListener('click', commitScoreToLeaderboard);
}

/**
 * Sets random integer steps [0-10] on sliders
 */
function randomizeSlidersValues() {
    Object.keys(sliders).forEach(key => {
        const randVal = Math.floor(Math.random() * 11);
        sliders[key].value = randVal;
        const badge = document.getElementById(`val-${key}`);
        if (badge) badge.textContent = randVal;
    });
}

/**
 * Constrains and bounds outputs smoothly between 0 and 100%
 */
function clamp(value) {
    return Math.max(0, Math.min(100, Math.round(value)));
}

/**
 * Main calculation logic engine execution
 */
function generateFormulasAndShowResults() {
    // Collect slider inputs parsed as raw absolute numeric values
    const s = parseInt(sliders.stress.value);
    const caf = parseInt(sliders.caffeine.value);
    const conf = parseInt(sliders.confidence.value);
    const cs = parseInt(sliders.commonsense.value);
    const wit = parseInt(sliders.witnesses.value);
    const awk = parseInt(sliders.awkwardness.value);
    const snk = parseInt(sliders.snacks.value);
    const prs = parseInt(sliders.pressure.value);

    // Formulations adjusted dynamically to match a 0-100 range metric base
    const dramaIndex = clamp(((s * awk) + wit - cs) * 2);
    const survivalProbability = clamp(((conf + snk + caf) - prs) * 4 + 30);
    const socialRiskScore = clamp(((awk * wit) - conf) * 2.5 + 20);
    const chaosLevel = clamp(((s + prs + caf) - cs) * 4.5 + 20);

    // Save Chaos Level to outer scope for local storage submission usage
    currentCalculatedChaos = chaosLevel;

    // Update graphical elements UI Displays
    updateMetricUI('drama', dramaIndex, getDramaDescription(dramaIndex));
    updateMetricUI('survival', survivalProbability, getSurvivalDescription(survivalProbability));
    updateMetricUI('social', socialRiskScore, getSocialDescription(socialRiskScore));
    updateMetricUI('chaos', chaosLevel, getChaosDescription(chaosLevel));

    // Assign and output diagnosis label
    currentDiagnosis = determineDiagnosisLabel(chaosLevel, s, cs, prs);
    outputs.finalDiagnosis.textContent = currentDiagnosis;

    // Reveal elements with Micro-Animations
    outputs.resultsCard.classList.remove('hidden');
    outputs.reportBox.classList.add('hidden'); // Reset report box on recalculation
    outputs.submitBox.classList.remove('hidden'); // Reset input visibility
    outputs.nicknameInput.value = ""; // Empty previous alias name string
    
    // Smooth auto-scroll view alignment
    outputs.resultsCard.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Inject text values and adjust progress bar animations safely
 */
function updateMetricUI(id, score, description) {
    document.getElementById(`val-${id}`).textContent = `${score}%`;
    document.getElementById(`desc-${id}`).textContent = description;
    
    const bar = document.getElementById(`bar-${id}`);
    bar.style.width = `${score}%`;
    
    // Contextual alert color variations
    if (id === 'survival') {
        bar.style.backgroundColor = score > 50 ? 'var(--success)' : 'var(--danger)';
    } else {
        bar.style.backgroundColor = score > 75 ? 'var(--danger)' : (score > 40 ? 'var(--accent-primary)' : 'var(--success)');
    }
}

// --- Dynamic Narrative Strings Evaluation Data Factories ---

function getDramaDescription(score) {
    if (score > 75) return "Your situation has reached opera-level drama. Somewhere, a tragic violin is crying.";
    if (score > 40) return "Moderate sitcom complications detected. Misunderstandings are probable.";
    return "Remarkably chill. Low friction. Practically boring.";
}

function getSurvivalDescription(score) {
    if (score > 75) return "Unstoppable forces back you. You'll make it out untouched.";
    if (score > 40) return "Survival likely, though minor emotional bruising could happen.";
    return "Your survival chances are low. Consider snacks, sleep, or fleeing the country immediately.";
}

function getSocialDescription(score) {
    if (score > 75) return "One wrong sentence and this becomes an intrusive memory you remember at 3 a.m. forever.";
    if (score > 40) return "Slightly tense. Avoid extended direct eye contact with anyone.";
    return "Completely socially secure. Zero reputation threat detected.";
}

function getChaosDescription(score) {
    if (score > 75) return "This is no longer a situation. This is a group chat with structural consequences.";
    if (score > 40) return "Wobbly operational conditions. Keep your hands inside the ride.";
    return "Perfect harmonic balance. Clean processing metrics.";
}

/**
 * Assigns complex customized dynamic character identities
 */
function determineDiagnosisLabel(chaos, stress, commonSense, pressure) {
    if (chaos > 80) return "Certified Chaos Engineer";
    if (stress > 8 && commonSense < 3) return "Minister of Bad Decisions";
    if (pressure > 8) return "Deadline Goblin";
    if (commonSense > 8 && stress > 6) return "Professional Overthinker";
    if (commonSense < 3) return "Social Disaster Intern";
    if (stress < 3 && chaos > 40) return "Calm But Suspicious";
    return "Snack-Based Survivor";
}

/**
 * 9. Fake Scientific Report Logic Constructor Engine
 */
function generateFakeScientificReport() {
    const s = parseInt(sliders.stress.value);
    const randomCertainty = Math.floor(Math.random() * 20) + 80; // 80-100% Range
    
    const narrativeText = `After extensive research conducted by absolutely no qualified professionals, we conclude that your current structural handling framework for "${outputs.scenario.value}" is exactly ${currentCalculatedChaos}% chaos, mathematically ${randomCertainty}% unmanageable, and objectively 100% your problem. We recommend structural panic operations.`;
    
    outputs.reportText.textContent = narrativeText;
    outputs.reportBox.classList.remove('hidden');
    outputs.reportBox.scrollIntoView({ behavior: 'smooth' });
}

/**
 * 10. Copy Results Implementation Engine
 */
function copyResultsToClipboard() {
    const textToCopy = `--- RIDICULOUS LIFE FORMULA REPORT ---
Scenario: ${outputs.scenario.value}
Verdict Diagnosis: ${currentDiagnosis}
Calculated Chaos Level: ${currentCalculatedChaos}%
Generated via Data Chaos Dashboard.`;

    navigator.clipboard.writeText(textToCopy)
        .then(() => alert("Copied Verdict Report to clipboard! 🎉"))
        .catch(() => alert("Clipboard copying failed."));
}

// --- 8. LocalStorage Leaderboard Control System ---

function commitScoreToLeaderboard() {
    const name = outputs.nicknameInput.value.trim() || "Anonymous Casualty";
    const currentScenario = outputs.scenario.value;

    const dataPayload = {
        name: name,
        scenario: currentScenario,
        diagnosis: currentDiagnosis,
        chaos: currentCalculatedChaos
    };

    // Grab or initialize storage array
    let currentLeaderboard = JSON.parse(localStorage.getItem('ridiculous_leaderboard')) || [];
    
    // Add item
    currentLeaderboard.push(dataPayload);
    
    // Sort Highest Chaos Score First
    currentLeaderboard.sort((a, b) => b.chaos - a.chaos);
    
    // Trim back keeping only upper max 5 indexes
    currentLeaderboard = currentLeaderboard.slice(0, 5);
    
    // Return back into system local memory storage
    localStorage.setItem('ridiculous_leaderboard', JSON.stringify(currentLeaderboard));
    
    // Update Layout and conceal entry input options block
    renderLeaderboard();
    outputs.submitBox.classList.add('hidden');
}

function renderLeaderboard() {
    const data = JSON.parse(localStorage.getItem('ridiculous_leaderboard')) || [];
    outputs.leaderboardBody.innerHTML = ""; // Wipe clean

    if (data.length === 0) {
        outputs.leaderboardBody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:var(--text-muted);">No items in the Hall of Shame... yet.</td></tr>`;
        return;
    }

    data.forEach((row, index) => {
        const tableRowHTML = `
            <tr>
                <td><strong>#${index + 1}</strong></td>
                <td>${escapeHTML(row.name)}</td>
                <td>${row.scenario}</td>
                <td><span class="badge">${row.diagnosis}</span></td>
                <td style="color:var(--danger); font-weight:bold;">${row.chaos}%</td>
            </tr>
        `;
        outputs.leaderboardBody.insertAdjacentHTML('beforeend', tableRowHTML);
    });
}

/**
 * XSS Utility sanitizer protector
 */
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}
