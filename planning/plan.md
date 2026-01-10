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

### School Name Mapping
The enrollment CSV and capacity PDF use slightly different naming:
- CSV: "Clairemont" → PDF: "Clairmont Elem"
- CSV: "Glennwood" → PDF: "Glennwood Elem"
- CSV: "Talley Street" → PDF: "Talley Upper Elem"

---

## Technical Stack

| Component | Technology | Rationale |
|-----------|------------|-----------|
| Framework | Vanilla JS or lightweight (Alpine.js) | Simple requirements, fast load times |
| Styling | CSS (or Tailwind via CDN) | Minimal styling needs |
| Maps | Google Maps JavaScript API | Required per spec |
| Data | Static JSON files | Pre-processed from CSV/PDF |
| Hosting | GitHub Pages | Per requirements |
| Build | None (static) or Vite | Keep it simple |

---

## Implementation Steps

### Phase 1: Project Setup

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
   │   └── map.js
   ├── data/
   │   └── schools.json (processed data)
   └── planning/
       └── requirements.md
   ```

2. **Process and consolidate data**
   - Create `schools.json` containing:
     - School names (normalized)
     - Capacity values
     - Enrollment by year
     - Geographic coordinates (lat/lng for each school)
     - Grade levels

### Phase 2: Data Layer

3. **Create data processing script**
   - Parse enrollment CSV
   - Map school names to capacity values
   - Add school coordinates (need to research/add):
     - Clairemont Elementary: ~33.7745, -84.2961
     - Glennwood Elementary: ~33.7698, -84.2892
     - Oakhurst Elementary: ~33.7654, -84.2934
     - Westchester Elementary: ~33.7796, -84.3142
     - Winnona Park Elementary: ~33.7712, -84.3052
     - Fifth Avenue Upper Elementary: ~33.7748, -84.2956
     - Talley Street Upper Elementary: ~33.7771, -84.3001
     - Beacon Hill (Renfroe Middle): ~33.7743, -84.2935
     - Decatur High School: ~33.7709, -84.2980

4. **Create data module (data.js)**
   - Load schools.json
   - Export functions:
     - `getSchoolsByYear(year)` - returns array of school data
     - `getYears()` - returns available years
     - `calculateUtilization(enrollment, capacity)` - returns percentage
     - `getAggregatedData(year)` - returns district totals

### Phase 3: Year Selector Component

5. **Implement year selector**
   - Dropdown populated with FY14-FY26
   - Default to most recent year (FY26)
   - On change: dispatch custom event to update table and map
   - Store selected year in module state

### Phase 4: Table View Component

6. **Implement table view (table.js)**
   - Create HTML table structure
   - Columns: School, Enrollment, Capacity, Utilization
   - Utilization calculated as: `(enrollment / capacity) * 100`
   - Color-code utilization:
     - Green: < 85%
     - Yellow: 85-100%
     - Red: > 100%
   - Sort by school name alphabetically
   - Add district totals row at bottom

### Phase 5: Map View Component

7. **Set up Google Maps**
   - Initialize map centered on Decatur, GA (~33.7748, -84.2963)
   - Set appropriate default zoom (~14) to show all schools
   - Add City of Decatur boundary polygon
     - Source: Need to obtain GeoJSON for city boundaries
     - Style: semi-transparent fill with border

8. **Implement school markers**
   - Create custom markers/info windows for each school
   - Display: School name, Enrollment, Capacity, Utilization %
   - Color-code markers by utilization (same as table)
   - Use MarkerClusterer or custom clustering for zoom behavior

9. **Implement zoom-based aggregation**
   - Listen to map zoom_changed event
   - Define zoom thresholds:
     - Zoom >= 13: Show individual school markers
     - Zoom 11-12: Group by school type (Elementary K-2, Upper Elem 3-5, Middle 6-8, High 9-12)
     - Zoom <= 10: Show single district-wide marker
   - Recalculate aggregated values when grouping:
     - Sum enrollments
     - Sum capacities
     - Calculate combined utilization

### Phase 6: Integration & Polish

10. **Wire components together**
    - Year selector updates both table and map
    - Responsive layout (table and map side-by-side on desktop, stacked on mobile)
    - Add loading states

11. **Styling**
    - Clean, professional appearance
    - CSD brand colors if available
    - Accessible color contrast
    - Mobile-responsive design

### Phase 7: Deployment

12. **Prepare for GitHub Pages**
    - Ensure all paths are relative
    - Add Google Maps API key (consider restrictions)
    - Test locally with a simple HTTP server
    - Create/update GitHub repository
    - Enable GitHub Pages in repository settings

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
      "capacity": 365,
      "lat": 33.7745,
      "lng": -84.2961,
      "enrollment": {
        "FY14": 379,
        "FY15": 319,
        ...
      }
    },
    ...
  ],
  "years": ["FY14", "FY15", ..., "FY26"],
  "cityBoundary": { /* GeoJSON */ }
}
```

---

## Key Considerations

### Google Maps API
- Requires API key with Maps JavaScript API enabled
- May need to restrict key to GitHub Pages domain
- Consider usage limits/billing

### Data Gaps
- College Heights excluded from visualization (no capacity data)
- Talley Street only appears from FY20 onwards
- Need to verify school coordinates

### Zoom Aggregation Logic
- At district level (zoomed out): Show single marker with total enrollment vs total capacity
- The "7x zoomed out" in requirements is vague - will implement zoom level thresholds instead

### Accessibility
- Ensure color is not the only indicator of utilization status
- Add aria labels to interactive elements
- Keyboard navigation support

---

## File Deliverables

1. `index.html` - Main page structure
2. `css/styles.css` - All styling
3. `js/app.js` - Main application logic, initialization
4. `js/data.js` - Data loading and processing
5. `js/table.js` - Table component
6. `js/map.js` - Map component with clustering
7. `data/schools.json` - Processed school data

---

## Dependencies

- Google Maps JavaScript API
- Optional: MarkerClusterer library for Google Maps
- No build tools required (can be added if needed)

---

## Open Questions for Clarification

1. **Google Maps API Key**: Do you have an existing API key, or should I create one?
2. **City Boundary Data**: Should I source the Decatur city boundary GeoJSON, or do you have this data?
3. **Zoom Behavior**: The requirement mentions "7x zoomed out" - should I interpret this as a specific zoom level threshold (e.g., zoom level 7), or design a more intuitive progressive aggregation?
4. **School Coordinates**: Should I research the exact coordinates, or do you have official location data?
