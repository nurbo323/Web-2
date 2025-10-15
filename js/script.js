document.addEventListener('DOMContentLoaded', () => {
  // === Change Background ===
  const bgBtn = document.getElementById('bgBtn');
  const colors = ['#0a0a0f', '#050509', '#1a1a2e', '#0f0f1a', '#101010', '#001f3f'];
  if (bgBtn) {
    bgBtn.addEventListener('click', () => {
      document.body.style.background = colors[Math.floor(Math.random() * colors.length)];
    });
  }

  // === Date and Time (Astana) ===
  const dateTimeBlock = document.getElementById('dateTime');
  if (dateTimeBlock) {
    function updateDateTime() {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Almaty', // ✅ время Астаны
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };
      dateTimeBlock.textContent = now.toLocaleString('en-US', options);
    }
    updateDateTime();
    setInterval(updateDateTime, 1000);
  }

  // === Popup Subscribe Form ===
  const popup = document.getElementById('popupForm'); // ✅ исправлено ID
  const openPopup = document.getElementById('openPopup');
  const closePopup = document.getElementById('closePopup');
  const form = document.getElementById('subscribeForm');

  if (openPopup && popup && closePopup && form) {
    // Open popup
    openPopup.addEventListener('click', () => {
      popup.style.display = 'flex';
    });

    // Close popup with X button
    closePopup.addEventListener('click', () => {
      popup.style.display = 'none';
    });

    // Close popup when clicking outside the form
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        popup.style.display = 'none';
      }
    });

    // Validate form
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('subName');
      const email = document.getElementById('subEmail');
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // ✅ гибкая проверка email

      if (name.value.trim() === '') {
        alert('Please enter your name.');
        return;
      }
      if (!email.value.match(emailPattern)) {
        alert('Please enter a valid email address (e.g. user@gmail.com).');
        return;
      }

      alert(`Thank you for subscribing, ${name.value}!`);
      form.reset();
      popup.style.display = 'none';
    });
  }

  // === Contact Form Validation (if exists) ===
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const message = document.getElementById('message');
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      let valid = true;

      // Validate name
      if (name.value.trim() === '') {
        name.classList.add('is-invalid');
        valid = false;
      } else {
        name.classList.remove('is-invalid');
      }

      // Validate email
      if (!email.value.match(emailPattern)) {
        email.classList.add('is-invalid');
        valid = false;
      } else {
        email.classList.remove('is-invalid');
      }

      // Validate message (если есть)
      if (message && message.value.trim() === '') {
        message.classList.add('is-invalid');
        valid = false;
      } else if (message) {
        message.classList.remove('is-invalid');
      }

      // Submit success
      if (valid) {
        alert('Thank you, ' + name.value + '! Your message has been sent.');
        contactForm.reset();
      }
    });
  }
});
