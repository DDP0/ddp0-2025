"use client";
import { useState } from "react";
import Background from "./Background";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { registFillDetailsSchema } from "@/model/user.schema";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";

const jalurMasuk = [
  { value: "SNBP", label: "SNBP" },
  { value: "SNBT", label: "SNBT" },
  { value: "PPKB", label: "PPKB" },
  { value: "SimakUI", label: "Simak UI" },
  { value: "SimakKKI", label: "Simak KKI" },
  { value: "TalentScouting", label: "Talent Scouting" },
  { value: "Prestasi", label: "Prestasi" },
];
const jurusanList = [
  { value: "IlmuKomputer", label: "Ilmu Komputer" },
  { value: "SistemInformasi", label: "Sistem Informasi" },
  { value: "KKI", label: "KKI" },
];
const Gender = [
  { value: "Male", label: "Laki-laki" },
  { value: "Female", label: "Perempuan" },
];

const RegistFillDetails = () => {
  const router = useRouter();
  const { show, dismiss } = useToast();
  const [namaLengkap, setNamaLengkap] = useState("");
  const [npm, setNpm] = useState("");
  const [idLine, setIdLine] = useState("");
  const [idDiscord, setIdDiscord] = useState("");
  const [screenshotBuktiMasuk, setScreenshotBuktiMasuk] = useState("");
  const [screenshotBuktiShareIG, setScreenshotBuktiShareIG] = useState("");
  const [jalur, setJalur] = useState<string>("");
  const [jurusan, setJurusan] = useState(jurusanList[0]);
  const [gender, setGender] = useState(Gender[0]);
  const [asalSekolah, setAsalSekolah] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async () => {
    setIsSubmitting(true);
    const toastId = show("loading", "Sedang memproses data...");
    const formData = {
      namaLengkap,
      npm,
      idLine,
      idDiscord,
      screenshotBuktiMasuk,
      screenshotBuktiShareIG,
      jalurMasuk: jalur,
      jurusan: jurusan.value,
      gender: gender.value,
      asalSekolah,
    };
    console.log(formData);
    const validation = registFillDetailsSchema.safeParse(formData);
    if (!validation.success) {
      dismiss(toastId);
      for (const error of validation.error.errors) {
        show("error", error.message);
      }
      console.log("Validation errors:", validation.error.errors);
      setIsSubmitting(false);
      return;
    }
    const res = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validation.data),
    });
    dismiss(toastId);
    if (!res.ok) {
      show("error", "Terjadi kesalahan saat mengirim data");
      setIsSubmitting(false);
      return;
    }
    show("success", "Registrasi berhasil!");
    router.push("/dashboard");
    setIsSubmitting(false);
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
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white">
                Screenshot bukti masuk Fasilkom (Gdrive)
              </label>
              <Input
                value={screenshotBuktiMasuk}
                onChange={(e) => setScreenshotBuktiMasuk(e.target.value)}
                placeholder="Enter Gdrive link"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-white">
                Screenshot bukti share Instagram (Gdrive) —{" "}
                <a
                  href="https://docs.google.com/document/d/1xAMlEJV1hfA81-CFM2ukc6T41bSLlk2nz4Tj8QkIqtM/edit?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-300 hover:text-blue-100"
                >
                  Lihat panduan
                </a>
              </label>
              <Input
                value={screenshotBuktiShareIG}
                onChange={(e) => setScreenshotBuktiShareIG(e.target.value)}
                placeholder="Enter Gdrive link"
              />
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div>
              <Label className="mb-2" htmlFor="jalur">
                Jalur Masuk
              </Label>
              <Select value={jalur} onValueChange={setJalur}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose your option" />
                </SelectTrigger>
                <SelectContent>
                  {jalurMasuk.map((jalurItem) => (
                    <SelectItem key={jalurItem.value} value={jalurItem.value}>
                      {jalurItem.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
            <div>
              <Label className="mb-2">Gender</Label>
              <div className="grid grid-cols-3 max-lg:grid-cols-2 gap-3">
                {Gender.map((genderItem) => (
                  <button
                    key={genderItem.value}
                    onClick={(e) => {
                      e.preventDefault();
                      setGender(genderItem);
                    }}
                    className={`rounded-xl py-2 border-2 text-base ${
                      gender.value === genderItem.value
                        ? "border-[#C99BDB] bg-clip-text bg-gradient-retro-wave text-transparent"
                        : "border-neutral-100"
                    } cursor-pointer text-center`}
                  >
                    {genderItem.label}
                  </button>
                ))}
              </div>
            </div>
            <Input
              value={asalSekolah}
              onChange={(e) => setAsalSekolah(e.target.value)}
              placeholder="Enter your school name"
              label="Asal Sekolah"
            />
          </div>
        </div>
        <div>
          <Button
            variant={"kiwi"}
            className="py-4 px-6 max-sm:py-2 max-sm:px-4"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            Register Now
          </Button>
        </div>
      </div>
      <Background />
    </div>
  );
};
export default RegistFillDetails;
