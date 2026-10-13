import { Link, useParams, Navigate } from "react-router-dom";
import { FiArrowLeft, FiPlay } from "react-icons/fi";
import { LuCalculator, LuFlaskConical } from "react-icons/lu";
import AppShell from "../components/AppShell";
import ProgressRing from "../components/ProgressRing";
import { Card } from "../components/ui";
import { subjects, levelOf } from "../data/mockData";

export default function SubjectDetail() {
  const { sid } = useParams();
  const s = subjects.find((x) => x.id === sid);
  if (!s) return <Navigate to="/subjects" replace />;
  const Icon = sid === "maths" ? LuCalculator : LuFlaskConical;

  return (
    <AppShell>
      <Link to="/subjects" className="inline-flex items-center gap-2 font-bold text-[#4f8bff]"><FiArrowLeft /> Back to subjects</Link>
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className={`grid h-16 w-16 place-items-center rounded-2xl text-2xl ${s.chip}`}><Icon /></span>
          <div><p className="font-semibold text-slate-500">{s.captain}</p><h1 className="font-display text-4xl font-bold">{s.book}</h1></div>
        </div>
        <ProgressRing value={s.mastery} label="MASTERY" />
      </div>

      <Card className="mt-8 p-9">
        <h2 className="font-display text-2xl font-bold">Chapters</h2>
        <p className="mb-4 text-slate-500">Choose any chapter for a short practice check.</p>
        {s.chapters.map((c) => {
          const lv = levelOf(c.mastery);
          return (
            <div key={c.n} className="flex flex-wrap items-center gap-4 border-t border-slate-100 py-5 first:border-0">
              <span className={`grid h-14 w-14 place-items-center rounded-2xl text-lg font-bold ${s.num}`}>{c.n}</span>
              <div className="flex-1"><p className="font-display text-xl font-bold">{c.title}</p><p className="text-sm text-slate-500">Chapter {c.n}</p></div>
              <span className={`rounded-full px-4 py-1.5 text-sm font-bold ${lv.bg} ${lv.text}`}>{c.mastery}% mastery</span>
              <Link to={`/practice/${sid}/${c.n}`} className="flex items-center gap-2 rounded-2xl bg-blue-50 px-6 py-3.5 font-bold text-[#4f8bff] hover:bg-blue-100">Practice this topic <FiPlay /></Link>
            </div>
          );
        })}
      </Card>
      <p className="mt-6 text-center text-sm text-slate-400">Books are managed by your parent.</p>
    </AppShell>
  );
}