# Summary

These are requirements for a simple web-based visualization of enrollment and capacity for each school in the City Schools of Decatur system.

# Functional Requirements

## Data sources

- Annual enrollment data from years 2014 to 2026 is found in ../data/Enrollment Data_District_Bar_chart.csv
- School capacity data is found on page one of ../data/CSD_Buildings_SQ_FT_and_Capacity.pdf

## Overall organization

- There will be a tabbed interface with two tabs: Utilization by Year and Utilization by School

## Utilization by Year

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

## Utilization by School

### Graph view

- There will be a graph view where the x-axis is the fiscal year and the y-axis is the utilization
- on the right side of the graph view will be an interactive legend where different schools and clusters can be checked on or off
- the items in the legend will be organized like this:
  - Clusters first: All, North, Central, South
  - Then individual schools, sorted by grade level, alphabetically

## Additional notes

Include these details in both the Utilization by Year and Utilization by School views

- Talley opened in FY2020
- In FY2020 all 3rd grade classes were moved out of the elmentary schools into the upper elementary schools
- Westchester re-opened in FY2015
- High school capacity was expanded in FY2019. 
- Middle school capacity was expanded in FY2017.
- The capacity numbers in this analysis only use the FY26 value so high school and middle school utilization for pre-expansion years will be underreported.

# Non-functional requirements

- The site will be hosted at https://patrickbrandt.github.io/csd_enrollment