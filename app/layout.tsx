import "./globals.css";
import { Pixelify_Sans, VT323, Titan_One } from "next/font/google";
import PageTransition from "@/components/PageTransition";
import BackgroundMusic from "@/components/BackgroundMusic";

const pixelifySans = Pixelify_Sans({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-pixel-display",
});

const vt323 = VT323({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pixel-body",
});

const titanOne = Titan_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-title",
});

export const metadata = {
  title: "GitMon",
  description: "Transforme seu perfil GitHub em uma carta colecionável",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${pixelifySans.variable} ${vt323.variable} ${titanOne.variable}`}
    >
      <body>
        <BackgroundMusic />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}