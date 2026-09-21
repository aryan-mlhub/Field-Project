/**
 * Aqua Health Checker - Leaflet.js Map Controller
 */

class AquaMapController {
  constructor() {
    this.communityMap = null;
    this.pickerMap = null;
    this.pickerMarker = null;
    this.markersGroup = null;
    this.defaultCenter = [18.6298, 73.7997]; // Default Maharashtra / Pune region
    this.defaultZoom = 11;
  }

  /**
   * Initialize Community Overview Map
   */
  initCommunityMap(containerId = 'community-map') {
    const el = document.getElementById(containerId);
    if (!el) return;

    if (this.communityMap) {
      this.communityMap.remove();
    }

    this.communityMap = L.map(containerId, {
      zoomControl: true,
      attributionControl: false
    }).setView(this.defaultCenter, this.defaultZoom);

    // OpenStreetMap Clean CartoDB Positron / OSM tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd'
    }).addTo(this.communityMap);

    this.markersGroup = L.featureGroup().addTo(this.communityMap);
    this.renderCommunityMarkers();
  }

  /**
   * Render markers for all distinct water sources
   */
  renderCommunityMarkers() {
    if (!this.communityMap || !this.markersGroup) return;
    this.markersGroup.clearLayers();

    const sources = window.waterStorage ? window.waterStorage.getSources() : [];
    if (sources.length === 0) return;

    const bounds = [];

    sources.forEach(src => {
      const lat = parseFloat(src.lat) || this.defaultCenter[0];
      const lng = parseFloat(src.lng) || this.defaultCenter[1];
      bounds.push([lat, lng]);

      const score = src.avgScore || 50;
      let colorClass = 'bg-rose-500 shadow-rose-500/50';
      let ringColor = '#ef4444';

      if (score >= 75) {
        colorClass = 'bg-emerald-500 shadow-emerald-500/50';
        ringColor = '#10b981';
      } else if (score >= 50) {
        colorClass = 'bg-amber-500 shadow-amber-500/50';
        ringColor = '#f59e0b';
      }

      // Custom HTML Pin with pulsing effect
      const customIcon = L.divIcon({
        className: 'custom-map-pin',
        html: `
          <div class="relative flex items-center justify-center w-8 h-8">
            <span class="map-marker-pulse" style="background-color: ${ringColor}; opacity: 0.3;"></span>
            <div class="w-6 h-6 rounded-full text-white font-bold text-xs flex items-center justify-center shadow-lg ${colorClass} border-2 border-white dark:border-slate-900">
              ${score}
            </div>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -18]
      });

      const marker = L.marker([lat, lng], { icon: customIcon });

      const popupContent = `
        <div class="p-2 min-w-[200px] text-slate-800 dark:text-slate-100">
          <div class="flex items-center justify-between mb-1">
            <span class="text-xs uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${score >= 70 ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300' : (score >= 50 ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300' : 'bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300')}">
              ${score >= 70 ? 'Safe' : (score >= 50 ? 'Moderate' : 'Unsafe')} (${score}/100)
            </span>
            <span class="text-[11px] text-slate-400">${src.testCount} tests</span>
          </div>
          <h4 class="font-bold text-sm text-slate-900 dark:text-white mt-1 leading-snug">${src.name}</h4>
          <p class="text-xs text-slate-500 dark:text-slate-400 mb-2 truncate">${src.location}</p>
          
          <div class="grid grid-cols-2 gap-1 text-[11px] bg-slate-50 dark:bg-slate-800/60 p-1.5 rounded-lg mb-2">
            <div><span class="text-slate-400">Avg TDS:</span> <strong>${src.avgTds} ppm</strong></div>
            <div><span class="text-slate-400">Avg pH:</span> <strong>${src.avgPh}</strong></div>
          </div>

          <button onclick="window.app.openSourceProfile('${src.name.replace(/'/g, "\\'")}')" class="w-full text-center text-xs font-semibold py-1.5 px-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white transition-colors shadow-sm">
            View Source Profile & History
          </button>
        </div>
      `;

      marker.bindPopup(popupContent);
      this.markersGroup.addLayer(marker);
    });

    if (bounds.length > 0) {
      this.communityMap.fitBounds(bounds, { padding: [40, 40], maxZoom: 13 });
    }
  }

  /**
   * Initialize Draggable Location Picker Map in Modal
   */
  initPickerMap(containerId = 'picker-map', initialLat = 18.6298, initialLng = 73.7997) {
    const el = document.getElementById(containerId);
    if (!el) return;

    if (this.pickerMap) {
      this.pickerMap.remove();
    }

    this.pickerMap = L.map(containerId, {
      zoomControl: true,
      attributionControl: false
    }).setView([initialLat, initialLng], 14);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd'
    }).addTo(this.pickerMap);

    const pinIcon = L.divIcon({
      className: 'picker-pin',
      html: `
        <div class="relative flex items-center justify-center">
          <span class="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-cyan-400 opacity-75"></span>
          <div class="w-8 h-8 rounded-full bg-cyan-600 text-white flex items-center justify-center shadow-2xl border-2 border-white">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          </div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });

    this.pickerMarker = L.marker([initialLat, initialLng], {
      draggable: true,
      icon: pinIcon
    }).addTo(this.pickerMap);

    // Update coordinates when marker is dragged
    this.pickerMarker.on('dragend', (e) => {
      const pos = e.target.getLatLng();
      this.updatePickerFields(pos.lat, pos.lng);
      this.reverseGeocode(pos.lat, pos.lng);
    });

    // Move marker when map is clicked
    this.pickerMap.on('click', (e) => {
      this.pickerMarker.setLatLng(e.latlng);
      this.updatePickerFields(e.latlng.lat, e.latlng.lng);
      this.reverseGeocode(e.latlng.lat, e.latlng.lng);
    });

    this.updatePickerFields(initialLat, initialLng);
  }

  updatePickerFields(lat, lng) {
    const latInput = document.getElementById('input-lat');
    const lngInput = document.getElementById('input-lng');
    const coordsDisplay = document.getElementById('display-coords');

    if (latInput) latInput.value = lat.toFixed(5);
    if (lngInput) lngInput.value = lng.toFixed(5);
    if (coordsDisplay) coordsDisplay.innerText = `${lat.toFixed(4)}° N, ${lng.toFixed(4)}° E`;
  }

  /**
   * Browser Geolocation API Trigger
   */
  detectUserLocation(callback) {
    if (!navigator.geolocation) {
      if (window.app) window.app.showToast('Geolocation is not supported by your browser', 'error');
      return;
    }

    if (window.app) window.app.showToast('Fetching GPS coordinates...', 'info');

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        if (this.pickerMap && this.pickerMarker) {
          this.pickerMap.setView([lat, lng], 15);
          this.pickerMarker.setLatLng([lat, lng]);
          this.updatePickerFields(lat, lng);
          this.reverseGeocode(lat, lng);
        }

        if (window.app) window.app.showToast(window.i18n ? window.i18n.t('alert_geo_success') : 'Location detected!', 'success');
        if (callback) callback(lat, lng);
      },
      (err) => {
        console.warn("Geolocation error:", err.message);
        if (window.app) window.app.showToast(window.i18n ? window.i18n.t('alert_geo_error') : 'Unable to retrieve location.', 'warning');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  }

  /**
   * Reverse Geocoding with fallback
   */
  async reverseGeocode(lat, lng) {
    const locInput = document.getElementById('input-location');
    if (!locInput) return;

    try {
      const resp = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=14&addressdetails=1`, {
        headers: { 'Accept-Language': 'en' }
      });
      if (resp.ok) {
        const data = await resp.json();
        if (data && data.display_name) {
          // Format concise location (e.g. Village/Subdistrict, District, State)
          const addr = data.address || {};
          const locality = addr.village || addr.suburb || addr.neighbourhood || addr.town || addr.city || '';
          const district = addr.county || addr.state_district || addr.city || '';
          const state = addr.state || '';
          const concise = [locality, district, state].filter(Boolean).join(', ');
          
          locInput.value = concise || data.display_name.split(',').slice(0, 3).join(',');
        }
      }
    } catch (e) {
      console.warn("Reverse geocode request failed, user can enter manually:", e);
    }
  }

  invalidateSizes() {
    if (this.communityMap) {
      setTimeout(() => this.communityMap.invalidateSize(), 200);
    }
    if (this.pickerMap) {
      setTimeout(() => this.pickerMap.invalidateSize(), 200);
    }
  }
}

// Global instance
window.aquaMap = new AquaMapController();
