const { createApp, ref, reactive, onMounted } = Vue;

createApp({
  setup() {
    const activeTheme = ref("light");
    const currentSectionNum = ref("01 / 06");
    const isHeaderHidden = ref(false);
    const isHeaderForced = ref(false);
    const isScrollUpVisible = ref(false);
    const scrollContainer = ref(null);
    const aboutTextSide = ref(null);
    const isAboutAtBottom = ref(false);
    const mobileMenuOpen = ref(false);
    const switchAudio = ref(null);

    // Contact form state
    const formData = reactive({
      name: '',
      email: '',
      message: ''
    });
    const formLoading = ref(false);
    const formStatus = reactive({
      type: '',
      message: ''
    });

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
        description:
          "nydancespectacular.com - Dance event in Clearwater, Florida",
        image: "images/nyds.webp",
        link: "https://nydancespectacular.com",
      },
      {
        title: "Locksafe",
        description:
          "locksafe.se - Security solutions provider in Sweden",
        image: "images/locksafe_cinema-1.webp",
        link: "https://locksafe.se",
      },
    ]);

    const toggleTheme = () => {
      if (switchAudio.value) {
        switchAudio.value.currentTime = 0;
        switchAudio.value.play().catch(() => {});
      }
      activeTheme.value = activeTheme.value === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", activeTheme.value);
    };

    let ticking = false;
    const handleScroll = (e) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const top = e.target.scrollTop;
          isHeaderHidden.value = top > 100;
          isScrollUpVisible.value = top > 500;
          ticking = false;
        });
        ticking = true;
      }
    };

    const checkAboutScroll = (e) => {
      const el = e.target;
      isAboutAtBottom.value =
        el.scrollHeight - el.scrollTop <= el.clientHeight + 40;
    };

    const handleAboutIconClick = () => {
      if (isAboutAtBottom.value)
        aboutTextSide.value.scrollTo({ top: 0, behavior: "smooth" });
      else aboutTextSide.value.scrollBy({ top: 350, behavior: "smooth" });
    };

    const scrollToSection = (id) => {
      const el = document.getElementById(id);
      if (el && scrollContainer.value) {
        scrollContainer.value.scrollTo({
          top: el.offsetTop,
          behavior: "smooth",
        });
      }
    };

    const scrollToTop = () =>
      scrollContainer.value.scrollTo({ top: 0, behavior: "smooth" });

    // Contact form submission via Formspree
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xjgywnje';

    const submitForm = async () => {
      formStatus.type = '';
      formStatus.message = '';
      formLoading.value = true;

      try {
        const response = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message
          })
        });

        const data = await response.json();

        if (response.ok) {
          formStatus.type = 'success';
          formStatus.message = 'Message sent successfully! I\'ll get back to you soon.';
          formData.name = '';
          formData.email = '';
          formData.message = '';
        } else {
          formStatus.type = 'error';
          formStatus.message = data.errors?.[0]?.message || 'Failed to send message. Please try again.';
        }
      } catch (error) {
        formStatus.type = 'error';
        formStatus.message = 'Network error. Please check your connection and try again.';
      } finally {
        formLoading.value = false;
      }
    };

    onMounted(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              currentSectionNum.value = entry.target.getAttribute("data-num");
              // Add class to trigger fade-in animations with requestAnimationFrame for smoothness
              requestAnimationFrame(() => {
                entry.target.classList.add('is-visible');
              });
            } else {
              // Remove class to reset animations when scrolling away
              requestAnimationFrame(() => {
                entry.target.classList.remove('is-visible');
              });
            }
          });
        },
        { root: scrollContainer.value, threshold: 0.2 } // Trigger when 20% of the section is visible
      );
      document.querySelectorAll(".section").forEach((s) => observer.observe(s));

      // Calculate scrollbar width to prevent header overlap
      const updateScrollbarWidth = () => {
        if (scrollContainer.value) {
          const sbWidth = scrollContainer.value.offsetWidth - scrollContainer.value.clientWidth;
          document.documentElement.style.setProperty('--scrollbar-width', `${sbWidth}px`);
        }
      };
      updateScrollbarWidth();
      window.addEventListener('resize', updateScrollbarWidth);

      // Fix scroll trap in About section when using mandatory snap
      if (aboutTextSide.value) {
        aboutTextSide.value.addEventListener("wheel", (e) => {
          const el = aboutTextSide.value;
          const isAtBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 10;

          if (isAtBottom && e.deltaY > 0) {
            e.preventDefault();
            scrollContainer.value.scrollBy({
              top: window.innerHeight,
              behavior: "smooth",
            });
          }
        }, { passive: false });
      }

      // 3D Tilt Effect for Project Cards (Desktop only)
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      if (!isTouchDevice) {
        document.querySelectorAll('.project-card').forEach(card => {
          card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
          });

          card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
          });
        });
      }
    });

    return {
      activeTheme,
      currentSectionNum,
      isHeaderHidden,
      isHeaderForced,
      isScrollUpVisible,
      scrollContainer,
      aboutTextSide,
      isAboutAtBottom,
      mobileMenuOpen,
      switchAudio,
      projects,
      customerProjects,
      toggleTheme,
      handleScroll,
      checkAboutScroll,
      handleAboutIconClick,
      scrollToSection,
      scrollToTop,
      formData,
      formLoading,
      formStatus,
      submitForm,
    };
  },
}).mount("#app");
