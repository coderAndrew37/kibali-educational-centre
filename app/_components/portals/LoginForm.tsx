"use client";

export default function LoginForm({
  role,
}: {
  role: "Parent" | "Staff" | "Student";
}) {
  return (
    <div className="max-w-md w-full bg-surface p-10 rounded-3xl shadow-2xl border border-slate-100">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-primary-dark uppercase tracking-tighter">
          {role} Login
        </h2>
        <p className="text-slate-400 text-sm">
          Enter your credentials to access your dashboard.
        </p>
      </div>

      <form className="space-y-6">
        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">
            School ID / Email
          </label>
          <input
            type="text"
            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-accent outline-none transition-all"
            placeholder="KEC/2026/000"
          />
        </div>
        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">
            Password
          </label>
          <input
            type="password"
            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-accent outline-none transition-all"
            placeholder="••••••••"
          />
        </div>
        <button className="w-full bg-accent text-primary-dark py-5 rounded-xl font-black uppercase tracking-widest text-sm shadow-lg shadow-accent/20 hover:scale-[1.02] transition-all">
          Authorize Access
        </button>
      </form>

      <div className="mt-8 text-center">
        <button className="text-xs font-bold text-slate-400 hover:text-primary transition-colors">
          FORGOT PASSWORD?
        </button>
      </div>
    </div>
  );
}
