import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { FiLock, FiArrowRight } from "react-icons/fi";
import Logo from "../components/Logo";
import { login, PARENT_PIN } from "../utils/auth";

export default function ParentPin() {
  const nav = useNavigate();
  const shake = useAnimation();
  const [pin, setPin] = useState("");
  const [err, setErr] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (pin === PARENT_PIN) { login("parent"); nav("/parent"); return; }
    setErr("That PIN doesn't match. Try again.");
    setPin("");
    shake.start({ x: [0, -10, 10, -6, 6, 0], transition: { duration: 0.4 } });
  };

  return (
    <div className="grid min-h-screen place-items-center bg-[#fafbff] p-6">
      <motion.form animate={shake} onSubmit={submit} className="w-full max-w-[560px] rounded-[36px] bg-white p-12 text-center shadow-[0_10px_50px_rgba(79,139,255,0.1)]">
        <div className="flex justify-center"><Logo /></div>
        <span className="mx-auto mt-8 grid h-[70px] w-[70px] place-items-center rounded-2xl bg-blue-50 text-3xl text-[#4f8bff]"><FiLock /></span>
        <h1 className="font-display mt-6 text-3xl font-bold">Parent access</h1>
        <p className="mx-auto mt-3 max-w-sm text-slate-500">Enter your 4-digit PIN to open Ayesha's progress report.</p>
        <input
          type="password" inputMode="numeric" maxLength={4} value={pin} autoFocus
          onChange={(e) => { setPin(e.target.value.replace(/\D/g, "")); setErr(""); }}
          className="mt-8 w-full rounded-3xl bg-[#f6f7fc] py-6 text-center text-3xl tracking-[0.6em] outline-none focus:ring-2 focus:ring-[#4f8bff]/40"
        />
        {err && <p className="mt-2 text-sm text-rose-500">{err}</p>}
        <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#4f8bff] py-4 font-bold text-white shadow-lg shadow-blue-200">
          Open progress report <FiArrowRight />
        </button>
        <p className="mt-4 text-sm text-slate-400">Demo PIN: 1234</p>
      </motion.form>
    </div>
  );
}