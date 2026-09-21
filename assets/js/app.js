/**
 * Aqua Health Checker - Main Application Controller
 */

class AquaApp {
  constructor() {
    this.currentView = 'view-dashboard';
    this.currentTestResult = null;
    this.currentSelectedSource = null;
  }

  init() {
    this.initTheme();
    this.bindEvents();
    this.initLanguage();
    this.updateStats();
    this.renderRecentTests();
    this.renderTopSources();
    this.renderDatabaseTable();
    this.initSimulator();

    // Initialize map on dashboard after slight delay for proper DOM sizing
    setTimeout(() => {
      if (window.aquaMap) window.aquaMap.initCommunityMap();
    }, 150);

    // Re-render components on data updates
    window.addEventListener('databaseUpdated', () => {
      this.updateStats();
      this.renderRecentTests();
      this.renderTopSources();
      this.renderDatabaseTable();
      if (window.aquaMap) window.aquaMap.renderCommunityMarkers();
      if (window.aquaCharts) window.aquaCharts.renderAllAnalytics();
    });

    // Re-render components on language change
    window.addEventListener('languageChanged', () => {
      this.updateStats();
      this.renderRecentTests();
      this.renderTopSources();
      this.renderDatabaseTable();
      if (window.aquaCharts) window.aquaCharts.renderAllAnalytics();
      if (this.currentTestResult) this.displayResultModal(this.currentTestResult);
    });

    // Global keyboard shortcuts (Ctrl+K for search)
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('global-search-input');
        if (searchInput) {
          this.switchView('view-map-db');
          searchInput.focus();
        }
      }
    });

    // Set today's date in test form
    const dateInput = document.getElementById('input-date');
    if (dateInput) {
      dateInput.value = new Date().toISOString().split('T')[0];
    }
  }

  /* ==========================================================================
     THEME (DARK / LIGHT) MANAGEMENT
     ========================================================================== */
  initTheme() {
    const savedTheme = localStorage.getItem('aqua_theme') || 'dark';
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    this.updateThemeIcons();
  }

  toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('aqua_theme', isDark ? 'dark' : 'light');
    this.updateThemeIcons();

    if (window.aquaCharts) {
      window.aquaCharts.renderAllAnalytics();
    }
    this.showToast(`Switched to ${isDark ? 'Dark' : 'Light'} Mode`, 'info');
  }

  updateThemeIcons() {
    const isDark = document.documentElement.classList.contains('dark');
    const sunIcons = document.querySelectorAll('.theme-icon-sun');
    const moonIcons = document.querySelectorAll('.theme-icon-moon');

    sunIcons.forEach(i => i.classList.toggle('hidden', !isDark));
    moonIcons.forEach(i => i.classList.toggle('hidden', isDark));
  }

  /* ==========================================================================
     MULTI-LANGUAGE SUPPORT
     ========================================================================== */
  initLanguage() {
    if (window.i18n) {
      window.i18n.applyTranslations();
    }
  }

  setLanguage(lang) {
    if (window.i18n) {
      window.i18n.setLanguage(lang);
      this.showToast(lang === 'hi' ? 'भाषा बदली: हिंदी' : lang === 'mr' ? 'भाषा बदलली: मराठी' : 'Language changed to English', 'success');
    }
  }

  /* ==========================================================================
     NAVIGATION & VIEW ROUTING
     ========================================================================== */
  switchView(viewId) {
    this.currentView = viewId;
    const views = document.querySelectorAll('.app-view');
    views.forEach(v => {
      v.classList.add('hidden');
    });

    const targetView = document.getElementById(viewId);
    if (targetView) {
      targetView.classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Update active nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      const target = link.getAttribute('data-view');
      if (target === viewId) {
        link.classList.add('text-cyan-600', 'dark:text-cyan-400', 'font-bold');
        link.classList.remove('text-slate-600', 'dark:text-slate-400');
      } else {
        link.classList.remove('text-cyan-600', 'dark:text-cyan-400', 'font-bold');
        link.classList.add('text-slate-600', 'dark:text-slate-400');
      }
    });

    // Handle view-specific initializations
    if (viewId === 'view-dashboard') {
      if (window.aquaMap) window.aquaMap.invalidateSizes();
    } else if (viewId === 'view-analytics') {
      setTimeout(() => {
        if (window.aquaCharts) window.aquaCharts.renderAllAnalytics();
      }, 100);
    } else if (viewId === 'view-map-db') {
      this.renderDatabaseTable();
      setTimeout(() => {
        if (window.aquaMap) window.aquaMap.invalidateSizes();
      }, 100);
    }
  }

  /* ==========================================================================
     STATISTICS CARDS & DASHBOARD
     ========================================================================== */
  updateStats() {
    if (!window.waterStorage) return;
    const stats = window.waterStorage.getStats();

    const totalTestsEl = document.getElementById('stat-total-tests');
    const totalSourcesEl = document.getElementById('stat-sources-monitored');
    const safeSourcesEl = document.getElementById('stat-safe-sources');
    const unsafeSourcesEl = document.getElementById('stat-unsafe-sources');
    const avgWqiEl = document.getElementById('stat-avg-wqi');

    if (totalTestsEl) totalTestsEl.innerText = stats.totalTests;
    if (totalSourcesEl) totalSourcesEl.innerText = stats.totalSources;
    if (safeSourcesEl) safeSourcesEl.innerText = stats.safeSources;
    if (unsafeSourcesEl) unsafeSourcesEl.innerText = stats.unsafeSources;
    if (avgWqiEl) avgWqiEl.innerText = `${stats.avgWqi} / 100`;
  }

  renderRecentTests() {
    const container = document.getElementById('recent-tests-list');
    if (!container || !window.waterStorage) return;

    const all = window.waterStorage.getAll().slice(0, 5);
    if (all.length === 0) {
      container.innerHTML = `
        <div class="text-center py-8 text-slate-400">
          <p class="text-sm">No tests recorded yet.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = all.map(t => {
      const score = t.scores?.overall || t.score || 0;
      let badgeColor = 'bg-rose-500/10 text-rose-600 border-rose-200 dark:border-rose-900/50';
      if (score >= 75) badgeColor = 'bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-900/50';
      else if (score >= 50) badgeColor = 'bg-amber-500/10 text-amber-600 border-amber-200 dark:border-amber-900/50';

      return `
        <div class="p-4 rounded-2xl bg-white/70 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 hover:border-cyan-500/50 transition-all flex items-center justify-between gap-3 cursor-pointer group shadow-sm hover:shadow-md" onclick="window.app.openTestDetails('${t.testId}')">
          <div class="flex items-center gap-3.5 min-w-0">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${score >= 75 ? 'bg-emerald-500 text-white' : (score >= 50 ? 'bg-amber-500 text-white' : 'bg-rose-500 text-white')} shrink-0 shadow-sm">
              ${score}
            </div>
            <div class="min-w-0">
              <h4 class="font-bold text-sm text-slate-800 dark:text-white truncate group-hover:text-cyan-500 transition-colors">
                ${t.sourceName || t.rawInputs?.sourceName || 'Water Test'}
              </h4>
              <p class="text-xs text-slate-500 dark:text-slate-400 truncate">
                ${t.location || t.rawInputs?.location || 'Location'} • ${t.testedDate || t.rawInputs?.testedDate || ''}
              </p>
            </div>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <span class="text-xs font-semibold px-2.5 py-1 rounded-full border ${badgeColor}">
              ${t.category?.label || (score >= 75 ? 'Safe' : score >= 50 ? 'Moderate' : 'Unsafe')}
            </span>
            <button class="p-1.5 rounded-lg text-slate-400 hover:text-cyan-500 transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  renderTopSources() {
    const container = document.getElementById('top-sources-list');
    if (!container || !window.waterStorage) return;

    const sources = window.waterStorage.getSources().slice(0, 4);
    if (sources.length === 0) {
      container.innerHTML = `<div class="text-center py-6 text-slate-400 text-sm">No water sources recorded yet.</div>`;
      return;
    }

    container.innerHTML = sources.map(s => {
      return `
        <div class="p-4 rounded-2xl bg-white/70 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 hover:border-cyan-500/50 transition-all flex items-center justify-between cursor-pointer group shadow-sm hover:shadow-md" onclick="window.app.openSourceProfile('${s.name.replace(/'/g, "\\'")}')">
          <div class="flex items-center gap-3 min-w-0">
            <div class="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
            </div>
            <div class="min-w-0">
              <h4 class="font-bold text-sm text-slate-800 dark:text-white truncate group-hover:text-cyan-500 transition-colors">${s.name}</h4>
              <p class="text-xs text-slate-500 dark:text-slate-400 truncate">${s.location} • ${s.testCount} tests</p>
            </div>
          </div>
          <div class="text-right shrink-0">
            <div class="text-xs font-bold ${s.avgScore >= 75 ? 'text-emerald-500' : (s.avgScore >= 50 ? 'text-amber-500' : 'text-rose-500')}">${s.avgScore}/100</div>
            <div class="text-[11px] text-slate-400">Avg TDS: ${s.avgTds}</div>
          </div>
        </div>
      `;
    }).join('');
  }

  /* ==========================================================================
     COMMUNITY DATABASE TABLE & SEARCH
     ========================================================================== */
  renderDatabaseTable() {
    const tbody = document.getElementById('database-table-body');
    if (!tbody || !window.waterStorage) return;

    const searchInput = document.getElementById('global-search-input');
    const typeFilter = document.getElementById('filter-source-type');
    const qualityFilter = document.getElementById('filter-quality');

    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const selectedType = typeFilter ? typeFilter.value : 'all';
    const selectedQuality = qualityFilter ? qualityFilter.value : 'all';

    let records = window.waterStorage.getAll();

    // Filtering
    records = records.filter(t => {
      const name = (t.sourceName || t.rawInputs?.sourceName || '').toLowerCase();
      const loc = (t.location || t.rawInputs?.location || '').toLowerCase();
      const type = (t.sourceType || t.rawInputs?.sourceType || '').toLowerCase();
      const score = t.scores?.overall || t.score || 0;

      const matchesQuery = !query || name.includes(query) || loc.includes(query) || type.includes(query);
      const matchesType = selectedType === 'all' || type === selectedType;

      let matchesQuality = true;
      if (selectedQuality === 'safe') matchesQuality = score >= 70;
      else if (selectedQuality === 'moderate') matchesQuality = score >= 50 && score < 70;
      else if (selectedQuality === 'unsafe') matchesQuality = score < 50;

      return matchesQuery && matchesType && matchesQuality;
    });

    const countEl = document.getElementById('filtered-count-display');
    if (countEl) countEl.innerText = `${records.length} records found`;

    if (records.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" class="text-center py-12 text-slate-400">
            <div class="flex flex-col items-center justify-center">
              <svg class="w-12 h-12 text-slate-300 dark:text-slate-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <p class="font-semibold text-slate-600 dark:text-slate-300" data-i18n="empty_no_records">No water tests found matching your filters.</p>
              <p class="text-xs text-slate-400 mt-1" data-i18n="empty_prompt">Be the first in your community to test and record this water source!</p>
              <button onclick="window.app.switchView('view-new-test')" class="mt-4 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-xs transition-colors shadow-md">
                Conduct New Water Test
              </button>
            </div>
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = records.map(t => {
      const score = t.scores?.overall || t.score || 0;
      const tds = t.tds || t.rawInputs?.tds || 0;
      const ph = t.ph || t.rawInputs?.ph || 7.0;
      const turbidity = t.turbidity || t.rawInputs?.turbidity || 0;
      const type = t.sourceType || t.rawInputs?.sourceType || 'other';

      let scoreBadge = 'bg-rose-500/10 text-rose-600 border-rose-300 dark:border-rose-800';
      if (score >= 75) scoreBadge = 'bg-emerald-500/10 text-emerald-600 border-emerald-300 dark:border-emerald-800';
      else if (score >= 50) scoreBadge = 'bg-amber-500/10 text-amber-600 border-amber-300 dark:border-amber-800';

      return `
        <tr class="border-b border-slate-100 dark:border-slate-800/80 hover:bg-cyan-50/40 dark:hover:bg-cyan-950/20 transition-colors">
          <td class="py-3 px-4">
            <div class="font-bold text-slate-900 dark:text-white">${t.sourceName || t.rawInputs?.sourceName || 'Unnamed'}</div>
            <div class="text-xs text-slate-400 font-mono">${t.testId}</div>
          </td>
          <td class="py-3 px-4">
            <span class="inline-block text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 capitalize">
              ${type.replace('_', ' ')}
            </span>
          </td>
          <td class="py-3 px-4 text-xs text-slate-600 dark:text-slate-400 max-w-[200px] truncate">
            ${t.location || t.rawInputs?.location || '—'}
          </td>
          <td class="py-3 px-4 font-mono text-xs font-semibold ${tds <= 500 ? 'text-emerald-600 dark:text-emerald-400' : (tds <= 1200 ? 'text-amber-600 dark:text-amber-400' : 'text-rose-600 dark:text-rose-400')}">
            ${tds} ppm
          </td>
          <td class="py-3 px-4 font-mono text-xs font-semibold ${ph >= 6.5 && ph <= 8.5 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}">
            ${ph}
          </td>
          <td class="py-3 px-4 font-mono text-xs text-slate-600 dark:text-slate-400">
            ${turbidity} NTU
          </td>
          <td class="py-3 px-4">
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${scoreBadge}">
              ${score} / 100
            </span>
          </td>
          <td class="py-3 px-4 text-right space-x-1">
            <button onclick="window.app.openTestDetails('${t.testId}')" class="p-1.5 rounded-lg bg-slate-100 hover:bg-cyan-100 dark:bg-slate-800 dark:hover:bg-cyan-900/50 text-cyan-600 dark:text-cyan-400 transition-colors" title="View Full Diagnosis">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
            </button>
            <button onclick="window.app.openSourceProfile('${(t.sourceName || t.rawInputs?.sourceName || '').replace(/'/g, "\\'")}')" class="p-1.5 rounded-lg bg-slate-100 hover:bg-indigo-100 dark:bg-slate-800 dark:hover:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 transition-colors" title="View Source Profile">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </button>
            <button onclick="window.app.downloadSinglePDF('${t.testId}')" class="p-1.5 rounded-lg bg-slate-100 hover:bg-emerald-100 dark:bg-slate-800 dark:hover:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 transition-colors" title="Download PDF Certificate">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  /* ==========================================================================
     WATER TEST FORM SUBMISSION & EVALUATION
     ========================================================================== */
  handleTestSubmit(e) {
    e.preventDefault();

    const form = document.getElementById('water-test-form');
    if (!form) return;

    const sourceName = document.getElementById('input-source-name').value.trim();
    const sourceType = document.getElementById('input-source-type').value;
    const location = document.getElementById('input-location').value.trim();
    const lat = parseFloat(document.getElementById('input-lat').value) || 18.6298;
    const lng = parseFloat(document.getElementById('input-lng').value) || 73.7997;
    const tds = parseFloat(document.getElementById('input-tds').value) || 0;
    const ph = parseFloat(document.getElementById('input-ph').value) || 7.0;
    const turbidity = parseFloat(document.getElementById('input-turbidity').value) || 0;
    const color = document.getElementById('input-color').value;
    const odor = document.getElementById('input-odor').value;
    const testedDate = document.getElementById('input-date').value || new Date().toISOString().split('T')[0];
    const testerName = document.getElementById('input-tester').value.trim();
    const notes = document.getElementById('input-notes').value.trim();

    if (!sourceName) {
      this.showToast('Please enter the water source name', 'warning');
      document.getElementById('input-source-name').focus();
      return;
    }

    const testPayload = {
      sourceName,
      sourceType,
      location,
      lat,
      lng,
      tds,
      ph,
      turbidity,
      color,
      odor,
      testedDate,
      testerName,
      notes
    };

    const lang = window.i18n ? window.i18n.getLanguage() : 'en';
    const assessment = window.waterEngine ? window.waterEngine.assess(testPayload, lang) : {};

    // Combine into full record
    const fullRecord = {
      ...testPayload,
      ...assessment
    };

    // Save to community database
    if (window.waterStorage) {
      window.waterStorage.saveTest(fullRecord);
    }

    this.currentTestResult = fullRecord;
    this.displayResultModal(fullRecord);
    this.showToast(window.i18n ? window.i18n.t('alert_test_saved') : 'Water test saved to community database!', 'success');
  }

  /* ==========================================================================
     ASSESSMENT RESULT MODAL
     ========================================================================== */
  displayResultModal(result) {
    this.currentTestResult = result;
    const modal = document.getElementById('result-modal');
    if (!modal) return;

    const score = result.scores?.overall || result.score || 0;
    const catLabel = result.category?.label || (score >= 75 ? 'Safe' : 'Unsafe');
    const riskLabel = result.risk?.label || (score >= 70 ? 'Low Risk' : 'High Risk');
    const drinkLabel = result.drinkingSuitability?.label || 'Direct Drinking Safe';

    // Populate scorecard values
    document.getElementById('res-score-value').innerText = score;
    document.getElementById('res-category-badge').innerText = catLabel;
    document.getElementById('res-category-badge').className = `text-xs font-bold px-3 py-1 rounded-full border ${result.category?.badgeClass || 'bg-cyan-500/10 text-cyan-600'}`;
    
    document.getElementById('res-risk-badge').innerText = riskLabel;
    document.getElementById('res-risk-badge').className = `text-xs font-bold px-3 py-1 rounded-full ${result.risk?.badgeClass || 'bg-emerald-500 text-white'}`;
    
    document.getElementById('res-drinking-status').innerText = drinkLabel;

    // Animate SVG circular gauge
    const circle = document.getElementById('res-score-circle');
    if (circle) {
      const radius = circle.r.baseVal.value;
      const circumference = 2 * Math.PI * radius;
      circle.style.strokeDasharray = `${circumference} ${circumference}`;
      const offset = circumference - (score / 100) * circumference;
      circle.style.strokeDashoffset = offset;
      circle.style.stroke = result.category?.colorHex || '#06b6d4';
    }

    // Parameters summary
    document.getElementById('res-tds-val').innerText = `${result.tds || result.rawInputs?.tds} ppm`;
    document.getElementById('res-ph-val').innerText = `${result.ph || result.rawInputs?.ph}`;
    document.getElementById('res-turb-val').innerText = `${result.turbidity || result.rawInputs?.turbidity} NTU`;

    // 6-Category Usage Matrix
    const usageContainer = document.getElementById('res-usage-matrix-list');
    if (usageContainer && result.usageMatrix) {
      usageContainer.innerHTML = result.usageMatrix.map(u => {
        const isFit = u.status === 'fit';
        const isCond = u.status === 'conditional';
        const statusBadge = isFit 
          ? 'bg-emerald-500/10 text-emerald-600 border-emerald-300 dark:border-emerald-800'
          : (isCond ? 'bg-amber-500/10 text-amber-600 border-amber-300 dark:border-amber-800' : 'bg-rose-500/10 text-rose-600 border-rose-300 dark:border-rose-800');

        const statusLabel = isFit 
          ? (window.i18n ? window.i18n.t('status_fit') : 'Suitable')
          : (isCond ? (window.i18n ? window.i18n.t('status_conditional') : 'With Precaution') : (window.i18n ? window.i18n.t('status_unfit') : 'Not Recommended'));

        return `
          <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
            <div>
              <h5 class="text-xs font-bold text-slate-800 dark:text-white">${window.i18n ? window.i18n.t(u.nameKey) : u.id}</h5>
              <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">${u.reason}</p>
            </div>
            <span class="text-[11px] font-bold px-2 py-0.5 rounded-full border ${statusBadge} shrink-0">
              ${statusLabel}
            </span>
          </div>
        `;
      }).join('');
    }

    // Detected Problems
    const probContainer = document.getElementById('res-problems-list');
    if (probContainer) {
      const problems = result.problems || [];
      if (problems.length === 0) {
        probContainer.innerHTML = `
          <div class="p-3 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
            <svg class="w-4 h-4 shrink-0 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            <span>All tested parameters are completely within safe WHO/BIS drinking standards!</span>
          </div>
        `;
      } else {
        probContainer.innerHTML = problems.map(p => `
          <div class="p-3 rounded-xl ${p.severity === 'high' ? 'bg-rose-500/10 border-rose-200 dark:border-rose-900/50 text-rose-900 dark:text-rose-200' : 'bg-amber-500/10 border-amber-200 dark:border-amber-900/50 text-amber-900 dark:text-amber-200'} border text-xs">
            <h6 class="font-bold mb-0.5">${p.title}</h6>
            <p class="text-[11px] opacity-90">${p.desc}</p>
          </div>
        `).join('');
      }
    }

    // Recommendations
    const recContainer = document.getElementById('res-recommendations-list');
    if (recContainer) {
      const recs = result.recommendations || [];
      recContainer.innerHTML = recs.map(r => `
        <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-xs">
          <div class="flex items-center justify-between mb-1">
            <h6 class="font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-cyan-500"></span>
              ${r.name}
            </h6>
            <span class="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
              ${r.badge}
            </span>
          </div>
          <p class="text-[11px] text-slate-500 dark:text-slate-400">${r.desc}</p>
        </div>
      `).join('');
    }

    // Health Warnings
    const warnContainer = document.getElementById('res-warnings-list');
    if (warnContainer) {
      const warnings = result.warnings || [];
      if (warnings.length === 0) {
        warnContainer.parentElement.classList.add('hidden');
      } else {
        warnContainer.parentElement.classList.remove('hidden');
        warnContainer.innerHTML = warnings.map(w => `
          <div class="text-xs text-rose-600 dark:text-rose-400 font-medium py-1">
            ${w}
          </div>
        `).join('');
      }
    }

    // Conclusion paragraph
    document.getElementById('res-conclusion-text').innerText = result.conclusion || 'Scientific diagnosis complete.';

    // Show modal
    modal.classList.remove('hidden');
  }

  closeResultModal() {
    const modal = document.getElementById('result-modal');
    if (modal) modal.classList.add('hidden');
  }

  openTestDetails(testId) {
    if (!window.waterStorage) return;
    const test = window.waterStorage.getById(testId);
    if (test) {
      const lang = window.i18n ? window.i18n.getLanguage() : 'en';
      const freshAssessment = window.waterEngine ? window.waterEngine.assess(test, lang) : {};
      this.displayResultModal({ ...test, ...freshAssessment });
    }
  }

  downloadSinglePDF(testId) {
    if (!window.waterStorage || !window.aquaReports) return;
    const test = window.waterStorage.getById(testId);
    if (test) {
      window.aquaReports.downloadPDF(test);
    }
  }

  /* ==========================================================================
     WATER SOURCE PROFILE & HISTORICAL TIMELINE
     ========================================================================== */
  openSourceProfile(sourceName) {
    if (!window.waterStorage) return;
    const source = window.waterStorage.getSourceByName(sourceName);
    if (!source) {
      this.showToast('Source profile not found', 'warning');
      return;
    }

    this.currentSelectedSource = source;
    const modal = document.getElementById('source-profile-modal');
    if (!modal) return;

    // Header info
    document.getElementById('prof-source-name').innerText = source.name;
    document.getElementById('prof-location').innerText = source.location;
    document.getElementById('prof-type-badge').innerText = source.type.replace('_', ' ').toUpperCase();
    document.getElementById('prof-test-count').innerText = source.testCount;
    document.getElementById('prof-avg-score').innerText = `${source.avgScore} / 100`;
    document.getElementById('prof-avg-tds').innerText = `${source.avgTds} ppm`;
    document.getElementById('prof-avg-ph').innerText = `${source.avgPh}`;
    document.getElementById('prof-last-tested').innerText = source.lastTested;

    // Community Insights
    document.getElementById('prof-insight-text').innerText = source.trendInsight;
    const statusIcon = document.getElementById('prof-insight-badge');
    if (statusIcon) {
      statusIcon.innerText = source.trendStatus.toUpperCase();
      statusIcon.className = `text-[11px] font-bold px-2.5 py-0.5 rounded-full ${source.trendStatus === 'improving' ? 'bg-emerald-500/10 text-emerald-600' : (source.trendStatus === 'declining' ? 'bg-rose-500/10 text-rose-600' : 'bg-cyan-500/10 text-cyan-600')}`;
    }

    // Render Timeline Chart
    if (window.aquaCharts) {
      setTimeout(() => window.aquaCharts.renderSourceProfileChart(source), 100);
    }

    // Historical Table
    const tbody = document.getElementById('prof-timeline-table-body');
    if (tbody) {
      tbody.innerHTML = source.tests.map(t => {
        const score = t.scores?.overall || t.score || 0;
        return `
          <tr class="border-b border-slate-100 dark:border-slate-800 text-xs">
            <td class="py-2.5 px-3 font-semibold text-slate-800 dark:text-white">${t.testedDate || t.rawInputs?.testedDate || ''}</td>
            <td class="py-2.5 px-3 font-mono">${t.tds || t.rawInputs?.tds} ppm</td>
            <td class="py-2.5 px-3 font-mono">${t.ph || t.rawInputs?.ph}</td>
            <td class="py-2.5 px-3 font-mono">${t.turbidity || t.rawInputs?.turbidity} NTU</td>
            <td class="py-2.5 px-3 font-bold ${score >= 75 ? 'text-emerald-500' : (score >= 50 ? 'text-amber-500' : 'text-rose-500')}">${score}/100</td>
            <td class="py-2.5 px-3 text-right">
              <button onclick="window.app.openTestDetails('${t.testId}')" class="text-cyan-600 hover:underline">View</button>
            </td>
          </tr>
        `;
      }).join('');
    }

    modal.classList.remove('hidden');
  }

  closeSourceProfile() {
    const modal = document.getElementById('source-profile-modal');
    if (modal) modal.classList.add('hidden');
  }

  /* ==========================================================================
     INTERACTIVE TDS & pH SIMULATOR (WATER ACADEMY)
     ========================================================================== */
  initSimulator() {
    const tdsSlider = document.getElementById('sim-tds-slider');
    const phSlider = document.getElementById('sim-ph-slider');

    if (!tdsSlider || !phSlider) return;

    const updateSim = () => {
      const tds = parseFloat(tdsSlider.value);
      const ph = parseFloat(phSlider.value);

      document.getElementById('sim-tds-display').innerText = `${tds} ppm`;
      document.getElementById('sim-ph-display').innerText = `${ph.toFixed(1)}`;

      const lang = window.i18n ? window.i18n.getLanguage() : 'en';
      const assessment = window.waterEngine ? window.waterEngine.assess({ tds, ph, turbidity: 0.5, color: 'clear', odor: 'none' }, lang) : {};

      const scoreEl = document.getElementById('sim-score-display');
      const catEl = document.getElementById('sim-cat-display');
      const purifiersEl = document.getElementById('sim-purifiers-display');

      if (scoreEl) scoreEl.innerText = `${assessment.scores?.overall} / 100`;
      if (catEl) {
        catEl.innerText = assessment.category?.label;
        catEl.className = `font-bold ${assessment.category?.badgeClass}`;
      }

      if (purifiersEl) {
        const recNames = assessment.recommendations?.map(r => r.name).join(', ') || 'Standard direct consumption';
        purifiersEl.innerText = recNames;
      }
    };

    tdsSlider.addEventListener('input', updateSim);
    phSlider.addEventListener('input', updateSim);
    updateSim();
  }

  /* ==========================================================================
     LOCATION PICKER MODAL
     ========================================================================== */
  openLocationPicker() {
    const modal = document.getElementById('map-picker-modal');
    if (!modal) return;

    modal.classList.remove('hidden');

    const curLat = parseFloat(document.getElementById('input-lat').value) || 18.6298;
    const curLng = parseFloat(document.getElementById('input-lng').value) || 73.7997;

    setTimeout(() => {
      if (window.aquaMap) {
        window.aquaMap.initPickerMap('picker-map', curLat, curLng);
        window.aquaMap.invalidateSizes();
      }
    }, 150);
  }

  closeLocationPicker() {
    const modal = document.getElementById('map-picker-modal');
    if (modal) modal.classList.add('hidden');
  }

  /* ==========================================================================
     TOAST NOTIFICATIONS
     ========================================================================== */
  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    let bg = 'bg-slate-900/90 text-white border-slate-700';
    let icon = 'ℹ️';

    if (type === 'success') {
      bg = 'bg-emerald-950/90 text-emerald-100 border-emerald-500/50';
      icon = '✅';
    } else if (type === 'warning') {
      bg = 'bg-amber-950/90 text-amber-100 border-amber-500/50';
      icon = '⚠️';
    } else if (type === 'error') {
      bg = 'bg-rose-950/90 text-rose-100 border-rose-500/50';
      icon = '❌';
    }

    toast.className = `flex items-center gap-2.5 px-4 py-3 rounded-xl border backdrop-blur-md shadow-2xl text-xs font-medium ${bg} transform transition-all duration-300 translate-y-2 opacity-0`;
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;

    container.appendChild(toast);

    // Animate in
    setTimeout(() => {
      toast.classList.remove('translate-y-2', 'opacity-0');
    }, 10);

    // Animate out & remove
    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-2');
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  /* ==========================================================================
     EVENT BINDINGS
     ========================================================================== */
  bindEvents() {
    // Form submission
    const form = document.getElementById('water-test-form');
    if (form) {
      form.addEventListener('submit', (e) => this.handleTestSubmit(e));
    }

    // TDS slider & number box sync
    const tdsSlider = document.getElementById('slider-tds');
    const tdsInput = document.getElementById('input-tds');
    if (tdsSlider && tdsInput) {
      tdsSlider.addEventListener('input', (e) => { tdsInput.value = e.target.value; });
      tdsInput.addEventListener('input', (e) => { tdsSlider.value = e.target.value; });
    }

    // pH slider & number box sync
    const phSlider = document.getElementById('slider-ph');
    const phInput = document.getElementById('input-ph');
    if (phSlider && phInput) {
      phSlider.addEventListener('input', (e) => { phInput.value = e.target.value; });
      phInput.addEventListener('input', (e) => { phSlider.value = e.target.value; });
    }

    // Search and filters
    const searchInput = document.getElementById('global-search-input');
    const typeFilter = document.getElementById('filter-source-type');
    const qualityFilter = document.getElementById('filter-quality');

    if (searchInput) searchInput.addEventListener('input', () => this.renderDatabaseTable());
    if (typeFilter) typeFilter.addEventListener('change', () => this.renderDatabaseTable());
    if (qualityFilter) qualityFilter.addEventListener('change', () => this.renderDatabaseTable());

    // Import file input trigger
    const importInput = document.getElementById('import-file-input');
    if (importInput) {
      importInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
          const success = window.waterStorage.importJSON(ev.target.result);
          if (success) {
            this.showToast(window.i18n ? window.i18n.t('alert_imported') : 'Database imported!', 'success');
          } else {
            this.showToast('Invalid JSON file format', 'error');
          }
        };
        reader.readAsText(file);
      });
    }
  }
}

// Global App Initialization
document.addEventListener('DOMContentLoaded', () => {
  window.app = new AquaApp();
  window.app.init();
});
