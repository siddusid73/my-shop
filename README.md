# MyShop 🛍️

An e-commerce web app built with React, Tailwind CSS, and Firebase Auth.

**Live demo:** _add your Vercel link here after deploying_

## Features

- Product catalogue from FakeStore API, with a local JSON fallback
- Search, filter, and sort
- Product detail pages (`/product/:id`)
- Shopping cart with localStorage persistence
- Signup, login, and logout via Firebase Auth
- Protected `/profile` route
- Responsive design

## Tech Stack

React 18 (Vite) · Tailwind CSS v4 · React Router v6 · Context API + useReducer · Firebase Authentication

## Getting Started

**Prerequisites:** Node.js 18+ and a Firebase project with Email/Password auth enabled.

```bash
git clone https://github.com/siddusid73/my-shop.git
cd my-shop
npm install
```

Create a `.env` file in the project root:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Then run:

```bash
npm run dev
```

Open http://localhost:5173.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build |

## Deployment

Run `npm run build`, then deploy the `dist/` folder to Vercel or Netlify. Add the `.env` variables in your host's settings.

## License

MIT
