// Chart view component with Chart.js integration
const ChartView = (function() {
    'use strict';

    let chart = null;
    let selectedItems = new Set(['all']); // Default: show "All" on load

    // Color palette for lines
    const colors = {
        // Clusters
        all: '#333333',
        north: '#4CAF50',
        central: '#FF9800',
        south: '#2196F3',
        // Schools - Elementary K-2
        clairemont: '#9C27B0',
        glennwood: '#E91E63',
        oakhurst: '#00BCD4',
        westchester: '#8BC34A',
        winnona_park: '#FF5722',
        // Schools - Upper Elementary 3-5
        fifth_avenue: '#673AB7',
        talley_street: '#009688',
        // Schools - Middle 6-8
        beacon_hill: '#795548',
        // Schools - High 9-12
        decatur_high: '#607D8B'
    };

    // Legend configuration - defines order and grouping
    const legendConfig = [
        {
            title: 'Clusters',
            items: [
                { id: 'all', label: 'All (District-wide)' },
                { id: 'north', label: 'North Decatur' },
                { id: 'central', label: 'Central Decatur' },
                { id: 'south', label: 'South Decatur' }
            ]
        },
        {
            title: 'Elementary (K-2)',
            items: [
                { id: 'clairemont', label: 'Clairemont' },
                { id: 'glennwood', label: 'Glennwood' },
                { id: 'oakhurst', label: 'Oakhurst' },
                { id: 'westchester', label: 'Westchester' },
                { id: 'winnona_park', label: 'Winnona Park' }
            ]
        },
        {
            title: 'Upper Elementary (3-5)',
            items: [
                { id: 'fifth_avenue', label: 'Fifth Avenue' },
                { id: 'talley_street', label: 'Talley Street' }
            ]
        },
        {
            title: 'Middle School (6-8)',
            items: [
                { id: 'beacon_hill', label: 'Beacon Hill' }
            ]
        },
        {
            title: 'High School (9-12)',
            items: [
                { id: 'decatur_high', label: 'Decatur High' }
            ]
        }
    ];

    // Initialize chart
    function init() {
        console.log('ChartView.init() called');
        renderLegend();
        createChart();
    }

    // Get data for a specific item (cluster or school)
    function getItemData(itemId) {
        if (itemId === 'all') {
            return SchoolData.getDistrictUtilizationHistory();
        } else if (['north', 'central', 'south'].includes(itemId)) {
            return SchoolData.getClusterUtilizationHistory(itemId);
        } else {
            return SchoolData.getSchoolUtilizationHistory(itemId);
        }
    }

    // Create the Chart.js line chart
    function createChart() {
        const ctx = document.getElementById('utilization-chart');
        if (!ctx) {
            console.error('Chart canvas not found');
            return;
        }

        const years = SchoolData.getYears();
        const datasets = buildDatasets();

        chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: years,
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                plugins: {
                    legend: {
                        display: false // Using custom legend
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const value = context.parsed.y;
                                if (value === null) return context.dataset.label + ': No data';
                                return context.dataset.label + ': ' + value + '%';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        suggestedMax: 150,
                        title: {
                            display: true,
                            text: 'Utilization (%)'
                        },
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Fiscal Year'
                        }
                    }
                },
                elements: {
                    line: {
                        tension: 0.1
                    },
                    point: {
                        radius: 4,
                        hoverRadius: 6
                    }
                }
            },
            plugins: [{
                id: 'capacityLine',
                beforeDraw: function(chart) {
                    const ctx = chart.ctx;
                    const yAxis = chart.scales.y;
                    const xAxis = chart.scales.x;

                    // Draw 100% capacity reference line
                    const yValue = yAxis.getPixelForValue(100);

                    ctx.save();
                    ctx.beginPath();
                    ctx.moveTo(xAxis.left, yValue);
                    ctx.lineTo(xAxis.right, yValue);
                    ctx.strokeStyle = '#dc3545';
                    ctx.lineWidth = 1;
                    ctx.setLineDash([5, 5]);
                    ctx.stroke();
                    ctx.restore();

                    // Add label for 100% line
                    ctx.save();
                    ctx.fillStyle = '#dc3545';
                    ctx.font = '11px sans-serif';
                    ctx.fillText('100% Capacity', xAxis.right - 85, yValue - 5);
                    ctx.restore();
                }
            }]
        });
    }

    // Build datasets for selected items
    function buildDatasets() {
        const datasets = [];
        const years = SchoolData.getYears();

        selectedItems.forEach(itemId => {
            const data = getItemData(itemId);
            const color = colors[itemId] || '#999999';
            const label = getItemLabel(itemId);

            datasets.push({
                label: label,
                data: data.map(d => d.utilization),
                borderColor: color,
                backgroundColor: color + '20',
                borderWidth: 2,
                fill: false,
                spanGaps: false
            });
        });

        return datasets;
    }

    // Get label for an item
    function getItemLabel(itemId) {
        for (const group of legendConfig) {
            for (const item of group.items) {
                if (item.id === itemId) {
                    return item.label;
                }
            }
        }
        return itemId;
    }

    // Render the custom legend
    function renderLegend() {
        const legendContainer = document.getElementById('chart-legend');
        if (!legendContainer) return;

        legendContainer.innerHTML = '';

        legendConfig.forEach(group => {
            const groupDiv = document.createElement('div');
            groupDiv.className = 'legend-group';

            const titleDiv = document.createElement('div');
            titleDiv.className = 'legend-group-title';
            titleDiv.textContent = group.title;
            groupDiv.appendChild(titleDiv);

            group.items.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'legend-item';

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = 'legend-' + item.id;
                checkbox.checked = selectedItems.has(item.id);
                checkbox.addEventListener('change', () => toggleItem(item.id, checkbox.checked));

                const colorBox = document.createElement('span');
                colorBox.className = 'legend-color';
                colorBox.style.backgroundColor = colors[item.id] || '#999999';

                const label = document.createElement('label');
                label.className = 'legend-label';
                label.htmlFor = 'legend-' + item.id;
                label.textContent = item.label;

                itemDiv.appendChild(checkbox);
                itemDiv.appendChild(colorBox);
                itemDiv.appendChild(label);
                groupDiv.appendChild(itemDiv);
            });

            legendContainer.appendChild(groupDiv);
        });
    }

    // Toggle item visibility
    function toggleItem(itemId, isChecked) {
        if (isChecked) {
            selectedItems.add(itemId);
        } else {
            // Ensure at least one item remains selected
            if (selectedItems.size > 1) {
                selectedItems.delete(itemId);
            } else {
                // Re-check the checkbox if trying to uncheck the last item
                const checkbox = document.getElementById('legend-' + itemId);
                if (checkbox) checkbox.checked = true;
                return;
            }
        }

        updateChart();
    }

    // Update chart with new data
    function updateChart() {
        if (!chart) return;

        chart.data.datasets = buildDatasets();
        chart.update();
    }

    // Public API
    return {
        init,
        updateChart
    };
})();
