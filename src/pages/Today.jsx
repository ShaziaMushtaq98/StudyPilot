import { useState } from "react";
import { Link } from "react-router-dom";
import { PiAirplaneTilt } from "react-icons/pi";
import { FiMaximize, FiCheck, FiPlay } from "react-icons/fi";
import { FaFire } from "react-icons/fa";
import AppShell from "../components/AppShell";
import Skye from "../components/Skye";
import { Card, PrimaryBtn } from "../components/ui";
import { getPlan, savePlan } from "../utils/store";
import { student } from "../data/mockData";

export default function Today() {
  const [plan, setPlan] = useState(getPlan());
  const h = new Date().getHours();
  const hello = h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
  const toggle = (id) => {
    const p = plan.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
    setPlan(p); savePlan(p);
  };
  const week = [["M", 12], ["T", 13], ["W", 14], ["T", 15], ["F", 16], ["S", 17], ["S", 18]];

  return (
    <AppShell>
      <div className="flex items-center gap-4">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-blue-50"><Skye size={34} outline="#4f8bff" /></span>
        <h1 className="font-display text-3xl font-bold">{hello}, {student.first}</h1>
      </div>

      <Card className="mt-6 flex flex-wrap items-center gap-6 p-8">
        <Skye size={110} outline="#6c63ff" />
        <div className="min-w-[220px] flex-1">
          <h2 className="font-display text-2xl font-bold">Turn your diary into a flight plan</h2>
          <p className="mt-1 text-slate-500">Show Skye today's homework and get a clear plan for tomorrow.</p>
        </div>
        <Link to="/scan"><PrimaryBtn><FiMaximize /> Scan diary</PrimaryBtn></Link>
      </Card>

      <Card className="mt-6 p-8">
        {plan.length === 0 ? (
          <div className="py-10 text-center">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-blue-50 text-2xl text-[#4f8bff]"><PiAirplaneTilt /></span>
            <h3 className="font-display mt-5 text-2xl font-bold">Tomorrow's flight plan is empty</h3>
            <p className="mx-auto mt-2 max-w-md text-slate-500">Your priority-ordered missions will appear here after you scan and confirm today's diary.</p>
          </div>
        ) : (
          <>
            <h3 className="font-display text-2xl font-bold">Tomorrow's flight plan</h3>
            <p className="mb-5 text-sm text-slate-500">Missions are ordered by priority. Weakest topics come first.</p>
            <div className="space-y-3">
              {plan.map((t, i) => (
                <div key={t.id} className={`flex items-center gap-4 rounded-2xl border p-4 ${t.done ? "border-emerald-100 bg-emerald-50/50" : "border-slate-100"}`}>
                  <button onClick={() => toggle(t.id)} className={`grid h-7 w-7 place-items-center rounded-lg border-2 ${t.done ? "border-emerald-400 bg-emerald-400 text-white" : "border-slate-300"}`}>{t.done && <FiCheck />}</button>
                  <div className="flex-1">
                    <p className={`font-bold ${t.done ? "text-slate-400 line-through" : ""}`}>{t.title}</p>
                    <p className="text-xs text-slate-500">{t.subject} · {t.mins} min · Priority {i + 1}</p>
                  </div>
                  <Link to={`/practice/${t.sid}/${t.ch}`} className="flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2 text-sm font-bold text-[#4f8bff]"><FiPlay /> Start</Link>
                </div>
              ))}
            </div>
          </>
        )}
      </Card>

      <Card className="mt-6 flex flex-wrap items-center justify-between gap-6 p-7">
        <div><h3 className="font-display text-xl font-bold">This week</h3><p className="text-sm text-slate-500">Keep your study rhythm steady</p></div>
        <div className="flex gap-3">
          {week.map(([d, n]) => (
            <div key={n} className="text-center">
              <div className="mb-1 text-[10px] font-bold text-slate-400">{d}</div>
              <span className={`grid h-11 w-11 place-items-center rounded-full text-sm font-semibold ${n === 12 ? "bg-amber-50 text-amber-500" : n === 13 ? "border-2 border-[#4f8bff]" : "bg-slate-50 text-slate-300"}`}>
                {n === 12 ? <FaFire /> : n}
              </span>
            </div>
          ))}
        </div>
        <Link to="/progress" className="text-sm font-bold text-[#4f8bff]">View full calendar</Link>
      </Card>
    </AppShell>
  );
}