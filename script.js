// Lightweight interactions: copy buttons, reveal on scroll, and optimized title tilt
document.addEventListener('DOMContentLoaded', () => {
  // Copy to clipboard for any .copy-btn
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const targetSelector = btn.dataset.target;
      const target = document.querySelector(targetSelector);
      if (!target) return;
      const text = target.textContent.trim();
      try {
        await navigator.clipboard.writeText(text);
        const original = btn.textContent;
        btn.textContent = 'Copied';
        setTimeout(() => btn.textContent = original, 1400);
      } catch {
        // fallback: select and copy
        const range = document.createRange();
        range.selectNodeContents(target);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        try { document.execCommand('copy'); } catch {}
        sel.removeAllRanges();
      }
    });
  });

  // Reveal on scroll
  const reveals = document.querySelectorAll('section, .endpoint-card');
  reveals.forEach(el => el.classList.add('reveal'));
  const scrollReveal = () => {
    const triggerBottom = window.innerHeight * 0.9;
    reveals.forEach(reveal => {
      const top = reveal.getBoundingClientRect().top;
      if (top < triggerBottom) reveal.classList.add('active');
    });
  };
  window.addEventListener('scroll', throttle(scrollReveal, 150));
  scrollReveal();

  // Title tilt with requestAnimationFrame and throttling
  const title = document.querySelector('#main-header h1');
  let rafId = null;
  let lastEvent = null;
  document.addEventListener('mousemove', (e) => {
    lastEvent = e;
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      const e = lastEvent;
      const x = (window.innerWidth / 2 - e.pageX) / 30;
      const y = (window.innerHeight / 2 - e.pageY) / 30;
      if (window.innerWidth > 640) {
        title.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
      } else {
        title.style.transform = 'none';
      }
      rafId = null;
    });
  });

  // Utility: simple throttle
  function throttle(fn, wait) {
    let last = 0;
    return function(...args) {
      const now = Date.now();
      if (now - last >= wait) {
        last = now;
        fn.apply(this, args);
      }
    };
  }
});
