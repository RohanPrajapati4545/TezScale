# TezScale - Digital Marketing & Growth Acceleration Platform

A high-performance full-stack MERN agency platform with **OliveFlex-inspired UI structure & smooth cubic-bezier animations**, **System UI typography**, **Dynamic Content Management**, **Lead Generation Funnel**, and a secure **Admin Backoffice (`/backoffice`)** with JWT authentication.

---

## 🌟 Key Features & OliveFlex UI Architecture

1. **OliveFlex-Inspired Landing Page Architecture (`/`)**:
   - **System UI Font Stack**: Clean native typographic hierarchy (`system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto...`) with zero layout shift.
   - **Smooth Spring Micro-Animations**: Ultra-smooth entrance sequences (`cubic-bezier(0.16, 1, 0.3, 1)`), staggered hero animations, floating KPI badges, and spring card lift (`.card-lift`).
   - **Interactive Subnav Pills with Pulsing Live Dot**: Olive-style filter pills (`All Growth Pillars`, `Medical & Clinics`, `Real Estate`, `Engineering`, `E-commerce & Retail`) with real-time pulsing live indicator (`pulseLiveDot`).
   - **Rotating Value Proposition Headline**: Dynamic keyword animation rotating between *digitally grow*, *scale B2B revenue*, *dominate search*, and *capture qualified leads*.
   - **Industry Portals / Growth Pillars Section**: Interactive vertical selector displaying tailored workflows and verified benchmark metrics for Healthcare, Real Estate, Industrial B2B, and E-commerce.
   - **4-Step Progressive Client Journey**: Clear phase-by-phase roadmap (`01. Discovery & Audit` → `02. Custom Architecture` → `03. Agile Launch` → `04. Scale & Multiply ROI`).
   - **Expandable FAQ Accordion**: Smooth accordion transitions answering key engagement questions from the requirement specification.
   - **Conversion CTAs & WhatsApp Routing**: Free Strategy Consultation triggers and instant WhatsApp integration.

2. **Admin Backoffice Authentication (`/backoffice`)**:
   - Secure login route with bcrypt password hashing and JWT token authorization.
   - **Default Admin Credentials**:
     - **Email / Username**: `admin@gmail.com`
     - **Password**: `admin@123`
   - Instant authentication with zero lag and conditional loader.

3. **Admin Dashboard (`/admin`)**:
   - Protected route — automatically redirects unauthenticated users to `/backoffice`.
   - **Leads CRM**: Manage incoming inquiries with status indicators (`New`, `Contacted`, `In Progress`, `Converted`, `Closed`), live search, and deletion.
   - **Dynamic UI Content Management**: Edit Hero texts, metrics, services, case studies, and testimonials directly in MongoDB Atlas.
   - **Logout**: Secure one-click sign out.

---

## 📁 Project Structure

```text
Tezscale/
├── backend/
│   ├── config/
│   │   ├── db.js              # MongoDB Atlas connection
│   │   └── cloudinary.js      # Cloudinary v2 configuration
│   ├── controllers/
│   │   ├── authController.js  # JWT Admin Login (auto-seeds default admin)
│   │   ├── leadController.js  # Leads CRM Controller (CRUD + stats)
│   │   └── contentController.js # Dynamic UI Content Controller
│   ├── middlewares/
│   │   ├── authMiddleware.js  # JWT Bearer Token protection
│   │   └── multer.js          # Multer storage configuration
│   ├── models/
│   │   ├── Admin.js           # Admin schema with bcrypt password hashing
│   │   ├── Lead.js            # Mongoose schema for consultation leads
│   │   └── SiteContent.js     # Schema for dynamic site content
│   ├── routes/
│   │   ├── authRoutes.js      # Express API routes (/api/auth/login)
│   │   ├── leadRoutes.js      # Express API routes (/api/leads)
│   │   └── contentRoutes.js   # Express API routes (/api/content)
│   ├── uploads/               # Upload directory
│   ├── .env                   # DB & Cloudinary credentials (git ignored)
│   ├── .env.example
│   ├── package.json
│   └── server.js              # Express app with resilient port fallback (5000 / 5005)
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── apiClient.js   # Auto-detecting API connector (port 5000 / 5005)
    │   ├── Components/
    │   │   ├── Navbar.jsx     # Navigation bar with active blue link & indicator underline
    │   │   ├── Hero.jsx       # Clean high-converting hero with animated rotating title
    │   │   ├── Services.jsx   # 6 Modern digital marketing cards with .card-lift
    │   │   ├── IndustrySolutions.jsx # Vertical portal switcher
    │   │   ├── WhyChooseUs.jsx # 4-step progressive roadmap + executive preview
    │   │   ├── OurWork.jsx    # Success stories with metrics & case studies
    │   │   ├── Testimonials.jsx # Testimonials + CTA conversion card
    │   │   ├── FaqSection.jsx # Smooth collapsible FAQ accordion
    │   │   ├── Footer.jsx     # Comprehensive footer with WhatsApp button
    │   │   ├── ScrollToTop.jsx # Smooth scroll to top on route change
    │   │   └── ConsultationModal.jsx # Animated popup consultation modal
    │   ├── context/
    │   │   └── ContentContext.jsx # React Context for live content state
    │   ├── pages/
    │   │   ├── Home.jsx           # Main Landing Page with summary previews
    │   │   ├── About.jsx          # Dedicated About Us Page (/about)
    │   │   ├── ServicesPage.jsx   # Dedicated Core Services Page (/services)
    │   │   ├── PortfolioPage.jsx  # Dedicated Portfolio & Case Studies Page (/portfolio)
    │   │   ├── TestimonialsPage.jsx # Dedicated Testimonials & Social Proof (/testimonials)
    │   │   ├── ContactPage.jsx    # Dedicated Contact & Inquiries Page (/contact)
    │   │   ├── BackofficeLogin.jsx # Admin Login with Show/Hide Password (/backoffice)
    │   │   └── Admin.jsx          # Protected Admin Dashboard (/admin)
    │   ├── App.jsx            # Full Multi-Page Routing Architecture
    │   ├── App.css
    │   ├── index.css          # Olive-style animations & system-ui typography
    │   └── main.jsx
    ├── .env
    ├── .env.example
    ├── package.json
    ├── tailwind.config.js
    └── vite.config.js
```

---

## 🚀 How to Run Locally

### 1. Run Backend Server
```powershell
cd backend
npm run dev
```
- Server URL: `http://localhost:5000` (auto-fallbacks to `5005` if 5000 is occupied)
- Connects to MongoDB Atlas, verifies admin (`admin@gmail.com` / `admin@123`), and serves REST APIs.

### 2. Run Frontend App
```powershell
cd frontend
npm run dev
```
- Landing Page: **`http://localhost:5173`**
- Admin Backoffice Login: **`http://localhost:5173/backoffice`**
- Protected Admin Dashboard: **`http://localhost:5173/admin`**

---

## 🌐 Deploying to Render (Free Cloud Hosting)

When creating a new **Web Service** on [Render.com](https://render.com):

1. **Connect Repository**: `https://github.com/RohanPrajapati4545/TezScale`
2. **Settings**:
   - **Language**: `Node`
   - **Branch**: `main`
   - **Region**: Any (e.g. `Ohio (US East)` or `Singapore`)
   - **Root Directory**: Leave **BLANK** (empty)
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
3. **Environment Variables**:
   Add the following under **Environment Variables**:
   - `MONGO_URL` = `mongodb+srv://RK-prajapati:jVVTAYIC2EyaGIJW@cluster0.bitnsbv.mongodb.net/Project4?appName=Cluster0`
   - `JWT_SECRET` = `tezscale_jwt_secret_2026_growthmax`
   - `CLOUDINARY_CLOUD_NAME` = `nnjncy8i`
   - `CLOUDINARY_API_KEY` = `818237368646962`
   - `CLOUDINARY_API_SECRET` = `VhqWB0Z22_MurLUraFefory8Nsk`
   - `NODE_ENV` = `production`
4. Click **Deploy Web Service** — Render will build and deploy the complete application (both Frontend + Backend APIs) under a single live URL!
