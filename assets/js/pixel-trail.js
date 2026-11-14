/*!
 * Pixel Trail – interactive pixel-block cursor trail (vanilla JS)
 * Usage:  <script src="pixel-trail.js" defer></script>
 * Target: first match of  [data-pixel-trail], .hero, header.hero, #hero
 *         (or pass your own selector via window.PIXEL_TRAIL_OPTIONS = { target: '.my-hero' })
 *
 * Theme detection (any of these):
 *   <html data-theme="dark"> | <html class="dark"> | <html data-bs-theme="dark">
 *   otherwise falls back to prefers-color-scheme.
 */
(function () {
  'use strict';

  var DEFAULTS = {
    target: '[data-pixel-trail], .hero, header.hero, #hero',
    cell: 26,              // base grid size in px
    radius: 3.2,           // spawn radius around cursor (in cells)
    maxBlocks: 450,        // hard cap for performance
    lifeMin: 260,          // ms a block stays fully visible (min)
    lifeMax: 800,          // ms (max)
    appearMs: 90,
    fadeMs: 260,
    zIndex: 5,
    symbols: ['+', '+', '↑', '↑', 'w', '(fd)', '(fd)', '0', '1'],
    symbolChance: 0.45,
    // Light page (#f7f8fa)  -> blocks a bit DARK
    light: { block: '#171b22', symbol: '#f7f8fa' },
    // Dark page (#202b38)   -> blocks a bit LIGHT
    dark:  { block: '#3b4c61', symbol: '#e6edf5' }
  };

  var opts = Object.assign({}, DEFAULTS, window.PIXEL_TRAIL_OPTIONS || {});
  opts.light = Object.assign({}, DEFAULTS.light, (window.PIXEL_TRAIL_OPTIONS || {}).light);
  opts.dark = Object.assign({}, DEFAULTS.dark, (window.PIXEL_TRAIL_OPTIONS || {}).dark);

  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  function init() {
    var hero = document.querySelector(opts.target);
    if (!hero) return;

    if (getComputedStyle(hero).position === 'static') hero.style.position = 'relative';

    var canvas = document.createElement('canvas');
    canvas.setAttribute('aria-hidden', 'true');
    canvas.style.cssText =
      'position:absolute;left:0;top:0;width:100%;height:100%;' +
      'pointer-events:none;z-index:' + opts.zIndex + ';';
    hero.appendChild(canvas);
    var ctx = canvas.getContext('2d');

    var dpr = 1, W = 0, H = 0, cell = opts.cell;
    var blocks = [];            // active blocks
    var occupied = new Map();   // "cx,cy" -> block
    var running = false;
    var colors = opts.light;

    /* ---------- theme ---------- */
    function isDark() {
      var de = document.documentElement, b = document.body;
      var t = (de.getAttribute('data-theme') || de.getAttribute('data-bs-theme') ||
               (b && b.getAttribute('data-theme')) || '').toLowerCase();
      if (t === 'dark') return true;
      if (t === 'light') return false;
      if (de.classList.contains('dark') || (b && b.classList.contains('dark'))) return true;
      if (de.classList.contains('light') || (b && b.classList.contains('light'))) return false;
      return !!(window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches);
    }
    function updateTheme() { colors = isDark() ? opts.dark : opts.light; }
    updateTheme();
    new MutationObserver(updateTheme).observe(document.documentElement, {
      attributes: true, attributeFilter: ['class', 'data-theme', 'data-bs-theme']
    });
    if (document.body) {
      new MutationObserver(updateTheme).observe(document.body, {
        attributes: true, attributeFilter: ['class', 'data-theme']
      });
    }
    if (window.matchMedia) {
      var mq = matchMedia('(prefers-color-scheme: dark)');
      (mq.addEventListener ? mq.addEventListener('change', updateTheme) : mq.addListener(updateTheme));
    }

    /* ---------- sizing ---------- */
    function resize() {
      var r = hero.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width; H = r.height;
      canvas.width = Math.max(1, Math.round(W * dpr));
      canvas.height = Math.max(1, Math.round(H * dpr));
      cell = W < 600 ? Math.round(opts.cell * 0.75) : opts.cell;
    }
    resize();
    if (window.ResizeObserver) new ResizeObserver(resize).observe(hero);
    else window.addEventListener('resize', resize);

    /* ---------- blocks ---------- */
    var SHAPES = [[1, 1], [1, 1], [1, 1], [2, 1], [1, 2], [2, 2], [3, 1], [1, 3], [3, 2]];

    function free(cx, cy, w, h) {
      for (var i = 0; i < w; i++)
        for (var j = 0; j < h; j++)
          if (occupied.has((cx + i) + ',' + (cy + j))) return false;
      return true;
    }

    function spawn(cx, cy, now) {
      if (blocks.length >= opts.maxBlocks) return;
      var s = SHAPES[(Math.random() * SHAPES.length) | 0];
      var w = s[0], h = s[1];
      // try the chosen shape, fall back to 1x1
      if (!free(cx, cy, w, h)) { w = 1; h = 1; if (!free(cx, cy, 1, 1)) return; }
      var b = {
        cx: cx, cy: cy, w: w, h: h,
        born: now + Math.random() * 40,
        life: opts.lifeMin + Math.random() * (opts.lifeMax - opts.lifeMin),
        sym: Math.random() < opts.symbolChance ? opts.symbols[(Math.random() * opts.symbols.length) | 0] : null,
        symOff: Math.random()
      };
      blocks.push(b);
      for (var i = 0; i < w; i++)
        for (var j = 0; j < h; j++) occupied.set((cx + i) + ',' + (cy + j), b);
    }

    function release(b) {
      for (var i = 0; i < b.w; i++)
        for (var j = 0; j < b.h; j++) occupied.delete((b.cx + i) + ',' + (b.cy + j));
    }

    /* ---------- pointer ---------- */
    var last = null, lastT = 0, rect = null;

    function burst(px, py, vx, vy, now) {
      // shift the cluster slightly behind the cursor direction for a "trail" feel
      var sp = Math.min(Math.hypot(vx, vy), 40);
      var ox = px - (vx / (sp || 1)) * sp * 0.6;
      var oy = py - (vy / (sp || 1)) * sp * 0.6;
      var ccx = Math.floor(ox / cell), ccy = Math.floor(oy / cell);
      var R = opts.radius + Math.min(sp / 18, 2);
      var r = Math.ceil(R);
      for (var dx = -r; dx <= r; dx++) {
        for (var dy = -r; dy <= r; dy++) {
          var d = Math.hypot(dx, dy);
          if (d > R) continue;
          var p = (1 - d / R) * 0.55 + 0.05;
          if (Math.random() < p) {
            var cx = ccx + dx, cy = ccy + dy;
            if (cx < 0 || cy < 0 || cx * cell > W || cy * cell > H) continue;
            spawn(cx, cy, now);
          }
        }
      }
      // refresh blocks directly under cursor so they react to movement
      var near = occupied.get(Math.floor(px / cell) + ',' + Math.floor(py / cell));
      if (near) near.born = now - opts.appearMs;
    }

    function onMove(e) {
        if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
      var now = performance.now();
      rect = hero.getBoundingClientRect();
      var x = e.clientX - rect.left, y = e.clientY - rect.top;
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) { last = null; return; }

      if (last && now - lastT < 400) {
        var vx = x - last.x, vy = y - last.y;
        var dist = Math.hypot(vx, vy);
        // interpolate along fast strokes so there are no gaps
        var steps = Math.min(Math.ceil(dist / (cell * 1.5)), 8);
        for (var i = 1; i <= steps; i++) {
          var t = i / steps;
          burst(last.x + vx * t, last.y + vy * t, vx, vy, now);
        }
      } else {
        burst(x, y, 0, 0, now);
      }
      last = { x: x, y: y }; lastT = now;
      start();
    }
    

    window.addEventListener('pointermove', onMove, { passive: true });
    hero.addEventListener('pointerleave', function () { last = null; }, { passive: true });

    /* ---------- render ---------- */
    function frame(now) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      var blockCol = colors.block, symCol = colors.symbol;
      var symFont = Math.max(8, Math.round(cell * 0.38));
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = '600 ' + symFont + 'px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';

      var drawSyms = [];
      var alive = [];

      ctx.fillStyle = blockCol;
      for (var i = 0; i < blocks.length; i++) {
        var b = blocks[i];
        var age = now - b.born;
        if (age < 0) { alive.push(b); continue; }
        var total = opts.appearMs + b.life + opts.fadeMs;
        if (age >= total) { release(b); continue; }
        alive.push(b);

        var k = 1;
        if (age < opts.appearMs) k = age / opts.appearMs;                       // pop in
        else if (age > opts.appearMs + b.life) k = 1 - (age - opts.appearMs - b.life) / opts.fadeMs; // shrink out
        k = k * k * (3 - 2 * k); // smoothstep

        var bw = b.w * cell, bh = b.h * cell;
        var w = bw * k, h = bh * k;
        var x = b.cx * cell + (bw - w) / 2, y = b.cy * cell + (bh - h) / 2;
        ctx.fillRect(x, y, w, h);

        if (b.sym && k > 0.85) drawSyms.push(b);
      }
      blocks = alive;

      if (drawSyms.length) {
        ctx.fillStyle = symCol;
        for (var j = 0; j < drawSyms.length; j++) {
          var s = drawSyms[j];
          // symbol hops slightly inside bigger blocks for an organic feel
          var gx = s.w > 1 ? Math.floor(s.symOff * s.w) : 0;
          var gy = s.h > 1 ? Math.floor((s.symOff * 7 % 1) * s.h) : 0;
          ctx.fillText(s.sym, (s.cx + gx + 0.5) * cell, (s.cy + gy + 0.5) * cell);
        }
      }

      if (blocks.length) requestAnimationFrame(frame);
      else { running = false; ctx.clearRect(0, 0, W, H); }
    }

    function start() {
      if (running) return;
      running = true;
      requestAnimationFrame(frame);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
