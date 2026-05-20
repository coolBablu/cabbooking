import { Hero } from "@/components/sections/Hero";
import { LiveBooking } from "@/components/sections/LiveBooking";
import { Services } from "@/components/sections/Services";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { AppShowcase } from "@/components/sections/AppShowcase";
import { DriverPartner } from "@/components/sections/DriverPartner";
import { Testimonials } from "@/components/sections/Testimonials";
import { Stats } from "@/components/sections/Stats";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Preloader } from "@/components/Preloader";

export default function HomePage() {
  return (
    <>
      <Preloader />
      <Hero />
      <LiveBooking />
      <Services />
      <WhyChooseUs />
      <AppShowcase />
      <DriverPartner />
      <Testimonials />
      <Stats />
      <FAQ />
      <FinalCTA />
    </>
  );
}
