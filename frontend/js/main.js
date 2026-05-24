(function(){

  // ==========================================
  // 1. SUPABASE CONFIGURATION
  // ==========================================
  const SUPABASE_URL = 'https://qplqcptsqqitvhgymydq.supabase.co';
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwbHFjcHRzcXFpdHZoZ3lteWRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwOTQwODIsImV4cCI6MjA4NjY3MDA4Mn0.BzfMiz8Znd8Td1TRWjacMVq0WcDf5lHcHm21HB0zdX0';
  
  // HELPER: Auto-load Supabase if missing from HTML
  async function getSupabase() {
      if (window.supabase) {
          return window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
      }
      console.log("Supabase library missing. Auto-loading...");
      return new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
          script.onload = () => {
              console.log("Supabase loaded successfully.");
              resolve(window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY));
          };
          script.onerror = () => reject(new Error("Failed to load Supabase library."));
          document.head.appendChild(script);
      });
  }

  // ==========================================
  // 2. TOAST NOTIFICATION LOGIC (CENTERED)
  // ==========================================
  function showToast(message, type = 'success') {
    // 1. Create Container if missing (CENTERED)
    let container = document.querySelector('.toast-container-main');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container-main';
        // Center positioning
        container.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 9999; display: flex; flex-direction: column; gap: 10px; align-items: center; pointer-events: none;';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    const color = type === 'success' ? '#00a896' : '#ef4444';
    const icon = type === 'success' ? '<i class="fa-solid fa-circle-check"></i>' : '<i class="fa-solid fa-circle-exclamation"></i>';
    
    // Popup Style (Bigger, Bouncier)
    toast.style.cssText = `
        background: white; border-left: 5px solid ${color}; padding: 20px 25px;
        border-radius: 8px; box-shadow: 0 15px 40px rgba(0,0,0,0.25);
        font-family: 'Inter', sans-serif; font-size: 1rem; font-weight: 600;
        display: flex; align-items: center; gap: 12px;
        pointer-events: auto;
        animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        max-width: 400px;
    `;
    
    toast.innerHTML = `<span style="color:${color}; font-size:1.3rem;">${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);

    // Inject Keyframes for Pop Animation
    if (!document.getElementById('toast-style')) {
        const style = document.createElement('style');
        style.id = 'toast-style';
        style.innerHTML = `@keyframes popIn { from { opacity: 0; transform: scale(0.7); } to { opacity: 1; transform: scale(1); } } @keyframes popOut { to { opacity: 0; transform: scale(0.7); } }`;
        document.head.appendChild(style);
    }

    // Auto remove
    setTimeout(() => {
        toast.style.animation = 'popOut 0.3s ease-in forwards';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // ==========================================
  // 3. CONTACT FORM LOGIC (Footer - All Pages)
  // ==========================================
  function initContactForm(){
    const contactForm = document.getElementById('footerContactForm');
    if(!contactForm) return;

    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();

      const btn = document.getElementById('c_submit_btn');
      const originalText = btn.innerHTML;
      const formData = new FormData(contactForm);

      // --- HONEYPOT CHECK ---
      if (formData.get('honeypot')) {
          console.warn("Bot detected via Footer.");
          showToast("Message Sent Successfully!", "success"); // Fake success
          contactForm.reset();
          return;
      }
      
      btn.innerHTML = 'Sending...';
      btn.disabled = true;

      try {
        const supabase = await getSupabase();
        
        const inquiryData = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            email: formData.get('email') || "no-email@provided.com", 
            message: formData.get('message'),
            status: 'Pending'
        };

        const { error } = await supabase
            .from('inquiries')
            .insert([inquiryData]);

        if (error) throw error;

        showToast("Message sent to Dr. Ghosh!", "success");
        contactForm.reset();

      } catch (err) {
        console.error("Submission Error:", err);
        showToast("Error: " + err.message, "error");
      } finally {
        btn.disabled = false;
        btn.innerHTML = originalText;
      }
    });
  }

  // ==========================================
  // 4. UI INTERACTION LOGIC (Preserved)
  // ==========================================

  // Sticky Header
  function initStickyHeader(){
    var header = document.querySelector('[data-header]');
    if(!header) return;

    var ticking = false;
    function onScroll(){
      if(ticking) return;
      ticking = true;
      window.requestAnimationFrame(function(){
        header.classList.toggle('is-scrolled', window.scrollY > 10);
        ticking = false;
      });
    }
    onScroll(); 
    window.addEventListener('scroll', onScroll, {passive:true});
  }

  // Mobile Menu
  function initMobileNav(){
    var toggle = document.querySelector('[data-nav-toggle]');
    var panel = document.querySelector('[data-nav-panel]');
    var icon = document.getElementById('nav-icon');
    
    if(!toggle || !panel) return;

    function setOpen(open){
      panel.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : ''; 

      if(icon) {
        if(open) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    }

    toggle.addEventListener('click', function(e){
      e.stopPropagation(); 
      var isOpen = panel.classList.contains('is-open');
      setOpen(!isOpen);
    });

    var links = panel.querySelectorAll('a');
    Array.prototype.forEach.call(links, function(link){
      link.addEventListener('click', function(){ setOpen(false); });
    });

    document.addEventListener('click', function(e){
      if(panel.classList.contains('is-open') && !panel.contains(e.target) && !toggle.contains(e.target)){
        setOpen(false);
      }
    });
  }

  // Image Modal
  function initImageModal(){
    var modal = document.getElementById('image-modal');
    if(!modal) return;
    
    var modalImg = document.getElementById('modal-img');
    var triggers = document.querySelectorAll('[data-open-modal]');
    var closeBtns = document.querySelectorAll('[data-close-modal]');

    function openModal(src){
      modalImg.src = src;
      modal.classList.add('is-visible');
      modal.setAttribute('aria-hidden', 'false');
    }

    function closeModal(){
      modal.classList.remove('is-visible');
      modal.setAttribute('aria-hidden', 'true');
      setTimeout(function(){ modalImg.src = ''; }, 300);
    }

    Array.prototype.forEach.call(triggers, function(btn){
      btn.addEventListener('click', function(e){
        e.preventDefault();
        var img = btn.querySelector('img'); 
        if(img) openModal(img.src); 
      });
    });

    Array.prototype.forEach.call(closeBtns, function(btn){
      btn.addEventListener('click', closeModal);
    });
    
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape' && modal.classList.contains('is-visible')) {
        closeModal();
      }
    });
  }

  // Counter Animation
  function initCounters() {
    const counters = document.querySelectorAll('.counter-val');
    if (counters.length === 0) return;

    const duration = 2000; 

    const animate = (counter) => {
      const value = +counter.getAttribute('data-target');
      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1); 
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.floor(easeProgress * value);
        counter.innerText = currentVal.toLocaleString();

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          counter.innerText = value.toLocaleString();
        }
      };
      requestAnimationFrame(updateCount);
    }

    const observerOptions = { threshold: 0.5 };
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    counters.forEach(counter => {
      observer.observe(counter);
    });
  }

  // Badge Fly-In Animation
  function initBadgeAnimation() {
    var pills = document.querySelectorAll('.cert-pill');
    if(pills.length === 0) return;

    var observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
    var observer = new IntersectionObserver(function(entries, obs) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var target = entry.target;
          target.classList.add('is-visible');
          obs.unobserve(target); 
        }
      });
    }, observerOptions);

    pills.forEach(function(pill, index) {
      pill.style.transitionDelay = (index * 0.1) + 's';
      observer.observe(pill);
    });
  }

  // Video Modal Logic
  function initVideoFacades() {
    var facades = document.querySelectorAll('.video-facade');
    var modal = document.getElementById('video-modal');
    var wrapper = document.getElementById('video-frame-wrapper'); 
    var content = document.getElementById('video-modal-content'); 
    var closeButtons = document.querySelectorAll('[data-close-video]');
    var overlay = document.querySelector('.video-modal-overlay');

    if (!modal || !wrapper || !content) return;

    function openModal(videoId, type) {
      wrapper.style.maxWidth = '';
      content.style.paddingBottom = ''; 
      var isDesktop = window.innerWidth > 1024;

      if (type === 'vertical') {
        if (isDesktop) { wrapper.style.maxWidth = '320px'; } 
        else { wrapper.style.maxWidth = '400px'; }
        content.style.paddingBottom = '177.77%'; 
      } else {
        wrapper.style.maxWidth = isDesktop ? '850px' : '900px'; 
        content.style.paddingBottom = '56.25%'; 
      }

      content.innerHTML = '<iframe src="https://www.youtube.com/embed/' + videoId + '?autoplay=1&playsinline=1&controls=1&rel=0&modestbranding=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
      modal.classList.add('is-visible');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden'; 
    }

    function closeModal() {
      modal.classList.remove('is-visible');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = ''; 
      setTimeout(function(){ content.innerHTML = ''; }, 300);
    }

    Array.prototype.forEach.call(facades, function(facade) {
      facade.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        var videoId = this.getAttribute('data-id');
        if (!videoId) return;
        var isVertical = this.closest('.edu-card-tall') !== null;
        var type = isVertical ? 'vertical' : 'horizontal';
        openModal(videoId, type);
      });
    });

    Array.prototype.forEach.call(closeButtons, function(btn) {
      btn.addEventListener('click', closeModal);
    });

    if(overlay) { overlay.addEventListener('click', closeModal); }

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.classList.contains('is-visible')) {
        closeModal();
      }
    });
  }

  // Scroll to Top
  function initScrollTop() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 400) { scrollTopBtn.classList.add('is-visible'); } 
        else { scrollTopBtn.classList.remove('is-visible'); }
      });
      scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  // ==========================================
  // 5. INITIALIZATION
  // ==========================================
  document.addEventListener('DOMContentLoaded', function(){
    // Initialize Logic
    initContactForm();

    // UI Logic
    initStickyHeader();
    initMobileNav();
    initImageModal();
    initCounters(); 
    initBadgeAnimation(); 
    initVideoFacades();
    initScrollTop();
  });

})();