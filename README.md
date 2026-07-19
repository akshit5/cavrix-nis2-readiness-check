# CAVRIX Case Study Deliverables

This project contains the deliverables for the CAVRIX case study, an AI-native Managed IT, Cybersecurity, and Compliance platform targeting the German Mittelstand. 

## Structure

```text
cavrix-project/
├── cavrix-founder-memo.html       # Print-ready, editorial version of the Founder Memo
├── cavrix-founder-memo.md         # Markdown version of the Founder Memo
├── README.md                      # This file
└── cavrix-nis2-check/             # The Product Slice (Mini-App)
    ├── index.html                 # Main application UI
    ├── style.css                  # Premium dark-theme design system
    └── app.js                     # Grounded NIS2 compliance logic engine
```

## 1. The Founder Memo (`cavrix-founder-memo.html`)
A sharp, honest one-page analysis of the business mechanics behind CAVRIX. 
- **The Wedge:** Proposes a fixed-price **NIS2 Readiness Audit** as the entry point to capitalize on personal liability fear and generate the necessary asset map.
- **The Moat:** Argues that AI alone is not a moat. The true moats are the **compliance ledger** (a documented audit trail) and the **operational memory** built into the platform over time.
- **The Model:** Details how an AI-native approach flips the traditional 65-70% labor cost of an MSSP by using AI for triage and sharing specialist human oversight across clients.

## 2. The Product Slice (`cavrix-nis2-check/`)
A minimal, grounded **"Are you NIS2-compliant?"** mini-check web application. 

### How to use it:
1. Open `cavrix-nis2-check/index.html` in any modern web browser.
2. The application is completely local and runs on client-side JS (no backend required).
3. **Test Path A (Affected):** Select "Verarbeitendes Gewerbe", "50-249 Mitarbeitende", and "10-50 Mio. €". Check only 1 or 2 boxes on the next page to see the red warning and precise gap list.
4. **Test Path B (Unaffected):** Select an affected sector but choose "< 50 Mitarbeitende" and "< 10 Mio. €" to see the green safe status.

### Grounded Logic:
Every output is directly mapped to the explicit requirements of **§ 30 Abs. 2 BSIG** and the size thresholds established by the NIS2UmsuCG (in force Dec 6, 2025). The app does not invent recommendations; it explicitly maps missing items back to the law.
