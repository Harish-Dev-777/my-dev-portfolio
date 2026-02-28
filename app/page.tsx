import Hero from "@/components/web/sections/hero";
import Silence from "@/components/web/sections/silence";
import FirstStep from "@/components/web/sections/firstStep";
import { StormSection } from "@/components/web/sections/stromSection";
import { ClimbSection } from "@/components/web/sections/climbSection";
import HorizontalScroll from "@/components/web/sections/HorizontalScroll";
import AboutMeSection from "@/components/web/sections/AboutMe";
import SkillsSection from "@/components/web/sections/SkillsSection";
import PassionSection from "@/components/web/sections/PassionSection";
import ServicesSection from "@/components/web/sections/ServicesSection";
import ProjectsSection from "@/components/web/sections/ProjectsSection";
import ContactSection from "@/components/web/sections/ContactSection";
import Footer from "@/components/web/Footer";
import Navbar from "@/components/web/Navbar";

const page = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <Silence />
      <FirstStep />
      <StormSection />
      <ClimbSection />
      <HorizontalScroll>
        <AboutMeSection />
        <SkillsSection />
        <PassionSection />
      </HorizontalScroll>
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default page;
