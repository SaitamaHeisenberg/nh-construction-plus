import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#000d1a] border-t border-white/10 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo + nom */}
          <div className="flex items-center gap-3">
            <Image src="/images/logo.jpeg" alt="Logo NH" width={40} height={40} className="rounded-md" />
            <div>
              <p className="text-white font-black text-sm">NH CONSTRUCTION PLUS</p>
              <p className="text-white/40 text-xs">RCCM : CI-ABJ-03-2024-B12-09431</p>
            </div>
          </div>

          {/* Liens */}
          <nav className="flex flex-wrap gap-4 md:gap-6 text-sm text-white/50">
            {["#services", "#realisations", "#apropos", "#contact"].map((href) => (
              <a key={href} href={href} className="hover:text-[#FF8C00] transition-colors capitalize">
                {href.replace("#", "")}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-white/30 text-xs text-center md:text-right">
            © 2026 NH CONSTRUCTION PLUS<br />
            Koumassi, Abidjan — Côte d&apos;Ivoire
          </p>
        </div>
      </div>
    </footer>
  );
}
