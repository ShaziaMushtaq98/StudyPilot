import { motion } from "framer-motion";
import { FiCheck, FiTrendingUp, FiClock, FiAlertCircle, FiHeart } from "react-icons/fi";
import { FaFire } from "react-icons/fa";
import AppShell from "../components/AppShell";
import ProgressRing from "../components/ProgressRing";
import { Card, Bar, Chip, PageTitle } from "../components/ui";
import { subjects, levelOf, weekStats, weekMinutes } from "../data/mockData";

export default function ParentOverview() {
  const topics = subjects.flatMap((s) => s.chapters.map((c) => ({ ...c, subject: s.name })));
  const attention = topics.filter((t) => t.mastery < 50);
  const max = Math.max(...weekMinutes.map(([, m]) => m));
  const stats = [
    { Icon: FiCheck, tone: "bg-blue-50 text-[#4f8bff]", v: weekStats.tasks, t: "Tasks done" },
    { Icon: FiTrendingUp, tone: "bg-emerald-50 text-emerald-500", v: `${weekStats.score}%`, t: "Average score" },
    { Icon: FiClock, tone: "bg-amber-50 text-amber-500", v: weekStats.minutes, t: "Minutes studied" },
    { Icon: FaFire, tone: "bg-rose-50 text-rose-400", v: "9", t: "Day streak" },
  ];

  return (
    <AppShell role="parent">
      <PageTitle chip={<Chip Icon={FiHeart}>Weekly report</Chip>} title="Ayesha's progress report" sub="Class 5 · 7 – 13 October 2026" />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ Icon, tone, v, t }) => (
          <Card key={t} className="p-6">
            <span className={`grid h-12 w-12 place-items-center rounded-2xl text-lg ${tone}`}><Icon /></span>
            <div className="font-display mt-4 text-4xl font-bold">{v}</div>
            <p className="text-sm font-semibold text-slate-500">{t}</p>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {subjects.map((s) => (
          <Card key={s.id} className={`flex items-center gap-6 p-7 ${s.card}`}>
            <ProgressRing value={s.mastery} />
            <div><p className="text-sm font-semibold text-slate-500">{s.captain}</p><h3 className="font-display text-2xl font-bold">{s.name}</h3><p className="text-sm text-slate-500">{s.book}</p></div>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Card className="p-8">
          <h2 className="font-display text-2xl font-bold">Study minutes this week</h2>
          <div className="mt-6 flex h-44 items-end gap-3">
            {weekMinutes.map(([d, m], i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1">
                <span className="text-[11px] font-bold text-slate-400">{m}</span>
                <motion.div initial={{ height: 0 }} animate={{ height: `${(m / max) * 120}px` }} transition={{ delay: i * 0.06, duration: 0.6 }} className="w-full max-w-[40px] rounded-t-xl bg-[#4f8bff]" />
                <span className="text-xs font-bold text-slate-400">{d}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="border-rose-100 bg-rose-50/40 p-8">
          <h2 className="font-display flex items-center gap-2 text-2xl font-bold"><FiAlertCircle className="text-rose-400" /> Needs attention</h2>
          <p className="mb-4 text-sm text-slate-500">Topics below 50% mastery</p>
          <div className="space-y-3">
            {attention.map((t) => (
              <div key={t.title} className="rounded-2xl bg-white p-4">
                <div className="flex justify-between"><b>{t.title}</b><b className="text-rose-500">{t.mastery}%</b></div>
                <p className="mb-2 text-xs text-slate-500">{t.subject}</p>
                <Bar value={t.mastery} color="bg-rose-400" />
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-500">Tip: ask Ayesha to teach you one example. Explaining builds understanding.</p>
        </Card>
      </div>

      <Card className="mt-6 p-8">
        <h2 className="font-display text-2xl font-bold">All topics</h2>
        <div className="mt-4 divide-y divide-slate-100">
          {topics.map((t) => {
            const lv = levelOf(t.mastery);
            return (
              <div key={t.title} className="flex items-center gap-4 py-3">
                <div className="w-44"><p className="font-bold">{t.title}</p><p className="text-xs text-slate-400">{t.subject}</p></div>
                <div className="flex-1"><Bar value={t.mastery} color={lv.bar} /></div>
                <span className={`w-32 text-right text-sm font-bold ${lv.text}`}>{t.mastery}% · {lv.label}</span>
              </div>
            );
          })}
        </div>
      </Card>
    </AppShell>
  );
}