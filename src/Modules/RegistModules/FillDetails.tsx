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
  const [jurusan, setJurusan] = useState<(typeof jurusanList)[number]>(
    jurusanList[0]
  );
  const [gender, setGender] = useState<(typeof Gender)[number]>(Gender[0]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden py-32 max-md:py-28 px-20 max-lg:px-14 max-md:px-10 max-sm:px-5 font-josefin-sans">
      <div className="flex flex-col gap-8 max-sm:gap-6">
        <div className="flex flex-col gap-1">
          <h3 className="text-h3 max-lg:text-h4 max-sm:text-h5-mobile">
            Saatnya Memulai Petualangan Serumu di DDP-0!
          </h3>
          <h4 className="text-h4 max-lg:text-h5 max-sm:text-headline-mobile">
            Lengkapi Data Diri Kamu!
          </h4>
        </div>
        <form className="grid grid-cols-2 max-sm:grid-cols-1 gap-12 max-sm:gap-0">
          <div className="flex flex-col gap-6 max-sm:mb-6">
            <Input placeholder="Enter your name" label="Nama Lengkap" />
            <Input placeholder="Enter your NPM" label="NPM" />
            <div className="grid grid-cols-2 gap-6 w-full">
              <Input
                className="w-full"
                placeholder="Enter your Id Line"
                label="Id Line"
              />
              <Input
                className="w-full"
                placeholder="Enter your Id Discord"
                label="Id Discord"
              />
            </div>

            <Input
              placeholder="Enter Gdrive link"
              label="Screenshot bukti masuk Fasilkom (Gdrive)"
            />
            <Input
              placeholder="Enter Gdrive link"
              label="Screenshot bukti share Instagram (Gdrive)"
            />
          </div>
          <div className="flex flex-col gap-6">
            <div>
              <Label className="mb-2" htmlFor="jalur">
                Jalur Masuk
              </Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Jalur Masuk" />
                </SelectTrigger>
                <SelectContent>
                  {jalurMasuk.map((jalur) => (
                    <SelectItem key={jalur.value} value={jalur.value}>
                      {jalur.label}
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
            <Input placeholder="Enter your school name" label="Asal Sekolah" />
          </div>
        </form>
        <div>
          <Button
            variant={"kiwi"}
            className="py-4 px-6 max-sm:py-2 max-sm:px-4"
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
