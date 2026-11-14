# Tezscale - GrowthMax Digital Marketing Agency Platform

A modern full-stack agency platform with **Dynamic Content Management**, **Interactive Consultation Leads CRM**, and a secure **Admin Backoffice** with JWT authentication.

---

## 🌟 Key Features

1. **High-Converting Landing Page (`/`)**:
   - Modern GrowthMax layout matching latest design specifications.
   - **Hero**: Active services tag, dynamic headlines, dual CTAs, rising 3D bar chart with floating metrics (`+250% Growth`, `98% Satisfaction`), and trust sector badges (Healthcare, Real Estate, Engineering).
   - **Complete Services**: 6 service cards (Website Builder, Graphic Design, Digital Marketing Support, E-commerce Support, Social Media Services, Meta Ads Management).
   - **Why Choose Us ("Your Growth, Our Mission")**: Interactive benefits checklist, marketing director visual with floating priority badges, and modern agency office boardroom preview.
   - **Some Success Stories**: 3 Milestone counters (`250% Growth`, `500+ Clients`, `5+ Years`) and real case studies (Clinic SEO, Real Estate, E-commerce).
   - **Testimonials & Consultation CTA**: Real client quote (Dr. Priya Sharma) alongside instant consultation CTA card.
   - **Full Footer**: Contact info (`+91 98765 43210`, `hello@growthmax.in`, `Indore, MP`), newsletter subscription, social links, and floating WhatsApp support button.
   - **Free Consultation Modal**: Click any consultation button across the site to book a strategy call, saving directly to MongoDB Atlas.

2. **Admin Backoffice Authentication (`/backoffice`)**:
   - Secure login route with bcrypt password hashing and JWT token authorization.
   - **Default Admin Credentials**:
     - **Email / Username**: `admin@gmail.com` or `admin`
     - **Password**: `admin@123`
   - Fast, instant authentication with zero lag and responsive loading spinner.

3. **Admin Dashboard (`/admin`)**:
   - Protected route — redirects unauthenticated users to `/backoffice`.
   - **Leads CRM**: View incoming leads with status tags (`New`, `Contacted`, `In Progress`, `Converted`, `Closed`), live status switcher, search filtering, and deletion.
   - **Live Content Editor**: Edit Hero texts, metrics, services, case studies, and testimonials directly in MongoDB Atlas.
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
│   ├── .env                   # DB & JWT credentials (ignored by git)
│   ├── .env.example
│   ├── package.json
│   └── server.js              # Express app with resilient port binding
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── apiClient.js   # Auto-detecting API connector (port 5000 / 5005)
    │   ├── Components/
    │   │   ├── Navbar.jsx     # Navigation bar with GrowthMax branding
    │   │   ├── Hero.jsx       # Hero with laptop mockup & live stats
    │   │   ├── Services.jsx   # 6 Modern digital marketing cards
    │   │   ├── WhyChooseUs.jsx # "Your Growth, Our Mission" section
    │   │   ├── OurWork.jsx    # "Some Success Stories" with metrics & case studies
    │   │   ├── Testimonials.jsx # Testimonial quote + consultation CTA
    │   │   ├── Footer.jsx     # Footer with newsletter, contact, WhatsApp button
    │   │   └── ConsultationModal.jsx # Animated popup consultation form
    │   ├── context/
    │   │   └── ContentContext.jsx # React Context for live content state
    │   ├── pages/
    │   │   ├── Home.jsx           # Main Landing Page
    │   │   ├── BackofficeLogin.jsx # Admin Login Portal (/backoffice)
    │   │   └── Admin.jsx          # Protected Admin Dashboard (/admin)
    │   ├── App.jsx
    │   ├── App.css
    │   ├── index.css
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
- Automatically connects to MongoDB Atlas, seeds default admin (`admin@tezscale.com` / `admin123`), and seeds UI content.

### 2. Run Frontend App
```powershell
cd frontend
npm run dev
```
- Landing Page: **`http://localhost:5173`**
- Admin Backoffice Login: **`http://localhost:5173/backoffice`**
- Protected Admin Dashboard: **`http://localhost:5173/admin`**
