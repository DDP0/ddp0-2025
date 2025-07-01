import Background from "@/Modules/RegistModules/Background";
const Loader = () => {
  return (
    <div className="min-h-screen overflow-hidden relative flex items-center justify-center">
      <div className="loader"></div>
      <Background />
    </div>
  );
};
export default Loader;
