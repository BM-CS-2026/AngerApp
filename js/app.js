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
  { part:"Feet & Toes", instruction:"Curl tightly", howTo:"While seated or lying down, curl all your toes downward as tightly as you can. Imagine gripping the ground with your feet. Squeeze hard enough to feel strong tension in the soles and tops of your feet.", tenseSec:5, releaseSec:10 },
  { part:"Calves", instruction:"Flex upward", howTo:"Point your toes up toward your shins (dorsiflexion). You should feel a strong pull along the back of your lower legs. Keep your feet flexed hard.", tenseSec:5, releaseSec:10 },
  { part:"Thighs", instruction:"Tighten quads", howTo:"Straighten your legs and squeeze your quadriceps (front of thigh) as hard as you can. Try to press the backs of your knees down into the surface. You should feel your entire upper leg become rigid.", tenseSec:5, releaseSec:10 },
  { part:"Glutes", instruction:"Squeeze", howTo:"Clench your buttocks together tightly. Squeeze as if you're trying to lift yourself off the seat. Hold the squeeze firmly.", tenseSec:5, releaseSec:10 },
  { part:"Abdomen", instruction:"Tighten core", howTo:"Pull your belly button toward your spine and brace your core as if someone is about to poke you in the stomach. Make your entire midsection rock-hard.", tenseSec:5, releaseSec:10 },
  { part:"Chest", instruction:"Deep breath & hold", howTo:"Take a deep breath and fill your lungs completely. Hold the breath and feel your chest expand and the muscles around your ribcage tighten. Notice the pressure and tension across your entire chest.", tenseSec:5, releaseSec:10 },
  { part:"Hands", instruction:"Clench into fists", howTo:"Make tight fists with both hands. Wrap your fingers around your thumbs and squeeze as hard as you can. Feel the tension in your fingers, palms, and the back of your hands.", tenseSec:5, releaseSec:10 },
  { part:"Forearms", instruction:"Tense toward shoulder", howTo:"With fists still clenched, bend your arms at the elbow and flex your biceps, bringing your fists toward your shoulders. Feel the tension running from your wrists through your forearms and into your upper arms.", tenseSec:5, releaseSec:10 },
  { part:"Shoulders", instruction:"Shrug toward ears", howTo:"Raise both shoulders up toward your ears as high as they'll go. Imagine trying to touch your shoulders to your earlobes. Hold them hunched up tightly.", tenseSec:5, releaseSec:10 },
  { part:"Neck", instruction:"Gently tilt back", howTo:"Gently press your head backward (against a pillow or headrest if available). Feel the tension in the back of your neck. Be gentle — you don't need maximum force here, just enough to feel the muscles engage.", tenseSec:5, releaseSec:10 },
  { part:"Face", instruction:"Scrunch all features to center", howTo:"Scrunch up your entire face: squeeze your eyes shut, wrinkle your nose, purse your lips tightly, clench your jaw. Try to bring every facial feature toward the center of your face. Feel the tension in your forehead, cheeks, jaw, and around your eyes.", tenseSec:5, releaseSec:10 },
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
  "All-or-nothing thinking",
  "Mind-reading",
  "Catastrophizing",
  "Should rules",
  "Overgeneralization",
  "Personalization",
  "Emotional reasoning",
  "Magnification",
  "Labeling",
  "Blaming",
  "Filtering (ignoring positives)",
  "Fortune-telling",
  "Disqualifying the positive",
  "Jumping to conclusions",
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
  { letter:"D", word:"Describe", desc:"Describe the situation in objective terms.", placeholder:"e.g. In yesterday's meeting, the deadline was moved without discussion..." },
  { letter:"E", word:"Express", desc:'Express how you feel using "I" statements.', placeholder:'e.g. I felt frustrated and caught off-guard when I learned about it after the fact...' },
  { letter:"A", word:"Assert", desc:"Assert what you need clearly and specifically.", placeholder:"e.g. I need to be included in decisions that affect my deliverables..." },
  { letter:"R", word:"Reinforce", desc:"Explain the positive outcome for both parties.", placeholder:"e.g. If we coordinate ahead of time, I can adjust my plan and we avoid last-minute pressure..." },
  { letter:"M", word:"Mindful", desc:"Stay on topic; do not bring up past grievances.", placeholder:"e.g. I will keep focus on this specific issue, not bring up last month..." },
  { letter:"A", word:"Appear confident", desc:"Steady voice, eye contact, upright posture.", placeholder:"e.g. I will maintain calm eye contact and speak at a measured pace..." },
  { letter:"N", word:"Negotiate", desc:"Be willing to hear the other party and find partial solutions.", placeholder:"e.g. I'm open to finding a middle ground — maybe a 24hr heads-up before changes..." },
];

// ===== STATE =====
let state = {
  startDate: new Date().toISOString().split('T')[0],
  logs: [],
  thoughtRecords: [],
  assessments: [],
  morningEntries: [],
  eveningEntries: [],
  dailyChecks: {},
  streak: 0,
};

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initApp();
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
});

async function initApp() {
  // Migrate from old localStorage if needed
  await migrateFromLocalStorage();

  // Load state from PouchDB
  state = await loadFullState();

  // Init UI
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
  renderHistory();
  document.getElementById('startDateInput').value = state.startDate;
  document.getElementById('userNameInput').value = state.userName || 'Boaz Manash';

  // Init sync
  initSyncUI();

  // Listen for PouchDB changes (from sync) to refresh UI
  localDB.changes({ since: 'now', live: true }).on('change', async () => {
    state = await loadFullState();
    renderHistory();
    buildDailyChecklist();
    updateProgressStats();
  });
}

// ===== NAVIGATION =====
function switchTab(tab) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.tab-bar button').forEach(b => b.classList.remove('active'));

  const viewId = 'view' + tab.charAt(0).toUpperCase() + tab.slice(1);
  document.getElementById(viewId).classList.add('active');
  document.querySelector(`.tab-bar button[data-tab="${tab}"]`).classList.add('active');

  if (tab === 'tools') {
    document.getElementById('toolsList').style.display = '';
    document.getElementById('toolDetail').style.display = 'none';
  }
  if (tab === 'history') renderHistory();
  if (tab === 'progress') updateProgressStats();
  if (tab === 'stoic') { renderStoicHistory(); renderWarningHistory(); loadModelOptions(); }
}

// ===== WEEK CALCULATION =====
function getCurrentWeek() {
  const start = new Date(state.startDate);
  const now = new Date();
  const diffDays = Math.floor((now - start) / (1000 * 60 * 60 * 24));
  return Math.max(1, Math.min(12, Math.floor(diffDays / 7) + 1));
}

function updateStartDate(val) {
  state.startDate = val;
  saveSetting('startDate', val);
  updateWeekBadge();
  buildDailyChecklist();
  updateWeekFocus();
  buildWeekMap();
}

// ===== HEADER =====
function updateGreeting() {
  const h = new Date().getHours();
  document.getElementById('greeting').textContent =
    h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
}

function updateDateDisplay() {
  document.getElementById('dateDisplay').textContent =
    new Date().toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric' });
}

function updateWeekBadge() {
  document.getElementById('weekBadge').textContent = `Week ${getCurrentWeek()}`;
}

// ===== TODAY VIEW =====
function getDailyTasks() {
  const w = getCurrentWeek();
  const tasks = [
    { id:'stoicmorning', label:'🏛 Stoic Morning Virtues', time:'5-10 min', from:1 },
    { id:'morning', label:'Morning Intention Setting', time:'3-5 min', from:2 },
    { id:'breathing', label:'Extended Exhale Breathing', time:'5-10 min', from:1 },
    { id:'angerlog', label:'Anger Log (if episode)', time:'5-10 min', from:1 },
    { id:'midday', label:'Mid-Day Check-In', time:'2-3 min', from:2 },
    { id:'stoicevening', label:'🏛 Seneca Evening Reflection', time:'5-10 min', from:1 },
    { id:'evening', label:'Evening Reflection', time:'10-15 min', from:2 },
  ];
  const dow = new Date().getDay();
  if ([1,3,5].includes(dow) && w >= 2) {
    tasks.splice(2, 0, { id:'pmr', label:'PMR Session', time:'15 min', from:2 });
  }
  if (w >= 4 && [1,3,5].includes(dow)) {
    tasks.push({ id:'thoughtrecord', label:'CBT Thought Record', time:'15-20 min', from:4 });
  }
  if (w >= 3 && dow === 0) {
    tasks.push({ id:'weeklyreview', label:'Weekly Pattern Review', time:'15-20 min', from:3 });
  }
  if (w >= 5 && dow === 0) {
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
  let totalMin = 0;
  tasks.forEach(t => { const m = t.time.match(/(\d+)/); if (m) totalMin += parseInt(m[1]); });
  document.getElementById('todayTime').textContent = `~${totalMin} min`;

  list.innerHTML = tasks.map(t => {
    const done = checks[t.id] ? 'done' : '';
    return `<li class="${done}" onclick="toggleCheck('${t.id}')">
      <div class="check-box">${done ? '✓' : ''}</div>
      <span class="check-label">${t.label}</span>
      <span class="check-time">${t.time}</span>
    </li>`;
  }).join('');
}

function toggleCheck(id) {
  const today = new Date().toISOString().split('T')[0];
  if (!state.dailyChecks[today]) state.dailyChecks[today] = {};
  state.dailyChecks[today][id] = !state.dailyChecks[today][id];
  saveDailyCheck(today, state.dailyChecks[today]);
  updateStreak();
  buildDailyChecklist();
}

function updateStreak() {
  let streak = 0;
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const d = new Date(today); d.setDate(d.getDate() - i);
    const key = d.toISOString().split('T')[0];
    const checks = state.dailyChecks[key];
    if (checks && Object.values(checks).some(v => v)) streak++;
    else if (i > 0) break;
  }
  state.streak = streak;
}

function updateWeekFocus() {
  const plan = WEEK_PLAN[getCurrentWeek() - 1];
  document.getElementById('weekFocusText').innerHTML =
    `<strong>Focus:</strong> ${plan.focus}<br><span style="color:var(--text2);font-size:0.85rem">New skills: ${plan.skills}</span>`;
}

// ===== ANGER LOG =====
let pendingPhoto = null;

function initBodySignals() {
  document.querySelectorAll('#bodySignals .body-signal').forEach(btn => {
    btn.addEventListener('click', () => btn.classList.toggle('selected'));
  });
}

function initIntensitySlider() {
  const slider = document.getElementById('logIntensity');
  const display = document.getElementById('intensityDisplay');
  slider.addEventListener('input', () => {
    display.textContent = slider.value;
    colorIntensity(display, parseInt(slider.value));
  });
}

function colorIntensity(el, v) {
  el.style.color = v <= 3 ? 'var(--success)' : v <= 5 ? 'var(--warm)' : v <= 7 ? '#ff8a65' : 'var(--danger)';
}

function previewLogPhoto(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    // Resize to max 400px to save localStorage space
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const max = 400;
      let w = img.width, h = img.height;
      if (w > max || h > max) {
        if (w > h) { h = Math.round(h * max / w); w = max; }
        else { w = Math.round(w * max / h); h = max; }
      }
      canvas.width = w; canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      pendingPhoto = canvas.toDataURL('image/jpeg', 0.7);
      document.getElementById('logPhotoPreview').innerHTML =
        `<div class="photo-preview-wrap">
          <img src="${pendingPhoto}" class="photo-preview">
          <button class="photo-remove" onclick="removeLogPhoto(event)">✕</button>
        </div>`;
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function removeLogPhoto(e) {
  e.stopPropagation();
  pendingPhoto = null;
  document.getElementById('logPhotoPreview').innerHTML = '';
  document.getElementById('logPhoto').value = '';
}

async function doSaveLog(editId) {
  const setting = document.getElementById('logSetting').value.trim();
  const trigger = document.getElementById('logTrigger').value.trim();
  const thought = document.getElementById('logThought').value.trim();
  const intensity = parseInt(document.getElementById('logIntensity').value);
  const action = document.getElementById('logAction').value.trim();
  const aftermath = document.getElementById('logAftermath').value.trim();
  const resolved = document.getElementById('logResolved').value.trim();
  const betterNext = document.getElementById('logBetterNext').value.trim();
  const timeToPeak = parseInt(document.getElementById('logTimeToPeak').value) || 0;
  const durMin = parseInt(document.getElementById('logDurationMin').value) || 0;
  const durSec = parseInt(document.getElementById('logDurationSec').value) || 0;
  const durationTotal = durMin * 60 + durSec;

  if (!trigger) { alert('Please describe the trigger.'); return; }

  const signals = [];
  document.querySelectorAll('#bodySignals .body-signal.selected').forEach(b => signals.push(b.dataset.signal));

  const entry = {
    id: editId || Date.now(),
    date: editId ? (state.logs.find(l => l.id === editId)?.date || new Date().toISOString()) : new Date().toISOString(),
    setting, trigger, thought,
    bodySignals: signals,
    intensity, action, aftermath,
    resolved, betterNext,
    timeToPeak, duration: durationTotal,
    photo: pendingPhoto || (editId ? state.logs.find(l => l.id === editId)?.photo : null),
  };

  // Save to PouchDB
  await saveLog(entry);

  // Update in-memory state
  if (editId) {
    const idx = state.logs.findIndex(l => l.id === editId);
    if (idx >= 0) state.logs[idx] = entry;
  } else {
    state.logs.unshift(entry);
  }

  clearLogForm();
  pendingPhoto = null;
  window._editingLogId = null;

  const saveBtn = document.querySelector('#logForm .btn-primary');
  if (saveBtn) { saveBtn.textContent = 'Save Log Entry'; saveBtn.setAttribute('onclick', 'doSaveLog()'); }

  alert(editId ? 'Entry updated.' : 'Log entry saved.');
}

function clearLogForm() {
  ['logSetting','logTrigger','logThought','logAction','logAftermath','logResolved','logBetterNext','logTimeToPeak','logDurationMin','logDurationSec'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  document.getElementById('logIntensity').value = 5;
  document.getElementById('intensityDisplay').textContent = '5';
  document.getElementById('intensityDisplay').style.color = '';
  document.querySelectorAll('#bodySignals .body-signal.selected').forEach(b => b.classList.remove('selected'));
  document.getElementById('logPhotoPreview').innerHTML = '';
  document.getElementById('logPhoto').value = '';
  pendingPhoto = null;
}

function editLog(id) {
  const log = state.logs.find(l => l.id === id);
  if (!log) return;

  switchTab('log');
  window._editingLogId = id;

  document.getElementById('logSetting').value = log.setting || '';
  document.getElementById('logTrigger').value = log.trigger || '';
  document.getElementById('logThought').value = log.thought || '';
  document.getElementById('logIntensity').value = log.intensity;
  document.getElementById('intensityDisplay').textContent = log.intensity;
  colorIntensity(document.getElementById('intensityDisplay'), log.intensity);
  document.getElementById('logAction').value = log.action || '';
  document.getElementById('logAftermath').value = log.aftermath || '';
  document.getElementById('logResolved').value = log.resolved || '';
  document.getElementById('logBetterNext').value = log.betterNext || '';
  document.getElementById('logTimeToPeak').value = log.timeToPeak || '';
  document.getElementById('logDurationMin').value = log.duration ? Math.floor(log.duration / 60) : '';
  document.getElementById('logDurationSec').value = log.duration ? (log.duration % 60) : '';

  // Body signals
  document.querySelectorAll('#bodySignals .body-signal').forEach(b => {
    b.classList.toggle('selected', (log.bodySignals || []).includes(b.dataset.signal));
  });

  // Photo
  if (log.photo) {
    pendingPhoto = log.photo;
    document.getElementById('logPhotoPreview').innerHTML =
      `<div class="photo-preview-wrap">
        <img src="${log.photo}" class="photo-preview">
        <button class="photo-remove" onclick="removeLogPhoto(event)">✕</button>
      </div>`;
  }

  // Change save button
  const saveBtn = document.querySelector('#logForm .btn-primary');
  if (saveBtn) {
    saveBtn.textContent = 'Update Entry';
    saveBtn.setAttribute('onclick', `doSaveLog(${id})`);
  }
}

async function deleteLog(id) {
  if (!confirm('Delete this log entry?')) return;
  await deleteLogDoc(id);
  state.logs = state.logs.filter(l => l.id !== id);
  renderHistory();
}

// ===== HISTORY VIEW =====
function renderHistory() {
  document.getElementById('logCount').textContent = `${state.logs.length} entries`;
  buildCalendarHeatmap();
  buildTimeOfDayChart();
  buildIntensityChart();
  renderLogList();
}

function buildCalendarHeatmap() {
  const container = document.getElementById('calendarHeatmap');
  const today = new Date();
  const cells = [];

  // Day labels
  let dayLabelsHtml = '<div class="heatmap-day-labels"><span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span></div>';

  // Build 35 days (5 weeks) going back
  for (let i = 34; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split('T')[0];
    const dayLogs = state.logs.filter(l => l.date.startsWith(key));
    const maxInt = dayLogs.length ? Math.max(...dayLogs.map(l => l.intensity)) : 0;
    const count = dayLogs.length;
    const dayNum = d.getDate();

    let bg = 'var(--surface3)';
    if (maxInt >= 8) bg = '#ef5350';
    else if (maxInt >= 6) bg = '#ff8a65';
    else if (maxInt >= 4) bg = '#ffb74d';
    else if (maxInt >= 1) bg = '#66bb6a';

    cells.push(`<div class="heatmap-cell ${count ? 'has-data' : ''}" style="background:${bg}" title="${key}: ${count} entries, max ${maxInt}/10">
      <span>${dayNum}</span>
      ${count ? `<span class="hm-count">${count}</span>` : ''}
    </div>`);
  }

  container.innerHTML = dayLabelsHtml + '<div class="calendar-heatmap" style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px">' + cells.join('') + '</div>';
}

function buildTimeOfDayChart() {
  const container = document.getElementById('todChart');
  // Group by 2-hour blocks
  const blocks = Array(12).fill(0);
  state.logs.forEach(l => {
    const h = new Date(l.date).getHours();
    blocks[Math.floor(h / 2)]++;
  });
  const max = Math.max(...blocks, 1);
  const labels = ['12a','2a','4a','6a','8a','10a','12p','2p','4p','6p','8p','10p'];

  container.innerHTML = blocks.map((count, i) => {
    const h = Math.round((count / max) * 60);
    const color = count === 0 ? 'var(--surface3)' : 'var(--accent)';
    return `<div class="tod-bar-wrap">
      <div class="tod-bar" style="height:${h}px;background:${color}"></div>
      <span class="tod-bar-label">${labels[i]}</span>
    </div>`;
  }).join('');
}

function buildIntensityChart() {
  const chart = document.getElementById('intensityChart');
  const recent = state.logs.slice(0, 10).reverse();

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

function renderLogList() {
  const list = document.getElementById('logList');
  if (state.logs.length === 0) {
    list.innerHTML = '<div class="empty-state"><div class="empty-icon">📝</div><p>No entries yet. Log your first anger episode.</p></div>';
    return;
  }

  list.innerHTML = state.logs.map(l => {
    const d = new Date(l.date);
    const dateStr = d.toLocaleDateString('en-US', { month:'short', day:'numeric', hour:'numeric', minute:'2-digit' });
    const durStr = l.duration ? (l.duration >= 60 ? `${Math.floor(l.duration/60)}m${l.duration%60 ? ' '+l.duration%60+'s' : ''}` : `${l.duration}s`) : '';

    return `<div class="log-entry">
      <div class="log-entry-header">
        <span class="log-entry-date">${dateStr}</span>
        <span class="log-entry-intensity intensity-${l.intensity}">${l.intensity}/10</span>
      </div>
      <div class="log-entry-trigger"><strong>Trigger:</strong> ${esc(l.trigger)}</div>
      ${l.thought ? `<div class="log-entry-thought">"${esc(l.thought)}"</div>` : ''}
      ${l.bodySignals?.length ? `<div style="margin-top:6px">${l.bodySignals.map(s => `<span class="tag tag-blue" style="margin:2px">${s.replace(/-/g,' ')}</span>`).join('')}</div>` : ''}
      ${(l.timeToPeak || durStr) ? `<div class="log-entry-timing">
        ${l.timeToPeak ? `<span>⚡ Peak: ${l.timeToPeak}s</span>` : ''}
        ${durStr ? `<span>⏱ Duration: ${durStr}</span>` : ''}
      </div>` : ''}
      ${l.action ? `<div style="margin-top:6px;font-size:0.82rem;color:var(--text2)"><strong>Action:</strong> ${esc(l.action)}</div>` : ''}
      ${l.resolved ? `<div style="margin-top:4px;font-size:0.82rem;color:var(--success)"><strong>Resolved by:</strong> ${esc(l.resolved)}</div>` : ''}
      ${l.betterNext ? `<div style="margin-top:4px;font-size:0.82rem;color:var(--accent)"><strong>Next time:</strong> ${esc(l.betterNext)}</div>` : ''}
      ${l.photo ? `<img src="${l.photo}" class="log-entry-photo" onclick="showFullPhoto('${l.id}')">` : ''}
      ${buildCognitiveDistancing(l)}
      <div class="log-entry-actions">
        <button class="btn btn-sm btn-secondary" onclick="editLog(${l.id})">✏️ Edit</button>
        <button class="btn btn-sm btn-secondary" onclick="logToCBT(${l.id})">🧠 CBT</button>
        <button class="btn btn-sm" style="color:var(--danger)" onclick="deleteLog(${l.id})">🗑 Delete</button>
      </div>
    </div>`;
  }).join('');
}

function showFullPhoto(id) {
  const log = state.logs.find(l => l.id === parseInt(id));
  if (!log?.photo) return;
  const div = document.createElement('div');
  div.className = 'photo-fullscreen';
  div.onclick = () => div.remove();
  div.innerHTML = `<button class="photo-fullscreen-close" onclick="this.parentElement.remove()">✕</button>
    <img src="${log.photo}">`;
  document.body.appendChild(div);
}

// Go from a log entry directly to CBT Thought Record
function logToCBT(id) {
  const log = state.logs.find(l => l.id === id);
  if (!log) return;
  openTool('thoughtrecord', log);
}

// ===== TOOL DETAILS =====
function openTool(tool, prefillData) {
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
    case 'thoughtrecord': renderThoughtRecord(detail, prefillData); break;
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

// ===== BREATHING =====
let breathInterval = null, breathTimeout = null;

function renderBreathing(el) {
  el.innerHTML = `
    <button class="back-btn" onclick="backToTools()">← Tools</button>
    <h2 class="mb-8">Extended Exhale Breathing</h2>
    <p class="mb-16" style="color:var(--text2);font-size:0.9rem">
      4-count inhale, 1-2 hold, 6-8 exhale. The longer exhale activates your parasympathetic system via the vagus nerve.
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
    // Inhale 4s
    circle.className = 'breath-circle inhale'; phase.textContent = 'Inhale';
    let t = 4; count.textContent = t;
    breathInterval = setInterval(() => { t--; if (t > 0) count.textContent = t; }, 1000);
    breathTimeout = setTimeout(() => {
      clearInterval(breathInterval);
      // Hold 2s
      circle.className = 'breath-circle hold'; phase.textContent = 'Hold';
      t = 2; count.textContent = t;
      breathInterval = setInterval(() => { t--; if (t > 0) count.textContent = t; }, 1000);
      breathTimeout = setTimeout(() => {
        clearInterval(breathInterval);
        // Exhale 7s
        circle.className = 'breath-circle exhale'; phase.textContent = 'Exhale';
        t = 7; count.textContent = t;
        breathInterval = setInterval(() => { t--; if (t > 0) count.textContent = t; }, 1000);
        breathTimeout = setTimeout(() => {
          clearInterval(breathInterval);
          cycle++;
          document.getElementById('breathCycles').textContent = `Cycles: ${cycle} / ${totalCycles}`;
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
  const s = document.getElementById('breathStartBtn'), t = document.getElementById('breathStopBtn');
  if (s) s.style.display = '';
  if (t) t.style.display = 'none';
  const c = document.getElementById('breathCircle');
  if (c) c.className = 'breath-circle';
}

function stopAllTimers() {
  clearInterval(breathInterval); clearTimeout(breathTimeout);
  clearInterval(window._pmrInterval); clearTimeout(window._pmrTimeout);
  breathInterval = breathTimeout = null;
}

// ===== GROUNDING =====
function renderGrounding(el) {
  el.innerHTML = `
    <button class="back-btn" onclick="backToTools()">← Tools</button>
    <h2 class="mb-8">5-4-3-2-1 Grounding</h2>
    <p class="mb-16" style="color:var(--text2);font-size:0.9rem">
      Redirect attention to your senses. This floods working memory with neutral sensory data, crowding out the anger narrative.
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
    content.innerHTML = `<div class="grounding-step">
      <div class="grounding-number" style="color:var(--success)">✓</div>
      <div class="grounding-sense">Grounding Complete</div>
      <p class="grounding-prompt">Take a slow breath. Notice how your attention has shifted to the present moment.</p>
      <button class="btn btn-primary mt-20" onclick="backToTools()">Done</button>
    </div>`;
    return;
  }

  const inputs = Array.from({length: step.count}, (_, i) =>
    `<input type="text" placeholder="${step.sense.toLowerCase()} #${i+1}" class="grounding-input">`
  ).join('');

  content.innerHTML = `<div class="grounding-step">
    <div class="grounding-number">${step.count}</div>
    <div class="grounding-sense">things you can ${step.sense}</div>
    <p class="grounding-prompt">${step.prompt}</p>
    <div class="grounding-inputs">${inputs}</div>
    <button class="btn btn-primary mt-16" onclick="window._groundingStep++;renderGroundingStep()">Next</button>
  </div>`;

  progress.innerHTML = GROUNDING_STEPS.map((_, i) => {
    const cls = i < window._groundingStep ? 'done' : i === window._groundingStep ? 'active' : '';
    return `<div class="grounding-dot ${cls}"></div>`;
  }).join('');
}

// ===== PMR (with detailed instructions) =====
function renderPMR(el) {
  el.innerHTML = `
    <button class="back-btn" onclick="backToTools()">← Tools</button>
    <h2 class="mb-8">Progressive Muscle Relaxation</h2>
    <p class="mb-16" style="color:var(--text2);font-size:0.9rem">
      Tense each muscle group for <strong>5 seconds</strong>, then release and relax for <strong>10 seconds</strong>.
      Focus on the <em>contrast</em> between tension and release. Practice 3x per week (Mon/Wed/Fri) when calm to build muscle memory.
    </p>

    <h3 class="mb-12">All 11 Muscle Groups</h3>
    ${PMR_STEPS.map((s, i) => `
      <div class="pmr-detail-card">
        <h4>${i+1}. ${s.part} — ${s.instruction}</h4>
        <div class="pmr-how">${s.howTo}</div>
        <div class="pmr-timing">Tense: ${s.tenseSec}s → Release: ${s.releaseSec}s</div>
      </div>
    `).join('')}

    <p class="mt-12 mb-16" style="color:var(--text2);font-size:0.85rem">
      After all 11 groups, lie still for 2 minutes breathing slowly. Notice the contrast between tension and complete release throughout your body.
    </p>

    <div id="pmrContent" class="pmr-step">
      <button class="btn btn-primary btn-full" onclick="startPMR()">Start Guided PMR Session</button>
    </div>
    <div class="pmr-progress-bar"><div class="pmr-progress-fill" id="pmrProgressFill" style="width:0%"></div></div>`;
}

function startPMR() {
  window._pmrStep = 0;
  runPMRStep();
}

function runPMRStep() {
  if (window._pmrStep >= PMR_STEPS.length) {
    const c = document.getElementById('pmrContent');
    c.innerHTML = `<div class="pmr-body-part" style="color:var(--success)">Complete!</div>
      <p class="pmr-instruction">Lie still for 2 minutes, breathing slowly. Notice the total-body release.</p>
      <button class="btn btn-primary mt-20" onclick="backToTools()">Done</button>`;
    document.getElementById('pmrProgressFill').style.width = '100%';
    return;
  }
  const step = PMR_STEPS[window._pmrStep];
  const c = document.getElementById('pmrContent');
  document.getElementById('pmrProgressFill').style.width = (window._pmrStep / PMR_STEPS.length * 100) + '%';

  // TENSE
  c.innerHTML = `<div class="pmr-body-part">${step.part}</div>
    <div class="pmr-instruction">${step.howTo}</div>
    <div class="pmr-phase tense">TENSE</div>
    <div class="pmr-timer" id="pmrTimer">${step.tenseSec}</div>
    <p style="color:var(--text3);font-size:0.82rem">${window._pmrStep+1} of ${PMR_STEPS.length}</p>`;

  let t = step.tenseSec;
  window._pmrInterval = setInterval(() => { t--; const el = document.getElementById('pmrTimer'); if (el) el.textContent = t; }, 1000);
  window._pmrTimeout = setTimeout(() => {
    clearInterval(window._pmrInterval);
    c.innerHTML = `<div class="pmr-body-part">${step.part}</div>
      <div class="pmr-instruction">Let go completely. Feel the warmth and heaviness as tension melts away.</div>
      <div class="pmr-phase release">RELEASE</div>
      <div class="pmr-timer" id="pmrTimer">${step.releaseSec}</div>
      <p style="color:var(--text3);font-size:0.82rem">${window._pmrStep+1} of ${PMR_STEPS.length}</p>`;
    t = step.releaseSec;
    window._pmrInterval = setInterval(() => { t--; const el = document.getElementById('pmrTimer'); if (el) el.textContent = t; }, 1000);
    window._pmrTimeout = setTimeout(() => {
      clearInterval(window._pmrInterval);
      window._pmrStep++;
      runPMRStep();
    }, step.releaseSec * 1000);
  }, step.tenseSec * 1000);
}

// ===== TIME-OUT (clickable steps, no Next button) =====
function renderTimeout(el) {
  el.innerHTML = `
    <button class="back-btn" onclick="backToTools()">← Tools</button>
    <h2 class="mb-8">Structured Time-Out</h2>
    <p class="mb-16" style="color:var(--text2);font-size:0.9rem">
      A deliberate, purposeful pause — not avoidance. Tap each step as you complete it. Always return to address the issue.
    </p>
    <div class="timeout-steps">
      ${TIMEOUT_STEPS.map((s, i) => `
        <div class="timeout-step" id="toStep${i}" onclick="toggleTimeoutStep(${i})">
          <span class="done-check">✓</span>
          <div class="timeout-step-name">${i+1}. ${s.name}</div>
          <div class="timeout-step-desc">${s.desc}</div>
          <div class="timeout-step-time">${s.time}</div>
        </div>`).join('')}
    </div>`;
}

function toggleTimeoutStep(i) {
  document.getElementById('toStep' + i).classList.toggle('done');
}

// ===== FEET ON FLOOR =====
function renderFeetFloor(el) {
  el.innerHTML = `
    <button class="back-btn" onclick="backToTools()">← Tools</button>
    <h2 class="mb-8">Feet on the Floor Reset</h2>
    <div style="text-align:center;padding:40px 20px">
      <div style="font-size:4rem;margin-bottom:20px">🦶</div>
      <p style="font-size:1.1rem;line-height:1.7;margin-bottom:20px">
        Press both feet firmly into the ground.<br>Feel the weight and contact.<br><br>
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
  let t = 30; timer.textContent = t;
  const iv = setInterval(() => { t--; timer.textContent = t; if (t<=0) { clearInterval(iv); timer.textContent='✓'; timer.style.color='var(--success)'; } }, 1000);
}

// ===== THOUGHT RECORD (with log pull & intensity bars) =====
function renderThoughtRecord(el, prefillLog) {
  // Build log selector options
  const logOpts = state.logs.map(l => {
    const d = new Date(l.date).toLocaleDateString('en-US', {month:'short', day:'numeric'});
    const preview = (l.trigger || '').substring(0, 50);
    return `<option value="${l.id}">${d} — ${preview}${preview.length >= 50 ? '...' : ''} (${l.intensity}/10)</option>`;
  }).join('');

  el.innerHTML = `
    <button class="back-btn" onclick="backToTools()">← Tools</button>
    <h2 class="mb-8">CBT 6-Column Thought Record</h2>
    <p class="mb-12" style="color:var(--text2);font-size:0.85rem">Choose an episode from your log or fill in manually.</p>

    ${state.logs.length ? `<div class="form-group">
      <label>Pull from existing log entry</label>
      <select id="trLogSelect" onchange="fillTRFromLog()">
        <option value="">— Select a log entry —</option>
        ${logOpts}
      </select>
    </div>` : ''}

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
      <input type="text" id="trEmotion" placeholder="Anger, frustration, betrayal..." class="mb-8">
      <div class="intensity-display" id="trIntDisplay">5</div>
      <input type="range" id="trIntSlider" min="1" max="10" value="5" class="intensity-slider"
        oninput="document.getElementById('trIntDisplay').textContent=this.value;colorIntensity(document.getElementById('trIntDisplay'),parseInt(this.value))">
      <div class="intensity-labels"><span>Mild</span><span>Extreme</span></div>
    </div>

    <div class="card thought-record-step">
      <div class="mb-8"><span class="tr-step-number">4</span><span class="tr-step-title">Cognitive Distortion</span></div>
      <div class="tr-step-hint">Which thinking error(s) apply? Tap to select, or type your own below.</div>
      <div class="distortion-list" id="trDistortions">
        ${DISTORTIONS.map(d => `<button class="distortion-chip" onclick="this.classList.toggle('selected')">${d}</button>`).join('')}
      </div>
      <input type="text" id="trDistortionFree" placeholder="Other distortion (free text)..." class="mt-8">
    </div>

    <div class="card thought-record-step">
      <div class="mb-8"><span class="tr-step-number">5</span><span class="tr-step-title">Balanced Reframe</span></div>
      <div class="tr-step-hint">A genuinely more accurate, complete interpretation. Not forced positivity. Ask: "What would I tell a respected colleague facing this?"</div>
      <textarea id="trReframe" rows="3" placeholder="What's another explanation? Would I care about this in 6 months?"></textarea>
    </div>

    <div class="card thought-record-step">
      <div class="mb-8"><span class="tr-step-number">6</span><span class="tr-step-title">New Emotion + Intensity</span></div>
      <div class="tr-step-hint">Re-rate after reframing. This should be lower than step 3 — that's the measurable sign of rewiring.</div>
      <input type="text" id="trNewEmotion" placeholder="Mild frustration, acceptance..." class="mb-8">
      <div class="intensity-display" id="trNewIntDisplay">3</div>
      <input type="range" id="trNewIntSlider" min="1" max="10" value="3" class="intensity-slider"
        oninput="document.getElementById('trNewIntDisplay').textContent=this.value;colorIntensity(document.getElementById('trNewIntDisplay'),parseInt(this.value))">
      <div class="intensity-labels"><span>Mild</span><span>Extreme</span></div>
    </div>

    <button class="btn btn-primary btn-full mt-12" onclick="doSaveThoughtRecord()">Save Thought Record</button>
    ${state.thoughtRecords.length ? `<button class="btn btn-secondary btn-full mt-8" onclick="showTRHistory()">View Past Records (${state.thoughtRecords.length})</button>` : ''}`;

  // Pre-fill from log if provided
  if (prefillLog) {
    document.getElementById('trSituation').value = `${prefillLog.setting || ''} ${prefillLog.trigger || ''}`.trim();
    document.getElementById('trThought').value = prefillLog.thought || '';
    document.getElementById('trEmotion').value = 'Anger';
    document.getElementById('trIntSlider').value = prefillLog.intensity;
    document.getElementById('trIntDisplay').textContent = prefillLog.intensity;
    colorIntensity(document.getElementById('trIntDisplay'), prefillLog.intensity);
    // Select the log in dropdown if it exists
    const sel = document.getElementById('trLogSelect');
    if (sel) sel.value = prefillLog.id;
  }
}

function fillTRFromLog() {
  const sel = document.getElementById('trLogSelect');
  const log = state.logs.find(l => l.id === parseInt(sel.value));
  if (!log) return;
  document.getElementById('trSituation').value = `${log.setting || ''} ${log.trigger || ''}`.trim();
  document.getElementById('trThought').value = log.thought || '';
  document.getElementById('trEmotion').value = 'Anger';
  document.getElementById('trIntSlider').value = log.intensity;
  document.getElementById('trIntDisplay').textContent = log.intensity;
  colorIntensity(document.getElementById('trIntDisplay'), log.intensity);
}

async function doSaveThoughtRecord() {
  const sit = document.getElementById('trSituation').value.trim();
  const thought = document.getElementById('trThought').value.trim();
  if (!sit || !thought) { alert('Please fill in the situation and thought.'); return; }

  const distortions = [];
  document.querySelectorAll('#trDistortions .selected').forEach(d => distortions.push(d.textContent));
  const freeDist = document.getElementById('trDistortionFree').value.trim();
  if (freeDist) distortions.push(freeDist);

  const tr = {
    id: Date.now(),
    date: new Date().toISOString(),
    situation: sit,
    thought,
    emotion: document.getElementById('trEmotion').value.trim(),
    emotionIntensity: parseInt(document.getElementById('trIntSlider').value),
    distortions,
    reframe: document.getElementById('trReframe').value.trim(),
    newEmotion: document.getElementById('trNewEmotion').value.trim(),
    newIntensity: parseInt(document.getElementById('trNewIntSlider').value),
  };

  await saveThoughtRecord(tr);
  state.thoughtRecords.unshift(tr);
  alert('Thought record saved.');
  openTool('thoughtrecord');
}

function showTRHistory() {
  const detail = document.getElementById('toolDetail');
  detail.innerHTML = `
    <button class="back-btn" onclick="openTool('thoughtrecord')">← New Record</button>
    <h2 class="mb-16">Past Thought Records</h2>
    ${state.thoughtRecords.map(tr => {
      const d = new Date(tr.date).toLocaleDateString('en-US', {month:'short', day:'numeric'});
      const drop = (tr.emotionIntensity && tr.newIntensity) ? tr.emotionIntensity - tr.newIntensity : null;
      return `<div class="card">
        <div class="flex-between mb-8">
          <span style="font-size:0.82rem;color:var(--text2)">${d}</span>
          ${drop !== null ? `<span class="tag ${drop > 0 ? 'tag-green' : 'tag-warm'}">${drop > 0 ? '↓' : '→'} ${Math.abs(drop)} pts</span>` : ''}
        </div>
        <p style="font-weight:600;margin-bottom:4px">${esc(tr.situation)}</p>
        <p style="font-size:0.85rem;color:var(--text2);font-style:italic;margin-bottom:6px">"${esc(tr.thought)}"</p>
        ${tr.distortions.length ? `<div style="margin-bottom:6px">${tr.distortions.map(d => `<span class="tag tag-warm" style="margin:2px">${d}</span>`).join('')}</div>` : ''}
        ${tr.reframe ? `<p style="font-size:0.85rem;color:var(--success)"><strong>Reframe:</strong> ${esc(tr.reframe)}</p>` : ''}
      </div>`;
    }).join('')}`;
}

// ===== OPPOSITE ACTION (with free text per row & consolidation) =====
function renderOppositeAction(el) {
  el.innerHTML = `
    <button class="back-btn" onclick="backToTools()">← Tools</button>
    <h2 class="mb-8">DBT Opposite Action</h2>
    <p class="mb-16" style="color:var(--text2);font-size:0.9rem">
      Emotions are perpetuated by the behaviors they motivate. Acting <em>opposite</em> to the urge reduces the emotion's intensity and duration.
      <br><br>For each urge you recognize, write how you will apply the opposite action in your specific situation.
    </p>
    <div class="oa-table">
      ${OPPOSITE_ACTIONS.map((oa, i) => `
        <div class="oa-row">
          <div class="oa-row-top">
            <div class="oa-urge">${oa.urge}</div>
            <div class="oa-action">→ ${oa.action}</div>
          </div>
          <textarea class="oa-free-text" data-idx="${i}" placeholder="How I'll apply this to my situation..." oninput="consolidateOA()"></textarea>
        </div>`).join('')}
    </div>

    <div class="consolidated-label">Your Consolidated Opposite Action Plan</div>
    <div class="consolidated-box" id="oaConsolidated">Write in the fields above to build your plan...</div>

    <p class="mt-16" style="color:var(--text3);font-size:0.82rem">
      <strong>When to use:</strong> When anger is not fully justified (based on misinterpretation) or when acting on it would damage your goals or values.
    </p>`;
}

function consolidateOA() {
  const texts = [];
  document.querySelectorAll('.oa-free-text').forEach(ta => {
    if (ta.value.trim()) {
      const idx = parseInt(ta.dataset.idx);
      texts.push(`${OPPOSITE_ACTIONS[idx].urge}: ${ta.value.trim()}`);
    }
  });
  document.getElementById('oaConsolidated').textContent =
    texts.length ? texts.join('\n\n') : 'Write in the fields above to build your plan...';
}

// ===== DEFUSION (with more examples and better explanations) =====
function renderDefusion(el) {
  el.innerHTML = `
    <button class="back-btn" onclick="backToTools()">← Tools</button>
    <h2 class="mb-8">ACT Defusion & Acceptance</h2>
    <p class="mb-12" style="color:var(--text2);font-size:0.9rem">
      ACT (Acceptance and Commitment Therapy) doesn't try to eliminate anger. It changes your <em>relationship</em> to anger — reducing the automatic power that thoughts and feelings have over your behavior. The goal: observe angry thoughts without being controlled by them.
    </p>

    <h3 class="mb-8">What is Defusion?</h3>
    <p class="mb-12" style="color:var(--text2);font-size:0.9rem">
      <strong>Fusion</strong> = you ARE the thought. "This is disrespectful" feels like absolute truth and compels reaction.<br>
      <strong>Defusion</strong> = you HAVE the thought. You notice it like a passing cloud — it exists, but it doesn't dictate your next move.
    </p>

    <h3 class="mb-8">Defusion Techniques</h3>

    <div class="example-box">
      <div class="example-label">Technique 1: "I am having the thought that..."</div>
      <p>Instead of "They don't respect me" → say: <em>"I am having the thought that they don't respect me."</em><br>
      This small reframe creates distance. The thought is something you're experiencing, not a fact you're living inside.</p>
    </div>

    <div class="example-box">
      <div class="example-label">Technique 2: Tabloid Headline</div>
      <p>Take your angry thought and imagine it as a sensationalized tabloid headline:<br>
      <em>"Local Man Outraged: Claims Colleague's Email Tone Is 'Completely Unacceptable'"</em><br>
      This adds absurdity and perspective, loosening the thought's grip on you.</p>
    </div>

    <div class="example-box">
      <div class="example-label">Technique 3: Clouds in the Sky</div>
      <p>Imagine you are the sky — vast, unchanging, always present. Your angry thoughts are clouds passing through. Some are dark storm clouds, some are light. They pass. You remain. You are not the weather.</p>
    </div>

    <div class="example-box">
      <div class="example-label">Technique 4: "Is this useful?"</div>
      <p>Ask: <em>"Is this thought useful to me right now, or is it simply automatic?"</em><br>
      Many angry thoughts are mental habits — your brain running a familiar script. Recognizing this breaks the autopilot.</p>
    </div>

    <div class="example-box">
      <div class="example-label">Technique 5: Silly Voice</div>
      <p>Repeat your angry thought in a cartoon voice (Mickey Mouse, a movie villain). It's nearly impossible to take "They ALWAYS do this to me" seriously in a squeaky voice. The content stays the same but the emotional charge drops.</p>
    </div>

    <div class="card mt-16">
      <h3 class="mb-12" style="font-size:0.95rem">Try It Now: Defusion Exercise</h3>
      <div class="form-group">
        <label>Your recurring angry thought</label>
        <textarea id="defThought" rows="2" placeholder='e.g., "This is completely disrespectful"' oninput="updateDefusion()"></textarea>
      </div>
      <div id="defusionOutputs" style="display:none">
        <p class="mb-8" style="font-size:0.9rem"><strong>Reframe 1 — "I am having the thought..."</strong></p>
        <div class="card" style="background:var(--surface2);margin-bottom:12px">
          <p style="font-style:italic" id="defOutput1"></p>
        </div>
        <p class="mb-8" style="font-size:0.9rem"><strong>Reframe 2 — Tabloid headline:</strong></p>
        <div class="card" style="background:var(--surface2);margin-bottom:12px">
          <p style="font-style:italic" id="defOutput2"></p>
        </div>
        <p class="mb-8" style="font-size:0.9rem"><strong>Reframe 3 — Ask yourself:</strong></p>
        <div class="card" style="background:var(--surface2)">
          <p>"Is this thought <em>useful</em> to me right now, or is it simply my brain running an automatic script?"</p>
        </div>
      </div>
    </div>

    <div class="card mt-12">
      <h3 class="mb-8" style="font-size:0.95rem">Acceptance Sitting (5 min)</h3>
      <p style="color:var(--text2);font-size:0.9rem;line-height:1.6;margin-bottom:12px">
        <strong>What to do:</strong> Sit quietly with a recent anger memory. Don't try to fix, suppress, or analyze it. Just be with it.
      </p>

      <div class="example-box">
        <div class="example-label">Step-by-step</div>
        <p>1. Close your eyes and recall the situation<br>
        2. Notice physical sensations: "There is tension in my jaw. There is heat in my chest."<br>
        3. Notice thoughts: "There is the thought that I was wronged."<br>
        4. Name each one without judgment — you're a scientist observing data<br>
        5. Breathe slowly. Let each sensation exist without needing to change it<br>
        6. After 5 minutes, notice: the feelings are still there but you didn't act on them. That's the skill.</p>
      </div>

      <button class="btn btn-secondary btn-full mt-8" onclick="openTool('breathing')">Start Breathing Timer</button>
    </div>

    <div class="card mt-12">
      <h3 class="mb-12" style="font-size:0.95rem">Values & Committed Action</h3>
      <p style="color:var(--text2);font-size:0.85rem;margin-bottom:12px">The final piece: connect your behavior to your values, not your emotions.</p>
      <div class="form-group">
        <label>When in conflict, who do I want to be?</label>
        <textarea id="defValues" rows="2" placeholder="e.g., Measured, fair, firm, respectful, clear-headed..."></textarea>
      </div>
      <div class="form-group">
        <label>Committed action for an upcoming high-risk situation</label>
        <textarea id="defAction" rows="2" placeholder='"Even if I am triggered in tomorrow\'s meeting, I commit to asking a clarifying question before responding to any provocation."'></textarea>
      </div>
    </div>`;
}

function updateDefusion() {
  const thought = document.getElementById('defThought').value.trim();
  const outputs = document.getElementById('defusionOutputs');
  if (!thought) { outputs.style.display = 'none'; return; }
  outputs.style.display = '';
  const clean = thought.replace(/^["']/, '').replace(/["']$/, '');
  document.getElementById('defOutput1').textContent = `"I am having the thought that ${clean.charAt(0).toLowerCase() + clean.slice(1)}."`;
  document.getElementById('defOutput2').textContent = `"BREAKING: Local Person Reports — ${clean.charAt(0).toUpperCase() + clean.slice(1)}"`;
}

// ===== DEAR MAN (per-line input + consolidation) =====
function renderDearMan(el) {
  el.innerHTML = `
    <button class="back-btn" onclick="backToTools()">← Tools</button>
    <h2 class="mb-8">DEAR MAN Communication</h2>
    <p class="mb-16" style="color:var(--text2);font-size:0.9rem">
      Express your needs assertively without attacking or passive-aggressively withdrawing.
      Fill in each letter below for your specific situation — the script will be assembled for you at the bottom.
    </p>
    ${DEAR_MAN.map(dm => `
      <div class="dear-man-letter">
        <div class="dm-letter">${dm.letter}</div>
        <div class="dm-text">
          <h4>${dm.word}</h4>
          <p>${dm.desc}</p>
          <textarea class="dm-input" data-letter="${dm.letter}" data-word="${dm.word}" placeholder="${dm.placeholder}" oninput="consolidateDM()"></textarea>
        </div>
      </div>`).join('')}

    <div class="consolidated-label mt-16">Your DEAR MAN Script</div>
    <div class="consolidated-box" id="dmConsolidated">Fill in the fields above to build your script...</div>
    <p class="mt-12" style="color:var(--text3);font-size:0.82rem">Read this script aloud to yourself before the conversation. Rehearsal builds the neural pathways for assertive (vs. aggressive) expression.</p>`;
}

function consolidateDM() {
  const parts = [];
  document.querySelectorAll('.dm-input').forEach(ta => {
    if (ta.value.trim()) {
      parts.push(`[${ta.dataset.word}] ${ta.value.trim()}`);
    }
  });
  document.getElementById('dmConsolidated').textContent =
    parts.length ? parts.join('\n\n') : 'Fill in the fields above to build your script...';
}

// ===== SELF-COMPASSION =====
function renderSelfCompassion(el) {
  el.innerHTML = `
    <button class="back-btn" onclick="backToTools()">← Tools</button>
    <h2 class="mb-8">Self-Compassion</h2>
    <p class="mb-16" style="color:var(--text2);font-size:0.9rem">
      Post-episode self-criticism is itself an arousal state that increases vulnerability to the next episode. This is not self-indulgence — it is a neurological calming act.
    </p>
    <div class="card"><div class="card-header"><span class="card-icon">1️⃣</span><h3>Acknowledge</h3></div><p>"That was a difficult moment. I am struggling with this."</p></div>
    <div class="card"><div class="card-header"><span class="card-icon">2️⃣</span><h3>Common Humanity</h3></div><p>"Everyone faces moments where their emotions override their intentions. I am not uniquely flawed."</p></div>
    <div class="card"><div class="card-header"><span class="card-icon">3️⃣</span><h3>Kind Self-Talk</h3></div><p>"I am learning. This is a process. One episode does not define the trajectory."</p></div>
    <div class="card"><div class="card-header"><span class="card-icon">4️⃣</span><h3>Redirect</h3></div><p>"What will I do differently next time? What skill will I deploy?"</p></div>
    <div class="card mt-12">
      <h3 class="mb-8" style="font-size:0.95rem">Your Reflection</h3>
      <div class="form-group"><label>Acknowledging the difficulty</label><textarea rows="2" placeholder="What happened and how you feel about it..."></textarea></div>
      <div class="form-group"><label>Next-time intention</label><textarea rows="2" placeholder="Next time, I will deploy [skill] when I notice [body signal]..."></textarea></div>
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
    <div class="modal-header"><h2>🌅 Morning Intention</h2><button class="modal-close" onclick="closeModal(event)">×</button></div>
    <div class="card">
      <h3 class="mb-8" style="font-size:0.95rem">1. Intention Setting (3-5 min)</h3>
      <div class="form-group"><label>What situations today might trigger anger?</label><textarea id="morningTriggers" rows="2" placeholder="A meeting, a delayed response, a person..."></textarea></div>
      <div class="form-group"><label>Which skill will I deploy if triggered?</label>
        <select id="morningSkill"><option value="">Choose a skill...</option><option>Extended Exhale Breathing</option><option>5-4-3-2-1 Grounding</option><option>Feet on the Floor</option><option>Time-Out Protocol</option><option>Cognitive Reframe</option><option>Opposite Action</option><option>DEAR MAN</option></select>
      </div>
      <div class="form-group"><label>Who do I want to be today in difficult moments?</label><input type="text" id="morningValue" placeholder="A value or quality: calm, fair, measured..."></div>
    </div>
    <div class="card">
      <h3 class="mb-8" style="font-size:0.95rem">2. Breathing Practice (5-10 min)</h3>
      <p style="color:var(--text2);font-size:0.9rem;margin-bottom:12px">Complete one session of extended exhale breathing to start the day regulated.</p>
      <button class="btn btn-secondary btn-full" onclick="closeModal(event);openTool('breathing')">Open Breathing Timer</button>
    </div>
    <button class="btn btn-primary btn-full mt-12" onclick="saveMorning()">Save Morning Intention</button>`;
}

async function saveMorning() {
  const m = {
    date: new Date().toISOString(),
    triggers: document.getElementById('morningTriggers').value,
    skill: document.getElementById('morningSkill').value,
    value: document.getElementById('morningValue').value,
  };
  await saveMorningEntry(m);
  state.morningEntries.unshift(m);
  const today = new Date().toISOString().split('T')[0];
  if (!state.dailyChecks[today]) state.dailyChecks[today] = {};
  state.dailyChecks[today].morning = true;
  await saveDailyCheck(today, state.dailyChecks[today]);
  buildDailyChecklist();
  document.getElementById('modalOverlay').classList.remove('active');
}

function renderEveningRoutine(el) {
  el.innerHTML = `
    <div class="modal-header"><h2>🌙 Evening Reflection</h2><button class="modal-close" onclick="closeModal(event)">×</button></div>
    <div class="card">
      <h3 class="mb-8" style="font-size:0.95rem">1. Anger Log</h3>
      <p style="color:var(--text2);font-size:0.9rem;margin-bottom:12px">Log any episodes today. Even if none, note "no significant trigger."</p>
      <button class="btn btn-secondary btn-full" onclick="closeModal(event);switchTab('log')">Open Anger Log</button>
    </div>
    <div class="card">
      <h3 class="mb-8" style="font-size:0.95rem">2. Skill Effectiveness Review</h3>
      <div class="form-group"><label>Did I use any skill today? Which one?</label><input type="text" id="eveningSkill" placeholder="Extended breathing, grounding..."></div>
      <div class="form-group"><label>Did it work? What reduced / escalated my anger?</label><textarea id="eveningEffective" rows="2" placeholder="What helped, what didn't..."></textarea></div>
      <div class="form-group"><label>What would I do differently tomorrow?</label><textarea id="eveningTomorrow" rows="2" placeholder="I would..."></textarea></div>
    </div>
    <div class="card">
      <h3 class="mb-8" style="font-size:0.95rem">3. Emotional Reset</h3>
      <p style="color:var(--text2);font-size:0.9rem;line-height:1.6">Take 3 slow breaths. Name one thing that went well today. Name one thing you are grateful for. Let go: "I have done what I can today."</p>
      <div class="form-group mt-12"><label>Something that went well</label><input type="text" id="eveningGood" placeholder="Today I..."></div>
      <div class="form-group"><label>Grateful for</label><input type="text" id="eveningGrateful" placeholder="I'm grateful for..."></div>
    </div>
    <button class="btn btn-primary btn-full mt-12" onclick="saveEvening()">Save Evening Reflection</button>`;
}

async function saveEvening() {
  const e = {
    date: new Date().toISOString(),
    skill: document.getElementById('eveningSkill').value,
    effective: document.getElementById('eveningEffective').value,
    tomorrow: document.getElementById('eveningTomorrow').value,
    good: document.getElementById('eveningGood').value,
    grateful: document.getElementById('eveningGrateful').value,
  };
  await saveEveningEntry(e);
  state.eveningEntries.unshift(e);
  const today = new Date().toISOString().split('T')[0];
  if (!state.dailyChecks[today]) state.dailyChecks[today] = {};
  state.dailyChecks[today].evening = true;
  await saveDailyCheck(today, state.dailyChecks[today]);
  buildDailyChecklist();
  document.getElementById('modalOverlay').classList.remove('active');
}

function renderMiddayCheckin(el) {
  el.innerHTML = `
    <div class="modal-header"><h2>☀️ Mid-Day Check-In</h2><button class="modal-close" onclick="closeModal(event)">×</button></div>
    <div class="card">
      <div class="form-group">
        <label>Anger / irritability level right now (1-10)</label>
        <div class="intensity-display" id="middayIntDisplay">3</div>
        <input type="range" min="1" max="10" value="3" id="middayLevel" oninput="document.getElementById('middayIntDisplay').textContent=this.value">
      </div>
      <div class="form-group"><label>Any tension in body?</label><input type="text" id="middayTension" placeholder="Jaw, shoulders, chest..."></div>
      <div class="form-group"><label>Any rumination about a morning event?</label><textarea id="middayRumination" rows="2" placeholder="What keeps replaying?"></textarea></div>
      <p style="color:var(--text2);font-size:0.85rem;margin-top:8px">If above 4/10 or physically tense: use breathing or grounding for 2-3 minutes.</p>
    </div>
    <div style="display:flex;gap:10px;margin-top:16px">
      <button class="btn btn-secondary" style="flex:1" onclick="closeModal(event);openTool('breathing')">Breathe</button>
      <button class="btn btn-secondary" style="flex:1" onclick="closeModal(event);openTool('grounding')">Ground</button>
    </div>
    <button class="btn btn-primary btn-full mt-12" onclick="saveMidday()">Save Check-In</button>`;
}

async function saveMidday() {
  const today = new Date().toISOString().split('T')[0];
  if (!state.dailyChecks[today]) state.dailyChecks[today] = {};
  state.dailyChecks[today].midday = true;
  await saveDailyCheck(today, state.dailyChecks[today]);
  buildDailyChecklist();
  document.getElementById('modalOverlay').classList.remove('active');
}

function renderWeeklyReview(el) {
  const oneWeekAgo = new Date(); oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const weekLogs = state.logs.filter(l => new Date(l.date) >= oneWeekAgo);
  const avgInt = weekLogs.length ? (weekLogs.reduce((s,l) => s + l.intensity, 0) / weekLogs.length).toFixed(1) : '--';
  const signals = {};
  weekLogs.forEach(l => (l.bodySignals || []).forEach(s => signals[s] = (signals[s] || 0) + 1));
  const topSignal = Object.entries(signals).sort((a,b) => b[1] - a[1])[0];

  el.innerHTML = `
    <div class="modal-header"><h2>📊 Weekly Pattern Review</h2><button class="modal-close" onclick="closeModal(event)">×</button></div>
    <div class="stat-grid mb-16">
      <div class="stat-card"><div class="stat-value">${weekLogs.length}</div><div class="stat-label">Episodes</div></div>
      <div class="stat-card"><div class="stat-value">${avgInt}</div><div class="stat-label">Avg Intensity</div></div>
    </div>
    <div class="card">
      <h3 class="mb-8" style="font-size:0.95rem">Earliest Body Warning Signal</h3>
      <p style="color:var(--text2);font-size:0.9rem">${topSignal ? topSignal[0].replace(/-/g,' ') + ` (${topSignal[1]}x this week)` : 'Not enough data yet.'}</p>
      <div class="form-group mt-8"><label>My earliest signal</label><input type="text" placeholder="e.g., jaw clenches before I realize I'm angry"></div>
    </div>
    <div class="card">
      <h3 class="mb-8" style="font-size:0.95rem">Action Intent for Next Week</h3>
      <div class="form-group"><label>"This week, when X happens, I will do Y instead of Z."</label>
        <textarea rows="3" placeholder="This week, when I feel disrespected, I will take 3 breaths before responding instead of raising my voice."></textarea>
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
    document.getElementById('statAvgIntensity').textContent =
      (state.logs.reduce((s,l) => s + l.intensity, 0) / state.logs.length).toFixed(1);
  }
  document.getElementById('startDateInput').value = state.startDate;
}

function buildScoreDots() {
  ['scoreAvgAnger','scoreEpisodes','scoreRecovery','scoreSkillUse','scoreSatisfaction'].forEach(id => {
    const el = document.getElementById(id);
    const metric = el.parentElement.dataset.metric;
    const current = state.assessments.length ? state.assessments[0][metric] : 0;
    el.innerHTML = Array.from({length:10}, (_, i) => {
      const n = i + 1;
      return `<div class="score-dot ${n === current ? 'selected' : ''}" onclick="selectScore('${metric}', ${n})">${n}</div>`;
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

async function saveAssessment() {
  if (!window._pendingAssessment || Object.keys(window._pendingAssessment).length === 0) {
    alert('Select at least one score before saving.'); return;
  }
  const a = { id: Date.now(), date: new Date().toISOString(), week: getCurrentWeek(), ...window._pendingAssessment };
  await saveAssessmentDoc(a);
  state.assessments.unshift(a);
  window._pendingAssessment = {};
  alert('Weekly assessment saved.');
}

function buildWeekMap() {
  const cw = getCurrentWeek();
  document.getElementById('weekMap').innerHTML = WEEK_PLAN.map(w => {
    const cls = w.week === cw ? 'current' : w.week < cw ? 'completed' : '';
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

// ===== COGNITIVE DISTANCING =====
function getUserName() {
  return state.userName || 'Boaz Manash';
}

function saveUserName(name) {
  state.userName = name;
  saveSetting('userName', name);
}

function buildCognitiveDistancing(log) {
  const name = getUserName();
  const intWord = log.intensity <= 3 ? 'mild' : log.intensity <= 5 ? 'moderate' : log.intensity <= 7 ? 'strong' : 'intense';

  // Third-person rephrase
  let thirdPerson = `${name} felt ${intWord} anger (${log.intensity}/10)`;
  if (log.trigger) thirdPerson += ` because ${log.trigger.charAt(0).toLowerCase() + log.trigger.slice(1).replace(/\.$/, '')}`;
  if (log.thought) thirdPerson += `. ${name}'s first thought was: "${log.thought}"`;
  if (log.action) thirdPerson += `. As a result, ${name} ${log.action.charAt(0).toLowerCase() + log.action.slice(1).replace(/\.$/, '')}`;
  if (log.aftermath) thirdPerson += `. Afterward, ${name} ${log.aftermath.charAt(0).toLowerCase() + log.aftermath.slice(1).replace(/\.$/, '')}`;
  thirdPerson += '.';

  // 20-year perspective
  let twentyYears = `Looking back 20 years from now, this was a moment when ${name} experienced ${intWord} frustration`;
  if (log.trigger) twentyYears += ` about ${log.trigger.charAt(0).toLowerCase() + log.trigger.slice(1).replace(/\.$/, '')}`;
  twentyYears += `. In the larger arc of life, this was a passing storm — one of thousands of small conflicts that shaped who ${name} chose to become.`;
  if (log.resolved) twentyYears += ` It was resolved when ${name} ${log.resolved.charAt(0).toLowerCase() + log.resolved.slice(1).replace(/\.$/, '')}.`;

  return `<div class="cog-distance">
    <div class="cog-distance-label">🏛 Third-person view</div>
    <p>${esc(thirdPerson)}</p>
  </div>
  <div class="cog-distance" style="margin-top:6px">
    <div class="cog-distance-label">🔭 20 years from now</div>
    <p>${esc(twentyYears)}</p>
  </div>`;
}

// ===== STOIC FEATURES =====

async function saveStoicMorning() {
  const entry = {
    id: Date.now(),
    type: 'morning',
    date: new Date().toISOString(),
    justice: document.getElementById('virtueJustice').value.trim(),
    courage: document.getElementById('virtueCourage').value.trim(),
    temperance: document.getElementById('virtueTemperance').value.trim(),
    wisdom: document.getElementById('virtueWisdom').value.trim(),
    negViz: [
      document.getElementById('negViz1').value.trim(),
      document.getElementById('negViz2').value.trim(),
      document.getElementById('negViz3').value.trim(),
    ].filter(v => v),
    models: {
      justice: document.getElementById('modelJustice').value.trim(),
      courage: document.getElementById('modelCourage').value.trim(),
      temperance: document.getElementById('modelTemperance').value.trim(),
      wisdom: document.getElementById('modelWisdom').value.trim(),
    }
  };

  // Save models for future use
  const modelNames = Object.values(entry.models).filter(n => n);
  for (const name of modelNames) {
    await dbPut('model', name, { name });
  }

  await dbPut('stoic', String(entry.id), entry);

  // Mark daily check
  const today = new Date().toISOString().split('T')[0];
  if (!state.dailyChecks[today]) state.dailyChecks[today] = {};
  state.dailyChecks[today].stoicmorning = true;
  await saveDailyCheck(today, state.dailyChecks[today]);
  buildDailyChecklist();

  // Clear form
  ['virtueJustice','virtueCourage','virtueTemperance','virtueWisdom','negViz1','negViz2','negViz3','modelJustice','modelCourage','modelTemperance','modelWisdom'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });

  alert('Morning practice saved.');
  renderStoicHistory();
}

async function saveStoicEvening() {
  const entry = {
    id: Date.now(),
    type: 'evening',
    date: new Date().toISOString(),
    well: document.getElementById('senecaWell').value.trim(),
    avoided: document.getElementById('senecaAvoided').value.trim(),
    tomorrow: document.getElementById('senecaTomorrow').value.trim(),
  };

  await dbPut('stoic', String(entry.id), entry);

  const today = new Date().toISOString().split('T')[0];
  if (!state.dailyChecks[today]) state.dailyChecks[today] = {};
  state.dailyChecks[today].stoicevening = true;
  await saveDailyCheck(today, state.dailyChecks[today]);
  buildDailyChecklist();

  ['senecaWell','senecaAvoided','senecaTomorrow'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });

  alert('Evening reflection saved.');
  renderStoicHistory();
}

async function saveWarningSign() {
  const entry = {
    id: Date.now(),
    type: 'warning',
    date: new Date().toISOString(),
    sign: document.getElementById('warningSign').value.trim(),
    habit: document.getElementById('warningHabit').value.trim(),
    replacement: document.getElementById('warningReplace').value.trim(),
  };
  if (!entry.sign) { alert('Please describe the early warning sign.'); return; }

  await dbPut('stoic', String(entry.id), entry);

  ['warningSign','warningHabit','warningReplace'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });

  alert('Warning sign saved.');
  renderWarningHistory();
}

async function loadModelOptions() {
  const models = await dbGetAll('model');
  const datalist = document.getElementById('modelOptions');
  if (!datalist) return;
  datalist.innerHTML = models.map(m => `<option value="${esc(m.name)}">`).join('');
}

async function renderStoicHistory() {
  const entries = await dbGetAll('stoic');
  entries.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  const container = document.getElementById('stoicHistory');
  if (!container) return;

  const journalEntries = entries.filter(e => e.type === 'morning' || e.type === 'evening').slice(0, 20);

  if (journalEntries.length === 0) {
    container.innerHTML = '<p style="color:var(--text3);font-size:0.85rem;text-align:center">No entries yet. Start with your morning practice above.</p>';
    return;
  }

  container.innerHTML = journalEntries.map(e => {
    const d = new Date(e.date).toLocaleDateString('en-US', { month:'short', day:'numeric', hour:'numeric', minute:'2-digit' });

    if (e.type === 'morning') {
      const virtues = [
        e.justice && `⚖️ ${e.justice}`,
        e.courage && `🦁 ${e.courage}`,
        e.temperance && `🧘 ${e.temperance}`,
        e.wisdom && `🦉 ${e.wisdom}`,
      ].filter(Boolean);
      const models = Object.entries(e.models || {}).filter(([,v]) => v).map(([k,v]) => `${k}: ${v}`);

      return `<div class="stoic-journal-entry">
        <div class="stoic-journal-date">${d}</div>
        <span class="stoic-journal-type morning">Morning</span>
        ${virtues.length ? `<div style="font-size:0.85rem;color:var(--text2)">${virtues.join('<br>')}</div>` : ''}
        ${e.negViz?.length ? `<div style="margin-top:6px;font-size:0.82rem;color:var(--text3)"><strong>Prepared for:</strong> ${e.negViz.join('; ')}</div>` : ''}
        ${models.length ? `<div style="margin-top:4px;font-size:0.82rem;color:var(--text3)"><strong>Models:</strong> ${models.join(', ')}</div>` : ''}
      </div>`;
    } else {
      return `<div class="stoic-journal-entry">
        <div class="stoic-journal-date">${d}</div>
        <span class="stoic-journal-type evening">Evening</span>
        ${e.well ? `<div style="font-size:0.85rem;color:var(--success)"><strong>Well:</strong> ${esc(e.well)}</div>` : ''}
        ${e.avoided ? `<div style="font-size:0.85rem;color:var(--warm)"><strong>Avoided:</strong> ${esc(e.avoided)}</div>` : ''}
        ${e.tomorrow ? `<div style="font-size:0.85rem;color:var(--accent)"><strong>Tomorrow:</strong> ${esc(e.tomorrow)}</div>` : ''}
      </div>`;
    }
  }).join('');
}

async function renderWarningHistory() {
  const entries = await dbGetAll('stoic');
  const warnings = entries.filter(e => e.type === 'warning').sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  const container = document.getElementById('warningHistory');
  if (!container) return;

  if (warnings.length === 0) { container.innerHTML = ''; return; }

  container.innerHTML = '<h4 style="font-size:0.85rem;margin-bottom:8px;color:var(--text2)">Saved Warning Signs</h4>' +
    warnings.slice(0, 10).map(w => {
      const d = new Date(w.date).toLocaleDateString('en-US', { month:'short', day:'numeric' });
      return `<div class="warning-entry">
        <div style="font-size:0.75rem;color:var(--text3);margin-bottom:4px">${d}</div>
        ${w.sign ? `<div><span class="we-label">Early sign:</span> <span class="we-text">${esc(w.sign)}</span></div>` : ''}
        ${w.habit ? `<div><span class="we-label">Old habit:</span> <span class="we-text">${esc(w.habit)}</span></div>` : ''}
        ${w.replacement ? `<div><span class="we-label">Replacement:</span> <span class="we-text" style="color:var(--success)">${esc(w.replacement)}</span></div>` : ''}
      </div>`;
    }).join('');
}

// ===== SYNC UI =====
function initSyncUI() {
  const url = getSyncUrl();
  const input = document.getElementById('syncUrlInput');
  if (input) input.value = url;
  if (url) {
    startSync(onSyncStatus);
    updateSyncBadge('connecting');
  }
}

function onSyncStatus(status, info) {
  updateSyncBadge(status);
}

function updateSyncBadge(status) {
  const el = document.getElementById('syncStatus');
  if (!el) return;
  el.style.display = '';
  switch(status) {
    case 'paused':
      el.textContent = 'Synced';
      el.className = 'tag tag-green mb-12';
      break;
    case 'active':
    case 'change':
    case 'connecting':
      el.textContent = 'Syncing...';
      el.className = 'tag tag-blue mb-12';
      break;
    case 'error':
      el.textContent = 'Sync error';
      el.className = 'tag mb-12';
      el.style.background = 'rgba(239,83,80,0.15)';
      el.style.color = 'var(--danger)';
      break;
    default:
      el.textContent = 'Not connected';
      el.className = 'tag tag-warm mb-12';
  }
}

async function connectSync() {
  const url = document.getElementById('syncUrlInput').value.trim();
  if (!url) { alert('Please enter a Cloudant database URL.'); return; }
  setSyncUrl(url);
  updateSyncBadge('connecting');
  startSync(onSyncStatus);
}

function disconnectSync() {
  stopSync();
  setSyncUrl('');
  document.getElementById('syncUrlInput').value = '';
  updateSyncBadge('disconnected');
}

async function testSyncConnection() {
  const url = document.getElementById('syncUrlInput').value.trim();
  if (!url) { alert('Please enter a URL first.'); return; }
  try {
    const info = await testSync(url);
    alert(`Connected! Database: ${info.db_name}\nDocuments: ${info.doc_count}`);
  } catch (e) {
    alert(`Connection failed: ${e.message}`);
  }
}

// ===== EXPORT / IMPORT =====
async function doExport() {
  try {
    const data = await exportAllData();
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `innercalm-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  } catch (e) {
    alert('Export failed: ' + e.message);
  }
}

async function doImport(input) {
  const file = input.files[0];
  if (!file) return;
  try {
    const text = await file.text();
    const data = JSON.parse(text);
    const count = await importAllData(data);
    state = await loadFullState();
    renderHistory();
    updateProgressStats();
    buildDailyChecklist();
    alert(`Imported ${count} records.`);
  } catch (e) {
    alert('Import failed: ' + e.message);
  }
  input.value = '';
}

// ===== HELPERS =====
function esc(str) {
  if (!str) return '';
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}
