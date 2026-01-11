# City Schools of Decatur - Enrollment & Capacity Visualization

An interactive web visualization showing enrollment and capacity data for City Schools of Decatur schools from FY2014 to FY2026.

[https://patrickbrandt.github.io/csd_enrollment/](https://patrickbrandt.github.io/csd_enrollment/)

## Features

### Utilization by Year Tab
- **Year Selector**: View enrollment data for any fiscal year from 2014-2026
- **Table View**: School-by-school enrollment, capacity, and utilization
- **Interactive Map**: Google Maps integration with:
  - Individual school markers (zoom level 14+)
  - Geographic cluster markers (zoom levels 12-13)
  - District-wide aggregation (zoom level 11 and below)
  - City of Decatur boundary overlay
  - Color-coded utilization indicators (green <85%, yellow 85-100%, red >100%)

### Utilization by School Tab
- **Line Chart**: Utilization trends over time (FY14-FY26) with 100% capacity reference line
- **Interactive Legend**: Toggle visibility for individual schools and geographic clusters
- **Flexible Comparison**: Compare any combination of schools, clusters, or district-wide data

### Additional Information
- **Historical Notes**: Context about school openings, grade reconfigurations, and capacity expansions
- **Geographic Clusters**: Visual reference showing which schools belong to each cluster

## Data Sources

- **Enrollment Data**: Annual enrollment by school from FY2014 to FY2026 ([source](https://lookerstudio.google.com/u/0/reporting/c74596f8-98d8-4afd-a8d0-754877da3301/page/XUfcF))
- **Capacity Data**: Official building capacity from CSD Buildings document ([source](https://resources.finalsite.net/images/v1760635799/csdecaturnet/rajg3mt7nd1fzcibvfqf/CSDBuildingsSQFTandCapacityxlsx.pdf))
- **City Boundary**: GeoJSON from ARC Open Data & Mapping Hub
- **School Locations**: Verified addresses and coordinates for each school

Links to all school data can be found [here](https://www.csdecatur.net/our-district-5f/departments/operations/k-2schoolutilization).

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
