# MyShop 🛍️

A fully functional e-commerce web application built with React.js and Tailwind CSS.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?logo=firebase&logoColor=black)

---

## Live Demo

> Deploy to Vercel: `npm run build` → drop the `dist/` folder on [vercel.com](https://vercel.com)

---

## Features

- **Product catalogue** — live data from FakeStore API with local JSON fallback
- **Search, filter & sort** — real-time filtering by name, category, and price
- **Product detail pages** — dynamic routes at `/product/:id`
- **Shopping cart** — add, remove, update quantities with localStorage persistence
- **Order summary** — subtotal, tax, free shipping threshold
- **User authentication** — signup, login, logout via Firebase Auth
- **Protected routes** — `/profile` redirects unauthenticated users to `/login`
- **Session persistence** — stays logged in across page refreshes
- **Fully responsive** — works on mobile, tablet, and desktop

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js 18 (Vite) |
| Styling | Tailwind CSS v4 |
| Routing | React Router v6 |
| State | Context API + useReducer |
| Auth | Firebase Authentication |
| Data | FakeStore API + local fallback |

---

## Getting Started

### Prerequisites

- Node.js v18 or higher
- A Firebase project with Email/Password auth enabled

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/my-shop.git
cd my-shop

# 2. Install dependencies
npm install

# 3. Add your Firebase config (see below)

# 4. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Firebase Setup

1. Go to [firebase.google.com](https://firebase.google.com) and create a project
2. Enable **Email/Password** under Authentication → Sign-in method
3. Copy your Firebase config into `src/firebase.js`:

```js
const firebaseConfig = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_AUTH_DOMAIN",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId:             "YOUR_APP_ID",
}
```

> **Note:** For production, store these values in a `.env` file and add it to `.gitignore`.

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx           # Sticky nav with cart badge and auth avatar
│   ├── ProductCard.jsx      # Reusable product card with rating
│   ├── FormInput.jsx        # Reusable input with inline error display
│   └── ProtectedRoute.jsx   # Redirects unauthenticated users
├── context/
│   ├── CartContext.jsx      # Global cart state with useReducer
│   └── AuthContext.jsx      # Firebase auth state and helpers
├── pages/
│   ├── Home.jsx             # Hero section and feature cards
│   ├── Shop.jsx             # Product grid with search, filter, sort
│   ├── ProductDetail.jsx    # Single product with add-to-cart
│   ├── Cart.jsx             # Cart items and order summary
│   ├── Login.jsx            # Login form
│   ├── Signup.jsx           # Signup form with validation
│   └── Profile.jsx          # Protected user profile page
├── hooks/
│   └── useProducts.js       # Data fetching with API + fallback
├── data/
│   └── products.json        # Local product data fallback
├── firebase.js              # Firebase initialisation
├── App.jsx                  # Routes configuration
└── main.jsx                 # App entry point with providers
```

---

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build locally
```

---

## Deployment

### Vercel (recommended)

```bash
npm run build
# Drag the dist/ folder to vercel.com, or use the Vercel CLI:
npx vercel --prod
```

### Netlify

```bash
npm run build
# Drag the dist/ folder to netlify.com
# Set publish directory to: dist
```

---

## Roadmap

- [ ] Stripe payment integration
- [ ] Product reviews and ratings
- [ ] Wishlist / saved items
- [ ] Admin dashboard
- [ ] Dark mode toggle
- [ ] Node.js + MongoDB backend

---

## License

MIT — free to use for learning and personal projects.
