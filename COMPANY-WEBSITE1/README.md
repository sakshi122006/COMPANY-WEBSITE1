# SAKSHI'S Company Website - Frontend Only

A modern responsive company website built using **HTML, CSS and vanilla JavaScript**.

## What changed from the original project

The original project contained Express/Node.js, MySQL, Vercel API functions and a local database connection. This version removes those dependencies so the site can be deployed as a static website.

### Included
- Responsive Home, About, Services, Careers and Contact pages
- Modern UI with animations and mobile navigation
- Frontend form validation
- Contact form demo using browser `localStorage`
- Career application demo using browser `localStorage`
- Demo sign-in page using `localStorage` only
- Existing project images reused
- No backend
- No MySQL
- No npm install required
- No environment variables required

> Important: localStorage is only a browser-side demo. It is not a replacement for a real database or authentication system.

## Run locally

Simply open `index.html` in a browser.

For a local static server, VS Code Live Server can also be used.

## Deploy on Vercel

1. Create a GitHub repository.
2. Upload this folder.
3. In Vercel, import the repository.
4. Framework Preset: **Other**
5. Build Command: leave empty.
6. Output Directory: leave empty.
7. Deploy.

You can also deploy the same folder to GitHub Pages or Netlify.

## Project structure

```text
COMPANY-WEBSITE-frontend/
├── index.html
├── About.html
├── Services.html
├── career.html
├── contact.html
├── signin.html
├── welcome.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── assets/
    └── images...
```

## Later backend option

If you later need real contact submissions, job applications, user accounts or an admin panel, the frontend can be connected to a backend/API without redesigning the UI.
