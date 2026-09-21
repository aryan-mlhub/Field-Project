/**
 * Aqua Health Checker - jsPDF & Printable Report Generator
 */

class AquaReportGenerator {
  constructor() {}

  /**
   * Generate and download professional PDF report
   * @param {Object} test - Full test record or analysis result
   */
  downloadPDF(test) {
    if (!window.jspdf || !window.jspdf.jsPDF) {
      console.error("jsPDF library is not loaded.");
      alert("PDF generator library is initializing. Please try again.");
      return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const primaryColor = [2, 132, 199];    // Cyan/Blue
    const darkColor = [15, 23, 42];        // Slate 900
    const lightBg = [240, 249, 255];       // Cyan 50
    const grayText = [100, 116, 139];      // Slate 500

    const sourceName = test.sourceName || test.rawInputs?.sourceName || 'Community Water Source';
    const sourceType = (test.sourceType || test.rawInputs?.sourceType || 'Water Source').toUpperCase();
    const location = test.location || test.rawInputs?.location || 'Unspecified Location';
    const testId = test.testId || 'AHC-2026-TEST';
    const date = test.testedDate || test.rawInputs?.testedDate || new Date().toISOString().split('T')[0];
    const score = test.scores?.overall || test.score || 0;
    const tds = test.tds || test.rawInputs?.tds || 0;
    const ph = test.ph || test.rawInputs?.ph || 7.0;
    const turbidity = test.turbidity || test.rawInputs?.turbidity || 0;
    const color = test.color || test.rawInputs?.color || 'Clear';
    const odor = test.odor || test.rawInputs?.odor || 'None';
    const category = test.category?.label || test.category || 'Standard';
    const risk = test.risk?.label || test.risk || 'Normal';

    // 1. Header Banner
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, 210, 28, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text("AQUA HEALTH CHECKER", 15, 12);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text("Test • Analyze • Monitor • Protect  |  Community Water Quality Intelligence", 15, 18);
    doc.text(`Official Diagnostic Report • BIS 10500 : 2012 / WHO Guidelines`, 15, 23);

    // Report ID & Date badge on top right
    doc.setFontSize(8);
    doc.text(`REPORT ID: ${testId}`, 195, 12, { align: 'right' });
    doc.text(`DATE: ${date}`, 195, 18, { align: 'right' });

    // 2. Source Summary Box
    doc.setFillColor(...lightBg);
    doc.roundedRect(15, 34, 180, 26, 3, 3, 'F');
    doc.setDrawColor(186, 230, 253);
    doc.roundedRect(15, 34, 180, 26, 3, 3, 'S');

    doc.setTextColor(...darkColor);
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text(sourceName, 20, 42);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...grayText);
    doc.text(`Source Type: ${sourceType}   |   Location: ${location}`, 20, 49);
    doc.text(`Tested By: ${test.testerName || test.rawInputs?.testerName || 'Community Volunteer'}   |   Lat/Lng: ${test.lat || test.rawInputs?.lat || '18.6298'}° N, ${test.lng || test.rawInputs?.lng || '73.7997'}° E`, 20, 55);

    // 3. Score & Classification Panel
    let scoreColor = [239, 68, 68]; // Red
    if (score >= 75) scoreColor = [16, 185, 129]; // Emerald
    else if (score >= 50) scoreColor = [245, 158, 11]; // Amber

    doc.setFillColor(scoreColor[0], scoreColor[1], scoreColor[2]);
    doc.roundedRect(15, 65, 55, 30, 3, 3, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text("WATER HEALTH SCORE", 42.5, 72, { align: 'center' });

    doc.setFontSize(22);
    doc.text(`${score}`, 42.5, 83, { align: 'center' });
    doc.setFontSize(9);
    doc.text("/ 100", 42.5, 90, { align: 'center' });

    // Category & Risk status cards
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(74, 65, 58, 30, 3, 3, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(74, 65, 58, 30, 3, 3, 'S');

    doc.setTextColor(...grayText);
    doc.setFontSize(8);
    doc.text("QUALITY CATEGORY", 78, 73);
    doc.setTextColor(...darkColor);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(category, 78, 83);

    doc.setFillColor(248, 250, 252);
    doc.roundedRect(136, 65, 59, 30, 3, 3, 'F');
    doc.roundedRect(136, 65, 59, 30, 3, 3, 'S');

    doc.setTextColor(...grayText);
    doc.setFontSize(8);
    doc.text("RISK LEVEL", 140, 73);
    doc.setTextColor(scoreColor[0], scoreColor[1], scoreColor[2]);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(risk, 140, 83);

    // 4. Parameter Table
    let currentY = 104;
    doc.setTextColor(...darkColor);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text("1. Laboratory / Physical-Chemical Parameters", 15, currentY);

    currentY += 4;
    // Table Header
    doc.setFillColor(226, 232, 240);
    doc.rect(15, currentY, 180, 7, 'F');
    doc.setFontSize(8);
    doc.setTextColor(...darkColor);
    doc.text("PARAMETER", 18, currentY + 5);
    doc.text("MEASURED VALUE", 65, currentY + 5);
    doc.text("BIS 10500 ACCEPTABLE LIMIT", 115, currentY + 5);
    doc.text("ASSESSMENT", 168, currentY + 5);

    currentY += 7;

    const rows = [
      ["TDS (Total Dissolved Solids)", `${tds} ppm (mg/L)`, "50 - 500 ppm (Max 2000)", tds <= 500 ? "COMPLIANT" : (tds <= 1200 ? "ELEVATED" : "HIGH RISK")],
      ["pH Level", `${ph}`, "6.5 - 8.5", ph >= 6.5 && ph <= 8.5 ? "BALANCED" : (ph < 6.5 ? "ACIDIC" : "ALKALINE")],
      ["Turbidity (Clarity)", `${turbidity} NTU`, "< 1.0 NTU (Max 5.0)", turbidity <= 1.0 ? "PRISTINE" : (turbidity <= 5.0 ? "ACCEPTABLE" : "TURBID")],
      ["Appearance / Color", `${color}`, "Colorless / Clear", color === 'clear' ? "NORMAL" : "COLORED"],
      ["Odor / Smell", `${odor}`, "Odorless (Agreeable)", odor === 'none' ? "ODORLESS" : "ANOMALY"]
    ];

    rows.forEach((r, idx) => {
      doc.setFillColor(idx % 2 === 0 ? 255 : 248, 250, 252);
      doc.rect(15, currentY, 180, 6.5, 'F');
      doc.setDrawColor(241, 245, 249);
      doc.rect(15, currentY, 180, 6.5, 'S');

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(...darkColor);
      doc.text(r[0], 18, currentY + 4.5);
      doc.text(r[1], 65, currentY + 4.5);
      doc.setTextColor(...grayText);
      doc.text(r[2], 115, currentY + 4.5);
      
      doc.setFont('helvetica', 'bold');
      if (r[3] === 'COMPLIANT' || r[3] === 'BALANCED' || r[3] === 'PRISTINE' || r[3] === 'NORMAL' || r[3] === 'ODORLESS') {
        doc.setTextColor(16, 185, 129);
      } else {
        doc.setTextColor(239, 68, 68);
      }
      doc.text(r[3], 168, currentY + 4.5);

      currentY += 6.5;
    });

    // 5. Multi-Purpose Usage Matrix
    currentY += 5;
    doc.setTextColor(...darkColor);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text("2. Multi-Purpose Usage Suitability Matrix", 15, currentY);

    currentY += 4;
    const usages = test.usageMatrix || [
      { nameKey: 'Drinking', status: score >= 75 ? 'fit' : 'unfit', reason: score >= 75 ? 'Directly Drinkable' : 'Filtration Required' },
      { nameKey: 'Cooking', status: score >= 65 ? 'fit' : 'unfit', reason: 'Safe for cooking' },
      { nameKey: 'Bathing', status: score >= 40 ? 'fit' : 'unfit', reason: 'Skin contact safe' },
      { nameKey: 'Washing', status: tds <= 1000 ? 'fit' : 'unfit', reason: 'Domestic washing' },
      { nameKey: 'Agriculture', status: 'fit', reason: 'Crop irrigation' },
      { nameKey: 'Livestock', status: score >= 35 ? 'fit' : 'unfit', reason: 'Animal intake' }
    ];

    usages.forEach((u, i) => {
      const col = i % 2;
      const x = col === 0 ? 15 : 107;
      const y = currentY + Math.floor(i / 2) * 9;

      doc.setFillColor(248, 250, 252);
      doc.roundedRect(x, y, 88, 7.5, 1.5, 1.5, 'F');
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(x, y, 88, 7.5, 1.5, 1.5, 'S');

      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...darkColor);
      const name = window.i18n ? window.i18n.t(u.nameKey) : (u.nameKey || u.id);
      doc.text(name, x + 3, y + 5);

      const isFit = u.status === 'fit';
      const isCond = u.status === 'conditional';
      doc.setTextColor(isFit ? 16 : (isCond ? 245 : 239), isFit ? 185 : (isCond ? 158 : 68), isFit ? 129 : (isCond ? 11 : 68));
      doc.text(isFit ? "SUITABLE" : (isCond ? "PRECAUTION" : "UNSUITABLE"), x + 85, y + 5, { align: 'right' });
    });

    currentY += 32;

    // 6. Actionable Treatment Recommendations
    doc.setTextColor(...darkColor);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text("3. Recommended Purification Protocols", 15, currentY);

    currentY += 4;
    const recs = test.recommendations || [];
    if (recs.length === 0) {
      recs.push({ name: 'Standard Filtration', desc: 'No special chemical purification required.' });
    }

    recs.slice(0, 3).forEach((r) => {
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...primaryColor);
      doc.text(`• ${r.name}`, 18, currentY + 3);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...darkColor);
      const splitDesc = doc.splitTextToSize(r.desc, 170);
      doc.text(splitDesc, 22, currentY + 7);
      currentY += (splitDesc.length * 3.5) + 5;
    });

    // 7. Final Scientific Conclusion
    currentY += 2;
    doc.setFillColor(...lightBg);
    doc.roundedRect(15, currentY, 180, 22, 2, 2, 'F');
    doc.setDrawColor(186, 230, 253);
    doc.roundedRect(15, currentY, 180, 22, 2, 2, 'S');

    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...primaryColor);
    doc.text("SCIENTIFIC CONCLUSION & VERDICT", 19, currentY + 5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...darkColor);
    const conclusionText = test.conclusion || "This water source has been evaluated based on standard WHO physical-chemical guidelines.";
    const splitConclusion = doc.splitTextToSize(conclusionText, 172);
    doc.text(splitConclusion, 19, currentY + 10);

    // 8. Footer
    doc.setFontSize(7);
    doc.setTextColor(...grayText);
    doc.text("Aqua Health Checker Citizen Network • Verified Open Water Quality Intelligence Platform • BIS 10500:2012 Reference", 105, 290, { align: 'center' });

    // Save PDF
    const safeFilename = `AquaReport_${sourceName.replace(/[^a-zA-Z0-9]/g, '_')}_${testId}.pdf`;
    doc.save(safeFilename);
  }

  /**
   * Print assessment
   */
  printReport(test) {
    window.print();
  }

  /**
   * Share assessment via Web Share API or Clipboard
   */
  shareReport(test) {
    const title = `Aqua Health Checker - ${test.sourceName || 'Water Quality Report'}`;
    const score = test.scores?.overall || test.score || 0;
    const text = `Water Quality Health Score for "${test.sourceName}": ${score}/100 (${test.category?.label || test.category}). Check real-time report on Aqua Health Checker!`;
    const url = window.location.href;

    if (navigator.share) {
      navigator.share({ title, text, url }).catch(console.warn);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(`${text}\n${url}`);
      if (window.app) window.app.showToast(window.i18n ? window.i18n.t('alert_copied') : 'Link copied to clipboard!', 'success');
    }
  }
}

// Global instance
window.aquaReports = new AquaReportGenerator();
