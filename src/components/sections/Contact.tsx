"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", project: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#00172e] relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF8C00]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-[#FF8C00] text-xs font-bold uppercase tracking-widest">Contactez-nous</span>
          <h2 className="text-3xl md:text-5xl font-black text-white mt-2">
            Démarrons votre <span className="text-[#FF8C00]">projet</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          {/* Coordonnées */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {[
              { icon: Phone, label: "Téléphone", value: "+225 XX XX XX XX XX", href: "tel:+225XXXXXXXXXX" },
              { icon: Mail, label: "Email", value: "contact@nh-construction-plus.ci", href: "mailto:contact@nh-construction-plus.ci" },
              { icon: MapPin, label: "Adresse", value: "Koumassi, Face Cité Pangolin\nBP 526 Abidjan 26", href: "https://maps.google.com/?q=Koumassi+Abidjan" },
            ].map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-start gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FF8C00]/20 border border-[#FF8C00]/30 flex items-center justify-center shrink-0 group-hover:bg-[#FF8C00]/30 transition-colors">
                  <Icon size={20} className="text-[#FF8C00]" />
                </div>
                <div>
                  <p className="text-white/50 text-xs uppercase tracking-widest mb-1">{label}</p>
                  <p className="text-white font-semibold whitespace-pre-line">{value}</p>
                </div>
              </a>
            ))}

            {/* Google Maps embed placeholder */}
            <div className="w-full h-52 rounded-xl overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center">
              <iframe
                src="https://maps.google.com/maps?q=Koumassi+Abidjan+Cote+d+Ivoire&output=embed&z=13"
                className="w-full h-full"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title="NH Construction Plus - Localisation"
              />
            </div>
          </motion.div>

          {/* Formulaire */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {status === "sent" ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-white/5 border border-[#FF8C00]/30 rounded-2xl">
                <div className="w-16 h-16 rounded-full bg-[#FF8C00]/20 flex items-center justify-center mb-4">
                  <Send size={28} className="text-[#FF8C00]" />
                </div>
                <h3 className="text-white font-black text-xl mb-2">Message envoyé !</h3>
                <p className="text-white/60">Nous vous répondrons dans les plus brefs délais.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/60 text-xs uppercase tracking-widest mb-1.5 block">Nom complet *</label>
                    <input
                      name="name" required value={form.name} onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 focus:border-[#FF8C00]/60 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-xs uppercase tracking-widest mb-1.5 block">Téléphone</label>
                    <input
                      name="phone" value={form.phone} onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 focus:border-[#FF8C00]/60 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
                      placeholder="+225 XX XX XX XX"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-white/60 text-xs uppercase tracking-widest mb-1.5 block">Email *</label>
                  <input
                    name="email" type="email" required value={form.email} onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 focus:border-[#FF8C00]/60 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
                    placeholder="votre@email.com"
                  />
                </div>
                <div>
                  <label className="text-white/60 text-xs uppercase tracking-widest mb-1.5 block">Type de projet *</label>
                  <select
                    name="project" required value={form.project} onChange={handleChange}
                    className="w-full bg-[#001F3F] border border-white/10 focus:border-[#FF8C00]/60 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
                  >
                    <option value="">Sélectionner...</option>
                    <option value="construction">Construction neuve</option>
                    <option value="renovation">Rénovation</option>
                    <option value="amenagement">Aménagement foncier</option>
                    <option value="design">Design & Espaces verts</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
                <div>
                  <label className="text-white/60 text-xs uppercase tracking-widest mb-1.5 block">Message</label>
                  <textarea
                    name="message" rows={4} value={form.message} onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 focus:border-[#FF8C00]/60 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors resize-none"
                    placeholder="Décrivez votre projet..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full bg-[#FF8C00] hover:bg-[#e07b00] disabled:opacity-60 text-white font-black py-4 rounded-xl transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-2 shadow-xl shadow-orange-900/30"
                >
                  <Send size={16} />
                  {status === "sending" ? "Envoi en cours..." : "Envoyer ma demande"}
                </button>
                {status === "error" && (
                  <p className="text-red-400 text-sm text-center">Une erreur s&apos;est produite. Réessayez.</p>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
