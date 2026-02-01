import LoginForm from "@/app/_components/portals/LoginForm";

export default function ParentLoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">
      {/* Decorative background elements to keep it "Graphics Heavy" */}
      <div className="absolute top-0 left-0 w-full h-1 bg-accent" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="z-10 w-full max-w-4xl flex flex-col md:flex-row items-center gap-12 px-6">
        {/* Left Side: Branding/Value Prop */}
        <div className="flex-1 space-y-6 text-center md:text-left">
          <div className="inline-block px-4 py-1 bg-primary/10 rounded-full">
            <span className="text-primary font-bold text-xs uppercase tracking-widest">
              Secure Access
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-primary-dark tracking-tighter uppercase">
            Parent <br />
            <span className="text-accent">Portal.</span>
          </h1>
          <p className="text-slate-500 font-medium leading-relaxed">
            Track your child's academic journey, view fee statements, and
            communicate with teachers in real-time.
          </p>

          {/* Trust Badges */}
          <div className="pt-6 flex gap-4 justify-center md:justify-start">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              System Online
            </div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              SSL Encrypted
            </div>
          </div>
        </div>

        {/* Right Side: The Login Form */}
        <div className="flex-1 w-full max-w-md">
          <LoginForm role="Parent" />
        </div>
      </div>
    </main>
  );
}
