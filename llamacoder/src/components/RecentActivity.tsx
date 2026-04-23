import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";
import { Ticket, Phone, Mail, User } from "lucide-react";

interface Activity {
  id: string;
  type: "ticket" | "call" | "email" | "customer";
  message: string;
  time: string;
}

export function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivity();
  }, []);

  async function fetchActivity() {
    try {
      const { data: recentTickets } = await supabase
        .from("tickets")
        .select("id, subject, created_at")
        .order("created_at", { ascending: false })
        .limit(5);

      const formattedActivities: Activity[] = (recentTickets || []).map((ticket) => ({
        id: ticket.id,
        type: "ticket" as const,
        message: `New ticket: ${ticket.subject}`,
        time: formatTime(ticket.created_at),
      }));

      setActivities(formattedActivities);
    } catch (error) {
      console.error("Error fetching activity:", error);
    } finally {
      setLoading(false);
    }
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);

    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const iconMap = {
    ticket: { icon: Ticket, color: "text-sky-400", bg: "bg-sky-500/10" },
    call: { icon: Phone, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    email: { icon: Mail, color: "text-purple-400", bg: "bg-purple-500/10" },
    customer: { icon: User, color: "text-amber-400", bg: "bg-amber-500/10" },
  };

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
      <h2 className="text-lg font-bold text-white mb-4">Recent Activity</h2>
      {loading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 animate-pulse">
              <div className="w-8 h-8 bg-slate-700 rounded-lg" />
              <div className="flex-1">
                <div className="h-3 bg-slate-700 rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>
      ) : activities.length === 0 ? (
        <p className="text-slate-400 text-sm text-center py-4">No recent activity</p>
      ) : (
        <div className="space-y-3">
          {activities.map((activity) => {
            const config = iconMap[activity.type];
            const Icon = config.icon;

            return (
              <div
                key={activity.id}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-700/50 transition-all"
              >
                <div className={`w-8 h-8 rounded-lg ${config.bg} flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 ${config.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-300 text-sm truncate">{activity.message}</p>
                </div>
                <span className="text-slate-500 text-xs flex-shrink-0">{activity.time}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}