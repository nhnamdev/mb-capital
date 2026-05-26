/* MB Capital - shared JS */
(function () {
  'use strict';

  // ===== Mobile menu toggle =====
  document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.querySelector('.mobile-nav-toggle');
    const navbar = document.querySelector('#navbar');
    if (toggle && navbar) {
      toggle.addEventListener('click', function () {
        navbar.classList.toggle('mobile-open');
        toggle.classList.toggle('bi-list');
        toggle.classList.toggle('bi-x');
      });
    }

    // Dropdown click on mobile
    document.querySelectorAll('#navbar .dropdown > a').forEach(function (a) {
      a.addEventListener('click', function (e) {
        if (window.innerWidth <= 992) {
          e.preventDefault();
          const li = a.parentElement;
          li.classList.toggle('open');
          const sub = li.querySelector('ul');
          if (sub) sub.style.display = li.classList.contains('open') ? 'flex' : 'none';
        }
      });
    });
  });

  // ===== Banner carousel (auto-advance) =====
  document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.getElementById('myCarousel');
    if (!carousel) return;
    const items = carousel.querySelectorAll('.carousel-item');
    if (items.length <= 1) return;

    let idx = 0;
    function show(i) {
      items.forEach(function (it, k) { it.classList.toggle('active', k === i); });
    }
    function next() { idx = (idx + 1) % items.length; show(idx); }
    function prev() { idx = (idx - 1 + items.length) % items.length; show(idx); }

    setInterval(next, 5000);

    const prevBtn = carousel.querySelector('.carousel-control-prev');
    const nextBtn = carousel.querySelector('.carousel-control-next');
    if (prevBtn) prevBtn.addEventListener('click', function (e) { e.preventDefault(); prev(); });
    if (nextBtn) nextBtn.addEventListener('click', function (e) { e.preventDefault(); next(); });
  });

  // ===== Advisory form: enable submit when filled =====
  document.addEventListener('DOMContentLoaded', function () {
    const name = document.getElementById('nameCustomer');
    const phone = document.getElementById('phoneCustomer');
    const option = document.getElementById('optionCustomer');
    const submit = document.getElementById('submit');
    if (!submit) return;

    function check() {
      const ok = name && name.value.trim() && phone && phone.value.trim() && option && option.value;
      submit.disabled = !ok;
    }
    [name, phone, option].forEach(function (el) {
      if (el) el.addEventListener('input', check);
      if (el) el.addEventListener('change', check);
    });

    submit.addEventListener('click', function (e) {
      e.preventDefault();
      if (submit.disabled) return;
      alert('Cảm ơn ' + name.value + '! Yêu cầu tư vấn của bạn đã được ghi nhận. Chúng tôi sẽ liên hệ sớm.');
      name.value = ''; phone.value = ''; option.value = '';
      check();
    });
  });

  // ===== Hưu trí An Thịnh sub-fund rotator (option card) =====
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.sub-fund-rotator').forEach(function (root) {
      const slides = root.querySelectorAll('.sub-slide');
      if (slides.length <= 1) return;
      let i = 0;
      setInterval(function () {
        slides[i].classList.remove('active');
        i = (i + 1) % slides.length;
        slides[i].classList.add('active');
      }, 3500);
    });
  });

  // ===== Reveal on scroll =====
  document.addEventListener('DOMContentLoaded', function () {
    const selectors = '.exigency-card, .option-card, .ps-timeline li, .stat-card, .contact-info-card, .fund-detail .fund-header, .contact-form-box';
    const els = document.querySelectorAll(selectors);
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el, i) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(28px)';
      el.style.transition = 'opacity .7s ease ' + (i % 4) * 0.08 + 's, transform .7s ease ' + (i % 4) * 0.08 + 's';
      io.observe(el);
    });
  });

  // ===== Animated counters for stat cards =====
  document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.stat-card .num');
    if (!cards.length || !('IntersectionObserver' in window)) return;
    const co = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const raw = el.textContent.trim();
        const match = raw.match(/^([0-9.]+)(.*)$/);
        if (!match) return;
        const target = parseFloat(match[1]);
        const suffix = match[2] || '';
        if (isNaN(target)) return;
        const duration = 1400;
        const start = performance.now();
        function step(now) {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          const val = target * eased;
          el.textContent = (Number.isInteger(target) ? Math.floor(val) : val.toFixed(1)) + suffix;
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = (Number.isInteger(target) ? target : target.toFixed(1)) + suffix;
        }
        requestAnimationFrame(step);
        co.unobserve(el);
      });
    }, { threshold: 0.4 });
    cards.forEach(function (c) { co.observe(c); });
  });

  // ===== Back to top =====
  document.addEventListener('DOMContentLoaded', function () {
    if (document.querySelector('.back-to-top')) return;
    const btn = document.createElement('a');
    btn.href = '#';
    btn.className = 'back-to-top';
    btn.setAttribute('aria-label', 'Lên đầu trang');
    btn.innerHTML = '<i class="bi bi-arrow-up"></i>';
    document.body.appendChild(btn);

    window.addEventListener('scroll', function () {
      btn.classList.toggle('show', window.scrollY > 400);
    });
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
})();
