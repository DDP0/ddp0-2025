import CountdownSection from "./section/CountdownSection";
import FAQPage from "./section/Faq";
import TestimonyPage from "./section/Testimony";
import WhatIsDDP0 from "./section/WhatIsDDP0";
import Hero from "./section/Hero";
import Timeline from "./section/Timeline";

const LandingModules = () => {
  return (
    <main className="flex flex-col gap-40 overflow-hidden">
      <Hero />
      <WhatIsDDP0 />
      <div>
        <Timeline />
        <CountdownSection />
      </div>
      <TestimonyPage />
      <FAQPage />
    </main>
  );
};
export default LandingModules;
