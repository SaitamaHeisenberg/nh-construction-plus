import { NextRequest, NextResponse } from "next/server";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

// Sauvegarde locale des demandes (fichier JSON)
// SMTP à configurer plus tard
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, email, phone, project, message } = data;

    if (!name || !email || !project) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    // Stockage dans un fichier JSON local
    const dataDir = join(process.cwd(), "data");
    if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true });

    const filePath = join(dataDir, "demandes.json");
    let demandes: object[] = [];
    if (existsSync(filePath)) {
      const raw = require("fs").readFileSync(filePath, "utf-8");
      demandes = JSON.parse(raw);
    }

    demandes.push({
      id: Date.now(),
      date: new Date().toISOString(),
      name,
      email,
      phone,
      project,
      message,
    });

    writeFileSync(filePath, JSON.stringify(demandes, null, 2));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Erreur contact:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const filePath = join(process.cwd(), "data", "demandes.json");
    if (!existsSync(filePath)) return NextResponse.json([]);
    const raw = require("fs").readFileSync(filePath, "utf-8");
    return NextResponse.json(JSON.parse(raw));
  } catch {
    return NextResponse.json([]);
  }
}
