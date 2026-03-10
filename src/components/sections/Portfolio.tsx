"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageIcon } from "lucide-react";

const filters = ["Tout", "Construction", "Rénovation", "Aménagement", "Design"];

// Placeholders — seront remplacés par de vraies photos
const projects = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  title: [
    "Villa Résidentielle", "Immeuble R+4", "Terrassement Zone Nord",
    "Rénovation Bureau", "Lotissement Yopougon", "Aménagement Paysager",
    "Construction École", "Second Œuvre Appartement", "VRD Koumassi",
  ][i],
  category: [
    "Construction", "Construction", "Aménagement",
    "Rénovation", "Aménagement", "Design",
    "Construction", "Rénovation", "Aménagement",
  ][i],
  placeholder: true,
}));

export default function Portfolio() {
  const [active, setActive] = useState("Tout");

  const filtered = active === "Tout" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="realisations" className="py-20 md:py-28 bg-[#001F3F] relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF8C00]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-[#FF8C00] text-xs font-bold uppercase tracking-widest">Portfolio</span>
          <h2 className="text-3xl md:text-5xl font-black text-white mt-2">
            Nos <span className="text-[#FF8C00]">Réalisations</span>
          </h2>
          <p className="text-white/60 mt-4 max-w-xl mx-auto">
            Chaque projet témoigne de notre engagement pour la qualité et l&apos;excellence.
          </p>
        </motion.div>

        {/* Filtres */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                active === f
                  ? "bg-[#FF8C00] text-white shadow-lg shadow-orange-900/30"
                  : "bg-white/10 text-white/70 hover:bg-white/20 border border-white/10"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grille */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35 }}
                className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 aspect-[4/3] flex items-center justify-center hover:border-[#FF8C00]/40 transition-all duration-300"
              >
                {/* Placeholder visuel */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a3a5c] to-[#001020]" />
                <div className="relative z-10 flex flex-col items-center gap-3 text-white/30">
                  <ImageIcon size={40} />
                  <span className="text-xs">Photo à venir</span>
                </div>

                {/* Overlay hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#001F3F] via-[#001F3F]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-5">
                  <div>
                    <span className="text-[#FF8C00] text-xs font-bold uppercase tracking-widest">{project.category}</span>
                    <h3 className="text-white font-black text-lg mt-1">{project.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Note placeholders */}
        <p className="text-center text-white/30 text-xs mt-8">
          Les photos de réalisations seront ajoutées via le panneau d&apos;administration.
        </p>
      </div>
    </section>
  );
}
