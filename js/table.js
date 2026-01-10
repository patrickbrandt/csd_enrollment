// Table view component
const TableView = (function() {
    'use strict';

    let container = null;

    // Initialize table
    function init() {
        container = document.getElementById('table-container');
        if (!container) {
            console.error('Table container not found');
            return;
        }
    }

    // Update table with data for specific year
    function update(year) {
        if (!container) return;

        const schools = SchoolData.getSchoolsByYear(year);
        const totals = SchoolData.getAggregatedData(year);

        // Sort schools alphabetically
        schools.sort((a, b) => a.name.localeCompare(b.name));

        // Build table HTML
        let html = '<table><thead><tr>';
        html += '<th>School</th>';
        html += '<th>Enrollment</th>';
        html += '<th>Capacity</th>';
        html += '<th>Utilization</th>';
        html += '</tr></thead><tbody>';

        // Add school rows
        schools.forEach(school => {
            const utilization = SchoolData.calculateUtilization(school.enrollment, school.capacity);
            const utilizationClass = getUtilizationClass(utilization);

            html += '<tr>';
            html += `<td>${school.name}</td>`;
            html += `<td>${school.enrollment}</td>`;
            html += `<td>${school.capacity}</td>`;
            html += `<td class="${utilizationClass}">${utilization !== null ? utilization + '%' : 'N/A'}</td>`;
            html += '</tr>';
        });

        // Add totals row
        html += '<tr class="totals">';
        html += '<td>District Total</td>';
        html += `<td>${totals.totalEnrollment}</td>`;
        html += `<td>${totals.totalCapacity}</td>`;
        html += `<td class="${getUtilizationClass(totals.utilization)}">${totals.utilization}%</td>`;
        html += '</tr>';

        html += '</tbody></table>';

        container.innerHTML = html;
    }

    // Get CSS class based on utilization percentage
    function getUtilizationClass(utilization) {
        if (utilization === null) return '';
        if (utilization < 85) return 'utilization-low';
        if (utilization <= 100) return 'utilization-medium';
        return 'utilization-high';
    }

    // Public API
    return {
        init,
        update
    };
})();
