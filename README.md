# ✈️ LoungePass — Airport Lounge Booking System

A modern, component-driven web application for browsing and booking airport lounges, built with **React 18**, **TypeScript**, and **Vite**.

---

## 🚀 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 18.2.0 | UI library |
| TypeScript | 5.2.2 | Type safety |
| Vite | 5.2.0 | Build tool & dev server |
| React Router DOM | 6.22.3 | Client-side routing |
| Context API | (built-in) | Global state management |

---

## 📁 Project Structure

```
loungepass-react/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
└── src/
    ├── main.tsx              # App entry point
    ├── App.tsx               # Root component + routing
    ├── types.ts              # Shared TypeScript interfaces
    ├── index.css             # Global styles
    ├── components/
    │   ├── Navbar.tsx        # Top navigation bar
    │   ├── Footer.tsx        # Site footer
    │   ├── LoungeCard.tsx    # Reusable lounge display card
    │   ├── AuthModal.tsx     # Login / signup modal
    │   └── AdminPortal.tsx   # Admin management panel
    ├── pages/
    │   ├── HomePage.tsx      # Landing page
    │   ├── LoungesPage.tsx   # Browse lounges
    │   ├── MembershipPage.tsx# Membership tiers
    │   ├── MyBookingsPage.tsx# User's booking history
    │   └── HelpPage.tsx      # FAQ & support
    ├── contexts/
    │   ├── AuthContext.tsx   # Auth state (user, login, logout)
    │   └── ThemeContext.tsx  # Dark/light theme state
    └── data/                 # Static / mock data
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js v18+
- npm v9+

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd loungepass-react

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at **http://localhost:5173**

### Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

---

## 🗺️ Routes

| Path | Page | Description |
|---|---|---|
| `/` | HomePage | Landing page with hero & featured lounges |
| `/lounges` | LoungesPage | Browse all available airport lounges |
| `/membership` | MembershipPage | View & sign up for membership tiers |
| `/bookings` | MyBookingsPage | View and manage your bookings |
| `/help` | HelpPage | FAQ and support |

---

## 🧩 Key Components

### `App.tsx`
Root component that wraps the app in `ThemeProvider` and `AuthProvider`, then sets up all routes via React Router DOM. Global components (Navbar, Footer, AuthModal, AdminPortal) are mounted here once.

### `AuthModal.tsx`
Login and signup modal, triggered from the Navbar. Reads and writes to `AuthContext`.

### `LoungeCard.tsx`
Reusable card displaying lounge name, airport, rating, price, and tags. Used across LoungesPage and HomePage.

### `AdminPortal.tsx`
Admin-only panel for managing bookings, lounges, and members. Conditionally shown based on user role from `AuthContext`.

---

## 🔷 TypeScript Interfaces (`src/types.ts`)

```ts
export interface User {
  name: string;
  email: string;
  picture?: string;
}

export interface Lounge {
  name: string;
  airport: string;
  rating: number;
  price: string;
  tags: string[];
  icon: string;
  bg: string;
}

export interface Booking {
  id: string;
  name: string;
  email: string;
  lounge: string;
  date: string;
  status: string;
  createdAt: string;
}

export interface Member {
  id: string;
  name: string;
  mobile: string;
  ticket: string;
  tier: string;
  visits: number;
}
```

---

## 🌐 Global State (Context API)

### `AuthContext`
Manages the currently logged-in user, login/logout functions, and auth modal visibility. Access anywhere with:

```tsx
const { user, login, logout } = useAuth();
```

### `ThemeContext`
Manages dark/light theme preference (persisted to localStorage). Access anywhere with:

```tsx
const { theme, toggleTheme } = useTheme();
```

---

## 🏗️ Architecture

```
App.tsx
├── ThemeProvider
│   └── AuthProvider
│       └── BrowserRouter
│           ├── Navbar        ← reads Auth + Theme
│           ├── Routes
│           │   ├── /         → HomePage
│           │   ├── /lounges  → LoungesPage → LoungeCard[]
│           │   ├── /membership → MembershipPage
│           │   ├── /bookings → MyBookingsPage
│           │   └── /help     → HelpPage
│           ├── Footer
│           ├── AuthModal     ← controlled by AuthContext
│           └── AdminPortal   ← role-gated via AuthContext
```

State flows **down** via props and context. Events flow **up** via callbacks.

---

## 📦 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Type-check + production build |
| `npm run preview` | Preview the production build locally |

---

## 🎓 Academic Info

**Department of Computer Science and Engineering**  
Koneru Lakshmaiah Education Foundation (KLH University), Hyderabad

---

## 📄 License

This project is for academic and educational purposes.
