"use client";

import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";
import GoogleTranslate from "@/components/GoogleTranslate";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import RatingSection from "@/components/RatingSection";

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <SessionProvider><main className="min-h-screen">{children}</main></SessionProvider>;
  }

  return (
    <SessionProvider>
      <GoogleTranslate />
      <Navbar />
      <main className="min-h-screen pb-[88px] pt-0 lg:pb-0 lg:pt-24">{children}</main>
      <RatingSection />
      <SiteFooter />
    </SessionProvider>
  );
}
