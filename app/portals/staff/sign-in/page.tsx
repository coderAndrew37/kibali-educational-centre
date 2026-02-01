import LoginForm from "@/app/_components/portals/LoginForm";
export default function StaffLoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">
      {/* Staff Theme - Navy Accents */}
      <div className="absolute top-0 left-0 w-full h-1 bg-primary" />

      <div className="z-10 w-full max-w-4xl flex flex-col md:flex-row items-center gap-12 px-6">
        <div className="flex-1 space-y-6 text-center md:text-left">
          <div className="inline-block px-4 py-1 bg-primary/10 rounded-full">
            <span className="text-primary font-bold text-xs uppercase tracking-widest">
              Faculty Access
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-primary-dark tracking-tighter uppercase">
            Staff <br />
            <span className="text-primary">Console.</span>
          </h1>
          <p className="text-slate-500 font-medium leading-relaxed">
            Manage your classroom, input CBC assessment strands, and track
            student attendance with our streamlined educator tools.
          </p>
        </div>

        <div className="flex-1 w-full max-w-md">
          <LoginForm role="Staff" />
        </div>
      </div>
    </main>
  );
}
