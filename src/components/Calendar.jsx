import { FaFire } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const heads = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const cells = [...Array(3).fill(null), ...Array.from({ length: 31 }, (_, i) => i + 1)]; // 1 Oct 2026 is a Thursday

export default function Calendar() {
  return (
    <div>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-display text-2xl font-bold">October 2026</h3>
          <p className="text-sm text-slate-500">9-day streak ending yesterday</p>
        </div>
        <div className="flex gap-2">
          {[FiChevronLeft, FiChevronRight].map((I, i) => (
            <button key={i} className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-500"><I /></button>
          ))}
        </div>
      </div>
      <div className="mt-6 grid grid-cols-7 gap-y-3 text-center">
        {heads.map((h) => <span key={h} className="text-[10px] font-bold tracking-wider text-slate-400">{h}</span>)}
        {cells.map((d, i) => {
          if (!d) return <span key={i} />;
          const streak = d >= 4 && d <= 12, today = d === 13, future = d > 13;
          return (
            <div key={i} className="grid place-items-center">
              <span className={`grid h-11 w-11 place-items-center rounded-full text-sm font-semibold
                ${streak ? "bg-amber-50 text-amber-500" : today ? "border-2 border-[#4f8bff] bg-white text-[#1e2a47]" : future ? "bg-slate-50 text-slate-300" : "bg-slate-100 text-slate-500"}`}>
                {streak ? <FaFire /> : d}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}