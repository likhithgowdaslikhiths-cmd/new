/* Elite Cleaning Services — site script (vanilla JS, no dependencies) */
document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Mobile nav toggle ---------- */
  var hamburger = document.querySelector('.hamburger');
  var navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* ---------- Mobile Services submenu (expand/collapse) ---------- */
  var dropdownParent = document.querySelector('.has-dropdown > a');
  if (dropdownParent) {
    dropdownParent.addEventListener('click', function (e) {
      if (window.innerWidth <= 960) {
        e.preventDefault();
        dropdownParent.closest('.has-dropdown').classList.toggle('submenu-open');
      }
    });
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', function () {
      var wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (i) {
        if (i !== item) i.classList.remove('open');
      });
      item.classList.toggle('open', !wasOpen);
    });
  });

  /* ---------- Enquiry popup (delayed, remembered via localStorage) ---------- */
  var overlay = document.getElementById('enquiryPopup');
  if (overlay) {
    try {
      var dismissed = localStorage.getItem('ecs_popup_dismissed');
      if (!dismissed) {
        setTimeout(function () {
          overlay.classList.add('show');
        }, 12000);
      }
    } catch (err) { /* localStorage unavailable — skip popup */ }

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closePopup();
    });
    var closeBtn = overlay.querySelector('.close-modal');
    if (closeBtn) closeBtn.addEventListener('click', closePopup);

    function closePopup() {
      overlay.classList.remove('show');
      try { localStorage.setItem('ecs_popup_dismissed', '1'); } catch (err) {}
    }
  }

  /* ---------- Contact form validation ---------- */
  var form = document.getElementById('enquiryForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;

      var requiredFields = form.querySelectorAll('[data-required="true"]');
      requiredFields.forEach(function (field) {
        var wrapper = field.closest('.field');
        var value = field.value.trim();
        var fieldValid = value.length > 0;

        if (field.type === 'tel' && value) {
          fieldValid = /^[0-9+\-\s()]{8,15}$/.test(value);
        }
        if (field.type === 'email' && value) {
          fieldValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        }

        if (wrapper) wrapper.classList.toggle('invalid', !fieldValid);
        if (!fieldValid) valid = false;
      });

      var status = document.getElementById('formStatus');
      if (valid) {
        if (status) {
          status.textContent = 'Thank you — your enquiry details are ready. Please tap "Send via WhatsApp" or "Call Us" below to reach us directly, as this form is not yet connected to a live inbox.';
          status.style.color = '#2E8B8D';
          status.classList.add('show');
        }
        form.reset();
      } else {
        if (status) {
          status.textContent = 'Please check the highlighted fields and try again.';
          status.style.color = '#B23A3A';
          status.classList.add('show');
        }
      }
    });
  }

  /* ---------- Lazy-load images (native + fallback class hook) ---------- */
  document.querySelectorAll('img[data-src]').forEach(function (img) {
    img.setAttribute('loading', 'lazy');
    img.src = img.getAttribute('data-src');
  });

});
