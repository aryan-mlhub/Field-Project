/**
 * Aqua Health Checker - Scientific Water Quality Assessment Engine
 * Compliant with BIS 10500:2012 & World Health Organization (WHO) Guidelines
 */

class WaterAnalysisEngine {
  constructor() {
    this.standards = {
      tds: { idealMin: 50, idealMax: 300, acceptableMax: 500, permissibleMax: 1200 },
      ph: { min: 6.5, max: 8.5, idealMin: 6.8, idealMax: 7.8 },
      turbidity: { idealMax: 1.0, acceptableMax: 5.0 }
    };
  }

  /**
   * Main assessment entry point
   * @param {Object} data - { tds, ph, turbidity, color, odor, notes, location, sourceName, sourceType }
   * @param {string} lang - 'en' | 'hi' | 'mr'
   * @returns {Object} Full diagnostic report
   */
  assess(data, lang = 'en') {
    const tds = parseFloat(data.tds) || 0;
    const ph = parseFloat(data.ph) || 7.0;
    const turbidity = parseFloat(data.turbidity) || 0;
    const color = data.color || 'clear';
    const odor = data.odor || 'none';

    // 1. Calculate Component Scores
    const tdsScore = this.calculateTdsScore(tds);
    const phScore = this.calculatePhScore(ph);
    const turbidityScore = this.calculateTurbidityScore(turbidity);
    const sensoryScore = this.calculateSensoryScore(color, odor);

    // 2. Weighted Overall Water Health Score (WQI 0 - 100)
    let rawScore = (tdsScore * 0.35) + (phScore * 0.30) + (turbidityScore * 0.20) + (sensoryScore * 0.15);
    
    // Critical safety override: if chemical/sulfur odor or extreme pH or extreme TDS, cap max score
    if (odor === 'chemical' || odor === 'sulfur' || ph < 5.0 || ph > 10.0 || tds > 2000) {
      rawScore = Math.min(rawScore, 28);
    }
    const healthScore = Math.max(0, Math.min(100, Math.round(rawScore)));

    // 3. Classify Quality Tier
    let categoryKey = 'cat_unsafe';
    let badgeClass = 'bg-rose-500/10 text-rose-600 border-rose-300 dark:border-rose-800 dark:text-rose-400';
    let colorHex = '#ef4444';

    if (healthScore >= 88) {
      categoryKey = 'cat_excellent';
      badgeClass = 'bg-emerald-500/10 text-emerald-600 border-emerald-300 dark:border-emerald-800 dark:text-emerald-400';
      colorHex = '#10b981';
    } else if (healthScore >= 72) {
      categoryKey = 'cat_good';
      badgeClass = 'bg-cyan-500/10 text-cyan-600 border-cyan-300 dark:border-cyan-800 dark:text-cyan-400';
      colorHex = '#06b6d4';
    } else if (healthScore >= 52) {
      categoryKey = 'cat_moderate';
      badgeClass = 'bg-amber-500/10 text-amber-600 border-amber-300 dark:border-amber-800 dark:text-amber-400';
      colorHex = '#f59e0b';
    } else if (healthScore >= 32) {
      categoryKey = 'cat_poor';
      badgeClass = 'bg-orange-500/10 text-orange-600 border-orange-300 dark:border-orange-800 dark:text-orange-400';
      colorHex = '#f97316';
    }

    // 4. Risk Level
    let riskKey = 'risk_high';
    let riskBadge = 'bg-rose-500 text-white';
    if (healthScore >= 72 && ph >= 6.5 && ph <= 8.5 && turbidity <= 2.5 && (odor === 'none' || odor === 'chlorine')) {
      riskKey = 'risk_low';
      riskBadge = 'bg-emerald-500 text-white';
    } else if (healthScore >= 48) {
      riskKey = 'risk_medium';
      riskBadge = 'bg-amber-500 text-white';
    }

    // 5. Drinking Suitability
    let drinkingKey = 'drink_unsafe';
    if (healthScore >= 80 && ph >= 6.5 && ph <= 8.5 && tds <= 450 && turbidity <= 1.5 && odor === 'none') {
      drinkingKey = 'drink_safe';
    } else if (healthScore >= 45 && ph >= 6.0 && ph <= 8.8 && tds <= 1200 && odor !== 'chemical' && odor !== 'sulfur') {
      drinkingKey = 'drink_boil_filter';
    }

    // 6. Multi-Purpose Usage Suitability Matrix
    const usageMatrix = this.computeUsageMatrix(tds, ph, turbidity, color, odor, healthScore, lang);

    // 7. Problem Detection
    const problems = this.detectProblems(tds, ph, turbidity, color, odor, lang);

    // 8. Actionable Treatment Recommendations
    const recommendations = this.generateRecommendations(tds, ph, turbidity, color, odor, healthScore, lang);

    // 9. Health Warnings
    const warnings = this.generateHealthWarnings(tds, ph, turbidity, color, odor, healthScore, lang);

    // 10. AI-style Comprehensive Conclusion
    const conclusion = this.generateConclusion(data, healthScore, categoryKey, riskKey, drinkingKey, problems, lang);

    return {
      testId: 'AHC-' + Date.now().toString(36).toUpperCase() + '-' + Math.floor(Math.random() * 900 + 100),
      timestamp: new Date().toISOString(),
      rawInputs: { tds, ph, turbidity, color, odor, ...data },
      scores: {
        tdsScore,
        phScore,
        turbidityScore,
        sensoryScore,
        overall: healthScore
      },
      category: {
        key: categoryKey,
        label: window.i18n ? window.i18n.t(categoryKey) : categoryKey,
        badgeClass,
        colorHex
      },
      risk: {
        key: riskKey,
        label: window.i18n ? window.i18n.t(riskKey) : riskKey,
        badgeClass: riskBadge
      },
      drinkingSuitability: {
        key: drinkingKey,
        label: window.i18n ? window.i18n.t(drinkingKey) : drinkingKey
      },
      usageMatrix,
      problems,
      recommendations,
      warnings,
      conclusion
    };
  }

  calculateTdsScore(tds) {
    if (tds >= 50 && tds <= 250) return 100;
    if (tds > 250 && tds <= 350) return 90;
    if (tds > 350 && tds <= 500) return 75; // BIS Acceptable limit
    if (tds > 500 && tds <= 800) return 55;
    if (tds > 800 && tds <= 1200) return 35; // BIS Permissible limit in absence of alternate source
    if (tds > 1200 && tds <= 1800) return 15;
    if (tds > 1800) return 0;
    if (tds < 50) return 70; // Highly demineralized water
    return 60;
  }

  calculatePhScore(ph) {
    if (ph >= 6.8 && ph <= 7.8) return 100;
    if (ph >= 6.5 && ph <= 8.5) return 85; // BIS safe limit
    if (ph >= 6.0 && ph < 6.5) return 50;  // Mildly acidic
    if (ph > 8.5 && ph <= 9.0) return 50;  // Mildly alkaline
    if (ph >= 5.0 && ph < 6.0) return 25;  // Corrosive
    if (ph > 9.0 && ph <= 10.0) return 20; // High alkalinity
    return 5; // Extreme unsafe
  }

  calculateTurbidityScore(turbidity) {
    if (turbidity <= 0.8) return 100;
    if (turbidity <= 1.5) return 90;
    if (turbidity <= 3.0) return 70;
    if (turbidity <= 5.0) return 45; // BIS Max permissible limit
    if (turbidity <= 10.0) return 20;
    return 5;
  }

  calculateSensoryScore(color, odor) {
    let score = 100;
    // Color penalties
    if (color === 'slightly_cloudy') score -= 20;
    else if (color === 'yellowish') score -= 40;
    else if (color === 'brownish') score -= 65;
    else if (color === 'greenish') score -= 70;
    else if (color === 'milky') score -= 45;

    // Odor penalties
    if (odor === 'chlorine') score -= 10; // Mild chlorine disinfectant
    else if (odor === 'earthy') score -= 25;
    else if (odor === 'metallic') score -= 40;
    else if (odor === 'sulfur') score -= 70;
    else if (odor === 'chemical') score -= 85;

    return Math.max(5, score);
  }

  computeUsageMatrix(tds, ph, turbidity, color, odor, score, lang) {
    const isSafeDrinking = score >= 75 && ph >= 6.5 && ph <= 8.5 && tds <= 500 && turbidity <= 2.0 && odor === 'none';
    const isSafeCooking = score >= 65 && ph >= 6.3 && ph <= 8.8 && tds <= 750 && turbidity <= 3.0 && odor !== 'chemical' && odor !== 'sulfur';
    const isSafeBathing = ph >= 6.0 && ph <= 9.0 && turbidity <= 8.0 && odor !== 'chemical';
    const isSafeWashing = tds <= 1000 && color !== 'brownish' && color !== 'yellowish' && odor !== 'sulfur';
    const isSafeIrrigation = tds <= 1500 && ph >= 5.5 && ph <= 8.8 && odor !== 'chemical';
    const isSafeLivestock = tds <= 1800 && ph >= 6.0 && ph <= 8.8 && turbidity <= 10.0 && odor !== 'chemical';

    const getStatus = (val, condVal) => val ? 'fit' : (condVal ? 'conditional' : 'unfit');

    return [
      {
        id: 'drinking',
        nameKey: 'usage_drinking',
        status: isSafeDrinking ? 'fit' : (score >= 45 && odor !== 'chemical' && odor !== 'sulfur' ? 'conditional' : 'unfit'),
        reason: isSafeDrinking 
          ? (lang === 'hi' ? 'सीधे उपभोग के लिए आदर्श' : lang === 'mr' ? 'थेट पिण्यासाठी अत्यंत सुरक्षित' : 'Meets all WHO & BIS potability standards')
          : (score >= 45 
              ? (lang === 'hi' ? 'उबालने या RO फिल्टर के बाद ही पिएं' : lang === 'mr' ? 'उकळून किंवा फिल्टर करूनच पिण्यास वापरा' : 'Purification or boiling mandatory before consumption')
              : (lang === 'hi' ? 'पीने के लिए असुरक्षित' : lang === 'mr' ? 'पिण्यासाठी अयोग्य व धोकादायक' : 'Dangerous for direct consumption'))
      },
      {
        id: 'cooking',
        nameKey: 'usage_cooking',
        status: isSafeCooking ? 'fit' : (score >= 40 && odor !== 'chemical' ? 'conditional' : 'unfit'),
        reason: isSafeCooking 
          ? (lang === 'hi' ? 'भोजन पकाने के लिए सुरक्षित' : lang === 'mr' ? 'स्वयंपाकासाठी सुरक्षित' : 'Safe for preparing meals and boiling')
          : (lang === 'hi' ? 'पूर्व-शोधन (Pre-filtration) आवश्यक' : lang === 'mr' ? 'गाळून व शुद्ध करूनच वापरा' : 'Filtration advised before food preparation')
      },
      {
        id: 'bathing',
        nameKey: 'usage_bathing',
        status: isSafeBathing ? 'fit' : (score >= 35 ? 'conditional' : 'unfit'),
        reason: isSafeBathing 
          ? (lang === 'hi' ? 'त्वचा और बालों के लिए सामान्य' : lang === 'mr' ? 'अंघोळीसाठी सुरक्षित' : 'Safe for skin contact and daily hygiene')
          : (lang === 'hi' ? 'त्वचा में जलन या सूखापन हो सकता है' : lang === 'mr' ? 'त्वचेला खाज किंवा कोरडेपणा येऊ शकतो' : 'May cause skin irritation or dryness due to pH/salts')
      },
      {
        id: 'washing',
        nameKey: 'usage_washing',
        status: isSafeWashing ? 'fit' : (tds <= 1400 ? 'conditional' : 'unfit'),
        reason: isSafeWashing 
          ? (lang === 'hi' ? 'कपड़े व बर्तन धोने हेतु उपयुक्त' : lang === 'mr' ? 'भांडी व कपडे धुण्यासाठी उत्तम' : 'Good for laundry and household cleaning')
          : (lang === 'hi' ? 'कठोर पानी से साबुन कम झाग देगा व दाग लग सकते हैं' : lang === 'mr' ? 'क्षार जास्त असल्याने कपड्यांवर डाग पडू शकतात' : 'High hardness causes scaling and poor soap lathering')
      },
      {
        id: 'irrigation',
        nameKey: 'usage_irrigation',
        status: isSafeIrrigation ? 'fit' : 'conditional',
        reason: isSafeIrrigation 
          ? (lang === 'hi' ? 'फसलों और बागवानी के लिए अनुकूल' : lang === 'mr' ? 'शेती व झाडांसाठी योग्य' : 'Suitable for crops, plants, and soil health')
          : (lang === 'hi' ? 'उच्च लवणता से मिट्टी की उर्वरता प्रभावित हो सकती है' : lang === 'mr' ? 'जास्त क्षारामुळे जमिनीची प्रत खराब होऊ शकते' : 'High salinity may affect sensitive plant roots')
      },
      {
        id: 'livestock',
        nameKey: 'usage_livestock',
        status: isSafeLivestock ? 'fit' : (score >= 30 ? 'conditional' : 'unfit'),
        reason: isSafeLivestock 
          ? (lang === 'hi' ? 'मवेशियों व पशुओं के लिए सुरक्षित' : lang === 'mr' ? 'जनावरांना पाजण्यासाठी योग्य' : 'Safe for cattle and farm animals')
          : (lang === 'hi' ? 'पशुओं के स्वास्थ्य के लिए हानिकारक' : lang === 'mr' ? 'जनावरांच्या आरोग्यास धोकादायक' : 'High mineral/chemical risk for livestock')
      }
    ];
  }

  detectProblems(tds, ph, turbidity, color, odor, lang) {
    const problems = [];

    // TDS Diagnostics
    if (tds > 1200) {
      problems.push({
        title: lang === 'hi' ? 'अत्यधिक टीडीएस (High Mineral/Salinity)' : lang === 'mr' ? 'अत्यंत जास्त टीडीएस (क्षार)' : 'Critically High TDS (>1200 ppm)',
        desc: lang === 'hi' ? `टीडीएस ${tds} ppm है। यह बीआईएस सीमा से अधिक है, जिससे खारा स्वाद और गुर्दे पर प्रभाव पड़ता है।` : lang === 'mr' ? `टीडीएस ${tds} ppm आहे. यामुळे पाणी खारट लागते आणि मूतखड्याचा धोका वाढतो.` : `TDS level (${tds} ppm) severely exceeds the acceptable drinking limit, causing bitter taste and mineral buildup.`,
        severity: 'high'
      });
    } else if (tds > 500) {
      problems.push({
        title: lang === 'hi' ? 'मध्यम टीडीएस (Elevated TDS)' : lang === 'mr' ? 'मध्यम टीडीएस पातळी' : 'Elevated TDS (500 - 1200 ppm)',
        desc: lang === 'hi' ? `टीडीएस ${tds} ppm है। पानी थोड़ा भारी और स्वाद में खारा हो सकता है।` : lang === 'mr' ? `टीडीएस ${tds} ppm आहे. हे पिण्यासाठी थोडे जड आहे.` : `TDS of ${tds} ppm is above ideal levels (50-300 ppm) but acceptable in absence of better sources.`,
        severity: 'medium'
      });
    } else if (tds < 50) {
      problems.push({
        title: lang === 'hi' ? 'अत्यंत कम टीडीएस (Demineralized)' : lang === 'mr' ? 'अत्यंत कमी टीडीएस' : 'Extremely Low TDS (<50 ppm)',
        desc: lang === 'hi' ? 'पानी में आवश्यक खनिजों (कैल्शियम/मैग्नीशियम) की कमी है।' : lang === 'mr' ? 'पाण्यात आवश्यक नैसर्गिक खनिजांची कमतरता आहे.' : 'Water is stripped of essential electrolytes and minerals.',
        severity: 'low'
      });
    }

    // pH Diagnostics
    if (ph < 6.5) {
      problems.push({
        title: lang === 'hi' ? 'अम्लीय पानी (Acidic pH)' : lang === 'mr' ? 'आम्लधर्मी पाणी (Acidic pH)' : `Acidic Water (pH ${ph})`,
        desc: lang === 'hi' ? 'पीएच 6.5 से कम है। यह पाइपों को गला सकता है और सीसा/तांबा घोल सकता है।' : lang === 'mr' ? 'पीएच ६.५ पेक्षा कमी असल्याने पाईप्स खराब होऊन विषारी धातू विरघळू शकतात.' : `pH below 6.5 is corrosive to plumbing and can leach toxic heavy metals (copper/lead).`,
        severity: ph < 5.5 ? 'high' : 'medium'
      });
    } else if (ph > 8.5) {
      problems.push({
        title: lang === 'hi' ? 'अत्यधिक क्षारीय पानी (High Alkaline pH)' : lang === 'mr' ? 'जास्त क्षारधर्मी पाणी' : `High Alkaline Water (pH ${ph})`,
        desc: lang === 'hi' ? 'पीएच 8.5 से अधिक है। पानी साबुन जैसा चिकना और कड़वा लग सकता है।' : lang === 'mr' ? 'पीएच ८.५ पेक्षा जास्त असल्याने पाणी तुरट व पचनास जड लागते.' : `pH above 8.5 can impart a soda-like taste and reduce the efficacy of chlorine disinfection.`,
        severity: ph > 9.5 ? 'high' : 'medium'
      });
    }

    // Turbidity Diagnostics
    if (turbidity > 5.0) {
      problems.push({
        title: lang === 'hi' ? 'उच्च गंदलापन (High Turbidity)' : lang === 'mr' ? 'जास्त गढूळपणा' : `High Turbidity (${turbidity} NTU)`,
        desc: lang === 'hi' ? 'पानी में मिट्टी और निलंबित कण हैं, जो रोगाणुओं (बैक्टीरिया/वायरस) को शरण देते हैं।' : lang === 'mr' ? 'पाण्यात माती व सूक्ष्म कण असून जंतूंचा फैलाव होऊ शकतो.' : `Turbidity exceeds 5.0 NTU limit. Suspended matter protects harmful pathogens from disinfection.`,
        severity: 'high'
      });
    } else if (turbidity > 1.5) {
      problems.push({
        title: lang === 'hi' ? 'हल्का गंदलापन (Mild Turbidity)' : lang === 'mr' ? 'किंचित गढूळ पाणी' : `Noticeable Turbidity (${turbidity} NTU)`,
        desc: lang === 'hi' ? 'पानी में बारीक कण मौजूद हैं। सेडिमेंट फिल्टर आवश्यक है।' : lang === 'mr' ? 'पाण्यात बारीक गाळ आहे. गाळणीची गरज आहे.' : `Water is slightly cloudy. Mechanical sediment filtration is recommended.`,
        severity: 'medium'
      });
    }

    // Odor / Color Diagnostics
    if (odor === 'sulfur') {
      problems.push({
        title: lang === 'hi' ? 'सड़े अंडे जैसी गंध (Hydrogen Sulfide)' : lang === 'mr' ? 'सडक्या अंड्यासारखा वास' : 'Hydrogen Sulfide (Sulfur Odor)',
        desc: lang === 'hi' ? 'भूमिगत जीवाणुओं द्वारा सल्फर गैस का संकेत। वातन (Aeration) व कार्बन फिल्टर जरूरी है।' : lang === 'mr' ? 'भूगर्भातील जंतूंमुळे गंधक तयार होतो. कार्बन फिल्टर आवश्यक आहे.' : 'Indicates anaerobic bacterial activity producing hydrogen sulfide gas.',
        severity: 'high'
      });
    } else if (odor === 'chemical') {
      problems.push({
        title: lang === 'hi' ? 'रासायनिक / सीवेज गंध' : lang === 'mr' ? 'रासायनिक / गटार दुर्गंधी' : 'Chemical / Industrial Contamination Odor',
        desc: lang === 'hi' ? 'औद्योगिक अपशिष्ट या सीवेज का रिसाव संभव है। तुरंत प्रयोगशाला जांच कराएं!' : lang === 'mr' ? 'सांडपाणी किंवा केमिकल मिसळल्याची शक्यता. तातडीने तपासणी करा!' : 'Suspected industrial or sewage intrusion. Urgent laboratory testing required.',
        severity: 'high'
      });
    }

    if (color === 'greenish') {
      problems.push({
        title: lang === 'hi' ? 'शैवाल / काई की मौजूदगी (Algae Growth)' : lang === 'mr' ? 'शेवाळ व वनस्पती वाढ' : 'Algal Growth / Organic Matter',
        desc: lang === 'hi' ? 'पानी में काई है जो विषाक्त पदार्थों (Microcystins) का कारण बन सकती है।' : lang === 'mr' ? 'पाण्यात शेवाळ असून दूषिततेचे प्रमाण वाढू शकते.' : 'Green hue indicates algae, which can produce dangerous cyanotoxins.',
        severity: 'high'
      });
    } else if (color === 'yellowish' || color === 'brownish') {
      problems.push({
        title: lang === 'hi' ? 'आयरन / जंग या मिट्टी की मौजूदगी' : lang === 'mr' ? 'लोखंड किंवा गंजचे प्रमाण' : 'Iron / Rust / Silt Intrusion',
        desc: lang === 'hi' ? 'पानी में जंग, लोहा या मिट्टी घुली है।' : lang === 'mr' ? 'पाण्यात माती किंवा लोखंडाचे कण आहेत.' : 'Rust or dissolved ferric iron particles present in water supply.',
        severity: 'medium'
      });
    }

    return problems;
  }

  generateRecommendations(tds, ph, turbidity, color, odor, score, lang) {
    const recs = [];

    // RO Purification
    if (tds > 500) {
      recs.push({
        name: lang === 'hi' ? 'रिवर्स ऑस्मोसिस (RO Filtration)' : lang === 'mr' ? 'रिव्हर्स ऑस्मोसिस (RO फिल्टर)' : 'Reverse Osmosis (RO) Membrane',
        desc: lang === 'hi' ? 'अतिरिक्त टीडीएस, भारी धातुओं और लवणों को 90%+ तक कम करने के लिए RO सर्वोत्तम है।' : lang === 'mr' ? 'जास्त क्षार व टीडीएस कमी करण्यासाठी RO प्रणाली वापरा.' : 'Best for reducing high mineral salinity, heavy metals, and dissolved solids by 90%+.',
        badge: 'Critical',
        icon: 'droplets'
      });
    }

    // Boiling
    if (score < 80 || turbidity > 1.0 || odor !== 'none') {
      recs.push({
        name: lang === 'hi' ? 'उबालना (Boiling for 5+ mins)' : lang === 'mr' ? 'पाणी ५+ मिनिटे उकळणे' : 'Vigorous Boiling (100°C for 5 mins)',
        desc: lang === 'hi' ? 'पानी को 100°C पर 5 मिनट उबालने से सभी बैक्टीरिया, वायरस और प्रोटोजोआ नष्ट हो जाते हैं।' : lang === 'mr' ? 'पाणी ५ मिनिटे उकळल्याने सर्व जिवाणू व विषाणू पूर्णपणे नष्ट होतात.' : 'Eliminates 99.9% of biological pathogens (bacteria, viruses, cyst parasites).',
        badge: 'Recommended',
        icon: 'flame'
      });
    }

    // Sediment Filtration
    if (turbidity > 1.0 || color !== 'clear') {
      recs.push({
        name: lang === 'hi' ? 'मल्टी-स्टेज सेडिमेंट फिल्टर (Sediment Filter)' : lang === 'mr' ? 'गाळणी / सेडिमेंट फिल्टर' : 'Multi-Stage 5-Micron Sediment Filter',
        desc: lang === 'hi' ? 'मिट्टी, जंग, रेत और निलंबित कणों को पानी से अलग करने के लिए।' : lang === 'mr' ? 'माती, गाळ आणि सूक्ष्म कचरा काढण्यासाठी ५-मायक्रॉन फिल्टर वापरा.' : 'Traps physical silt, suspended clay, micro-particles, and pipeline rust.',
        badge: 'Recommended',
        icon: 'filter'
      });
    }

    // Activated Carbon
    if (odor !== 'none' || color !== 'clear') {
      recs.push({
        name: lang === 'hi' ? 'सक्रिय कार्बन फिल्टर (Activated Carbon)' : lang === 'mr' ? 'अ‍ॅक्टिव्हेटेड कार्बन फिल्टर' : 'Activated Carbon Block Filtration',
        desc: lang === 'hi' ? 'अप्रिय गंध, क्लोरीन, कीटनाशक अवशेष और कार्बनिक रसायनों को सोखने के लिए।' : lang === 'mr' ? 'दुर्गंधी, क्लोरीन व रासायनिक घटक शोषून घेण्यासाठी अत्यंत गुणकारी.' : 'Adsorbs foul odors, hydrogen sulfide, chlorine residual, VOCs, and improves taste.',
        badge: 'Recommended',
        icon: 'sparkles'
      });
    }

    // UV Sterilization
    if (score >= 60 && turbidity <= 2.0 && tds <= 500) {
      recs.push({
        name: lang === 'hi' ? 'अल्ट्रावायलेट (UV Purification)' : lang === 'mr' ? 'अल्ट्राव्हायोलेट (UV) किरणे' : 'Ultraviolet (UV) Disinfection',
        desc: lang === 'hi' ? 'बिना रसायन के बैक्टीरिया को निष्क्रिय करने के लिए आदर्श (जब टीडीएस सामान्य हो)।' : lang === 'mr' ? 'कमी टीडीएस असताना जंतू मारण्यासाठी सर्वोत्तम पद्धत.' : 'Neutralizes microbial DNA without chemical additives; ideal for low-TDS clear water.',
        badge: 'Effective',
        icon: 'sun'
      });
    }

    // pH Neutralization
    if (ph < 6.5) {
      recs.push({
        name: lang === 'hi' ? 'पीएच न्यूट्रलाइजर / सोडा ऐश फिल्टर' : lang === 'mr' ? 'पीएच बॅलन्स / अल्कलाईन फिल्टर' : 'Calcite / Soda Ash Neutralization',
        desc: lang === 'hi' ? 'अम्लीयता दूर करने और पाइपों को जंग से बचाने के लिए कैल्शियम कार्बोनेट मीडिया का उपयोग करें।' : lang === 'mr' ? 'आम्लता कमी करण्यासाठी अल्कलाईन मीडिया किंवा चुना/कॅल्शियम वापरा.' : 'Increases pH to safe 7.2-7.6 zone to prevent heavy metal corrosion.',
        badge: 'Corrective',
        icon: 'sliders'
      });
    }

    return recs;
  }

  generateHealthWarnings(tds, ph, turbidity, color, odor, score, lang) {
    const warnings = [];

    if (score < 40) {
      warnings.push(lang === 'hi' 
        ? '⚠️ चेतावनी: यह जल वर्तमान अवस्था में बिना पूर्ण शोधन के उपभोग करने पर जलजनित रोग (पेचिश, टायफाइड, गैस्ट्रोएंटेराइटिस) का कारण बन सकता है।'
        : lang === 'mr'
        ? '⚠️ इशारा: हे पाणी शुद्धीकरणाशिवाय पिल्यास जुलाब, टायफॉईड व पोटाचे गंभीर विकार होऊ शकतात.'
        : '⚠️ Alert: Consuming this water untreated poses severe risks of acute gastrointestinal infections and waterborne illnesses.');
    }

    if (tds > 1000) {
      warnings.push(lang === 'hi'
        ? '⚠️ उच्च टीडीएस युक्त पानी का दीर्घकालिक सेवन गुर्दे (Kidney) और पित्ताशय में पथरी के खतरे को बढ़ा सकता है।'
        : lang === 'mr'
        ? '⚠️ जास्त टीडीएस असलेले पाणी सतत पिल्याने मूतखडा आणि पचनसंस्थेचे आजार होऊ शकतात.'
        : '⚠️ Long-term consumption of high-salinity water stresses renal filtration and may accelerate kidney stone formation.');
    }

    if (turbidity > 4.0) {
      warnings.push(lang === 'hi'
        ? '⚠️ गंदला पानी रोगाणुओं का संवाहक है। इसे बच्चों और वृद्धों को बिल्कुल न दें।'
        : lang === 'mr'
        ? '⚠️ गढूळ पाण्यात जंतूंचे प्रमाण जास्त असते. लहान मुले व वृद्धांना हे पाणी देऊ नका.'
        : '⚠️ High turbidity harbors coliform bacteria. Vulnerable groups (infants/elderly) must avoid raw intake.');
    }

    return warnings;
  }

  generateConclusion(data, score, categoryKey, riskKey, drinkingKey, problems, lang) {
    const srcName = data.sourceName || (lang === 'hi' ? 'यह जल स्रोत' : lang === 'mr' ? 'हा पाण्याचा स्रोत' : 'This water source');
    const tds = data.tds;
    const ph = data.ph;
    const catLabel = window.i18n ? window.i18n.t(categoryKey) : categoryKey;

    if (lang === 'hi') {
      if (score >= 80) {
        return `वैज्ञानिक परीक्षण के अनुसार "${srcName}" का समग्र जल स्वास्थ्य स्कोर ${score}/100 है, जो '${catLabel}' श्रेणी में आता है। टीडीएस (${tds} ppm) और पीएच (${ph}) दोनों बीआईएस 10500 के सुरक्षित मानकों के अंतर्गत हैं। यह जल दैनिक उपभोग, भोजन पकाने और सामान्य घरेलू कार्यों के लिए अत्यंत उत्तम और सुरक्षित है।`;
      } else if (score >= 50) {
        return `परीक्षण के अनुसार "${srcName}" का स्कोर ${score}/100 है, जो '${catLabel}' श्रेणी में है। जल में कुछ पैरामीटर (जैसे टीडीएस या पीएच) आदर्श सीमा से विचलित हैं। इसे सीधे पीने के बजाय उबालकर या सेडिमेंट/आरओ फिल्टर से गुजारने के बाद ही पीने और खाना पकाने में उपयोग करें।`;
      } else {
        return `परीक्षण के अनुसार "${srcName}" का स्कोर मात्र ${score}/100 है, जो '${catLabel}' श्रेणी में आता है। इसमें ${problems.length} प्रमुख कमियां पाई गई हैं। यह जल बिना संपूर्ण शोधन (RO/UV/Boiling) के सीधे पीने के लिए पूर्णतः असुरक्षित है। सामुदायिक स्तर पर त्वरित सुधारात्मक उपाय आवश्यक हैं।`;
      }
    } else if (lang === 'mr') {
      if (score >= 80) {
        return `वैज्ञानिक तपासणीनुसार "${srcName}" या स्रोताचा पाणी आरोग्य स्कोर ${score}/१०० असून तो '${catLabel}' श्रेणीत येतो. पाण्याचा टीडीएस (${tds} ppm) आणि पीएच (${ph}) सुरक्षित मर्यादेत आहेत. हे पाणी थेट पिण्यासाठी, स्वयंपाकासाठी आणि दैनंदिन वापरासाठी पूर्णपणे योग्य आहे.`;
      } else if (score >= 50) {
        return `तपासणीनुसार "${srcName}" चा स्कोर ${score}/१०० असून तो '${catLabel}' श्रेणीत आहे. पाण्यात काही घटकांची पातळी सरासरीपेक्षा जास्त आहे. हे पाणी पिण्यापूर्वी ५ मिनिटे उकळणे किंवा फिल्टर करणे बंधनकारक आहे.`;
      } else {
        return `तपासणीनुसार "${srcName}" चा स्कोर केवळ ${score}/१०० असून तो '${catLabel}' श्रेणीत आहे. यामध्ये ${problems.length} गंभीर दोष आढळले आहेत. योग्य शुद्धीकरणाशिवाय हे पाणी पिणे आरोग्यास अत्यंत धोकादायक ठरू शकते.`;
      }
    } else {
      if (score >= 80) {
        return `Based on standard scientific analysis, "${srcName}" achieved a Water Health Score of ${score}/100 (${catLabel}). Both TDS (${tds} ppm) and pH (${ph}) lie within the safe parameters of BIS 10500:2012 and WHO guidelines. The water is pristine, safe for direct human consumption, cooking, and multi-purpose domestic use.`;
      } else if (score >= 50) {
        return `Analysis reveals that "${srcName}" holds a moderate score of ${score}/100 (${catLabel}). While usable for non-potable household activities, drinking and cooking require primary physical filtration and boiling to eliminate potential contaminants.`;
      } else {
        return `Critically, "${srcName}" scored only ${score}/100 (${catLabel}) with ${problems.length} distinct environmental anomalies detected. Direct consumption is strongly discouraged. Multi-barrier purification (RO filtration, sediment pre-filter, and boiling) is strictly required before potable use.`;
      }
    }
  }
}

// Global instance
window.waterEngine = new WaterAnalysisEngine();
