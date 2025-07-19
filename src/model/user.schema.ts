import { z } from "zod";

const jalurMasukValues = [
  "SNBP",
  "SNBT",
  "PPKB",
  "SimakUI",
  "SimakKKI",
  "TalentScouting",
  "Prestasi",
] as const;

export const jurusanValues = ["IlmuKomputer", "SistemInformasi", "KKI"] as const;

const genderValues = ["Male", "Female"] as const;

export const registFillDetailsSchema = z.object({
  namaLengkap: z.string().nonempty("Nama Lengkap wajib diisi"),
  npm: z.string().nonempty("NPM wajib diisi"),
  idLine: z.string().nonempty("Id Line wajib diisi"),
  idDiscord: z.string().nonempty("Id Discord wajib diisi"),
  screenshotBuktiMasuk: z
    .string()
    .url("Harus berupa URL yang valid")
    .nonempty("Screenshot bukti masuk wajib diisi"),
  screenshotBuktiShareIG: z
    .string()
    .url("Harus berupa URL yang valid")
    .nonempty("Screenshot bukti share Instagram wajib diisi"),
  jalurMasuk: z.enum(jalurMasukValues, {
    errorMap: () => ({ message: "Jalur Masuk tidak valid" }),
  }),
  jurusan: z.enum(jurusanValues, {
    errorMap: () => ({ message: "Jurusan tidak valid" }),
  }),
  gender: z.enum(genderValues, {
    errorMap: () => ({ message: "Gender tidak valid" }),
  }),
  asalSekolah: z.string().nonempty("Asal Sekolah wajib diisi"),
});
