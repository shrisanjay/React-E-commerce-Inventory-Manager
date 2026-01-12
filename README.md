# Kambaa - E-Commerce Inventory Dashboard

A high-performance internal dashboard for e-commerce platforms built with React and Vite. Features real-time inventory management, dynamic routing, and global state persistence.

## ✨ Features

- **Data Ingestion Layer** - Custom `useProductIngestion` hook for decoupled data fetching with automatic price formatting
- **Global State Management** - React Context API for persisting inventory drafts across navigation
- **Dynamic Routing** - URL as single source of truth with React Router
- **Category Filtering** - Optimized filtering with `useMemo` for performance
- **Interactive Sidebar** - Auto-syncing navigation with `NavLink`

## 🛠️ Tech Stack

- **React 18** - UI Library
- **Vite** - Build Tool & Dev Server
- **React Router DOM** - Client-side Routing
- **Lucide React** - Icon Library
- **ESLint** - Code Linting

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/kambaa.git
   cd kambaa
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 📁 Project Structure

```
kambaa/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── MainLayout    # Main app layout wrapper
│   │   ├── ProductCard   # Product display card
│   │   └── Sidebar       # Navigation sidebar
│   ├── context/          # React Context providers
│   │   └── InventoryContext  # Global inventory state
│   ├── hooks/            # Custom React hooks
│   │   └── useProductIngestion  # Data fetching hook
│   ├── pages/            # Route components
│   │   ├── Dashboard     # Main dashboard view
│   │   ├── CategoryView  # Category filtered view
│   │   └── ProductDetail # Individual product page
│   ├── App.jsx           # Main app component with routes
│   └── main.jsx          # App entry point
├── public/               # Static assets
└── package.json          # Project dependencies
```

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🏗️ Architecture Highlights

### Custom Hook Pattern
Data fetching is decoupled from UI components using `useProductIngestion`. This hook handles:
- Async data fetching
- Loading and error states
- Data transformation (price formatting)

### Draft Pattern for State
Inventory changes are stored as drafts in a separate object, avoiding mutation of original data:
- O(1) lookup for draft values
- Clean fallback to API values
- Persists across route changes

### URL-Driven Navigation
React Router's `NavLink` ensures the UI always reflects the current URL state, making the application bookmarkable and shareable.

## 📄 License

This project is private and proprietary.

---

Built with ❤️ using React + Vite
