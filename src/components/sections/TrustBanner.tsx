"use client";
import { motion } from "framer-motion";

const items = [
  "RCCM : CI-ABJ-03-2024-B12-09431",
  "★ Construction • BTP • Génie Civil",
  "Siège : Koumassi, Face Cité Pangolin — Abidjan",
  "★ Aménagement Foncier • VRD • Terrassement",
  "BP 526 Abidjan 26, Côte d'Ivoire",
  "★ Rénovation • Second Œuvre • Design",
];

export default function TrustBanner() {
  const repeated = [...items, ...items];

  return (
    <section className="py-0 bg-[#FF8C00] overflow-hidden relative">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#FF8C00_0%,#e07b00_50%,#FF8C00_100%)]" />
      <div className="relative flex overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="flex gap-0 whitespace-nowrap"
        >
          {repeated.map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-4 text-white font-black text-sm uppercase tracking-widest px-8 py-4"
            >
              {item}
              <span className="text-white/40 mx-2">|</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
