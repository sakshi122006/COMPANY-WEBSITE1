
document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".menu-toggle");
  const links = document.querySelector(".nav-links");
  if (menu && links) {
    menu.addEventListener("click", () => {
      links.classList.toggle("open");
      menu.setAttribute("aria-expanded", links.classList.contains("open"));
    });
    links.querySelectorAll("a").forEach(a => a.addEventListener("click", () => links.classList.remove("open")));
  }

  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(a => {
    const href = a.getAttribute("href");
    if (href === current || (current === "" && href === "index.html")) a.classList.add("active");
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:.12});
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());

  // Frontend-only contact form: saves a copy in browser localStorage.
  const contact = document.querySelector("#contactForm");
  if (contact) {
    contact.addEventListener("submit", e => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(contact).entries());
      if (!data.name || !data.email || !data.message) return;
      const messages = JSON.parse(localStorage.getItem("companyMessages") || "[]");
      messages.push({...data, createdAt:new Date().toISOString()});
      localStorage.setItem("companyMessages", JSON.stringify(messages));
      contact.reset();
      showMessage(contact, "Thanks! Your message has been saved in this browser. For real email delivery, connect a form service later.");
    });
  }

  // Frontend-only career application.
  const career = document.querySelector("#careerForm");
  if (career) {
    career.addEventListener("submit", e => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(career).entries());
      const applications = JSON.parse(localStorage.getItem("companyApplications") || "[]");
      applications.push({...data, createdAt:new Date().toISOString()});
      localStorage.setItem("companyApplications", JSON.stringify(applications));
      career.reset();
      showMessage(career, "Application submitted successfully for this demo. Your data is stored only in this browser.");
    });
  }

  // Demo sign-in without a backend. Never use this for real authentication.
  const signin = document.querySelector("#signinForm");
  if (signin) {
    signin.addEventListener("submit", e => {
      e.preventDefault();
      const email = signin.email.value.trim();
      const password = signin.password.value;
      if (email && password.length >= 6) {
        localStorage.setItem("demoSignedIn", "true");
        location.href = "welcome.html";
      } else {
        showMessage(signin, "Enter a valid email and a password with at least 6 characters.", true);
      }
    });
  }
});

function showMessage(form, text, error=false) {
  let box = form.querySelector(".form-message");
  if (!box) {
    box = document.createElement("div");
    box.className = "form-message";
    form.appendChild(box);
  }
  box.textContent = text;
  box.classList.toggle("error", error);
  box.classList.add("show");
}
