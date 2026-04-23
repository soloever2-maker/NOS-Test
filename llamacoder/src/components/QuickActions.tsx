import { Button } from "./ui/button";
import { Plus, Phone, Mail, UserPlus } from "lucide-react";

export function QuickActions() {
  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
      <h2 className="text-lg font-bold text-white mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-3">
        <button className="flex flex-col items-center gap-2 p-4 bg-sky-500/10 rounded-xl hover:bg-sky-500/20 transition-all group">
          <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <Plus className="w-5 h-5 text-white" />
          </div>
          <span className="text-sky-400 text-sm font-medium">New Ticket</span>
        </button>
        <button className="flex flex-col items-center gap-2 p-4 bg-emerald-500/10 rounded-xl hover:bg-emerald-500/20 transition-all group">
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <Phone className="w-5 h-5 text-white" />
          </div>
          <span className="text-emerald-400 text-sm font-medium">Log Call</span>
        </button>
        <button className="flex flex-col items-center gap-2 p-4 bg-purple-500/10 rounded-xl hover:bg-purple-500/20 transition-all group">
          <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <Mail className="w-5 h-5 text-white" />
          </div>
          <span className="text-purple-400 text-sm font-medium">Send Email</span>
        </button>
        <button className="flex flex-col items-center gap-2 p-4 bg-amber-500/10 rounded-xl hover:bg-amber-500/20 transition-all group">
          <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <UserPlus className="w-5 h-5 text-white" />
          </div>
          <span className="text-amber-400 text-sm font-medium">Add Customer</span>
        </button>
      </div>
    </div>
  );
}