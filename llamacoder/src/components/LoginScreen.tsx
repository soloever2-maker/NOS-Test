import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Shield, Phone, Users } from "lucide-react";
import type { User } from "../App";

interface LoginScreenProps {
  onLogin: (user: User) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const userData: User = {
      id: "user-" + Date.now(),
      email: email,
      name: name || email.split("@")[0],
      role: email.includes("admin") ? "admin" : email.includes("supervisor") ? "supervisor" : "agent",
    };

    setLoading(false);
    onLogin(userData);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex">
      <div className="hidden lg:flex lg:w-1/2 bg-sky-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-900/20" />
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold">Nations Of Sky</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Customer Care<br />Contact Center
          </h1>
          <p className="text-sky-100 text-lg mb-8">
            Unified platform for exceptional customer support. Manage tickets, calls, and customer relationships in one powerful interface.
          </p>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-xl p-4">
              <Phone className="w-6 h-6 mb-2" />
              <p className="text-sm font-medium">Call Center</p>
              <p className="text-xs text-sky-200">Voice support</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <Users className="w-6 h-6 mb-2" />
              <p className="text-sm font-medium">CRM</p>
              <p className="text-xs text-sky-200">Customer data</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <Shield className="w-6 h-6 mb-2" />
              <p className="text-sm font-medium">Security</p>
              <p className="text-xs text-sky-200">Enterprise grade</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Nations Of Sky</span>
          </div>

          <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-2">
              {isLogin ? "Welcome back" : "Create account"}
            </h2>
            <p className="text-slate-400 mb-6">
              {isLogin
                ? "Sign in to access your dashboard"
                : "Join Nations Of Sky support team"}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <Label htmlFor="name" className="text-slate-300">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={!isLogin}
                    className="mt-1 bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                    placeholder="John Doe"
                  />
                </div>
              )}
              <div>
                <Label htmlFor="email" className="text-slate-300">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-slate-300">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                  placeholder="••••••••"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-sky-500 hover:bg-sky-600 text-white font-medium py-6"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : isLogin ? (
                  "Sign In"
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-sky-400 hover:text-sky-300 text-sm"
              >
                {isLogin
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Sign in"}
              </button>
            </div>

            <div className="mt-4 p-3 bg-sky-500/10 rounded-lg border border-sky-500/20">
              <p className="text-sky-300 text-xs text-center">
                Demo: Enter any email/password to login
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}