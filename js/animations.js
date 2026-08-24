/* ==========================================
   ANIMATIONS & ADVANCED EFFECTS
   ========================================== */

// ==========================================
// PARALLAX SCROLL EFFECT
// ========================================== 

class ParallaxEffect {
  constructor(selector, speed = 0.5) {
    this.elements = document.querySelectorAll(selector);
    this.speed = speed;
    this.init();
  }

  init() {
    window.addEventListener("scroll", () => this.update());
  }

  update() {
    this.elements.forEach((element) => {
      const scrollPosition = window.scrollY;
      const elementOffset = element.offsetTop;
      const distance = scrollPosition - elementOffset;
      const yPos = distance * this.speed;

      if (Math.abs(distance) < window.innerHeight * 1.5) {
        element.style.transform = `translateY(${yPos}px)`;
      }
    });
  }
}

// Initialize parallax for hero images (optional)
// new ParallaxEffect('.hero-image', 0.3);

// ==========================================
// STAGGERED ANIMATIONS
// ========================================== 

class StaggeredAnimation {
  constructor(selector, delay = 100) {
    this.elements = document.querySelectorAll(selector);
    this.delay = delay;
    this.init();
  }

  init() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateElements();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe parent container
    if (this.elements.length > 0) {
      observer.observe(this.elements[0].parentElement);
    }
  }

  animateElements() {
    this.elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add("slide-up");
      }, index * this.delay);
    });
  }
}

// Apply staggered animations to cards
document.addEventListener("DOMContentLoaded", () => {
  new StaggeredAnimation(".card", 100);
  new StaggeredAnimation(".team-member", 80);
  new StaggeredAnimation(".update-card", 100);
  new StaggeredAnimation(".value-card", 100);
});

// ==========================================
// HOVER 3D CARD EFFECT
// ========================================== 

class Card3DEffect {
  constructor(selector) {
    this.cards = document.querySelectorAll(selector);
    this.init();
  }

  init() {
    this.cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => this.onMouseMove(e, card));
      card.addEventListener("mouseleave", (e) => this.onMouseLeave(e, card));
    });
  }

  onMouseMove(e, card) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 5;
    const rotateY = ((centerX - x) / centerX) * 5;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  }

  onMouseLeave(e, card) {
    card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
  }
}

// Initialize 3D effect for cards (optional - remove .data-3d-effect if too intense)
// new Card3DEffect("[data-3d-effect]");

// ==========================================
// TYPEWRITER EFFECT
// ========================================== 

class TypewriterEffect {
  constructor(element, text, speed = 50) {
    this.element = element;
    this.text = text;
    this.speed = speed;
    this.index = 0;
  }

  type() {
    if (this.index < this.text.length) {
      this.element.textContent += this.text.charAt(this.index);
      this.index++;
      setTimeout(() => this.type(), this.speed);
    }
  }

  start() {
    this.element.textContent = "";
    this.type();
  }
}

// Initialize typewriter on hero heading (optional)
// const heroHeading = document.querySelector(".hero h1");
// if (heroHeading) {
//   const typewriter = new TypewriterEffect(
//     heroHeading,
//     heroHeading.textContent,
//     50
//   );
//   window.addEventListener("load", () => typewriter.start());
// }

// ==========================================
// SCROLL PROGRESS BAR
// ========================================== 

class ScrollProgressBar {
  constructor() {
    this.progressBar = document.querySelector("[data-scroll-progress]");
    if (this.progressBar) {
      this.init();
    }
  }

  init() {
    window.addEventListener("scroll", () => this.update());
  }

  update() {
    const totalHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    this.progressBar.style.width = progress + "%";
  }
}

new ScrollProgressBar();

// ==========================================
// WORD HIGHLIGHT ANIMATION
// ========================================== 

function highlightWords() {
  const textElements = document.querySelectorAll("[data-highlight]");

  textElements.forEach((el) => {
    const text = el.textContent;
    const highlighted = el.getAttribute("data-highlight").split(",");

    let newHTML = text;
    highlighted.forEach((word) => {
      const regex = new RegExp(`(${word.trim()})`, "gi");
      newHTML = newHTML.replace(
        regex,
        '<span class="gradient-text"><strong>$1</strong></span>'
      );
    });

    el.innerHTML = newHTML;
  });
}

document.addEventListener("DOMContentLoaded", highlightWords);

// ==========================================
// CLICK RIPPLE EFFECT
// ========================================== 

class RippleEffect {
  constructor(selector) {
    this.elements = document.querySelectorAll(selector);
    this.init();
  }

  init() {
    this.elements.forEach((element) => {
      element.addEventListener("click", (e) => this.createRipple(e));
    });
  }

  createRipple(e) {
    const btn = e.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = diameter + "px";
    circle.style.left = e.clientX - btn.offsetLeft - radius + "px";
    circle.style.top = e.clientY - btn.offsetTop - radius + "px";
    circle.classList.add("ripple");

    const ripple = btn.querySelector(".ripple");
    if (ripple) ripple.remove();

    btn.appendChild(circle);
  }
}

// Add ripple effect to buttons
document.addEventListener("DOMContentLoaded", () => {
  new RippleEffect(".btn");
});

// ==========================================
// ELEMENT COUNTER ANIMATION
// ========================================== 

class CountUp {
  constructor(element, target, duration = 2000) {
    this.element = element;
    this.target = target;
    this.duration = duration;
    this.current = 0;
  }

  animate() {
    const increment = this.target / (this.duration / 16);
    const timer = setInterval(() => {
      this.current += increment;
      if (this.current >= this.target) {
        this.element.textContent = this.target;
        clearInterval(timer);
      } else {
        this.element.textContent = Math.floor(this.current);
      }
    }, 16);
  }
}

// ==========================================
// INTERSECTION OBSERVER UTILITIES
// ========================================== 

class LazyLoad {
  constructor(selector) {
    this.elements = document.querySelectorAll(selector);
    this.init();
  }

  init() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.load(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "50px",
      }
    );

    this.elements.forEach((el) => observer.observe(el));
  }

  load(element) {
    element.classList.add("loaded");

    // Load background image
    if (element.dataset.bg) {
      element.style.backgroundImage = `url(${element.dataset.bg})`;
    }

    // Load image
    if (element.dataset.src) {
      element.src = element.dataset.src;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new LazyLoad("[data-src], [data-bg]");
});

// ==========================================
// TEXT FADE-IN ANIMATION
// ========================================== 

class TextFadeIn {
  constructor(selector) {
    this.elements = document.querySelectorAll(selector);
    this.init();
  }

  init() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateText(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    this.elements.forEach((el) => observer.observe(el));
  }

  animateText(element) {
    const text = element.textContent;
    element.textContent = "";

    text.split(" ").forEach((word, index) => {
      const span = document.createElement("span");
      span.textContent = word + " ";
      span.style.opacity = "0";
      span.style.animation = `fadeIn 0.5s ease-in-out ${index * 0.1}s forwards`;
      element.appendChild(span);
    });
  }
}

// Initialize text fade-in (optional)
// new TextFadeIn("[data-fade-text]");

// ==========================================
// SMOOTH NUMBER ANIMATION
// ========================================== 

function animateValue(
  element,
  startValue,
  endValue,
  duration = 2000,
  suffix = ""
) {
  let startTimestamp = null;

  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const value = Math.floor(progress * (endValue - startValue) + startValue);
    element.textContent = value + suffix;

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };

  window.requestAnimationFrame(step);
}

// ==========================================
// GRADIENT ANIMATION
// ========================================== 

function createGradientAnimation(element, colors, duration = 3000) {
  let currentIndex = 0;

  setInterval(() => {
    currentIndex = (currentIndex + 1) % colors.length;
    const nextIndex = (currentIndex + 1) % colors.length;

    element.style.background = `linear-gradient(135deg, ${colors[currentIndex]} 0%, ${colors[nextIndex]} 100%)`;
  }, duration);
}

// ==========================================
// BOUNCE ANIMATION
// ========================================== 

function addBounceAnimation(element, delay = 0) {
  element.style.animation = `
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  `;
  element.style.animationDuration = "2s";
  element.style.animationIterationCount = "infinite";
  element.style.animationDelay = delay + "s";
}

// ==========================================
// VISIBILITY DETECTION
// ========================================== 

class VisibilityDetect {
  static isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top < window.innerHeight &&
      rect.bottom > 0 &&
      rect.left < window.innerWidth &&
      rect.right > 0
    );
  }

  static isElementAboveViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.bottom < 0;
  }

  static isElementBelowViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top > window.innerHeight;
  }
}

// ==========================================
// CUSTOM ANIMATIONS CONFIGURATION
// ========================================== 

// Add custom animation classes for easy reuse
const animationConfig = {
  fadeInUp: {
    name: "fadeInUp",
    duration: "0.6s",
    timing: "ease-out",
  },
  slideInLeft: {
    name: "slideInLeft",
    duration: "0.6s",
    timing: "ease-out",
  },
  slideInRight: {
    name: "slideInRight",
    duration: "0.6s",
    timing: "ease-out",
  },
  zoomIn: {
    name: "zoomIn",
    duration: "0.6s",
    timing: "ease-out",
  },
  rotate: {
    name: "rotate",
    duration: "0.8s",
    timing: "ease-in-out",
  },
};

// Apply animation to element
function applyAnimation(element, animationType, delay = 0) {
  const animation = animationConfig[animationType];
  if (animation) {
    element.style.animation = `${animation.name} ${animation.duration} ${animation.timing} ${delay}s`;
  }
}

// ==========================================
// PAGE TRANSITION ANIMATIONS
// ========================================== 

class PageTransition {
  constructor() {
    this.init();
  }

  init() {
    // Fade in page on load
    document.addEventListener("DOMContentLoaded", () => {
      document.body.style.opacity = "0";
      setTimeout(() => {
        document.body.style.transition = "opacity 0.5s ease-in";
        document.body.style.opacity = "1";
      }, 100);
    });

    // Fade out before navigation
    document.querySelectorAll("a:not([target])").forEach((link) => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (
          href &&
          !href.startsWith("#") &&
          !href.startsWith("http") &&
          !href.startsWith("mailto")
        ) {
          e.preventDefault();
          document.body.style.opacity = "0";
          setTimeout(() => {
            window.location.href = href;
          }, 300);
        }
      });
    });
  }
}

// Initialize page transitions (optional - can be slow)
// new PageTransition();

// ==========================================
// INITIALIZATION
// ========================================== 

document.addEventListener("DOMContentLoaded", () => {
  console.log("Animations module loaded successfully");
});
