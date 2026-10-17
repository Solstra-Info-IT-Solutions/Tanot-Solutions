/* Tanot Solutions homepage mockup — small, dependency-free interactions. */
(function () {
  'use strict';

  /* ---------- Desktop dropdowns (hover + click + keyboard) ---------- */
  var dropdowns = document.querySelectorAll('[data-dropdown]');
  function closeAll(except) {
    dropdowns.forEach(function (dd) {
      if (dd === except) return;
      dd.classList.remove('is-open');
      dd.querySelector('.nav__trigger').setAttribute('aria-expanded', 'false');
    });
  }
  dropdowns.forEach(function (dd) {
    var trigger = dd.querySelector('.nav__trigger');
    var timer;
    function open() { clearTimeout(timer); closeAll(dd); dd.classList.add('is-open'); trigger.setAttribute('aria-expanded', 'true'); }
    function close() { dd.classList.remove('is-open'); trigger.setAttribute('aria-expanded', 'false'); }
    trigger.addEventListener('click', function () { dd.classList.contains('is-open') ? close() : open(); });
    dd.addEventListener('mouseenter', open);
    dd.addEventListener('mouseleave', function () { timer = setTimeout(close, 120); });
    dd.addEventListener('keydown', function (e) { if (e.key === 'Escape') { close(); trigger.focus(); } });
    dd.addEventListener('focusout', function (e) { if (!dd.contains(e.relatedTarget)) close(); });
  });
  document.addEventListener('click', function (e) { if (!e.target.closest('[data-dropdown]')) closeAll(); });

  /* ---------- Mobile navigation ---------- */
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var isOpen = header.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 1024 && header.classList.contains('nav-open')) toggle.click();
    });
  }

  /* ---------- Services tabs (ARIA tabs pattern) ---------- */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.svc-tab'));
  function selectTab(tab, focus) {
    tabs.forEach(function (t) {
      var selected = t === tab;
      t.setAttribute('aria-selected', String(selected));
      t.tabIndex = selected ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !selected;
    });
    if (focus) tab.focus();
    if (window.matchMedia('(max-width: 1024px)').matches) {
      tab.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
    }
  }
  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () { selectTab(tab); });
    tab.addEventListener('keydown', function (e) {
      var next = null;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
      if (e.key === 'Home') next = tabs[0];
      if (e.key === 'End') next = tabs[tabs.length - 1];
      if (next) { e.preventDefault(); selectTab(next, true); }
    });
  });

  /* ---------- FAQ accordion (one open at a time, like the live site) ---------- */
  document.querySelectorAll('[data-accordion]').forEach(function (acc) {
    var items = acc.querySelectorAll('.acc-item');
    items.forEach(function (item) {
      var btn = item.querySelector('.acc-btn');
      btn.addEventListener('click', function () {
        var willOpen = !item.classList.contains('is-open');
        items.forEach(function (other) {
          other.classList.remove('is-open');
          other.querySelector('.acc-btn').setAttribute('aria-expanded', 'false');
        });
        if (willOpen) {
          item.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  });

  /* ---------- Lead form: client-side validation only (mockup) ---------- */
  document.querySelectorAll('form.form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var firstInvalid = null;
      form.querySelectorAll('.field').forEach(function (field) {
        var input = field.querySelector('input, textarea');
        var ok = input.checkValidity() && input.value.trim() !== '';
        field.classList.toggle('is-invalid', !ok);
        input.setAttribute('aria-invalid', String(!ok));
        if (!ok && !firstInvalid) firstInvalid = input;
      });
      if (firstInvalid) { firstInvalid.focus(); return; }
      form.classList.add('is-sent');
      form.reset();
    });
    form.addEventListener('input', function (e) {
      var field = e.target.closest('.field');
      if (field && field.classList.contains('is-invalid') && e.target.value.trim() !== '') {
        field.classList.remove('is-invalid');
        e.target.setAttribute('aria-invalid', 'false');
      }
    });
  });
})();
