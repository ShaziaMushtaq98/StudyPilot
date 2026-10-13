import { FiCheck, FiTrendingUp, FiClock } from "react-icons/fi";
import AppShell from "../components/AppShell";
import Calendar from "../components/Calendar";
import { Card, Bar } from "../components/ui";
import { subjects, levelOf, weekStats } from "../data/mockData";

export default function Progress() {
  const topics = subjects.flatMap((s) => s.chapters.map((c) => ({ ...c, subject: s.name })));
  const stats = [
    { Icon: FiCheck, tone: "bg-blue-50 text-[#4f8bff]", v: weekStats.tasks, t: "Tasks done", s: "this week" },
    { Icon: FiTrendingUp, tone: "bg-emerald-50 text-emerald-500", v: `${weekStats.score}%`, t: "Average score", s: "up from last week" },
    { Icon: FiClock, tone: "bg-amber-50 text-amber-500", v: weekStats.minutes, t: "Minutes studied", s: "focused minutes" },
  ];
  return (
    <AppShell>
      <div className="grid gap-5 md:grid-cols-3">
        {stats.map(({ Icon, tone, v, t, s }) => (
          <Card key={t} className="p-7">
            <div className="flex justify-between"><span className={`grid h-14 w-14 place-items-center rounded-2xl text-xl ${tone}`}><Icon /></span><span className="text-xs font-bold tracking-widest text-slate-400">THIS WEEK</span></div>
            <div className="font-display mt-5 text-5xl font-bold">{v}</div>
            <p className="mt-1 font-bold">{t}</p><p className="text-sm text-slate-400">{s}</p>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Card className="p-8">
          <h2 className="font-display text-2xl font-bold">Topic mastery</h2>
          <p className="mb-5 text-slate-500">Your current understanding across both subjects</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {topics.map((t) => {
              const lv = levelOf(t.mastery);
              return (
                <div key={t.title} className={`rounded-3xl p-5 ${lv.bg}`}>
                  <div className="flex justify-between">
                    <div><p className="font-display text-lg font-bold">{t.title}</p><p className="text-sm text-slate-500">{t.subject}</p></div>
                    <span className={`font-display text-2xl font-bold ${lv.text}`}>{t.mastery}%</span>
                  </div>
                  <div className="my-3"><Bar value={t.mastery} color={lv.bar} /></div>
                  <p className={`text-sm font-bold ${lv.text}`}>{lv.label}</p>
                </div>
              );
            })}
          </div>
        </Card>
        <Card className="p-7"><Calendar /></Card>
      </div>
    </AppShell>
  );
}