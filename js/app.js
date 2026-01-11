// Main application logic
const App = (function() {
    'use strict';

    let currentYear = 'FY26'; // Default to most recent year
    let currentTab = 'by-year';
    let chartInitialized = false;

    // Initialize application
    async function init() {
        console.log('App.init() called');

        // Wait for data to load
        if (typeof SchoolData === 'undefined') {
            console.error('SchoolData module not loaded');
            return;
        }

        // Wait for data to be ready
        console.log('Loading data...');
        const data = await SchoolData.loadData();

        if (!data) {
            console.error('Failed to load school data');
            return;
        }

        console.log('Data loaded, years:', SchoolData.getYears());

        // Initialize tab navigation
        initTabs();

        // Initialize year selector
        console.log('Initializing year selector...');
        initYearSelector();

        // Initialize table
        if (typeof TableView !== 'undefined') {
            console.log('Initializing table view...');
            TableView.init();
            TableView.update(currentYear);
        }

        console.log('App initialized successfully');
    }

    // Initialize tab navigation
    function initTabs() {
        const tabButtons = document.querySelectorAll('.tab-button');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.dataset.tab;
                switchTab(tabId);
            });
        });
    }

    // Switch between tabs
    function switchTab(tabId) {
        if (tabId === currentTab) return;

        // Update button states
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabId);
        });

        // Update content visibility
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.toggle('active', content.id === 'tab-' + tabId);
        });

        currentTab = tabId;

        // Initialize chart on first view of "by-school" tab
        if (tabId === 'by-school' && !chartInitialized) {
            if (typeof ChartView !== 'undefined') {
                console.log('Initializing chart view...');
                ChartView.init();
                chartInitialized = true;
            }
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

    // Public API
    return {
        init
    };
})();

// Start app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', App.init);
} else {
    App.init();
}
