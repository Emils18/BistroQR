Here is the complete, production-ready README.md file customized specifically
with your live deployment URLs, actual project configurations, and monorepo
structure.

README.md

# BistroQR - Interactive QR Ordering System

BistroQR is a responsive, web-based restaurant ordering application designed for seamless customer and administrator workflows. Customers can scan a dynamically generated QR code to browse the food catalog, modify selections in an interactive sliding cart, and complete sandboxed checkout workflows. Administrators can monitor transactions, review live sales analytics, and update payment status values in real time.

## Live Deployments

*   **Production Frontend (Vercel)**: [https://bistro-qr-terminal.vercel.app](https://bistro-qr-terminal.vercel.app)
*   **Production API Backend (Render)**: [https://bistroqr-backend.onrender.com](https://bistroqr-backend.onrender.com)
*   **Database Engine (Supabase)**: PostgreSQL Instance

---

## Technical Stack

*   **Database**: Supabase PostgreSQL Engine (JSONB schema representation)
*   **API Engine**: Node.js & Express
*   **Frontend**: React (Create React App), Tailwind CSS (v3), PostCSS, Axios
*   **QR Engine**: `qrcode.react` (High-Correction SVG vectors)

---

## Key Features

*   **Interactive Menu Grid**: Visual item catalog with hover translation offsets, shadow shifts, and category menu pills.
*   **Centralized State & Sliding Drawer**: Centralized React Context state. Adding items automatically slides open a modern, glassmorphic panel drawer from the right side of the screen.
*   **Tactile Cart FAB**: When closed, the cart stays anchored in the bottom-right corner as a floating bubble, executing a rotational pop animation (`anim-pop-pulse`) every time the item count changes.
*   **High-Tech QR Viewport**: Generates an SVG QR code displayed within a phone mockup container, featuring corner framing guides and an animated vertical scanning laser line (`anim-laser`).
*   **Admin Dashboard & Analytics**: Features live diagnostics panels (calculating Gross Revenue, Processed Invoices, and Pending Action lists) alongside status badge updates.

---

## Repository Directory Layout

```text
BistroQR/
├── backend/
│   ├── routes/
│   │   ├── products.js
│   │   └── orders.js
│   ├── .env
│   ├── db.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Admin.js
│   │   │   ├── Cart.js
│   │   │   ├── Menu.js
│   │   │   └── QRPage.js
│   │   ├── contexts/
│   │   │   └── CartContext.js
│   │   ├── App.js
│   │   ├── index.css
│   │   └── index.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── vercel.json
│   └── package.json
├── database.sql
└── README.md

Local Development Setup

1. Database Initialization

1.  Log into your Supabase Dashboard and create a new project.
2.  Open the SQL Editor from the left-hand sidebar.
3.  Paste the contents of database.sql into the SQL panel and click Run. This
    establishes your schemas, Row Level Security (RLS) policies, and populates
    the menu products.

2. Backend Configuration

1.  Navigate to the backend directory:
    cd backend
2.  Install dependencies:
    npm install
3.  Create a .env file in the backend/ folder and insert your Supabase API
    credentials:
    PORT=5000
    SUPABASE_URL=https://ydbdardwsunrcyezgsny.supabase.co
    SUPABASE_ANON_KEY=your_supabase_anon_public_key
4.  Start the development server:
    npm run dev

3. Frontend Configuration

1.  Open a new terminal tab and navigate to the frontend directory:
    cd frontend
2.  Install dependencies (utilizing legacy peer resolution):
    npm install --legacy-peer-deps
3.  Start the React development server:
    npm start

Environment Variables

Backend (backend/.env)

| Variable            | Description                          |
| :------------------ | :----------------------------------- |
| `PORT`              | Local runtime port (Default: `5000`) |
| `SUPABASE_URL`      | Your Supabase project URL endpoint   |
| `SUPABASE_ANON_KEY` | Your public Supabase anon key        |

Frontend (Vercel Project Settings)

| Variable            | Description                                                                  |
| :------------------ | :--------------------------------------------------------------------------- |
| `REACT_APP_API_URL` | Production Backend Web Service URL (`https://bistroqr-backend.onrender.com`) |

Production Deployment Parameters

Backend (Render)

  - Root Directory: backend
  - Build Command: npm install
  - Start Command: node server.js
  - Environment Variables: SUPABASE_URL, SUPABASE_ANON_KEY

Frontend (Vercel)

  - Root Directory: frontend
  - Framework Preset: Create React App
  - Build Command: CI=false npm run build (To bypass compiling warnings as
    errors)
  - Install Command: npm install --legacy-peer-deps (To resolve qrcode.react
    peer conflicts)
  - Environment Variables: REACT_APP_API_URL

License

This project is licensed under the MIT License.

