const { createApp, ref, reactive, onMounted, onUnmounted } = Vue;

createApp({
  setup() {
    // UI State
    const isHeaderHidden = ref(false);
    const isHeaderForced = ref(false);
    const isScrollUpVisible = ref(false);
    const isAboutAtBottom = ref(false);
    const mobileMenuOpen = ref(false);
    const isOnHeroSection = ref(true);

    // DOM Refs
    const scrollContainer = ref(null);
    const aboutTextSide = ref(null);
    const heroVideo = ref(null);
    const aboutVideo = ref(null);

    // Form State
    const formData = reactive({ name: '', email: '', message: '' });
    const formLoading = ref(false);
    const formStatus = reactive({ type: '', message: '' });
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xjgywnje';

    // Project Data
    const allProjects = ref([
      {
        title: "The Daily Grind",
        description: "First HTML/CSS project focusing on layout.",
        image: "images/thedailygrindlogo.webp",
        link: "https://github.com/sabrkei/the-daily-grind",
        linkType: "repo",
      },
      {
        title: "United by Sound",
        description: "UX/UI group project exploring community music.",
        image: "images/unitedbysound.webp",
        link: "https://github.com/sabrkei/united-by-sound",
        linkType: "repo",
      },
      {
        title: "Football Stats Hub",
        description: "Native JS API project comparing football teams.",
        image: "images/footballstatshublogo.webp",
        link: "https://github.com/sabrkei/football-stats-hub",
        linkType: "repo",
      },
      {
        title: "NYDS",
        description: "nydancespectacular.com - Dance event in Clearwater, Florida",
        image: "images/nyds.webp",
        link: "https://nydancespectacular.com",
        linkType: "site",
      }
    ]);

    // Scroll Handling with passive listener optimization
    let ticking = false;
    const handleScroll = (e) => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const top = e.target.scrollTop;
        isHeaderHidden.value = top > 100;
        isScrollUpVisible.value = top > 500;
        ticking = false;
      });
    };

    const checkAboutScroll = (e) => {
      const el = e.target;
      isAboutAtBottom.value = el.scrollHeight - el.scrollTop <= el.clientHeight + 40;
    };

    const handleAboutIconClick = () => {
      if (isAboutAtBottom.value) {
        aboutTextSide.value.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        aboutTextSide.value.scrollBy({ top: 350, behavior: 'smooth' });
      }
    };

    const scrollToSection = (id) => {
      const el = document.getElementById(id);
      if (el && scrollContainer.value) {
        scrollContainer.value.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
      }
    };

    const scrollToTop = () => {
      scrollContainer.value?.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Form Submission with better error handling
    const submitForm = async () => {
      formStatus.type = '';
      formStatus.message = '';
      formLoading.value = true;

      try {
        const response = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(formData)
        });
        const data = await response.json();

        if (response.ok) {
          formStatus.type = 'success';
          formStatus.message = "Message sent successfully! I'll get back to you soon.";
          Object.assign(formData, { name: '', email: '', message: '' });
        } else {
          formStatus.type = 'error';
          formStatus.message = data.errors?.[0]?.message || 'Failed to send message. Please try again.';
        }
      } catch {
        formStatus.type = 'error';
        formStatus.message = 'Network error. Please check your connection and try again.';
      } finally {
        formLoading.value = false;
      }
    };

    // Lazy load iframe when skills section is visible
    const loadCVIframe = () => {
      const iframe = document.querySelector('.cv-iframe[data-src]');
      if (iframe && !iframe.src) {
        iframe.src = iframe.dataset.src;
      }
    };

    // Initialize
    let resizeHandler = null;
    let wheelHandler = null;

    onMounted(() => {
      // Section visibility observer with optimized callbacks
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible', 'was-visible');

              // Track if we're on hero section for navbar visibility
              if (entry.target.id === 'hero') {
                isOnHeroSection.value = true;
              }

              // Lazy load CV iframe when skills section is visible
              if (entry.target.id === 'skills') {
                loadCVIframe();
              }

              // Reset About Me scroll position when section becomes visible
              if (entry.target.id === 'about-me') {
                if (aboutTextSide.value) {
                  aboutTextSide.value.scrollTop = 0;
                  isAboutAtBottom.value = false;
                }
                // Load about video when section is visible (all devices)
                if (aboutVideo.value && !aboutVideo.value.src) {
                  aboutVideo.value.src = 'videos/family.mp4';
                  aboutVideo.value.load();
                }
              }
            } else {
              entry.target.classList.remove('is-visible');
              // Hide navbar when leaving hero section
              if (entry.target.id === 'hero') {
                isOnHeroSection.value = false;
                mobileMenuOpen.value = false; // Close menu when leaving hero
              }
            }
          });
        },
        { root: scrollContainer.value, threshold: 0.3 }
      );
      document.querySelectorAll('.section').forEach((s) => observer.observe(s));

      // Scrollbar width calculation (prevents layout shift)
      const updateScrollbarWidth = () => {
        if (scrollContainer.value) {
          const width = scrollContainer.value.offsetWidth - scrollContainer.value.clientWidth;
          document.documentElement.style.setProperty('--scrollbar-width', `${width}px`);
        }
      };
      updateScrollbarWidth();
      resizeHandler = updateScrollbarWidth;
      window.addEventListener('resize', resizeHandler, { passive: true });

      // About section wheel navigation
      if (aboutTextSide.value) {
        wheelHandler = (e) => {
          const el = aboutTextSide.value;
          if (!el) return;

          const isAtTop = el.scrollTop <= 5;
          const isAtBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 10;

          if (isAtTop && e.deltaY < 0) return;
          if (isAtBottom && e.deltaY > 0) {
            e.preventDefault();
            scrollContainer.value?.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
          }
        };
        aboutTextSide.value.addEventListener('wheel', wheelHandler, { passive: false });
      }

      // Load hero video on all devices
      if (heroVideo.value) {
        const heroObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting && heroVideo.value && !heroVideo.value.src) {
                heroVideo.value.src = 'videos/hero.mp4';
                heroVideo.value.load();
                heroObserver.disconnect();
              }
            });
          },
          { threshold: 0.1 }
        );
        heroObserver.observe(document.getElementById('hero'));
      }
    });

    // Cleanup event listeners on unmount
    onUnmounted(() => {
      if (resizeHandler) {
        window.removeEventListener('resize', resizeHandler);
      }
      if (wheelHandler && aboutTextSide.value) {
        aboutTextSide.value.removeEventListener('wheel', wheelHandler);
      }
    });

    return {
      isHeaderHidden,
      isHeaderForced,
      isScrollUpVisible,
      isAboutAtBottom,
      mobileMenuOpen,
      isOnHeroSection,
      scrollContainer,
      aboutTextSide,
      heroVideo,
      aboutVideo,
      allProjects,
      formData,
      formLoading,
      formStatus,
      handleScroll,
      checkAboutScroll,
      handleAboutIconClick,
      scrollToSection,
      scrollToTop,
      submitForm,
    };
  },
}).mount('#app');
