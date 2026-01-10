// Main application logic
(function() {
    'use strict';

    let currentYear = 'FY26'; // Default to most recent year

    // Initialize application
    function init() {
        console.log('Initializing CSD Enrollment Visualization...');

        // Wait for data to load
        if (typeof SchoolData === 'undefined') {
            console.error('School data not loaded');
            return;
        }

        // Initialize year selector
        initYearSelector();

        // Initialize table
        if (typeof TableView !== 'undefined') {
            TableView.init();
            TableView.update(currentYear);
        }

        // Initialize map
        if (typeof MapView !== 'undefined') {
            MapView.init();
        }
    }

    // Initialize year selector
    function initYearSelector() {
        const years = SchoolData.getYears();
        const selector = document.getElementById('year-selector');

        years.forEach(year => {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            if (year === currentYear) {
                option.selected = true;
            }
            selector.appendChild(option);
        });

        // Listen for year changes
        selector.addEventListener('change', (e) => {
            currentYear = e.target.value;
            updateViews(currentYear);
        });
    }

    // Update all views when year changes
    function updateViews(year) {
        if (typeof TableView !== 'undefined') {
            TableView.update(year);
        }
        if (typeof MapView !== 'undefined') {
            MapView.update(year);
        }
    }

    // Start app when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
