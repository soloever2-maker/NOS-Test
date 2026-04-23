import { useState } from "react";
import { Phone, PhoneOff, Voicemail, PhoneMissed } from "lucide-react";
import type { CallLog } from "../App";

const initialCallLogs: CallLog[] = [
  {
    id: "1",
    agent_id: "a1",
    customer_id: "c1",
    customer: { id: "c1", name: "Sarah Johnson", email: "sarah@example.com", phone: "+1-555-0101", company: "Tech Corp", status: "active", created_at: new Date().toISOString() },
    phone_number: "+1-555-0101",
    direction: "inbound",
    status: "answered",
    duration: 342,
    notes: "Helped with account recovery",
    created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: "2",
    agent_id: "a2",
    customer_id: "c2",
    customer: { id: "c2", name: "Michael Chen", email: "michael@example.com", phone: "+1-555-0102", company: "Design Studio", status: "vip", created_at: new Date().toISOString() },
    phone_number: "+1-555-0102",
    direction: "outbound",
    status: "answered",
    duration: 180,
    notes: "Follow-up on billing issue",
    created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: "3",
    agent_id: "a1",
    phone_number: "+1-555-0199",
    direction: "inbound",
    status: "missed",
    duration: 0,
    created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    id: "4",
    agent_id: "a3",
    customer_id: "c3",
    customer: { id: "c3", name: "Emily Davis", email: "emily@example.com", phone: "+1-555-0103", company: "Marketing Inc", status: "active", created_at: new Date().toISOString() },
    phone_number: "+1-555-0103",
    direction: "inbound",
    status: "voicemail",
    duration: 45,
    notes: "Left voicemail about feature request",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
  },
];

const statusIcons = {
  answered: { icon: Phone, color: "text-emerald-400", bg: "bg-emerald-500/10" },
  missed: { icon: PhoneMissed, color: "text-red-400", bg: "bg-red-500/10" },
  voicemail: { icon: Voicemail, color: "text-amber-400", bg: "bg-amber-500/10" },
  busy: { icon: PhoneOff, color: "text-slate-400", bg: "bg-slate-500/10" },
};

interface CallLogListProps {
  compact?: boolean;
}

export function CallLogList({ compact = false }: CallLogListProps) {
  const [callLogs] = useState<CallLog[]>(initialCallLogs);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const displayLogs = compact ? callLogs.slice(0, 3) : callLogs;

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700">
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Recent Calls</h2>
          <Phone className="w-5 h-5 text-slate-400" />
        </div>
      </div>

      <div className="divide-y divide-slate-700">
        {displayLogs.length === 0 ? (
          <div className="p-8 text-center">
            <Phone className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400 text-sm">No recent calls</p>
          </div>
        ) : (
          displayLogs.map((call) => {
            const statusConfig = statusIcons[call.status];
            const StatusIcon = statusConfig.icon;

            return (
              <div key={call.id} className="p-4 hover:bg-slate-700/50 transition-all">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${statusConfig.bg}`}>
                    <StatusIcon className={`w-4 h-4 ${statusConfig.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-white font-medium truncate">
                        {call.customer?.name || "Unknown Caller"}
                      </p>
                      <span
                        className={`text-xs px-2 py-0.5 rounded ${
                          call.direction === "inbound"
                            ? "bg-sky-500/20 text-sky-300"
                            : "bg-purple-500/20 text-purple-300"
                        }`}
                      >
                        {call.direction === "inbound" ? "In" : "Out"}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm">{call.phone_number}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-400 text-sm">
                      {formatTime(call.created_at)}
                    </p>
                    {call.duration > 0 && (
                      <p className="text-slate-500 text-xs">
                        {formatDuration(call.duration)}
                      </p>
                    )}
                  </div>
                </div>
                {call.notes && !compact && (
                  <p className="text-slate-400 text-sm mt-2 pl-9">
                    {call.notes}
                  </p>
                )}
              </div>
            );
          })
        )}
      </div>

      {compact && callLogs.length > 3 && (
        <div className="p-3 border-t border-slate-700">
          <button className="w-full text-sky-400 text-sm hover:text-sky-300">
            View All Calls
          </button>
        </div>
      )}
    </div>
  );
}