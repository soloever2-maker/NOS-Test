import { useState } from "react";
import { LoginScreen } from "./components/LoginScreen";
import { Dashboard } from "./components/Dashboard";
import { Sidebar } from "./components/Sidebar";

export interface User {
  id: string;
  email: string;
  name: string;
  role: "agent" | "supervisor" | "admin";
  avatar_url?: string;
}

export interface Customer {
  id: string;
  email: string;
  name: string;
  phone: string;
  company: string;
  status: "active" | "inactive" | "vip";
  created_at: string;
}

export interface Ticket {
  id: string;
  customer_id: string;
  customer?: Customer;
  agent_id?: string;
  agent?: User;
  subject: string;
  description: string;
  status: "open" | "in_progress" | "waiting" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  category: string;
  created_at: string;
  updated_at: string;
}

export interface CallLog {
  id: string;
  agent_id: string;
  customer_id?: string;
  customer?: Customer;
  phone_number: string;
  direction: "inbound" | "outbound";
  status: "answered" | "missed" | "voicemail" | "busy";
  duration: number;
  notes?: string;
  created_at: string;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-900 flex">
      <Sidebar
        user={user}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onLogout={handleLogout}
      />
      <main
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <Dashboard user={user} />
      </main>
    </div>
  );
}