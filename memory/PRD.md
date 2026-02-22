# ETI Educom® - Official Website PRD

## Project Overview
**Brand Name:** ETI Educom®  
**Legal Entity:** ETI Learning Systems Private Limited  
**Established:** 2017  
**Positioning:** The Computer Career School  
**Certification Status:** Certiport Authorized Testing Center (CATC)

## Technical Stack
- **Frontend:** React 19, React Router, Tailwind CSS, Shadcn/UI, Framer Motion
- **Backend:** FastAPI, Motor (async MongoDB)
- **Database:** MongoDB
- **AI Integration:** OpenAI GPT-5.2 via Emergent LLM Key

---

## What's Been Implemented

### Phase 1-3 - Foundation (DONE)
- Multi-page SPA architecture
- Programs Mega Menu with categories
- Student Reviews Slider, Events Section
- AI Skills Guider Chatbot
- Admin Dashboard for Events, Reviews, Programs, Jobs

### Phase 4 - Content Management (DONE - Feb 22, 2026)
- Blogs, FAQ, Privacy Policy pages
- Franchise enquiry form (comprehensive)
- Free Counselling landing page
- SEO management in admin
- Removed Emergent badge
- Removed ETI EDUCOM text from navbar

### Phase 5 - Current Implementation (DONE - Feb 22, 2026)

#### Admin Login Protection
- ✅ Simple password-based authentication
- ✅ Password: `etieducom@admin2025` (stored in backend/.env)
- ✅ Token-based session management
- ✅ Logout functionality

#### Summer Training Landing Page (`/summer-training`)
- ✅ Standalone page (no header/footer)
- ✅ Hero section with registration form
- ✅ 14 Trending Programs:
  - Python Programming
  - Web Development
  - Digital Marketing
  - SEO & SEM
  - Ethical Hacking
  - Networking (CCNA)
  - AutoCAD
  - Graphic Design
  - Data Science
  - Cloud Computing
  - MS Office Advanced
  - App Development
  - AI & Machine Learning
  - Cybersecurity
- ✅ Duration options: 6 Weeks / 6 Months

#### Homepage Quick Enquiry Form
- ✅ Replaced hero image with Quick Enquiry form
- ✅ Fields: Name, Phone, Interest dropdown
- ✅ Trust badges (2000+ Students, Since 2017)

#### Social Media Links (Footer)
- ✅ Facebook: https://www.facebook.com/etieducom
- ✅ Instagram: https://www.instagram.com/etieducom/
- ✅ LinkedIn: https://www.linkedin.com/company/etieducom
- ✅ YouTube: https://www.youtube.com/@ETIEducomofficial

#### Admin Panel Extensions
- ✅ Summer Training Leads tab
- ✅ Quick Enquiries tab (homepage leads)

---

## API Endpoints

### Authentication
- `POST /api/admin/login` - Admin login
- `POST /api/admin/verify` - Verify admin token

### Lead Management
- `POST/GET/DELETE /api/summer-training-leads` - Summer training leads
- `POST/GET/DELETE /api/quick-enquiry` - Homepage quick enquiries
- `POST/GET/DELETE /api/counselling-leads` - Free counselling leads
- `POST/GET/DELETE /api/franchise-enquiry` - Franchise enquiries

### Content Management
- `GET/POST/DELETE /api/blogs` - Blog posts
- `GET/POST/DELETE /api/faqs` - FAQs
- `GET/POST /api/seo` - SEO settings
- `GET/POST/DELETE /api/events` - Events
- `GET/POST/DELETE /api/reviews` - Student reviews
- `GET/POST/DELETE /api/programs` - Programs
- `GET/POST/DELETE /api/jobs` - Job openings
- `GET /api/contact` - Contact enquiries

---

## Database Collections
- `summer_training_leads` - name, email, phone, program_interest, duration, status
- `quick_enquiries` - name, phone, email, interest, source, status
- `counselling_leads` - name, phone, education, preferred_track
- `franchise_enquiries` - name, email, phone, city, location, experience, etc.
- `blogs` - title, slug, excerpt, content, featured_image, category, tags
- `faqs` - question, answer, category, order
- `seo_settings` - page_slug, meta_title, meta_description
- `events`, `reviews`, `programs`, `job_openings`, `contact_enquiries`

---

## Test Results
- ✅ Phase 3: 100% (21/21 backend, frontend verified)
- ✅ Phase 4: 100% (21/21 backend, frontend verified)
- ✅ Phase 5: 100% (18/18 backend, frontend verified)
- Reports: `/app/test_reports/iteration_2.json`, `iteration_3.json`, `iteration_4.json`

---

## Admin Credentials
**Password:** `etieducom@admin2025`

---

## Backlog

### P1 (High Priority)
- [ ] Email notifications for new leads (Resend/SendGrid)
- [ ] Edit functionality for admin items (currently create/delete only)
- [ ] Image upload for content (instead of URLs)

### P2 (Medium Priority)
- [ ] Blog comments/engagement
- [ ] Student success stories gallery
- [ ] Analytics integration (Google Analytics)

### P3 (Future)
- [ ] Multi-language support (Hindi)
- [ ] Student portal login
- [ ] Certificate management in admin

---

## File Structure
```
/app/
├── backend/
│   ├── .env (ADMIN_PASSWORD added)
│   └── server.py (new auth + lead APIs)
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── HomePage.jsx (Quick Enquiry form)
    │   │   ├── SummerTrainingPage.jsx (NEW)
    │   │   ├── AdminPage.jsx (login + new tabs)
    │   │   └── ...
    │   └── components/
    │       └── Footer.jsx (updated social links)
```
