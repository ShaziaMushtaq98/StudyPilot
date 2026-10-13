import { motion } from "framer-motion";

export const Card = ({ className = "", children, ...p }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} {...p}
    className={`rounded-[28px] border border-slate-100 bg-white shadow-[0_8px_30px_rgba(79,139,255,0.07)] ${className}`}
  >
    {children}
  </motion.div>
);

export const Chip = ({ Icon, children, className = "bg-blue-50 text-blue-600" }) => (
  <span className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold ${className}`}>
    {Icon && <Icon />} {children}
  </span>
);

export const Bar = ({ value, color = "bg-[#4f8bff]" }) => (
  <div className="h-2 w-full rounded-full bg-black/5">
    <motion.div className={`h-2 rounded-full ${color}`} initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ duration: 0.8 }} />
  </div>
);

export const PrimaryBtn = ({ className = "", ...p }) => (
  <button {...p} className={`inline-flex items-center justify-center gap-2 rounded-2xl bg-[#4f8bff] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-[#3f7bf5] ${className}`} />
);

export const PageTitle = ({ chip, title, sub }) => (
  <div className="mb-6">
    {chip}
    <h1 className="font-display mt-4 text-4xl font-bold text-[#1e2a47]">{title}</h1>
    {sub && <p className="mt-2 text-lg text-slate-500">{sub}</p>}
  </div>
);