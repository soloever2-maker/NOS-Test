import { useState } from "react";
import { StatsCard } from "./StatsCard";
import { TicketList } from "./TicketList";
import { CallLogList } from "./CallLogList";
import { QuickActions } from "./QuickActions";
import { Ticket, Phone, Clock, Users } from "lucide-react";
import type { User } from "../App";

interface DashboardProps {
  user: User;
}

export function Dashboard({ user }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "tickets" | "calls">("overview");

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
              {getGreeting()}, {user.name}
            </h1>
            <p className="text-slate-400 mt-1">
              Here's what's happening at Nations Of Sky today
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-white font-medium">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-slate-400 text-sm">
                {new Date().toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="border-b border-slate-700 bg-slate-800">
        <div className="px-6 flex gap-1">
          {[
            { id: "overview", label: "Overview", icon: Users },
            { id: "tickets", label: "Tickets", icon: Ticket },
            { id: "calls", label: "Call Logs", icon: Phone },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all ${
                activeTab === tab.id
                  ? "border-sky-500 text-sky-400"
                  : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard
                title="Open Tickets"
                value={12}
                icon={Ticket}
                color="sky"
              />
              <StatsCard
                title="Calls Today"
                value={47}
                icon={Phone}
                color="amber"
              />
              <StatsCard
                title="Avg Response"
                value="2.4h"
                icon={Clock}
                color="emerald"
              />
              <StatsCard
                title="Active Customers"
                value={284}
                icon={Users}
                color="purple"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <TicketList />
              </div>
              <div className="space-y-6">
                <QuickActions />
                <CallLogList compact />
              </div>
            </div>
          </div>
        )}

        {activeTab === "tickets" && (
          <div className="max-w-4xl">
            <TicketList expanded />
          </div>
        )}

        {activeTab === "calls" && (
          <div className="max-w-4xl">
            <CallLogList />
          </div>
        )}
      </div>
    </div>
  );
}