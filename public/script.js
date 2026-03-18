// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id === '#') return;
    const el = document.querySelector(id);
    if (el) { 
      e.preventDefault(); 
      el.scrollIntoView({ behavior: 'smooth' }); 
    }
  });
});

// Reveal animations on scroll
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close menu when clicking a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

// Form submit
const submitBtn = document.querySelector('.btn-submit');
if (submitBtn) {
  submitBtn.addEventListener('click', async () => {
    const name = document.querySelector('input[placeholder="Your Name"]').value;
    const phone = document.querySelector('input[placeholder="Phone Number"]').value;
    const email = document.querySelector('input[placeholder="Email Address"]').value;
    const message = document.querySelector('textarea').value;

    if (!name || !phone) {
      alert("Please enter at least your name and phone number.");
      return;
    }

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, message })
      });

      const data = await res.json();
      if (data.success) {
        alert("Thank you! Your inquiry has been submitted successfully.");
        // Clear form
        document.querySelector('input[placeholder="Your Name"]').value = '';
        document.querySelector('input[placeholder="Phone Number"]').value = '';
        document.querySelector('input[placeholder="Email Address"]').value = '';
        document.querySelector('textarea').value = '';
      } else {
        alert("Error submitting form. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again later.");
    }
  });
}

// Active nav on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { 
    if (window.scrollY >= s.offsetTop - 120) {
      current = s.id; 
    }
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? '#cc0000' : '';
  });
});
