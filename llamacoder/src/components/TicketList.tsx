import { useState } from "react";
import { Button } from "./ui/button";
import { Ticket as TicketIcon, AlertCircle, Clock, CheckCircle, X } from "lucide-react";
import type { Ticket } from "../App";

const initialTickets: Ticket[] = [
  {
    id: "1",
    customer_id: "c1",
    customer: { id: "c1", name: "Sarah Johnson", email: "sarah@example.com", phone: "+1-555-0101", company: "Tech Corp", status: "active", created_at: new Date().toISOString() },
    subject: "Unable to access account after password reset",
    description: "Customer tried resetting password but now cannot login with new credentials.",
    status: "open",
    priority: "high",
    category: "Account",
    created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "2",
    customer_id: "c2",
    customer: { id: "c2", name: "Michael Chen", email: "michael@example.com", phone: "+1-555-0102", company: "Design Studio", status: "vip", created_at: new Date().toISOString() },
    subject: "Billing discrepancy on invoice #2847",
    description: "Customer was charged twice for the same subscription period.",
    status: "in_progress",
    priority: "urgent",
    category: "Billing",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    id: "3",
    customer_id: "c3",
    customer: { id: "c3", name: "Emily Davis", email: "emily@example.com", phone: "+1-555-0103", company: "Marketing Inc", status: "active", created_at: new Date().toISOString() },
    subject: "Feature request: Dark mode for mobile app",
    description: "Customer would like to see dark mode implemented in the mobile application.",
    status: "open",
    priority: "low",
    category: "Feature Request",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: "4",
    customer_id: "c4",
    customer: { id: "c4", name: "James Wilson", email: "james@example.com", phone: "+1-555-0104", company: "Finance Plus", status: "active", created_at: new Date().toISOString() },
    subject: "Integration API not responding",
    description: "Third-party integration stopped working after recent update.",
    status: "waiting",
    priority: "high",
    category: "Technical",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
  },
  {
    id: "5",
    customer_id: "c5",
    customer: { id: "c5", name: "Lisa Anderson", email: "lisa@example.com", phone: "+1-555-0105", company: "Retail Solutions", status: "active", created_at: new Date().toISOString() },
    subject: "Question about enterprise plan features",
    description: "Customer wants to know if enterprise plan includes SSO.",
    status: "resolved",
    priority: "medium",
    category: "Sales",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
];

const statusColors = {
  open: { bg: "bg-sky-500/10", text: "text-sky-400", icon: AlertCircle },
  in_progress: { bg: "bg-amber-500/10", text: "text-amber-400", icon: Clock },
  waiting: { bg: "bg-purple-500/10", text: "text-purple-400", icon: Clock },
  resolved: { bg: "bg-emerald-500/10", text: "text-emerald-400", icon: CheckCircle },
  closed: { bg: "bg-slate-500/10", text: "text-slate-400", icon: X },
};

const priorityColors = {
  low: "bg-slate-500/20 text-slate-300",
  medium: "bg-sky-500/20 text-sky-300",
  high: "bg-amber-500/20 text-amber-300",
  urgent: "bg-red-500/20 text-red-300",
};

interface TicketListProps {
  expanded?: boolean;
}

export function TicketList({ expanded = false }: TicketListProps) {
  const [tickets] = useState<Ticket[]>(initialTickets);
  const [filter, setFilter] = useState<"all" | "open" | "in_progress">("all");
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const filteredTickets = tickets.filter(
    (ticket) => filter === "all" || ticket.status === filter
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700">
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">
            {expanded ? "All Tickets" : "Recent Tickets"}
          </h2>
          <TicketIcon className="w-5 h-5 text-slate-400" />
        </div>
        <div className="flex gap-2">
          {(["all", "open", "in_progress"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === status
                  ? "bg-sky-500 text-white"
                  : "bg-slate-700 text-slate-400 hover:text-white"
              }`}
            >
              {status === "in_progress"
                ? "In Progress"
                : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="divide-y divide-slate-700">
        {filteredTickets.length === 0 ? (
          <div className="p-12 text-center">
            <TicketIcon className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">No tickets found</p>
          </div>
        ) : (
          filteredTickets.map((ticket) => {
            const statusConfig = statusColors[ticket.status];
            const StatusIcon = statusConfig.icon;

            return (
              <div
                key={ticket.id}
                onClick={() => expanded && setSelectedTicket(ticket)}
                className={`p-4 hover:bg-slate-700/50 transition-all ${
                  expanded ? "cursor-pointer" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium truncate">
                      {ticket.subject}
                    </h3>
                    <p className="text-slate-400 text-sm mt-1 line-clamp-1">
                      {ticket.description}
                    </p>
                    <div className="flex items-center gap-3 mt-2 flex-wrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs ${statusConfig.bg} ${statusConfig.text}`}
                      >
                        <StatusIcon className="w-3 h-3" />
                        {ticket.status.replace("_", " ")}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-md text-xs ${priorityColors[ticket.priority]}`}
                      >
                        {ticket.priority}
                      </span>
                      {ticket.customer && (
                        <span className="text-slate-500 text-xs">
                          {ticket.customer.name}
                          {ticket.customer.status === "vip" && (
                            <span className="ml-1 text-amber-400">★</span>
                          )}
                        </span>
                      )}
                      <span className="text-slate-600 text-xs">
                        {ticket.category}
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-slate-500 text-xs">
                      {formatDate(ticket.created_at)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {!expanded && tickets.length > 0 && (
        <div className="p-4 border-t border-slate-700">
          <Button
            variant="outline"
            className="w-full bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600 hover:text-white"
          >
            View All Tickets
          </Button>
        </div>
      )}

      {selectedTicket && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-700 flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">
                  {selectedTicket.subject}
                </h3>
                <p className="text-slate-400 text-sm mt-1">
                  Ticket #{selectedTicket.id}
                </p>
              </div>
              <button
                onClick={() => setSelectedTicket(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-slate-400 text-sm">Status</p>
                  <p className="text-white font-medium capitalize">
                    {selectedTicket.status.replace("_", " ")}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Priority</p>
                  <p className="text-white font-medium capitalize">
                    {selectedTicket.priority}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Category</p>
                  <p className="text-white font-medium">
                    {selectedTicket.category}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Created</p>
                  <p className="text-white font-medium">
                    {new Date(selectedTicket.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-slate-400 text-sm mb-2">Description</p>
                <div className="bg-slate-700 rounded-lg p-4">
                  <p className="text-white">{selectedTicket.description}</p>
                </div>
              </div>
              {selectedTicket.customer && (
                <div>
                  <p className="text-slate-400 text-sm mb-2">Customer</p>
                  <div className="bg-slate-700 rounded-lg p-4">
                    <p className="text-white font-medium">
                      {selectedTicket.customer.name}
                    </p>
                    <p className="text-slate-400 text-sm">
                      {selectedTicket.customer.email}
                    </p>
                    <p className="text-slate-400 text-sm">
                      {selectedTicket.customer.company}
                    </p>
                  </div>
                </div>
              )}
              <div className="flex gap-3 pt-4">
                <Button className="flex-1 bg-sky-500 hover:bg-sky-600 text-white">
                  Take Ticket
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                >
                  Escalate
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}