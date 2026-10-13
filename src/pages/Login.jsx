import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiLock } from "react-icons/fi";
import { PiAirplaneTilt } from "react-icons/pi";
import Logo from "../components/Logo";
import Skye from "../components/Skye";
import { login, DEMO } from "../utils/auth";

export default function Login() {
  const nav = useNavigate();
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");

  const demo = () => { setEmail(DEMO[role].email); setPw(DEMO[role].password); setErr(""); };
  const submit = (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return setErr("Enter a valid email address.");
    if (pw.length < 4) return setErr("Password must be at least 4 characters.");
    setErr("");
    if (role === "parent") return nav("/parent-pin");
    login("student");
    nav("/today");
  };
  const field = "w-full rounded-2xl bg-[#f6f7fc] py-4 pl-12 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#4f8bff]/40";

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <section className="relative hidden flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#4f8bff] to-[#7a6bff] p-12 text-white md:flex">
        <div className="absolute left-14 top-14"><Logo light /></div>
        <div className="absolute -right-24 top-24 h-[360px] w-[360px] rounded-full bg-white/10" />
        <div className="absolute -left-16 top-64 h-52 w-52 rounded-full bg-white/10" />
        <div className="absolute right-32 top-10 h-12 w-28 rounded-full bg-white/30" />
        <div className="absolute bottom-20 left-14 h-16 w-36 rounded-full bg-white/30" />
        <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 3.5, repeat: Infinity }} className="relative">
          <Skye size={300} />
        </motion.div>
        <h2 className="font-display relative mt-14 text-5xl font-extrabold">Your homework co-pilot.</h2>
        <p className="relative mt-4 text-center text-lg text-white/80">A calmer, smarter flight path<br />through every school day.</p>
        <p className="absolute bottom-10 text-sm font-semibold text-white/60">Built for Classes 4–7</p>
      </section>

      <section className="grid place-items-center bg-[#fafbff] p-6">
        <motion.form initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} onSubmit={submit} noValidate
          className="w-full max-w-[470px] rounded-[32px] border border-slate-100 bg-white p-9 shadow-[0_10px_40px_rgba(79,139,255,0.08)]">
          <h1 className="font-display text-4xl font-bold">Welcome aboard</h1>
          <p className="mt-2 text-slate-500">Sign in and continue your Study-Pilot journey.</p>

          <div className="relative mt-7 grid grid-cols-2 rounded-2xl bg-[#f6f7fc] p-1.5">
            {["student", "parent"].map((r) => (
              <button type="button" key={r} onClick={() => { setRole(r); setErr(""); }}
                className={`relative z-10 rounded-xl py-3 text-sm font-bold capitalize ${role === r ? "text-[#4f8bff]" : "text-slate-500"}`}>
                {role === r && <motion.span layoutId="role-pill" className="absolute inset-0 -z-10 rounded-xl bg-white shadow" />}
                {r}
              </button>
            ))}
          </div>

          <label className="mt-6 block text-xs font-bold text-slate-600">Email address
            <div className="relative mt-2">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input className={field} value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </label>
          <label className="mt-4 block text-xs font-bold text-slate-600">Password
            <div className="relative mt-2">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="password" className={field} value={pw} onChange={(e) => setPw(e.target.value)} />
            </div>
          </label>
          {err && <p className="mt-2 text-xs text-rose-500">{err}</p>}
          <div className="mt-3 text-right"><button type="button" onClick={demo} className="text-xs font-bold text-[#4f8bff]">Use demo account</button></div>

          <motion.button whileTap={{ scale: 0.98 }} className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#4f8bff] py-4 font-bold text-white shadow-lg shadow-blue-200">
            Take off <PiAirplaneTilt />
          </motion.button>
        </motion.form>
      </section>
    </div>
  );
}