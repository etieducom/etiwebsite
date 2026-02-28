# ETI Educom - Product Requirements Document

## Original Problem Statement
Build and enhance the official website for "ETI Educom®" - a comprehensive IT training institute website with admin panel functionality.

## What's Been Implemented

### Core Features (Completed)
- **Full-stack Application:** FastAPI backend + React frontend + MongoDB
- **Admin Panel:** Complete content management system at `/admin`
- **SEO Management:** Dynamic meta tags for all pages
- **AI Chatbot:** Powered by OpenAI GPT-4o via Emergent LLM Key
- **Dynamic Navigation:** Admin-managed navbar with dropdown support

### Content Management (Admin Panel)
| Feature | Status | Notes |
|---------|--------|-------|
| **Navigation** | ✅ NEW | Add/Edit/Delete menu items, dropdowns |
| Events | ✅ Done | Add/Edit/Delete with dates, locations |
| Reviews | ✅ Done | Student testimonials with ratings |
| Blogs | ✅ Done | Full blog system with categories |
| Programs | ✅ Done | Course curriculum management |
| Team Members | ✅ Done | Staff profiles with social links |
| Branches | ✅ Done | Location pages with maps |
| SEO Settings | ✅ Done | Page-specific meta tags |
| Technical SEO | ✅ Done | Analytics IDs, scripts |
| Announcements | ✅ Done | Site-wide announcement bar |
| Popup Modal | ✅ Done | Promotional popups |
| FAQs | ✅ Done | Frequently asked questions |
| Jobs | ✅ Done | Career postings |
| Leads | ✅ Done | Contact form submissions |
| Enquiries | ✅ Done | Quick enquiry submissions |

### Programs Added
1. SOC Analyst (6 Months) - Full 10-module curriculum
2. Ethical Hacking & Penetration Testing (6 Months)
3. Full Stack Web Development (8 Months)
4. Digital Marketing Mastery (4 Months)

### Navigation Structure (Default)
- Home
- About (dropdown): About Us, Our Founder, Our Team
- Programs (mega menu): All programs by category
- Resources (dropdown): Blogs, Events, FAQ
- Careers (dropdown): Hire From Us, Join Our Team
- Franchise
- Contact

### Pages
- Home, About, Founder, Programs, Program Details
- Events, Blogs, Blog Details, FAQ
- Hire From Us, Join Team, Franchise
- Contact, Free Counselling, Summer Training
- Privacy Policy, Team, Branches
- Cyber Warriors, Admin

## Technical Stack
- **Backend:** FastAPI, Python 3.10+, Motor (MongoDB async)
- **Frontend:** React 19, TailwindCSS, Shadcn/UI
- **Database:** MongoDB
- **Deployment:** Nginx, PM2, Let's Encrypt SSL

## API Endpoints

### Navigation API (NEW)
- `GET /api/navigation` - Get hierarchical navigation
- `GET /api/navigation/all` - Get flat list (admin)
- `POST /api/navigation` - Create nav item
- `PUT /api/navigation/:id` - Update nav item
- `DELETE /api/navigation/:id` - Delete nav item
- `POST /api/navigation/seed-default` - Seed default menu

## Files of Reference
- `/app/backend/server.py` - Main API file
- `/app/frontend/src/pages/AdminPage.jsx` - Admin dashboard
- `/app/frontend/src/components/Header.jsx` - Dynamic navigation header
- `/app/frontend/src/components/SEO.jsx` - SEO component
- `/app/DEPLOYMENT_GUIDE.md` - Deployment instructions

## Deployment Status
- **Preview Environment:** Fully functional
- **Production (Hostinger VPS):** Pending deployment with latest code

## Known Issues
1. Data persistence on VPS when using PM2 (environment variable issue)

## Last Updated
February 28, 2026
