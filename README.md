# LeadPilot business website

A responsive React + Vite website for LeadPilot. This is the public company/sales website, separate from the LeadPilot CRM application.

## Included

- Home, Services, Industries and six industry pages
- Pricing, About and Contact pages
- Blog index and eight SEO-focused articles
- Responsive navigation and WhatsApp contact shortcut
- Enquiry form that opens a prefilled WhatsApp message
- Optional Google Sheets submission through Google Apps Script
- SEO-friendly page titles/description baseline and clean URLs

## Before publishing: important edits

1. In `src/App.jsx`, check the WhatsApp number in `WA_NUMBER` (currently +91 77360 37807).
2. Replace `hello@leadpilot.in` with your real business email, or remove that line.
3. Review the pricing and service scope. Make sure the offer matches what you will deliver.
4. Add your own logo file if you have one. The current mark is a simple text/vector-style icon.

## Run on your computer

Install Node.js LTS from https://nodejs.org/ if it is not installed.

Open this folder in VS Code, then open Terminal > New Terminal and run:

```bash
npm install
npm run dev
```

Open the local address shown in the terminal (usually http://localhost:5173).

To test a production build:

```bash
npm run build
```

## Connect enquiries to Google Sheets

1. Create a new Google Sheet.
2. Open Extensions > Apps Script.
3. Replace the script with `google-apps-script/Code.gs` and save.
4. Choose Deploy > New deployment.
5. Select type: Web app.
6. Execute as: Me.
7. Who has access: Anyone. This makes the endpoint publicly callable; do not put sensitive information in this form.
8. Deploy and authorise it. Copy the Web app URL ending in `/exec`.
9. In Vercel, open your project > Settings > Environment Variables.
10. Add:
    - Name: `VITE_GOOGLE_SCRIPT_URL`
    - Value: your full Apps Script Web app URL
    - Environments: Production, Preview and Development (at least Production)
11. Redeploy the website after adding the variable.

The browser opens WhatsApp with the visitor's enquiry details so the visitor can review and tap Send. The website also sends the form data to Apps Script. Because the browser uses `no-cors` for this simple endpoint, it cannot confirm the Sheet write on-screen. Submit a test enquiry and verify the new row appears in the Google Sheet.

## Publish with GitHub + Vercel

### A. Create a GitHub repository

1. Sign in at https://github.com.
2. Click the `+` icon, then `New repository`.
3. Repository name: `leadpilot-website`.
4. Choose `Public` or `Private` (either works with Vercel).
5. Click `Create repository`.

### B. Upload the project

Simplest method for beginners:
1. Download and extract the project ZIP.
2. Open the new GitHub repository in your browser.
3. Click `Add file` > `Upload files`.
4. Open the extracted `leadpilot-website` folder on your computer.
5. Select the files and folders inside it (including `package.json`, `index.html`, `src` and `google-apps-script`). Do not upload the ZIP itself.
6. Drag them into GitHub's upload area.
7. Scroll down and click `Commit changes`.

### C. Deploy on Vercel

1. Go to https://vercel.com and sign up/log in using GitHub.
2. Click `Add New` > `Project`.
3. Import `leadpilot-website`.
4. Vercel should detect Vite automatically.
5. Framework preset: Vite; Build command: `npm run build`; Output directory: `dist`.
6. If Google Sheets is ready, add `VITE_GOOGLE_SCRIPT_URL` under Environment Variables before deployment. If not, deploy first and add it later.
7. Click `Deploy`.

Vercel will provide a free `*.vercel.app` address. You can later connect a custom domain from Project > Settings > Domains.

## Free custom domain note

A free community subdomain such as a requested `leadpilot.eu.org` is not guaranteed to be available or approved. It is not the same as owning a paid `.com` or `.in` domain. Deploy first on the Vercel address; connect any custom domain only after you have obtained it and can configure its DNS.

## SEO notes

The project has clear page routes and descriptive page content. Before launch, add real business contact details, verify each service claim, create a Google Search Console property after deployment, submit the sitemap when added, and write unique metadata for each route. Do not add fake reviews, fabricated case studies or unverified performance claims.

## Notes about the enquiry form

- WhatsApp number is configured as `+91 77360 37807`.
- Visitors must tap Send in WhatsApp; the site does not send a WhatsApp message automatically.
- Google Sheets integration requires the Apps Script deployment URL.
- Avoid collecting sensitive personal, health or financial information.
