/**
 * Aqua Health Checker - LocalStorage Data Manager & Seed Data
 */

class WaterStorageManager {
  constructor() {
    this.storageKey = 'aqua_health_records';
    this.init();
  }

  init() {
    const existing = localStorage.getItem(this.storageKey);
    if (!existing || JSON.parse(existing).length === 0) {
      this.seedDefaultData();
    }
  }

  seedDefaultData() {
    const sampleTests = [
      // 1. Chicholi Main Well (Historical timeline: 3 tests showing gradual improvement)
      {
        testId: 'AHC-SEED-010',
        sourceName: 'Chicholi Main Well',
        sourceType: 'well',
        location: 'Chicholi Village, Haveli, Pune',
        lat: 18.6298,
        lng: 73.7997,
        tds: 540,
        ph: 7.9,
        turbidity: 3.2,
        color: 'slightly_cloudy',
        odor: 'none',
        testedDate: '2026-08-01',
        testerName: 'Gram Panchayat Volunteer',
        notes: 'Pre-monsoon well check. Silt noted near the base.',
        score: 64,
        category: 'cat_moderate',
        risk: 'risk_medium',
        drinkingSuitability: 'drink_boil_filter'
      },
      {
        testId: 'AHC-SEED-011',
        sourceName: 'Chicholi Main Well',
        sourceType: 'well',
        location: 'Chicholi Village, Haveli, Pune',
        lat: 18.6298,
        lng: 73.7997,
        tds: 520,
        ph: 7.6,
        turbidity: 2.1,
        color: 'clear',
        odor: 'none',
        testedDate: '2026-08-15',
        testerName: 'Health Mission Worker',
        notes: 'Post-cleaning test. Silt removed by village youth team.',
        score: 72,
        category: 'cat_good',
        risk: 'risk_low',
        drinkingSuitability: 'drink_boil_filter'
      },
      {
        testId: 'AHC-SEED-012',
        sourceName: 'Chicholi Main Well',
        sourceType: 'well',
        location: 'Chicholi Village, Haveli, Pune',
        lat: 18.6298,
        lng: 73.7997,
        tds: 490,
        ph: 7.4,
        turbidity: 1.2,
        color: 'clear',
        odor: 'none',
        testedDate: '2026-09-05',
        testerName: 'Aqua Volunteer - Rajesh Patil',
        notes: 'Routine monthly check. Water clarity significantly improved.',
        score: 82,
        category: 'cat_good',
        risk: 'risk_low',
        drinkingSuitability: 'drink_safe'
      },

      // 2. Pawna River Inflow - Lake / River
      {
        testId: 'AHC-SEED-020',
        sourceName: 'Pawna River Intake Point',
        sourceType: 'river',
        location: 'Ravet Raw Water Intake, Pimpri',
        lat: 18.6524,
        lng: 73.7421,
        tds: 310,
        ph: 7.2,
        turbidity: 4.8,
        color: 'slightly_cloudy',
        odor: 'earthy',
        testedDate: '2026-08-20',
        testerName: 'Eco Watershed Society',
        notes: 'Monsoon runoff causing higher turbidity in river flow.',
        score: 68,
        category: 'cat_moderate',
        risk: 'risk_medium',
        drinkingSuitability: 'drink_boil_filter'
      },
      {
        testId: 'AHC-SEED-021',
        sourceName: 'Pawna River Intake Point',
        sourceType: 'river',
        location: 'Ravet Raw Water Intake, Pimpri',
        lat: 18.6524,
        lng: 73.7421,
        tds: 260,
        ph: 7.3,
        turbidity: 2.2,
        color: 'clear',
        odor: 'none',
        testedDate: '2026-09-12',
        testerName: 'Eco Watershed Society',
        notes: 'Settled flow. Clear water with ideal TDS levels.',
        score: 86,
        category: 'cat_good',
        risk: 'risk_low',
        drinkingSuitability: 'drink_safe'
      },

      // 3. Sector 14 Deep Borewell - High TDS Groundwater
      {
        testId: 'AHC-SEED-030',
        sourceName: 'Sector 14 Deep Borewell',
        sourceType: 'borewell',
        location: 'Sector 14 Commercial Complex, Nashik',
        lat: 19.9975,
        lng: 73.7898,
        tds: 1350,
        ph: 8.4,
        turbidity: 0.8,
        color: 'clear',
        odor: 'metallic',
        testedDate: '2026-08-10',
        testerName: 'Residents Association',
        notes: 'Very high hardness and scaling on boilers. Clear but mineral loaded.',
        score: 38,
        category: 'cat_poor',
        risk: 'risk_high',
        drinkingSuitability: 'drink_unsafe'
      },
      {
        testId: 'AHC-SEED-031',
        sourceName: 'Sector 14 Deep Borewell',
        sourceType: 'borewell',
        location: 'Sector 14 Commercial Complex, Nashik',
        lat: 19.9975,
        lng: 73.7898,
        tds: 1420,
        ph: 8.6,
        turbidity: 0.9,
        color: 'clear',
        odor: 'metallic',
        testedDate: '2026-09-02',
        testerName: 'Water Watch Taskforce',
        notes: 'TDS remains consistently high. Dedicated RO unit installed for drinking.',
        score: 35,
        category: 'cat_poor',
        risk: 'risk_high',
        drinkingSuitability: 'drink_unsafe'
      },

      // 4. Shanti Nagar Municipal Tap
      {
        testId: 'AHC-SEED-040',
        sourceName: 'Shanti Nagar Municipal Tap #4',
        sourceType: 'tap',
        location: 'Ward 8, Shanti Nagar, Nagpur',
        lat: 21.1458,
        lng: 79.0882,
        tds: 180,
        ph: 7.2,
        turbidity: 0.6,
        color: 'clear',
        odor: 'chlorine',
        testedDate: '2026-09-10',
        testerName: 'Ward Health Inspector',
        notes: 'Treated municipal supply. Mild protective chlorine residual present.',
        score: 94,
        category: 'cat_excellent',
        risk: 'risk_low',
        drinkingSuitability: 'drink_safe'
      },

      // 5. Narmada Colony Govt Overhead Tank
      {
        testId: 'AHC-SEED-050',
        sourceName: 'Narmada Colony Govt Tank',
        sourceType: 'gov_tank',
        location: 'Colony Sector 2, Bhopal',
        lat: 23.2599,
        lng: 77.4126,
        tds: 290,
        ph: 7.5,
        turbidity: 1.4,
        color: 'clear',
        odor: 'none',
        testedDate: '2026-09-08',
        testerName: 'Municipal Water Board Volunteer',
        notes: 'Overhead tank cleaned recently with bleaching powder.',
        score: 89,
        category: 'cat_excellent',
        risk: 'risk_low',
        drinkingSuitability: 'drink_safe'
      },

      // 6. Khed Community Filter RO Plant
      {
        testId: 'AHC-SEED-060',
        sourceName: 'Khed Community RO ATM',
        sourceType: 'filtered',
        location: 'Gram Panchayat Chowk, Khed',
        lat: 18.8471,
        lng: 73.9042,
        tds: 110,
        ph: 7.0,
        turbidity: 0.2,
        color: 'clear',
        odor: 'none',
        testedDate: '2026-09-14',
        testerName: 'Panchayat Operator',
        notes: 'Commercial RO + UV filter dispenser. Excellent potability.',
        score: 98,
        category: 'cat_excellent',
        risk: 'risk_low',
        drinkingSuitability: 'drink_safe'
      },

      // 7. Old Industrial Area Handpump (Unsafe Contaminated)
      {
        testId: 'AHC-SEED-070',
        sourceName: 'Old MIDC Area Handpump',
        sourceType: 'borewell',
        location: 'Near Old Chemical Plot 9, Thane',
        lat: 19.2183,
        lng: 72.9781,
        tds: 1850,
        ph: 5.4,
        turbidity: 6.5,
        color: 'yellowish',
        odor: 'chemical',
        testedDate: '2026-09-01',
        testerName: 'Pollution Action Forum',
        notes: 'Strong chemical odor and yellowish tint. Suspected groundwater contamination.',
        score: 12,
        category: 'cat_unsafe',
        risk: 'risk_high',
        drinkingSuitability: 'drink_unsafe'
      }
    ];

    // Compute complete analysis for each seeded test
    const enrichedTests = sampleTests.map(t => {
      const assessment = window.waterEngine ? window.waterEngine.assess(t) : {};
      return {
        ...t,
        ...assessment,
        testId: t.testId, // preserve clean seed ID
        sourceName: t.sourceName,
        sourceType: t.sourceType,
        location: t.location,
        lat: t.lat,
        lng: t.lng,
        testedDate: t.testedDate,
        testerName: t.testerName,
        notes: t.notes
      };
    });

    localStorage.setItem(this.storageKey, JSON.stringify(enrichedTests));
  }

  getAll() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Error reading localStorage:", e);
      return [];
    }
  }

  getById(testId) {
    const all = this.getAll();
    return all.find(t => t.testId === testId) || null;
  }

  saveTest(assessmentObj) {
    const all = this.getAll();
    all.unshift(assessmentObj); // newest first
    localStorage.setItem(this.storageKey, JSON.stringify(all));
    window.dispatchEvent(new CustomEvent('databaseUpdated'));
    return assessmentObj;
  }

  deleteTest(testId) {
    let all = this.getAll();
    all = all.filter(t => t.testId !== testId);
    localStorage.setItem(this.storageKey, JSON.stringify(all));
    window.dispatchEvent(new CustomEvent('databaseUpdated'));
  }

  /**
   * Aggregate tests by Water Source for Source Profiles and Timelines
   */
  getSources() {
    const all = this.getAll();
    const sourceMap = {};

    all.forEach(t => {
      const sName = (t.sourceName || t.rawInputs?.sourceName || 'Unnamed Source').trim();
      if (!sourceMap[sName]) {
        sourceMap[sName] = {
          name: sName,
          type: t.sourceType || t.rawInputs?.sourceType || 'other',
          location: t.location || t.rawInputs?.location || 'Unknown Location',
          lat: t.lat || t.rawInputs?.lat || 18.5204,
          lng: t.lng || t.rawInputs?.lng || 73.8567,
          tests: []
        };
      }
      sourceMap[sName].tests.push(t);
    });

    const sources = Object.values(sourceMap).map(src => {
      // Sort tests chronological
      src.tests.sort((a, b) => new Date(a.testedDate || a.rawInputs?.testedDate || a.timestamp) - new Date(b.testedDate || b.rawInputs?.testedDate || b.timestamp));

      const total = src.tests.length;
      const avgTds = Math.round(src.tests.reduce((acc, curr) => acc + (parseFloat(curr.tds || curr.rawInputs?.tds) || 0), 0) / total);
      const avgPh = +(src.tests.reduce((acc, curr) => acc + (parseFloat(curr.ph || curr.rawInputs?.ph) || 7.0), 0) / total).toFixed(1);
      const avgScore = Math.round(src.tests.reduce((acc, curr) => acc + (parseFloat(curr.scores?.overall || curr.score) || 0), 0) / total);
      const latestTest = src.tests[src.tests.length - 1];

      // Trend analysis
      let trendInsight = "This water source shows stable quality parameters over recorded checks.";
      let trendStatus = "stable";

      if (total >= 2) {
        const firstScore = src.tests[0].scores?.overall || src.tests[0].score || 50;
        const lastScore = latestTest.scores?.overall || latestTest.score || 50;
        const diff = lastScore - firstScore;

        if (diff >= 8) {
          trendInsight = `Quality has improved (+${diff} pts) over recent tests due to local maintenance.`;
          trendStatus = "improving";
        } else if (diff <= -8) {
          trendInsight = `Quality has deteriorated (${diff} pts) compared to historical baseline. Urgent inspection advised.`;
          trendStatus = "declining";
        } else {
          trendInsight = "Parameters remain stable across historical monitoring cycles.";
          trendStatus = "stable";
        }
      }

      return {
        ...src,
        testCount: total,
        avgTds,
        avgPh,
        avgScore,
        lastTested: latestTest.testedDate || latestTest.rawInputs?.testedDate || latestTest.timestamp?.split('T')[0],
        latestTest,
        trendInsight,
        trendStatus
      };
    });

    // Sort by most tested or highest activity
    sources.sort((a, b) => b.testCount - a.testCount);
    return sources;
  }

  getSourceByName(name) {
    const sources = this.getSources();
    return sources.find(s => s.name.toLowerCase() === name.toLowerCase()) || null;
  }

  getStats() {
    const all = this.getAll();
    const sources = this.getSources();
    
    let safeCount = 0;
    let unsafeCount = 0;
    let scoreSum = 0;

    all.forEach(t => {
      const score = t.scores?.overall || t.score || 0;
      scoreSum += score;
      if (score >= 70) safeCount++;
      else if (score < 50) unsafeCount++;
    });

    return {
      totalTests: all.length,
      totalSources: sources.length,
      safeSources: safeCount,
      unsafeSources: unsafeCount,
      avgWqi: all.length ? Math.round(scoreSum / all.length) : 0
    };
  }

  exportJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.getAll(), null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `aqua_health_backup_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }

  exportCSV() {
    const all = this.getAll();
    if (all.length === 0) return;

    const headers = ["Test ID", "Source Name", "Type", "Location", "TDS (ppm)", "pH", "Turbidity (NTU)", "Color", "Odor", "Score", "Category", "Risk", "Tested Date", "Tester"];
    const rows = all.map(t => [
      t.testId,
      `"${t.sourceName || t.rawInputs?.sourceName || ''}"`,
      t.sourceType || t.rawInputs?.sourceType || '',
      `"${t.location || t.rawInputs?.location || ''}"`,
      t.tds || t.rawInputs?.tds || 0,
      t.ph || t.rawInputs?.ph || 7.0,
      t.turbidity || t.rawInputs?.turbidity || 0,
      t.color || t.rawInputs?.color || '',
      t.odor || t.rawInputs?.odor || '',
      t.scores?.overall || t.score || 0,
      t.category?.label || t.category || '',
      t.risk?.label || t.risk || '',
      t.testedDate || t.rawInputs?.testedDate || '',
      `"${t.testerName || t.rawInputs?.testerName || ''}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `aqua_health_data_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  importJSON(jsonText) {
    try {
      const parsed = JSON.parse(jsonText);
      if (Array.isArray(parsed)) {
        localStorage.setItem(this.storageKey, JSON.stringify(parsed));
        window.dispatchEvent(new CustomEvent('databaseUpdated'));
        return true;
      }
    } catch (e) {
      console.error("Failed to parse imported JSON:", e);
    }
    return false;
  }
}

// Global instance
window.waterStorage = new WaterStorageManager();
