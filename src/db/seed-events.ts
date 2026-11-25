import { config } from "dotenv";
config({path:".env.local"});
config();
import { and, eq } from "drizzle-orm";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { posts, users } from "./schema";

if (!process.env.DATABASE_URL) throw new Error("Set DATABASE_URL before seeding event examples.");

const db = drizzle(neon(process.env.DATABASE_URL), { schema: { posts, users } });
const examples = [
  {
    title: "Yangon Student Buildathon",
    category: "hackathon" as const,
    summary: "Form a team, build a useful prototype, and present it to local mentors in a weekend challenge for student makers.",
    organization: "Mee-Eain",
    locationOrLink: "Yangon Innovation Hub",
    eventDate: "2026-12-19",
    deadline: "2026-12-12",
  },
  {
    title: "From Idea to First Prototype",
    category: "webinar" as const,
    summary: "A practical online session on testing an idea, choosing a small first feature, and sharing a prototype for feedback.",
    organization: "Mee-Eain",
    locationOrLink: "Online · Zoom",
    eventDate: "2026-12-10",
    deadline: null,
  },
  {
    title: "Campus Innovation and Careers Day",
    category: "event" as const,
    summary: "Meet student clubs and early-career teams, join short skills workshops, and learn about upcoming opportunities.",
    organization: "Yangon Student Network",
    locationOrLink: "University of Yangon",
    eventDate: "2026-12-22",
    deadline: null,
  },
  {
    title: "Climate Solutions Student Hackathon",
    category: "hackathon" as const,
    summary: "Build a simple digital or community solution for a local climate challenge and get feedback from volunteer mentors.",
    organization: "Green Steps Myanmar",
    locationOrLink: "Yangon · In person",
    eventDate: "2027-01-16",
    deadline: "2027-01-08",
  },
  {
    title: "Open Source Weekend Challenge",
    category: "hackathon" as const,
    summary: "Join beginners and experienced contributors to create small tools that make learning resources easier to find.",
    organization: "Open Source Community Myanmar",
    locationOrLink: "Online · GitHub",
    eventDate: "2027-02-06",
    deadline: "2027-01-30",
  },
  {
    title: "Accessible Campus App Hackathon",
    category: "hackathon" as const,
    summary: "Prototype an accessible campus service with a mixed-discipline team and test it with student volunteers.",
    organization: "Inclusive Tech Yangon",
    locationOrLink: "Yangon Technological University",
    eventDate: "2027-02-20",
    deadline: "2027-02-12",
  },
  {
    title: "Build for Good: Community Data Sprint",
    category: "hackathon" as const,
    summary: "Turn an open community dataset into a clear story, lightweight dashboard, or useful public resource.",
    organization: "Data for Development Myanmar",
    locationOrLink: "Online · Teams of 2–4",
    eventDate: "2027-03-06",
    deadline: "2027-02-26",
  },
  {
    title: "Designing a Strong Student Portfolio",
    category: "webinar" as const,
    summary: "Learn how to choose projects, explain your decisions, and present your work clearly to early-career teams.",
    organization: "Design For Change",
    locationOrLink: "Online · Zoom",
    eventDate: "2026-12-15",
    deadline: null,
  },
  {
    title: "A Friendly Introduction to Data Analytics",
    category: "webinar" as const,
    summary: "Explore a beginner workflow for asking useful questions, cleaning a small dataset, and sharing a finding.",
    organization: "Myanmar Data Community",
    locationOrLink: "Online · Google Meet",
    eventDate: "2027-01-12",
    deadline: null,
  },
  {
    title: "Career Q&A: Your First Product Role",
    category: "webinar" as const,
    summary: "Hear how product teams work and bring questions about internships, entry-level roles, and useful skills.",
    organization: "Product People Yangon",
    locationOrLink: "Online · Zoom",
    eventDate: "2027-01-27",
    deadline: null,
  },
  {
    title: "Writing for the Web Workshop",
    category: "webinar" as const,
    summary: "Practice making web content easier to scan, understand, and use across phones and different reading needs.",
    organization: "Plain Language Lab",
    locationOrLink: "Online · Zoom",
    eventDate: "2027-02-10",
    deadline: null,
  },
  {
    title: "Getting Started with Cloud Computing",
    category: "webinar" as const,
    summary: "A clear overview of cloud basics, common services, and a first safe project for students to try.",
    organization: "Cloud Native Yangon",
    locationOrLink: "Online · Live session",
    eventDate: "2027-02-24",
    deadline: null,
  },
  {
    title: "Yangon Creative Careers Fair",
    category: "event" as const,
    summary: "Meet local creative studios, see student work, and join short conversations about design and media careers.",
    organization: "Creative Yangon Network",
    locationOrLink: "The Secretariat, Yangon",
    eventDate: "2026-12-28",
    deadline: null,
  },
  {
    title: "University Robotics Open Day",
    category: "event" as const,
    summary: "Watch student demonstrations, tour the robotics lab, and learn how to join a hands-on engineering project.",
    organization: "Yangon Technological University",
    locationOrLink: "Yangon Technological University",
    eventDate: "2027-01-09",
    deadline: null,
  },
  {
    title: "Digital Skills Community Expo",
    category: "event" as const,
    summary: "Explore practical digital skills booths, student projects, and community learning opportunities in one afternoon.",
    organization: "Digital Opportunity Trust Myanmar",
    locationOrLink: "Yangon · In person",
    eventDate: "2027-01-30",
    deadline: null,
  },
  {
    title: "Women in Technology Gathering",
    category: "event" as const,
    summary: "Spend an afternoon meeting women studying and working in technology, with informal talks and peer networking.",
    organization: "Women in Tech Myanmar",
    locationOrLink: "Yangon · Registration required",
    eventDate: "2027-02-13",
    deadline: "2027-02-08",
  },
  {
    title: "Student Research Showcase",
    category: "event" as const,
    summary: "See short presentations of student research and meet peers exploring science, technology, and social impact.",
    organization: "University Research Circle",
    locationOrLink: "University of Yangon",
    eventDate: "2027-03-06",
    deadline: null,
  },
  {
    title: "Yangon Product Design Meetup",
    category: "meetup" as const,
    summary: "Share a current design challenge, exchange practical feedback, and meet people learning product design.",
    organization: "Product People Yangon",
    locationOrLink: "Yangon · Downtown",
    eventDate: "2026-12-18",
    deadline: null,
  },
  {
    title: "Frontend Learners Study Circle",
    category: "meetup" as const,
    summary: "Bring a small frontend question or project and work alongside other learners in a relaxed study session.",
    organization: "Frontend Myanmar",
    locationOrLink: "Online · Discord",
    eventDate: "2027-01-15",
    deadline: null,
  },
  {
    title: "UX Research Practice Night",
    category: "meetup" as const,
    summary: "Try a short interview exercise and discuss how to turn observations into useful product insights.",
    organization: "UX Myanmar Community",
    locationOrLink: "Yangon · Sanchaung",
    eventDate: "2027-02-05",
    deadline: null,
  },
  {
    title: "Python Beginners Project Meetup",
    category: "meetup" as const,
    summary: "Work on a small Python project with peer support; new learners are welcome and no presentation is required.",
    organization: "Python Myanmar",
    locationOrLink: "Online · Jitsi",
    eventDate: "2027-02-26",
    deadline: null,
  },
  {
    title: "Junior Web Developer Internship",
    category: "internship" as const,
    summary: "Support a small team building accessible web pages while learning code review, testing, and teamwork.",
    organization: "Thitsa Labs",
    locationOrLink: "Hybrid · Yangon",
    eventDate: null,
    deadline: "2027-01-05",
  },
  {
    title: "Community Research Assistant Internship",
    category: "internship" as const,
    summary: "Help organize interviews and summarize community feedback for education and youth development projects.",
    organization: "Open Door Learning",
    locationOrLink: "Yangon · Part time",
    eventDate: null,
    deadline: "2027-01-20",
  },
  {
    title: "Digital Marketing Intern",
    category: "internship" as const,
    summary: "Help plan social content, review campaign results, and learn the basics of ethical digital marketing.",
    organization: "Mingalar Creative Studio",
    locationOrLink: "Yangon · Hybrid",
    eventDate: null,
    deadline: "2027-02-15",
  },
  {
    title: "Junior Data Analyst Internship",
    category: "internship" as const,
    summary: "Prepare reports and simple visualizations while learning how a small team uses data to guide decisions.",
    organization: "Riverstone Insights",
    locationOrLink: "Yangon · Hybrid",
    eventDate: null,
    deadline: "2027-02-28",
  },
  {
    title: "Learning Content Design Internship",
    category: "internship" as const,
    summary: "Work with educators to shape short digital lessons, review learner feedback, and improve learning materials.",
    organization: "Mee-Eain",
    locationOrLink: "Remote · Myanmar",
    eventDate: null,
    deadline: "2027-03-15",
  },
  {
    title: "IT Support Trainee Internship",
    category: "internship" as const,
    summary: "Assist with day-to-day technology support and learn practical troubleshooting, documentation, and security habits.",
    organization: "Bright Path Services",
    locationOrLink: "Yangon · On site",
    eventDate: null,
    deadline: "2027-04-01",
  },
  {
    title: "Volunteer Tutor: Introductory Mathematics",
    category: "volunteer" as const,
    summary: "Spend one hour each week helping high-school learners build confidence with foundational mathematics.",
    organization: "Open Door Learning",
    locationOrLink: "Online or in person · Yangon",
    eventDate: null,
    deadline: "2027-01-08",
  },
  {
    title: "Volunteer Mentor for Student Developers",
    category: "volunteer" as const,
    summary: "Offer a monthly check-in to a student developer working on a first portfolio or open-source contribution.",
    organization: "Code for Myanmar",
    locationOrLink: "Online · Flexible",
    eventDate: null,
    deadline: "2027-01-22",
  },
  {
    title: "Community Translation Volunteers",
    category: "volunteer" as const,
    summary: "Help make selected digital learning materials easier to access by reviewing short Myanmar-language translations.",
    organization: "Digital Opportunity Trust Myanmar",
    locationOrLink: "Remote · Flexible hours",
    eventDate: null,
    deadline: "2027-02-05",
  },
  {
    title: "Weekend Library Learning Helper",
    category: "volunteer" as const,
    summary: "Help learners find resources and support friendly weekend study sessions at a neighborhood learning space.",
    organization: "Mingalar Community Library",
    locationOrLink: "Yangon · In person",
    eventDate: null,
    deadline: "2027-02-19",
  },
  {
    title: "Volunteer Event Crew for Student Workshops",
    category: "volunteer" as const,
    summary: "Welcome participants, help workshop facilitators, and make student learning events run smoothly.",
    organization: "Yangon Student Network",
    locationOrLink: "Yangon · Event days",
    eventDate: null,
    deadline: "2027-03-01",
  },
  {
    title: "Portfolio Review Volunteer",
    category: "volunteer" as const,
    summary: "Give a student constructive feedback on a portfolio draft during one short online review session.",
    organization: "Design For Change",
    locationOrLink: "Online · Flexible",
    eventDate: null,
    deadline: "2027-03-12",
  },
];

async function main() {
  const [owner] = await db.select({ id: users.id }).from(users).limit(1);
  if (!owner) throw new Error("Create an app user before adding event listings.");

  let inserted = 0;
  for (const example of examples) {
    const [existing] = await db.select({ id: posts.id }).from(posts).where(
      and(eq(posts.title, example.title), eq(posts.category, example.category)),
    ).limit(1);
    if (existing) continue;
    await db.insert(posts).values({ ...example, createdBy: owner.id, isPinned: false });
    inserted++;
  }
  console.log(`Added ${inserted} event examples; ${examples.length - inserted} already existed.`);
}

main().catch((error) => {
  console.error("Could not add event examples.", error instanceof Error ? error.message : "Unknown error");
  process.exitCode = 1;
});
