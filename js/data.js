// Data module - handles loading and processing school data
const SchoolData = (function() {
    'use strict';

    let data = null;

    // Load school data
    async function loadData() {
        try {
            const response = await fetch('data/schools.json');
            data = await response.json();
            console.log('School data loaded successfully');
            return data;
        } catch (error) {
            console.error('Error loading school data:', error);
            return null;
        }
    }

    // Get all available years
    function getYears() {
        return data ? data.years : [];
    }

    // Get schools for a specific year
    function getSchoolsByYear(year) {
        if (!data || !data.schools) return [];

        return data.schools.map(school => ({
            ...school,
            enrollment: school.enrollment[year] || null
        })).filter(school => school.enrollment !== null);
    }

    // Calculate utilization percentage
    function calculateUtilization(enrollment, capacity) {
        if (!capacity || capacity === 0) return null;
        return Math.round((enrollment / capacity) * 100);
    }

    // Get aggregated data for a year
    function getAggregatedData(year) {
        const schools = getSchoolsByYear(year);
        let totalEnrollment = 0;
        let totalCapacity = 0;

        schools.forEach(school => {
            if (school.enrollment) totalEnrollment += school.enrollment;
            if (school.capacity) totalCapacity += school.capacity;
        });

        return {
            totalEnrollment,
            totalCapacity,
            utilization: calculateUtilization(totalEnrollment, totalCapacity)
        };
    }

    // Get all schools
    function getAllSchools() {
        return data ? data.schools : [];
    }

    // Get clusters
    function getClusters() {
        return data ? data.clusters : {};
    }

    // Get city boundary
    function getCityBoundary() {
        return data ? data.cityBoundary : null;
    }

    // Public API
    return {
        loadData,
        getYears,
        getSchoolsByYear,
        calculateUtilization,
        getAggregatedData,
        getAllSchools,
        getClusters,
        getCityBoundary,
        isReady: () => data !== null
    };
})();

// Start loading data immediately
SchoolData.loadData();
