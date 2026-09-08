import type { Metadata } from "next";
import { Playfair_Display, Noto_Serif_KR, Nanum_Pen_Script } from "next/font/google";
import "./globals.css";
import MobileShell from "@/components/layout/MobileShell";
import { AudioProvider } from "@/components/audio/AudioProvider";
import { ToastProvider } from "@/components/ui/ToastProvider";
import { invitationData } from "@/config/invitationData";

const playfair = Playfair_Display({
  variable: "--font-display-raw",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const notoSerifKr = Noto_Serif_KR({
  variable: "--font-serif-kr-raw",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const nanumPenScript = Nanum_Pen_Script({
  variable: "--font-hand-raw",
  subsets: ["latin"],
  weight: "400",
});

const deployedHost = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
const siteUrl = deployedHost ? `https://${deployedHost}` : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: invitationData.meta.siteTitle,
  description: invitationData.meta.ogDescription,
  openGraph: {
    title: invitationData.meta.siteTitle,
    description: invitationData.meta.ogDescription,
    images: [invitationData.meta.ogImageUrl],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${playfair.variable} ${notoSerifKr.variable} ${nanumPenScript.variable} h-full antialiased`}
    >
      <body className="min-h-full font-serif-kr text-stone-800">
        <AudioProvider>
          <ToastProvider>
            <MobileShell>{children}</MobileShell>
          </ToastProvider>
        </AudioProvider>
      </body>
    </html>
  );
}
