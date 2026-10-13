import { useEffect, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { FiArrowLeft, FiCheckCircle, FiXCircle } from "react-icons/fi";
import AppShell from "../components/AppShell";
import Skye from "../components/Skye";
import { Card, Bar, PrimaryBtn } from "../components/ui";
import { subjects, quizBank } from "../data/mockData";
import { addXp } from "../utils/store";

export default function Practice() {
  const { sid, ch } = useParams();
  const s = subjects.find((x) => x.id === sid);
  const chapter = s?.chapters.find((c) => c.n === Number(ch));
  const qs = quizBank[sid] || [];
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const done = i >= qs.length;

  useEffect(() => { if (done && qs.length) addXp(score * 25); }, [done]); // eslint-disable-line

  if (!s || !chapter) return <Navigate to="/subjects" replace />;
  const q = qs[i];
  const pick = (idx) => { if (picked !== null) return; setPicked(idx); if (idx === q.a) setScore((x) => x + 1); };
  const next = () => { setPicked(null); setI(i + 1); };
  const retry = () => { setI(0); setScore(0); setPicked(null); };

  return (
    <AppShell>
      <Link to={`/subjects/${sid}`} className="inline-flex items-center gap-2 font-bold text-[#4f8bff]"><FiArrowLeft /> Back to chapters</Link>
      <h1 className="font-display mt-4 text-3xl font-bold">{chapter.title} · practice check</h1>
      <p className="mb-6 text-slate-500">{s.book} · Chapter {chapter.n}</p>

      <Card className="mx-auto max-w-[720px] p-9">
        {!done ? (
          <>
            <div className="mb-6 flex items-center gap-4"><Bar value={(i / qs.length) * 100} /><span className="text-sm font-bold text-slate-400">{i + 1}/{qs.length}</span></div>
            <h2 className="font-display text-2xl font-bold">{q.q}</h2>
            <div className="mt-6 space-y-3">
              {q.o.map((opt, idx) => {
                const state = picked === null ? "border-slate-200 hover:border-[#4f8bff]" : idx === q.a ? "border-emerald-400 bg-emerald-50" : idx === picked ? "border-rose-300 bg-rose-50" : "border-slate-100 opacity-60";
                return (
                  <button key={opt} onClick={() => pick(idx)} className={`flex w-full items-center justify-between rounded-2xl border-2 px-5 py-4 text-left font-semibold ${state}`}>
                    {opt}
                    {picked !== null && idx === q.a && <FiCheckCircle className="text-emerald-500" />}
                    {picked === idx && idx !== q.a && <FiXCircle className="text-rose-400" />}
                  </button>
                );
              })}
            </div>
            {picked !== null && <PrimaryBtn onClick={next} className="mt-6">{i + 1 === qs.length ? "See my result" : "Next question"}</PrimaryBtn>}
          </>
        ) : (
          <div className="text-center">
            <div className="flex justify-center"><Skye size={110} outline="#6c63ff" /></div>
            <h2 className="font-display mt-4 text-3xl font-bold">{score === qs.length ? "Perfect flight!" : "Nice flying!"}</h2>
            <p className="mt-2 text-slate-500">You scored {score} out of {qs.length} and earned <b className="text-[#4f8bff]">+{score * 25} XP</b>.</p>
            <div className="mt-6 flex justify-center gap-3">
              <PrimaryBtn onClick={retry}>Try again</PrimaryBtn>
              <Link to="/rewards" className="rounded-2xl bg-blue-50 px-6 py-3 text-sm font-bold text-[#4f8bff]">See rewards</Link>
            </div>
          </div>
        )}
      </Card>
    </AppShell>
  );
}