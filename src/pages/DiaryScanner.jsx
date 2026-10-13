import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCamera, FiUpload, FiImage, FiCheck } from "react-icons/fi";
import { PiScan } from "react-icons/pi";
import AppShell from "../components/AppShell";
import Skye from "../components/Skye";
import { Card, Chip, PrimaryBtn, PageTitle } from "../components/ui";
import { extracted } from "../data/mockData";
import { savePlan } from "../utils/store";

export default function DiaryScanner() {
  const nav = useNavigate();
  const cam = useRef(), file = useRef();
  const [stage, setStage] = useState("idle");

  const start = () => { setStage("scanning"); setTimeout(() => setStage("review"), 1800); };
  const confirm = () => { savePlan(extracted.map((t) => ({ ...t, done: false }))); nav("/today"); };

  return (
    <AppShell>
      <div className="text-center">
        <Chip Icon={PiScan}>Diary scanner</Chip>
        <h1 className="font-display mt-5 text-4xl font-bold">Turn homework into a flight plan</h1>
        <p className="mt-2 text-lg text-slate-500">Upload one clear diary page and Skye will organize the rest.</p>
      </div>

      <Card className="mx-auto mt-8 max-w-[840px] border-2 border-dashed border-blue-200 p-10 text-center">
        <input ref={cam} type="file" accept="image/*" capture="environment" hidden onChange={start} />
        <input ref={file} type="file" accept="image/*" hidden onChange={start} />

        {stage === "idle" && (
          <>
            <div className="flex justify-center"><Skye size={95} outline="#6c63ff" /></div>
            <h2 className="font-display mt-3 text-2xl font-bold">Show me today's diary!</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">Drop a photo here, or use your camera. Make sure the writing is easy to see.</p>
            <div className="mt-6 flex justify-center gap-3">
              <PrimaryBtn onClick={() => cam.current.click()}><FiCamera /> Use camera</PrimaryBtn>
              <button onClick={() => file.current.click()} className="flex items-center gap-2 rounded-2xl bg-blue-50 px-6 py-3 text-sm font-bold text-[#4f8bff]"><FiUpload /> Upload photo</button>
            </div>
            <button onClick={start} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#4f8bff]"><FiImage /> Use sample diary image</button>
          </>
        )}

        {stage === "scanning" && (
          <div className="py-10">
            <motion.div animate={{ rotate: [0, 8, -8, 0] }} transition={{ duration: 1.2, repeat: Infinity }} className="flex justify-center"><Skye size={100} outline="#6c63ff" /></motion.div>
            <h2 className="font-display mt-4 text-2xl font-bold">Skye is reading your diary…</h2>
            <div className="mx-auto mt-5 h-2 max-w-xs overflow-hidden rounded-full bg-blue-50">
              <motion.div className="h-2 rounded-full bg-[#4f8bff]" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1.8 }} />
            </div>
          </div>
        )}

        {stage === "review" && (
          <div className="text-left">
            <h2 className="font-display text-2xl font-bold">Skye found 3 tasks</h2>
            <p className="mb-5 text-sm text-slate-500">Ordered by priority, weakest topics first. Check them, then confirm.</p>
            <div className="space-y-3">
              {extracted.map((t, i) => (
                <div key={t.id} className="flex items-center gap-4 rounded-2xl border border-slate-100 p-4">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 font-bold text-[#4f8bff]">{i + 1}</span>
                  <div className="flex-1"><p className="font-bold">{t.title}</p><p className="text-xs text-slate-500">{t.subject} · {t.mins} min</p></div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex gap-3">
              <PrimaryBtn onClick={confirm}><FiCheck /> Confirm flight plan</PrimaryBtn>
              <button onClick={() => setStage("idle")} className="rounded-2xl bg-slate-100 px-6 py-3 text-sm font-bold text-slate-600">Scan again</button>
            </div>
          </div>
        )}
      </Card>
    </AppShell>
  );
}