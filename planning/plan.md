# CSD Enrollment Visualization - Implementation Plan

## Overview

Build a web-based visualization for City Schools of Decatur enrollment and capacity data, hosted on GitHub Pages.

---

## Data Analysis

### Enrollment Data (CSV)
- **Format**: Date (FY14-FY26), School, Total
- **Years**: 13 fiscal years (2014-2026)
- **Schools**: 9 schools included (Talley Street added in FY20, College Heights excluded)

### Capacity Data (from PDF)
| School | Capacity | Grades |
|--------|----------|--------|
| Clairemont | 365 | K-2 |
| Glennwood | 319 | K-2 |
| Oakhurst | 479 | K-2 |
| Westchester | 296 | K-2 |
| Winnona Park | 319 | K-2 |
| Fifth Avenue | 661 | 3-5 |
| Talley Street | 742 | 3-5 |
| Beacon Hill | 1658 | 6-8 |
| Decatur High School | 1971 | 9-12 |
| ~~College Heights~~ | N/A | Early Learning | **(Excluded)**

### Historical Notes (to display in UI)
- Talley Street opened in FY2020
- In FY2020, all 3rd grade classes moved from elementary schools to upper elementary schools
- Westchester re-opened in FY2015
- High school capacity expanded in FY2019
- Middle school capacity expanded in FY2017
- Capacity numbers use FY26 values only, so pre-expansion utilization is underreported

---

## Technical Stack

| Component | Technology | Rationale |
|-----------|------------|-----------|
| Framework | Vanilla JS | Simple requirements, fast load times |
| Styling | CSS | Minimal styling needs |
| Maps | Google Maps JavaScript API | Required per spec |
| Charts | Chart.js (via CDN) | Lightweight, easy line charts |
| Data | Static JSON files | Pre-processed from CSV/PDF |
| Hosting | GitHub Pages | Per requirements |
| Build | None (static) | Keep it simple |

---

## Application Structure

### Tabbed Interface
- **Tab 1: Utilization by Year** (existing functionality)
  - Year selector dropdown
  - Table view (School, Enrollment, Capacity, Utilization)
  - Map view with clustering
  - Historical notes section

- **Tab 2: Utilization by School** (new)
  - Line graph (x-axis: fiscal year, y-axis: utilization %)
  - Interactive legend on right side
  - Historical notes section

---

## Implementation Steps

### Phase 1: Project Setup (COMPLETED)

1. **Initialize project structure**
   ```
   /
   ├── index.html
   ├── css/
   │   └── styles.css
   ├── js/
   │   ├── app.js
   │   ├── data.js
   │   ├── table.js
   │   ├── map.js
   │   └── chart.js (NEW)
   ├── data/
   │   └── schools.json
   └── planning/
       └── requirements.md
   ```

2. **Process and consolidate data** (COMPLETED)

### Phase 2: Data Layer (COMPLETED)

3. **School coordinates and data** (COMPLETED)

4. **Data module functions** (COMPLETED)
   - `getSchoolsByYear(year)`
   - `getYears()`
   - `calculateUtilization(enrollment, capacity)`
   - `getAggregatedData(year)`
   - `getSchoolUtilizationHistory(schoolId)` - returns utilization by year
   - `getClusterUtilizationHistory(clusterId)` - returns cluster utilization by year

### Phase 3: Utilization by Year Tab (COMPLETED)

5. **Year selector** (COMPLETED)
6. **Table view** (COMPLETED)
7. **Map view with clustering** (COMPLETED)

### Phase 4: Tabbed Interface (NEW)

8. **Implement tab navigation**
   - Add tab buttons to header: "Utilization by Year", "Utilization by School"
   - Show/hide content sections based on active tab
   - Store active tab in state
   - Style active tab indicator

### Phase 5: Utilization by School Tab (NEW)

9. **Add Chart.js library**
   - Include Chart.js via CDN in index.html
   - Create chart.js module for chart functionality

10. **Implement line chart**
    - X-axis: Fiscal years (FY14-FY26)
    - Y-axis: Utilization percentage (0-150% or auto-scale)
    - One line per selected school/cluster
    - Color-code lines to match legend
    - Add horizontal reference line at 100% capacity
    - Tooltip showing exact values on hover

11. **Implement interactive legend**
    - Position: Right side of chart
    - Checkboxes to toggle visibility of each line
    - Organization (top to bottom):
      - **Clusters section:**
        - All (district-wide)
        - North Decatur
        - Central Decatur
        - South Decatur
      - **Schools section** (sorted by grade level, then alphabetically):
        - Elementary K-2: Clairemont, Glennwood, Oakhurst, Westchester, Winnona Park
        - Upper Elementary 3-5: Fifth Avenue, Talley Street
        - Middle 6-8: Beacon Hill
        - High 9-12: Decatur High School
    - Color swatch next to each item matching line color
    - Default: Show "All" selected on load

### Phase 6: Historical Notes Section (NEW)

12. **Add notes component**
    - Display below table/map in "Utilization by Year" tab
    - Display below chart in "Utilization by School" tab
    - Content:
      - "Talley Street opened in FY2020"
      - "In FY2020, 3rd grade classes moved to upper elementary schools"
      - "Westchester re-opened in FY2015"
      - "High school capacity expanded in FY2019"
      - "Middle school capacity expanded in FY2017"
      - "Note: Capacity numbers use FY26 values; pre-expansion utilization may be underreported"
    - Style: Muted/info box appearance

### Phase 7: Polish & Integration

13. **Update styling for tabs**
    - Tab button styles (active/inactive states)
    - Responsive layout for both tabs
    - Chart container sizing
    - Legend styling with checkboxes

14. **Ensure data consistency**
    - Chart and table should use same calculation logic
    - Handle missing data (e.g., Talley Street pre-FY20, Westchester FY14)

### Phase 8: Testing & Deployment

15. **Test all functionality**
    - Tab switching
    - Chart interactions (legend toggles, tooltips)
    - Map clustering still works
    - Responsive design on mobile

16. **Deploy to GitHub Pages**
    - Commit and push changes
    - Verify at https://patrickbrandt.github.io/csd_enrollment

---

## Data File Structure

```json
{
  "schools": [
    {
      "id": "clairemont",
      "name": "Clairemont Elementary",
      "shortName": "Clairemont",
      "grades": "K-2",
      "type": "elementary_lower",
      "cluster": "north",
      "capacity": 365,
      "lat": 33.7752,
      "lng": -84.2961,
      "enrollment": {
        "FY14": 379,
        "FY15": 319,
        ...
      }
    },
    ...
  ],
  "clusters": {
    "north": { "name": "North Decatur", "schools": ["westchester", "glennwood", "clairemont"] },
    "south": { "name": "South Decatur", "schools": ["oakhurst", "winnona_park", "fifth_avenue", "talley_street"] },
    "central": { "name": "Central Decatur", "schools": ["beacon_hill", "decatur_high"] }
  },
  "years": ["FY14", "FY15", ..., "FY26"],
  "cityBoundary": { /* GeoJSON */ }
}
```

---

## Chart Configuration

### Line Chart Settings
- Type: Line chart
- Responsive: true
- Maintain aspect ratio: false (allow custom height)
- Y-axis: Start at 0, suggest max 150
- X-axis: All fiscal years
- Grid lines: Light gray
- Reference line at 100%: Dashed red line

### Color Palette for Lines
| Item | Color |
|------|-------|
| All (District) | #333333 (dark gray) |
| North Cluster | #4CAF50 (green) |
| Central Cluster | #FF9800 (orange) |
| South Cluster | #2196F3 (blue) |
| Individual Schools | Varied palette |

### Legend Behavior
- Clicking checkbox toggles line visibility
- At least one item must remain selected
- Lines smoothly appear/disappear (CSS transition)

---

## Key Considerations

### Google Maps API (COMPLETED)
- API key configured and restricted

### Data Gaps
- College Heights excluded (no capacity data)
- Talley Street: No data before FY20
- Westchester: No data for FY14

### Historical Context
- Display notes about capacity changes prominently
- Users should understand pre-expansion utilization is understated

### Accessibility
- Color is not the only indicator (use patterns/labels)
- Keyboard navigation for tabs and legend
- Screen reader support for chart data

---

## File Deliverables

1. `index.html` - Main page with tabbed structure
2. `css/styles.css` - All styling including tabs and chart
3. `js/app.js` - Main application logic, tab management
4. `js/data.js` - Data loading and processing
5. `js/table.js` - Table component
6. `js/map.js` - Map component with clustering
7. `js/chart.js` - Chart component with legend
8. `data/schools.json` - Processed school data

---

## Dependencies

- Google Maps JavaScript API
- Chart.js (via CDN): https://cdn.jsdelivr.net/npm/chart.js
- No build tools required
