# CAVRIX NIS2 Readiness Assessment

A lightweight web application built as part of the CAVRIX Founder Associate case study.

The application helps organisations quickly assess whether they are likely to fall within the scope of the NIS2 Directive and identify potential cybersecurity compliance gaps based on their current security measures.

---

## Live Demo

[(Add your Vercel URL here after deployment)](https://cavrix-nis2-readiness-check.vercel.app)

---

## Features

- NIS2 sector and size assessment
- Organisation profile collection
- Optional organisation name
- Security measures checklist
- Compliance gap analysis
- References mapped to the German BSIG
- Fully client-side (no backend required)

---

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Vercel (Deployment)

---

## Project Structure

```
.
├── index.html
├── style.css
├── app.js
└── README.md
```

---

## Running Locally

Simply open `index.html` in any modern web browser.

No installation, dependencies, or backend services are required.

---

## Example Test Paths

### Likely In Scope

- Sector: Manufacturing
- Employees: 50–249
- Annual Revenue: €10–50 Million
- Select only a few implemented security measures

Expected Result:

- NIS2 Requirements Apply
- Compliance gap report
- Missing security controls with BSIG references

### Likely Out of Scope

- Sector: Manufacturing
- Employees: Fewer than 50
- Annual Revenue: Less than €10 Million

Expected Result:

- No Immediate NIS2 Obligation

---

## Compliance Logic

The assessment follows the general NIS2 size threshold and maps security controls to the corresponding provisions of the German BSIG.

The application is intended as an indicative readiness assessment and is **not** a substitute for legal or compliance advice.

---

## About

This project was created as part of the CAVRIX Founder Associate Case Study.green safe status.

### Grounded Logic:
Every output is directly mapped to the explicit requirements of **§ 30 Abs. 2 BSIG** and the size thresholds established by the NIS2UmsuCG (in force Dec 6, 2025). The app does not invent recommendations; it explicitly maps missing items back to the law.
