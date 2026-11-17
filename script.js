// Minimal, functional JavaScript without animations

document.addEventListener('DOMContentLoaded', () => {
  // Mobile navigation menu toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navItems = document.querySelectorAll('.nav-links a');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('nav-open');
      const isOpen = navLinks.classList.contains('nav-open');
      navToggle.setAttribute('aria-expanded', isOpen);
      navToggle.innerHTML = isOpen
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
    });

    // Close menu when a link is clicked on mobile
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        if (navLinks.classList.contains('nav-open')) {
          navLinks.classList.remove('nav-open');
          navToggle.setAttribute('aria-expanded', 'false');
          navToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
      });
    });
  }

  // Active section indicator on scroll
  const sections = document.querySelectorAll('section[id]');

  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 80;
      const sectionId = current.getAttribute('id');
      const correspondingLink = document.querySelector(`.nav-links a[href*="${sectionId}"]`);

      if (correspondingLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          correspondingLink.classList.add('active');
        } else {
          correspondingLink.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll);

  // Let's Connect Form - Real Email Delivery to mudirasunitha70@gmail.com
  const connectForm = document.getElementById('connectForm');
  const userName = document.getElementById('userName');
  const userPhone = document.getElementById('userPhone');
  const userEmail = document.getElementById('userEmail');
  const userMessage = document.getElementById('userMessage');
  const emailSubject = document.getElementById('emailSubject');
  const submitBtn = document.getElementById('submitBtn');
  const formFeedback = document.getElementById('formFeedback');

  if (connectForm) {
    connectForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nameVal = userName ? userName.value.trim() : '';
      const phoneVal = userPhone ? userPhone.value.trim() : '';
      const emailVal = userEmail ? userEmail.value.trim() : '';
      const msgVal = userMessage ? userMessage.value.trim() : '';

      if (emailSubject) {
        emailSubject.value = `[Portfolio Contact] Message from ${nameVal} (Phone: ${phoneVal})`;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      }

      try {
        const formData = new FormData(connectForm);
        const response = await fetch('https://formsubmit.co/ajax/mudirasunitha70@gmail.com', {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          if (formFeedback) {
            formFeedback.style.display = 'inline-block';
            formFeedback.className = 'form-feedback-alert';
            formFeedback.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully to Sunitha!';
          }
          connectForm.reset();
        } else {
          throw new Error('FormSubmit error');
        }
      } catch (err) {
        // Fallback: open mail client with message pre-filled
        const mailtoUrl = `mailto:mudirasunitha70@gmail.com?subject=${encodeURIComponent('[Portfolio] Contact from ' + nameVal)}&body=${encodeURIComponent('Name: ' + nameVal + '\nPhone: ' + phoneVal + '\nEmail: ' + emailVal + '\n\nMessage:\n' + msgVal)}`;
        window.location.href = mailtoUrl;

        if (formFeedback) {
          formFeedback.style.display = 'inline-block';
          formFeedback.innerHTML = '<i class="fas fa-envelope"></i> Opening your email client to send...';
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        }
      }
    });
  }
});
