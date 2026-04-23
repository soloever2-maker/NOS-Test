import { Button } from "./ui/button";
import {
  Shield,
  Home,
  Ticket,
  Phone,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { User } from "../App";

interface SidebarProps {
  user: User;
  isOpen: boolean;
  onToggle: () => void;
  onLogout: () => void;
}

const menuItems = [
  { icon: Home, label: "Dashboard", active: true },
  { icon: Ticket, label: "Tickets", badge: 12 },
  { icon: Phone, label: "Calls", badge: 3 },
  { icon: Users, label: "Customers" },
  { icon: Settings, label: "Settings" },
];

export function Sidebar({ user, isOpen, onToggle, onLogout }: SidebarProps) {
  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-slate-800 border-r border-slate-700 transition-all duration-300 z-50 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-white" />
            </div>
            {isOpen && (
              <div className="overflow-hidden">
                <h1 className="text-white font-bold text-lg truncate">
                  Nations Of Sky
                </h1>
                <p className="text-slate-400 text-xs">Contact Center</p>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                item.active
                  ? "bg-sky-500/20 text-sky-400"
                  : "text-slate-400 hover:bg-slate-700 hover:text-white"
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {isOpen && (
                <>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span className="bg-sky-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-700">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-medium">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            {isOpen && (
              <div className="overflow-hidden flex-1">
                <p className="text-white font-medium truncate">{user.name}</p>
                <p className="text-slate-400 text-xs capitalize">{user.role}</p>
              </div>
            )}
          </div>
          <Button
            variant="outline"
            onClick={onLogout}
            className="w-full bg-slate-700 border-slate-600 text-slate-300 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            {isOpen ? "Sign Out" : ""}
          </Button>
        </div>

        <button
          onClick={onToggle}
          className="absolute -right-3 top-20 w-6 h-6 bg-slate-700 border border-slate-600 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-600 transition-all"
        >
          {isOpen ? (
            <ChevronLeft className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>
      </div>
    </aside>
  );
}