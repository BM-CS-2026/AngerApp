/* ===== Inner Calm - Anger Management PWA ===== */

// ===== DATA =====
const WEEK_PLAN = [
  { week:1, focus:"Start Anger Log; learn breathing", time:"15 min", skills:"Anger Log, Extended Exhale Breathing" },
  { week:2, focus:"Add PMR; begin morning intention", time:"20 min", skills:"PMR (3x/week), Morning Routine" },
  { week:3, focus:"Add grounding + time-out; first weekly review", time:"25 min", skills:"5-4-3-2-1 Grounding, Time-Out Protocol, Weekly Review" },
  { week:4, focus:"Begin CBT Thought Records", time:"30 min", skills:"6-Column Thought Record (2-3x/week)" },
  { week:5, focus:"Add DBT Opposite Action", time:"30-35 min", skills:"Opposite Action (weekly)" },
  { week:6, focus:"Add ACT Defusion + Acceptance", time:"35 min", skills:"Defusion exercises, Acceptance sitting" },
  { week:7, focus:"Add Values Clarification + Committed Action", time:"35 min", skills:"ACT Part 3" },
  { week:8, focus:"Add DEAR MAN Assertive Communication", time:"35 min", skills:"DEAR MAN (weekly practice)" },
  { week:9, focus:"Identify 3 strongest skills; apply to hardest trigger", time:"25-30 min", skills:"Consolidation" },
  { week:10, focus:"Add problem-solving for recurring triggers", time:"25-30 min", skills:"Structured Problem-Solving" },
  { week:11, focus:"Add self-compassion protocol", time:"25-30 min", skills:"Self-Compassion after episodes" },
  { week:12, focus:"Final review; write Personal Anger Management Summary", time:"25-30 min", skills:"Personal Summary" },
];

const PMR_STEPS = [
  { part:"Feet & Toes", instruction:"Curl tightly" },
  { part:"Calves", instruction:"Flex upward" },
  { part:"Thighs", instruction:"Tighten quads" },
  { part:"Glutes", instruction:"Squeeze" },
  { part:"Abdomen", instruction:"Tighten core" },
  { part:"Chest", instruction:"Deep breath & hold" },
  { part:"Hands", instruction:"Clench into fists" },
  { part:"Forearms", instruction:"Tense toward shoulder" },
  { part:"Shoulders", instruction:"Shrug toward ears" },
  { part:"Neck", instruction:"Gently tilt back" },
  { part:"Face", instruction:"Scrunch all features to center" },
];

const GROUNDING_STEPS = [
  { count:5, sense:"SEE", prompt:"Name 5 things you can see right now" },
  { count:4, sense:"TOUCH", prompt:"Name 4 things you can physically touch" },
  { count:3, sense:"HEAR", prompt:"Name 3 sounds you can hear" },
  { count:2, sense:"SMELL", prompt:"Name 2 things you can smell" },
  { count:1, sense:"TASTE", prompt:"Name 1 thing you can taste" },
];

const TIMEOUT_STEPS = [
  { name:"Notice", desc:'Silently name it: "Anger at 7/10. I need to pause."', time:"5 sec" },
  { name:"Signal", desc:'"I need 10 minutes to think clearly."', time:"10 sec" },
  { name:"Move", desc:"Change location — outside, another room, walk the corridor.", time:"1 min" },
  { name:"Regulate", desc:"Extended exhale breathing + grounding.", time:"5-8 min" },
  { name:"Return", desc:'Re-engage or postpone: "Let\'s resume in 1 hour."', time:"1 min" },
];

const DISTORTIONS = [
  "All-or-nothing",
  "Mind-reading",
  "Catastrophizing",
  "Should rules",
  "Overgeneralization",
  "Personalization",
  "Emotional reasoning",
  "Magnification"
];

const OPPOSITE_ACTIONS = [
  { urge:"Raise voice / attack", action:"Speak in a calm, soft tone; slightly slower pace" },
  { urge:"Send a sharp message", action:"Write it, delete it, write a measured version" },
  { urge:"Shut the person out", action:'Stay present; approach with curiosity ("Help me understand")' },
  { urge:"Argue to win", action:"Ask one question before making your point" },
  { urge:"Leave aggressively", action:"Stay, breathe, signal that you need a moment" },
  { urge:"Stew in resentment", action:"Do one kind or neutral act toward the person" },
];

const DEAR_MAN = [
  { letter:"D", word:"Describe", desc:"State the situation in objective terms." },
  { letter:"E", word:"Express", desc:'Express how you feel using "I" statements.' },
  { letter:"A", word:"Assert", desc:"Assert what you need clearly and specifically." },
  { letter:"R", word:"Reinforce", desc:"Explain the positive outcome for both parties." },
  { letter:"M", word:"Mindful", desc:"Stay on topic; do not bring up past grievances." },
  { letter:"A", word:"Appear confident", desc:"Steady voice, eye contact, upright posture." },
  { letter:"N", word:"Negotiate", desc:"Be willing to hear the other party and find partial solutions." },
];

// ===== STATE =====
let state = loadState();

function loadState() {
  const saved = localStorage.getItem('innercalm_state');
  const defaults = {
    startDate: new Date().toISOString().split('T')[0],
    logs: [],
    thoughtRecords: [],
    assessments: [],
    morningEntries: [],
    eveningEntries: [],
    dailyChecks: {},
    streak: 0,
    lastCheckDate: null,
  };
  return saved ? { ...defaults, ...JSON.parse(saved) } : defaults;
}

function saveState() {
  localStorage.setItem('innercalm_state', JSON.stringify(state));
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initApp();
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
});

function initApp() {
  updateGreeting();
  updateDateDisplay();
  updateWeekBadge();
  buildDailyChecklist();
  updateWeekFocus();
  initBodySignals();
  initIntensitySlider();
  buildScoreDots();
  buildWeekMap();
  updateProgressStats();
  buildIntensityChart();

  // Restore start date input
  document.getElementById('startDateInput').value = state.startDate;
}

// ===== NAVIGATION =====
function switchTab(tab) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.tab-bar button').forEach(b => b.classList.remove('active'));

  const viewId = 'view' + tab.charAt(0).toUpperCase() + tab.slice(1);
  document.getElementById(viewId).classList.add('active');
  document.querySelector(`.tab-bar button[data-tab="${tab}"]`).classList.add('active');

  // Reset tool detail views
  if (tab === 'tools') {
    document.getElementById('toolsList').style.display = '';
    document.getElementById('toolDetail').style.display = 'none';
  }
  if (tab === 'log') {
    document.getElementById('logForm').style.display = '';
    document.getElementById('logHistory').style.display = 'none';
  }
  if (tab === 'progress') {
    updateProgressStats();
    buildIntensityChart();
  }
}

// ===== WEEK CALCULATION =====
function getCurrentWeek() {
  const start = new Date(state.startDate);
  const now = new Date();
  const diffMs = now - start;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const week = Math.floor(diffDays / 7) + 1;
  return Math.max(1, Math.min(12, week));
}

function updateStartDate(val) {
  state.startDate = val;
  saveState();
  updateWeekBadge();
  buildDailyChecklist();
  updateWeekFocus();
  buildWeekMap();
}

// ===== HEADER =====
function updateGreeting() {
  const h = new Date().getHours();
  const g = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
  document.getElementById('greeting').textContent = g;
}

function updateDateDisplay() {
  const d = new Date();
  document.getElementById('dateDisplay').textContent =
    d.toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric' });
}

function updateWeekBadge() {
  const w = getCurrentWeek();
  document.getElementById('weekBadge').textContent = `Week ${w}`;
}

// ===== TODAY VIEW =====
function getDailyTasks() {
  const w = getCurrentWeek();
  const tasks = [
    { id:'morning', label:'Morning Intention Setting', time:'3-5 min', from:2 },
    { id:'breathing', label:'Extended Exhale Breathing', time:'5-10 min', from:1 },
    { id:'angerlog', label:'Anger Log (if episode)', time:'5-10 min', from:1 },
    { id:'midday', label:'Mid-Day Check-In', time:'2-3 min', from:2 },
    { id:'evening', label:'Evening Reflection', time:'10-15 min', from:2 },
  ];

  const dayOfWeek = new Date().getDay(); // 0=Sun
  const isPMRDay = [1,3,5].includes(dayOfWeek); // Mon,Wed,Fri
  if (isPMRDay && w >= 2) {
    tasks.splice(2, 0, { id:'pmr', label:'PMR Session', time:'15 min', from:2 });
  }

  if (w >= 4) {
    const isTRDay = [1,3,5].includes(dayOfWeek);
    if (isTRDay) {
      tasks.push({ id:'thoughtrecord', label:'CBT Thought Record', time:'15-20 min', from:4 });
    }
  }

  if (w >= 5 && dayOfWeek === 0) { // Sunday
    tasks.push({ id:'weeklyreview', label:'Weekly Pattern Review', time:'15-20 min', from:3 });
    tasks.push({ id:'oppositeaction', label:'Opposite Action Practice', time:'15 min', from:5 });
  }

  return tasks.filter(t => w >= t.from);
}

function buildDailyChecklist() {
  const list = document.getElementById('dailyChecklist');
  const today = new Date().toISOString().split('T')[0];
  const tasks = getDailyTasks();

  if (!state.dailyChecks[today]) state.dailyChecks[today] = {};
  const checks = state.dailyChecks[today];

  // Calculate total time
  let totalMin = 0;
  tasks.forEach(t => {
    const m = t.time.match(/(\d+)/);
    if (m) totalMin += parseInt(m[1]);
  });
  document.getElementById('todayTime').textContent = `~${totalMin} min`;

  list.innerHTML = tasks.map(t => {
    const done = checks[t.id] ? 'done' : '';
    return `<li class="${done}" onclick="toggleCheck('${t.id}', this)">
      <div class="check-box">${done ? '✓' : ''}</div>
      <span class="check-label">${t.label}</span>
      <span class="check-time">${t.time}</span>
    </li>`;
  }).join('');
}

function toggleCheck(id, el) {
  const today = new Date().toISOString().split('T')[0];
  if (!state.dailyChecks[today]) state.dailyChecks[today] = {};
  state.dailyChecks[today][id] = !state.dailyChecks[today][id];
  saveState();
  updateStreak();
  buildDailyChecklist();
}

function updateStreak() {
  let streak = 0;
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split('T')[0];
    const checks = state.dailyChecks[key];
    if (checks && Object.values(checks).some(v => v)) {
      streak++;
    } else if (i > 0) {
      break;
    }
  }
  state.streak = streak;
  saveState();
}

function updateWeekFocus() {
  const w = getCurrentWeek();
  const plan = WEEK_PLAN[w - 1];
  document.getElementById('weekFocusText').innerHTML =
    `<strong>Focus:</strong> ${plan.focus}<br><span style="color:var(--text2);font-size:0.85rem">New skills: ${plan.skills}</span>`;
}

// ===== ANGER LOG =====
function initBodySignals() {
  document.querySelectorAll('.body-signal').forEach(btn => {
    btn.addEventListener('click', () => btn.classList.toggle('selected'));
  });
}

function initIntensitySlider() {
  const slider = document.getElementById('logIntensity');
  const display = document.getElementById('intensityDisplay');
  slider.addEventListener('input', () => {
    display.textContent = slider.value;
    const v = parseInt(slider.value);
    display.style.color = v <= 3 ? 'var(--success)' : v <= 5 ? 'var(--warm)' : v <= 7 ? '#ff8a65' : 'var(--danger)';
  });
}

function saveLog() {
  const setting = document.getElementById('logSetting').value.trim();
  const trigger = document.getElementById('logTrigger').value.trim();
  const thought = document.getElementById('logThought').value.trim();
  const intensity = parseInt(document.getElementById('logIntensity').value);
  const action = document.getElementById('logAction').value.trim();
  const aftermath = document.getElementById('logAftermath').value.trim();

  if (!trigger) {
    alert('Please describe the trigger.');
    return;
  }

  const signals = [];
  document.querySelectorAll('.body-signal.selected').forEach(b => signals.push(b.dataset.signal));

  state.logs.unshift({
    id: Date.now(),
    date: new Date().toISOString(),
    setting, trigger, thought,
    bodySignals: signals,
    intensity, action, aftermath
  });

  saveState();
  clearLogForm();
  alert('Log entry saved.');
}

function clearLogForm() {
  document.getElementById('logSetting').value = '';
  document.getElementById('logTrigger').value = '';
  document.getElementById('logThought').value = '';
  document.getElementById('logAction').value = '';
  document.getElementById('logAftermath').value = '';
  document.getElementById('logIntensity').value = 5;
  document.getElementById('intensityDisplay').textContent = '5';
  document.getElementById('intensityDisplay').style.color = '';
  document.querySelectorAll('.body-signal.selected').forEach(b => b.classList.remove('selected'));
}

function showLogHistory() {
  document.getElementById('logForm').style.display = 'none';
  document.getElementById('logHistory').style.display = '';
  renderLogHistory();
}

function hideLogHistory() {
  document.getElementById('logForm').style.display = '';
  document.getElementById('logHistory').style.display = 'none';
}

function renderLogHistory() {
  const list = document.getElementById('logList');
  document.getElementById('logCount').textContent = `${state.logs.length} entries`;

  if (state.logs.length === 0) {
    list.innerHTML = '<div class="empty-state"><div class="empty-icon">📝</div><p>No entries yet. Log your first anger episode.</p></div>';
    return;
  }

  list.innerHTML = state.logs.map(l => {
    const d = new Date(l.date);
    const dateStr = d.toLocaleDateString('en-US', { month:'short', day:'numeric', hour:'numeric', minute:'2-digit' });
    return `<div class="log-entry">
      <div class="log-entry-header">
        <span class="log-entry-date">${dateStr}</span>
        <span class="log-entry-intensity intensity-${l.intensity}">${l.intensity}/10</span>
      </div>
      <div class="log-entry-trigger"><strong>Trigger:</strong> ${esc(l.trigger)}</div>
      ${l.thought ? `<div class="log-entry-thought">"${esc(l.thought)}"</div>` : ''}
      ${l.bodySignals?.length ? `<div style="margin-top:6px">${l.bodySignals.map(s => `<span class="tag tag-blue" style="margin:2px">${s.replace('-',' ')}</span>`).join('')}</div>` : ''}
      ${l.action ? `<div style="margin-top:6px;font-size:0.82rem;color:var(--text2)"><strong>Action:</strong> ${esc(l.action)}</div>` : ''}
      <button class="delete-btn" onclick="deleteLog(${l.id})">Delete</button>
    </div>`;
  }).join('');
}

function deleteLog(id) {
  if (!confirm('Delete this log entry?')) return;
  state.logs = state.logs.filter(l => l.id !== id);
  saveState();
  renderLogHistory();
}

// ===== TOOL DETAILS =====
function openTool(tool) {
  switchTab('tools');
  document.getElementById('toolsList').style.display = 'none';
  const detail = document.getElementById('toolDetail');
  detail.style.display = '';

  switch(tool) {
    case 'breathing': renderBreathing(detail); break;
    case 'grounding': renderGrounding(detail); break;
    case 'pmr': renderPMR(detail); break;
    case 'timeout': renderTimeout(detail); break;
    case 'feetfloor': renderFeetFloor(detail); break;
    case 'thoughtrecord': renderThoughtRecord(detail); break;
    case 'oppositeaction': renderOppositeAction(detail); break;
    case 'defusion': renderDefusion(detail); break;
    case 'dearman': renderDearMan(detail); break;
    case 'selfcompassion': renderSelfCompassion(detail); break;
  }
}

function backToTools() {
  stopAllTimers();
  document.getElementById('toolsList').style.display = '';
  document.getElementById('toolDetail').style.display = 'none';
}

// ===== BREATHING EXERCISE =====
let breathInterval = null;
let breathTimeout = null;

function renderBreathing(el) {
  el.innerHTML = `
    <button class="back-btn" onclick="backToTools()">← Tools</button>
    <h2 class="mb-8">Extended Exhale Breathing</h2>
    <p class="mb-16" style="color:var(--text2);font-size:0.9rem">
      4-count inhale, 1-2 hold, 6-8 exhale. The longer exhale activates your parasympathetic system.
    </p>
    <div class="breathing-container">
      <div class="breath-circle" id="breathCircle">
        <span class="breath-phase" id="breathPhase">Ready</span>
        <span class="breath-count" id="breathCount">-</span>
      </div>
      <div class="breath-cycles" id="breathCycles">Cycles: 0 / 12</div>
      <div class="breath-controls">
        <button class="btn btn-primary" id="breathStartBtn" onclick="startBreathing()">Start</button>
        <button class="btn btn-secondary" id="breathStopBtn" onclick="stopBreathing()" style="display:none">Stop</button>
      </div>
    </div>`;
}

function startBreathing() {
  document.getElementById('breathStartBtn').style.display = 'none';
  document.getElementById('breathStopBtn').style.display = '';

  let cycle = 0;
  const totalCycles = 12;

  function runCycle() {
    if (cycle >= totalCycles) {
      stopBreathing();
      document.getElementById('breathPhase').textContent = 'Complete!';
      document.getElementById('breathCount').textContent = '✓';
      return;
    }

    const circle = document.getElementById('breathCircle');
    const phase = document.getElementById('breathPhase');
    const count = document.getElementById('breathCount');
    const cyclesEl = document.getElementById('breathCycles');

    // Inhale 4s
    circle.className = 'breath-circle inhale';
    phase.textContent = 'Inhale';
    let t = 4;
    count.textContent = t;
    breathInterval = setInterval(() => {
      t--;
      if (t > 0) count.textContent = t;
    }, 1000);

    breathTimeout = setTimeout(() => {
      clearInterval(breathInterval);
      // Hold 2s
      circle.className = 'breath-circle hold';
      phase.textContent = 'Hold';
      t = 2;
      count.textContent = t;
      breathInterval = setInterval(() => {
        t--;
        if (t > 0) count.textContent = t;
      }, 1000);

      breathTimeout = setTimeout(() => {
        clearInterval(breathInterval);
        // Exhale 7s
        circle.className = 'breath-circle exhale';
        phase.textContent = 'Exhale';
        t = 7;
        count.textContent = t;
        breathInterval = setInterval(() => {
          t--;
          if (t > 0) count.textContent = t;
        }, 1000);

        breathTimeout = setTimeout(() => {
          clearInterval(breathInterval);
          cycle++;
          cyclesEl.textContent = `Cycles: ${cycle} / ${totalCycles}`;
          circle.className = 'breath-circle';
          runCycle();
        }, 7000);
      }, 2000);
    }, 4000);
  }

  runCycle();
}

function stopBreathing() {
  stopAllTimers();
  const startBtn = document.getElementById('breathStartBtn');
  const stopBtn = document.getElementById('breathStopBtn');
  if (startBtn) startBtn.style.display = '';
  if (stopBtn) stopBtn.style.display = 'none';
  const circle = document.getElementById('breathCircle');
  if (circle) circle.className = 'breath-circle';
}

function stopAllTimers() {
  clearInterval(breathInterval);
  clearTimeout(breathTimeout);
  clearInterval(window._pmrInterval);
  clearTimeout(window._pmrTimeout);
  breathInterval = null;
  breathTimeout = null;
}

// ===== GROUNDING EXERCISE =====
function renderGrounding(el) {
  el.innerHTML = `
    <button class="back-btn" onclick="backToTools()">← Tools</button>
    <h2 class="mb-8">5-4-3-2-1 Grounding</h2>
    <p class="mb-16" style="color:var(--text2);font-size:0.9rem">
      Redirect attention to your senses. This floods working memory with neutral data, crowding out the anger narrative.
    </p>
    <div id="groundingContent"></div>
    <div class="grounding-progress" id="groundingProgress"></div>`;

  window._groundingStep = 0;
  renderGroundingStep();
}

function renderGroundingStep() {
  const step = GROUNDING_STEPS[window._groundingStep];
  const content = document.getElementById('groundingContent');
  const progress = document.getElementById('groundingProgress');

  if (!step) {
    content.innerHTML = `
      <div class="grounding-step">
        <div class="grounding-number" style="color:var(--success)">✓</div>
        <div class="grounding-sense">Grounding Complete</div>
        <p class="grounding-prompt">Take a slow breath. Notice how your attention has shifted from the anger to the present moment.</p>
        <button class="btn btn-primary mt-20" onclick="backToTools()">Done</button>
      </div>`;
    return;
  }

  const inputs = Array.from({length: step.count}, (_, i) =>
    `<input type="text" placeholder="${step.sense.toLowerCase()} #${i+1}" class="grounding-input">`
  ).join('');

  content.innerHTML = `
    <div class="grounding-step">
      <div class="grounding-number">${step.count}</div>
      <div class="grounding-sense">things you can ${step.sense}</div>
      <p class="grounding-prompt">${step.prompt}</p>
      <div class="grounding-inputs">${inputs}</div>
      <button class="btn btn-primary mt-16" onclick="nextGroundingStep()">Next</button>
    </div>`;

  progress.innerHTML = GROUNDING_STEPS.map((_, i) => {
    const cls = i < window._groundingStep ? 'done' : i === window._groundingStep ? 'active' : '';
    return `<div class="grounding-dot ${cls}"></div>`;
  }).join('');
}

function nextGroundingStep() {
  window._groundingStep++;
  renderGroundingStep();
}

// ===== PMR EXERCISE =====
function renderPMR(el) {
  el.innerHTML = `
    <button class="back-btn" onclick="backToTools()">← Tools</button>
    <h2 class="mb-8">Progressive Muscle Relaxation</h2>
    <p class="mb-16" style="color:var(--text2);font-size:0.9rem">
      Tense each group for 5 seconds, release for 10 seconds. Notice the contrast between tension and release.
    </p>
    <div id="pmrContent" class="pmr-step">
      <button class="btn btn-primary btn-full" onclick="startPMR()">Begin PMR Session</button>
    </div>
    <div class="pmr-progress-bar"><div class="pmr-progress-fill" id="pmrProgressFill" style="width:0%"></div></div>`;
}

function startPMR() {
  window._pmrStep = 0;
  runPMRStep();
}

function runPMRStep() {
  if (window._pmrStep >= PMR_STEPS.length) {
    const content = document.getElementById('pmrContent');
    content.innerHTML = `
      <div class="pmr-body-part" style="color:var(--success)">Complete!</div>
      <p class="pmr-instruction">Lie still for 2 minutes, breathing slowly. Notice the difference between tension and complete release.</p>
      <button class="btn btn-primary mt-20" onclick="backToTools()">Done</button>`;
    document.getElementById('pmrProgressFill').style.width = '100%';
    return;
  }

  const step = PMR_STEPS[window._pmrStep];
  const content = document.getElementById('pmrContent');
  const progressPct = (window._pmrStep / PMR_STEPS.length) * 100;
  document.getElementById('pmrProgressFill').style.width = progressPct + '%';

  // TENSE phase (5 seconds)
  content.innerHTML = `
    <div class="pmr-body-part">${step.part}</div>
    <div class="pmr-instruction">${step.instruction}</div>
    <div class="pmr-phase tense">TENSE</div>
    <div class="pmr-timer" id="pmrTimer">5</div>
    <p style="color:var(--text3);font-size:0.82rem">${window._pmrStep + 1} of ${PMR_STEPS.length}</p>`;

  let t = 5;
  window._pmrInterval = setInterval(() => {
    t--;
    const timer = document.getElementById('pmrTimer');
    if (timer) timer.textContent = t;
  }, 1000);

  window._pmrTimeout = setTimeout(() => {
    clearInterval(window._pmrInterval);

    // RELEASE phase (10 seconds)
    content.innerHTML = `
      <div class="pmr-body-part">${step.part}</div>
      <div class="pmr-instruction">Let go completely. Feel the release.</div>
      <div class="pmr-phase release">RELEASE</div>
      <div class="pmr-timer" id="pmrTimer">10</div>
      <p style="color:var(--text3);font-size:0.82rem">${window._pmrStep + 1} of ${PMR_STEPS.length}</p>`;

    t = 10;
    window._pmrInterval = setInterval(() => {
      t--;
      const timer = document.getElementById('pmrTimer');
      if (timer) timer.textContent = t;
    }, 1000);

    window._pmrTimeout = setTimeout(() => {
      clearInterval(window._pmrInterval);
      window._pmrStep++;
      runPMRStep();
    }, 10000);
  }, 5000);
}

// ===== TIME-OUT PROTOCOL =====
function renderTimeout(el) {
  el.innerHTML = `
    <button class="back-btn" onclick="backToTools()">← Tools</button>
    <h2 class="mb-8">Structured Time-Out</h2>
    <p class="mb-16" style="color:var(--text2);font-size:0.9rem">
      A deliberate, purposeful pause. Not avoidance — a physiological reset. Always return to address the issue.
    </p>
    <div class="timeout-steps">
      ${TIMEOUT_STEPS.map((s, i) => `
        <div class="timeout-step ${i === 0 ? 'active' : ''}" id="toStep${i}">
          <div class="timeout-step-name">${i+1}. ${s.name}</div>
          <div class="timeout-step-desc">${s.desc}</div>
          <div class="timeout-step-time">${s.time}</div>
        </div>`).join('')}
    </div>
    <button class="btn btn-primary btn-full mt-12" id="toNextBtn" onclick="nextTimeoutStep()">Next Step</button>`;

  window._toStep = 0;
}

function nextTimeoutStep() {
  const prev = document.getElementById('toStep' + window._toStep);
  if (prev) { prev.classList.remove('active'); prev.classList.add('done'); }

  window._toStep++;

  if (window._toStep >= TIMEOUT_STEPS.length) {
    document.getElementById('toNextBtn').textContent = 'Done';
    document.getElementById('toNextBtn').onclick = backToTools;
    return;
  }

  const next = document.getElementById('toStep' + window._toStep);
  if (next) next.classList.add('active');
}

// ===== FEET ON FLOOR =====
function renderFeetFloor(el) {
  el.innerHTML = `
    <button class="back-btn" onclick="backToTools()">← Tools</button>
    <h2 class="mb-8">Feet on the Floor Reset</h2>
    <div style="text-align:center;padding:40px 20px">
      <div style="font-size:4rem;margin-bottom:20px">🦶</div>
      <p style="font-size:1.1rem;line-height:1.7;margin-bottom:20px">
        Press both feet firmly into the ground.<br>
        Feel the weight and contact.<br><br>
        Breathe out slowly, imagining physiological activation draining downward through your feet.
      </p>
      <p style="color:var(--text2);font-size:0.9rem">30 seconds. Ground yourself before responding.</p>
      <button class="btn btn-primary mt-20" id="feetBtn" onclick="startFeetTimer()">Start 30s Timer</button>
      <div id="feetTimer" style="font-size:3rem;font-weight:800;margin-top:20px;display:none">30</div>
    </div>`;
}

function startFeetTimer() {
  document.getElementById('feetBtn').style.display = 'none';
  const timer = document.getElementById('feetTimer');
  timer.style.display = '';
  let t = 30;
  timer.textContent = t;
  const iv = setInterval(() => {
    t--;
    timer.textContent = t;
    if (t <= 0) {
      clearInterval(iv);
      timer.textContent = '✓';
      timer.style.color = 'var(--success)';
    }
  }, 1000);
}

// ===== THOUGHT RECORD =====
function renderThoughtRecord(el) {
  el.innerHTML = `
    <button class="back-btn" onclick="backToTools()">← Tools</button>
    <h2 class="mb-16">CBT 6-Column Thought Record</h2>

    <div class="card thought-record-step">
      <div class="mb-8"><span class="tr-step-number">1</span><span class="tr-step-title">Situation</span></div>
      <div class="tr-step-hint">What exactly happened? Facts only.</div>
      <textarea id="trSituation" rows="2" placeholder="The deliverable was missed..."></textarea>
    </div>

    <div class="card thought-record-step">
      <div class="mb-8"><span class="tr-step-number">2</span><span class="tr-step-title">Automatic Thought</span></div>
      <div class="tr-step-hint">What was your immediate interpretation?</div>
      <textarea id="trThought" rows="2" placeholder="They did this on purpose..."></textarea>
    </div>

    <div class="card thought-record-step">
      <div class="mb-8"><span class="tr-step-number">3</span><span class="tr-step-title">Emotion + Intensity</span></div>
      <div class="tr-step-hint">What emotion? Rate 1-10.</div>
      <div style="display:flex;gap:10px">
        <input type="text" id="trEmotion" placeholder="Anger, frustration..." style="flex:1">
        <input type="number" id="trEmotionIntensity" min="1" max="10" placeholder="1-10" style="width:70px">
      </div>
    </div>

    <div class="card thought-record-step">
      <div class="mb-8"><span class="tr-step-number">4</span><span class="tr-step-title">Cognitive Distortion</span></div>
      <div class="tr-step-hint">Which thinking error applies?</div>
      <div class="distortion-list" id="trDistortions">
        ${DISTORTIONS.map(d => `<button class="distortion-chip" onclick="this.classList.toggle('selected')">${d}</button>`).join('')}
      </div>
    </div>

    <div class="card thought-record-step">
      <div class="mb-8"><span class="tr-step-number">5</span><span class="tr-step-title">Balanced Reframe</span></div>
      <div class="tr-step-hint">A genuinely more accurate, complete interpretation. Not forced positivity.</div>
      <textarea id="trReframe" rows="3" placeholder="What's another explanation? Would I think this in 6 months?"></textarea>
    </div>

    <div class="card thought-record-step">
      <div class="mb-8"><span class="tr-step-number">6</span><span class="tr-step-title">New Emotion + Intensity</span></div>
      <div class="tr-step-hint">Re-rate after reframing (should be lower than step 3).</div>
      <div style="display:flex;gap:10px">
        <input type="text" id="trNewEmotion" placeholder="Mild frustration..." style="flex:1">
        <input type="number" id="trNewIntensity" min="1" max="10" placeholder="1-10" style="width:70px">
      </div>
    </div>

    <button class="btn btn-primary btn-full mt-12" onclick="saveThoughtRecord()">Save Thought Record</button>
    ${state.thoughtRecords.length ? `<button class="btn btn-secondary btn-full mt-8" onclick="showThoughtRecordHistory()">View Past Records (${state.thoughtRecords.length})</button>` : ''}`;
}

function saveThoughtRecord() {
  const sit = document.getElementById('trSituation').value.trim();
  const thought = document.getElementById('trThought').value.trim();
  if (!sit || !thought) { alert('Please fill in the situation and thought.'); return; }

  const distortions = [];
  document.querySelectorAll('#trDistortions .selected').forEach(d => distortions.push(d.textContent));

  state.thoughtRecords.unshift({
    id: Date.now(),
    date: new Date().toISOString(),
    situation: sit,
    thought,
    emotion: document.getElementById('trEmotion').value.trim(),
    emotionIntensity: parseInt(document.getElementById('trEmotionIntensity').value) || 0,
    distortions,
    reframe: document.getElementById('trReframe').value.trim(),
    newEmotion: document.getElementById('trNewEmotion').value.trim(),
    newIntensity: parseInt(document.getElementById('trNewIntensity').value) || 0,
  });

  saveState();
  alert('Thought record saved.');
  openTool('thoughtrecord');
}

function showThoughtRecordHistory() {
  const detail = document.getElementById('toolDetail');
  detail.innerHTML = `
    <button class="back-btn" onclick="openTool('thoughtrecord')">← New Record</button>
    <h2 class="mb-16">Past Thought Records</h2>
    ${state.thoughtRecords.map(tr => {
      const d = new Date(tr.date).toLocaleDateString('en-US', {month:'short', day:'numeric'});
      const drop = tr.emotionIntensity && tr.newIntensity ? tr.emotionIntensity - tr.newIntensity : null;
      return `<div class="card">
        <div class="flex-between mb-8">
          <span style="font-size:0.82rem;color:var(--text2)">${d}</span>
          ${drop !== null ? `<span class="tag ${drop > 0 ? 'tag-green' : 'tag-warm'}">${drop > 0 ? '↓' : '→'} ${Math.abs(drop)} pts</span>` : ''}
        </div>
        <p style="font-weight:600;margin-bottom:4px">${esc(tr.situation)}</p>
        <p style="font-size:0.85rem;color:var(--text2);font-style:italic;margin-bottom:6px">"${esc(tr.thought)}"</p>
        ${tr.distortions.length ? `<div style="margin-bottom:6px">${tr.distortions.map(d => `<span class="tag tag-warm" style="margin:2px">${d}</span>`).join('')}</div>` : ''}
        ${tr.reframe ? `<p style="font-size:0.85rem;color:var(--success)">Reframe: ${esc(tr.reframe)}</p>` : ''}
      </div>`;
    }).join('')}`;
}

// ===== OPPOSITE ACTION =====
function renderOppositeAction(el) {
  el.innerHTML = `
    <button class="back-btn" onclick="backToTools()">← Tools</button>
    <h2 class="mb-8">DBT Opposite Action</h2>
    <p class="mb-16" style="color:var(--text2);font-size:0.9rem">
      Emotions are perpetuated by the behaviors they motivate. Acting <em>opposite</em> to the urge reduces the emotion's intensity and duration.
    </p>
    <div class="oa-table">
      ${OPPOSITE_ACTIONS.map(oa => `
        <div class="oa-row">
          <div class="oa-urge">${oa.urge}</div>
          <div class="oa-action">→ ${oa.action}</div>
        </div>`).join('')}
    </div>
    <div class="card mt-16">
      <h3 class="mb-8" style="font-size:0.95rem">Practice: Script Your Opposite Action</h3>
      <div class="form-group">
        <label>Recent anger incident</label>
        <textarea id="oaIncident" rows="2" placeholder="What happened?"></textarea>
      </div>
      <div class="form-group">
        <label>The opposite action I would have taken</label>
        <textarea id="oaOpposite" rows="2" placeholder="Instead of raising my voice, I would have..."></textarea>
      </div>
      <div class="form-group">
        <label>Upcoming situation to apply this</label>
        <textarea id="oaUpcoming" rows="2" placeholder="In tomorrow's meeting, I will..."></textarea>
      </div>
    </div>
    <p class="mt-12" style="color:var(--text3);font-size:0.82rem">
      <strong>When to use:</strong> When anger is not fully justified (based on misinterpretation) or when acting on it would damage your goals or values.
    </p>`;
}

// ===== DEFUSION =====
function renderDefusion(el) {
  el.innerHTML = `
    <button class="back-btn" onclick="backToTools()">← Tools</button>
    <h2 class="mb-8">ACT Defusion & Acceptance</h2>
    <p class="mb-16" style="color:var(--text2);font-size:0.9rem">
      Create psychological distance between you and your angry thoughts. You are not the thought — you are the sky; the thought is a passing cloud.
    </p>

    <div class="card">
      <h3 class="mb-12" style="font-size:0.95rem">Defusion Exercise (10 min)</h3>
      <div class="form-group">
        <label>Your recurring angry thought</label>
        <textarea id="defThought" rows="2" placeholder='e.g., "This is completely disrespectful"' oninput="updateDefusion()"></textarea>
      </div>
      <div id="defusionOutputs" style="display:none">
        <p class="mb-8" style="font-size:0.9rem"><strong>Now say:</strong></p>
        <div class="card" style="background:var(--surface2);margin-bottom:8px">
          <p style="font-style:italic" id="defOutput1"></p>
        </div>
        <p class="mb-8 mt-12" style="font-size:0.9rem"><strong>Tabloid headline:</strong></p>
        <div class="card" style="background:var(--surface2);margin-bottom:8px">
          <p style="font-style:italic" id="defOutput2"></p>
        </div>
        <p class="mb-8 mt-12" style="font-size:0.9rem"><strong>Ask yourself:</strong></p>
        <div class="card" style="background:var(--surface2)">
          <p>"Is this thought <em>useful</em> to me right now, or is it simply automatic?"</p>
        </div>
      </div>
    </div>

    <div class="card mt-12">
      <h3 class="mb-12" style="font-size:0.95rem">Acceptance Sitting (5 min)</h3>
      <p style="color:var(--text2);font-size:0.9rem;line-height:1.6">
        Sit quietly with a recent anger memory. Allow the physical sensations and emotions to be present without trying to suppress or analyze them.<br><br>
        Name them simply: "There is tension. There is heat. There is the thought that I was wronged."<br><br>
        Breathe slowly. Practice tolerating discomfort without it dictating behavior.
      </p>
      <button class="btn btn-secondary btn-full mt-12" onclick="openTool('breathing')">Start Breathing Timer</button>
    </div>

    <div class="card mt-12">
      <h3 class="mb-12" style="font-size:0.95rem">Values & Committed Action</h3>
      <div class="form-group">
        <label>When in conflict, who do I want to be?</label>
        <textarea id="defValues" rows="2" placeholder="Measured, fair, firm, respectful..."></textarea>
      </div>
      <div class="form-group">
        <label>Committed action for an upcoming high-risk situation</label>
        <textarea id="defAction" rows="2" placeholder='"Even if triggered, I commit to asking a clarifying question before responding."'></textarea>
      </div>
    </div>`;
}

function updateDefusion() {
  const thought = document.getElementById('defThought').value.trim();
  const outputs = document.getElementById('defusionOutputs');
  if (!thought) { outputs.style.display = 'none'; return; }

  outputs.style.display = '';
  document.getElementById('defOutput1').textContent =
    `"I am having the thought that ${thought.toLowerCase().replace(/^"/, '').replace(/"$/, '')}."`;
  document.getElementById('defOutput2').textContent =
    `"Local Person Claims: ${thought.replace(/^"/, '').replace(/"$/, '').replace(/^\w/, c => c.toUpperCase())}"`;
}

// ===== DEAR MAN =====
function renderDearMan(el) {
  el.innerHTML = `
    <button class="back-btn" onclick="backToTools()">← Tools</button>
    <h2 class="mb-8">DEAR MAN Communication</h2>
    <p class="mb-16" style="color:var(--text2);font-size:0.9rem">
      Express your needs assertively without attacking or passive-aggressively withdrawing. Script the conversation before you have it.
    </p>
    ${DEAR_MAN.map(dm => `
      <div class="dear-man-letter">
        <div class="dm-letter">${dm.letter}</div>
        <div class="dm-text">
          <h4>${dm.word}</h4>
          <p>${dm.desc}</p>
        </div>
      </div>`).join('')}

    <div class="card mt-16">
      <h3 class="mb-12" style="font-size:0.95rem">Script Your Conversation</h3>
      <div class="form-group">
        <label>Situation</label>
        <textarea id="dmSituation" rows="2" placeholder="Describe the situation objectively..."></textarea>
      </div>
      <div class="form-group">
        <label>Your DEAR MAN script</label>
        <textarea id="dmScript" rows="6" placeholder="D: The project deadline was moved without discussion...&#10;E: I felt frustrated when...&#10;A: I need us to...&#10;R: This would help both of us because..."></textarea>
      </div>
      <p style="color:var(--text3);font-size:0.82rem">Read this aloud to yourself. Rehearsal builds neural pathways for assertive (vs. aggressive) expression.</p>
    </div>`;
}

// ===== SELF-COMPASSION =====
function renderSelfCompassion(el) {
  el.innerHTML = `
    <button class="back-btn" onclick="backToTools()">← Tools</button>
    <h2 class="mb-8">Self-Compassion</h2>
    <p class="mb-16" style="color:var(--text2);font-size:0.9rem">
      Post-episode self-criticism is itself an arousal state that increases vulnerability to the next episode. This is not self-indulgence — it is a neurological calming act.
    </p>

    <div class="card">
      <div class="card-header"><span class="card-icon">1️⃣</span><h3>Acknowledge</h3></div>
      <p>"That was a difficult moment. I am struggling with this."</p>
    </div>

    <div class="card">
      <div class="card-header"><span class="card-icon">2️⃣</span><h3>Common Humanity</h3></div>
      <p>"Everyone faces moments where their emotions override their intentions. I am not uniquely flawed."</p>
    </div>

    <div class="card">
      <div class="card-header"><span class="card-icon">3️⃣</span><h3>Kind Self-Talk</h3></div>
      <p>"I am learning. This is a process. One episode does not define the trajectory."</p>
    </div>

    <div class="card">
      <div class="card-header"><span class="card-icon">4️⃣</span><h3>Redirect</h3></div>
      <p>"What will I do differently next time? What skill will I deploy?"</p>
    </div>

    <div class="card mt-12">
      <h3 class="mb-8" style="font-size:0.95rem">Your Reflection</h3>
      <div class="form-group">
        <label>Acknowledging the difficulty</label>
        <textarea rows="2" placeholder="What happened and how you feel about it..."></textarea>
      </div>
      <div class="form-group">
        <label>Next-time intention</label>
        <textarea rows="2" placeholder="Next time, I will deploy [skill] when I notice [body signal]..."></textarea>
      </div>
    </div>`;
}

// ===== ROUTINES (MODAL) =====
function openRoutine(type) {
  const modal = document.getElementById('modalOverlay');
  const content = document.getElementById('modalContent');
  modal.classList.add('active');

  switch(type) {
    case 'morning': renderMorningRoutine(content); break;
    case 'evening': renderEveningRoutine(content); break;
    case 'midday': renderMiddayCheckin(content); break;
    case 'weeklyreview': renderWeeklyReview(content); break;
  }
}

function closeModal(e) {
  if (e && e.target !== document.getElementById('modalOverlay')) return;
  document.getElementById('modalOverlay').classList.remove('active');
}

function renderMorningRoutine(el) {
  el.innerHTML = `
    <div class="modal-header">
      <h2>🌅 Morning Intention</h2>
      <button class="modal-close" onclick="closeModal(event)">&times;</button>
    </div>

    <div class="card">
      <h3 class="mb-8" style="font-size:0.95rem">1. Intention Setting (3-5 min)</h3>
      <div class="form-group">
        <label>What situations today might trigger anger?</label>
        <textarea id="morningTriggers" rows="2" placeholder="A meeting, a delayed response, a person..."></textarea>
      </div>
      <div class="form-group">
        <label>Which skill will I deploy if triggered?</label>
        <select id="morningSkill">
          <option value="">Choose a skill...</option>
          <option>Extended Exhale Breathing</option>
          <option>5-4-3-2-1 Grounding</option>
          <option>Feet on the Floor</option>
          <option>Time-Out Protocol</option>
          <option>Cognitive Reframe</option>
          <option>Opposite Action</option>
          <option>DEAR MAN</option>
        </select>
      </div>
      <div class="form-group">
        <label>Who do I want to be today in difficult moments?</label>
        <input type="text" id="morningValue" placeholder="A value or quality: calm, fair, measured...">
      </div>
    </div>

    <div class="card">
      <h3 class="mb-8" style="font-size:0.95rem">2. Breathing Practice (5-10 min)</h3>
      <p style="color:var(--text2);font-size:0.9rem;margin-bottom:12px">Complete one session of extended exhale breathing to start the day regulated.</p>
      <button class="btn btn-secondary btn-full" onclick="closeModal(event);openTool('breathing')">Open Breathing Timer</button>
    </div>

    <button class="btn btn-primary btn-full mt-12" onclick="saveMorning()">Save Morning Intention</button>`;
}

function saveMorning() {
  state.morningEntries.unshift({
    date: new Date().toISOString(),
    triggers: document.getElementById('morningTriggers').value,
    skill: document.getElementById('morningSkill').value,
    value: document.getElementById('morningValue').value,
  });
  saveState();

  const today = new Date().toISOString().split('T')[0];
  if (!state.dailyChecks[today]) state.dailyChecks[today] = {};
  state.dailyChecks[today].morning = true;
  saveState();
  buildDailyChecklist();

  document.getElementById('modalOverlay').classList.remove('active');
}

function renderEveningRoutine(el) {
  el.innerHTML = `
    <div class="modal-header">
      <h2>🌙 Evening Reflection</h2>
      <button class="modal-close" onclick="closeModal(event)">&times;</button>
    </div>

    <div class="card">
      <h3 class="mb-8" style="font-size:0.95rem">1. Anger Log</h3>
      <p style="color:var(--text2);font-size:0.9rem;margin-bottom:12px">Log any episodes today. Even if none, note "no significant trigger" for continuity.</p>
      <button class="btn btn-secondary btn-full" onclick="closeModal(event);switchTab('log')">Open Anger Log</button>
    </div>

    <div class="card">
      <h3 class="mb-8" style="font-size:0.95rem">2. Skill Effectiveness Review</h3>
      <div class="form-group">
        <label>Did I use any skill today? Which one?</label>
        <input type="text" id="eveningSkill" placeholder="Extended breathing, grounding...">
      </div>
      <div class="form-group">
        <label>Did it work? What reduced / escalated my anger?</label>
        <textarea id="eveningEffective" rows="2" placeholder="What helped, what didn't..."></textarea>
      </div>
      <div class="form-group">
        <label>What would I do differently tomorrow?</label>
        <textarea id="eveningTomorrow" rows="2" placeholder="I would..."></textarea>
      </div>
    </div>

    <div class="card">
      <h3 class="mb-8" style="font-size:0.95rem">3. Emotional Reset</h3>
      <p style="color:var(--text2);font-size:0.9rem;line-height:1.6">
        Take 3 slow breaths.<br>
        Name one thing that went well today — not just anger-related.<br>
        Name one thing you are grateful for.<br>
        Let go: "I have done what I can today. I will address what remains tomorrow."
      </p>
      <div class="form-group mt-12">
        <label>Something that went well</label>
        <input type="text" id="eveningGood" placeholder="Today I...">
      </div>
      <div class="form-group">
        <label>Grateful for</label>
        <input type="text" id="eveningGrateful" placeholder="I'm grateful for...">
      </div>
    </div>

    <button class="btn btn-primary btn-full mt-12" onclick="saveEvening()">Save Evening Reflection</button>`;
}

function saveEvening() {
  state.eveningEntries.unshift({
    date: new Date().toISOString(),
    skill: document.getElementById('eveningSkill').value,
    effective: document.getElementById('eveningEffective').value,
    tomorrow: document.getElementById('eveningTomorrow').value,
    good: document.getElementById('eveningGood').value,
    grateful: document.getElementById('eveningGrateful').value,
  });
  saveState();

  const today = new Date().toISOString().split('T')[0];
  if (!state.dailyChecks[today]) state.dailyChecks[today] = {};
  state.dailyChecks[today].evening = true;
  saveState();
  buildDailyChecklist();

  document.getElementById('modalOverlay').classList.remove('active');
}

function renderMiddayCheckin(el) {
  el.innerHTML = `
    <div class="modal-header">
      <h2>☀️ Mid-Day Check-In</h2>
      <button class="modal-close" onclick="closeModal(event)">&times;</button>
    </div>

    <div class="card">
      <div class="form-group">
        <label>Anger / irritability level right now (1-10)</label>
        <div class="intensity-display" id="middayIntDisplay">3</div>
        <input type="range" min="1" max="10" value="3" id="middayLevel"
          oninput="document.getElementById('middayIntDisplay').textContent=this.value">
      </div>
      <div class="form-group">
        <label>Any tension in body? (jaw, shoulders, chest)</label>
        <input type="text" id="middayTension" placeholder="Where do you feel it?">
      </div>
      <div class="form-group">
        <label>Any rumination about a morning event?</label>
        <textarea id="middayRumination" rows="2" placeholder="What keeps replaying?"></textarea>
      </div>
      <p style="color:var(--text2);font-size:0.85rem;margin-top:8px">
        If above 4/10 or physically tense: use breathing or grounding for 2-3 minutes before continuing.
      </p>
    </div>

    <div style="display:flex;gap:10px;margin-top:16px">
      <button class="btn btn-secondary" style="flex:1" onclick="closeModal(event);openTool('breathing')">Breathe</button>
      <button class="btn btn-secondary" style="flex:1" onclick="closeModal(event);openTool('grounding')">Ground</button>
    </div>

    <button class="btn btn-primary btn-full mt-12" onclick="saveMidday()">Save Check-In</button>`;
}

function saveMidday() {
  const today = new Date().toISOString().split('T')[0];
  if (!state.dailyChecks[today]) state.dailyChecks[today] = {};
  state.dailyChecks[today].midday = true;
  saveState();
  buildDailyChecklist();
  document.getElementById('modalOverlay').classList.remove('active');
}

function renderWeeklyReview(el) {
  // Gather stats from the past week's logs
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const weekLogs = state.logs.filter(l => new Date(l.date) >= oneWeekAgo);
  const avgInt = weekLogs.length ?
    (weekLogs.reduce((s,l) => s + l.intensity, 0) / weekLogs.length).toFixed(1) : '--';

  // Count trigger themes
  const triggers = {};
  weekLogs.forEach(l => {
    const words = l.trigger.toLowerCase();
    ['control', 'disrespect', 'incompetence', 'time', 'ignored', 'unfair', 'delay', 'rude'].forEach(kw => {
      if (words.includes(kw)) triggers[kw] = (triggers[kw] || 0) + 1;
    });
  });
  const topTriggers = Object.entries(triggers).sort((a,b) => b[1] - a[1]).slice(0, 3);

  // Count body signals
  const signals = {};
  weekLogs.forEach(l => {
    (l.bodySignals || []).forEach(s => signals[s] = (signals[s] || 0) + 1);
  });
  const topSignal = Object.entries(signals).sort((a,b) => b[1] - a[1])[0];

  el.innerHTML = `
    <div class="modal-header">
      <h2>📊 Weekly Pattern Review</h2>
      <button class="modal-close" onclick="closeModal(event)">&times;</button>
    </div>

    <div class="stat-grid mb-16">
      <div class="stat-card">
        <div class="stat-value">${weekLogs.length}</div>
        <div class="stat-label">Episodes</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${avgInt}</div>
        <div class="stat-label">Avg Intensity</div>
      </div>
    </div>

    <div class="card">
      <h3 class="mb-8" style="font-size:0.95rem">Top Recurring Triggers</h3>
      ${topTriggers.length ?
        topTriggers.map(([kw, c]) => `<span class="tag tag-warm" style="margin:3px">${kw} (${c}x)</span>`).join('') :
        '<p style="color:var(--text3);font-size:0.85rem">Log more episodes to see patterns.</p>'
      }
    </div>

    <div class="card">
      <h3 class="mb-8" style="font-size:0.95rem">Earliest Body Warning Signal</h3>
      <p style="color:var(--text2);font-size:0.9rem">${topSignal ? topSignal[0].replace('-',' ') + ` (${topSignal[1]}x this week)` : 'Not enough data yet.'}</p>
      <div class="form-group mt-8">
        <label>My earliest signal (the one before the thought)</label>
        <input type="text" id="weeklyEarlySignal" placeholder="e.g., jaw clenches before I realize I'm angry">
      </div>
    </div>

    <div class="card">
      <h3 class="mb-8" style="font-size:0.95rem">Intensity Trend</h3>
      <p style="color:var(--text2);font-size:0.9rem">Is overall intensity trending down over weeks?</p>
      <select id="weeklyTrend">
        <option value="">Select...</option>
        <option>Clearly decreasing</option>
        <option>Slightly decreasing</option>
        <option>About the same</option>
        <option>Increasing</option>
      </select>
    </div>

    <div class="card">
      <h3 class="mb-8" style="font-size:0.95rem">Action Intent for Next Week</h3>
      <div class="form-group">
        <label>"This week, when X happens, I will do Y instead of Z."</label>
        <textarea id="weeklyIntent" rows="3" placeholder="This week, when I feel disrespected, I will take 3 breaths before responding instead of raising my voice."></textarea>
      </div>
    </div>

    <button class="btn btn-primary btn-full mt-12" onclick="closeModal(event)">Done</button>`;
}

// ===== PROGRESS =====
function updateProgressStats() {
  document.getElementById('statEntries').textContent = state.logs.length;
  document.getElementById('statCurrentWeek').textContent = getCurrentWeek();
  updateStreak();
  document.getElementById('statStreak').textContent = state.streak;

  if (state.logs.length > 0) {
    const avg = (state.logs.reduce((s,l) => s + l.intensity, 0) / state.logs.length).toFixed(1);
    document.getElementById('statAvgIntensity').textContent = avg;
  }

  document.getElementById('startDateInput').value = state.startDate;
}

function buildIntensityChart() {
  const chart = document.getElementById('intensityChart');
  const recent = state.logs.slice(0, 7).reverse();

  if (recent.length === 0) {
    chart.innerHTML = '<div class="empty-state" style="width:100%"><p>Log entries to see your chart</p></div>';
    return;
  }

  chart.innerHTML = recent.map(l => {
    const h = (l.intensity / 10) * 100;
    const color = l.intensity <= 3 ? 'var(--success)' : l.intensity <= 5 ? 'var(--warm)' : l.intensity <= 7 ? '#ff8a65' : 'var(--danger)';
    const d = new Date(l.date);
    const label = d.toLocaleDateString('en-US', {month:'short', day:'numeric'});
    return `<div class="chart-bar-wrapper">
      <div class="chart-bar" style="height:${h}%;background:${color}"></div>
      <div class="chart-bar-label">${label}</div>
    </div>`;
  }).join('');
}

function buildScoreDots() {
  ['scoreAvgAnger','scoreEpisodes','scoreRecovery','scoreSkillUse','scoreSatisfaction'].forEach(id => {
    const el = document.getElementById(id);
    const metric = el.parentElement.dataset.metric;
    const current = state.assessments.length ? state.assessments[0][metric] : 0;
    el.innerHTML = Array.from({length:10}, (_, i) => {
      const n = i + 1;
      const sel = n === current ? 'selected' : '';
      return `<div class="score-dot ${sel}" onclick="selectScore('${metric}', ${n})">${n}</div>`;
    }).join('');
  });
}

function selectScore(metric, val) {
  document.querySelectorAll(`[data-metric="${metric}"] .score-dot`).forEach(d => {
    d.classList.toggle('selected', parseInt(d.textContent) === val);
  });
  if (!window._pendingAssessment) window._pendingAssessment = {};
  window._pendingAssessment[metric] = val;
}

function saveAssessment() {
  if (!window._pendingAssessment || Object.keys(window._pendingAssessment).length === 0) {
    alert('Select at least one score before saving.');
    return;
  }
  state.assessments.unshift({
    date: new Date().toISOString(),
    week: getCurrentWeek(),
    ...window._pendingAssessment
  });
  saveState();
  window._pendingAssessment = {};
  alert('Weekly assessment saved.');
}

function buildWeekMap() {
  const currentWeek = getCurrentWeek();
  const map = document.getElementById('weekMap');
  map.innerHTML = WEEK_PLAN.map(w => {
    const cls = w.week === currentWeek ? 'current' : w.week < currentWeek ? 'completed' : '';
    return `<div class="week-plan-card ${cls}">
      <div class="week-plan-header">
        <div class="week-plan-num">${w.week}</div>
        <div>
          <div class="week-plan-focus">${w.focus}</div>
          <div class="week-plan-skills">${w.skills}</div>
          <div class="week-plan-time">${w.time}/day</div>
        </div>
      </div>
    </div>`;
  }).join('');
}

// ===== HELPERS =====
function esc(str) {
  if (!str) return '';
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}
