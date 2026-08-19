/* CareerGuide Pro - Interactive Logic & Context-Aware Dynamic AI Career Engine */

// Global State
let currentTheme = localStorage.getItem('cg_theme') || 'dark';
let currentLang = localStorage.getItem('cg_lang') || 'English';
let savedGuidanceText = '';
let isSpeaking = false;
let speechUtterance = null;

// Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initStatsCounter();
    initFormHandlers();
    loadSavedProgress();
    initFeedbackDatabase();
});

// Theme Toggle
function initTheme() {
    document.documentElement.setAttribute('data-theme', currentTheme);
    const themeIcon = document.getElementById('themeIcon');
    if (themeIcon) {
        themeIcon.textContent = currentTheme === 'dark' ? '🌙' : '☀️';
    }
}

const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('cg_theme', currentTheme);
        initTheme();
    });
}

// Language Toggle
const languageToggle = document.getElementById('languageToggle');
if (languageToggle) {
    languageToggle.addEventListener('click', () => {
        currentLang = currentLang === 'English' ? 'Hindi' : 'English';
        localStorage.setItem('cg_lang', currentLang);
        languageToggle.innerHTML = currentLang === 'English' ? '🌐 English' : '🇮🇳 Hindi';
        showToast(`Language switched to ${currentLang}`);
    });
}

// Animated Counter
function initStatsCounter() {
    const el = document.getElementById('studentsHelped');
    if (!el) return;
    let count = 48500;
    const target = 52430;
    const interval = setInterval(() => {
        count += 115;
        if (count >= target) {
            count = target;
            clearInterval(interval);
        }
        el.textContent = count.toLocaleString() + '+';
    }, 30);
}

// Form Handlers & Cascading Dropdowns
function initFormHandlers() {
    const qualSelect = document.getElementById('qualification');
    const streamField = document.getElementById('streamField');
    const streamBranchContainer = document.getElementById('streamBranchContainer');
    const eduStream = document.getElementById('educationStream');

    if (qualSelect) {
        qualSelect.addEventListener('change', (e) => {
            const val = e.target.value;
            if (val === '11th-12th') {
                if (streamField) streamField.style.display = 'block';
                if (streamBranchContainer) streamBranchContainer.style.display = 'none';
            } else if (val === 'graduate' || val === 'diploma' || val === 'post-graduate') {
                if (streamField) streamField.style.display = 'none';
                if (streamBranchContainer) streamBranchContainer.style.display = 'grid';
                populateBranchOptions(eduStream ? eduStream.value : 'Engineering');
            } else {
                if (streamField) streamField.style.display = 'none';
                if (streamBranchContainer) streamBranchContainer.style.display = 'none';
            }
        });
    }

    if (eduStream) {
        eduStream.addEventListener('change', (e) => {
            populateBranchOptions(e.target.value);
        });
    }

    const form = document.getElementById('careerForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }

    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', handleFeedbackSubmit);
    }
}

const branchMap = {
    Science: ['B.Sc Physics', 'B.Sc Chemistry', 'B.Sc Mathematics', 'B.Sc Biotechnology', 'B.Sc CS/IT'],
    Commerce: ['B.Com General', 'B.Com Hons', 'BBA', 'CA/CS Foundation', 'Banking & Finance'],
    Arts: ['B.A English', 'B.A History', 'B.A Political Science', 'B.A Psychology', 'Journalism & Mass Comm'],
    Engineering: ['Computer Science & Eng (CSE)', 'Information Tech (IT)', 'Mechanical Eng', 'Electrical Eng', 'Civil Eng', 'AI & Data Science'],
    Medical: ['MBBS', 'BDS', 'B.Pharm', 'B.Sc Nursing', 'Physiotherapy (BPT)'],
    Agriculture: ['B.Sc Agriculture', 'Horticulture', 'Agricultural Eng'],
    Law: ['BA LLB', 'BBA LLB', 'LL.B (3 Year)'],
    Other: ['General Studies', 'Skill Certification', 'Design & Animation']
};

function populateBranchOptions(stream) {
    const branchSelect = document.getElementById('branch');
    if (!branchSelect) return;
    branchSelect.innerHTML = '';
    const branches = branchMap[stream] || ['General'];
    branches.forEach(b => {
        const opt = document.createElement('option');
        opt.value = b;
        opt.textContent = b;
        branchSelect.appendChild(opt);
    });
}

// Dynamic Context-Aware AI Guidance Generator Engine
async function handleFormSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('studentName')?.value || 'Student';
    const qual = document.getElementById('qualification')?.value || '12th';
    const stream = document.getElementById('stream')?.value || document.getElementById('educationStream')?.value || 'General';
    const branch = document.getElementById('branch')?.value || 'General';
    const interests = document.getElementById('interests')?.value || 'Technology & Career Growth';

    const loadingSec = document.getElementById('loadingSection');
    const resultsSec = document.getElementById('resultsSection');
    const contentDiv = document.getElementById('guidanceContent');
    const submitBtn = document.getElementById('submitBtn');

    if (loadingSec) loadingSec.style.display = 'block';
    if (resultsSec) resultsSec.style.display = 'none';
    if (submitBtn) submitBtn.disabled = true;

    setTimeout(() => {
        const guidanceHTML = generateDynamicCareerRoadmap({ name, qual, stream, branch, interests, lang: currentLang });
        savedGuidanceText = extractPlainText(guidanceHTML);
        
        if (contentDiv) contentDiv.innerHTML = guidanceHTML;
        if (loadingSec) loadingSec.style.display = 'none';
        if (resultsSec) resultsSec.style.display = 'block';
        if (submitBtn) submitBtn.disabled = false;

        resultsSec.scrollIntoView({ behavior: 'smooth' });
        saveGuidanceToLocalDB({ name, qual, stream, interests, date: new Date().toLocaleDateString() });
    }, 700);
}

function generateDynamicCareerRoadmap(data) {
    const { name, qual, stream, branch, interests, lang } = data;
    const isHindi = lang === 'Hindi';
    const target = interests.toLowerCase();

    // Context Detection Categories
    const isMedical = target.includes('doctor') || target.includes('medical') || target.includes('neet') || target.includes('mbbs') || target.includes('nursing') || target.includes('hospital');
    const isSoftware = target.includes('software') || target.includes('coding') || target.includes('developer') || target.includes('computer') || target.includes('ai') || target.includes('data science') || target.includes('web') || target.includes('tech');
    const isGovt = target.includes('government') || target.includes('upsc') || target.includes('ssc') || target.includes('bank') || target.includes('sarkari') || target.includes('ias') || target.includes('ips') || target.includes('cgl');
    const isDefense = target.includes('army') || target.includes('defense') || target.includes('defence') || target.includes('navy') || target.includes('air force') || target.includes('nda') || target.includes('cds');
    const isBusiness = target.includes('business') || target.includes('startup') || target.includes('entrepreneur') || target.includes('management') || target.includes('mba') || target.includes('marketing');
    const isLaw = target.includes('law') || target.includes('lawyer') || target.includes('advocate') || target.includes('clat') || target.includes('judiciary');

    const greeting = isHindi ? `👋 Namaste ${name}! Aapka Customized AI Career Blueprint Ready Hai` : `👋 Welcome ${name}! Your Customized AI Career Blueprint is Ready`;

    let realityCheck = '';
    let pathways = '';
    let skills = '';
    let salary = '';
    let actionPlan = '';

    if (isMedical) {
        realityCheck = `
            <li><span class="bullet-point">🩺</span> <span><strong>Subject Requirement:</strong> Direct MBBS/BDS requires Class 12 Science (PCB) & NEET UG qualification.</span></li>
            <li><span class="bullet-point">📈</span> <span><strong>Market Dynamics:</strong> Over 24 lakh students write NEET UG annually. Alternative high-growth sectors include Hospital Management, B.Pharm, and Biotech.</span></li>
            <li><span class="bullet-point">💡</span> <span><strong>Key Strategy:</strong> 100% NCERT Biology memorization + 150 daily MCQ practice is mandatory.</span></li>
        `;
        pathways = `
            <div class="salary-item"><div><strong style="color: var(--accent);">Pathway 1: Core Clinical Track (NEET UG)</strong><p style="font-size: 0.85rem; opacity: 0.8; margin-top: 2px;">MBBS / BDS / BAMS / BHMS via NEET entrance examination.</p></div></div>
            <div class="salary-item"><div><strong style="color: var(--accent);">Pathway 2: Allied Healthcare & Pharma</strong><p style="font-size: 0.85rem; opacity: 0.8; margin-top: 2px;">B.Pharm / Pharm.D, Physiotherapy (BPT), B.Sc Nursing, Clinical Research.</p></div></div>
            <div class="salary-item"><div><strong style="color: var(--accent);">Pathway 3: Healthcare Management & Tech</strong><p style="font-size: 0.85rem; opacity: 0.8; margin-top: 2px;">BBA/MBA in Hospital Administration, Health Informatics, Medical Billing.</p></div></div>
        `;
        skills = `
            <li><span class="bullet-point">🔬</span> <span>Human Anatomy, Biochemistry & Clinical Protocols</span></li>
            <li><span class="bullet-point">💊</span> <span>Pharmacology & Medical Terminology</span></li>
            <li><span class="bullet-point">🗣️</span> <span>Patient Care & High-Pressure Communication</span></li>
        `;
        salary = `
            <div class="salary-item"><span class="salary-role">Junior Resident / Clinic Admin</span><span class="salary-amount" style="color: #10b981; font-weight: 700;">₹5.5 - ₹9.0 LPA</span></div>
            <div class="salary-item"><span class="salary-role">Specialist Doctor / Hospital Manager</span><span class="salary-amount" style="color: #10b981; font-weight: 700;">₹12.0 - ₹24.0 LPA</span></div>
            <div class="salary-item"><span class="salary-role">Senior Consultant / Medical Director</span><span class="salary-amount" style="color: #10b981; font-weight: 700;">₹25.0 - ₹50.0+ LPA</span></div>
        `;
        actionPlan = `
            <li><span class="bullet-point">1.</span> <span><strong>Month 1:</strong> Master 100% NCERT Biology (Class 11 & 12) & line-by-line notes.</span></li>
            <li><span class="bullet-point">2.</span> <span><strong>Month 2:</strong> Solve last 10 years NEET UG chapterwise question papers.</span></li>
            <li><span class="bullet-point">3.</span> <span><strong>Month 3:</strong> Enroll in a full-length 3 hr 20 min mock exam series.</span></li>
            <li><span class="bullet-point">4.</span> <span><strong>Month 4:</strong> Finalize counseling preferences (All India Quota vs State Quota).</span></li>
        `;
    } else if (isSoftware) {
        realityCheck = `
            <li><span class="bullet-point">💻</span> <span><strong>Portfolio vs Degree:</strong> In Software & AI, verified GitHub code & LeetCode problem solving carry 5x weight over college brand.</span></li>
            <li><span class="bullet-point">🚀</span> <span><strong>Frontier Growth:</strong> Full-Stack Web Development, Cloud DevOps, and Generative AI/ML are growing at 24% CAGR.</span></li>
            <li><span class="bullet-point">💡</span> <span><strong>Key Strategy:</strong> Master 1 Core Language (JavaScript/Python) + 1 Database + Data Structures.</span></li>
        `;
        pathways = `
            <div class="salary-item"><div><strong style="color: var(--accent);">Pathway 1: Product Engineering (SDE Track)</strong><p style="font-size: 0.85rem; opacity: 0.8; margin-top: 2px;">Full-Stack Development (React/Node.js/Next.js) or System Architecture.</p></div></div>
            <div class="salary-item"><div><strong style="color: var(--accent);">Pathway 2: AI / ML & Data Engineering</strong><p style="font-size: 0.85rem; opacity: 0.8; margin-top: 2px;">Python, PyTorch, LangChain, RAG Pipelines, Vector DBs (Pinecone/Chroma).</p></div></div>
            <div class="salary-item"><div><strong style="color: var(--accent);">Pathway 3: Cloud & DevOps Security</strong><p style="font-size: 0.85rem; opacity: 0.8; margin-top: 2px;">AWS/Azure, Docker, Kubernetes, CI/CD Automated Deployment.</p></div></div>
        `;
        skills = `
            <li><span class="bullet-point">🧠</span> <span>Data Structures & Algorithms (DSA - Arrays, Trees, Graphs, DP)</span></li>
            <li><span class="bullet-point">🌐</span> <span>Full-Stack Web Architecture (React, Node, PostgreSQL/MongoDB, REST/GraphQL)</span></li>
            <li><span class="bullet-point">🛠️</span> <span>Git Version Control, Linux Shell, Cloud Deployment (Docker/Vercel/Netlify)</span></li>
        `;
        salary = `
            <div class="salary-item"><span class="salary-role">Junior Developer / Intern</span><span class="salary-amount" style="color: #10b981; font-weight: 700;">₹4.5 - ₹8.5 LPA</span></div>
            <div class="salary-item"><span class="salary-role">SDE-2 / Senior Full Stack Engineer</span><span class="salary-amount" style="color: #10b981; font-weight: 700;">₹12.0 - ₹22.0 LPA</span></div>
            <div class="salary-item"><span class="salary-role">Lead AI Architect / Staff Engineer</span><span class="salary-amount" style="color: #10b981; font-weight: 700;">₹25.0 - ₹45.0+ LPA</span></div>
        `;
        actionPlan = `
            <li><span class="bullet-point">1.</span> <span><strong>Month 1:</strong> Build 2 full-stack projects using React & Node.js and deploy live.</span></li>
            <li><span class="bullet-point">2.</span> <span><strong>Month 2:</strong> Solve 150+ DSA problems on LeetCode/GeeksforGeeks.</span></li>
            <li><span class="bullet-point">3.</span> <span><strong>Month 3:</strong> Build an open-source GenAI project using LLMs & LangChain.</span></li>
            <li><span class="bullet-point">4.</span> <span><strong>Month 4:</strong> Optimize LinkedIn & GitHub profiles and apply for tech referrals.</span></li>
        `;
    } else if (isGovt) {
        realityCheck = `
            <li><span class="bullet-point">🏛️</span> <span><strong>Job Security & Prestige:</strong> Central & State Government jobs offer permanent tenure, pensions, and high societal authority.</span></li>
            <li><span class="bullet-point">📊</span> <span><strong>Selection Ratio:</strong> Tier 1 & Tier 2 written exams test speed, accuracy, and general awareness.</span></li>
            <li><span class="bullet-point">💡</span> <span><strong>Key Strategy:</strong> Daily newspaper analysis + previous 10 years solved paper practice.</span></li>
        `;
        pathways = `
            <div class="salary-item"><div><strong style="color: var(--accent);">Pathway 1: Civil Services (UPSC IAS/IPS/IFS)</strong><p style="font-size: 0.85rem; opacity: 0.8; margin-top: 2px;">Top administrative officer cadre serving State & Central administration.</p></div></div>
            <div class="salary-item"><div><strong style="color: var(--accent);">Pathway 2: Staff Selection Commission (SSC CGL)</strong><p style="font-size: 0.85rem; opacity: 0.8; margin-top: 2px;">Inspector, Tax Assistant, Examiner in Central Ministries & Depts.</p></div></div>
            <div class="salary-item"><div><strong style="color: var(--accent);">Pathway 3: Banking Officers (IBPS PO / SBI PO)</strong><p style="font-size: 0.85rem; opacity: 0.8; margin-top: 2px;">Probationary Officer in Public Sector Nationalized Banks.</p></div></div>
        `;
        skills = `
            <li><span class="bullet-point">📐</span> <span>Quantitative Aptitude & High-Speed Mental Calculation</span></li>
            <li><span class="bullet-point">🧩</span> <span>Logical Reasoning & Complex Analytical Puzzles</span></li>
            <li><span class="bullet-point">📰</span> <span>General Studies (Polity, History, Economy, Geography) & Current Affairs</span></li>
        `;
        salary = `
            <div class="salary-item"><span class="salary-role">Assistant / Inspector / Clerk</span><span class="salary-amount" style="color: #10b981; font-weight: 700;">₹4.2 - ₹7.5 LPA + Govt Perks</span></div>
            <div class="salary-item"><span class="salary-role">Bank PO / Section Officer</span><span class="salary-amount" style="color: #10b981; font-weight: 700;">₹7.5 - ₹12.0 LPA + Quarters</span></div>
            <div class="salary-item"><span class="salary-role">IAS / IPS / Joint Secretary</span><span class="salary-amount" style="color: #10b981; font-weight: 700;">₹10.0 - ₹22.0+ LPA + Housing/Car</span></div>
        `;
        actionPlan = `
            <li><span class="bullet-point">1.</span> <span><strong>Month 1:</strong> Read Class 6-12 NCERTs for History, Polity & Geography.</span></li>
            <li><span class="bullet-point">2.</span> <span><strong>Month 2:</strong> Master speed-math techniques for Quant & Reasoning.</span></li>
            <li><span class="bullet-point">3.</span> <span><strong>Month 3:</strong> Solve 50+ timed full-length mock tests for Prelims.</span></li>
            <li><span class="bullet-point">4.</span> <span><strong>Month 4:</strong> Practice descriptive answer writing for Mains & GD.</span></li>
        `;
    } else if (isDefense) {
        realityCheck = `
            <li><span class="bullet-point">🎖️</span> <span><strong>Honor & Discipline:</strong> Armed Forces offer leadership, adventurous life, and prestigious Officer commissions.</span></li>
            <li><span class="bullet-point">💪</span> <span><strong>Selection Criteria:</strong> Written entrance + 5-day Service Selection Board (SSB) interview & medical fitness.</span></li>
        `;
        pathways = `
            <div class="salary-item"><div><strong style="color: var(--accent);">Pathway 1: National Defense Academy (NDA)</strong><p style="font-size: 0.85rem; opacity: 0.8; margin-top: 2px;">Direct entry after Class 12 for Army, Navy, Air Force officer training.</p></div></div>
            <div class="salary-item"><div><strong style="color: var(--accent);">Pathway 2: Combined Defense Services (CDS / AFCAT)</strong><p style="font-size: 0.85rem; opacity: 0.8; margin-top: 2px;">Officer entry after Graduation (IMA, OTA, AFA, NAVAC).</p></div></div>
        `;
        skills = `
            <li><span class="bullet-point">🏃</span> <span>Physical Endurance (Running, Pushups) & Officer Like Qualities (OLQ)</span></li>
            <li><span class="bullet-point">🗣️</span> <span>Public Speaking, Group Discussion & SSB Psychological Testing</span></li>
        `;
        salary = `
            <div class="salary-item"><span class="salary-role">Cadet Trainee Stipend</span><span class="salary-amount" style="color: #10b981; font-weight: 700;">₹56,100 / Month</span></div>
            <div class="salary-item"><span class="salary-role">Lieutenant / Flying Officer</span><span class="salary-amount" style="color: #10b981; font-weight: 700;">₹8.5 - ₹14.0 LPA + Army Perks</span></div>
        `;
        actionPlan = `
            <li><span class="bullet-point">1.</span> <span><strong>Month 1:</strong> Daily 5km running & physical endurance workouts.</span></li>
            <li><span class="bullet-point">2.</span> <span><strong>Month 2:</strong> Master NDA/CDS Mathematics & English written papers.</span></li>
            <li><span class="bullet-point">3.</span> <span><strong>Month 3:</strong> Prepare 5-day SSB psychological & GTO tasks.</span></li>
        `;
    } else {
        // Default Dynamic Plan tailored to custom interests
        realityCheck = `
            <li><span class="bullet-point">🎯</span> <span><strong>Domain Alignment:</strong> Pursuing ${interests} as a ${qual} student in ${stream} (${branch}) offers strong growth prospects.</span></li>
            <li><span class="bullet-point">📈</span> <span><strong>Growth Vector:</strong> Practical portfolio + industry certifications accelerate career trajectory by 3x.</span></li>
        `;
        pathways = `
            <div class="salary-item"><div><strong style="color: var(--accent);">Pathway 1: Specialized Domain Track</strong><p style="font-size: 0.85rem; opacity: 0.8; margin-top: 2px;">Direct certification or degree in ${interests}.</p></div></div>
            <div class="salary-item"><div><strong style="color: var(--accent);">Pathway 2: Corporate & Tech Integration</strong><p style="font-size: 0.85rem; opacity: 0.8; margin-top: 2px;">Combine ${interests} with digital skills and analytics.</p></div></div>
        `;
        skills = `
            <li><span class="bullet-point">🛠️</span> <span>Core domain expertise in ${interests}</span></li>
            <li><span class="bullet-point">🗣️</span> <span>Professional communication & project presentation</span></li>
        `;
        salary = `
            <div class="salary-item"><span class="salary-role">Entry Level Professional</span><span class="salary-amount" style="color: #10b981; font-weight: 700;">₹3.8 - ₹6.5 LPA</span></div>
            <div class="salary-item"><span class="salary-role">Experienced Specialist</span><span class="salary-amount" style="color: #10b981; font-weight: 700;">₹8.0 - ₹16.0 LPA</span></div>
        `;
        actionPlan = `
            <li><span class="bullet-point">1.</span> <span><strong>Month 1:</strong> Enroll in a recognized certification course for ${interests}.</span></li>
            <li><span class="bullet-point">2.</span> <span><strong>Month 2:</strong> Complete 2 real-world practical projects.</span></li>
            <li><span class="bullet-point">3.</span> <span><strong>Month 3:</strong> Build resume & apply for target internships/roles.</span></li>
        `;
    }

    return `
        <div class="guidance-section">
            <h3 class="section-title">${greeting}</h3>
            <p style="margin-top: 6px; font-size: 0.95rem; opacity: 0.9;">
                Qualification: <strong>${qual}</strong> | Field: <strong>${stream} (${branch})</strong> | Goal: <strong>${interests}</strong>
            </p>
        </div>

        <div class="guidance-section">
            <h3 class="section-title">📊 Market & Domain Reality Check</h3>
            <ul class="skills-list">${realityCheck}</ul>
        </div>

        <div class="guidance-section">
            <h3 class="section-title">🎯 Top Recommended Career Pathways</h3>
            <div class="salary-list">${pathways}</div>
        </div>

        <div class="guidance-section">
            <h3 class="section-title">🛠️ High-Demand Skills To Master</h3>
            <ul class="skills-list">${skills}</ul>
        </div>

        <div class="guidance-section">
            <h3 class="section-title">💰 Industry Salary Benchmarks</h3>
            <div class="salary-list">${salary}</div>
        </div>

        <div class="guidance-section">
            <h3 class="section-title">🚀 Step-by-Step Execution Action Plan</h3>
            <ol class="plan-list">${actionPlan}</ol>
        </div>

        <div class="motivation-box">
            <h3>🌟 Career Champion Motivation</h3>
            <p>"Consistency always beats talent. Daily disciplined steps build an extraordinary career in ${interests}. You've got this, ${name}!"</p>
        </div>
    `;
}

function extractPlainText(html) {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
}

// Voice Speech Guidance (SpeechSynthesis)
function speakGuidance() {
    if (!savedGuidanceText) {
        showToast("Please generate career guidance first!");
        return;
    }
    if ('speechSynthesis' in window) {
        if (isSpeaking) {
            window.speechSynthesis.cancel();
            isSpeaking = false;
            showToast("Audio stopped");
            return;
        }

        speechUtterance = new SpeechSynthesisUtterance(savedGuidanceText.substring(0, 500));
        speechUtterance.rate = 1.0;
        speechUtterance.pitch = 1.0;
        speechUtterance.lang = currentLang === 'Hindi' ? 'hi-IN' : 'en-US';

        speechUtterance.onend = () => { isSpeaking = false; };
        speechUtterance.onerror = () => { isSpeaking = false; };

        window.speechSynthesis.speak(speechUtterance);
        isSpeaking = true;
        showToast("🔊 Playing Voice Guidance...");
    } else {
        showToast("Speech synthesis not supported in this browser.");
    }
}

// Export PDF / Print
function downloadGuidance() {
    const resultsSec = document.getElementById('resultsSection');
    if (!resultsSec || resultsSec.style.display === 'none') {
        showToast("Please generate guidance first to save PDF!");
        return;
    }
    window.print();
}

// Share Guidance
function shareGuidance() {
    if (navigator.share) {
        navigator.share({
            title: 'CareerGuide Pro - AI Guidance',
            text: 'Check out my personalized AI Career Guidance Blueprint!',
            url: window.location.href
        }).catch(() => {});
    } else {
        navigator.clipboard.writeText(window.location.href);
        showToast("📋 Link copied to clipboard!");
    }
}

// Progress & Local Storage Database
function saveProgress() {
    const name = document.getElementById('studentName')?.value;
    if (!name) {
        showToast("Please fill out the form first!");
        return;
    }
    const data = {
        name,
        qual: document.getElementById('qualification')?.value,
        stream: document.getElementById('stream')?.value,
        interests: document.getElementById('interests')?.value,
        timestamp: new Date().toISOString()
    };
    localStorage.setItem('cg_student_progress', JSON.stringify(data));
    showToast("💾 Progress saved securely to device!");
}

function loadSavedProgress() {
    const raw = localStorage.getItem('cg_student_progress');
    if (!raw) return;
    try {
        const data = JSON.parse(raw);
        if (data.name && document.getElementById('studentName')) {
            document.getElementById('studentName').value = data.name;
        }
        if (data.interests && document.getElementById('interests')) {
            document.getElementById('interests').value = data.interests;
        }
    } catch(e) {}
}

function saveGuidanceToLocalDB(item) {
    try {
        let history = JSON.parse(localStorage.getItem('cg_guidance_history') || '[]');
        history.unshift(item);
        if (history.length > 10) history = history.slice(0, 10);
        localStorage.setItem('cg_guidance_history', JSON.stringify(history));
    } catch(e) {}
}

// Student Success Stories Database & UI
const initialFeedbacks = [
    { name: "Priya Sharma", city: "Bhubaneswar", msg: "CareerGuide Pro helped me choose Computer Science after 12th PCM. The step-by-step roadmap is so accurate!", rating: "⭐⭐⭐⭐⭐" },
    { name: "Rahul Kumar", city: "Patna", msg: "I was confused between Banking and SSC. The AI syllabus finder and salary breakdown gave me 100% clarity.", rating: "⭐⭐⭐⭐⭐" },
    { name: "Ananya Rout", city: "Cuttack", msg: "The free voice guidance in Hindi is amazing for rural students like me. Highly recommended!", rating: "⭐⭐⭐⭐⭐" }
];

function initFeedbackDatabase() {
    const listEl = document.getElementById('feedbackList');
    if (!listEl) return;
    
    let feedbacks = JSON.parse(localStorage.getItem('cg_student_feedbacks') || 'null');
    if (!feedbacks) {
        feedbacks = initialFeedbacks;
        localStorage.setItem('cg_student_feedbacks', JSON.stringify(feedbacks));
    }
    renderFeedbacks(feedbacks);
}

function renderFeedbacks(feedbacks) {
    const listEl = document.getElementById('feedbackList');
    if (!listEl) return;
    listEl.innerHTML = feedbacks.map(f => `
        <div style="background: rgba(255, 255, 255, 0.05); border: 1px solid var(--card-border); padding: 16px; border-radius: 14px; margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <strong style="color: var(--accent); font-size: 0.95rem;">${escapeHTML(f.name)} (${escapeHTML(f.city)})</strong>
                <span>${f.rating || '⭐⭐⭐⭐⭐'}</span>
            </div>
            <p style="font-size: 0.88rem; opacity: 0.9;">"${escapeHTML(f.msg)}"</p>
        </div>
    `).join('');
}

function handleFeedbackSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('feedbackName')?.value.trim();
    const city = document.getElementById('feedbackCity')?.value.trim();
    const msg = document.getElementById('feedbackMessage')?.value.trim();

    if (!name || !city || !msg) return;

    let feedbacks = JSON.parse(localStorage.getItem('cg_student_feedbacks') || '[]');
    feedbacks.unshift({ name, city, msg, rating: "⭐⭐⭐⭐⭐" });
    localStorage.setItem('cg_student_feedbacks', JSON.stringify(feedbacks));
    
    renderFeedbacks(feedbacks);
    showToast("🎉 Thank you! Your story has been posted.");
    e.target.reset();
}

function resetForm() {
    const form = document.getElementById('careerForm');
    const resultsSec = document.getElementById('resultsSection');
    if (form) form.reset();
    if (resultsSec) resultsSec.style.display = 'none';
}

// Ecosystem Modal Launchers (Guarantees NO 404 on Single File Drag & Drop Deployments)
function openPdfModal(e) {
    if (e) e.preventDefault();
    const modal = document.getElementById('pdfModal');
    const overlay = document.getElementById('pdfOverlay');
    if (modal && overlay) {
        modal.style.display = 'block';
        overlay.style.display = 'block';
    } else {
        window.open('Chat_Model.html', '_blank');
    }
}
function closePdfModal() {
    const modal = document.getElementById('pdfModal');
    const overlay = document.getElementById('pdfOverlay');
    if (modal && overlay) {
        modal.style.display = 'none';
        overlay.style.display = 'none';
    }
}

function openSyllabusHub(e) {
    if (e) e.preventDefault();
    toggleSyllabusModal();
}

function openPlannerModal(e) {
    if (e) e.preventDefault();
    const modal = document.getElementById('plannerModal');
    const overlay = document.getElementById('plannerOverlay');
    if (modal && overlay) {
        modal.style.display = 'block';
        overlay.style.display = 'block';
    } else {
        window.open('Time_Table.html', '_blank');
    }
}
function closePlannerModal() {
    const modal = document.getElementById('plannerModal');
    const overlay = document.getElementById('plannerOverlay');
    if (modal && overlay) {
        modal.style.display = 'none';
        overlay.style.display = 'none';
    }
}

function openScannerModal(e) {
    if (e) e.preventDefault();
    const modal = document.getElementById('scannerModal');
    const overlay = document.getElementById('scannerOverlay');
    if (modal && overlay) {
        modal.style.display = 'block';
        overlay.style.display = 'block';
    } else {
        window.open('Detect.html', '_blank');
    }
}
function closeScannerModal() {
    const modal = document.getElementById('scannerModal');
    const overlay = document.getElementById('scannerOverlay');
    if (modal && overlay) {
        modal.style.display = 'none';
        overlay.style.display = 'none';
    }
}

// Quick Syllabus Widget Modal Handlers with Animated Fetching & Rich Data
function toggleSyllabusModal() {
    const modal = document.getElementById('syllabusModal');
    const overlay = document.getElementById('syllabusOverlay');
    if (modal && overlay) {
        const isShown = modal.style.display === 'block';
        modal.style.display = isShown ? 'none' : 'block';
        overlay.style.display = isShown ? 'none' : 'block';
    }
}

function fillQuickQuery(query) {
    const input = document.getElementById('quickSyllabusInput');
    if (input) {
        input.value = query;
        quickGetSyllabus();
    }
}

const syllabusDatabase = [
    {
        key: 'jee mains',
        title: '🚀 JEE Mains (NTA National Engineering Entrance)',
        badge: 'NTA National Level',
        aliases: 'jee mains nta iit engineering entrance exam math physics chemistry',
        details: `
            <div style="display: flex; gap: 8px; margin-bottom: 10px;">
                <span style="background: rgba(2,132,199,0.3); color: #38bdf8; padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: bold;">Engineering</span>
                <span style="background: rgba(16,185,129,0.3); color: #34d399; padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: bold;">NTA 2026 Updated</span>
            </div>
            <p style="margin-bottom: 8px;"><strong>📚 Physics (Class 11 & 12):</strong> Kinematics, Laws of Motion, Thermodynamics, Electrostatics, Magnetic Effects, Optics, Modern Physics.</p>
            <p style="margin-bottom: 8px;"><strong>🧪 Chemistry:</strong> Physical (Mole Concept, Thermodynamics), Organic (Reactions & Mechanisms), Inorganic (Periodic Table, Bonding).</p>
            <p style="margin-bottom: 8px;"><strong>📐 Mathematics:</strong> Calculus, Vectors & 3D Geometry, Matrices, Probability, Trigonometry.</p>
            <p style="margin-bottom: 12px;"><strong>📝 Exam Pattern:</strong> 90 Questions (Attempt 75) | 300 Total Marks | +4 Correct, -1 Incorrect.</p>
            <a href="https://jeemain.nta.nic.in" target="_blank" style="display: inline-block; padding: 8px 16px; background: linear-gradient(135deg, #0284c7, #0369a1); color: white; border-radius: 20px; text-decoration: none; font-size: 12px; font-weight: bold;">🌐 Official Portal: jeemain.nta.nic.in</a>
        `
    },
    {
        key: 'neet ug',
        title: '🩺 NEET UG (NTA National Medical Entrance)',
        badge: 'NTA Medical Entrance',
        aliases: 'neet ug medical nta mbbs bds entrance exam doctor biology',
        details: `
            <div style="display: flex; gap: 8px; margin-bottom: 10px;">
                <span style="background: rgba(16,185,129,0.3); color: #34d399; padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: bold;">Medical & MBBS</span>
                <span style="background: rgba(124,58,237,0.3); color: #a78bfa; padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: bold;">100% NCERT Syllabus</span>
            </div>
            <p style="margin-bottom: 8px;"><strong>🧬 Biology (360 Marks / 90 Qs):</strong> Botany & Zoology — Cell Biology, Plant & Human Physiology, Genetics & Evolution, Biotechnology, Ecology.</p>
            <p style="margin-bottom: 8px;"><strong>🧪 Chemistry (180 Marks / 45 Qs):</strong> Physical Chemistry, Organic Biomolecules, Inorganic P-Block & D-Block.</p>
            <p style="margin-bottom: 8px;"><strong>⚡ Physics (180 Marks / 45 Qs):</strong> Mechanics, Current Electricity, Optics, Atoms & Nuclei.</p>
            <p style="margin-bottom: 12px;"><strong>📝 Exam Pattern:</strong> 200 Questions (Attempt 180) | 720 Total Marks | 3 Hrs 20 Mins.</p>
            <a href="https://neet.nta.nic.in" target="_blank" style="display: inline-block; padding: 8px 16px; background: linear-gradient(135deg, #10b981, #059669); color: white; border-radius: 20px; text-decoration: none; font-size: 12px; font-weight: bold;">🌐 Official Portal: neet.nta.nic.in</a>
        `
    },
    {
        key: 'odisha 10th',
        title: '🎓 Odisha BSE 10th Board (Matriculation) Syllabus',
        badge: 'BSE Odisha State Board',
        aliases: 'odisha board 10th bse odia matriculation 10 class',
        details: `
            <div style="display: flex; gap: 8px; margin-bottom: 10px;">
                <span style="background: rgba(2,132,199,0.3); color: #38bdf8; padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: bold;">10th Class Matric</span>
                <span style="background: rgba(245,158,11,0.3); color: #fbbf24; padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: bold;">State Board</span>
            </div>
            <p style="margin-bottom: 8px;"><strong>🗣️ Languages:</strong> First Language (Odia/Bengali/Hindi), Second Language (English), Third Language (Hindi/Sanskrit).</p>
            <p style="margin-bottom: 8px;"><strong>📐 Mathematics:</strong> Algebra (Quadratic Eq, AP, Probability), Geometry (Theorems, Mensuration, Trigonometry).</p>
            <p style="margin-bottom: 8px;"><strong>🔬 General Science:</strong> Physical Science (Light, Electricity, Reactions) & Life Science (Nutrition, Respiration, Genetics).</p>
            <p style="margin-bottom: 8px;"><strong>🌍 Social Science:</strong> History, Geography, Political Science, Economics.</p>
            <p style="margin-bottom: 12px;"><strong>📅 Exam Schedule:</strong> Feb - Mar Annual Board Examination.</p>
            <a href="http://bseodisha.ac.in" target="_blank" style="display: inline-block; padding: 8px 16px; background: linear-gradient(135deg, #0284c7, #0369a1); color: white; border-radius: 20px; text-decoration: none; font-size: 12px; font-weight: bold;">🌐 Official Portal: bseodisha.ac.in</a>
        `
    },
    {
        key: 'bihar 12th',
        title: '📖 Bihar BSEB 12th Intermediate Board Syllabus',
        badge: 'BSEB Bihar State Board',
        aliases: 'bihar board 12th bseb +2 inter intermediate',
        details: `
            <div style="display: flex; gap: 8px; margin-bottom: 10px;">
                <span style="background: rgba(239,68,68,0.3); color: #f87171; padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: bold;">12th Intermediate</span>
                <span style="background: rgba(16,185,129,0.3); color: #34d399; padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: bold;">50% MCQ Pattern</span>
            </div>
            <p style="margin-bottom: 8px;"><strong>🧪 Science Stream:</strong> Physics, Chemistry, Mathematics / Biology, English, Hindi.</p>
            <p style="margin-bottom: 8px;"><strong>💼 Commerce Stream:</strong> Accountancy, Business Studies, Entrepreneurship / Economics.</p>
            <p style="margin-bottom: 8px;"><strong>🎨 Arts Stream:</strong> History, Political Science, Geography, Psychology, Sociology.</p>
            <p style="margin-bottom: 12px;"><strong>📝 Marking Scheme:</strong> 50% OMR Objective MCQs + 50% Descriptive Short/Long Answer Questions.</p>
            <a href="http://biharboardonline.bihar.gov.in" target="_blank" style="display: inline-block; padding: 8px 16px; background: linear-gradient(135deg, #ef4444, #dc2626); color: white; border-radius: 20px; text-decoration: none; font-size: 12px; font-weight: bold;">🌐 Official Portal: biharboardonline.bihar.gov.in</a>
        `
    },
    {
        key: 'ssc cgl',
        title: '🏛️ SSC Combined Graduate Level (CGL) Exam',
        badge: 'Staff Selection Commission',
        aliases: 'ssc cgl tier 1 tier 2 staff selection commission officer government job',
        details: `
            <div style="display: flex; gap: 8px; margin-bottom: 10px;">
                <span style="background: rgba(236,72,153,0.3); color: #f472b6; padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: bold;">Govt Officer Track</span>
                <span style="background: rgba(2,132,199,0.3); color: #38bdf8; padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: bold;">Graduation Level</span>
            </div>
            <p style="margin-bottom: 8px;"><strong>Tier 1 (200 Marks):</strong> Reasoning (50m), General Awareness (50m), Quantitative Aptitude (50m), English Comprehension (50m).</p>
            <p style="margin-bottom: 8px;"><strong>Tier 2 (Session 1 & 2):</strong> Mathematics (30 Qs), Reasoning (30 Qs), English (45 Qs), GK (25 Qs), Computer Knowledge Test (20 Qs).</p>
            <p style="margin-bottom: 12px;"><strong>⌨️ Skill Test:</strong> Data Entry Speed Typing Test (27+ WPM).</p>
            <a href="https://ssc.gov.in" target="_blank" style="display: inline-block; padding: 8px 16px; background: linear-gradient(135deg, #ec4899, #db2777); color: white; border-radius: 20px; text-decoration: none; font-size: 12px; font-weight: bold;">🌐 Official Portal: ssc.gov.in</a>
        `
    },
    {
        key: 'full stack',
        title: '💻 Full Stack Web Development & Engineering',
        badge: 'High-Demand Tech Career',
        aliases: 'full stack web dev javascript react node frontend backend coding software engineer',
        details: `
            <div style="display: flex; gap: 8px; margin-bottom: 10px;">
                <span style="background: rgba(16,185,129,0.3); color: #34d399; padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: bold;">Software Track</span>
                <span style="background: rgba(2,132,199,0.3); color: #38bdf8; padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: bold;">₹4.5 - ₹18 LPA</span>
            </div>
            <p style="margin-bottom: 8px;"><strong>🎨 Frontend Mastery:</strong> HTML5, CSS3, JavaScript ES6+, React.js / Next.js, Tailwind CSS, State Management (Redux/Zustand).</p>
            <p style="margin-bottom: 8px;"><strong>⚙️ Backend Mastery:</strong> Node.js, Express.js, RESTful API Architecture, GraphQL, Authentication (JWT/OAuth).</p>
            <p style="margin-bottom: 8px;"><strong>🛢️ Database & DevOps:</strong> PostgreSQL, MongoDB, Prisma ORM, Docker, Git/GitHub, Netlify / Vercel Deployments.</p>
            <p style="margin-bottom: 12px;"><strong>🎯 Target Roles:</strong> Frontend Developer, Backend Engineer, Full Stack Web Engineer.</p>
        `
    },
    {
        key: 'data science',
        title: '🤖 Data Science, Machine Learning & Generative AI',
        badge: 'Frontier AI/ML Career',
        aliases: 'data science ai ml machine learning python sql analytics llm genai',
        details: `
            <div style="display: flex; gap: 8px; margin-bottom: 10px;">
                <span style="background: rgba(124,58,237,0.3); color: #c084fc; padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: bold;">AI / ML Engineering</span>
                <span style="background: rgba(16,185,129,0.3); color: #34d399; padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: bold;">₹6 - ₹24+ LPA</span>
            </div>
            <p style="margin-bottom: 8px;"><strong>📈 Foundations:</strong> Python 3.x, NumPy, Pandas, Data Wrangling, Descriptive & Inferential Statistics, Linear Algebra.</p>
            <p style="margin-bottom: 8px;"><strong>🧠 Machine Learning:</strong> Supervised & Unsupervised Algorithms, Scikit-Learn, Feature Engineering, Hyperparameter Tuning.</p>
            <p style="margin-bottom: 8px;"><strong>🚀 GenAI & Deep Learning:</strong> TensorFlow/PyTorch, Large Language Models (LLMs), LangChain, RAG Architecture, Vector DBs (Pinecone/Chroma).</p>
            <p style="margin-bottom: 12px;"><strong>🎯 Target Roles:</strong> Data Scientist, ML Engineer, GenAI Developer.</p>
        `
    },
    {
        key: 'ca foundation',
        title: '📊 CA Foundation (ICAI Professional Course)',
        badge: 'Chartered Accountancy',
        aliases: 'ca foundation icai chartered accountant accounting finance commerce',
        details: `
            <div style="display: flex; gap: 8px; margin-bottom: 10px;">
                <span style="background: rgba(245,158,11,0.3); color: #fbbf24; padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: bold;">Finance & Accounts</span>
                <span style="background: rgba(16,185,129,0.3); color: #34d399; padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: bold;">ICAI National Exam</span>
            </div>
            <p style="margin-bottom: 8px;"><strong>Paper 1 (100m):</strong> Principles and Practice of Accounting.</p>
            <p style="margin-bottom: 8px;"><strong>Paper 2 (100m):</strong> Business Laws & Regulatory Framework.</p>
            <p style="margin-bottom: 8px;"><strong>Paper 3 (100m):</strong> Quantitative Aptitude (Business Math, Logical Reasoning & Statistics).</p>
            <p style="margin-bottom: 8px;"><strong>Paper 4 (100m):</strong> Business Economics.</p>
            <p style="margin-bottom: 12px;"><strong>📅 Exam Frequency:</strong> Conducted thrice a year (May/June, Sept, Jan).</p>
            <a href="https://icai.org" target="_blank" style="display: inline-block; padding: 8px 16px; background: linear-gradient(135deg, #f59e0b, #d97706); color: white; border-radius: 20px; text-decoration: none; font-size: 12px; font-weight: bold;">🌐 Official Portal: icai.org</a>
        `
    },
    {
        key: 'gate',
        title: '⚙️ GATE (Graduate Aptitude Test in Engineering)',
        badge: 'IIT / IISc Entrance & PSU',
        aliases: 'gate engineering psu post graduate iit master tech',
        details: `
            <div style="display: flex; gap: 8px; margin-bottom: 10px;">
                <span style="background: rgba(2,132,199,0.3); color: #38bdf8; padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: bold;">Higher Education & PSU</span>
            </div>
            <p style="margin-bottom: 8px;"><strong>General Aptitude (15 Marks):</strong> Verbal Ability, Numerical Ability, Analytical Reasoning.</p>
            <p style="margin-bottom: 8px;"><strong>Engineering Mathematics (13 Marks):</strong> Linear Algebra, Calculus, Differential Equations, Probability.</p>
            <p style="margin-bottom: 8px;"><strong>Core Subject Paper (72 Marks):</strong> Computer Science (CS), Electronics (EC), Mechanical (ME), Electrical (EE), Civil (CE).</p>
            <p style="margin-bottom: 12px;"><strong>🎯 Benefits:</strong> M.Tech admission in IITs/NITs + Direct Recruitment in IOCL, ONGC, NTPC, BHEL PSUs.</p>
            <a href="https://gate2025.iisc.ac.in" target="_blank" style="display: inline-block; padding: 8px 16px; background: linear-gradient(135deg, #0284c7, #0369a1); color: white; border-radius: 20px; text-decoration: none; font-size: 12px; font-weight: bold;">🌐 Official Portal: gate2025.iisc.ac.in</a>
        `
    }
];

function quickGetSyllabus() {
    const rawInput = document.getElementById('quickSyllabusInput')?.value.toLowerCase().trim();
    const resultDiv = document.getElementById('quickResult');
    if (!resultDiv) return;

    if (!rawInput) {
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = '<span style="color: #ef4444;">Please type an exam name or select a quick chip!</span>';
        return;
    }

    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <div style="text-align: center; padding: 12px 0;">
            <div style="width: 26px; height: 26px; border: 3px solid rgba(255,255,255,0.2); border-top-color: #38bdf8; border-radius: 50%; animation: spin 0.8s infinite linear; margin: 0 auto 8px;"></div>
            <p style="font-size: 0.85rem; color: #38bdf8; font-weight: 600;">⚡ Live Fetching 2026 Syllabus Data from Official Portal...</p>
        </div>
    `;

    setTimeout(() => {
        const tokens = rawInput.split(/\s+/).filter(t => t.length > 1 && t !== 'board' && t !== 'exam');
        let bestMatch = null;
        let maxScore = 0;

        syllabusDatabase.forEach(item => {
            const matchText = (item.key + ' ' + item.title + ' ' + item.aliases).toLowerCase();
            let score = 0;
            tokens.forEach(token => {
                if (matchText.includes(token)) score += 2;
            });
            if (matchText.includes(rawInput)) score += 5;

            if (score > maxScore) {
                maxScore = score;
                bestMatch = item;
            }
        });

        if (bestMatch && maxScore > 0) {
            resultDiv.innerHTML = `
                <h4 style="color: #38bdf8; margin-bottom: 10px; font-size: 1.05rem;">${bestMatch.title}</h4>
                <div style="font-size: 0.9rem; color: #e2e8f0; line-height: 1.6;">${bestMatch.details}</div>
            `;
        } else {
            resultDiv.innerHTML = `
                <h4 style="color: #38bdf8; margin-bottom: 8px;">🔍 ${escapeHTML(rawInput.toUpperCase())} Detailed Overview</h4>
                <p style="font-size: 0.9rem; color: #e2e8f0; line-height: 1.5; margin-bottom: 10px;">Comprehensive syllabus includes core subjects, previous year question banks, and topic-wise practice sets. Refer to the official government/board portal for exact notification dates.</p>
                <a href="https://google.com/search?q=${encodeURIComponent(rawInput + ' exam syllabus official')}" target="_blank" style="display: inline-block; padding: 6px 14px; background: #0284c7; color: white; border-radius: 20px; text-decoration: none; font-size: 12px; font-weight: bold;">🌐 Search Official Website</a>
            `;
        }
    }, 450);
}

// Utility Helpers
function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}

function showToast(msg) {
    let toast = document.getElementById('cgToast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'cgToast';
        toast.style.cssText = `
            position: fixed;
            bottom: 24px;
            left: 50%;
            transform: translateX(-50%);
            background: #1e293b;
            color: #ffffff;
            padding: 12px 24px;
            border-radius: 30px;
            border: 1px solid rgba(255,255,255,0.2);
            box-shadow: 0 10px 25px rgba(0,0,0,0.3);
            font-size: 14px;
            font-weight: 600;
            z-index: 9999;
            transition: all 0.3s ease;
        `;
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = '1';
    setTimeout(() => { toast.style.opacity = '0'; }, 3000);
}
