import { motion } from "framer-motion";

export default function ProgressRing({ value, size = 130, label = "OVERALL" }) {
  const r = size / 2 - 8;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="#eef2fb" strokeWidth="8" fill="none" />
        <motion.circle
          cx={size / 2} cy={size / 2} r={r} stroke="#4f8bff" strokeWidth="8" fill="none" strokeLinecap="round"
          strokeDasharray={c} initial={{ strokeDashoffset: c }} animate={{ strokeDashoffset: c * (1 - value / 100) }} transition={{ duration: 1 }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div className="font-display text-xl font-bold">{value}%</div>
          <div className="text-[10px] font-bold tracking-widest text-slate-400">{label}</div>
        </div>
      </div>
    </div>
  );
}