import { z } from "zod";
// import { KelompokList } from "@/Modules/MentorModules/FormMentor";

export const mentorSchema = z.object({
  namaLengkap: z.string().nonempty("Nama Lengkap wajib diisi"),
  npm: z.string().nonempty("NPM wajib diisi"),
  idLine: z.string().nonempty("Id Line wajib diisi"),
  idDiscord: z.string().nonempty("Id Discord wajib diisi"),
  kelompok: z.string().nonempty("Kelompok wajib diisi"),
});
