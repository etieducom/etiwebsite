# ETI Educom® - Official Website PRD

## Project Overview
**Brand Name:** ETI Educom®  
**Legal Entity:** ETI Learning Systems Private Limited  
**Established:** 2017  
**Positioning:** The Computer Career School  
**Certification Status:** Certiport Authorized Testing Center (CATC)

## User Personas
1. **Students** - Seeking structured computer career education
2. **Parents** - Looking for trustworthy, governance-oriented institutes  
3. **Franchise Seekers** - Entrepreneurs wanting to start education centers
4. **Corporate Partners** - Companies seeking training partnerships
5. **Admin Users** - Staff managing content, reviews, events, and programs

## Core Requirements
- Institutional, professional tone (not coaching center feel)
- No "100% placement" claims or sales urgency
- Clean white layout with blue (#1545ea) primary color
- Grey accent color: #ebebeb
- Poppins font throughout the website
- Multi-page SPA architecture with React Router

## Design System
- **Primary Font:** Poppins (headings and body)
- **Primary Color:** #1545ea (Blue)
- **Grey Color:** #ebebeb
- **White:** #ffffff
- **Text Dark:** #1a1a1a
- **Text Muted:** #717171
- **Animations:** Framer Motion fade-in-up effects

## Technical Stack
- **Frontend:** React 19, React Router, Tailwind CSS, Shadcn/UI, Framer Motion
- **Backend:** FastAPI, Motor (async MongoDB)
- **Database:** MongoDB
- **AI Integration:** OpenAI GPT-5.2 via Emergent LLM Key

---

## What's Been Implemented (February 2026)

### Phase 1 - Initial Build (DONE)
- Basic single-page website structure
- Hero section with CTAs
- Career tracks overview
- Contact form

### Phase 2 - Multi-Page Architecture (DONE)
- Converted to multi-page SPA with React Router
- Pages: Home, About, Founder's Desk, Programs, Events, Hire From Us, Join Team, Franchise, Verify Certificate, Contact, Admin
- Basic mega menu navigation

### Phase 3 - Dynamic Content & AI (DONE - Feb 22, 2026)

#### Frontend Features
- ✅ **Programs Mega Menu** - 4 categories with icons and duration badges:
  - Career Tracks (Foundation, Design, Networking, Software Dev)
  - Short Term Programs
  - Skill Development
  - Corporate Training
- ✅ **Student Reviews Slider** - Auto-scrolling testimonials carousel
- ✅ **Latest Events Section** - Shows up to 6 upcoming events on homepage
- ✅ **AI Skills Guider Chatbot** - Floating chat widget with AI career counseling
- ✅ **Admin Dashboard** - Full CMS for managing:
  - Events (Create, View, Delete)
  - Student Reviews (Create, View, Delete)
  - Programs (Create with categories, View, Delete)
  - Job Openings (Create, View, Delete)
  - Contact Enquiries (View)
- ✅ **Poppins Font** - Applied throughout the website
- ✅ **Grey Color #ebebeb** - Used for sections and accents

#### Backend APIs
- ✅ `GET/POST/PUT/DELETE /api/events` - Event management
- ✅ `GET/POST/PUT/DELETE /api/reviews` - Student review management
- ✅ `GET/POST/PUT/DELETE /api/programs` - Program/track management with categories
- ✅ `GET/POST/PUT/DELETE /api/jobs` - Job openings management
- ✅ `POST /api/chat` - AI chatbot endpoint (OpenAI via Emergent LLM Key)
- ✅ `POST /api/contact` - Contact form submissions
- ✅ `GET /api/contact` - View all enquiries
- ✅ `POST /api/verify-certificate` - Certificate verification
- ✅ `POST /api/hire-request` - Hire from us requests
- ✅ `POST /api/applications` - Job applications

### Database Collections
- `events` - title, description, event_date, event_time, location, image_url, is_active
- `reviews` - student_name, course, review_text, photo_url, rating, is_active
- `programs` - title, slug, description, category, duration, outcomes, suitable_for, certifications, modules, icon
- `job_openings` - title, department, location, type, description, requirements, is_active
- `contact_enquiries` - name, email, phone, enquiry_type, message, status
- `hire_requests` - company_name, contact_person, email, phone, requirements
- `job_applications` - job_id, name, email, phone, resume_url, cover_letter
- `certificates` - certificate_id, student_name, course_name, issue_date

---

## Test Results (Feb 22, 2026)
- ✅ Backend: 100% (18/18 tests passed)
- ✅ Frontend: 100% (all components verified)
- Test report: `/app/test_reports/iteration_2.json`

---

## Backlog

### P0 (Critical) - COMPLETED
- [x] Complete website structure
- [x] Contact form functionality
- [x] Multi-page architecture
- [x] Admin dashboard for content management
- [x] AI chatbot integration
- [x] Dynamic reviews and events on homepage

### P1 (High Priority) - PENDING
- [ ] Admin authentication/login protection
- [ ] Email notifications for new enquiries (Resend/SendGrid)
- [ ] SEO meta tags and Open Graph for all pages

### P2 (Medium Priority) - PENDING
- [ ] Image upload for reviews and events (instead of URL)
- [ ] Edit functionality for admin items (currently only create/delete)
- [ ] Blog/News section
- [ ] Student success stories gallery page

### P3 (Nice to Have) - FUTURE
- [ ] Multi-language support (Hindi)
- [ ] Analytics integration (Google Analytics)
- [ ] Student portal login
- [ ] Certificate management in admin (add certificates to DB)

---

## File Structure
```
/app/
├── backend/
│   ├── .env (MONGO_URL, DB_NAME, EMERGENT_LLM_KEY)
│   ├── requirements.txt
│   └── server.py (FastAPI with all endpoints)
└── frontend/
    ├── .env (REACT_APP_BACKEND_URL)
    ├── src/
    │   ├── App.js (Router setup)
    │   ├── App.css (Custom styles)
    │   ├── index.css (Tailwind + Poppins font)
    │   ├── components/
    │   │   ├── Chatbot.jsx
    │   │   ├── Header.jsx (with mega menu)
    │   │   └── Footer.jsx
    │   └── pages/
    │       ├── HomePage.jsx (reviews slider, events)
    │       ├── AdminPage.jsx (CMS dashboard)
    │       ├── ProgramsPage.jsx
    │       ├── ProgramDetailPage.jsx
    │       └── ... (other pages)
```

---

## Known Behaviors
- Homepage displays sample/fallback data when database collections are empty
- Admin page has no authentication (intentional for MVP)
- Chatbot requires Emergent LLM Key with sufficient balance
