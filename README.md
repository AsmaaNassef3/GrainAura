<div align="center">

# 🌾 Grain Aura

### A modern, responsive social media web application

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![License](https://img.shields.io/badge/License-MIT-22C55E?style=for-the-badge)](LICENSE)

</div>

---

## 📖 Overview

**Grain Aura** is a full-featured social media application built with React 19 and Vite. It offers a clean, Facebook-inspired feed experience — users can register, log in, create posts, comment, and manage their profile, all within a polished, mobile-responsive UI.

---

## 📸 Screenshots


| Feed | Profile |
|------|--------|
| ![News Feed](images/newsfeed.png) | ![User Profile](images/profile.png) |

| Login | Create Post |
|-------|-------------|
| ![Login](images/login.png) | ![Create Post](images/create-post.png) |
---

## ✨ Features

- 🔐 **Authentication** — Register & login with token-based sessions
- 📰 **News Feed** — Paginated post feed with smooth skeleton loading
- ✏️ **Create / Edit / Delete Posts** — Full CRUD with optimistic UI updates
- 💬 **Comments** — Add, edit, and delete comments per post
- 👤 **User Profile** — Update name, username, email, avatar & password
- 🖼️ **Image Upload** — Attach images to posts with local preview
- 📱 **Responsive Design** — Mobile-first layout using Tailwind CSS v4
- 🎨 **Smooth Animations** — Page transitions and micro-interactions via Framer Motion
- 🔔 **Toast Notifications** — Real-time feedback with React Toastify
- ⚠️ **Confirmation Dialogs** — SweetAlert2 for destructive actions

---

## 🛠️ Tech Stack

| Layer            | Technology                   |
| ---------------- | ---------------------------- |
| **Framework**    | React 19 + Vite 7            |
| **Styling**      | Tailwind CSS v4 + HeroUI     |
| **Routing**      | React Router DOM v7          |
| **Server State** | TanStack React Query v5      |
| **Forms**        | React Hook Form + Zod        |
| **Animations**   | Framer Motion v12            |
| **HTTP Client**  | Axios                        |
| **Icons**        | React Icons + Lucide React   |
| **Alerts**       | SweetAlert2 + React Toastify |
| **Deployment**   | Vercel                       |

---

## 🗂️ Project Structure

```
src/
├── components/         # Shared UI components (Navbar, Footer, Auth panels)
├── context/            # React Context (Auth, User Data)
├── Layout/             # Page layout wrappers
├── lib/                # Utilities and validation schemas
├── Pages/              # Route-level page components
│   ├── Auth/           # Login & Register
│   ├── NewsFeed/       # Main feed
│   ├── PostCards/      # Post card + comments
│   ├── CreatePost/     # Create / Edit post modal
│   ├── UserProfile/    # Profile management
│   └── ...
└── services/           # API service functions
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/AsmaaNassef3/GrainAura.git
cd GrainAura

# 2. Install dependencies
npm install

# 3. Create your environment file
cp .env.example .env
# Fill in VITE_BASE_URL with your API base URL

# 4. Start the development server
npm run dev
```

### Build for Production

```bash
npm run build
npm run preview
```

---

## ⚙️ Environment Variables

Create a `.env` file in the project root:

```env
VITE_BASE_URL=https://your-api-base-url.com
```

---

## 🌐 Deployment

This project is configured for zero-config deployment on **Vercel**.  
A `vercel.json` is included to handle SPA client-side routing rewrites.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

---

## 🔮 Future Improvements

- [ ] 🌙 **Dark Mode** — System-aware theme toggle
- [ ] 🔍 **Search** — Full-text search across posts and users
- [ ] 🔔 **Real-time Notifications** — WebSocket or SSE-based alerts
- [ ] 💾 **Infinite Scroll** — Replace pagination with virtual scrolling
- [ ] 🗂️ **TypeScript Migration** — Gradual adoption for type safety
- [ ] 🧪 **Unit & E2E Tests** — Vitest + Playwright coverage
- [ ] 🌍 **i18n** — Multi-language support (Arabic / English)
- [ ] 📡 **PWA** — Offline support and installability

---

## 🤝 Contributing

Contributions, issues and feature requests are welcome!  
Feel free to open a [GitHub Issue](https://github.com/AsmaaNassef3/GrainAura/issues) or submit a pull request.

---

## 👩‍💻 Author

<div align="center">

**Asmaa Nassef**  
[![GitHub](https://img.shields.io/badge/GitHub-AsmaaNassef3-181717?style=flat-square&logo=github)](https://github.com/AsmaaNassef3)

</div>

---

<div align="center">
  <sub>Built with ❤️ using React & Vite</sub>
</div>
