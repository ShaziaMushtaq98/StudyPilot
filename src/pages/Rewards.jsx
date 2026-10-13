import { FiGift, FiFeather, FiLock } from "react-icons/fi";
import { FaFire, FaRocket, FaFlask, FaCrown, FaStar, FaTrophy } from "react-icons/fa";
import { PiAirplaneTiltFill } from "react-icons/pi";
import AppShell from "../components/AppShell";
import { Card, Chip, PageTitle } from "../components/ui";
import { getXp, rankOf, ranks } from "../utils/store";

const badges = [
  { name: "Streak Starter", desc: "Study 7 days in a row", from: "#f6d37a", to: "#d99a2b", Icon: FaFire, got: true },
  { name: "Chapter Champion", desc: "Master a chapter above 80%", from: "#7fe0b8", to: "#2fb27f", Icon: FiFeather, got: true },
  { name: "Rocket Learner", desc: "Finish 20 tasks", from: "#9aa4ff", to: "#6c63ff", Icon: FaRocket, got: true },
  { name: "Science Explorer", desc: "Practise 5 science chapters", from: "#7fd0f0", to: "#2f9bd0", Icon: FaFlask, got: false },
  { name: "Perfect Score", desc: "Score 3 out of 3 on a check", from: "#f6a6c1", to: "#d6527f", Icon: FaStar, got: false },
  { name: "Captain's Crew", desc: "Reach the Captain rank", from: "#f6d37a", to: "#d99a2b", Icon: FaCrown, got: false },
];

const Medal = ({ from, to, Icon, got }) => (
  <div className={`relative mx-auto h-40 w-32 ${got ? "" : "opacity-40 grayscale"}`}>
    <div className="absolute bottom-0 left-6 h-16 w-7 rounded-b-xl" style={{ background: `linear-gradient(${from},${to})` }} />
    <div className="absolute bottom-0 right-6 h-16 w-7 rounded-b-xl" style={{ background: `linear-gradient(${from},${to})` }} />
    <div className="absolute left-1/2 top-0 grid h-28 w-28 -translate-x-1/2 place-items-center rounded-full text-4xl text-white shadow-lg ring-4 ring-white/50"
      style={{ background: `linear-gradient(135deg,${from},${to})` }}>
      {got ? <Icon /> : <FiLock />}
    </div>
  </div>
);

export default function Rewards() {
  const xp = getXp();
  const { cur, next } = rankOf(xp);
  const pct = Math.min(100, (xp / 5000) * 100);

  return (
    <AppShell>
      <PageTitle chip={<Chip Icon={FaTrophy} className="bg-amber-50 text-amber-700">My achievements</Chip>} title="Rewards hangar" sub="Keep your streak flying and unlock new pilot badges." />

      <Card className="flex flex-wrap items-center gap-10 p-9">
        <div className="relative">
          <div className="grid h-36 w-36 place-items-center rounded-full bg-gradient-to-br from-[#4f8bff] to-[#8b5cf6] text-center text-white shadow-xl shadow-blue-200 ring-4 ring-blue-100">
            <div><PiAirplaneTiltFill className="mx-auto text-4xl" /><span className="font-display font-bold">{cur}</span></div>
          </div>
          <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-white px-3 py-1 text-[10px] font-bold tracking-wider text-[#4f8bff] shadow">CURRENT RANK</span>
        </div>
        <div className="min-w-[260px] flex-1">
          <h2 className="font-display text-4xl font-bold">{cur}</h2>
          <p className="mt-1 text-slate-500">{xp.toLocaleString()} XP total {next && <>• {(next[1] - xp).toLocaleString()} XP to {next[0]}</>}</p>
          <div className="mt-5 h-3 rounded-full bg-slate-100"><div className="h-3 rounded-full bg-gradient-to-r from-[#4f8bff] to-[#8b5cf6]" style={{ width: `${pct}%` }} /></div>
          <div className="mt-3 flex justify-between text-sm font-bold">
            {["Cadet", "Pilot", "Senior Pilot", "Captain"].map((r, i) => <span key={r} className={i < 2 ? "text-[#4f8bff]" : "text-slate-400"}>{r}</span>)}
          </div>
        </div>
      </Card>

      <Card className="mt-6 p-9">
        <h2 className="font-display text-2xl font-bold">Badge shelf</h2>
        <p className="mb-6 text-slate-500">{xp.toLocaleString()} total XP • {cur}</p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {badges.map((b) => (
            <div key={b.name} className="rounded-3xl border border-slate-100 p-6 text-center">
              <Medal {...b} />
              <p className="font-display mt-3 text-lg font-bold">{b.name}</p>
              <p className="text-sm text-slate-500">{b.desc}</p>
              <p className={`mt-2 text-xs font-bold ${b.got ? "text-emerald-500" : "text-slate-400"}`}>{b.got ? "Unlocked" : "Locked"}</p>
            </div>
          ))}
        </div>
      </Card>
    </AppShell>
  );
}