/**
 * Aqua Health Checker - Internationalization (i18n) Dictionary
 * Supports: English (en), Hindi (hi), Marathi (mr)
 */

const translations = {
  en: {
    app_title: "Aqua Health Checker",
    tagline: "Test • Analyze • Monitor • Protect",
    subtitle: "Real-time Community Water Quality Intelligence & Health Assessment Platform",
    
    // Navigation
    nav_dashboard: "Dashboard",
    nav_new_test: "New Test",
    nav_map_db: "Water Database",
    nav_analytics: "Analytics",
    nav_academy: "Water Academy",
    btn_quick_test: "Quick Test (<30s)",
    search_placeholder: "Search village, area, source name, or type...",

    // Quick Stats
    stat_total_tests: "Total Tests Conducted",
    stat_sources_monitored: "Sources Monitored",
    stat_safe_sources: "Safe Sources",
    stat_unsafe_sources: "Unsafe / Needs Action",
    stat_avg_wqi: "Community Avg Score",

    // Hero Section
    hero_title: "Clean Water for Every Citizen",
    hero_desc: "Empowering communities to test, track, and protect drinking water sources using WHO and BIS standards. Instant scientific diagnosis in under 30 seconds.",
    hero_cta_test: "Start 30-Sec Water Test",
    hero_cta_explore: "Explore Community Map",

    // Dashboard sections
    sec_quick_overview: "Community Water Pulse",
    sec_recent_tests: "Recent Water Tests",
    sec_top_sources: "Most Monitored Sources",
    sec_educational_cards: "Water Science Essentials",
    btn_view_all: "View All Database",
    btn_test_source: "Test This Source",

    // Testing Form
    form_title: "Water Quality Assessment",
    form_subtitle: "Input your water physical and chemical parameters for instant scientific analysis",
    lbl_source_name: "Water Source Name",
    ph_source_name: "e.g. Chicholi Main Well, Shanti Nagar Tap 2",
    lbl_source_type: "Source Type",
    opt_select_type: "Select Source Type",
    opt_well: "Open Well (विहीर)",
    opt_borewell: "Borewell / Tube Well (बोअरवेल)",
    opt_river: "River / Stream (नदी / ओढा)",
    opt_lake: "Lake / Pond (तलाव)",
    opt_tap: "Municipal Tap Water (नळाचे पाणी)",
    opt_gov_tank: "Govt Overhead Tank (सरकारी टाकी)",
    opt_filtered: "Filtered / RO Water (शुद्ध केलेले पाणी)",
    opt_tanker: "Water Tanker (टँकरचे पाणी)",
    opt_other: "Other Source",
    
    lbl_location: "Location / Village / Area",
    ph_location: "e.g. Chicholi Village, Ward 4, Pune",
    btn_detect_gps: "Auto Detect Location (GPS)",
    btn_set_on_map: "Pick on Map",
    lbl_coordinates: "Coordinates",

    // Parameters
    lbl_tds: "TDS (Total Dissolved Solids)",
    hint_tds: "Measured in ppm or mg/L (Ideal: 50-300 ppm)",
    lbl_ph: "pH Level",
    hint_ph: "Acidity / Alkalinity scale (Ideal: 6.5 - 8.5)",
    lbl_turbidity: "Turbidity (Clarity)",
    hint_turbidity: "Measured in NTU (Ideal: < 1.0 NTU, Max: 5.0)",
    lbl_color: "Water Color / Appearance",
    opt_color_clear: "Crystal Clear (पारदर्शक / स्वच्छ)",
    opt_color_slightly_cloudy: "Slightly Cloudy (किंचित गढूळ)",
    opt_color_yellowish: "Yellowish / Rust (पिवळसर / गंज)",
    opt_color_brownish: "Brownish / Muddy (तपकिरी / मातीचे)",
    opt_color_greenish: "Greenish / Algae (हिरवे / शेवाळलेले)",
    opt_color_milky: "Milky / White (पांढरट / दुधाळ)",

    lbl_odor: "Water Odor / Smell",
    opt_odor_none: "Odorless / None (कोणताही वास नाही)",
    opt_odor_chlorine: "Chlorine / Bleach (क्लोरीन / जंतुनाशक)",
    opt_odor_earthy: "Earthy / Muddy (मातीचा वास)",
    opt_odor_sulfur: "Rotten Egg / Sulfur (सडके अंडे / सल्फर)",
    opt_odor_metallic: "Metallic / Iron (लोखंडी / धातूचा)",
    opt_odor_chemical: "Chemical / Sewage (रासायनिक / सांडपाणी)",

    lbl_test_date: "Testing Date",
    lbl_tester_name: "Tested By / Organization (Optional)",
    ph_tester_name: "e.g. Village Volunteer, Health Club",
    lbl_notes: "Additional Observations / Notes",
    ph_notes: "e.g. Tested after heavy rainfall, rust noticed in pipeline...",

    btn_analyze_now: "Analyze Water Health Now",
    btn_reset_form: "Reset Form",

    // Analysis Results Modal / Scorecard
    res_title: "Water Quality Intelligence Report",
    res_subtitle: "Comprehensive diagnosis based on WHO Guidelines & BIS 10500 Standards",
    lbl_health_score: "Water Health Score",
    lbl_quality_category: "Quality Category",
    lbl_risk_level: "Risk Level",
    lbl_drinking_suitability: "Drinking Suitability",
    
    // Categories
    cat_excellent: "Excellent",
    cat_good: "Good",
    cat_moderate: "Moderate",
    cat_poor: "Poor",
    cat_unsafe: "Unsafe / Hazardous",

    // Risk Levels
    risk_low: "Low Risk (Safe)",
    risk_medium: "Moderate Risk (Caution)",
    risk_high: "High Risk (Dangerous)",

    // Drinking Suitability Statuses
    drink_safe: "Safe for Direct Drinking",
    drink_boil_filter: "Filtration & Boiling Required",
    drink_unsafe: "Strictly Unsafe for Drinking",

    // 6-Matrix Usages
    lbl_usage_matrix: "Multi-Purpose Usage Suitability",
    usage_drinking: "Drinking & Infant Food",
    usage_cooking: "Cooking & Food Prep",
    usage_bathing: "Bathing & Personal Hygiene",
    usage_washing: "Dishwashing & Laundry",
    usage_irrigation: "Agriculture & Gardening",
    usage_livestock: "Livestock & Animal Feeding",

    status_fit: "Suitable",
    status_conditional: "With Precaution",
    status_unfit: "Not Recommended",

    // Problems & Recommendations
    lbl_detected_problems: "Detected Anomalies & Hazards",
    lbl_recommendations: "Recommended Treatment Protocols",
    lbl_health_warnings: "Health & Safety Advisories",
    lbl_final_conclusion: "Scientific Summary & Verdict",

    // Actions on Result
    btn_download_pdf: "Download Official PDF Report",
    btn_print_report: "Print Certificate",
    btn_share: "Share Assessment",
    btn_save_community: "Saved to Community Database",
    btn_view_source_profile: "View Source Historical Profile",
    btn_close: "Close",

    // Database & Profiles
    db_title: "Community Water Sources Database",
    db_subtitle: "Public repository of water tests conducted across villages, wards, and water bodies",
    filter_all_types: "All Source Types",
    filter_all_quality: "All Quality Tiers",
    btn_export_csv: "Export CSV",
    btn_export_json: "Backup JSON",
    btn_import_data: "Import Data",
    btn_reset_sample: "Load Demo Data",

    table_source_name: "Source Name",
    table_type: "Type",
    table_location: "Location",
    table_tds: "TDS",
    table_ph: "pH",
    table_turbidity: "Turbidity",
    table_score: "Health Score",
    table_tested_date: "Tested Date",
    table_actions: "Actions",

    // Source Profile View
    prof_title: "Water Source Profile & Timeline",
    prof_history_count: "Tests on Record",
    prof_avg_tds: "Avg TDS",
    prof_avg_ph: "Avg pH",
    prof_avg_score: "Avg Score",
    prof_last_tested: "Last Tested",
    prof_insights_title: "Automated Community Insights",
    prof_timeline_title: "Parameter Historical Timeline",
    btn_add_test_to_source: "Add New Test for This Source",

    // Analytics
    analytics_title: "Water Intelligence Analytics",
    analytics_subtitle: "Aggregated statistical insights, trend lines, and regional water quality monitoring",
    chart_distribution: "Water Quality Classification Breakdown",
    chart_source_types: "Average Water Health Score by Source Type",
    chart_timeline_trends: "Historical TDS & pH Fluctuations",
    chart_radar: "Parameter Standards Compliance (WHO/BIS baseline)",

    // Water Academy
    academy_title: "Water Science & Citizen Academy",
    academy_subtitle: "Interactive tools and knowledge base to protect your family's health",
    sim_title: "Interactive TDS & pH Water Simulator",
    sim_subtitle: "Drag the sliders below to see live health impacts and recommended purification methods",
    sim_tds_label: "Simulate TDS Level:",
    sim_ph_label: "Simulate pH Level:",
    sim_calculated_score: "Live Estimated Score:",
    sim_suitable_purifiers: "Required Purification Technology:",

    card_tds_title: "What is TDS?",
    card_tds_what: "Total Dissolved Solids (TDS) refers to inorganic salts (calcium, magnesium, potassium, sodium, bicarbonates, chlorides) and small amounts of organic matter dissolved in water.",
    card_tds_range: "Ideal: 50-300 ppm | Max Acceptable (BIS): 500 ppm | High Risk: >1200 ppm",
    card_tds_impact: "High TDS causes kidney stones, bitter/salty taste, scaling on pipes, and digestive issues.",

    card_ph_title: "What is pH in Water?",
    card_ph_what: "pH indicates the hydrogen ion concentration. It measures how acidic or alkaline water is on a scale of 0 to 14. 7.0 is neutral.",
    card_ph_range: "Safe Drinking Range (BIS 10500): 6.5 to 8.5",
    card_ph_impact: "Acidic water (<6.5) corrodes metal plumbing and leaches toxic lead/copper. Alkaline water (>8.5) has a slippery feel and soda taste.",

    card_standards_title: "Drinking Water Thresholds (BIS 10500 : 2012)",
    
    // Alerts & Notifications
    alert_test_saved: "Water test saved successfully to the community database!",
    alert_copied: "Link copied to clipboard!",
    alert_geo_success: "GPS coordinates detected accurately!",
    alert_geo_error: "Unable to retrieve GPS location. Please choose on the map.",
    alert_imported: "Database imported successfully!",
    alert_demo_reset: "Demo community records reloaded!",

    // Empty States
    empty_no_records: "No water tests found matching your search criteria.",
    empty_prompt: "Be the first in your community to test and record this water source!",
    btn_create_first_test: "Conduct First Test Now"
  },

  hi: {
    app_title: "एक्वा हेल्थ चेकर",
    tagline: "परीक्षण • विश्लेषण • निगरानी • सुरक्षा",
    subtitle: "नागरिकों और समुदायों के लिए वास्तविक समय जल गुणवत्ता और स्वास्थ्य आकलन मंच",

    // Navigation
    nav_dashboard: "डैशबोर्ड",
    nav_new_test: "नया परीक्षण",
    nav_map_db: "जल डेटाबेस",
    nav_analytics: "विश्लेषण व आंकड़े",
    nav_academy: "जल विद्यापीठ",
    btn_quick_test: "त्वरित जांच (<30 से.)",
    search_placeholder: "गाँव, इलाका, जल स्रोत या प्रकार खोजें...",

    // Quick Stats
    stat_total_tests: "कुल जल परीक्षण",
    stat_sources_monitored: "कुल निगरानी स्रोत",
    stat_safe_sources: "सुरक्षित जल स्रोत",
    stat_unsafe_sources: "असुरक्षित / ध्यान देने योग्य",
    stat_avg_wqi: "औसत जल गुणवत्ता स्कोर",

    // Hero Section
    hero_title: "हर नागरिक के लिए शुद्ध व सुरक्षित जल",
    hero_desc: "WHO एवं BIS मानकों के अनुसार अपने पीने के पानी की जांच करें, स्रोतों के इतिहास की निगरानी करें और 30 सेकंड में सटीक वैज्ञानिक रिपोर्ट पाएं।",
    hero_cta_test: "30-सेकंड जल परीक्षण शुरू करें",
    hero_cta_explore: "सामुदायिक मानचित्र देखें",

    // Dashboard sections
    sec_quick_overview: "सामुदायिक जल स्थिति",
    sec_recent_tests: "हाल ही में किए गए परीक्षण",
    sec_top_sources: "सर्वाधिक परीक्षित स्रोत",
    sec_educational_cards: "जल विज्ञान की मुख्य बातें",
    btn_view_all: "पूरा डेटाबेस देखें",
    btn_test_source: "इस स्रोत की जांच करें",

    // Testing Form
    form_title: "जल गुणवत्ता परीक्षण फॉर्म",
    form_subtitle: "त्वरित वैज्ञानिक विश्लेषण के लिए जल के भौतिक एवं रासायनिक मान दर्ज करें",
    lbl_source_name: "जल स्रोत का नाम",
    ph_source_name: "उदा. चिचोली मुख्य कुआँ, शांति नगर नल 2",
    lbl_source_type: "स्रोत का प्रकार",
    opt_select_type: "स्रोत का प्रकार चुनें",
    opt_well: "खुला कुआँ (Open Well)",
    opt_borewell: "बोरवेल / हैंडपंप (Borewell)",
    opt_river: "नदी / नाला (River / Stream)",
    opt_lake: "तालाब / झील (Lake / Pond)",
    opt_tap: "नगरपालिका / ग्राम नल (Tap Water)",
    opt_gov_tank: "सरकारी पानी की टंकी (Govt Tank)",
    opt_filtered: "फिल्टर / आरओ का पानी (Filtered RO)",
    opt_tanker: "पानी का टैंकर (Water Tanker)",
    opt_other: "अन्य स्रोत (Other)",

    lbl_location: "स्थान / गाँव / क्षेत्र",
    ph_location: "उदा. चिचोली गाँव, वार्ड नं. 4, पुणे",
    btn_detect_gps: "जीपीएस से स्थान प्राप्त करें (GPS)",
    btn_set_on_map: "नक्शे पर चुनें",
    lbl_coordinates: "अक्षांश व देशांतर (Coordinates)",

    // Parameters
    lbl_tds: "टीडीएस (TDS - कुल घुले हुए ठोस)",
    hint_tds: "ppm / mg/L में मापा जाता है (आदर्श: 50-300 ppm)",
    lbl_ph: "पीएच स्तर (pH Level)",
    hint_ph: "अम्लता / क्षारीयता पैमाना (आदर्श: 6.5 - 8.5)",
    lbl_turbidity: "गंदलापन (Turbidity)",
    hint_turbidity: "NTU में मापा जाता है (आदर्श: < 1.0 NTU, अधिकतम: 5.0)",
    lbl_color: "पानी का रंग / रूप",
    opt_color_clear: "एकदम पारदर्शक / साफ (Crystal Clear)",
    opt_color_slightly_cloudy: "हल्का धुंधला / गंदला (Slightly Cloudy)",
    opt_color_yellowish: "पीलापन / जंगयुक्त (Yellowish / Rust)",
    opt_color_brownish: "भूरा / मिट्टीयुक्त (Brownish / Muddy)",
    opt_color_greenish: "हरा / काईयुक्त (Greenish / Algae)",
    opt_color_milky: "सफेद / दुधिया (Milky / White)",

    lbl_odor: "पानी की गंध / वास",
    opt_odor_none: "गंधहीन / कोई गंध नहीं (Odorless)",
    opt_odor_chlorine: "क्लोरीन / ब्लीच की गंध (Chlorine)",
    opt_odor_earthy: "मिट्टी जैसी गंध (Earthy)",
    opt_odor_sulfur: "सड़े अंडे / सल्फर जैसी गंध (Sulfur)",
    opt_odor_metallic: "लोहे / धातु जैसी गंध (Metallic)",
    opt_odor_chemical: "रासायनिक / नाले जैसी बदबू (Chemical)",

    lbl_test_date: "परीक्षण की तारीख",
    lbl_tester_name: "परीक्षक का नाम / संस्था (वैकल्पिक)",
    ph_tester_name: "उदा. ग्राम स्वयंसेवक, स्वास्थ्य मित्र",
    lbl_notes: "अतिरिक्त अवलोकन / टिप्पणियाँ",
    ph_notes: "उदा. भारी बारिश के बाद परीक्षण किया गया, पाइपलाइन में जंग...",

    btn_analyze_now: "जल स्वास्थ्य का तुरंत विश्लेषण करें",
    btn_reset_form: "फॉर्म रीसेट करें",

    // Analysis Results Modal / Scorecard
    res_title: "जल गुणवत्ता विश्लेषण रिपोर्ट",
    res_subtitle: "WHO दिशानिर्देशों और BIS 10500 मानकों पर आधारित विस्तृत रिपोर्ट",
    lbl_health_score: "जल स्वास्थ्य स्कोर",
    lbl_quality_category: "गुणवत्ता श्रेणी",
    lbl_risk_level: "जोखिम स्तर",
    lbl_drinking_suitability: "पीने की उपयुक्तता",

    // Categories
    cat_excellent: "उत्कृष्ट (Excellent)",
    cat_good: "अच्छा (Good)",
    cat_moderate: "मध्यम (Moderate)",
    cat_poor: "खराब (Poor)",
    cat_unsafe: "असुरक्षित / खतरनाक (Unsafe)",

    // Risk Levels
    risk_low: "कम जोखिम (सुरक्षित)",
    risk_medium: "मध्यम जोखिम (सावधानी)",
    risk_high: "उच्च जोखिम (खतरनाक)",

    // Drinking Suitability Statuses
    drink_safe: "सीधे पीने के लिए पूर्णतः सुरक्षित",
    drink_boil_filter: "उबालना और फिल्टर करना आवश्यक",
    drink_unsafe: "पीने के लिए अत्यंत असुरक्षित",

    // 6-Matrix Usages
    lbl_usage_matrix: "विभिन्न कार्यों के लिए उपयोगिता",
    usage_drinking: "पीने व शिशु आहार हेतु",
    usage_cooking: "खाना पकाने हेतु",
    usage_bathing: "स्नान व व्यक्तिगत स्वच्छता",
    usage_washing: "बर्तन व कपड़े धोने हेतु",
    usage_irrigation: "खेती व बागवानी हेतु",
    usage_livestock: "पशुपालन व पालतू जानवरों हेतु",

    status_fit: "उपयुक्त",
    status_conditional: "सावधानी के साथ",
    status_unfit: "अनुपयुक्त",

    // Problems & Recommendations
    lbl_detected_problems: "पहचाने गए दोष व समस्याएं",
    lbl_recommendations: "अनुशंसित जल शोधन उपाय",
    lbl_health_warnings: "स्वास्थ्य व सुरक्षा चेतावनी",
    lbl_final_conclusion: "वैज्ञानिक सारांश व निष्कर्ष",

    // Actions on Result
    btn_download_pdf: "आधिकारिक PDF रिपोर्ट डाउनलोड करें",
    btn_print_report: "प्रमाणपत्र प्रिंट करें",
    btn_share: "रिपोर्ट साझा करें",
    btn_save_community: "डेटाबेस में सुरक्षित किया गया",
    btn_view_source_profile: "स्रोत का ऐतिहासिक प्रोफाइल देखें",
    btn_close: "बंद करें",

    // Database & Profiles
    db_title: "सामुदायिक जल स्रोत डेटाबेस",
    db_subtitle: "गाँवों और नगरों में किए गए जल परीक्षणों का सार्वजनिक संग्रह",
    filter_all_types: "सभी स्रोत प्रकार",
    filter_all_quality: "सभी गुणवत्ता श्रेणियां",
    btn_export_csv: "CSV एक्सपोर्ट",
    btn_export_json: "JSON बैकअप",
    btn_import_data: "डेटा इम्पोर्ट",
    btn_reset_sample: "डेमो डेटा लोड करें",

    table_source_name: "स्रोत का नाम",
    table_type: "प्रकार",
    table_location: "स्थान",
    table_tds: "TDS",
    table_ph: "pH",
    table_turbidity: "गंदलापन",
    table_score: "स्वास्थ्य स्कोर",
    table_tested_date: "तारीख",
    table_actions: "कार्रवाई",

    // Source Profile View
    prof_title: "जल स्रोत प्रोफाइल एवं समय-रेखा",
    prof_history_count: "दर्ज परीक्षण",
    prof_avg_tds: "औसत TDS",
    prof_avg_ph: "औसत pH",
    prof_avg_score: "औसत स्कोर",
    prof_last_tested: "अंतिम परीक्षण",
    prof_insights_title: "स्वचालित सामुदायिक अंतर्दृष्टि",
    prof_timeline_title: "ऐतिहासिक रुझान ग्राफ",
    btn_add_test_to_source: "इस स्रोत के लिए नया परीक्षण जोड़ें",

    // Analytics
    analytics_title: "जल गुणवत्ता विश्लेषण और रुझान",
    analytics_subtitle: "क्षेत्रीय जल गुणवत्ता और समय के साथ बदलाव के सांख्यिकीय आंकड़े",
    chart_distribution: "जल गुणवत्ता वर्गीकरण विभाजन",
    chart_source_types: "स्रोत के प्रकार अनुसार औसत स्कोर",
    chart_timeline_trends: "ऐतिहासिक TDS और pH में उतार-चढ़ाव",
    chart_radar: "मानकों के अनुरूप पैरामीटर अनुपालन",

    // Water Academy
    academy_title: "जल विज्ञान एवं नागरिक विद्यापीठ",
    academy_subtitle: "अपने परिवार के स्वास्थ्य की रक्षा के लिए इंटरैक्टिव उपकरण और ज्ञान",
    sim_title: "इंटरैक्टिव TDS और pH सिम्युलेटर",
    sim_subtitle: "स्वास्थ्य प्रभाव और उपयुक्त फिल्टर देखने के लिए स्लाइडर को आगे-पीछे करें",
    sim_tds_label: "TDS स्तर बदलें:",
    sim_ph_label: "pH स्तर बदलें:",
    sim_calculated_score: "अनुमानित जल स्कोर:",
    sim_suitable_purifiers: "आवश्यक शोधन तकनीक:",

    card_tds_title: "TDS क्या है?",
    card_tds_what: "टीडीएस (Total Dissolved Solids) पानी में घुले हुए अकार्बनिक लवणों (कैल्शियम, मैग्नीशियम, सोडियम आदि) और कार्बनिक पदार्थों की कुल मात्रा है।",
    card_tds_range: "आदर्श: 50-300 ppm | अधिकतम स्वीकार्य (BIS): 500 ppm | अत्यधिक: >1200 ppm",
    card_tds_impact: "अधिक टीडीएस से गुर्दे की पथरी, कड़वा स्वाद, पाइपों में पपड़ी और पेट की बीमारियां हो सकती हैं।",

    card_ph_title: "पानी में pH का क्या महत्व है?",
    card_ph_what: "पीएच पानी की अम्लीयता या क्षारीयता को 0 से 14 के पैमाने पर मापता है। 7.0 मान उदासीन (तटस्थ) होता है।",
    card_ph_range: "सुरक्षित पीने की सीमा (BIS 10500): 6.5 से 8.5",
    card_ph_impact: "अम्लीय पानी (<6.5) पाइपों को गलाकर जहरीला सीसा/तांबा घोलता है। क्षारीय पानी (>8.5) चिकना और कड़वा लगता है।",

    card_standards_title: "पीने के पानी के मानक (BIS 10500 : 2012)",

    // Alerts & Notifications
    alert_test_saved: "जल परीक्षण सामुदायिक डेटाबेस में सफलतापूर्वक सहेजा गया!",
    alert_copied: "लिंक क्लिपबोर्ड पर कॉपी हो गया!",
    alert_geo_success: "जीपीएस से सटीक स्थान प्राप्त हुआ!",
    alert_geo_error: "स्थान प्राप्त नहीं हो सका। कृपया मानचित्र पर चुनें।",
    alert_imported: "डेटाबेस सफलतापूर्वक इम्पोर्ट किया गया!",
    alert_demo_reset: "डेमो रिकॉर्ड्स पुनः लोड कर दिए गए!",

    // Empty States
    empty_no_records: "कोई रिकॉर्ड नहीं मिला।",
    empty_prompt: "अपने क्षेत्र के इस जल स्रोत का परीक्षण करने वाले पहले व्यक्ति बनें!",
    btn_create_first_test: "पहला परीक्षण शुरू करें"
  },

  mr: {
    app_title: "अ‍ॅक्वा हेल्थ चेकर",
    tagline: "चाचणी • विश्लेषण • देखरेख • संरक्षण",
    subtitle: "नागरिक व गावांसाठी रिअल-टाइम पाणी गुणवत्ता आणि आरोग्य तपासणी व्यासपीठ",

    // Navigation
    nav_dashboard: "डॅशबोर्ड",
    nav_new_test: "नवीन चाचणी",
    nav_map_db: "पाणी डेटाबेस",
    nav_analytics: "आकडेवारी व विश्लेषण",
    nav_academy: "पाणी ज्ञानपीठ",
    btn_quick_test: "जलद चाचणी (<30 सेकंद)",
    search_placeholder: "गाव, परिसर, पाण्याचा स्रोत किंवा प्रकार शोधा...",

    // Quick Stats
    stat_total_tests: "एकूण पाणी चाचण्या",
    stat_sources_monitored: "निरीक्षणाखालील स्रोत",
    stat_safe_sources: "सुरक्षित पाण्याचे स्रोत",
    stat_unsafe_sources: "असुरक्षित / लक्ष देण्याजोगे",
    stat_avg_wqi: "सरासरी पाणी गुणवत्ता स्कोर",

    // Hero Section
    hero_title: "प्रत्येक नागरिकासाठी स्वच्छ व सुरक्षित पाणी",
    hero_desc: "WHO आणि BIS मानकांनुसार आपल्या पिण्याच्या पाण्याची तपासणी करा, स्त्रोतांचा इतिहास ट्रॅक करा आणि ३० सेकंदात अचूक वैज्ञानिक अहवाल मिळवा.",
    hero_cta_test: "३० सेकंदात पाणी चाचणी करा",
    hero_cta_explore: "सामुदायिक नकाशा पहा",

    // Dashboard sections
    sec_quick_overview: "गावातील पाण्याची सद्यस्थिती",
    sec_recent_tests: "नुकत्याच झालेल्या चाचण्या",
    sec_top_sources: "सर्वाधिक तपासलेले स्रोत",
    sec_educational_cards: "पाणी विज्ञानाची मूलतत्वे",
    btn_view_all: "संपूर्ण डेटाबेस पहा",
    btn_test_source: "या स्रोताची चाचणी करा",

    // Testing Form
    form_title: "पाणी गुणवत्ता तपासणी फॉर्म",
    form_subtitle: "त्वरित वैज्ञानिक विश्लेषणासाठी पाण्याचे भौतिक व रासायनिक घटक नोंदवा",
    lbl_source_name: "पाण्याच्या स्रोताचे नाव",
    ph_source_name: "उदा. चिंचोली मुख्य विहीर, शांती नगर नळ २",
    lbl_source_type: "स्रोताचा प्रकार",
    opt_select_type: "स्रोताचा प्रकार निवडा",
    opt_well: "उघडी विहीर (Well)",
    opt_borewell: "बोअरवेल / कूपनलिका (Borewell)",
    opt_river: "नदी / ओढा (River / Stream)",
    opt_lake: "तलाव / पाझर तलाव (Lake / Pond)",
    opt_tap: "ग्रामपंचायत / पालिकेचा नळ (Tap Water)",
    opt_gov_tank: "शासकीय पाण्याची टाकी (Govt Tank)",
    opt_filtered: "शुद्ध केलेले / आरओ चे पाणी (Filtered RO)",
    opt_tanker: "पाण्याचा टँकर (Water Tanker)",
    opt_other: "इतर स्रोत (Other)",

    lbl_location: "स्थान / गाव / परिसर",
    ph_location: "उदा. चिंचोली गाव, प्रभाग ४, पुणे",
    btn_detect_gps: "जीपीएस द्वारे स्थान मिळवा (GPS)",
    btn_set_on_map: "नकाशावर निवडा",
    lbl_coordinates: "अक्षांश व रेखांश (Coordinates)",

    // Parameters
    lbl_tds: "टीडीएस (TDS - विरघळलेले एकूण घटक)",
    hint_tds: "ppm किंवा mg/L मध्ये मोजले जाते (योग्य: 50-300 ppm)",
    lbl_ph: "पीएच पातळी (pH Level)",
    hint_ph: "आम्लता / क्षारता प्रमाण (योग्य: 6.5 - 8.5)",
    lbl_turbidity: "गढूळपणा (Turbidity)",
    hint_turbidity: "NTU मध्ये मोजले जाते (योग्य: < 1.0 NTU, कमाल: 5.0)",
    lbl_color: "पाण्याचा रंग / स्वरूप",
    opt_color_clear: "एकदम स्वच्छ / पारदर्शक (Crystal Clear)",
    opt_color_slightly_cloudy: "किंचित गढूळ (Slightly Cloudy)",
    opt_color_yellowish: "पिवळसर / गंजयुक्त (Yellowish / Rust)",
    opt_color_brownish: "तपकिरी / मातीचे (Brownish / Muddy)",
    opt_color_greenish: "हिरवट / शेवाळलेले (Greenish / Algae)",
    opt_color_milky: "पांढरट / दुधाळ (Milky / White)",

    lbl_odor: "पाण्याचा वास / दुर्गंधी",
    opt_odor_none: "कोणताही वास नाही (Odorless)",
    opt_odor_chlorine: "क्लोरीन / ब्लिचिंग पावडरचा वास (Chlorine)",
    opt_odor_earthy: "मातीचा वास (Earthy)",
    opt_odor_sulfur: "सडक्या अंड्यासारखा / गंधकाचा वास (Sulfur)",
    opt_odor_metallic: "गंजलेला / लोखंडी वास (Metallic)",
    opt_odor_chemical: "रासायनिक / गटाराची दुर्गंधी (Chemical)",

    lbl_test_date: "तपासणीची तारीख",
    lbl_tester_name: "तपासणी करणाऱ्याचे नाव / संस्था (ऐच्छिक)",
    ph_tester_name: "उदा. ग्रामसेवक, पाणी मित्र, आरोग्य मंडळ",
    lbl_notes: "अतिरिक्त निरीक्षणे / नोंदी",
    ph_notes: "उदा. मुसळधार पावसानंतर चाचणी केली, पाईपमध्ये गंज...",

    btn_analyze_now: "पाण्याच्या आरोग्याचे त्वरित विश्लेषण करा",
    btn_reset_form: "फॉर्म रीसेट करा",

    // Analysis Results Modal / Scorecard
    res_title: "पाणी गुणवत्ता विश्लेषण अहवाल",
    res_subtitle: "WHO आणि BIS 10500 मानकांवर आधारित सविस्तर वैज्ञानिक अहवाल",
    lbl_health_score: "पाणी आरोग्य स्कोर",
    lbl_quality_category: "गुणवत्ता श्रेणी",
    lbl_risk_level: "धोका पातळी",
    lbl_drinking_suitability: "पिण्यासाठी योग्यता",

    // Categories
    cat_excellent: "उत्कृष्ट (Excellent)",
    cat_good: "चांगले (Good)",
    cat_moderate: "मध्यम (Moderate)",
    cat_poor: "खराब (Poor)",
    cat_unsafe: "असुरक्षित / घातक (Unsafe)",

    // Risk Levels
    risk_low: "कमी धोका (सुरक्षित)",
    risk_medium: "मध्यम धोका (काळजी घ्या)",
    risk_high: "उच्च धोका (धोकादायक)",

    // Drinking Suitability Statuses
    drink_safe: "थेट पिण्यासाठी सुरक्षित",
    drink_boil_filter: "उकळून व फिल्टर करूनच वापरा",
    drink_unsafe: "पिण्यासाठी अत्यंत अयोग्य व घातक",

    // 6-Matrix Usages
    lbl_usage_matrix: "विविध वापरांसाठी पाण्याची योग्यता",
    usage_drinking: "पिण्यासाठी व लहान मुलांसाठी",
    usage_cooking: "स्वयंपाकासाठी",
    usage_bathing: "अंघोळ व वैयक्तिक स्वच्छता",
    usage_washing: "भांडी व कपडे धुण्यासाठी",
    usage_irrigation: "शेती व बागायतीसाठी",
    usage_livestock: "जनावरांना पिण्यासाठी",

    status_fit: "योग्य",
    status_conditional: "काळजीपूर्वक वापरा",
    status_unfit: "अयोग्य",

    // Problems & Recommendations
    lbl_detected_problems: "आढळून आलेले दोष व धोके",
    lbl_recommendations: "पाणी शुद्धीकरणाचे उपाय",
    lbl_health_warnings: "आरोग्य व सुरक्षेचा इशारा",
    lbl_final_conclusion: "वैज्ञानिक सारांश व निष्कर्ष",

    // Actions on Result
    btn_download_pdf: "अधिकृत PDF अहवाल डाउनलोड करा",
    btn_print_report: "प्रमाणपत्र प्रिंट करा",
    btn_share: "अहवाल शेअर करा",
    btn_save_community: "डेटाबेसमध्ये जतन केले गेले",
    btn_view_source_profile: "स्रोताचा इतिहास पहा",
    btn_close: "बंद करा",

    // Database & Profiles
    db_title: "सामुदायिक पाणी स्रोत डेटाबेस",
    db_subtitle: "गाव व शहरातील पाणी चाचण्यांचा सार्वजनिक संग्रह",
    filter_all_types: "सर्व पाण्याचे प्रकार",
    filter_all_quality: "सर्व गुणवत्ता श्रेणी",
    btn_export_csv: "CSV एक्सपोर्ट",
    btn_export_json: "JSON बॅकअप",
    btn_import_data: "डेटा इम्पोर्ट",
    btn_reset_sample: "डेमो डेटा लोड करा",

    table_source_name: "स्रोताचे नाव",
    table_type: "प्रकार",
    table_location: "स्थान",
    table_tds: "TDS",
    table_ph: "pH",
    table_turbidity: "गढूळपणा",
    table_score: "आरोग्य स्कोर",
    table_tested_date: "तारीख",
    table_actions: "क्रिया",

    // Source Profile View
    prof_title: "पाणी स्रोत प्रोफाइल आणि इतिहास",
    prof_history_count: "एकूण चाचण्या",
    prof_avg_tds: "सरासरी TDS",
    prof_avg_ph: "सरासरी pH",
    prof_avg_score: "सरासरी स्कोर",
    prof_last_tested: "शेवटची चाचणी",
    prof_insights_title: "स्वयंचलित सामुदायिक विश्लेषण",
    prof_timeline_title: "इतिहास आलेख",
    btn_add_test_to_source: "या स्रोताची नवीन चाचणी जोडा",

    // Analytics
    analytics_title: "पाणी गुणवत्ता आकडेवारी व कल",
    analytics_subtitle: "परिसरातील पाणी गुणवत्तेचे तुलनात्मक विश्लेषण",
    chart_distribution: "पाणी गुणवत्ता वर्गीकरण विभागणी",
    chart_source_types: "स्रोतानुसार सरासरी पाणी स्कोर",
    chart_timeline_trends: "ऐतिहासिक TDS व pH बदल",
    chart_radar: "मानकांनुसार घटकांची पूर्तता",

    // Water Academy
    academy_title: "पाणी विज्ञान आणि नागरिक ज्ञानपीठ",
    academy_subtitle: "कुटुंबाच्या आरोग्यासाठी माहिती व परस्परसंवादी साधने",
    sim_title: "इंटरॅक्टिव्ह TDS आणि pH सिम्युलेटर",
    sim_subtitle: "आरोग्यावरील परिणाम आणि योग्य फिल्टर समजून घेण्यासाठी स्लाइडर फिरवा",
    sim_tds_label: "TDS पातळी बदला:",
    sim_ph_label: "pH पातळी बदला:",
    sim_calculated_score: "अंदाजित पाणी स्कोर:",
    sim_suitable_purifiers: "आवश्यक शुद्धीकरण तंत्रज्ञान:",

    card_tds_title: "TDS म्हणजे काय?",
    card_tds_what: "टीडीएस (Total Dissolved Solids) म्हणजे पाण्यात विरघळलेले एकूण घन पदार्थ (क्षार, खनिजे आणि सेंद्रिय घटक) होय.",
    card_tds_range: "योग्य: 50-300 ppm | कमाल स्वीकार्य (BIS): 500 ppm | घातक: >1200 ppm",
    card_tds_impact: "जास्त टीडीएसमुळे मूतखडा, कडू चव, पाईप्स खराब होणे आणि पोटाचे आजार उद्भवतात.",

    card_ph_title: "पाण्यातील pH चे महत्त्व काय?",
    card_ph_what: "पीएच हे पाण्याचे आम्लधर्मी किंवा क्षारधर्मी प्रमाण ० ते १४ च्या स्केलवर दर्शवते. ७.० हे तटस्थ मानले जाते.",
    card_ph_range: "पिण्यासाठी सुरक्षित प्रमाण (BIS 10500): 6.5 ते 8.5",
    card_ph_impact: "आम्लधर्मी पाणी (<6.5) पाईप खराब करून विषारी धातू विरघळवते. क्षारधर्मी पाणी (>8.5) चवीला तुरट लागते.",

    card_standards_title: "पिण्याच्या पाण्याचे मानके (BIS 10500 : 2012)",

    // Alerts & Notifications
    alert_test_saved: "पाणी चाचणी डेटाबेसमध्ये यशस्वीरित्या जतन केली गेली!",
    alert_copied: "लिंक क्लिपबोर्डवर कॉपी झाली!",
    alert_geo_success: "जीपीएस स्थान अचूक प्राप्त झाले!",
    alert_geo_error: "जीपीएस स्थान मिळू शकले नाही. कृपया नकाशावर निवडा.",
    alert_imported: "डेटाबेस यशस्वीरित्या इम्पोर्ट झाला!",
    alert_demo_reset: "डेमो नोंदी पुन्हा लोड केल्या गेल्या!",

    // Empty States
    empty_no_records: "कोणतीही नोंद सापडली नाही.",
    empty_prompt: "आपल्या परिसरातील या पाण्याचा स्रोत तपासणारे पहिले नागरिक बना!",
    btn_create_first_test: "पहिली चाचणी सुरू करा"
  }
};

/**
 * i18n Controller helper
 */
class I18nManager {
  constructor() {
    this.currentLang = localStorage.getItem('aqua_lang') || 'en';
  }

  setLanguage(lang) {
    if (translations[lang]) {
      this.currentLang = lang;
      localStorage.setItem('aqua_lang', lang);
      this.applyTranslations();
      document.documentElement.lang = lang;
      
      // Dispatch custom event so charts and UI components re-render
      window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
    }
  }

  getLanguage() {
    return this.currentLang;
  }

  t(key) {
    const dict = translations[this.currentLang] || translations.en;
    return dict[key] || translations.en[key] || key;
  }

  applyTranslations() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = this.t(key);
      if (translation) {
        if (el.tagName === 'INPUT' && (el.type === 'text' || el.type === 'search')) {
          el.placeholder = translation;
        } else if (el.hasAttribute('placeholder')) {
          el.placeholder = translation;
        } else {
          el.innerHTML = translation;
        }
      }
    });

    // Update active state in language selector UI
    const buttons = document.querySelectorAll('.lang-btn');
    buttons.forEach(btn => {
      const lang = btn.getAttribute('data-lang');
      if (lang === this.currentLang) {
        btn.classList.add('bg-cyan-500', 'text-white', 'shadow-sm');
        btn.classList.remove('text-slate-600', 'dark:text-slate-300', 'hover:bg-slate-100', 'dark:hover:bg-slate-800');
      } else {
        btn.classList.remove('bg-cyan-500', 'text-white', 'shadow-sm');
        btn.classList.add('text-slate-600', 'dark:text-slate-300', 'hover:bg-slate-100', 'dark:hover:bg-slate-800');
      }
    });
  }
}

// Global instance
window.i18n = new I18nManager();
