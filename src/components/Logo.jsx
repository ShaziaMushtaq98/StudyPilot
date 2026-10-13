import { PiAirplaneTiltFill } from "react-icons/pi";

export default function Logo({ light = false }) {
  return (
    <div className="flex items-center gap-3">
      <span className={`grid h-11 w-11 place-items-center rounded-2xl shadow-lg ${light ? "bg-white text-[#4f8bff]" : "bg-[#4f8bff] text-white shadow-blue-200"}`}>
        <PiAirplaneTiltFill className="text-2xl" />
      </span>
      <div className="leading-tight">
        <div className={`font-display text-xl font-bold ${light ? "text-white" : "text-[#1e2a47]"}`}>Study-Pilot</div>
        <div className={`text-[10px] font-bold tracking-[0.2em] ${light ? "text-white/70" : "text-[#4f8bff]"}`}>LEARN. FLY. GROW.</div>
      </div>
    </div>
  );
}