// Data module - handles loading and processing school data
const SchoolData = (function() {
    'use strict';

    let data = null;
    let loadingPromise = null;

    // Load school data
    async function loadData() {
        // If already loaded, return the data
        if (data !== null) {
            console.log('Data already loaded');
            return data;
        }

        // If currently loading, return the existing promise
        if (loadingPromise !== null) {
            console.log('Data is currently loading, waiting...');
            return loadingPromise;
        }

        // Start loading
        console.log('Starting to load school data...');
        loadingPromise = (async () => {
            try {
                const response = await fetch('data/schools.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                data = await response.json();
                console.log('School data loaded successfully:', data.schools.length, 'schools');
                return data;
            } catch (error) {
                console.error('Error loading school data:', error);
                loadingPromise = null;
                return null;
            }
        })();

        return loadingPromise;
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

    // Get utilization history for a specific school
    function getSchoolUtilizationHistory(schoolId) {
        if (!data || !data.schools) return [];

        const school = data.schools.find(s => s.id === schoolId);
        if (!school) return [];

        const years = getYears();
        return years.map(year => {
            const enrollment = school.enrollment[year];
            if (!enrollment) return { year, utilization: null };
            return {
                year,
                utilization: calculateUtilization(enrollment, school.capacity)
            };
        });
    }

    // Get utilization history for a cluster
    function getClusterUtilizationHistory(clusterId) {
        if (!data || !data.clusters) return [];

        const cluster = data.clusters[clusterId];
        if (!cluster) return [];

        const years = getYears();
        const clusterSchools = data.schools.filter(s => cluster.schools.includes(s.id));

        return years.map(year => {
            let totalEnrollment = 0;
            let totalCapacity = 0;

            clusterSchools.forEach(school => {
                const enrollment = school.enrollment[year];
                if (enrollment) {
                    totalEnrollment += enrollment;
                    if (school.capacity) totalCapacity += school.capacity;
                }
            });

            if (totalEnrollment === 0) return { year, utilization: null };
            return {
                year,
                utilization: calculateUtilization(totalEnrollment, totalCapacity)
            };
        });
    }

    // Get district-wide utilization history
    function getDistrictUtilizationHistory() {
        if (!data) return [];

        const years = getYears();
        return years.map(year => {
            const aggregated = getAggregatedData(year);
            return {
                year,
                utilization: aggregated.utilization
            };
        });
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
        getSchoolUtilizationHistory,
        getClusterUtilizationHistory,
        getDistrictUtilizationHistory,
        isReady: () => data !== null
    };
})();

// Start loading data immediately
SchoolData.loadData();
