import CountdownSection from "./section/CountdownSection";
import FAQPage from "./section/Faq";
import TestimonyPage from "./section/Testimony";
import WhatIsDDP0 from "./section/WhatIsDDP0";

const LandingModules = () => {
  return (
    <main className="flex flex-col overflow-hidden">
      <WhatIsDDP0 />
      <CountdownSection />
      <TestimonyPage />
      <FAQPage />
    </main>
  );
};
export default LandingModules;
