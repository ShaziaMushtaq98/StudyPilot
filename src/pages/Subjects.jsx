import { Link } from "react-router-dom";
import { FiBook, FiArrowRight } from "react-icons/fi";
import { LuCalculator, LuFlaskConical } from "react-icons/lu";
import AppShell from "../components/AppShell";
import ProgressRing from "../components/ProgressRing";
import { Card, Chip, PageTitle } from "../components/ui";
import { subjects } from "../data/mockData";

export default function Subjects() {
  return (
    <AppShell>
      <PageTitle chip={<Chip Icon={FiBook}>My books</Chip>} title="Subjects" sub="Open a textbook to see your chapters and current mastery." />
      <div className="grid gap-6 md:grid-cols-2">
        {subjects.map((s) => {
          const Icon = s.id === "maths" ? LuCalculator : LuFlaskConical;
          return (
            <Card key={s.id} className={`flex min-h-[430px] flex-col justify-between p-9 ${s.card}`}>
              <div className="flex items-start justify-between">
                <span className={`grid h-16 w-16 place-items-center rounded-2xl text-2xl ${s.chip}`}><Icon /></span>
                <ProgressRing value={s.mastery} />
              </div>
              <div>
                <p className="font-semibold text-slate-500">{s.captain}</p>
                <h2 className="font-display text-4xl font-bold">{s.name}</h2>
                <p className="mt-4 font-bold">{s.book}</p>
                <p className="text-sm text-slate-400">{s.chapters.length} chapters</p>
                <Link to={`/subjects/${s.id}`} className="mt-5 inline-flex items-center gap-2 font-bold text-[#4f8bff]">Open subject <FiArrowRight /></Link>
              </div>
            </Card>
          );
        })}
      </div>
      <p className="mt-8 text-center text-sm text-slate-400">Books are managed by your parent.</p>
    </AppShell>
  );
}