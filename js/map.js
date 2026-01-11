// Map view component with Google Maps integration
const MapView = (function() {
    'use strict';

    let map = null;
    let markers = [];
    let clusterMarkers = [];
    let boundaryPolygon = null;
    let currentYear = 'FY26';
    let currentZoom = 14;

    // Zoom thresholds
    const ZOOM_INDIVIDUAL = 14;
    const ZOOM_CLUSTER = 12;

    // Initialize map when Google Maps API is loaded
    async function init() {
        // Wait for SchoolData to be ready
        if (typeof SchoolData === 'undefined') {
            console.error('School data not loaded');
            return;
        }

        // Create map centered on Decatur
        const mapElement = document.getElementById('map');
        if (!mapElement) {
            console.error('Map element not found');
            return;
        }

        map = new google.maps.Map(mapElement, {
            center: { lat: 33.7748, lng: -84.2963 },
            zoom: 14,
            mapTypeControl: true,
            streetViewControl: false,
            fullscreenControl: true
        });

        // Wait for data to load before adding boundary and markers
        console.log('Map waiting for school data...');
        await SchoolData.loadData();

        // Add city boundary
        addCityBoundary();

        // Add zoom change listener
        map.addListener('zoom_changed', () => {
            currentZoom = map.getZoom();
            updateMarkers(currentYear);
        });

        // Initial markers
        updateMarkers(currentYear);

        console.log('Google Maps initialized');
    }

    // Add city boundary polygon
    function addCityBoundary() {
        const boundary = SchoolData.getCityBoundary();
        if (!boundary) {
            console.warn('City boundary data not available');
            return;
        }

        // Convert boundary coordinates to Google Maps format
        const coordinates = boundary.coordinates[0].map(coord => ({
            lat: coord[1],
            lng: coord[0]
        }));

        boundaryPolygon = new google.maps.Polygon({
            paths: coordinates,
            strokeColor: '#003366',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#003366',
            fillOpacity: 0.1
        });

        boundaryPolygon.setMap(map);
    }

    // Update map with data for specific year
    function update(year) {
        currentYear = year;
        updateMarkers(year);
    }

    // Update markers based on current zoom level
    function updateMarkers(year) {
        // Clear existing markers
        clearMarkers();

        if (currentZoom >= ZOOM_INDIVIDUAL) {
            // Show individual school markers
            showIndividualMarkers(year);
        } else if (currentZoom >= ZOOM_CLUSTER) {
            // Show clustered markers
            showClusteredMarkers(year);
        } else {
            // Show district-wide marker
            showDistrictMarker(year);
        }
    }

    // Clear all markers from map
    function clearMarkers() {
        markers.forEach(marker => marker.setMap(null));
        clusterMarkers.forEach(marker => marker.setMap(null));
        markers = [];
        clusterMarkers = [];
    }

    // Show individual school markers
    function showIndividualMarkers(year) {
        const schools = SchoolData.getSchoolsByYear(year);

        schools.forEach(school => {
            if (!school.lat || !school.lng) return;

            const utilization = SchoolData.calculateUtilization(school.enrollment, school.capacity);
            const markerColor = getMarkerColor(utilization);
            const utilizationText = utilization !== null ? utilization + '%' : 'N/A';

            const marker = new google.maps.Marker({
                position: { lat: school.lat, lng: school.lng },
                map: map,
                title: school.name,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 18,
                    fillColor: markerColor,
                    fillOpacity: 0.9,
                    strokeColor: '#ffffff',
                    strokeWeight: 2
                },
                label: {
                    text: utilizationText,
                    color: '#ffffff',
                    fontSize: '11px',
                    fontWeight: 'bold'
                }
            });

            // Create info window
            const infoWindow = new google.maps.InfoWindow({
                content: createInfoWindowContent(school.name, school.enrollment, school.capacity, utilization)
            });

            marker.addListener('click', () => {
                // Close all other info windows
                markers.forEach(m => {
                    if (m.infoWindow) m.infoWindow.close();
                });
                infoWindow.open(map, marker);
            });

            marker.infoWindow = infoWindow;
            markers.push(marker);
        });
    }

    // Show clustered markers by geographic area
    function showClusteredMarkers(year) {
        const clusters = SchoolData.getClusters();
        const allSchools = SchoolData.getAllSchools();

        Object.keys(clusters).forEach(clusterId => {
            const cluster = clusters[clusterId];
            const clusterSchools = allSchools.filter(s =>
                cluster.schools.includes(s.id)
            );

            // Calculate cluster centroid
            let totalLat = 0, totalLng = 0, count = 0;
            let totalEnrollment = 0, totalCapacity = 0;

            clusterSchools.forEach(school => {
                const enrollment = school.enrollment[year];

                // Only include schools that have enrollment data for this year
                if (enrollment) {
                    if (school.lat && school.lng) {
                        totalLat += school.lat;
                        totalLng += school.lng;
                        count++;
                    }
                    totalEnrollment += enrollment;
                    if (school.capacity) totalCapacity += school.capacity;
                }
            });

            if (count === 0) return;

            const centerLat = totalLat / count;
            const centerLng = totalLng / count;
            const utilization = SchoolData.calculateUtilization(totalEnrollment, totalCapacity);
            const markerColor = getMarkerColor(utilization);
            const utilizationText = utilization !== null ? utilization + '%' : 'N/A';

            const marker = new google.maps.Marker({
                position: { lat: centerLat, lng: centerLng },
                map: map,
                title: cluster.name,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 22,
                    fillColor: markerColor,
                    fillOpacity: 0.9,
                    strokeColor: '#ffffff',
                    strokeWeight: 2
                },
                label: {
                    text: utilizationText,
                    color: '#ffffff',
                    fontSize: '12px',
                    fontWeight: 'bold'
                }
            });

            const infoWindow = new google.maps.InfoWindow({
                content: createInfoWindowContent(cluster.name, totalEnrollment, totalCapacity, utilization)
            });

            marker.addListener('click', () => {
                clusterMarkers.forEach(m => {
                    if (m.infoWindow) m.infoWindow.close();
                });
                infoWindow.open(map, marker);
            });

            marker.infoWindow = infoWindow;
            clusterMarkers.push(marker);
        });
    }

    // Show district-wide marker
    function showDistrictMarker(year) {
        const totals = SchoolData.getAggregatedData(year);
        const markerColor = getMarkerColor(totals.utilization);
        const utilizationText = totals.utilization !== null ? totals.utilization + '%' : 'N/A';

        const marker = new google.maps.Marker({
            position: { lat: 33.7748, lng: -84.2963 },
            map: map,
            title: 'City Schools of Decatur - District Total',
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 26,
                fillColor: markerColor,
                fillOpacity: 0.9,
                strokeColor: '#ffffff',
                strokeWeight: 3
            },
            label: {
                text: utilizationText,
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: 'bold'
            }
        });

        const infoWindow = new google.maps.InfoWindow({
            content: createInfoWindowContent(
                'District Total',
                totals.totalEnrollment,
                totals.totalCapacity,
                totals.utilization
            )
        });

        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });

        marker.infoWindow = infoWindow;
        clusterMarkers.push(marker);
    }

    // Get marker color based on utilization
    function getMarkerColor(utilization) {
        if (utilization === null) return '#999999';
        if (utilization < 85) return '#28a745';
        if (utilization <= 100) return '#ffc107';
        return '#dc3545';
    }

    // Create info window content
    function createInfoWindowContent(name, enrollment, capacity, utilization) {
        const utilizationClass = getUtilizationClass(utilization);
        const utilizationText = utilization !== null ? utilization + '%' : 'N/A';

        return `
            <div style="padding: 8px; min-width: 200px;">
                <h4 style="margin: 0 0 8px 0; color: #003366;">${name}</h4>
                <table style="width: 100%; font-size: 14px;">
                    <tr>
                        <td><strong>Enrollment:</strong></td>
                        <td style="text-align: right;">${enrollment}</td>
                    </tr>
                    <tr>
                        <td><strong>Capacity:</strong></td>
                        <td style="text-align: right;">${capacity}</td>
                    </tr>
                    <tr>
                        <td><strong>Utilization:</strong></td>
                        <td style="text-align: right; color: ${getUtilizationColor(utilization)}; font-weight: bold;">
                            ${utilizationText}
                        </td>
                    </tr>
                </table>
            </div>
        `;
    }

    // Get utilization class
    function getUtilizationClass(utilization) {
        if (utilization === null) return '';
        if (utilization < 85) return 'utilization-low';
        if (utilization <= 100) return 'utilization-medium';
        return 'utilization-high';
    }

    // Get utilization color
    function getUtilizationColor(utilization) {
        if (utilization === null) return '#999999';
        if (utilization < 85) return '#28a745';
        if (utilization <= 100) return '#ffc107';
        return '#dc3545';
    }

    // Public API
    return {
        init,
        update
    };
})();

// Global callback for Google Maps API
function initMap() {
    MapView.init();
}
