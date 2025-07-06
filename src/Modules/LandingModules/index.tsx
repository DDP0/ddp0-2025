import CountdownSection from "./section/CountdownSection";
import FAQPage from "./section/Faq";
import WhatIsDDP0 from "./section/WhatIsDDP0";
import Hero from "./section/Hero";

const LandingModules = () => {
  return (
    <main className="flex flex-col gap-40">
      <Hero/>
      <WhatIsDDP0 />
      <CountdownSection />
      <FAQPage />
    </main>
  );
};
export default LandingModules;
