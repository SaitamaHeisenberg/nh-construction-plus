"use client";
import { useState, useEffect, useRef } from "react";
import { Trash2, Upload, ImageIcon, FileText, RefreshCw } from "lucide-react";

type Photo = { id: number; title: string; category: string; src: string; createdAt: string };
type Demande = { id: number; date: string; name: string; email: string; phone: string; project: string; message: string };

const categories = ["Construction", "Rénovation", "Aménagement", "Design"];

export default function AdminPage() {
  const [tab, setTab] = useState<"photos" | "demandes">("photos");
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [demandes, setDemandes] = useState<Demande[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({ title: "", category: "Construction" });
  const fileRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    setLoading(true);
    const [pRes, dRes] = await Promise.all([fetch("/api/photos"), fetch("/api/contact")]);
    setPhotos(await pRes.json());
    setDemandes(await dRes.json());
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    const file = fileRef.current?.files?.[0];
    if (!file || !form.title) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("title", form.title);
    fd.append("category", form.category);
    await fetch("/api/photos", { method: "POST", body: fd });
    setForm({ title: "", category: "Construction" });
    if (fileRef.current) fileRef.current.value = "";
    await load();
    setUploading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Supprimer cette photo ?")) return;
    await fetch("/api/photos", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    await load();
  };

  return (
    <div className="min-h-screen bg-[#000d1a] text-white">
      {/* Header admin */}
      <div className="bg-[#001F3F] border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="font-black text-xl">NH CONSTRUCTION PLUS</h1>
          <p className="text-white/50 text-xs">Panneau d&apos;administration</p>
        </div>
        <a href="/" className="text-[#FF8C00] text-sm hover:underline">← Voir le site</a>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-white/10 pb-0">
          {([["photos", "Galerie Photos", ImageIcon], ["demandes", "Demandes de devis", FileText]] as const).map(([key, label, Icon]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 transition-colors ${
                tab === key ? "border-[#FF8C00] text-[#FF8C00]" : "border-transparent text-white/50 hover:text-white"
              }`}
            >
              <Icon size={16} />
              {label}
              {key === "demandes" && demandes.length > 0 && (
                <span className="bg-[#FF8C00] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {demandes.length}
                </span>
              )}
            </button>
          ))}
          <button onClick={load} className="ml-auto text-white/40 hover:text-white p-2">
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>
        </div>

        {/* Onglet Photos */}
        {tab === "photos" && (
          <div className="space-y-8">
            {/* Formulaire upload */}
            <form onSubmit={handleUpload} className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="font-black text-lg mb-5 flex items-center gap-2">
                <Upload size={18} className="text-[#FF8C00]" />
                Ajouter une photo
              </h2>
              <div className="grid sm:grid-cols-3 gap-4 mb-4">
                <input
                  required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Titre du projet"
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#FF8C00]/60"
                />
                <select
                  value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="bg-[#001F3F] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#FF8C00]/60"
                >
                  {categories.map((c) => <option key={c}>{c}</option>)}
                </select>
                <input
                  ref={fileRef} type="file" accept="image/*" required
                  className="text-sm text-white/60 file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:bg-[#FF8C00] file:text-white file:text-xs file:font-bold file:cursor-pointer"
                />
              </div>
              <button
                type="submit" disabled={uploading}
                className="bg-[#FF8C00] hover:bg-[#e07b00] disabled:opacity-60 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors"
              >
                {uploading ? "Upload en cours..." : "Ajouter au portfolio"}
              </button>
            </form>

            {/* Grille photos */}
            {photos.length === 0 ? (
              <p className="text-white/40 text-center py-12">Aucune photo pour l&apos;instant.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {photos.map((photo) => (
                  <div key={photo.id} className="group relative rounded-xl overflow-hidden aspect-square bg-white/5 border border-white/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={photo.src} alt={photo.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                      <p className="text-white font-bold text-xs text-center">{photo.title}</p>
                      <span className="text-[#FF8C00] text-xs">{photo.category}</span>
                      <button
                        onClick={() => handleDelete(photo.id)}
                        className="bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-lg"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Onglet Demandes */}
        {tab === "demandes" && (
          <div className="space-y-4">
            {demandes.length === 0 ? (
              <p className="text-white/40 text-center py-12">Aucune demande reçue.</p>
            ) : (
              [...demandes].reverse().map((d) => (
                <div key={d.id} className="bg-white/5 border border-white/10 rounded-xl p-5">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="font-bold text-white">{d.name}</h3>
                      <p className="text-white/50 text-xs">{new Date(d.date).toLocaleDateString("fr-FR", { dateStyle: "long" })}</p>
                    </div>
                    <span className="bg-[#FF8C00]/20 border border-[#FF8C00]/30 text-[#FF8C00] text-xs font-bold px-3 py-1 rounded-full capitalize">
                      {d.project}
                    </span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-2 text-sm mb-3">
                    <p><span className="text-white/40">Email : </span><span className="text-white">{d.email}</span></p>
                    {d.phone && <p><span className="text-white/40">Tél : </span><span className="text-white">{d.phone}</span></p>}
                  </div>
                  {d.message && <p className="text-white/70 text-sm border-t border-white/10 pt-3">{d.message}</p>}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
