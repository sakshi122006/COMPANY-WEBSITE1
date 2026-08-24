/* ==========================================
   CONTACT FORM VALIDATION & HANDLING
   ========================================== */

// Contact Form Handler
const contactFormElement = document.getElementById("contactForm");

if (contactFormElement) {
  contactFormElement.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form fields
    const fullName = document.getElementById("contactName");
    const email = document.getElementById("contactEmail");
    const subject = document.getElementById("contactSubject");
    const message = document.getElementById("contactMessage");

    // Clear previous errors
    FormValidator.clearAllErrors(this);

    // Validate fields
    let isValid = true;

    // Full Name validation
    if (!FormValidator.validateRequired(fullName.value)) {
      FormValidator.showError(fullName, "Full name is required");
      isValid = false;
    }

    // Email validation
    if (!FormValidator.validateRequired(email.value)) {
      FormValidator.showError(email, "Email is required");
      isValid = false;
    } else if (!FormValidator.validateEmail(email.value)) {
      FormValidator.showError(email, "Please enter a valid email address");
      isValid = false;
    }

    // Subject validation
    if (!FormValidator.validateRequired(subject.value)) {
      FormValidator.showError(subject, "Subject is required");
      isValid = false;
    } else if (!FormValidator.validateMinLength(subject.value, 3)) {
      FormValidator.showError(subject, "Subject must be at least 3 characters");
      isValid = false;
    }

    // Message validation
    if (!FormValidator.validateRequired(message.value)) {
      FormValidator.showError(message, "Message is required");
      isValid = false;
    } else if (!FormValidator.validateMinLength(message.value, 10)) {
      FormValidator.showError(message, "Message must be at least 10 characters");
      isValid = false;
    }

    // If valid, process form
    if (isValid) {
      // Prepare form data
      const formData = {
        fullName: fullName.value.trim(),
        email: email.value.trim(),
        subject: subject.value.trim(),
        message: message.value.trim(),
        timestamp: new Date().toISOString(),
      };

      // Save to localStorage (demo only)
      const existingMessages = StorageManager.get("contactMessages") || [];
      existingMessages.push(formData);
      StorageManager.set("contactMessages", existingMessages);

      // Show success message
      showContactSuccess(this);

      // Reset form
      this.reset();

      // Clear errors
      FormValidator.clearAllErrors(this);

      // Scroll to success message
      setTimeout(() => {
        const successMsg = this.querySelector(".form-success");
        if (successMsg) {
          successMsg.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);
    }
  });
}

// Show success message for contact form
function showContactSuccess(formElement) {
  // Remove existing success message if any
  const existingSuccess = formElement.querySelector(".form-success");
  if (existingSuccess) {
    existingSuccess.remove();
  }

  // Create success message
  const successDiv = document.createElement("div");
  successDiv.className = "form-success";
  successDiv.innerHTML = `
    <strong>Thank you!</strong><br>
    Your message has been received successfully. We'll get back to you soon.<br>
    <small style="display: block; margin-top: 8px; opacity: 0.8;">Demo mode: Messages are stored locally in your browser.</small>
  `;

  // Insert at the beginning of form
  formElement.insertBefore(successDiv, formElement.firstChild);

  // Auto-remove after 5 seconds
  setTimeout(() => {
    successDiv.style.opacity = "0";
    successDiv.style.transition = "opacity 0.3s ease-in-out";
    setTimeout(() => successDiv.remove(), 300);
  }, 5000);
}

// ==========================================
// CAREER APPLICATION FORM
// ========================================== 

const careerFormElement = document.getElementById("careerForm");

if (careerFormElement) {
  careerFormElement.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form fields
    const fullName = document.getElementById("careerFullName");
    const email = document.getElementById("careerEmail");
    const phone = document.getElementById("careerPhone");
    const position = document.getElementById("careerPosition");
    const experience = document.getElementById("careerExperience");
    const resume = document.getElementById("careerResume");
    const coverLetter = document.getElementById("careerCoverLetter");

    // Clear previous errors
    FormValidator.clearAllErrors(this);

    // Validate fields
    let isValid = true;

    // Full Name validation
    if (!FormValidator.validateRequired(fullName.value)) {
      FormValidator.showError(fullName, "Full name is required");
      isValid = false;
    } else if (!FormValidator.validateMinLength(fullName.value, 2)) {
      FormValidator.showError(fullName, "Full name must be at least 2 characters");
      isValid = false;
    }

    // Email validation
    if (!FormValidator.validateRequired(email.value)) {
      FormValidator.showError(email, "Email is required");
      isValid = false;
    } else if (!FormValidator.validateEmail(email.value)) {
      FormValidator.showError(email, "Please enter a valid email address");
      isValid = false;
    }

    // Phone validation
    if (!FormValidator.validateRequired(phone.value)) {
      FormValidator.showError(phone, "Phone number is required");
      isValid = false;
    } else if (!FormValidator.validatePhone(phone.value)) {
      FormValidator.showError(phone, "Please enter a valid phone number");
      isValid = false;
    }

    // Position validation
    if (!FormValidator.validateRequired(position.value)) {
      FormValidator.showError(position, "Please select a position");
      isValid = false;
    }

    // Experience validation
    if (!FormValidator.validateRequired(experience.value)) {
      FormValidator.showError(experience, "Please select your experience level");
      isValid = false;
    }

    // Resume validation
    if (!FormValidator.validateRequired(resume.value)) {
      FormValidator.showError(resume, "Resume/CV is required");
      isValid = false;
    } else if (!FormValidator.validateMinLength(resume.value, 10)) {
      FormValidator.showError(resume, "Resume must be at least 10 characters");
      isValid = false;
    }

    // Cover Letter validation
    if (!FormValidator.validateRequired(coverLetter.value)) {
      FormValidator.showError(coverLetter, "Cover letter is required");
      isValid = false;
    } else if (!FormValidator.validateMinLength(coverLetter.value, 20)) {
      FormValidator.showError(
        coverLetter,
        "Cover letter must be at least 20 characters"
      );
      isValid = false;
    }

    // If valid, process form
    if (isValid) {
      // Prepare application data
      const applicationData = {
        fullName: fullName.value.trim(),
        email: email.value.trim(),
        phone: phone.value.trim(),
        position: position.value,
        experience: experience.value,
        resume: resume.value.trim(),
        coverLetter: coverLetter.value.trim(),
        timestamp: new Date().toISOString(),
      };

      // Save to localStorage (demo only)
      const existingApplications = StorageManager.get("careerApplications") || [];
      existingApplications.push(applicationData);
      StorageManager.set("careerApplications", existingApplications);

      // Show success message
      showCareerSuccess(this);

      // Reset form
      this.reset();

      // Clear errors
      FormValidator.clearAllErrors(this);

      // Scroll to success message
      setTimeout(() => {
        const successMsg = this.querySelector(".form-success");
        if (successMsg) {
          successMsg.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);
    }
  });
}

// Show success message for career form
function showCareerSuccess(formElement) {
  // Remove existing success message if any
  const existingSuccess = formElement.querySelector(".form-success");
  if (existingSuccess) {
    existingSuccess.remove();
  }

  // Create success message
  const successDiv = document.createElement("div");
  successDiv.className = "form-success";
  successDiv.innerHTML = `
    <strong>Application Submitted!</strong><br>
    Thank you for applying to ${document.getElementById("careerPosition").value}. We'll review your application and get back to you soon.<br>
    <small style="display: block; margin-top: 8px; opacity: 0.8;">Demo mode: Applications are stored locally in your browser.</small>
  `;

  // Insert at the beginning of form
  formElement.insertBefore(successDiv, formElement.firstChild);

  // Auto-remove after 5 seconds
  setTimeout(() => {
    successDiv.style.opacity = "0";
    successDiv.style.transition = "opacity 0.3s ease-in-out";
    setTimeout(() => successDiv.remove(), 300);
  }, 5000);
}

// ==========================================
// SIGN-IN FORM
// ========================================== 

const signInFormElement = document.getElementById("signInForm");

if (signInFormElement) {
  signInFormElement.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form fields
    const email = document.getElementById("signInEmail");
    const password = document.getElementById("signInPassword");
    const rememberMe = document.getElementById("rememberMe");

    // Clear previous errors
    FormValidator.clearAllErrors(this);

    // Validate fields
    let isValid = true;

    // Email validation
    if (!FormValidator.validateRequired(email.value)) {
      FormValidator.showError(email, "Email is required");
      isValid = false;
    } else if (!FormValidator.validateEmail(email.value)) {
      FormValidator.showError(email, "Please enter a valid email address");
      isValid = false;
    }

    // Password validation
    if (!FormValidator.validateRequired(password.value)) {
      FormValidator.showError(password, "Password is required");
      isValid = false;
    } else if (!FormValidator.validateMinLength(password.value, 6)) {
      FormValidator.showError(password, "Password must be at least 6 characters");
      isValid = false;
    }

    // If valid, process sign-in
    if (isValid) {
      // Save login data for demo (never do this in production!)
      const loginData = {
        email: email.value.trim(),
        timestamp: new Date().toISOString(),
      };

      if (rememberMe.checked) {
        StorageManager.set("lastLogin", loginData);
      }

      // Show success message
      showSignInSuccess(this, email.value.trim());

      // Reset form
      this.reset();
      rememberMe.checked = false;

      // Redirect after delay (demo only)
      setTimeout(() => {
        // In a real application, you would redirect to dashboard
        window.location.href = "index.html";
      }, 2000);
    }
  });

  // Load remember me data if exists
  const lastLogin = StorageManager.get("lastLogin");
  if (lastLogin && document.getElementById("signInEmail")) {
    document.getElementById("signInEmail").value = lastLogin.email;
    document.getElementById("rememberMe").checked = true;
  }
}

// Show success message for sign-in
function showSignInSuccess(formElement, email) {
  // Remove existing success message if any
  const existingSuccess = formElement.querySelector(".form-success");
  if (existingSuccess) {
    existingSuccess.remove();
  }

  // Create success message
  const successDiv = document.createElement("div");
  successDiv.className = "form-success";
  successDiv.innerHTML = `
    <strong>Sign In Successful!</strong><br>
    Welcome back, ${email}. Redirecting you now...<br>
    <small style="display: block; margin-top: 8px; opacity: 0.8;">Demo mode: No real authentication. Redirecting to home page.</small>
  `;

  // Insert at the beginning of form
  formElement.insertBefore(successDiv, formElement.firstChild);
}

// ==========================================
// REAL-TIME VALIDATION
// ========================================== 

// Email input real-time validation
document.querySelectorAll('input[type="email"]').forEach((input) => {
  input.addEventListener("blur", function () {
    if (FormValidator.validateRequired(this.value)) {
      if (FormValidator.validateEmail(this.value)) {
        FormValidator.clearError(this);
      } else {
        FormValidator.showError(this, "Please enter a valid email address");
      }
    }
  });
});

// Phone input real-time validation
document.querySelectorAll('input[type="tel"]').forEach((input) => {
  input.addEventListener("blur", function () {
    if (FormValidator.validateRequired(this.value)) {
      if (FormValidator.validatePhone(this.value)) {
        FormValidator.clearError(this);
      } else {
        FormValidator.showError(this, "Please enter a valid phone number");
      }
    }
  });
});

// Text input minimum length validation
document.querySelectorAll('input[type="text"][data-min-length]').forEach((input) => {
  input.addEventListener("blur", function () {
    const minLength = parseInt(this.getAttribute("data-min-length"));
    if (FormValidator.validateRequired(this.value)) {
      if (FormValidator.validateMinLength(this.value, minLength)) {
        FormValidator.clearError(this);
      } else {
        FormValidator.showError(
          this,
          `Minimum ${minLength} characters required`
        );
      }
    }
  });
});

// Textarea minimum length validation
document.querySelectorAll('textarea[data-min-length]').forEach((input) => {
  input.addEventListener("blur", function () {
    const minLength = parseInt(this.getAttribute("data-min-length"));
    if (FormValidator.validateRequired(this.value)) {
      if (FormValidator.validateMinLength(this.value, minLength)) {
        FormValidator.clearError(this);
      } else {
        FormValidator.showError(
          this,
          `Minimum ${minLength} characters required`
        );
      }
    }
  });
});

// Clear error on focus
document.querySelectorAll("input, textarea, select").forEach((input) => {
  input.addEventListener("focus", function () {
    FormValidator.clearError(this);
  });
});

// ==========================================
// PASSWORD VISIBILITY TOGGLE (if needed)
// ========================================== 

const passwordToggleButtons = document.querySelectorAll("[data-toggle-password]");
passwordToggleButtons.forEach((btn) => {
  btn.addEventListener("click", function () {
    const inputId = this.getAttribute("data-toggle-password");
    const input = document.getElementById(inputId);

    if (input) {
      if (input.type === "password") {
        input.type = "text";
        this.textContent = "Hide";
      } else {
        input.type = "password";
        this.textContent = "Show";
      }
    }
  });
});

// ==========================================
// FORM UTILITIES
// ========================================== 

// Get all form data as object
function getFormData(formElement) {
  const formData = new FormData(formElement);
  const data = {};

  formData.forEach((value, key) => {
    if (data[key]) {
      if (Array.isArray(data[key])) {
        data[key].push(value);
      } else {
        data[key] = [data[key], value];
      }
    } else {
      data[key] = value;
    }
  });

  return data;
}

// Export form data as JSON
function exportFormDataAsJSON(data, filename = "form-data.json") {
  const dataStr = JSON.stringify(data, null, 2);
  const dataBlob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

// Clear all form data from localStorage
function clearAllFormData() {
  StorageManager.remove("contactMessages");
  StorageManager.remove("careerApplications");
  StorageManager.remove("lastLogin");
  console.log("All form data cleared");
}

// ==========================================
// DEBUG UTILITIES (for development)
// ========================================== 

// View all stored form data in console
function viewAllFormData() {
  console.log("=== Stored Form Data ===");
  console.log(
    "Contact Messages:",
    StorageManager.get("contactMessages") || []
  );
  console.log(
    "Career Applications:",
    StorageManager.get("careerApplications") || []
  );
  console.log("Last Login:", StorageManager.get("lastLogin") || null);
}

// Make utilities available globally for debugging
window.FormDebug = {
  viewAllData: viewAllFormData,
  clearAllData: clearAllFormData,
  exportData: (type) => {
    if (type === "contact") {
      exportFormDataAsJSON(
        StorageManager.get("contactMessages"),
        "contact-messages.json"
      );
    } else if (type === "career") {
      exportFormDataAsJSON(
        StorageManager.get("careerApplications"),
        "career-applications.json"
      );
    }
  },
};
