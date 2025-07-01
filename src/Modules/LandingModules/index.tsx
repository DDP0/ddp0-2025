import CountdownSection from "./section/CountdownSection";
import FAQPage from "./section/Faq";

const LandingModules = () => {
  return (
    <main className="flex flex-col">
      <CountdownSection />
      <FAQPage />
    </main>
  );
};
export default LandingModules;
