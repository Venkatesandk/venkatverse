/** Shared greetings — time of day + daily rotating messages (Asia/Kolkata). */

export type TimeOfDay = "morning" | "afternoon" | "evening" | "night";

export function getIndiaNow() {
  return new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );
}

export function getTimeOfDay(date = getIndiaNow()): TimeOfDay {
  const h = date.getHours();
  if (h >= 5 && h < 12) return "morning";
  if (h >= 12 && h < 17) return "afternoon";
  if (h >= 17 && h < 21) return "evening";
  return "night";
}

export function getTimeGreeting(date = getIndiaNow()) {
  switch (getTimeOfDay(date)) {
    case "morning":
      return "Good morning";
    case "afternoon":
      return "Good afternoon";
    case "evening":
      return "Good evening";
    default:
      return "Hello";
  }
}

/** One message per weekday — rotates daily */
export const WEEKDAY_GREETINGS = [
  {
    day: "Sunday",
    message: "Happy Sunday! Take a moment to explore my work — I’m glad you’re here.",
    short: "Happy Sunday — glad you stopped by.",
  },
  {
    day: "Monday",
    message: "Happy Monday! Fresh week, fresh ideas — let’s build something great together.",
    short: "Happy Monday — let’s build something great.",
  },
  {
    day: "Tuesday",
    message: "Happy Tuesday! Thanks for visiting Venkatverse. Feel free to check my projects.",
    short: "Happy Tuesday — thanks for visiting.",
  },
  {
    day: "Wednesday",
    message: "Happy mid-week! Midway through the week — explore my ERP & AI work anytime.",
    short: "Happy Wednesday — halfway there!",
  },
  {
    day: "Thursday",
    message: "Happy Thursday! Almost Friday — if you’re hiring, I’d love to connect.",
    short: "Happy Thursday — open to opportunities.",
  },
  {
    day: "Friday",
    message: "Happy Friday! End the week strong — download my resume or say hello.",
    short: "Happy Friday — let’s connect!",
  },
  {
    day: "Saturday",
    message: "Happy Saturday! Weekend vibes — browse my portfolio at your own pace.",
    short: "Happy Saturday — browse at your pace.",
  },
] as const;

export function getDailyGreeting(date = getIndiaNow()) {
  return WEEKDAY_GREETINGS[date.getDay()];
}

/** Extra rotating lines by day-of-year so content feels fresh */
const EXTRA_LINES = [
  "I build ERP systems, REST APIs, and AI-powered apps with PHP, Python & Next.js.",
  "From junior developer to Lead — 5+ years of shipping production software.",
  "Looking for a reliable Lead Application Developer? You’re in the right place.",
  "CodeIgniter, MySQL, AWS, Gemini — I turn business needs into working products.",
  "Thanks for dropping by. Explore projects, skills, and my live world map below.",
  "I lead teams, review code, and ship secure enterprise applications.",
  "Let’s turn your product idea into a production-ready application.",
];

export function getDailyExtraLine(date = getIndiaNow()) {
  const start = new Date(date.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((date.getTime() - start.getTime()) / 86_400_000);
  return EXTRA_LINES[dayOfYear % EXTRA_LINES.length];
}

export function getSiteGreetingBundle(date = getIndiaNow()) {
  const time = getTimeGreeting(date);
  const daily = getDailyGreeting(date);
  const extra = getDailyExtraLine(date);
  return {
    timeGreeting: time,
    timeOfDay: getTimeOfDay(date),
    weekday: daily.day,
    dailyMessage: daily.message,
    dailyShort: daily.short,
    extraLine: extra,
    headline: `${time} — ${daily.short}`,
  };
}

/** First-person intro script — sounds like Venkatesan speaking */
export function buildIntroScript(name = "Venkatesan D", role = "Lead Application Developer") {
  const time = getTimeGreeting();
  const daily = getDailyGreeting();
  return {
    timeGreeting: time,
    lines: [
      `${time}!`,
      `Hi, I’m ${name}.`,
      `I’m a ${role}.`,
      daily.message,
      "Come on — let me show you my screen: my projects, skills, and experience.",
    ],
    spoken: [
      `${time}!`,
      `Hi, I’m ${name}.`,
      `I’m a ${role} with over five years of experience building enterprise applications.`,
      daily.message,
      "Come on in — let me show you my screen. You’ll find my projects, skills, and career journey right here on Venkatverse.",
    ].join(" "),
  };
}
