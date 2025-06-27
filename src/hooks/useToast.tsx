import { toast } from "sonner";
import { Loader2, CheckCircle, XCircle, Info, X } from "lucide-react";
import { useCallback } from "react";

type ToastType = "success" | "error" | "info" | "warning" | "loading";

export const useToast = () => {
  const show = useCallback(
    (
      type: ToastType,
      message?: string,
      opts?: { id?: number; duration?: number }
    ) => {
      const { id, duration } = opts || {};

      const base = (
        <div className="p-[1px] rounded-xl bg-component-border">
          <div className="w-full h-full bg-component-frame rounded-xl">
            <div
              className="relative w-full h-full flex items-center gap-3 p-4 rounded-xl shadow-lg text-white glass transition-all overflow-hidden glass"
              style={{
                background:
                  type === "info"
                    ? "linear-gradient(90deg, rgba(129, 190, 255, 0.30) 0.39%, rgba(118, 118, 118, 0.30) 100.53%)"
                    : type === "success"
                    ? "linear-gradient(90deg, rgba(154, 231, 184, 0.30) 0.39%, rgba(118, 118, 118, 0.30) 100.53%)"
                    : type === "warning"
                    ? "linear-gradient(90deg, rgba(254, 200, 136, 0.30) 0.39%, rgba(118, 118, 118, 0.30) 100.53%)"
                    : type === "error"
                    ? "linear-gradient(90deg, rgba(213, 54, 54, 0.30) 0.39%, rgba(118, 118, 118, 0.30) 100.53%)"
                    : "linear-gradient(90deg, rgba(154, 231, 184, 0.30)0.39%, rgba(118, 118, 118, 0.30) 100.53%)",
                // boxShadow:
                //   "0px 48px 100px 0px rgba(255, 255, 255, 0.15) inset, 0px 4px 8px 0px rgba(0, 0, 0, 0.05), 0px 16px 32px 0px rgba(0, 0, 0, 0.05), 0px 32px 64px 0px rgba(0, 0, 0, 0.10)",
              }}
            >
              <div className="relative z-10 flex items-center gap-3">
                {type === "info" && <Info className="w-5 h-5" />}
                {type === "success" && <CheckCircle className="w-5 h-5 " />}
                {type === "warning" && <Info className="w-5 h-5" />}
                {type === "error" && <XCircle className="w-5 h-5 " />}
                {type === "loading" && (
                  <Loader2 className="w-5 h-5 animate-spin" />
                )}
                <div className="flex flex-col gap-1 font-josefin-sans font-semibold">
                  <h1 className="text-bodyLarge max-md:text-bodyLarge-mobile">
                    {type === "info" && "Info"}
                    {type === "success" && "Success"}
                    {type === "warning" && "Warning"}
                    {type === "error" && "Error!"}
                    {type === "loading" && "Loading..."}
                  </h1>
                  {message && (
                    <span className="text-caption max-sm:text-caption-mobile">
                      {message}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => toast.dismiss(id)}
                className="absolute top-2 right-2 text-gray-400 hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      );

      return toast.custom(() => base, {
        id,
        duration: type === "loading" ? Infinity : duration || 3000,
      });
    },
    []
  );

  const dismiss = useCallback((id?: number) => {
    toast.dismiss(id);
  }, []);

  return {
    show,
    dismiss,
  };
};
