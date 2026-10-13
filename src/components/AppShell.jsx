import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { PiAirplaneTilt } from "react-icons/pi";
import { FiBook, FiBarChart2, FiGift, FiBell, FiLogOut, FiActivity } from "react-icons/fi";
import { FaFire } from "react-icons/fa";
import Logo from "./Logo";
import { logout } from "../utils/auth";
import { student, notifications } from "../data/mockData";

const nav = {
  student: [["Today", "/today", PiAirplaneTilt], ["Subjects", "/subjects", FiBook], ["Progress", "/progress", FiBarChart2], ["Rewards", "/rewards", FiGift]],
  parent: [["Report", "/parent", FiBarChart2], ["Books", "/parent/books", FiBook], ["Activity", "/parent/activity", FiActivity]],
};

export default function AppShell({ role = "student", children }) {
  const go = useNavigate();
  const [open, setOpen] = useState(false);
  const items = nav[role];
  const me = role === "parent"
    ? { name: "Parent of Ayesha", sub: "Guardian", ini: "PA" }
    : { name: student.name, sub: student.cls, ini: student.initials };

  return (
    <div className="flex min-h-screen">
      <aside className="sticky top-0 hidden h-screen w-[250px] shrink-0 flex-col border-r border-slate-100 bg-white px-4 py-6 md:flex">
        <div className="px-2"><Logo /></div>
        <nav className="mt-10 space-y-2">
          {items.map(([label, to, Icon]) => (
            <NavLink key={label} to={to} end={to === "/parent"}
              className={({ isActive }) => `flex items-center gap-3 rounded-2xl px-4 py-3.5 text-[15px] font-semibold transition ${isActive ? "bg-[#4f8bff] text-white shadow-lg shadow-blue-200" : "text-slate-500 hover:bg-slate-50"}`}>
              <Icon className="text-xl" /> {label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-sm font-bold text-[#4f8bff]">{me.ini}</span>
          <div className="min-w-0 flex-1 leading-tight">
            <div className="truncate text-sm font-bold">{me.name}</div>
            <div className="text-xs text-slate-400">{me.sub}</div>
          </div>
          <button title="Log out" onClick={() => { logout(); go("/"); }} className="text-slate-400 hover:text-rose-500"><FiLogOut /></button>
        </div>
      </aside>

      <div className="min-w-0 flex-1 pb-24 md:pb-0">
        <header className="relative flex items-center justify-between border-b border-slate-100 px-8 py-5">
          <span className="text-xs font-bold tracking-[0.2em] text-slate-400">{role === "parent" ? "PARENT COCKPIT" : "STUDENT COCKPIT"}</span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-bold text-amber-700"><FaFire className="text-amber-500" /> {student.streak} day streak</span>
            <button onClick={() => setOpen(!open)} className="relative grid h-12 w-12 place-items-center rounded-2xl bg-white shadow">
              <FiBell className="text-lg text-slate-600" /><span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-rose-400" />
            </button>
          </div>
          <AnimatePresence>
            {open && (
              <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="absolute right-8 top-20 z-30 w-80 rounded-2xl border border-slate-100 bg-white p-2 shadow-xl">
                {notifications[role].map((n) => <p key={n} className="rounded-xl px-3 py-3 text-sm text-slate-600 hover:bg-slate-50">{n}</p>)}
              </motion.div>
            )}
          </AnimatePresence>
        </header>
        <main className="mx-auto w-full max-w-[1100px] px-6 py-8 md:px-8">{children}</main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-20 flex justify-around border-t border-slate-100 bg-white py-2 md:hidden">
        {items.map(([label, to, Icon]) => (
          <NavLink key={label} to={to} end={to === "/parent"} className={({ isActive }) => `flex flex-col items-center gap-1 text-[11px] font-semibold ${isActive ? "text-[#4f8bff]" : "text-slate-400"}`}>
            <Icon className="text-xl" />{label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}