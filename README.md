# LUTTUR MOTEL (लुत्तूर मोटल) — Premium 3D Pure Vegetarian Restaurant Website

An award-winning, Awwwards-style 3D interactive website for **LUTTUR MOTEL**, a pure vegetarian restaurant in Jalalpur, Jaunpur, Uttar Pradesh, India.

## 🌟 Features

* **Cinematic 3D Feast (Three.js & WebGL)**: Realistic floating Indian brass thali with slow camera orbit, interactive mouse parallax tilt, steam particle effects, ambient golden bokeh embers, and smooth scroll integration.
* **100% Pure Vegetarian Branding**: Clean green certifications, high contrast typography, champagne gold & deep midnight charcoal palette.
* **Exact Printed Menu & Tariff**: Preserved original categories, items, and INR prices directly transcribed from the printed restaurant menu (Beverages, Breakfast, Chinese, Soup, Tandoori Starters, Main Course, Rice, Dal, Roti, Salad/Curd, Desserts).
* **Interactive Menu System**: Instant real-time search, category filter tabs, portion selector (Half/Full), and 100% vegetarian indicators.
* **Direct Order & Inquiry Tray**: Build a meal selection and generate a 1-click WhatsApp message to `+91 8855332641` or call directly.
* **Culinary Gallery with Lightbox**: High-resolution photography of authentic dishes with accessible full-screen modal viewer.
* **Verified Location & Contact**:
  * Phone: `8855332641`
  * Address: Jalalpur, Jaunpur, Uttar Pradesh, India
  * Working 1-tap Call, WhatsApp, and Google Maps Highway Directions.
* **SEO & Rich Schema.org**: Fully structured JSON-LD `Restaurant` schema, OpenGraph tags, and meta tags.

## 🛠️ Tech Stack

* **React 19** & **TypeScript**
* **Vite**
* **Three.js** & WebGL
* **Tailwind CSS v4**
* **Lucide React** icons

## 🚀 Getting Started

### Prerequisites

* Node.js 18+
* npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

The application will be live at `http://localhost:3000`.

### Production Build

```bash
# Build production bundle
npm run build
```

The compiled output will be generated in the `dist` folder.

## 🌐 Deployment Instructions

### GitHub Pages

1. In `vite.config.ts`, set the `base` path if deploying to a repository subpath:
   ```ts
   base: '/luttur-motel/',
   ```
2. Build the project:
   ```bash
   npm run build
   ```
3. Deploy the contents of the `dist/` directory to your `gh-pages` branch.

### Netlify

1. Connect your repository to Netlify.
2. Build command: `npm run build`
3. Publish directory: `dist`

### Vercel

1. Import the project into Vercel.
2. Framework preset: `Vite`
3. Build command: `npm run build`
4. Output directory: `dist`
