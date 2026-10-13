import { motion } from "framer-motion";
import { FiActivity } from "react-icons/fi";
import AppShell from "../components/AppShell";
import { Card, Chip, PageTitle } from "../components/ui";
import { activity } from "../data/mockData";

const tone = { Maths: "bg-indigo-50 text-indigo-500", Science: "bg-emerald-50 text-emerald-600", Diary: "bg-blue-50 text-[#4f8bff]", Reward: "bg-amber-50 text-amber-700" };

export default function ParentActivity() {
  return (
    <AppShell role="parent">
      <PageTitle chip={<Chip Icon={FiActivity}>Activity</Chip>} title="Recent activity" sub="What Ayesha has been working on lately." />
      <Card className="p-8">
        <div className="space-y-1">
          {activity.map((a, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
              className="flex items-center gap-4 border-b border-slate-100 py-4 last:border-0">
              <span className="h-3 w-3 rounded-full bg-[#4f8bff]" />
              <div className="flex-1"><p className="font-semibold">{a.text}</p><p className="text-xs text-slate-400">{a.t}</p></div>
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${tone[a.tag]}`}>{a.tag}</span>
            </motion.div>
          ))}
        </div>
      </Card>
    </AppShell>
  );
}