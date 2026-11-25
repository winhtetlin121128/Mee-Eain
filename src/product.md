Build a full-stack learning and student opportunity platform called **Mee-Eain** using **Next.js (App Router), TypeScript, Tailwind CSS, Neon Postgres (with Drizzle or Prisma ORM), and Neon Auth**.

### 1. Design System (Swiss-Editorial Minimalist)
- **Palette**: Off-white canvas (`#FAF9F6`), crisp white cards (`#FFFFFF`), deep ink typography (`#111111`), subtle `1px` borders (`#E4E4E0`), and Neon emerald (`#00C882`) accents for active states and primary CTAs.
- **Typography**: Clean geometric sans-serif (`Inter`) for UI/headings and monospace (`JetBrains Mono`) for metadata tags, dates, IDs, and streak counters.
- **Layout**: High-contrast, spacious grid layout, fully mobile-responsive, zero clutter or generic gradients.

### 2. Authentication & Role-Based Access (Neon Auth)
- Integrate **Neon Auth** for Sign Up, Sign In, and Sign Out.
- Support two roles: `student` (default) and `admin`.
- During registration, collect: Full Name, Email, Password, University, Major, and Role (or provide a seed/toggle for testing an Admin account).
- Protect `/profile` for authenticated users and `/admin` strictly for users with the `admin` role.

### 3. Database Schema (Neon Postgres)
Create the following tables and relations:
- **`users`**: `id` (linked to Neon Auth ID), `name`, `email`, `role` (`student` | `admin`), `university`, `major`, `current_streak` (integer), `last_checkin_at` (timestamp), `checkin_history` (array of ISO dates), `created_at`.
- **`posts`**: `id`, `title`, `category` (`announcement` | `webinar` | `meetup` | `internship` | `volunteer`), `summary`, `organization`, `location_or_link`, `event_date`, `deadline`, `is_pinned` (boolean), `created_by` (FK to `users.id`), `created_at`.
- **`user_post_actions`**: `id`, `user_id`, `post_id`, `action_type` (`saved` | `applied`), `created_at`.

### 4. Pages & Core Features

#### A. Home Page (`/`)
- **Landing Hero**: Welcoming editorial headline, concise subtext, and live platform stats (active opportunities, upcoming events, community members).
- **Pinned Announcements Strip**: Compact horizontal banner/strip for urgent or pinned announcements.
- **Opportunity & Learning Hub**:
  - Search bar + category filter tabs: `All`, `Announcement`, `Webinar`, `Meetup`, `Internship`, `Volunteer`.
  - Clean card grid showing category badge, title, organization, date/deadline, and `Save` / `Apply` buttons (persisted to the database for logged-in users).

#### B. Profile Page (`/profile`)
- **Account Overview**: Displays user name, email, Neon Auth ID, University, and Major, with an inline edit form to update University and Major.
- **14-Day Learning Streak Tracker**: Visual 14-day grid showing completed days, current streak count, and a **"Check In Today"** button that logs today's check-in, increments the streak, and prevents duplicate check-ins on the same day.
- **My Saved & Applied**: Tabbed list of posts the user has saved or applied to, with an option to remove/withdraw.

#### C. Admin Dashboard (`/admin`)
- **KPI Summary Row**: Total Users, Total Active Posts, Total Applications, and Pinned Announcements.
- **Publish New Post Form**: Create a new post across any of the 5 categories (with option to pin announcements) that immediately appears on the Home Page.
- **Manage Listings Table**: View all posts with category badges, dates, and inline Delete confirmation.
- **Registered Users Directory**: Table listing users with their name, email, university, role, and current streak.

### 5. Deliverables & Setup
- Include a database seed script (`prisma/seed.ts` or `src/db/seed.ts`) with realistic example data covering all 5 categories (Announcements, Webinars, Meetups, Internships, Volunteer calls) plus 1 demo Student and 1 demo Admin account.
- Provide a `.env.example` file with placeholders for `DATABASE_URL` and Neon Auth environment variables.
- Include clear setup commands in `README.md` (`npm install`, DB push/migrate, seed, and `npm run dev`).
