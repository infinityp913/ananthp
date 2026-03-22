# ananthp · Personal Website

This is my personal website, built with Next.js and Tailwind CSS. It lives at
[ananthp.vercel.app](https://ananthp.vercel.app).

Inspired by [Lee Robinson's website](https://leerob.io).

---

## Tech Stack

- **Framework:** Next.js 13
- **Language:** JavaScript / React 18
- **Styling:** Tailwind CSS
- **Build tools:** PostCSS, Autoprefixer
- **Deployment:** Vercel

---

## Getting Started

### Prerequisites

- Node.js (see `package.json` `engines` field for the recommended version)
- npm or yarn

### Installation

Clone the repo and install dependencies:

```bash
git clone https://github.com/infinityp913/ananthp.git
cd ananthp
npm install
```

### Development

Run the local development server:

```bash
npm run dev
```

Then open `http://localhost:3000` in your browser.

### Production Build

Create an optimized production build and start it locally:

```bash
npm run build
npm start
```

---

## Project Structure

High-level structure (simplified):

- `pages/` – Next.js pages (`index.js`, `work/index.js`, `projects/index.js`)
- `components/` – Reusable UI components (e.g. `Navbar.jsx`)
- `styles/` – Global and Tailwind-related styles
- `public/` – Static assets
- `__tests__/` – Jest + Testing Library unit tests (home, work, projects)
- `specs/` – Feature specs, plans, and task breakdowns

---

## Deployment

The site is deployed on Vercel at **[ananthp.vercel.app](https://ananthp.vercel.app)**. Pushes to the
default branch trigger automatic deployments.

---

## License

This is my personal site; feel free to browse the code for inspiration, but please don’t reuse the
branding, content, or design verbatim.  
  
If you build something inspired by this, I’d love to see it. Please do credit the original if you share it publicly.
