## Summary

These are requirements for a simple web-based visualization of enrollment and capacity for each school in the City Schools of Decatur system.

## Functional Requirements

### Data sources

- Annual enrollment data from years 2014 to 2026 is found in ../data/Enrollment Data_District_Bar_chart.csv
- School capacity data is found on page one of ../data/CSD_Buildings_SQ_FT_and_Capacity.pdf

### Year selector

- There will be a drop-down selector with each enrollment fiscal year
- The data displayed in the table view and map view will update according to the year selected

### Table view

- There will be a table view that has four columns: School, Enrollment, Capacity, Utilization
- Utilization is the percentage of students enrolled against capacity

### Map view

- There will be a Google map view that overlays the enrollment, capacity, and utilization values at each school location on the map
- The map will display the City of Decatur boundaries
- The default zoom level will display all school locations with the requisite data
- As users zoom out, the enrollment and capacity values are combined and the utilization is re-calculated
- At something like 7x zoomed out, system-wide enrollement, capacity, and utilization data will be displayed

## Non-functional requirements

- The site will be hosted at https://patrickbrandt.github.io/csd_enrollment