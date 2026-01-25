const { createApp, ref, reactive, onMounted } = Vue;

createApp({
  setup() {
    // UI State
    const isHeaderHidden = ref(false);
    const isHeaderForced = ref(false);
    const isScrollUpVisible = ref(false);
    const isAboutAtBottom = ref(false);
    const mobileMenuOpen = ref(false);

    // DOM Refs
    const scrollContainer = ref(null);
    const aboutTextSide = ref(null);

    // Form State
    const formData = reactive({ name: '', email: '', message: '' });
    const formLoading = ref(false);
    const formStatus = reactive({ type: '', message: '' });
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xjgywnje';

    // Project Data
    const projects = ref([
      {
        title: "The Daily Grind",
        description: "First HTML/CSS project focusing on layout.",
        image: "images/thedailygrindlogo.webp",
        link: "https://github.com/sabrkei/the-daily-grind",
      },
      {
        title: "United by Sound",
        description: "UX/UI group project exploring community music.",
        image: "images/unitedbysound.webp",
        link: "https://github.com/sabrkei/united-by-sound",
      },
      {
        title: "Football Stats Hub",
        description: "Native JS API project comparing football teams.",
        image: "images/footballstatshublogo.webp",
        link: "https://github.com/sabrkei/football-stats-hub",
      },
    ]);

    const customerProjects = ref([
      {
        title: "NYDS",
        description: "nydancespectacular.com - Dance event in Clearwater, Florida",
        image: "images/nyds.webp",
        link: "https://nydancespectacular.com",
      }
    ]);

    // Scroll Handling
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
      scrollContainer.value.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Form Submission
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

    // Initialize
    onMounted(() => {
      // Section visibility observer
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            requestAnimationFrame(() => {
              if (entry.isIntersecting) {
                entry.target.classList.add('is-visible', 'was-visible');
              } else {
                entry.target.classList.remove('is-visible');
              }
            });
          });
        },
        { root: scrollContainer.value, threshold: 0.5 }
      );
      document.querySelectorAll('.section').forEach((s) => observer.observe(s));

      // Scrollbar width calculation
      const updateScrollbarWidth = () => {
        if (scrollContainer.value) {
          const width = scrollContainer.value.offsetWidth - scrollContainer.value.clientWidth;
          document.documentElement.style.setProperty('--scrollbar-width', `${width}px`);
        }
      };
      updateScrollbarWidth();
      window.addEventListener('resize', updateScrollbarWidth);

      // About section wheel navigation
      if (aboutTextSide.value) {
        aboutTextSide.value.addEventListener('wheel', (e) => {
          const el = aboutTextSide.value;
          const isAtTop = el.scrollTop <= 5;
          const isAtBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 10;

          if (isAtTop && e.deltaY < 0) return;
          if (isAtBottom && e.deltaY > 0) {
            e.preventDefault();
            scrollContainer.value.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
          }
        }, { passive: false });
      }
    });

    return {
      isHeaderHidden,
      isHeaderForced,
      isScrollUpVisible,
      isAboutAtBottom,
      mobileMenuOpen,
      scrollContainer,
      aboutTextSide,
      projects,
      customerProjects,
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
