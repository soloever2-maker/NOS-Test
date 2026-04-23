import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: "sky" | "amber" | "emerald" | "purple";
}

const colorClasses = {
  sky: {
    bg: "bg-sky-500/10",
    icon: "text-sky-400",
    border: "border-sky-500/20",
  },
  amber: {
    bg: "bg-amber-500/10",
    icon: "text-amber-400",
    border: "border-amber-500/20",
  },
  emerald: {
    bg: "bg-emerald-500/10",
    icon: "text-emerald-400",
    border: "border-emerald-500/20",
  },
  purple: {
    bg: "bg-purple-500/10",
    icon: "text-purple-400",
    border: "border-purple-500/20",
  },
};

export function StatsCard({ title, value, icon: Icon, color }: StatsCardProps) {
  const colors = colorClasses[color];

  return (
    <div
      className={`bg-slate-800 rounded-xl p-6 border ${colors.border} hover:border-opacity-40 transition-all`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl ${colors.bg}`}>
          <Icon className={`w-5 h-5 ${colors.icon}`} />
        </div>
      </div>
      <div>
        <p className="text-3xl font-bold text-white">{value}</p>
        <p className="text-slate-400 text-sm mt-1">{title}</p>
      </div>
    </div>
  );
}