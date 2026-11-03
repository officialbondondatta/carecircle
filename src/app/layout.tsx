import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";


const josefin_sans = Josefin_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Care Circle",
  description: "Care Circle | Connecting people through care, support, and community.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${josefin_sans.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-carecircle-bg">
        <TooltipProvider>
          <Navbar></Navbar>
          {children}
          <Footer></Footer>
          <Toaster position="top-right" richColors />
        </TooltipProvider>
      </body>
    </html>
  );
}
