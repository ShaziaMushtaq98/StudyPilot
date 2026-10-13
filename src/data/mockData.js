export const student = { name: "Ayesha Khan", first: "Ayesha", cls: "Class 5", initials: "AK", streak: 9 };

export const subjects = [
  { id: "maths", name: "Maths", captain: "Maths Captain", book: "Class 5 Mathematics", mastery: 67,
    card: "bg-[#f5f4ff]", chip: "bg-[#ece9ff] text-indigo-500", num: "bg-[#ece9ff] text-indigo-500",
    chapters: [
      { n: 1, title: "Numbers", mastery: 88 }, { n: 2, title: "Fractions", mastery: 62 },
      { n: 3, title: "Decimals", mastery: 78 }, { n: 4, title: "Algebra Basics", mastery: 41 },
    ] },
  { id: "science", name: "Science", captain: "Science Captain", book: "Class 5 General Science", mastery: 68,
    card: "bg-[#f0fbf6]", chip: "bg-emerald-50 text-emerald-500", num: "bg-emerald-50 text-emerald-600",
    chapters: [
      { n: 1, title: "Plants", mastery: 85 }, { n: 2, title: "Human Body", mastery: 70 },
      { n: 3, title: "Forces and Motion", mastery: 48 },
    ] },
];

export const levelOf = (m) =>
  m >= 80 ? { label: "Strong", bar: "bg-emerald-400", text: "text-emerald-600", bg: "bg-emerald-50" }
  : m >= 50 ? { label: "Growing", bar: "bg-amber-400", text: "text-amber-700", bg: "bg-amber-50" }
  : { label: "Needs practice", bar: "bg-rose-400", text: "text-rose-500", bg: "bg-rose-50" };

export const weekStats = { tasks: 25, score: 84, minutes: 373 };
export const weekMinutes = [["M", 45], ["T", 60], ["W", 30], ["T", 55], ["F", 70], ["S", 50], ["S", 63]];

export const extracted = [
  { id: 1, sid: "maths", ch: 4, subject: "Maths", title: "Algebra Basics practice", mins: 15 },
  { id: 2, sid: "science", ch: 3, subject: "Science", title: "Forces and Motion worksheet", mins: 20 },
  { id: 3, sid: "maths", ch: 2, subject: "Maths", title: "Fractions Exercise 2.3", mins: 20 },
];

export const quizBank = {
  maths: [
    { q: "What is 3/4 + 1/4?", o: ["1", "4/8", "3/16"], a: 0 },
    { q: "Which number is the largest?", o: ["0.5", "0.75", "0.09"], a: 1 },
    { q: "Solve x + 5 = 12. What is x?", o: ["6", "7", "17"], a: 1 },
  ],
  science: [
    { q: "Which part of a plant absorbs water?", o: ["Roots", "Leaves", "Flower"], a: 0 },
    { q: "Which organ pumps blood around the body?", o: ["Lungs", "Heart", "Stomach"], a: 1 },
    { q: "A push or a pull is called a…", o: ["Force", "Energy", "Heat"], a: 0 },
  ],
};

export const notifications = {
  student: ["Skye is ready to scan today's diary", "Fractions is growing. Try a practice check", "You're 760 XP from Senior Pilot"],
  parent: ["Algebra Basics is below 50%", "Ayesha finished 25 tasks this week", "Ayesha reached a 9-day streak"],
};

export const activity = [
  { t: "Today, 16:20", text: "Practised Fractions · scored 2/3", tag: "Maths" },
  { t: "Today, 15:05", text: "Scanned diary · 3 tasks confirmed", tag: "Diary" },
  { t: "Yesterday, 18:40", text: "Completed Human Body check · 70%", tag: "Science" },
  { t: "Yesterday, 17:10", text: "Earned the Rocket Learner badge", tag: "Reward" },
  { t: "Sun, 19:00", text: "Practised Algebra Basics · scored 1/3", tag: "Maths" },
  { t: "Sat, 16:30", text: "Completed Plants check · 85%", tag: "Science" },
];