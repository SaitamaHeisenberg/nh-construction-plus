import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "NH CONSTRUCTION PLUS | BTP & Aménagement Foncier à Abidjan",
  description:
    "NH CONSTRUCTION PLUS : Expert en construction, génie civil, aménagement foncier et rénovation à Abidjan, Côte d'Ivoire. Demandez votre devis gratuit.",
  keywords: "BTP Abidjan, construction Côte d'Ivoire, génie civil, aménagement foncier, rénovation, NH Construction",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={montserrat.variable}>
      <body className="antialiased font-[var(--font-montserrat)]">
        {children}
      </body>
    </html>
  );
}
