import CountdownSection from "./section/CountdownSection";
import FAQPage from "./section/Faq";
import WhatIsDDP0 from "./section/WhatIsDDP0";

const LandingModules = () => {
  return (
    <main className="flex flex-col">
      <WhatIsDDP0 />
      <CountdownSection />
      <FAQPage />
    </main>
  );
};
export default LandingModules;
