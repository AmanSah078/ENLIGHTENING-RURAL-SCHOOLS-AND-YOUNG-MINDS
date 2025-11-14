





document.addEventListener('DOMContentLoaded', function () {
  // ---------- Helpers ----------
  const $ = id => document.getElementById(id);

  function safeGet(id) {
    const el = $(id);
    return el || null;
  }

  // ---------- Background animation ----------
  function createBackgroundDots() {
    const bgAnimation = document.querySelector('.bg-animation');
    if (!bgAnimation) return;
    for (let i = 0; i < 15; i++) {
      const dot = document.createElement('div');
      dot.className = 'pulse-dot';
      dot.style.left = Math.random() * 100 + '%';
      dot.style.top = Math.random() * 100 + '%';
      dot.style.animationDelay = Math.random() * 2 + 's';
      bgAnimation.appendChild(dot);
    }
  }

  // ---------- Theme toggle ----------
  const themeToggle = safeGet('themeToggle');
  const themeIcon = safeGet('themeIcon');
  const body = document.body;
  if (body) {
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    if (themeIcon) themeIcon.textContent = savedTheme === 'light' ? '🌙' : '☀️';
  }
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = body.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      body.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      if (themeIcon) themeIcon.textContent = newTheme === 'light' ? '🌙' : '☀️';
    });
  }

  // ---------- DOM elements (nullable) ----------
  const form = safeGet('careerForm');
  const qualification = safeGet('qualification');
  const streamField = safeGet('streamField');
  const streamBranchContainer = safeGet('streamBranchContainer');
  const educationStream = safeGet('educationStream');
  const branch = safeGet('branch');
  const loadingSection = safeGet('loadingSection');
  const resultsSection = safeGet('resultsSection');
  const guidanceContent = safeGet('guidanceContent');
  const submitBtn = safeGet('submitBtn');
  const blogRecommendation = safeGet('blogRecommendation');
  const languageToggle = safeGet('languageToggle');

  // ---------- Branch options ----------
  const branchOptions = {
    Science: [
      'Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science',
      'Electronics', 'Statistics', 'Geology', 'Biotechnology', 'Environmental Science'
    ],
    Commerce: [
      'Accountancy', 'Business Studies', 'Economics', 'Mathematics',
      'Statistics', 'Banking', 'Finance', 'Marketing', 'Business Administration'
    ],
    Arts: [
      'History', 'Political Science', 'Geography', 'Psychology',
      'Sociology', 'Economics', 'English Literature', 'Hindi Literature',
      'Fine Arts', 'Music', 'Dance', 'Education'
    ],
    Engineering: [
      'Computer Science', 'Mechanical', 'Civil', 'Electrical',
      'Electronics', 'Chemical', 'Aerospace', 'Biotechnology',
      'Information Technology', 'Artificial Intelligence', 'Agriculture Engineering'
    ],
    Medical: [
      'MBBS', 'BDS', 'BAMS', 'BHMS', 'Physiotherapy',
      'Nursing', 'Pharmacy', 'Medical Lab Technology', 'Ayurveda'
    ],
    Agriculture: [
      'Agriculture Science', 'Horticulture', 'Forestry', 'Veterinary Science',
      'Dairy Technology', 'Food Technology', 'Agricultural Engineering'
    ],
    Law: [
      'BA LLB', 'BBA LLB', 'BCom LLB', 'LLM',
      'Corporate Law', 'Criminal Law', 'Constitutional Law'
    ],
    Other: [
      'Education', 'Social Work', 'Journalism', 'Mass Communication',
      'Hotel Management', 'Fashion Design', 'Physical Education'
    ]
  };

  if (educationStream && branch) {
    educationStream.addEventListener('change', function () {
      const selectedStream = this.value;
      branch.innerHTML = '<option value="General">Select Specialization</option>';
      if (branchOptions[selectedStream]) {
        branchOptions[selectedStream].forEach(branchName => {
          const option = document.createElement('option');
          option.value = branchName;
          option.textContent = branchName;
          branch.appendChild(option);
        });
      }
    });
  }

  // ---------- Qualification change handler ----------
  if (qualification) {
    qualification.addEventListener('change', function () {
      const selectedQualification = this.value;
      if (streamField) streamField.style.display = 'none';
      if (streamBranchContainer) streamBranchContainer.classList.remove('show');

      if (selectedQualification === '11th-12th') {
        if (streamField) streamField.style.display = 'block';
      } else if (['diploma', 'graduate', 'post-graduate'].includes(selectedQualification)) {
        if (streamBranchContainer) streamBranchContainer.classList.add('show');
      }
    });
  }

  // ---------- Language (UI) toggle ----------
  let currentLanguage = 'english';
  if (languageToggle) {
    languageToggle.addEventListener('click', () => {
      currentLanguage = currentLanguage === 'english' ? 'hindi' : 'english';
      languageToggle.textContent = currentLanguage === 'english' ? '🌐 English' : '🌐 हिंदी';
      updateUIForLanguage();
    });
  }

  function updateUIForLanguage() {
    const titleEl = document.querySelector('.title');
    const subtitleEl = document.querySelector('.subtitle');
    const studentName = safeGet('studentName');
    const interests = safeGet('interests');
    const submitBtnEl = document.querySelector('.submit-btn');
    const qualificationSelect = safeGet('qualification');
    const goalsSelect = safeGet('futureGoals');

    if (currentLanguage === 'hindi') {
      if (titleEl) titleEl.textContent = '🎓 करियरगाइड प्रो';
      if (subtitleEl) subtitleEl.textContent = 'सभी छात्रों के लिए मुफ्त AI करियर मार्गदर्शन';
      if (studentName) studentName.placeholder = 'अपना नाम दर्ज करें';
      if (interests) interests.placeholder = 'जैसे, डॉक्टर, इंजीनियर, शिक्षक, सरकारी नौकरी, बिजनेस';
      if (submitBtnEl) submitBtnEl.innerHTML = '🚀 मुफ्त करियर मार्गदर्शन प्राप्त करें';
      if (qualificationSelect) qualificationSelect.innerHTML = `
        <option value="">शैक्षणिक योग्यता चुनें</option>
        <option value="8th-10th">8वीं-10वीं कक्षा</option>
        <option value="11th-12th">11वीं-12वीं कक्षा</option>
        <option value="diploma">डिप्लोमा</option>
        <option value="graduate">स्नातक</option>
        <option value="post-graduate">स्नातकोत्तर</option>`;
      if (goalsSelect) goalsSelect.innerHTML = `
        <option value="government-job">सरकारी नौकरी</option>
        <option value="private-job">प्राइवेट नौकरी</option>
        <option value="higher-studies">उच्च शिक्षा (मास्टर्स/पीएचडी)</option>
        <option value="business">बिजनेस शुरू करें</option>
        <option value="abroad">विदेश में पढ़ाई/नौकरी</option>
        <option value="not-sure">अभी तय नहीं</option>`;
    } else {
      if (titleEl) titleEl.textContent = '🎓 CareerGuide Pro';
      if (subtitleEl) subtitleEl.textContent = 'Free AI Career Guidance for ALL Students';
      if (studentName) studentName.placeholder = 'Enter your name';
      if (interests) interests.placeholder = 'e.g., doctor, engineer, teacher, government job, business';
      if (submitBtnEl) submitBtnEl.innerHTML = '🚀 Get Free Career Guidance';
      if (qualificationSelect) qualificationSelect.innerHTML = `
        <option value="">Select qualification</option>
        <option value="8th-10th">8th-10th Class</option>
        <option value="11th-12th">11th-12th Class</option>
        <option value="diploma">Diploma</option>
        <option value="graduate">Graduate</option>
        <option value="post-graduate">Post Graduate</option>`;
      if (goalsSelect) goalsSelect.innerHTML = `
        <option value="government-job">Government Job (Sarkari Naukri)</option>
        <option value="private-job">Private Job</option>
        <option value="higher-studies">Higher Studies (Masters/PhD)</option>
        <option value="business">Start Business</option>
        <option value="abroad">Study/Work Abroad</option>
        <option value="not-sure">Not Sure Yet</option>`;
    }
  }

  // ---------- Utility: get stream based on qualification ----------
  function getStreamData() {
    const q = qualification ? qualification.value : '';
    if (q === '11th-12th') {
      const s = safeGet('stream');
      return s ? s.value : 'General';
    } else if (['diploma', 'graduate', 'post-graduate'].includes(q)) {
      return educationStream ? educationStream.value : 'General';
    }
    return 'General';
  }

  // ---------- Notification UI ----------
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: ${type === 'error' ? '#ff6b6b' : type === 'success' ? '#4ecdc4' : 'var(--card-bg, #fff)'};
      color: ${type === 'error' ? '#fff' : '#000'};
      padding: 12px 18px;
      border-radius: 10px;
      z-index: 10000;
      box-shadow: 0 6px 18px rgba(0,0,0,0.12);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  }

  // ---------- Blog recommendation ----------
  function showBlogRecommendation(interests) {
    if (!blogRecommendation || !interests) return;
    const techKeywords = ['programming', 'coding', 'ai', 'artificial intelligence', 'machine learning',
      'web development', 'software', 'technology', 'computer', 'data science', 'cybersecurity'];
    try {
      const hasTechInterest = techKeywords.some(k => interests.toLowerCase().includes(k));
      blogRecommendation.style.display = hasTechInterest ? 'block' : 'none';
    } catch {
      blogRecommendation.style.display = 'none';
    }
  }

  // ---------- Student count animation ----------
  function updateStudentCount() {
    const countElement = safeGet('studentsHelped');
    if (!countElement) return;
    let currentCount = parseInt(countElement.textContent.replace('+', '')) || 5000;
    const newCount = currentCount + 1;
    const duration = 800;
    const startTime = performance.now();
    function animate(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(currentCount + progress * (newCount - currentCount));
      countElement.textContent = value + '+';
      if (progress < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }

  // ---------- Save / Load progress ----------
  function saveProgress() {
    const data = {
      name: safeGet('studentName') ? safeGet('studentName').value : '',
      qualification: qualification ? qualification.value : '',
      stream: getStreamData(),
      branch: branch ? branch.value : 'General',
      interests: safeGet('interests') ? safeGet('interests').value : '',
      futureGoals: safeGet('futureGoals') ? safeGet('futureGoals').value : 'not-sure'
    };
    localStorage.setItem('careerFormData', JSON.stringify(data));
    showNotification('Progress saved successfully!', 'success');
  }

  function loadSavedProgress() {
    const raw = localStorage.getItem('careerFormData');
    if (!raw) return;
    try {
      const data = JSON.parse(raw);
      if (safeGet('studentName')) safeGet('studentName').value = data.name || '';
      if (qualification) qualification.value = data.qualification || '';
      if (safeGet('interests')) safeGet('interests').value = data.interests || '';
      if (safeGet('futureGoals')) safeGet('futureGoals').value = data.futureGoals || 'not-sure';

      if (data.qualification === '11th-12th') {
        if (streamField) streamField.style.display = 'block';
        if (safeGet('stream')) safeGet('stream').value = data.stream || '';
      } else if (['diploma', 'graduate', 'post-graduate'].includes(data.qualification)) {
        if (streamBranchContainer) streamBranchContainer.classList.add('show');
        if (educationStream) {
          educationStream.value = data.stream || 'Science';
          educationStream.dispatchEvent(new Event('change'));
        }
        if (branch) branch.value = data.branch || 'General';
      }
    } catch (e) {
      console.warn('loadSavedProgress error', e);
    }
  }
  window.addEventListener('load', loadSavedProgress);

  // ---------- Text-to-speech ----------
  function speakGuidance() {
    if (!guidanceContent) return;
    const text = guidanceContent.innerText || guidanceContent.textContent || '';
    if (!('speechSynthesis' in window)) {
      showNotification('Text-to-speech not supported in your browser', 'error');
      return;
    }
    const u = new SpeechSynthesisUtterance(text);
    u.lang = currentLanguage === 'hindi' ? 'hi-IN' : 'en-US';
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
    showNotification('Reading guidance aloud...');
  }

  // ---------- Download / Share guidance ----------
  function downloadGuidance() {
    if (!guidanceContent) return;
    const text = guidanceContent.innerText || guidanceContent.textContent || '';
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-career-guidance.txt';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    showNotification('Guidance downloaded successfully!', 'success');
  }

  async function shareGuidance() {
    if (!guidanceContent) return;
    const text = guidanceContent.innerText || guidanceContent.textContent || '';
    if (navigator.share) {
      try {
        await navigator.share({ title: 'My Career Guidance', text: text.slice(0, 200) + '...', url: location.href });
        showNotification('Shared successfully!', 'success');
      } catch {}
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      showNotification('Guidance copied to clipboard! Share with friends.');
    } else {
      showNotification('Share not supported', 'error');
    }
  }

  // ---------- SMART CAREER VALIDATION WITH PERFECT FORMAT ----------
  function validateCareerPath(formData) {
    const stream = formData.stream.toLowerCase();
    const interests = formData.interests.toLowerCase();

    // Medical student wanting Engineering
    if ((stream.includes('bio') || stream.includes('medical')) && 
        (interests.includes('engineer') || interests.includes('software') || interests.includes('programming'))) {
      return {
        valid: false,
        message: getPerfectFormatGuidance(formData, 'Medical', 'Engineering')
      };
    }

    // Engineering student wanting Medical
    if ((stream.includes('engineering') || stream.includes('pcm')) && 
        (interests.includes('doctor') || interests.includes('medical') || interests.includes('mbbs'))) {
      return {
        valid: false,
        message: getPerfectFormatGuidance(formData, 'Engineering', 'Medical')
      };
    }

    // Commerce student wanting Technical fields
    if (stream.includes('commerce') && 
        (interests.includes('engineer') || interests.includes('doctor') || interests.includes('programming'))) {
      return {
        valid: false,
        message: getPerfectFormatGuidance(formData, 'Commerce', 'Technical')
      };
    }

    // Arts student wanting Technical fields
    if (stream.includes('arts') && 
        (interests.includes('engineer') || interests.includes('doctor') || interests.includes('programming'))) {
      return {
        valid: false,
        message: getPerfectFormatGuidance(formData, 'Arts', 'Technical')
      };
    }

    return { valid: true };
  }

  function getPerfectFormatGuidance(formData, currentStream, desiredField) {
    return `
    <div class="guidance-section">
      <h2 class="main-heading">👋 Hey ${formData.name}, Don't Worry About Career!</h2>
    </div>

    <div class="guidance-section">
      <div class="stream-alert">
        <h3>🎯 Let Me Guide You Properly</h3>
        <p>You're from <strong>${currentStream}</strong> background but interested in <strong>${desiredField}</strong> fields.</p>
        <p><strong>Your current stream has different eligibility requirements.</strong></p>
      </div>
    </div>

    <div class="guidance-section">
      <h3 class="section-title">🚀 But You Can Go In These Fields:</h3>
      <div class="career-options">
        ${getAlternativeFields(currentStream, desiredField)}
      </div>
    </div>

    <div class="guidance-section">
      <h3 class="section-title">📝 Exams You Can Prepare For:</h3>
      <div class="exams-list">
        ${getAlternativeExams(currentStream, desiredField)}
      </div>
    </div>

    <div class="guidance-section">
      <h3 class="section-title">💡 Your Action Plan:</h3>
      <div class="action-steps">
        <div class="action-card">
          <div class="action-number">1</div>
          <div class="action-content">Research these alternative fields thoroughly</div>
        </div>
        <div class="action-card">
          <div class="action-number">2</div>
          <div class="action-content">Check eligibility for suggested exams</div>
        </div>
        <div class="action-card">
          <div class="action-number">3</div>
          <div class="action-content">Start preparation with proper study material</div>
        </div>
        <div class="action-card">
          <div class="action-number">4</div>
          <div class="action-content">Take career counseling from experts</div>
        </div>
      </div>
    </div>

    <div class="motivation-box">
      <h3>🌟 Remember This!</h3>
      <p>Your <strong>${currentStream}</strong> background is valuable. Many successful professionals have built amazing careers by choosing the right alternative paths!</p>
      <p><strong>Stay Positive + Right Guidance + Consistent Effort = SUCCESS! 🚀</strong></p>
    </div>
    `;
  }

  function getAlternativeFields(currentStream, desiredField) {
    const alternatives = {
      'Medical-Engineering': `
        <div class="career-option">
          <div class="career-icon">🔬</div>
          <div class="career-details">
            <strong>Biomedical Engineering</strong>
            <p>Combine medical knowledge with engineering skills</p>
            <span class="salary">Salary: ₹8-18 LPA</span>
          </div>
        </div>
        <div class="career-option">
          <div class="career-icon">💻</div>
          <div class="career-details">
            <strong>Healthcare IT</strong>
            <p>Medical software development & hospital systems</p>
            <span class="salary">Salary: ₹5-12 LPA</span>
          </div>
        </div>
        <div class="career-option">
          <div class="career-icon">🔍</div>
          <div class="career-details">
            <strong>Medical Research</strong>
            <p>Research in pharmaceuticals & healthcare technology</p>
            <span class="salary">Salary: ₹6-15 LPA</span>
          </div>
        </div>
      `,
      'Engineering-Medical': `
        <div class="career-option">
          <div class="career-icon">🔬</div>
          <div class="career-details">
            <strong>Biomedical Engineering</strong>
            <p>Healthcare technology & medical equipment design</p>
            <span class="salary">Salary: ₹8-18 LPA</span>
          </div>
        </div>
        <div class="career-option">
          <div class="career-icon">💊</div>
          <div class="career-details">
            <strong>Pharmaceutical Industry</strong>
            <p>Drug manufacturing & quality control</p>
            <span class="salary">Salary: ₹6-14 LPA</span>
          </div>
        </div>
        <div class="career-option">
          <div class="career-icon">🏥</div>
          <div class="career-details">
            <strong>Medical Equipment Sales</strong>
            <p>Technical sales of medical devices</p>
            <span class="salary">Salary: ₹5-12 LPA + Commission</span>
          </div>
        </div>
      `,
      'Commerce-Technical': `
        <div class="career-option">
          <div class="career-icon">💻</div>
          <div class="career-details">
            <strong>Business Analytics</strong>
            <p>Data analysis for business decisions</p>
            <span class="salary">Salary: ₹6-15 LPA</span>
          </div>
        </div>
        <div class="career-option">
          <div class="career-icon">📊</div>
          <div class="career-details">
            <strong>FinTech</strong>
            <p>Financial technology & digital payments</p>
            <span class="salary">Salary: ₹7-16 LPA</span>
          </div>
        </div>
        <div class="career-option">
          <div class="career-icon">🏦</div>
          <div class="career-details">
            <strong>Banking & Finance IT</strong>
            <p>Technology solutions for banking sector</p>
            <span class="salary">Salary: ₹5-12 LPA</span>
          </div>
        </div>
      `,
      'Arts-Technical': `
        <div class="career-option">
          <div class="career-icon">✍️</div>
          <div class="career-details">
            <strong>Technical Writing</strong>
            <p>Documentation & user manuals creation</p>
            <span class="salary">Salary: ₹5-12 LPA</span>
          </div>
        </div>
        <div class="career-option">
          <div class="career-icon">🎮</div>
          <div class="career-details">
            <strong>Game Story Writing</strong>
            <p>Narratives & character development for games</p>
            <span class="salary">Salary: ₹6-15 LPA</span>
          </div>
        </div>
        <div class="career-option">
          <div class="career-icon">📱</div>
          <div class="career-details">
            <strong>UX/UI Design</strong>
            <p>User experience & interface design</p>
            <span class="salary">Salary: ₹7-18 LPA</span>
          </div>
        </div>
      `
    };

    const key = `${currentStream}-${desiredField}`;
    return alternatives[key] || `
      <div class="career-option">
        <div class="career-icon">🎯</div>
        <div class="career-details">
          <strong>Explore Related Fields</strong>
          <p>Look for careers that combine your current background with your interests</p>
        </div>
      </div>
    `;
  }

  function getAlternativeExams(currentStream, desiredField) {
    const exams = {
      'Medical-Engineering': `
        <div class="exam-item">
          <strong>GATE</strong> - Graduate Aptitude Test in Engineering
        </div>
        <div class="exam-item">
          <strong>BITSAT</strong> - For BITS Pilani
        </div>
        <div class="exam-item">
          <strong>State Engineering Exams</strong> - Various state-level tests
        </div>
        <div class="exam-item">
          <strong>Company Specific Tests</strong> - TCS, Infosys, Wipro
        </div>
      `,
      'Engineering-Medical': `
        <div class="exam-item">
          <strong>GATE</strong> - For Biomedical Engineering
        </div>
        <div class="exam-item">
          <strong>GPAT</strong> - Graduate Pharmacy Aptitude Test
        </div>
        <div class="exam-item">
          <strong>Company Exams</strong> - Pharmaceutical companies
        </div>
        <div class="exam-item">
          <strong>Research Entrance Tests</strong> - For medical research
        </div>
      `,
      'Commerce-Technical': `
        <div class="exam-item">
          <strong>CAT</strong> - For Business Analytics in IIMs
        </div>
        <div class="exam-item">
          <strong>XAT</strong> - XLRI and other management institutes
        </div>
        <div class="exam-item">
          <strong>Company Exams</strong> - TCS, Infosys, Accenture
        </div>
        <div class="exam-item">
          <strong>Banking Exams</strong> - IBPS, SBI for IT roles
        </div>
      `,
      'Arts-Technical': `
        <div class="exam-item">
          <strong>Company Design Tests</strong> - For UX/UI roles
        </div>
        <div class="exam-item">
          <strong>Content Writing Tests</strong> - For technical writing
        </div>
        <div class="exam-item">
          <strong>Portfolio Based</strong> - Creative field entries
        </div>
        <div class="exam-item">
          <strong>Certification Courses</strong> - Various online platforms
        </div>
      `
    };

    const key = `${currentStream}-${desiredField}`;
    return exams[key] || `
      <div class="exam-item">
        <strong>Explore relevant certification courses and entrance exams</strong>
      </div>
    `;
  }

  // ---------- IMPROVED COHERE API CALL WITH PERFECT FORMAT ----------
  async function callCohereAPI(formData) {
    const API_KEY = 'hhOZgZNmpNdkCCz558OksVm9LIxT4lsNMMLvP7jf';

    // First validate career path
    const validation = validateCareerPath(formData);
    if (!validation.valid) {
      return validation.message;
    }

    // PERFECT FORMAT PROMPT - SIMPLIFIED
    const prompt = `
You are CareerGuide Pro - a friendly career counselor for Indian students.

STUDENT PROFILE:
- Name: ${formData.name}
- Current Qualification: ${formData.qualification}
- Academic Stream: ${formData.stream}
- Specialization: ${formData.branch}
- Career Interests: ${formData.interests}
- Future Goals: ${formData.futureGoals}

Provide career guidance in this EXACT structure:

1. START WITH: "👋 Hey ${formData.name}, Don't Worry About Career!"

2. Career Scope & Opportunities:
   - Explain scope in their field
   - Mention job opportunities
   - Growth prospects

3. Exams to Prepare For:
   - List relevant exams (government & private)
   - Include company specific exams
   - Mention entrance tests

4. Action Plan:
   - Clear, practical steps
   - Strategic guidance

5. Motivation:
   - Positive encouragement

Be practical and maintain encouraging tone.
`;

    try {
      const response = await fetch('https://api.cohere.ai/v1/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: 'command-a-03-2025',
          message: prompt,
          max_tokens: 2500,
          temperature: 0.7
        })
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);
      const data = await response.json();
      return data.text || getFallbackGuidance(formData);

    } catch (error) {
      console.error('API Error:', error);
      return getFallbackGuidance(formData);
    }
  }

  // ---------- PERFECT FORMAT FALLBACK GUIDANCE ----------
  function getFallbackGuidance(formData) {
    const validation = validateCareerPath(formData);
    if (!validation.valid) {
      return validation.message;
    }

    return `
    <div class="guidance-section">
      <h2 class="main-heading">👋 Hey ${formData.name}, Don't Worry About Career!</h2>
    </div>

    <div class="guidance-section">
      <h3 class="section-title">🎯 Career Scope & Opportunities</h3>
      <div class="scope-box">
        <p>Based on your <strong>${formData.qualification}</strong> in <strong>${formData.stream}</strong> stream and interest in <strong>${formData.interests}</strong>, here are your opportunities:</p>
        ${getCareerScope(formData)}
      </div>
    </div>

    <div class="guidance-section">
      <h3 class="section-title">📝 Exams You Can Prepare For:</h3>
      <div class="exams-list">
        ${getAllExams(formData)}
      </div>
    </div>

    <div class="guidance-section">
      <h3 class="section-title">🚀 Your Action Plan:</h3>
      <div class="action-steps">
        <div class="action-card">
          <div class="action-number">1</div>
          <div class="action-content">Research all suggested exams and their patterns</div>
        </div>
        <div class="action-card">
          <div class="action-number">2</div>
          <div class="action-content">Check eligibility criteria for each exam</div>
        </div>
        <div class="action-card">
          <div class="action-number">3</div>
          <div class="action-content">Collect proper study material and resources</div>
        </div>
        <div class="action-card">
          <div class="action-number">4</div>
          <div class="action-content">Create a strategic preparation plan</div>
        </div>
      </div>
    </div>

    <div class="motivation-box">
      <h3>🌟 You've Got This!</h3>
      <p>Your <strong>${formData.stream}</strong> background is your strength. Many successful people started exactly where you are now!</p>
      <p><strong>Right Guidance + Consistent Effort + Positive Attitude = SUCCESS! 🚀</strong></p>
    </div>
    `;
  }

  function getCareerScope(formData) {
    const interests = formData.interests.toLowerCase();
    
    if (interests.includes('doctor') || interests.includes('medical') || interests.includes('mbbs')) {
      return `
        <ul>
          <li>🏥 <strong>Hospital Jobs</strong> - Government & Private hospitals</li>
          <li>🔬 <strong>Medical Research</strong> - Research institutions & pharma</li>
          <li>💊 <strong>Pharmaceutical Industry</strong> - Drug manufacturing</li>
          <li>🎓 <strong>Teaching</strong> - Medical colleges & institutions</li>
          <li>🌍 <strong>Abroad Opportunities</strong> - International medical practice</li>
        </ul>
      `;
    } else if (interests.includes('engineer') || interests.includes('software') || interests.includes('programming')) {
      return `
        <ul>
          <li>💻 <strong>IT Companies</strong> - TCS, Infosys, Wipro, HCL, Tech Mahindra</li>
          <li>🏢 <strong>Product Companies</strong> - Amazon, Microsoft, Google, Adobe</li>
          <li>📱 <strong>Startups</strong> - Emerging tech companies</li>
          <li>🏛️ <strong>Government IT</strong> - NIC, CDAC, ISRO, DRDO</li>
          <li>🌍 <strong>International</strong> - Overseas IT opportunities</li>
        </ul>
      `;
    } else if (interests.includes('government') || interests.includes('ssc') || interests.includes('upsc')) {
      return `
        <ul>
          <li>🏛️ <strong>Central Government</strong> - UPSC, SSC, Banking, Railway</li>
          <li>🏢 <strong>State Government</strong> - State PSCs, Police, Teaching</li>
          <li>💰 <strong>Public Sector</strong> - ONGC, IOCL, BHEL, SAIL</li>
          <li>🎓 <strong>Education Sector</strong> - Teaching, Professor roles</li>
          <li>⚖️ <strong>Judicial Services</strong> - Law & order departments</li>
        </ul>
      `;
    } else {
      return `
        <ul>
          <li>🎯 <strong>Multiple Career Paths</strong> available in your field</li>
          <li>📈 <strong>Good Growth Opportunities</strong> with proper planning</li>
          <li>💼 <strong>Various Job Sectors</strong> to explore</li>
          <li>🌍 <strong>International Scope</strong> for qualified professionals</li>
        </ul>
      `;
    }
  }

  function getAllExams(formData) {
    const interests = formData.interests.toLowerCase();
    const qualification = formData.qualification;
    
    if (interests.includes('doctor') || interests.includes('medical') || interests.includes('mbbs')) {
      if (qualification === '8th-10th') {
        return `
          <div class="exam-item">
            <strong>11th PCB Choice</strong> - First step towards medical career
          </div>
          <div class="exam-item">
            <strong>Foundation Courses</strong> - Early NEET preparation
          </div>
        `;
      } else if (qualification === '11th-12th') {
        return `
          <div class="exam-item">
            <strong>NEET UG</strong> - National Eligibility cum Entrance Test
          </div>
          <div class="exam-item">
            <strong>AIIMS UG</strong> - All India Institute of Medical Sciences
          </div>
          <div class="exam-item">
            <strong>JIPMER</strong> - Jawaharlal Institute of Medical Education
          </div>
          <div class="exam-item">
            <strong>State Medical Exams</strong> - Various state-level tests
          </div>
        `;
      }
    } else if (interests.includes('engineer') || interests.includes('software') || interests.includes('programming')) {
      return `
        <div class="exam-item">
          <strong>JEE Main & Advanced</strong> - For IITs, NITs, IIITs
        </div>
        <div class="exam-item">
          <strong>BITSAT</strong> - BITS Pilani entrance
        </div>
        <div class="exam-item">
          <strong>State CETs</strong> - State engineering exams
        </div>
        <div class="exam-item">
          <strong>Company Exams</strong> - TCS, Infosys, Wipro, HCL, Cognizant
        </div>
        <div class="exam-item">
          <strong>GATE</strong> - For Masters in Engineering
        </div>
      `;
    } else if (interests.includes('government') || interests.includes('ssc') || interests.includes('upsc')) {
      return `
        <div class="exam-item">
          <strong>SSC CGL</strong> - Combined Graduate Level
        </div>
        <div class="exam-item">
          <strong>SSC CHSL</strong> - Combined Higher Secondary Level
        </div>
        <div class="exam-item">
          <strong>UPSC Civil Services</strong> - IAS, IPS, IFS
        </div>
        <div class="exam-item">
          <strong>Banking Exams</strong> - IBPS, SBI, RBI
        </div>
        <div class="exam-item">
          <strong>Railway Exams</strong> - RRB NTPC, Group D
        </div>
        <div class="exam-item">
          <strong>State PSCs</strong> - State government jobs
        </div>
      `;
    } else {
      return `
        <div class="exam-item">
          <strong>Research relevant entrance exams</strong> for your field
        </div>
        <div class="exam-item">
          <strong>Check company recruitment processes</strong>
        </div>
        <div class="exam-item">
          <strong>Explore certification courses</strong> to enhance skills
        </div>
      `;
    }
  }

  // ---------- SIMPLE FORMATTING FUNCTION - FIXED ----------
  function formatGuidance(text, studentName) {
    if (!text || text.trim() === '') {
      return getFallbackGuidance({ name: studentName || 'Student', stream: 'General', qualification: '11th-12th', interests: 'Career growth', futureGoals: 'not-sure' });
    }

    // If it's already HTML (from validation), return as is
    if (text.includes('<div class="guidance-section">')) {
      return text;
    }

    // SIMPLE FORMATTING - NO REPEAT SECTIONS
    let html = `
    <div class="guidance-section">
      <h2 class="main-heading">👋 Hey ${escapeHtml(studentName || 'Student')}, Don't Worry About Career!</h2>
    </div>

    <div class="guidance-section">
      <div class="section-content">
        ${escapeHtml(text).replace(/\n/g, '<br>')}
      </div>
    </div>

    <div class="motivation-box">
      <h3>🌟 You Can Do This!</h3>
      <p><strong>Remember: Right Guidance + Consistent Effort = SUCCESS! 🚀</strong></p>
      <p>Start your journey today and make your dreams come true! ✨</p>
    </div>
    `;

    return html;
  }

  function escapeHtml(s) {
    return String(s || '').replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[c]);
  }

  // ---------- Form submission ----------
  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      const formData = {
        name: safeGet('studentName') ? safeGet('studentName').value.trim() : '',
        qualification: qualification ? qualification.value : '',
        stream: getStreamData(),
        branch: branch ? branch.value : 'General',
        interests: safeGet('interests') ? safeGet('interests').value.trim() : '',
        futureGoals: safeGet('futureGoals') ? safeGet('futureGoals').value : 'not-sure'
      };

      // Basic validation
      if (!formData.name) {
        showNotification('Please enter your name', 'error');
        return;
      }
      if (!formData.qualification) {
        showNotification('Please select your qualification', 'error');
        return;
      }

      if (form) form.style.display = 'none';
      if (loadingSection) loadingSection.style.display = 'block';
      if (submitBtn) submitBtn.disabled = true;

      try {
        const guidance = await callCohereAPI(formData);

        if (loadingSection) loadingSection.style.display = 'none';
        if (resultsSection) resultsSection.style.display = 'block';
        if (guidanceContent) guidanceContent.innerHTML = formatGuidance(guidance, formData.name);

        showBlogRecommendation(formData.interests);
        updateStudentCount();
      } catch (err) {
        console.error('API Error:', err);
        if (loadingSection) loadingSection.style.display = 'none';
        if (resultsSection) resultsSection.style.display = 'block';
        if (guidanceContent) guidanceContent.innerHTML = getFallbackGuidance(formData);

        showBlogRecommendation(formData.interests);
        updateStudentCount();
      }
    });
  }

  // ---------- Feedback system ----------
  class FeedbackSystem {
    constructor() {
      this.storageKey = 'careerGuideFeedbacks';
      this.feedbacks = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
      this.init();
    }
    init() {
      this.loadFeedbacks();
      this.setupEventListeners();
    }
    setupEventListeners() {
      const feedbackForm = safeGet('feedbackForm');
      if (feedbackForm) {
        feedbackForm.addEventListener('submit', (e) => {
          e.preventDefault();
          this.submitFeedback();
        });
      }
    }
    submitFeedback() {
      const name = safeGet('feedbackName') ? safeGet('feedbackName').value.trim() : '';
      const city = safeGet('feedbackCity') ? safeGet('feedbackCity').value.trim() : '';
      const message = safeGet('feedbackMessage') ? safeGet('feedbackMessage').value.trim() : '';
      if (!name || !city || !message) {
        this.showNotification('Please fill all fields!', 'error');
        return;
      }
      const feedback = { id: Date.now(), name, city, message, timestamp: new Date().toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) };
      this.feedbacks.unshift(feedback);
      if (this.feedbacks.length > 50) this.feedbacks = this.feedbacks.slice(0, 50);
      localStorage.setItem(this.storageKey, JSON.stringify(this.feedbacks));
      this.loadFeedbacks();
      if (safeGet('feedbackForm')) safeGet('feedbackForm').reset();
      this.showNotification('Thanks for sharing your success story!', 'success');
    }
    loadFeedbacks() {
      const feedbackList = safeGet('feedbackList');
      if (!feedbackList) return;
      if (this.feedbacks.length === 0) {
        feedbackList.innerHTML = `<div class="feedback-card"><div class="feedback-message">No success stories yet. Be the first to share how CareerGuide helped you! 🚀</div></div>`;
        return;
      }
      feedbackList.innerHTML = this.feedbacks.map(f => `
        <div class="feedback-card">
          <div class="feedback-header"><div><div class="feedback-name">${escapeHtml(f.name)}</div><div class="feedback-city">${escapeHtml(f.city)}</div></div></div>
          <div class="feedback-message">"${escapeHtml(f.message)}"</div>
          <div class="feedback-time">${escapeHtml(f.timestamp)}</div>
        </div>
      `).join('');
    }
    showNotification(msg, type='success') { showNotification(msg, type); }
  }

  // Initialize pieces
  createBackgroundDots();
  new FeedbackSystem();

  // Expose some utilities to global so buttons in HTML can call them
  window.speakGuidance = speakGuidance;
  window.downloadGuidance = downloadGuidance;
  window.shareGuidance = shareGuidance;
  window.saveProgress = saveProgress;
  window.resetForm = function () {
    if (!form) return;
    form.reset();
    if (streamField) streamField.style.display = 'none';
    if (streamBranchContainer) streamBranchContainer.classList.remove('show');
    if (resultsSection) resultsSection.style.display = 'none';
    if (blogRecommendation) blogRecommendation.style.display = 'none';
    form.style.display = 'block';
    if (submitBtn) submitBtn.disabled = false;
  };

  // Add PERFECT CSS for new components
  const additionalCSS = `
    .main-heading {
      text-align: center;
      color: var(--primary-color);
      font-size: 2.2em;
      margin-bottom: 20px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .section-title {
      color: var(--primary-color);
      font-size: 1.5em;
      margin: 25px 0 15px 0;
      padding-bottom: 8px;
      border-bottom: 2px solid var(--primary-color);
    }

    .stream-alert {
      background: linear-gradient(135deg, #ff6b6b, #ee5a52);
      color: white;
      padding: 20px;
      border-radius: 12px;
      margin: 20px 0;
      text-align: center;
    }

    .stream-alert h3 {
      margin-bottom: 10px;
      font-size: 1.4em;
    }

    .career-options {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin: 20px 0;
    }

    .career-option {
      display: flex;
      align-items: flex-start;
      background: var(--card-bg);
      padding: 20px;
      border-radius: 12px;
      border: 1px solid var(--card-border);
      transition: transform 0.3s ease;
    }

    .career-option:hover {
      transform: translateY(-3px);
    }

    .career-icon {
      font-size: 2em;
      margin-right: 15px;
      min-width: 50px;
    }

    .career-details {
      flex: 1;
    }

    .career-details strong {
      display: block;
      font-size: 1.2em;
      margin-bottom: 8px;
      color: var(--primary-color);
    }

    .career-details p {
      margin: 8px 0;
      color: var(--text-color);
      opacity: 0.8;
    }

    .salary {
      color: #4CAF50;
      font-weight: bold;
      font-size: 0.9em;
    }

    .exams-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 15px;
      margin: 20px 0;
    }

    .exam-item {
      background: var(--card-bg);
      padding: 15px;
      border-radius: 8px;
      border-left: 4px solid var(--primary-color);
      transition: transform 0.3s ease;
    }

    .exam-item:hover {
      transform: translateX(5px);
    }

    .exam-item strong {
      color: var(--primary-color);
    }

    .action-steps {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin: 20px 0;
    }

    .action-card {
      display: flex;
      align-items: center;
      background: var(--card-bg);
      padding: 20px;
      border-radius: 12px;
      border: 1px solid var(--card-border);
      transition: transform 0.3s ease;
    }

    .action-card:hover {
      transform: translateX(5px);
    }

    .action-number {
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 1.2em;
      margin-right: 15px;
      flex-shrink: 0;
    }

    .action-content {
      flex: 1;
      font-size: 1em;
    }

    .motivation-box {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      border-radius: 20px;
      margin: 30px 0;
      text-align: center;
      box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
    }

    .motivation-box h3 {
      margin-bottom: 20px;
      font-size: 1.6em;
    }

    .motivation-box p {
      margin: 10px 0;
      font-size: 1.1em;
    }

    .scope-box {
      background: var(--card-bg);
      padding: 20px;
      border-radius: 12px;
      border: 1px solid var(--card-border);
    }

    .scope-box ul {
      list-style: none;
      padding: 0;
    }

    .scope-box li {
      padding: 10px 0;
      border-bottom: 1px solid var(--card-border);
    }

    .scope-box li:last-child {
      border-bottom: none;
    }

    .scope-box li strong {
      color: var(--primary-color);
    }

    .section-content {
      line-height: 1.7;
      font-size: 1.05em;
      background: var(--card-bg);
      padding: 20px;
      border-radius: 12px;
      border: 1px solid var(--card-border);
    }

    .section-content p {
      margin-bottom: 15px;
    }

    @media (max-width: 768px) {
      .career-options,
      .exams-list,
      .action-steps {
        grid-template-columns: 1fr;
      }
      
      .main-heading {
        font-size: 1.8em;
      }
    }
  `;

  // Add CSS to document
  const style = document.createElement('style');
  style.textContent = additionalCSS;
  document.head.appendChild(style);
});


