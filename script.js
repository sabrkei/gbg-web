const { createApp, ref, reactive, nextTick, onMounted, onUnmounted } = Vue;

createApp({
  setup() {
    const activeSection = ref(null);
    let lastFocusedElement = null;

    const openSection = (name) => {
      lastFocusedElement = document.activeElement;
      activeSection.value = name;
      nextTick(() => document.querySelector('.back-btn')?.focus());
    };

    const goHome = () => {
      activeSection.value = null;
      nextTick(() => lastFocusedElement?.focus());
    };

    const onKeydown = (e) => {
      if (e.key === 'Escape' && activeSection.value) goHome();
    };

    onMounted(() => window.addEventListener('keydown', onKeydown));
    onUnmounted(() => window.removeEventListener('keydown', onKeydown));

    // Form state
    const formData = reactive({ name: '', email: '', message: '' });
    const formLoading = ref(false);
    const formStatus = reactive({ type: '', message: '' });
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xjgywnje';
    let formStatusTimeout = null;

    // Project data
    const personalProjects = ref([
      {
        title: 'The Daily Grind',
        description: 'First HTML/CSS project focusing on layout.',
        image: 'images/thedailygrindlogo.webp',
        link: 'https://github.com/sabrkei/the-daily-grind',
      },
      {
        title: 'United by Sound',
        description: 'UX/UI group project exploring community music.',
        image: 'images/unitedbysound.webp',
        link: 'https://github.com/sabrkei/united-by-sound',
      },
      {
        title: 'Football Stats Hub',
        description: 'Native JS API project comparing football teams.',
        image: 'images/footballstatshublogo.webp',
        link: 'https://github.com/sabrkei/football-stats-hub',
      },
      {
        title: 'Historical Currency Exchange Rates',
        description: 'Vue router project fetching historical exchange rates.',
        image: 'images/currencyexchange.webp',
        link: 'https://github.com/sabrkei/currencyexchange',
      },
    ]);

    const siteBuilds = ref([
      {
        title: 'Dance Spectacular',
        description: 'dancespectacular.us — Dance event in Clearwater, Florida',
        image: 'images/nyds.webp',
        link: 'https://dancespectacular.us',
      },
      {
        title: 'Locksafe',
        description: 'locksafe.se — Swedish security company',
        image: 'images/locksafe_cinema-1.webp',
        link: 'https://locksafe.se',
      },
    ]);

    // Form submission
    const submitForm = async () => {
      if (formStatusTimeout) clearTimeout(formStatusTimeout);
      formStatus.type = '';
      formStatus.message = '';
      formLoading.value = true;

      try {
        const response = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await response.json();

        if (response.ok) {
          formStatus.type = 'success';
          formStatus.message = "Message sent successfully! I'll get back to you soon.";
          Object.assign(formData, { name: '', email: '', message: '' });
          formStatusTimeout = setTimeout(() => {
            formStatus.type = '';
            formStatus.message = '';
          }, 5000);
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

    return {
      activeSection,
      openSection,
      goHome,
      personalProjects,
      siteBuilds,
      formData,
      formLoading,
      formStatus,
      submitForm,
    };
  },
}).mount('#app');
