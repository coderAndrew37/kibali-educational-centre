export default function Footer() {
  return (
    <footer className="bg-primary-dark text-surface py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <div className="text-3xl font-black text-accent mb-6">KIBALI.</div>
          <p className="text-surface/60 leading-relaxed">
            Leading the way in CBC Excellence and Holistic Child Development.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-6">Academics</h4>
          <ul className="space-y-4 text-surface/60">
            <li className="hover:text-accent cursor-pointer transition">
              Kindergarten
            </li>
            <li className="hover:text-accent cursor-pointer transition">
              Primary School
            </li>
            <li className="hover:text-accent cursor-pointer transition">
              Junior Secondary
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-6">Quick Links</h4>
          <ul className="space-y-4 text-surface/60">
            <li className="hover:text-accent cursor-pointer transition">
              Admissions
            </li>
            <li className="hover:text-accent cursor-pointer transition">
              School Calendar
            </li>
            <li className="hover:text-accent cursor-pointer transition">
              Work with Us
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-6">Visit Us</h4>
          <address className="not-italic text-surface/60 space-y-4">
            <p>📍 Road Name, Area, Town</p>
            <p>📞 +254 700 000 000</p>
            <p>✉️ info@kibali.sc.ke</p>
          </address>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-surface/10 text-center text-surface/40 text-sm">
        © {new Date().getFullYear()} Kibali Educational Centre. All Rights
        Reserved.
      </div>
    </footer>
  );
}
