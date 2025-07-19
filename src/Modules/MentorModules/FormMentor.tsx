"use client";
import { useState } from "react";
import Background from "../RegistModules/Background";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";
import { mentorSchema } from "@/model/mentor.schema";

const jurusanList = [
  { value: "IlmuKomputer", label: "Ilmu Komputer" },
  { value: "SistemInformasi", label: "Sistem Informasi" },
  { value: "KKI", label: "KKI" },
];

const FormMentor = () => {
  const router = useRouter();
  const { show, dismiss } = useToast();
  const [namaLengkap, setNamaLengkap] = useState("");
  const [npm, setNpm] = useState("");
  const [idLine, setIdLine] = useState("");
  const [idDiscord, setIdDiscord] = useState("");
  const [jurusan, setJurusan] = useState(jurusanList[0]);
  const handleSubmit = async () => {
    const toastId = show("loading", "Sedang memproses data...");
    const formData = {
      namaLengkap,
      npm,
      idLine,
      idDiscord,
      jurusan: jurusan.value,
    };
    console.log(formData);
    const validation = mentorSchema.safeParse(formData);
    if (!validation.success) {
      dismiss(toastId);
      for (const error of validation.error.errors) {
        show("error", error.message);
      }
      console.log("Validation errors:", validation.error.errors);
      return;
    }
    const res = await fetch("/api/user?mentor=true", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validation.data),
    });
    dismiss(toastId);
    if (!res.ok) {
      show("error", "Terjadi kesalahan saat mengirim data");
      return;
    }
    show("success", "Registrasi Mentor berhasil!");
    router.push("/dashboard");
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center w-full overflow-hidden py-32 max-md:py-28 px-20 max-lg:px-14 max-md:px-10 max-sm:px-5 font-josefin-sans">
      <div className="flex flex-col gap-8 max-sm:gap-6">
        <div className="flex flex-col gap-1">
          <h3 className="text-h3 max-lg:text-h4 max-sm:text-h5-mobile">
            Saatnya Memulai Petualangan Serumu di DDP-0!
          </h3>
          <h4 className="text-h4 max-lg:text-h5 max-sm:text-headline-mobile">
            Lengkapi Data Diri Kamu!
          </h4>
        </div>
        <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-12 max-sm:gap-0">
          <div className="flex flex-col gap-6 max-sm:mb-6">
            <Input
              value={namaLengkap}
              onChange={(e) => setNamaLengkap(e.target.value)}
              placeholder="Enter your name"
              label="Nama Lengkap"
            />
            <Input
              value={npm}
              onChange={(e) => setNpm(e.target.value)}
              placeholder="Enter your NPM"
              label="NPM"
            />
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-6 w-full">
              <Input
                className="w-full"
                value={idLine}
                onChange={(e) => setIdLine(e.target.value)}
                placeholder="Enter your Id Line"
                label="Id Line"
              />
              <Input
                className="w-full"
                value={idDiscord}
                onChange={(e) => setIdDiscord(e.target.value)}
                placeholder="Enter your Id Discord"
                label="Id Discord"
              />
            </div>
            <div>
              <Label className="mb-2">Jurusan</Label>
              <div className="grid grid-cols-3 max-lg:grid-cols-2 gap-3">
                {jurusanList.map((jurusanItem) => (
                  <button
                    key={jurusanItem.value}
                    onClick={(e) => {
                      e.preventDefault();
                      setJurusan(jurusanItem);
                    }}
                    className={`rounded-xl py-2 border-2 text-base ${
                      jurusan.value === jurusanItem.value
                        ? "border-[#C99BDB] bg-clip-text bg-gradient-retro-wave text-transparent"
                        : "border-neutral-100"
                    } cursor-pointer text-center`}
                  >
                    {jurusanItem.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div>
          <Button
            variant={"kiwi"}
            className="py-4 px-6 max-sm:py-2 max-sm:px-4"
            onClick={handleSubmit}
          >
            Register Now
          </Button>
        </div>
      </div>
      <Background />
    </div>
  );
};
export default FormMentor;
