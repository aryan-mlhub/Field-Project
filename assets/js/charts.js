/**
 * Aqua Health Checker - Chart.js Visual Analytics Engine
 */

class AquaChartsController {
  constructor() {
    this.charts = {
      distribution: null,
      sourceTypes: null,
      timelineTrends: null,
      radarCompliance: null,
      sourceProfile: null
    };
  }

  isDark() {
    return document.documentElement.classList.contains('dark');
  }

  getThemeColors() {
    const dark = this.isDark();
    return {
      textColor: dark ? '#94a3b8' : '#475569',
      gridColor: dark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)',
      tooltipBg: dark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
      tooltipText: dark ? '#f8fafc' : '#0f172a',
      borderColor: dark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
    };
  }

  /**
   * Render all main analytics section charts
   */
  renderAllAnalytics() {
    this.renderDistributionChart();
    this.renderSourceTypesChart();
    this.renderTimelineTrendsChart();
    this.renderRadarComplianceChart();
  }

  /**
   * 1. Water Quality Distribution (Doughnut Chart)
   */
  renderDistributionChart() {
    const ctx = document.getElementById('chart-distribution');
    if (!ctx) return;

    if (this.charts.distribution) this.charts.distribution.destroy();

    const all = window.waterStorage ? window.waterStorage.getAll() : [];
    const counts = { excellent: 0, good: 0, moderate: 0, poor: 0, unsafe: 0 };

    all.forEach(t => {
      const score = t.scores?.overall || t.score || 0;
      if (score >= 88) counts.excellent++;
      else if (score >= 72) counts.good++;
      else if (score >= 52) counts.moderate++;
      else if (score >= 32) counts.poor++;
      else counts.unsafe++;
    });

    const theme = this.getThemeColors();
    const t = (k) => window.i18n ? window.i18n.t(k) : k;

    this.charts.distribution = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: [
          t('cat_excellent'),
          t('cat_good'),
          t('cat_moderate'),
          t('cat_poor'),
          t('cat_unsafe')
        ],
        datasets: [{
          data: [counts.excellent, counts.good, counts.moderate, counts.poor, counts.unsafe],
          backgroundColor: [
            '#10b981', // Emerald
            '#06b6d4', // Cyan
            '#f59e0b', // Amber
            '#f97316', // Orange
            '#ef4444'  // Red
          ],
          borderWidth: 2,
          borderColor: theme.borderColor,
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: theme.textColor, font: { family: 'Plus Jakarta Sans', size: 12 }, padding: 15 }
          }
        },
        cutout: '70%'
      }
    });
  }

  /**
   * 2. Average Health Score by Source Type (Bar Chart)
   */
  renderSourceTypesChart() {
    const ctx = document.getElementById('chart-source-types');
    if (!ctx) return;

    if (this.charts.sourceTypes) this.charts.sourceTypes.destroy();

    const all = window.waterStorage ? window.waterStorage.getAll() : [];
    const typeScores = {};
    const typeCounts = {};

    all.forEach(t => {
      const type = t.sourceType || t.rawInputs?.sourceType || 'other';
      const score = t.scores?.overall || t.score || 0;
      typeScores[type] = (typeScores[type] || 0) + score;
      typeCounts[type] = (typeCounts[type] || 0) + 1;
    });

    const typeKeys = ['tap', 'filtered', 'gov_tank', 'well', 'borewell', 'river', 'lake', 'tanker', 'other'];
    const labels = [];
    const avgScores = [];

    const typeLabelMap = {
      tap: 'Municipal Tap',
      filtered: 'Filtered RO',
      gov_tank: 'Govt Tank',
      well: 'Open Well',
      borewell: 'Borewell',
      river: 'River Stream',
      lake: 'Lake Pond',
      tanker: 'Tanker Water',
      other: 'Other'
    };

    typeKeys.forEach(k => {
      if (typeCounts[k]) {
        labels.push(typeLabelMap[k]);
        avgScores.push(Math.round(typeScores[k] / typeCounts[k]));
      }
    });

    const theme = this.getThemeColors();

    this.charts.sourceTypes = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels.length ? labels : ['Tap', 'Well', 'Borewell', 'River'],
        datasets: [{
          label: 'Average Score (0-100)',
          data: avgScores.length ? avgScores : [90, 75, 45, 65],
          backgroundColor: avgScores.map(score => {
            if (score >= 75) return 'rgba(16, 185, 129, 0.85)';
            if (score >= 50) return 'rgba(245, 158, 11, 0.85)';
            return 'rgba(239, 68, 68, 0.85)';
          }),
          borderRadius: 8,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            min: 0,
            max: 100,
            grid: { color: theme.gridColor },
            ticks: { color: theme.textColor }
          },
          x: {
            grid: { display: false },
            ticks: { color: theme.textColor, maxRotation: 25, minRotation: 25 }
          }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });
  }

  /**
   * 3. Historical TDS & pH Trends (Multi-Line Chart with Dual Y-Axes)
   */
  renderTimelineTrendsChart() {
    const ctx = document.getElementById('chart-timeline-trends');
    if (!ctx) return;

    if (this.charts.timelineTrends) this.charts.timelineTrends.destroy();

    const all = window.waterStorage ? window.waterStorage.getAll() : [];
    // Sort chronologically
    const sorted = [...all].sort((a, b) => new Date(a.testedDate || a.rawInputs?.testedDate || a.timestamp) - new Date(b.testedDate || b.rawInputs?.testedDate || b.timestamp));

    const labels = sorted.map(t => {
      const d = t.testedDate || t.rawInputs?.testedDate || t.timestamp?.split('T')[0] || '';
      const name = t.sourceName || t.rawInputs?.sourceName || '';
      return `${d.slice(5)} (${name.slice(0, 10)})`;
    });

    const tdsValues = sorted.map(t => t.tds || t.rawInputs?.tds || 0);
    const phValues = sorted.map(t => t.ph || t.rawInputs?.ph || 7.0);

    const theme = this.getThemeColors();

    this.charts.timelineTrends = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels.length ? labels : ['08-01', '08-15', '09-01', '09-10'],
        datasets: [
          {
            label: 'TDS Level (ppm)',
            data: tdsValues.length ? tdsValues : [540, 520, 490, 290],
            borderColor: '#06b6d4',
            backgroundColor: 'rgba(6, 182, 212, 0.1)',
            tension: 0.35,
            fill: true,
            yAxisID: 'y'
          },
          {
            label: 'pH Level',
            data: phValues.length ? phValues : [7.9, 7.6, 7.4, 7.2],
            borderColor: '#10b981',
            backgroundColor: 'transparent',
            borderDash: [5, 5],
            tension: 0.35,
            yAxisID: 'y1'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            type: 'linear',
            position: 'left',
            title: { display: true, text: 'TDS (ppm)', color: '#06b6d4' },
            grid: { color: theme.gridColor },
            ticks: { color: theme.textColor }
          },
          y1: {
            type: 'linear',
            position: 'right',
            min: 4,
            max: 10,
            title: { display: true, text: 'pH (0-14)', color: '#10b981' },
            grid: { drawOnChartArea: false },
            ticks: { color: theme.textColor }
          },
          x: {
            grid: { color: theme.gridColor },
            ticks: { color: theme.textColor, maxRotation: 40, minRotation: 20 }
          }
        },
        plugins: {
          legend: { labels: { color: theme.textColor } }
        }
      }
    });
  }

  /**
   * 4. Radar Compliance Chart
   */
  renderRadarComplianceChart() {
    const ctx = document.getElementById('chart-radar-compliance');
    if (!ctx) return;

    if (this.charts.radarCompliance) this.charts.radarCompliance.destroy();

    const all = window.waterStorage ? window.waterStorage.getAll() : [];
    let avgTdsScore = 80, avgPhScore = 85, avgTurbScore = 75, avgColorScore = 90, avgOdorScore = 88;

    if (all.length > 0) {
      avgTdsScore = Math.round(all.reduce((a, c) => a + (c.scores?.tdsScore || 75), 0) / all.length);
      avgPhScore = Math.round(all.reduce((a, c) => a + (c.scores?.phScore || 80), 0) / all.length);
      avgTurbScore = Math.round(all.reduce((a, c) => a + (c.scores?.turbidityScore || 70), 0) / all.length);
      avgColorScore = Math.round(all.reduce((a, c) => a + (c.scores?.sensoryScore || 85), 0) / all.length);
      avgOdorScore = Math.round(all.reduce((a, c) => a + (c.odor === 'none' ? 100 : 60), 0) / all.length);
    }

    const theme = this.getThemeColors();

    this.charts.radarCompliance = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['TDS Safe Zone', 'pH Balance', 'Clarity (Turbidity)', 'Visual Purity', 'Odorless State'],
        datasets: [
          {
            label: 'Community Average Compliance (%)',
            data: [avgTdsScore, avgPhScore, avgTurbScore, avgColorScore, avgOdorScore],
            backgroundColor: 'rgba(6, 182, 212, 0.25)',
            borderColor: '#06b6d4',
            pointBackgroundColor: '#0284c7',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#0284c7'
          },
          {
            label: 'WHO / BIS Benchmark (100%)',
            data: [100, 100, 100, 100, 100],
            borderColor: 'rgba(16, 185, 129, 0.4)',
            borderDash: [4, 4],
            backgroundColor: 'transparent',
            pointRadius: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            angleLines: { color: theme.gridColor },
            grid: { color: theme.gridColor },
            pointLabels: { color: theme.textColor, font: { size: 11, weight: 'bold' } },
            ticks: { display: false, min: 0, max: 100 }
          }
        },
        plugins: {
          legend: { labels: { color: theme.textColor } }
        }
      }
    });
  }

  /**
   * 5. Water Source Profile Dedicated Timeline Chart
   */
  renderSourceProfileChart(sourceData) {
    const ctx = document.getElementById('chart-source-profile-timeline');
    if (!ctx) return;

    if (this.charts.sourceProfile) this.charts.sourceProfile.destroy();

    const tests = sourceData.tests || [];
    const labels = tests.map(t => t.testedDate || t.rawInputs?.testedDate || t.timestamp?.split('T')[0]);
    const scores = tests.map(t => t.scores?.overall || t.score || 0);
    const tdsValues = tests.map(t => t.tds || t.rawInputs?.tds || 0);
    const phValues = tests.map(t => t.ph || t.rawInputs?.ph || 7.0);

    const theme = this.getThemeColors();

    this.charts.sourceProfile = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Health Score (0-100)',
            data: scores,
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            tension: 0.3,
            fill: true,
            yAxisID: 'y'
          },
          {
            label: 'TDS (ppm)',
            data: tdsValues,
            borderColor: '#06b6d4',
            backgroundColor: 'transparent',
            borderDash: [4, 4],
            tension: 0.3,
            yAxisID: 'y1'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            min: 0,
            max: 100,
            title: { display: true, text: 'Water Score', color: '#10b981' },
            grid: { color: theme.gridColor },
            ticks: { color: theme.textColor }
          },
          y1: {
            position: 'right',
            title: { display: true, text: 'TDS (ppm)', color: '#06b6d4' },
            grid: { drawOnChartArea: false },
            ticks: { color: theme.textColor }
          },
          x: {
            grid: { color: theme.gridColor },
            ticks: { color: theme.textColor }
          }
        },
        plugins: {
          legend: { labels: { color: theme.textColor } }
        }
      }
    });
  }
}

// Global instance
window.aquaCharts = new AquaChartsController();
