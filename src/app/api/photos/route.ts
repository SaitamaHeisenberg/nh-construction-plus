import { NextRequest, NextResponse } from "next/server";
import { writeFile, readFile, unlink, mkdir } from "fs/promises";
import { existsSync } from "fs";
import { join } from "path";

const PHOTOS_DIR = join(process.cwd(), "public", "images", "portfolio");
const META_FILE = join(process.cwd(), "data", "photos.json");

async function ensureDirs() {
  if (!existsSync(PHOTOS_DIR)) await mkdir(PHOTOS_DIR, { recursive: true });
  const dataDir = join(process.cwd(), "data");
  if (!existsSync(dataDir)) await mkdir(dataDir, { recursive: true });
}

// GET — liste des photos
export async function GET() {
  await ensureDirs();
  try {
    const raw = await readFile(META_FILE, "utf-8");
    return NextResponse.json(JSON.parse(raw));
  } catch {
    return NextResponse.json([]);
  }
}

// POST — upload photo
export async function POST(req: NextRequest) {
  await ensureDirs();
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;

    if (!file || !title || !category) {
      return NextResponse.json({ error: "Données manquantes" }, { status: 400 });
    }

    const ext = file.name.split(".").pop();
    const filename = `${Date.now()}-${title.replace(/\s+/g, "-").toLowerCase()}.${ext}`;
    const bytes = await file.arrayBuffer();
    await writeFile(join(PHOTOS_DIR, filename), Buffer.from(bytes));

    // Mise à jour du fichier de métadonnées
    let photos: object[] = [];
    try {
      const raw = await readFile(META_FILE, "utf-8");
      photos = JSON.parse(raw);
    } catch { /* first time */ }

    const newPhoto = {
      id: Date.now(),
      title,
      category,
      src: `/images/portfolio/${filename}`,
      createdAt: new Date().toISOString(),
    };
    photos.push(newPhoto);
    await writeFile(META_FILE, JSON.stringify(photos, null, 2));

    return NextResponse.json(newPhoto);
  } catch (err) {
    console.error("Erreur upload:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// DELETE — supprimer photo
export async function DELETE(req: NextRequest) {
  await ensureDirs();
  try {
    const { id } = await req.json();
    const raw = await readFile(META_FILE, "utf-8");
    const photos: { id: number; src: string }[] = JSON.parse(raw);
    const photo = photos.find((p) => p.id === id);
    if (!photo) return NextResponse.json({ error: "Photo introuvable" }, { status: 404 });

    // Suppression du fichier
    const filePath = join(process.cwd(), "public", photo.src);
    try { await unlink(filePath); } catch { /* déjà supprimé */ }

    const updated = photos.filter((p) => p.id !== id);
    await writeFile(META_FILE, JSON.stringify(updated, null, 2));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Erreur delete:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
