# City Schools of Decatur - Enrollment & Capacity Visualization

An interactive web visualization showing enrollment and capacity data for City Schools of Decatur schools from FY2014 to FY2026.

## Features

- **Year Selector**: View enrollment data for any fiscal year from 2014-2026
- **Table View**: Sortable table with school-by-school enrollment, capacity, and utilization
- **Interactive Map**: Google Maps integration with:
  - Individual school markers (zoom level 13+)
  - Geographic cluster markers (zoom levels 11-12)
  - District-wide aggregation (zoom level 10 and below)
  - City of Decatur boundary overlay
  - Color-coded utilization indicators (green <85%, yellow 85-100%, red >100%)

## Setup

### Prerequisites

- A Google Maps API key with Maps JavaScript API enabled

### Getting a Google Maps API Key

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Maps JavaScript API**
4. Create credentials (API key)
5. Restrict the API key to your domain (recommended):
   - Application restrictions: HTTP referrers
   - Website restrictions: `patrickbrandt.github.io/csd_enrollment/*`

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/patrickbrandt/csd_enrollment.git
   cd csd_enrollment
   ```

2. Replace the API key placeholder in `index.html`:
   ```html
   <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap&v=weekly" defer></script>
   ```
   Replace `YOUR_API_KEY` with your actual Google Maps API key.

3. Serve the files using a local web server:
   ```bash
   python3 -m http.server 8000
   ```

4. Open http://localhost:8000 in your browser

## Deployment to GitHub Pages

This site is configured for GitHub Pages deployment:

1. Push your changes to GitHub
2. Go to repository Settings → Pages
3. Set source to "main" branch, "/" (root) directory
4. Your site will be available at: https://patrickbrandt.github.io/csd_enrollment

## Project Structure

```
/
├── index.html              # Main HTML page
├── css/
│   └── styles.css          # All styling
├── js/
│   ├── app.js              # Main application logic
│   ├── data.js             # Data loading and processing
│   ├── table.js            # Table view component
│   └── map.js              # Google Maps component
├── data/
│   ├── schools.json        # Processed school data with enrollment history
│   ├── Enrollment Data_District_Bar_chart.csv  # Source enrollment data
│   ├── CSD_Buildings_SQ_FT_and_Capacity.pdf   # Source capacity data
│   └── decatur_city_limits.geojson            # City boundary GeoJSON
└── planning/
    ├── requirements.md     # Project requirements
    └── plan.md             # Implementation plan
```

## Data Sources

- **Enrollment Data**: Annual enrollment by school from FY2014 to FY2026
- **Capacity Data**: Official building capacity from CSD Buildings document
- **City Boundary**: GeoJSON from ARC Open Data & Mapping Hub
- **School Locations**: Verified addresses and coordinates for each school

## Schools Included

- Beacon Hill Middle School (6-8)
- Clairemont Elementary (K-2)
- Decatur High School (9-12)
- Fifth Avenue Upper Elementary (3-5)
- Glennwood Elementary (K-2)
- Oakhurst Elementary (K-2)
- Talley Street Upper Elementary (3-5)
- Westchester Elementary (K-2)
- Winnona Park Elementary (K-2)

*Note: College Heights Early Learning Center is excluded due to lack of capacity data.*

## Geographic Clusters

Schools are grouped into three geographic clusters for mid-zoom visualization:

- **North Decatur**: Westchester, Glennwood, Clairemont
- **South Decatur**: Oakhurst, Winnona Park, Fifth Avenue, Talley Street
- **Central Decatur**: Beacon Hill, Decatur High School

## Browser Support

Tested and supported in:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

This project visualizes public school enrollment data for informational purposes.

## Contact

For questions or issues, please open an issue on GitHub.
