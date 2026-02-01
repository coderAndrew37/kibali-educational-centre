import LoginForm from "@/app/_components/portals/LoginForm";
export default function StudentLoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100 relative overflow-hidden">
      {/* Student Theme - Subtle Slate/Blue */}
      <div className="absolute top-0 left-0 w-full h-1 bg-slate-400" />

      <div className="z-10 w-full max-w-4xl flex flex-col md:flex-row items-center gap-12 px-6">
        <div className="flex-1 space-y-6 text-center md:text-left">
          <div className="inline-block px-4 py-1 bg-slate-200 rounded-full">
            <span className="text-slate-600 font-bold text-xs uppercase tracking-widest">
              Learner Access
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-primary-dark tracking-tighter uppercase">
            Student <br />
            <span className="text-slate-400">Space.</span>
          </h1>
          <p className="text-slate-500 font-medium leading-relaxed">
            Check your assignments, view your club schedules, and keep track of
            your learning achievements.
          </p>
        </div>

        <div className="flex-1 w-full max-w-md">
          <LoginForm role="Student" />
        </div>
      </div>
    </main>
  );
}
