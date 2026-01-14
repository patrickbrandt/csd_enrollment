# College Heights Early Childhood Learning Center - Analysis

## Overview

College Heights ECLC serves children from birth to age 5 (Pre-K) within City Schools of Decatur. Unlike K-12 schools where capacity is determined by building size, early childhood capacity is determined by:
- **State-funded classroom allocations** (Bright From the Start grants)
- **Teacher-to-child ratios** mandated by Georgia regulations
- **Classroom type** (special education vs. general education)

This makes enrollment vs. capacity comparisons different from other CSD schools.

---

## Capacity Findings

### Pre-K Program (Age 4)

| Metric | 2014 | Current |
|--------|------|---------|
| Classrooms | 9 | 8 |
| Composition | 4 inclusion + 5 regular | 2 special ed + 6 general ed |
| Capacity | 190 | 148 |

**Why the change from 190 to 148:**
1. Lost 1 classroom (9 → 8)
2. Different classroom mix (more dedicated special ed with smaller caps)
3. State reduced class sizes from 22 to 20 students (2023-24 pilot, 2024-25 full implementation)

**Sources:**
- [Decatur Metro (2014)](https://www.decaturmetro.com/tag/college-heights-early-childhood-learning-center/)
- [CSD FAQ](https://www.csdecatur.net/our-district-5f/departments/teaching-and-learning/early-childhood-learning/frequently-asked-questions)

### Birth-to-Three Program (Ages 0-3)

**Classroom structure:**
- 2 infant classrooms
- 2 one-year-old classrooms
- 2 toddler classrooms

**Estimated capacity: ~96 children** (based on Georgia ratios and classroom counts)

---

## Georgia Bright From the Start Regulations

### Teacher-to-Child Ratios (0-3 Programs)

| Age Group | Ratio | Max with 2 Teachers |
|-----------|-------|---------------------|
| Infants (0-1) | 1:6 | 12 per classroom |
| 1 year olds | 1:8 | 16 per classroom |
| 2 year olds (toddlers) | 1:10 | 20 per classroom |

### Pre-K Ratios and Class Sizes

| Classroom Type | Class Size | Notes |
|----------------|------------|-------|
| General Pre-K | 20 students | Reduced from 22 in 2024-25 |
| Inclusion Pre-K | 20 students | Mixed special needs/general ed |
| Special Ed Pre-K (full day) | 8 students | Self-contained |
| Special Ed Pre-K (part day) | 12 students | Self-contained |

### How Pre-K Capacity is Determined

Capacity is **not** based on building square footage. Instead:
1. Georgia Bright From the Start allocates funded classrooms to each district annually via grant agreements
2. Class sizes are set by state regulation
3. The formula: `Allocated Classrooms × Max Class Size = Capacity`

From 2014 Decatur Metro: *"Bright From the Start allocates 9 Pre-K classrooms to City Schools of Decatur that is included in our grant agreement each year."*

**Sources:**
- [Georgia Child Care Licensing Requirements](https://geears.org/wp-content/uploads/Georgia-Child-Care-Licensing-Requirements-Infants-Toddlers.pdf)
- [GEEARS - 2024 Pre-K Reforms](https://geears.org/news/2024-georgia-legislative-pre-k-reforms-return-the-state-to-national-leadership-in-preschool-access-quality/)

---

## Waitlist Data (Demand Indicator)

Unlike K-12 schools, enrollment alone doesn't indicate demand for College Heights because capacity is artificially constrained by state funding. **Waitlist size is a better demand indicator.**

### Available Waitlist Data

| Year | Pre-K Waitlist | Birth-to-Three Waitlist | Source |
|------|----------------|-------------------------|--------|
| 2013 | 47 | - | Decaturish |
| 2014 | 73 | - | Decaturish |
| 2024 (Aug) | - | 107 | Decaturish |
| 2025 | - | 115 | Decaturish |

**Data gap:** No publicly available waitlist data for 2015-2023.

### Lottery Statistics (2014)

- Total applicants: 263
- Available slots: 190
- Waitlisted: 73
- **Demand ratio: 138%**

**Sources:**
- [Decaturish - Pre-K Wait List Grows (2014)](https://decaturish.com/2014/03/lottery-decatur-pre-k-wait-list-grows/)
- [Decaturish - Early Learning Center Scrutiny (2025)](https://www.decaturish.com/decatur-city-commission-pulls-eclc-approval-from-agenda/article_7225f29b-e97b-4afd-a129-ff92469b0255.html)

---

## Alternative Demand Indicators

Since waitlist data is sparse, other approaches to measure demand:

1. **Lottery applicants** - Total participants, not just waitlist
2. **Kindergarten enrollment** - Following year's K enrollment as proxy for Pre-K-eligible cohort
3. **Census data** - Children under 5 in Decatur (American Community Survey)
4. **Birth records** - DeKalb County/Decatur births predict demand 3-4 years out
5. **Demand ratio** - `(Enrolled + Waitlist) / Capacity`

---

## Enrollment Data Notes

The enrollment data in `data/Enrollment Data_District_Bar_chart.csv` for College Heights appears to be **Pre-K only** (not including birth-to-three), based on:
- Numbers range from 148-197, consistent with Pre-K capacity
- FY25 enrollment (148) exactly matches stated Pre-K capacity
- If 0-3 were included, totals would be ~244-286

---

## Key Differences from K-12 Schools

| Factor | K-12 Schools | College Heights |
|--------|--------------|-----------------|
| Capacity basis | Building sq. ft. | State-funded slots |
| Capacity changes | Renovations/expansions | Annual grant allocations |
| Demand indicator | Enrollment vs. capacity | Waitlist size |
| Funding | Local + state | Lottery funds + tuition + grants |
