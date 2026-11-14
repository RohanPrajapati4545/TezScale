# Tezscale - Modern Full-Stack MERN Agency Platform

A modern full-stack web application with **Dynamic Content Management** and an **Admin CRM Dashboard** for handling client leads.

---

## 🌟 Key Features

1. **High-Converting Landing Page (`/`)**:
   - Modern GrowthMax digital agency layout (Hero, Trusted Brands, Services, Case Studies, Testimonials, CTA Banner).
   - Interactive Lead Generation Form connected to MongoDB Atlas.
   - 100% Dynamic: Reads live copy, stats, services, case studies, and testimonials from the backend.

2. **Admin Portal (`/admin`)**:
   - **Leads CRM**: View incoming leads with status tags (`New`, `Contacted`, `In Progress`, `Converted`, `Closed`), live status switcher, search filtering, and deletion.
   - **Hero & Live Stats Editor**: Edit titles, badges, description, CTA text, and floating metrics.
   - **Services Manager**: Add, edit, and remove agency services and icons.
   - **Case Studies & Company Metrics**: Edit milestones (`150+ Clients`, `250% Growth`, etc.) and portfolio cards.
   - **Testimonials Manager**: Manage client feedback, ratings, and quotes.
   - **CTA Banner**: Customize the bottom call-to-action banner.

---

## 📁 Project Structure

```text
Tezscale/
├── backend/
│   ├── config/
│   │   ├── db.js              # MongoDB Atlas connection
│   │   └── cloudinary.js      # Cloudinary v2 configuration
│   ├── controllers/
│   │   ├── leadController.js  # Leads CRM Controller (CRUD + stats)
│   │   └── contentController.js # Dynamic UI Content Controller (auto-seed)
│   ├── middlewares/
│   │   └── multer.js          # Multer storage configuration
│   ├── models/
│   │   ├── Lead.js            # Mongoose schema for leads
│   │   └── SiteContent.js     # Schema for dynamic site content
│   ├── routes/
│   │   ├── leadRoutes.js      # Express API routes (/api/leads)
│   │   └── contentRoutes.js   # Express API routes (/api/content)
│   ├── uploads/               # Upload directory
│   ├── .env                   # DB & Cloudinary credentials (ignored by git)
│   ├── .env.example
│   ├── package.json
│   └── server.js              # Express app with resilient port binding
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── apiClient.js   # Auto-detecting API connector
    │   ├── Components/
    │   │   ├── Navbar.jsx     # Navigation bar with link to Admin Panel
    │   │   ├── Hero.jsx       # Dynamic hero with laptop mockup & stats
    │   │   ├── TrustedBrands.jsx # Google, Meta, Microsoft, HubSpot, etc.
    │   │   ├── Services.jsx   # Dynamic service cards
    │   │   ├── LeadForm.jsx   # Strategy call lead form
    │   │   ├── OurWork.jsx    # Dynamic case studies & metrics
    │   │   ├── Testimonials.jsx # Dynamic testimonial carousel
    │   │   ├── CtaBanner.jsx  # Dynamic CTA banner
    │   │   └── Footer.jsx     # Footer with Admin link
    │   ├── context/
    │   │   └── ContentContext.jsx # React Context for live content state
    │   ├── pages/
    │   │   ├── Home.jsx       # Public landing page
    │   │   └── Admin.jsx      # Admin Portal (Leads CRM + Content Editor)
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
- Automatically connects to MongoDB Atlas and seeds default UI content.

### 2. Run Frontend App
```powershell
cd frontend
npm run dev
```
- Open `http://localhost:5173` for the Landing Page.
- Open `http://localhost:5173/admin` for the Admin Portal.
