"use client";
import { motion } from "framer-motion";
import { ShieldCheck, Clock, HardHat, Award } from "lucide-react";

const values = [
  { icon: Clock, title: "Respect des délais", desc: "Chaque projet livré dans les temps convenus, sans compromis sur la qualité." },
  { icon: ShieldCheck, title: "Qualité des matériaux", desc: "Sélection rigoureuse de matériaux conformes aux normes ivoiriennes et internationales." },
  { icon: HardHat, title: "Sécurité sur chantier", desc: "Protocoles stricts pour la sécurité de nos équipes et de vos installations." },
  { icon: Award, title: "Excellence technique", desc: "Une équipe de professionnels qualifiés pour chaque corps de métier." },
];

export default function Apropos() {
  return (
    <section id="apropos" className="py-20 md:py-28 bg-[#00172e] relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF8C00]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Texte */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-[#FF8C00] text-xs font-bold uppercase tracking-widest">Qui sommes-nous</span>
            <h2 className="text-3xl md:text-4xl font-black text-white mt-2 mb-6">
              Une entreprise bâtie sur la <span className="text-[#FF8C00]">confiance</span>
            </h2>
            <p className="text-white/70 leading-relaxed mb-5">
              NH CONSTRUCTION PLUS est une société spécialisée dans le bâtiment et les travaux publics,
              l&apos;aménagement foncier et le génie civil en Côte d&apos;Ivoire. Basée à Koumassi, Abidjan,
              notre entreprise intervient aussi bien pour les particuliers que pour les promoteurs
              immobiliers et les entreprises publiques.
            </p>
            <p className="text-white/70 leading-relaxed mb-8">
              Nous nous engageons à fournir des prestations de haute qualité, dans le respect
              des délais et des budgets convenus, avec une équipe de techniciens expérimentés
              et du matériel adapté à chaque type de chantier.
            </p>

            {/* Infos légales */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white/50">RCCM</span>
                <span className="text-white font-mono font-semibold">CI-ABJ-03-2024-B12-09431</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/50">Siège social</span>
                <span className="text-white font-semibold">Koumassi, Face Cité Pangolin</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/50">BP</span>
                <span className="text-white font-semibold">526 Abidjan 26</span>
              </div>
            </div>
          </motion.div>

          {/* Valeurs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map((val, i) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-[#FF8C00]/40 transition-colors duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#FF8C00]/20 flex items-center justify-center mb-3">
                    <Icon size={18} className="text-[#FF8C00]" />
                  </div>
                  <h4 className="text-white font-bold text-sm mb-2">{val.title}</h4>
                  <p className="text-white/55 text-xs leading-relaxed">{val.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
