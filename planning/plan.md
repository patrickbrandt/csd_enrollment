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
   - School coordinates and addresses:
     | School | Address | Coordinates |
     |--------|---------|-------------|
     | Clairemont Elementary | 155 Erie Ave, Decatur, GA 30030 | 33.7752, -84.2961 |
     | Glennwood Elementary | 440 E Ponce de Leon Ave, Decatur, GA 30030 | 33.7738, -84.2878 |
     | Oakhurst Elementary | 175 Mead Rd, Decatur, GA 30030 | 33.7614, -84.2934 |
     | Westchester Elementary | 758 Scott Blvd, Decatur, GA 30030 | 33.7831, -84.3067 |
     | Winnona Park Elementary | 510 Avery St, Decatur, GA 30030 | 33.7682, -84.3052 |
     | Fifth Avenue Upper Elementary | 101 5th Ave, Decatur, GA 30030 | 33.7748, -84.2956 |
     | Talley Street Upper Elementary | 2617 Talley St, Decatur, GA 30030 | 33.7621, -84.3101 |
     | Beacon Hill (Renfroe Middle) | 220 W College Ave, Decatur, GA 30030 | 33.7678, -84.2993 |
     | Decatur High School | 310 N McDonough St, Decatur, GA 30030 | 33.7707, -84.2978 |

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
   - Create Google Maps API key in Google Cloud Console
     - Enable Maps JavaScript API
     - Restrict key to GitHub Pages domain (patrickbrandt.github.io)
   - Initialize map centered on Decatur, GA (~33.7748, -84.2963)
   - Set appropriate default zoom (~14) to show all schools
   - Add City of Decatur boundary polygon
     - Source options (in order of preference):
       1. City of Decatur Open Data Portal: https://data-decaturga.opendata.arcgis.com/datasets/city-limits
       2. ARC Open Data Hub: https://arc-garc.opendata.arcgis.com/datasets/decaturga::decatur-city-limits-2
       3. U.S. Census TIGER/Line (Georgia Places): https://catalog.data.gov/dataset/tiger-line-shapefile-2022-state-georgia-ga-place
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
     - Zoom 11-12: Group by geographic cluster (see below)
     - Zoom <= 10: Show single district-wide marker
   - Geographic clusters (to be refined based on actual coordinates):
     - **North Decatur**: Schools on the north side (e.g., Westchester, Glennwood, Clairemont)
     - **South Decatur**: Schools on the south/east side (e.g., Oakhurst,  Winnona Park, Fifth Avenue, Talley Street)
     - **Central**: Middle and high schools (Beacon Hill, Decatur High School)
   - Each school record will include a `cluster` property for grouping
   - Recalculate aggregated values when grouping:
     - Sum enrollments within cluster
     - Sum capacities within cluster
     - Calculate combined utilization per cluster
   - Display cluster marker at geographic centroid of grouped schools

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
    - Create and configure Google Maps API key (restricted to patrickbrandt.github.io)
    - Test locally with a simple HTTP server
    - Enable GitHub Pages in repository settings (already created)

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

## Key Considerations

### Google Maps API
- Create new API key in Google Cloud Console
- Enable Maps JavaScript API
- Restrict key to GitHub Pages domain (patrickbrandt.github.io/csd_enrollment)
- Free tier should be sufficient for expected usage

### Data Gaps
- College Heights excluded from visualization (no capacity data)
- Talley Street only appears from FY20 onwards (show N/A for earlier years)

### Zoom Aggregation Logic
- At mid-zoom level: Group schools by geographic cluster (North, South, Central)
- At district level (fully zoomed out): Show single marker with total enrollment vs total capacity
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

