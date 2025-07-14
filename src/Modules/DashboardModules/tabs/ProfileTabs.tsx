"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "@/hooks/useSession";
import { useToast } from "@/hooks/useToast";
import { registFillDetailsSchema } from "@/model/user.schema";
import { Label } from "@radix-ui/react-label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

function ViewProfile({ toggle }: { toggle: () => void }) {
  const { user } = useSession();
  return (
    <div className="relative w-full flex justify-center overflow-hidden font-josefin-sans">
      <div className="w-full flex flex-col gap-1 max-sm:gap-6">
        <div className="flex items-center justify-between">
          <h4 className="text-h4 max-lg:text-h4-mobile">Profile</h4>
          <Button variant="blue" onClick={toggle}>
            <img
              src="Edit.svg"
              alt="Edit Icon"
              className="w-6 h-6 max-lg:w-4 max-lg:h-4"
            />
            <span>Edit</span>
          </Button>
        </div>
        <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-12 max-sm:gap-0">
          <div className="flex flex-col gap-6 max-sm:mb-6">
            <Label>
              <span>Nama Lengkap</span>
              <div className="w-full h-fit pl-2 py-1.5 rounded-lg glass shadow-xl border-[#ffffff59] border-1 overflow-hidden">
                {user?.name}
              </div>
            </Label>
            <Label>
              <span>NPM</span>
              <div className="w-full h-fit pl-2 py-1.5 rounded-lg glass shadow-xl border-[#ffffff59] border-1 overflow-hidden">
                {user?.NPM}
              </div>
            </Label>
            <div className="grid grid-cols-2 gap-6 w-full">
              <Label>
                <span>ID Line</span>
                <div className="w-full h-fit pl-2 py-1.5 rounded-lg glass shadow-xl border-[#ffffff59] border-1 overflow-hidden">
                  {user?.idLine}
                </div>
              </Label>
              <Label>
                <span>ID Discord</span>
                <div className="w-full h-fit pl-2 py-1.5 rounded-lg glass shadow-xl border-[#ffffff59] border-1 overflow-hidden">
                  {user?.idDiscord}
                </div>
              </Label>
            </div>
            <Label>
              <span>Screenshot Bukti Masuk Fasilkom (Gdrive)</span>
              <div className="w-full h-fit pl-2 py-1.5 rounded-lg glass shadow-xl border-[#ffffff59] border-1 overflow-hidden">
                {user?.buktiMasuk}
              </div>
            </Label>
            <Label>
              <span>Screenshot Bukti Share Instagram (Gdrive)</span>
              <div className="w-full h-fit pl-2 py-1.5 rounded-lg glass shadow-xl border-[#ffffff59] border-1 overflow-hidden">
                {user?.buktiShare}
              </div>
            </Label>
          </div>
          <div className="flex flex-col gap-6">
            <div>
              <Label>
                <span>Jalur Masuk</span>
                <div className="w-full h-fit pl-2 py-1.5 rounded-lg glass shadow-xl border-[#ffffff59] border-1 overflow-hidden">
                  {user?.jalurMasuk}
                </div>
              </Label>
            </div>
            <div>
              <Label>
                <span>Jurusan</span>
                <div className="w-full h-fit pl-2 py-1.5 rounded-lg glass shadow-xl border-[#ffffff59] border-1 overflow-hidden">
                  {/* {user?.jurusan} */}
                  {user?.jurusan ? (
                    <span>
                      {jurusanList.find((j) => j.value === user.jurusan)?.label}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">Belum diisi</span>
                  )}
                </div>
              </Label>
            </div>
            <div>
              <Label>
                <span>Gender</span>
                <div className="w-full h-fit pl-2 py-1.5 rounded-lg glass shadow-xl border-[#ffffff59] border-1 overflow-hidden">
                  {user?.gender}
                </div>
              </Label>
            </div>
            <Label>
              <span>Asal Sekolah</span>
              <div className="w-full h-fit pl-2 py-1.5 rounded-lg glass shadow-xl border-[#ffffff59] border-1 overflow-hidden">
                {user?.asalSekolah}
              </div>
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
}

function EditProfile({ toggle }: { toggle: () => void }) {
  const { user } = useSession();
  const router = useRouter();
  const { show, dismiss } = useToast();

  // State
  const [namaLengkap, setNamaLengkap] = useState("");
  const [npm, setNpm] = useState("");
  const [idLine, setIdLine] = useState("");
  const [idDiscord, setIdDiscord] = useState("");
  const [screenshotBuktiMasuk, setScreenshotBuktiMasuk] = useState("");
  const [screenshotBuktiShareIG, setScreenshotBuktiShareIG] = useState("");
  const [jalur, setJalur] = useState("");
  const [jurusan, setJurusan] = useState(jurusanList[0]);
  const [gender, setGender] = useState(Gender[0]);
  const [asalSekolah, setAsalSekolah] = useState("");

  // Update state ketika user sudah tersedia
  useEffect(() => {
    if (user) {
      setNamaLengkap(user.name ?? "");
      setNpm(user.NPM ?? "");
      setIdLine(user.idLine ?? "");
      setIdDiscord(user.idDiscord ?? "");
      setScreenshotBuktiMasuk(user.buktiMasuk ?? "");
      setScreenshotBuktiShareIG(user.buktiShare ?? "");
      setJalur(user.jalurMasuk ?? "");
      setJurusan(
        jurusanList.find((j) => j.value === user.jurusan) ?? jurusanList[0]
      );
      setGender(Gender.find((g) => g.value === user.gender) ?? Gender[0]);
      setAsalSekolah(user.asalSekolah ?? "");
    }
  }, [user]);

  // Handle submit
  const handleSubmit = async () => {
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

    const validation = registFillDetailsSchema.safeParse(formData);
    if (!validation.success) {
      dismiss(toastId);
      for (const error of validation.error.errors) {
        show("error", error.message);
      }
      return;
    }

    const res = await fetch("/api/user", {
      method: "PATCH",
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

    show("success", "Profil berhasil diperbarui!");
    toggle(); // Kembali ke View
  };

  if (!user) return <div>Loading user data...</div>;

  return (
    <div className="relative flex justify-center w-full overflow-hidden font-josefin-sans">
      <div className="w-full flex flex-col gap-8 max-sm:gap-6">
        <div className="flex flex-col gap-1">
          <h4 className="text-h4 max-lg:text-h5 max-sm:text-headline-mobile">
            Edit Profile
          </h4>
        </div>

        <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-12 max-sm:gap-0">
          <div className="flex flex-col gap-6 max-sm:mb-6">
            <Input
              label="Nama Lengkap"
              value={namaLengkap}
              onChange={(e) => setNamaLengkap(e.target.value)}
              placeholder="Enter your name"
            />
            <Input
              label="NPM"
              value={npm}
              onChange={(e) => setNpm(e.target.value)}
              placeholder="Enter your NPM"
            />
            <div className="grid grid-cols-2 gap-6 w-full">
              <Input
                label="ID Line"
                value={idLine}
                onChange={(e) => setIdLine(e.target.value)}
                placeholder="Enter your ID Line"
              />
              <Input
                label="ID Discord"
                value={idDiscord}
                onChange={(e) => setIdDiscord(e.target.value)}
                placeholder="Enter your ID Discord"
              />
            </div>
            <Input
              label="Screenshot Bukti Masuk (Gdrive)"
              value={screenshotBuktiMasuk}
              onChange={(e) => setScreenshotBuktiMasuk(e.target.value)}
              placeholder="Enter Gdrive link"
            />
            <Input
              label="Screenshot Bukti Share Instagram (Gdrive)"
              value={screenshotBuktiShareIG}
              onChange={(e) => setScreenshotBuktiShareIG(e.target.value)}
              placeholder="Enter Gdrive link"
            />
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <Label className="mb-2">Jalur Masuk</Label>
              <Select value={jalur} onValueChange={setJalur}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose your option" />
                </SelectTrigger>
                <SelectContent>
                  {jalurMasuk.map((j) => (
                    <SelectItem key={j.value} value={j.value}>
                      {j.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-2">Jurusan</Label>
              <div className="grid grid-cols-3 max-lg:grid-cols-2 gap-3">
                {jurusanList.map((item) => (
                  <button
                    key={item.value}
                    onClick={(e) => {
                      e.preventDefault();
                      setJurusan(item);
                    }}
                    className={`rounded-xl py-2 border-2 text-base ${
                      jurusan.value === item.value
                        ? "border-[#C99BDB] bg-clip-text bg-gradient-retro-wave text-transparent"
                        : "border-neutral-100"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label className="mb-2">Gender</Label>
              <div className="grid grid-cols-3 max-lg:grid-cols-2 gap-3">
                {Gender.map((item) => (
                  <button
                    key={item.value}
                    onClick={(e) => {
                      e.preventDefault();
                      setGender(item);
                    }}
                    className={`rounded-xl py-2 border-2 text-base ${
                      gender.value === item.value
                        ? "border-[#C99BDB] bg-clip-text bg-gradient-retro-wave text-transparent"
                        : "border-neutral-100"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <Input
              label="Asal Sekolah"
              value={asalSekolah}
              onChange={(e) => setAsalSekolah(e.target.value)}
              placeholder="Enter your school name"
            />
          </div>
        </div>

        <div className="flex w-full justify-end max-lg:justify-center gap-2">
          <Button onClick={toggle}>Cancel</Button>
          <Button variant="blue" onClick={handleSubmit}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function ProfileTabs() {
  const [isEditing, setIsEditing] = useState(false);

  const editToggle = () => {
    setIsEditing((prev) => !prev);
  };

  return isEditing ? (
    <EditProfile toggle={editToggle} />
  ) : (
    <ViewProfile toggle={editToggle} />
  );
}
