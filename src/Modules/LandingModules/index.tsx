import CountdownSection from "./section/CountdownSection";
import FAQPage from "./section/Faq";
import TestimonyPage from "./section/Testimony";
import WhatIsDDP0 from "./section/WhatIsDDP0";
import Hero from "./section/Hero";
import Timeline from "./section/Timeline";
import { AnimatedSection } from "@/components/AnimatedSection";

const LandingModules = () => {
  return (
    <main className="flex flex-col gap-40 max-lg:gap-30 max-sm:gap-20 overflow-hidden">
      <AnimatedSection animation="fadeInUp" delay={200}>
        <Hero />
      </AnimatedSection>

      <AnimatedSection animation="fadeInUp" delay={200}>
        <WhatIsDDP0 />
      </AnimatedSection>
      <div>
        <AnimatedSection animation="fadeInLeft" delay={100}>
          <Timeline />
        </AnimatedSection>
        <AnimatedSection animation="fadeInRight" delay={300}>
          <CountdownSection />
        </AnimatedSection>
      </div>
      <AnimatedSection animation="zoomIn" delay={150}>
        <TestimonyPage />
      </AnimatedSection>
      <AnimatedSection animation="fadeInUp" delay={250}>
        <FAQPage />
      </AnimatedSection>
    </main>
  );
};
export default LandingModules;
