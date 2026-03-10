"use client";
import { motion, type Variants, type Easing } from "framer-motion";
import { Building2, Landmark, Wrench, Leaf } from "lucide-react";

const easeOut: Easing = "easeOut";

const services = [
  {
    icon: Building2,
    title: "Bâtiment & Travaux Publics",
    description: "Construction neuve, gros œuvre, génie civil. Nous réalisons vos projets résidentiels, commerciaux et industriels avec les meilleurs matériaux.",
    items: ["Construction neuve", "Gros œuvre", "Génie civil", "Infrastructures"],
    color: "from-blue-900/60 to-[#001F3F]",
    accent: "#FF8C00",
    size: "lg:col-span-2",
  },
  {
    icon: Landmark,
    title: "Aménagement Foncier",
    description: "Lotissements, VRD, terrassement et adduction d'eau. Nous transformons vos terrains en espaces viabilisés.",
    items: ["Lotissements", "VRD", "Terrassement", "Adduction d'eau"],
    color: "from-[#1a3a5c]/80 to-[#001F3F]",
    accent: "#FF8C00",
    size: "",
  },
  {
    icon: Wrench,
    title: "Rénovation & Second Œuvre",
    description: "Étanchéité, peinture, carrelage, électricité et climatisation pour sublimer vos espaces existants.",
    items: ["Étanchéité", "Peinture", "Carrelage", "Électricité", "Climatisation"],
    color: "from-[#1a3a5c]/80 to-[#001F3F]",
    accent: "#FF8C00",
    size: "",
  },
  {
    icon: Leaf,
    title: "Design & Espaces Verts",
    description: "Décoration intérieure, jardinage et aménagement paysager pour créer des environnements inspirants.",
    items: ["Décoration intérieure", "Jardinage", "Aménagement paysager"],
    color: "from-green-900/40 to-[#001F3F]",
    accent: "#FF8C00",
    size: "lg:col-span-2",
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: easeOut },
  }),
};

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-28 bg-[#001F3F] relative">
      {/* Fond déco */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF8C00]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#FF8C00] text-xs font-bold uppercase tracking-widest">Nos pôles</span>
          <h2 className="text-3xl md:text-5xl font-black text-white mt-2">
            Nos Domaines d&apos;<span className="text-[#FF8C00]">Expertise</span>
          </h2>
          <p className="text-white/60 mt-4 max-w-xl mx-auto">
            De la conception à la livraison, NH CONSTRUCTION PLUS intervient sur tous les aspects de votre projet.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -4 }}
                className={`group relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br ${service.color} p-6 md:p-8 cursor-default ${service.size}`}
              >
                {/* Glow hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#FF8C00]/10 to-transparent rounded-2xl" />

                {/* Icône */}
                <div className="w-12 h-12 rounded-xl bg-[#FF8C00]/20 border border-[#FF8C00]/30 flex items-center justify-center mb-5">
                  <Icon size={22} className="text-[#FF8C00]" />
                </div>

                <h3 className="text-white font-black text-xl mb-3">{service.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-5">{service.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {service.items.map((item) => (
                    <span
                      key={item}
                      className="text-xs bg-white/10 border border-white/10 text-white/70 px-3 py-1 rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                {/* Ligne déco bas */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#FF8C00] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
