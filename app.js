/**
 * CAVRIX NIS2 Readiness Assessment
 * Logic strictly based on § 30 and § 38 BSIG n.F. (NIS2-Umsetzungsgesetz, 6. Dez 2025)
 */

const measuresData = [
    {
        id: 'isms',
        title: 'Risk Analysis & ISMS',
        desc: 'Policies and processes for information security risk management (e.g. ISO 27001).',
        bsig_ref: '§ 30 Abs. 2 Nr. 1 BSIG'
    },
    {
        id: 'incident',
        title: 'Incident Handling',
        desc: 'Documented process for detecting, responding to, and reporting cybersecurity incidents.',
        bsig_ref: '§ 30 Abs. 2 Nr. 2 BSIG'
    },
    {
        id: 'bcm',
        title: 'Business Continuity',
        desc: 'Business continuity planning, crisis management, and regularly tested backups.',
        bsig_ref: '§ 30 Abs. 2 Nr. 3 BSIG'
    },
    {
        id: 'supply',
        title: 'Supply Chain Security',
        desc: 'Security measures covering suppliers and third-party service providers.',
        bsig_ref: '§ 30 Abs. 2 Nr. 4 BSIG'
    },
    {
        id: 'hr_access',
        title: 'Personnel & Access Control',
        desc: 'Policies covering personnel security, access management, and asset management.',
        bsig_ref: '§ 30 Abs. 2 Nr. 6 BSIG'
    },
    {
        id: 'crypto',
        title: 'Cryptography',
        desc: 'Policies governing the use of cryptography and encryption.',
        bsig_ref: '§ 30 Abs. 2 Nr. 7 BSIG'
    },
    {
        id: 'mfa',
        title: 'Multi-Factor Authentication (MFA)',
        desc: 'MFA or continuous authentication enabled for all critical systems.',
        bsig_ref: '§ 30 Abs. 2 Nr. 10 BSIG'
    },
    {
        id: 'training',
        title: 'Management Training',
        desc: 'Documented cybersecurity awareness and governance training for senior management.',
        bsig_ref: '§ 38 Abs. 3 BSIG'
    }
];

const sectorNames = {
    energy: "Energy",
    transport: "Transport",
    banking: "Banking & Financial Services",
    health: "Healthcare",
    water: "Water Supply & Wastewater",
    digital_infra: "Digital Infrastructure",
    b2b_ict: "B2B ICT Services",
    space: "Space",
    postal: "Postal & Courier Services",
    waste: "Waste Management",
    chemicals: "Chemicals",
    food: "Food Production",
    manufacturing: "Manufacturing",
    digital_provider: "Digital Service Providers",
    research: "Research",
    none: "None of the listed sectors"
};

const app = {
    state: {
        company: '',
        sector: '',
        employees: '',
        turnover: '',
        measures: new Set()
    },

    init() {
        this.render('intro');
    },

    render(templateId) {
        const view = document.getElementById('app-view');
        const tmpl = document.getElementById(`tmpl-${templateId}`);
        if (!view || !tmpl) return;

        view.innerHTML = '';
        view.appendChild(tmpl.content.cloneNode(true));

        // Setup specific views after render
        if (templateId === 'step2') this.setupStep2();
        if (templateId === 'results') this.setupResults();
    },

    startCheck() {
        // Reset state on start
        this.state = { company: '', sector: '', employees: '', turnover: '', measures: new Set() };
        this.render('step1');
    },

    submitStep1() {
        const company = document.getElementById('input-company').value.trim();
        const s = document.getElementById('input-sector').value;
        const e = document.getElementById('input-employees').value;
        const t = document.getElementById('input-turnover').value;
        const err = document.getElementById('error-step1');
        
        if (!s || !e || !t) {
            err.textContent = 'Please complete all three fields.';
            return;
        }

        err.textContent = '';
        this.state.company = company;
        this.state.sector = s;
        this.state.employees = e;
        this.state.turnover = t;
        
        this.render('step2');
    },

    setupStep2() {
        const container = document.getElementById('measures-list');
        container.innerHTML = '';

        measuresData.forEach(m => {
            const el = document.createElement('label');
            el.className = 'check-item';
            
            // Restore previous state if any
            const isChecked = this.state.measures.has(m.id);
            if (isChecked) el.classList.add('selected');

            el.innerHTML = `
                <input type="checkbox" class="check-input" value="${m.id}" ${isChecked ? 'checked' : ''}>
                <div class="check-content">
                    <span class="check-title">${m.title}</span>
                    <span class="check-desc">${m.desc}</span>
                </div>
            `;

            // Toggle selected class on click
            const input = el.querySelector('input');
            input.addEventListener('change', (e) => {
                if (e.target.checked) {
                    el.classList.add('selected');
                    this.state.measures.add(m.id);
                } else {
                    el.classList.remove('selected');
                    this.state.measures.delete(m.id);
                }
            });

            container.appendChild(el);
        });
    },

    submitStep2() {
        this.render('results');
    },

    setupResults() {
        const { sector, employees, turnover, measures } = this.state;
        
        // NIS2 Size Threshold Logic (Mittelstand rule)
        // 50+ employees OR >€10M turnover
        const meetsSizeThreshold = (employees === 'medium' || employees === 'large' || turnover === 'medium' || turnover === 'large');
        
        const isAffected = sector !== 'none' && meetsSizeThreshold;
        
        this.renderHeader(isAffected);
        this.renderRationale(isAffected, sector, employees, turnover);
        
        if (isAffected) {
            this.renderGaps(measures);
        }
    },

    renderHeader(isAffected) {
        const header = document.getElementById('res-header');
        if (isAffected) {
            header.innerHTML = `
                <div class="res-header-card affected">
                    <div class="res-status-label text-red">NIS2 Requirements Apply</div>
                    <h2 class="res-status-title">Your Organisation Is Likely Within the Scope of NIS2</h2>
                    <p class="mt-4 text-secondary text-sm">Based on the information you provided, your organisation appears to meet the sector and size criteria commonly associated with NIS2. This assessment is indicative only and should be confirmed through a formal legal and compliance review.</p>
                </div>
            `;
        } else {
            header.innerHTML = `
                <div class="res-header-card safe">
                    <div class="res-status-label text-green">No Immediate NIS2 Obligation</div>
                    <h2 class="res-status-title">Your organisation is unlikely to fall within the current scope of NIS2.</h2>
                    <p class="mt-4 text-secondary text-sm">Even if your organisation is not directly regulated, customers operating under NIS2 may still require equivalent cybersecurity controls as part of their supplier risk management.</p>
                </div>
            `;
        }
    },

    renderRationale(isAffected, sector, employees, turnover) {
        const rationale = document.getElementById('res-rationale');
        
        const sectorStr = sectorNames[sector];
        let sizeStr = "";
        
        if (employees === 'small' && turnover === 'small') {
            sizeStr = "Small Organisation (fewer than 50 employees and less than €10 million annual revenue)";
        } else {
            sizeStr = "Medium or Large Organisation (meets the NIS2 size threshold)";
        }

        const companyName = this.state.company || "Your organisation";

let text = `<strong>Organisation:</strong> ${companyName}<br><br>`;

text += `Based on your responses, ${companyName} operates in the <strong>${sectorStr}</strong> sector and is classified as a <strong>${sizeStr}</strong>.<br><br>`;

        if (isAffected) {
            text += `Based on the selected sector and organisation size, your organisation appears likely to fall within the scope of the NIS2 Directive. A formal legal assessment should be carried out to confirm your obligations and determine the appropriate compliance measures.`;
        } else if (sector === 'none') {
            text += `The selected sector is not currently listed within Annex I or Annex II of the NIS2 Directive. Based on your responses, your organisation is unlikely to be directly subject to NIS2 requirements.`;
        } else {
            text += `Although your sector is covered by NIS2, the organisation size you selected falls below the general size threshold. As a result, your organisation is unlikely to be directly in scope based on the information provided.`;
        }
        
        rationale.innerHTML = text;
    },

    renderGaps(userMeasures) {
        const gapsContainer = document.getElementById('res-gaps-container');
        const coveredContainer = document.getElementById('res-covered-container');
        const gapsList = document.getElementById('res-gaps-list');
        const coveredList = document.getElementById('res-covered-list');
        
        gapsContainer.style.display = 'block';
        coveredContainer.style.display = 'block';
        
        let hasGaps = false;
        let hasCovered = false;

        measuresData.forEach(m => {
            if (userMeasures.has(m.id)) {
                hasCovered = true;
                const li = document.createElement('li');
                li.className = 'covered-item';
                li.innerHTML = `<strong>${m.title}</strong> <span class="text-muted text-sm ml-2">(${m.bsig_ref})</span>`;
                coveredList.appendChild(li);
            } else {
                hasGaps = true;
                const li = document.createElement('li');
                li.className = 'gap-item';
                li.innerHTML = `<strong>Missing: ${m.title}</strong><br><span class="text-muted text-sm">${m.desc}<br>Reference: ${m.bsig_ref}</span>`;
                gapsList.appendChild(li);
            }
        });

        if (!hasGaps) {
            gapsList.innerHTML = `<li class="gap-item" style="color: var(--brand-teal);">No immediate compliance gaps were identified. Great job!</li>`;
        }
        
        if (!hasCovered) {
            coveredList.innerHTML = `<li class="covered-item" style="color: var(--text-muted);">No documented security measures were selected.</li>`;
        }
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
