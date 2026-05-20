import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AIChatBubble } from "@/components/AIChatBubble";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-ink-950 text-white">
      <Navbar />
      {children}
      <Footer />
      <AIChatBubble />
    </div>
  );
}
