/* ==========================================
   SAKSHI'S COMPANY - MAIN JAVASCRIPT
   ========================================== */

// ==========================================
// CONSTANTS
// ==========================================

const COMPANY_NAME = "SAKSHI'S Company";
const CURRENT_YEAR = new Date().getFullYear();

// ==========================================
// NAVBAR FUNCTIONALITY
// ==========================================

const navbar = document.querySelector(".navbar");
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");

// Toggle mobile menu
hamburger?.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Close mobile menu when a link is clicked
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

// Navbar scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar?.classList.add("scrolled");
  } else {
    navbar?.classList.remove("scrolled");
  }
});

// Active navigation indicator
function setActiveNavItem() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  navItems.forEach((item) => {
    const href = item.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

// Set active nav item on page load
document.addEventListener("DOMContentLoaded", setActiveNavItem);

// ==========================================
// SMOOTH SCROLLING
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href === "#") return;

    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// ==========================================
// SCROLL TO TOP BUTTON
// ==========================================

const scrollToTopBtn = document.querySelector(".scroll-to-top");

if (scrollToTopBtn) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollToTopBtn.classList.add("show");
    } else {
      scrollToTopBtn.classList.remove("show");
    }
  });

  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// ==========================================
// SCROLL REVEAL ANIMATIONS
// ==========================================

function revealOnScroll() {
  const reveals = document.querySelectorAll("[data-reveal]");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("slide-up");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  reveals.forEach((el) => observer.observe(el));
}

document.addEventListener("DOMContentLoaded", revealOnScroll);

// ==========================================
// ANIMATED COUNTERS
// ==========================================

function animateCounters() {
  const counters = document.querySelectorAll("[data-count]");

  const observerOptions = {
    threshold: 0.5,
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains("animated")) {
        const target = parseInt(entry.target.getAttribute("data-count"));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 50);
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            entry.target.textContent = target;
            clearInterval(timer);
            entry.target.classList.add("animated");
          } else {
            entry.target.textContent = Math.floor(current);
          }
        }, 50);

        counterObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  counters.forEach((counter) => counterObserver.observe(counter));
}

document.addEventListener("DOMContentLoaded", animateCounters);

// ==========================================
// TESTIMONIALS SLIDER
// ==========================================

let testimonialIndex = 0;
const testimonials = document.querySelectorAll("[data-testimonial]");
const testimonialContainer = document.querySelector(".testimonials-container");
const prevBtn = document.querySelector("[data-prev-testimonial]");
const nextBtn = document.querySelector("[data-next-testimonial]");
const dotsContainer = document.querySelector(".testimonial-dots");

function showTestimonial(index) {
  if (testimonials.length === 0) return;

  // Normalize index
  testimonialIndex = (index + testimonials.length) % testimonials.length;

  // Hide all testimonials
  testimonials.forEach((t) => {
    t.style.display = "none";
  });

  // Show current testimonial
  testimonials[testimonialIndex].style.display = "block";

  // Update dots
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, idx) => {
    dot.classList.toggle("active", idx === testimonialIndex);
  });
}

// Initialize testimonials
if (testimonials.length > 0) {
  // Create dots
  if (dotsContainer) {
    testimonials.forEach((_, idx) => {
      const dot = document.createElement("div");
      dot.className = "dot" + (idx === 0 ? " active" : "");
      dot.addEventListener("click", () => showTestimonial(idx));
      dotsContainer.appendChild(dot);
    });
  }

  // Show first testimonial
  showTestimonial(0);

  // Previous button
  prevBtn?.addEventListener("click", () => showTestimonial(testimonialIndex - 1));

  // Next button
  nextBtn?.addEventListener("click", () => showTestimonial(testimonialIndex + 1));

  // Auto-rotate testimonials every 5 seconds
  setInterval(() => {
    showTestimonial(testimonialIndex + 1);
  }, 5000);
}

// ==========================================
// FOOTER CURRENT YEAR
// ==========================================

function updateFooterYear() {
  const yearElement = document.querySelector("[data-year]");
  if (yearElement) {
    yearElement.textContent = CURRENT_YEAR;
  }
}

document.addEventListener("DOMContentLoaded", updateFooterYear);

// ==========================================
// FORM VALIDATION UTILITIES
// ==========================================

const FormValidator = {
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  validatePhone(phone) {
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  },

  validateRequired(value) {
    return value.trim().length > 0;
  },

  validateMinLength(value, length) {
    return value.trim().length >= length;
  },

  showError(input, message) {
    input.classList.add("error");
    const errorElement = input.parentElement.querySelector(".form-error") || 
      document.createElement("div");
    errorElement.className = "form-error";
    errorElement.textContent = message;
    if (!input.parentElement.querySelector(".form-error")) {
      input.parentElement.appendChild(errorElement);
    }
  },

  clearError(input) {
    input.classList.remove("error");
    const errorElement = input.parentElement.querySelector(".form-error");
    if (errorElement) {
      errorElement.remove();
    }
  },

  clearAllErrors(form) {
    form.querySelectorAll(".form-error").forEach((el) => el.remove());
    form.querySelectorAll("input, textarea, select").forEach((el) => {
      el.classList.remove("error");
    });
  },
};

// ==========================================
// MODAL FUNCTIONALITY
// ==========================================

const Modal = {
  open(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  },

  close(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  },

  closeOnBackdropClick(modal) {
    modal?.addEventListener("click", (e) => {
      if (e.target === modal) {
        this.close(modal.id);
      }
    });
  },
};

// Close modal on backdrop click
document.querySelectorAll(".modal").forEach((modal) => {
  Modal.closeOnBackdropClick(modal);
});

// Close modal on close button click
document.querySelectorAll(".modal-close").forEach((btn) => {
  btn.addEventListener("click", () => {
    Modal.close(btn.closest(".modal").id);
  });
});

// Close modal on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal.active").forEach((modal) => {
      Modal.close(modal.id);
    });
  }
});

// ==========================================
// LAZY LOADING IMAGES
// ==========================================

if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Get query parameters
function getQueryParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}

// Format date
function formatDate(date) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(date).toLocaleDateString("en-US", options);
}

// Deep copy object
function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// Debounce function
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// ==========================================
// LOCAL STORAGE UTILITIES
// ==========================================

const StorageManager = {
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  },

  get(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return null;
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing from localStorage:", error);
    }
  },

  clear() {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  },
};

// ==========================================
// PAGE INITIALIZATION
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  console.log(`Welcome to ${COMPANY_NAME}`);

  // Add data-reveal to elements for scroll animations
  document.querySelectorAll(".card, .section-header, .team-member, .update-card").forEach((el) => {
    if (!el.hasAttribute("data-reveal")) {
      el.setAttribute("data-reveal", "true");
    }
  });

  // Reinitialize scroll reveals
  revealOnScroll();
});

// ==========================================
// PERFORMANCE MONITORING
// ==========================================

if (window.performance && window.performance.timing) {
  window.addEventListener("load", () => {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`Page loaded in ${pageLoadTime}ms`);
  });
}
