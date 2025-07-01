import { toast } from "sonner";
import { Loader2, CheckCircle, XCircle, Info, X } from "lucide-react";
import { useCallback } from "react";

type ToastType = "success" | "error" | "info" | "warning" | "loading";

export const useToast = () => {
  const show = useCallback(
    (
      type: ToastType,
      message?: string,
      opts?: { id?: string; duration?: number }
    ): string => {
      const { id, duration } = opts || {};

      const toastId = id ?? crypto.randomUUID(); // Auto generate jika tidak ada

      const base = (
        <div className="p-[1px] rounded-xl bg-component-border">
          <div className="w-full h-full bg-component-frame rounded-xl">
            <div
              className="relative w-full h-full flex items-center gap-3 p-4 rounded-xl shadow-lg text-white glass transition-all overflow-hidden"
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
                    : "linear-gradient(90deg, rgba(154, 231, 184, 0.30) 0.39%, rgba(118, 118, 118, 0.30) 100.53%)",
              }}
            >
              <div className="relative z-10 flex items-center gap-3">
                {type === "info" && <Info className="w-5 h-5" />}
                {type === "success" && <CheckCircle className="w-5 h-5" />}
                {type === "warning" && <Info className="w-5 h-5" />}
                {type === "error" && <XCircle className="w-5 h-5" />}
                {type === "loading" && (
                  <Loader2 className="w-5 h-5 animate-spin" />
                )}
                <div className="flex flex-col gap-1 font-josefin-sans font-semibold">
                  <h1 className="text-bodyLarge max-md:text-bodyLarge-mobile">
                    {
                      {
                        info: "Info",
                        success: "Success",
                        warning: "Warning",
                        error: "Error!",
                        loading: "Loading...",
                      }[type]
                    }
                  </h1>
                  {message && (
                    <span className="text-caption max-sm:text-caption-mobile">
                      {message}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => toast.dismiss(toastId)}
                className="absolute top-2 right-2 text-gray-400 hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      );

      toast.custom(() => base, {
        id: toastId,
        duration: type === "loading" ? Infinity : duration || 3000,
      });

      return toastId;
    },
    []
  );

  const dismiss = useCallback((id?: string) => {
    toast.dismiss(id);
  }, []);

  return {
    show,
    dismiss,
  };
};
