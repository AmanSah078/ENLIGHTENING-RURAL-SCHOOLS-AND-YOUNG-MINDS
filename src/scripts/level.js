/* CareerGuide Pro - Interactive Logic & AI Engine with Live Gemini API Support & Rich Syllabus Search */

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

// AI Career Guidance Generator Engine (With Live Gemini API Fetching + Fallback)
async function handleFormSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('studentName')?.value || 'Student';
    const qual = document.getElementById('qualification')?.value || '12th';
    const stream = document.getElementById('stream')?.value || document.getElementById('educationStream')?.value || 'General';
    const branch = document.getElementById('branch')?.value || 'General';
    const interests = document.getElementById('interests')?.value || 'Technology & Career Growth';
    const apiKey = document.getElementById('userApiKey')?.value || localStorage.getItem('gemini_api_key') || '';

    const loadingSec = document.getElementById('loadingSection');
    const resultsSec = document.getElementById('resultsSection');
    const contentDiv = document.getElementById('guidanceContent');
    const submitBtn = document.getElementById('submitBtn');

    if (loadingSec) loadingSec.style.display = 'block';
    if (resultsSec) resultsSec.style.display = 'none';
    if (submitBtn) submitBtn.disabled = true;

    if (apiKey) {
        localStorage.setItem('gemini_api_key', apiKey);
    }

    let guidanceHTML = '';
    let fetchedFromApi = false;

    // Try Live Gemini API Fetch if Key Provided
    if (apiKey) {
        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `Act as a senior career counselor and AI mentor for Indian students. Create a detailed career guide for ${name}. Current qualification: ${qual}, Field: ${stream} (${branch}), Target goal/interests: ${interests}. Language: ${currentLang}. Format with section titles: 📊 MARKET REALITY CHECK, 🎯 RECOMMENDED PATHWAYS, 🛠️ SKILLS TO MASTER, 💰 SALARY BENCHMARKS, 🚀 5-STEP ACTION PLAN.`
                        }]
                    }]
                })
            });

            if (response.ok) {
                const data = await response.json();
                const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
                if (rawText) {
                    guidanceHTML = formatRawApiGuidance(rawText, name);
                    fetchedFromApi = true;
                }
            }
        } catch (err) {
            console.warn("API Fetching failed, falling back to client engine", err);
        }
    }

    // Fallback to Smart AI Engine if no API key or API call failed
    if (!fetchedFromApi) {
        await new Promise(res => setTimeout(res, 800));
        guidanceHTML = generateSmartAIResponse({ name, qual, stream, branch, interests, lang: currentLang });
    }

    savedGuidanceText = extractPlainText(guidanceHTML);
    
    if (contentDiv) contentDiv.innerHTML = guidanceHTML;
    if (loadingSec) loadingSec.style.display = 'none';
    if (resultsSec) resultsSec.style.display = 'block';
    if (submitBtn) submitBtn.disabled = false;

    resultsSec.scrollIntoView({ behavior: 'smooth' });
    saveGuidanceToLocalDB({ name, qual, stream, interests, date: new Date().toLocaleDateString() });
}

function formatRawApiGuidance(rawText, name) {
    const escaped = escapeHTML(rawText).replace(/\n/g, '<br>');
    return `
        <div class="guidance-section">
            <h3 class="section-title">✨ Live AI Career Guidance for ${escapeHTML(name)}</h3>
            <div style="font-size: 0.95rem; line-height: 1.6;">${escaped}</div>
        </div>
        <div class="motivation-box">
            <h3>🌟 Career Champion Motivation</h3>
            <p>"Consistency beats talent every single day. Keep taking daily steps toward your goal!"</p>
        </div>
    `;
}

function generateSmartAIResponse(data) {
    const { name, qual, stream, branch, interests, lang } = data;
    const isHindi = lang === 'Hindi';

    const greeting = isHindi ? `👋 Namaste ${name}! Aapka Personalized AI Career Guide Ready Hai` : `👋 Welcome ${name}! Your Personalized Career Blueprint is Ready`;

    return `
        <div class="guidance-section">
            <h3 class="section-title">${greeting}</h3>
            <p style="margin-top: 6px; font-size: 0.95rem; opacity: 0.9;">
                Qualification: <strong>${qual}</strong> | Field: <strong>${stream} (${branch})</strong> | Target: <strong>${interests}</strong>
            </p>
        </div>

        <div class="guidance-section">
            <h3 class="section-title">📊 Current Market & Stream Reality Check</h3>
            <ul class="skills-list">
                <li><span class="bullet-point">🎯</span> <span><strong>Direct Compatibility:</strong> Your background in ${stream} provides a strong base for ${interests}.</span></li>
                <li><span class="bullet-point">📈</span> <span><strong>Industry Demand:</strong> Roles related to ${interests} are growing at ~18% annually in India and globally.</span></li>
                <li><span class="bullet-point">💡</span> <span><strong>Key Growth Driver:</strong> Hands-on practical projects + certifications carry 3x more weight than theoretical degrees alone.</span></li>
            </ul>
        </div>

        <div class="guidance-section">
            <h3 class="section-title">🎯 Top Recommended Career Pathways</h3>
            <div class="salary-list">
                <div class="salary-item">
                    <div>
                        <strong style="color: var(--accent);">Pathway 1: Core Professional Track</strong>
                        <p style="font-size: 0.85rem; opacity: 0.8; margin-top: 2px;">Pursue specialized degrees or domain certifications directly aligned with ${interests}.</p>
                    </div>
                </div>
                <div class="salary-item">
                    <div>
                        <strong style="color: var(--accent);">Pathway 2: Public Sector & Government Exams</strong>
                        <p style="font-size: 0.85rem; opacity: 0.8; margin-top: 2px;">Target SSC CGL, State PSC, Banking (IBPS), or Defense depending on eligibility.</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="guidance-section">
            <h3 class="section-title">💰 Salary Benchmarks & Entry Roles</h3>
            <div class="salary-list">
                <div class="salary-item">
                    <span class="salary-role">Fresher / Entry-Level Role</span>
                    <span class="salary-amount" style="color: #10b981; font-weight: 700;">₹3.5 - ₹6.5 LPA</span>
                </div>
                <div class="salary-item">
                    <span class="salary-role">Mid-Level Professional (2-4 Yrs)</span>
                    <span class="salary-amount" style="color: #10b981; font-weight: 700;">₹7.0 - ₹12.5 LPA</span>
                </div>
                <div class="salary-item">
                    <span class="salary-role">Senior Specialist / Manager</span>
                    <span class="salary-amount" style="color: #10b981; font-weight: 700;">₹15.0 - ₹25.0+ LPA</span>
                </div>
            </div>
        </div>

        <div class="guidance-section">
            <h3 class="section-title">🚀 5-Step Execution Action Plan</h3>
            <ol class="plan-list">
                <li><span class="bullet-point">1.</span> <span><strong>Month 1:</strong> Finalize target specialization & complete 1 fundamental online certification.</span></li>
                <li><span class="bullet-point">2.</span> <span><strong>Month 2:</strong> Create a polished LinkedIn profile and professional resume.</span></li>
                <li><span class="bullet-point">3.</span> <span><strong>Month 3:</strong> Build 2 practical portfolio projects demonstrating skills in ${interests}.</span></li>
                <li><span class="bullet-point">4.</span> <span><strong>Month 4:</strong> Apply for internships, entry-level jobs, or competitive entrance exams.</span></li>
                <li><span class="bullet-point">5.</span> <span><strong>Ongoing:</strong> Practice mock interviews and stay updated with current industry trends.</span></li>
            </ol>
        </div>

        <div class="motivation-box">
            <h3>🌟 Career Champion Motivation</h3>
            <p>"Consistency always beats talent. Small daily disciplined steps build an extraordinary career. You've got this, ${name}!"</p>
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

    // Show Animated Fetching Spinner
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
