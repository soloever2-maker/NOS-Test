export interface Profile {
  id: string;
  email: string;
  name: string;
  role: "agent" | "supervisor" | "admin";
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Customer {
  id: string;
  email: string;
  name: string;
  phone?: string;
  company?: string;
  status: "active" | "inactive" | "vip";
  created_at: string;
}

export interface Ticket {
  id: string;
  customer_id: string;
  agent_id?: string;
  subject: string;
  description: string;
  status: "open" | "in_progress" | "waiting" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  category: string;
  created_at: string;
  updated_at: string;
  resolved_at?: string;
  customer?: Customer;
  agent?: Profile;
}

export interface Message {
  id: string;
  ticket_id: string;
  sender_id: string;
  sender_type: "agent" | "customer";
  content: string;
  created_at: string;
}

export interface CallLog {
  id: string;
  agent_id: string;
  customer_id?: string;
  phone_number: string;
  direction: "inbound" | "outbound";
  status: "answered" | "missed" | "voicemail" | "busy";
  duration: number;
  notes?: string;
  created_at: string;
}

export interface KnowledgeArticle {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  author_id: string;
  views: number;
  helpful_count: number;
  created_at: string;
  updated_at: string;
}