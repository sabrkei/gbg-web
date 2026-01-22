const { createApp, ref, onMounted } = Vue;

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

    // Lego brick overlays - varied sizes on a 12x10 grid
    // These are just the brick shapes (borders/studs), not image slices
    const legoBricks = [
      // Row 0
      { x: 0, y: 0, w: 3 }, { x: 3, y: 0, w: 2 }, { x: 5, y: 0, w: 4 }, { x: 9, y: 0, w: 3 },
      // Row 1
      { x: 0, y: 1, w: 2 }, { x: 2, y: 1, w: 4 }, { x: 6, y: 1, w: 3 }, { x: 9, y: 1, w: 3 },
      // Row 2
      { x: 0, y: 2, w: 4 }, { x: 4, y: 2, w: 2 }, { x: 6, y: 2, w: 4 }, { x: 10, y: 2, w: 2 },
      // Row 3
      { x: 0, y: 3, w: 3 }, { x: 3, y: 3, w: 3 }, { x: 6, y: 3, w: 2 }, { x: 8, y: 3, w: 4 },
      // Row 4
      { x: 0, y: 4, w: 2 }, { x: 2, y: 4, w: 4 }, { x: 6, y: 4, w: 3 }, { x: 9, y: 4, w: 3 },
      // Row 5
      { x: 0, y: 5, w: 4 }, { x: 4, y: 5, w: 3 }, { x: 7, y: 5, w: 2 }, { x: 9, y: 5, w: 3 },
      // Row 6
      { x: 0, y: 6, w: 3 }, { x: 3, y: 6, w: 2 }, { x: 5, y: 6, w: 4 }, { x: 9, y: 6, w: 3 },
      // Row 7
      { x: 0, y: 7, w: 2 }, { x: 2, y: 7, w: 3 }, { x: 5, y: 7, w: 3 }, { x: 8, y: 7, w: 4 },
      // Row 8
      { x: 0, y: 8, w: 4 }, { x: 4, y: 8, w: 2 }, { x: 6, y: 8, w: 3 }, { x: 9, y: 8, w: 3 },
      // Row 9
      { x: 0, y: 9, w: 3 }, { x: 3, y: 9, w: 4 }, { x: 7, y: 9, w: 2 }, { x: 9, y: 9, w: 3 },
    ];

    const gridCols = 12;
    const gridRows = 10;

    const getTileStyle = (index) => {
      const brick = legoBricks[index - 1];
      if (!brick) return { display: 'none' };

      // Build from bottom-up, left-to-right
      const buildOrder = (gridRows - 1 - brick.y) * gridCols + brick.x;
      const delay = buildOrder * 0.06;

      // Position and size
      const left = (brick.x / gridCols) * 100;
      const top = (brick.y / gridRows) * 100;
      const width = (brick.w / gridCols) * 100;
      const height = (1 / gridRows) * 100;

      return {
        left: `${left}%`,
        top: `${top}%`,
        width: `${width}%`,
        height: `${height}%`,
        '--stud-count': brick.w,
        animationDelay: `${delay}s`,
      };
    };

    const brickCount = ref(legoBricks.length);

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
      activeTheme.value = activeTheme.value === "dark" ? "light" : "dark";
      document.body.setAttribute("data-theme", activeTheme.value);
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

    onMounted(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting)
              currentSectionNum.value = entry.target.getAttribute("data-num");
          });
        },
        { root: scrollContainer.value, threshold: 0.5 }
      );
      document.querySelectorAll(".section").forEach((s) => observer.observe(s));
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
      projects,
      customerProjects,
      toggleTheme,
      handleScroll,
      checkAboutScroll,
      handleAboutIconClick,
      scrollToSection,
      scrollToTop,
      getTileStyle,
      brickCount,
    };
  },
}).mount("#app");
