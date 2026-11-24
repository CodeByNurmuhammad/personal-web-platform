
(() => {
  const canvas = document.createElement("canvas");
  canvas.id = "background-grid";
  canvas.setAttribute("aria-hidden", "true");

  document.body.prepend(canvas);

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const settings = {
    spacing: 42,
    radius: 1.7,
    interactionRadius: 140,
    strength: 50,
    ease: 0.09,
    maxDpr: 2
  };

  let width = 0;
  let height = 0;
  let dpr = 1;
  let points = [];
  let frameId = null;

  const pointer = {
    x: -1000,
    y: -1000,
    active: false
  };

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  function getDotColor() {
    const styles = getComputedStyle(document.documentElement);
    return styles.getPropertyValue("--color-muted").trim() || "#888888";
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, settings.maxDpr);

    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    points = [];

    for (let y = 0; y <= height + settings.spacing; y += settings.spacing) {
      for (let x = 0; x <= width + settings.spacing; x += settings.spacing) {
        points.push({
          x,
          y,
          currentX: x,
          currentY: y
        });
      }
    }

    draw();
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = getDotColor();

    for (const point of points) {
      let targetX = point.x;
      let targetY = point.y;

      if (pointer.active && !reducedMotion.matches) {
        const dx = point.x - pointer.x;
        const dy = point.y - pointer.y;
        const distance = Math.hypot(dx, dy);

        if (distance < settings.interactionRadius && distance > 0) {
          const force =
            (1 - distance / settings.interactionRadius) * settings.strength;

          targetX += (dx / distance) * force;
          targetY += (dy / distance) * force;
        }
      }

      point.currentX += (targetX - point.currentX) * settings.ease;
      point.currentY += (targetY - point.currentY) * settings.ease;

      ctx.beginPath();
      ctx.arc(
        point.currentX,
        point.currentY,
        settings.radius,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
  }

  function animate() {
    draw();
    frameId = requestAnimationFrame(animate);
  }

  function start() {
    if (frameId === null && !document.hidden && !reducedMotion.matches) {
      frameId = requestAnimationFrame(animate);
    }
  }

  function stop() {
    if (frameId !== null) {
      cancelAnimationFrame(frameId);
      frameId = null;
    }
  }

  window.addEventListener("pointermove", (event) => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    pointer.active = true;
  }, { passive: true });

  window.addEventListener("pointerleave", () => {
    pointer.active = false;
  });

  window.addEventListener("blur", () => {
    pointer.active = false;
  });

  window.addEventListener("resize", resize, { passive: true });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stop();
    } else {
      start();
    }
  });

  reducedMotion.addEventListener("change", () => {
    if (reducedMotion.matches) {
      stop();
      draw();
    } else {
      start();
    }
  });

  // Re-render when the website changes between light and dark themes.
  const observer = new MutationObserver(() => draw());

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"]
  });

  resize();
  start();
})();



/// back groun