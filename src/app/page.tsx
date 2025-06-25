import { Button } from "@/components/ui/button";
import { Disc, ArrowRight, User } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="bg-black text-white font-josefin-sans px-20 py-10 max-lg:px-18 max-md:px-12 max-sm:px-6">
      <div className=" flex flex-col gap-4">
        <h1 className="text-center text-h1 mb-10">Design System</h1>
        <h1 className="text-h1">Heading 1 - 60 Semibold</h1>
        <h2 className="text-h2">Heading 2 - 48 Semibold</h2>
        <h3 className="text-h3">Heading 3 - 36 Semibold</h3>
        <h4 className="text-h4">Heading 4 - 24 Semibold</h4>
        <h5 className="text-h5">Heading 5 - 20 Semibold</h5>
        <p className="text-headline">Headline - 20 Medium</p>
        <p className="text-body-large">Body Large - 18 Regular</p>
        <p className="text-body">Body - 16 Regular</p>
        <p className="text-footnote">Footnote - 14 Regular</p>
        <p className="text-caption">Caption - 13 Regular</p>
        <p className="text-small">Small - 12 Regular</p>

        <h1 className="text-h1-mobile">Mobile Heading 1 - 60 Semibold</h1>
        <h2 className="text-h2-mobile">Mobile Heading 2 - 48 Semibold</h2>
        <h3 className="text-h3-mobile">Mobile Heading 3 - 36 Semibold</h3>
        <h4 className="text-h4-mobile">Mobile Heading 4 - 24 Semibold</h4>
        <h5 className="text-h5-mobile">Mobile Heading 5 - 20 Semibold</h5>
        <p className="text-headline-mobile">Mobile Headline - 20 Medium</p>
        <p className="text-bodyLarge-mobile">Mobile Body Large - 18 Regular</p>
        <p className="text-body-mobile">Mobile Body - 16 Regular</p>
        <p className="text-footnote-mobile">Mobile Footnote - 14 Regular</p>
        <p className="text-caption-mobile">Mobile Caption - 13 Regular</p>
        <p className="text-small-mobile">Mobile Small - 12 Regular</p>

        <div className="h-30 w-full p-10 rounded-3xl text-h3 items-center bg-white/50 flex justify-between">
          Neutral
          <div className="w-10 h-full rounded-full bg-neutral-050"></div>
          <div className="w-10 h-full rounded-full bg-neutral-100"></div>
          <div className="w-10 h-full rounded-full bg-neutral-300"></div>
          <div className="w-10 h-full rounded-full bg-neutral-500"></div>
          <div className="w-10 h-full rounded-full bg-neutral-700"></div>
          <div className="w-10 h-full rounded-full bg-neutral-900"></div>
          <div className="w-10 h-full rounded-full bg-neutral-1000"></div>
        </div>
        <div className="h-30 w-full p-10 rounded-3xl text-h3 items-center bg-white/50 flex justify-between">
          Component
          <div className="w-10 h-full rounded-full bg-component-frame"></div>
          <div className="w-10 h-full rounded-full bg-component-border"></div>
          <div className="w-10 h-full rounded-full bg-component-text-white"></div>
          <div className="w-10 h-full rounded-full bg-component-text-black"></div>
          <div className="w-10 h-full rounded-full bg-component-error"></div>
        </div>
        <div className="h-30 w-full p-10 rounded-3xl text-h3 items-center bg-white/50 flex justify-between">
          Card
          <div className="w-10 h-full rounded-full bg-card"></div>
          <div className="w-10 h-full rounded-full bg-card-hover"></div>
          <div className="w-10 h-full rounded-full bg-card-pressed"></div>
          <div className="w-10 h-full rounded-full bg-card-disabled"></div>
          <div className="w-10 h-full rounded-full bg-card-red"></div>
        </div>
        <div className="h-30 w-full p-10 rounded-3xl text-h3 items-center bg-white/50 flex justify-between">
          Intrasigent
          <div className="w-10 h-full rounded-full bg-instrasigent-sea-050"></div>
          <div className="w-10 h-full rounded-full bg-instrasigent-sea-100"></div>
          <div className="w-10 h-full rounded-full bg-instrasigent-sea-300"></div>
          <div className="w-10 h-full rounded-full bg-instrasigent-sea-500"></div>
          <div className="w-10 h-full rounded-full bg-instrasigent-sea-700"></div>
          <div className="w-10 h-full rounded-full bg-instrasigent-sea-900"></div>
          <div className="w-10 h-full rounded-full bg-instrasigent-sea-1000"></div>
        </div>
        <div className="h-30 w-full p-10 rounded-3xl text-h3 items-center bg-white/50 flex justify-between">
          Glacial
          <div className="w-10 h-full rounded-full bg-glacial-lilac-050"></div>
          <div className="w-10 h-full rounded-full bg-glacial-lilac-100"></div>
          <div className="w-10 h-full rounded-full bg-glacial-lilac-300"></div>
          <div className="w-10 h-full rounded-full bg-glacial-lilac-500"></div>
          <div className="w-10 h-full rounded-full bg-glacial-lilac-700"></div>
          <div className="w-10 h-full rounded-full bg-glacial-lilac-900"></div>
          <div className="w-10 h-full rounded-full bg-glacial-lilac-1000"></div>
        </div>
        <div className="h-30 w-full p-10 rounded-3xl text-h3 items-center bg-white/50 flex justify-between">
          Aurora
          <div className="w-10 h-full rounded-full bg-aurora-green-050"></div>
          <div className="w-10 h-full rounded-full bg-aurora-green-100"></div>
          <div className="w-10 h-full rounded-full bg-aurora-green-300"></div>
          <div className="w-10 h-full rounded-full bg-aurora-green-500"></div>
          <div className="w-10 h-full rounded-full bg-aurora-green-700"></div>
          <div className="w-10 h-full rounded-full bg-aurora-green-900"></div>
          <div className="w-10 h-full rounded-full bg-aurora-green-1000"></div>
        </div>
        <div className="h-30 w-full p-10 rounded-3xl text-h3 items-center bg-white/50 flex justify-between">
          Islan
          <div className="w-10 h-full rounded-full bg-islan-milde-050"></div>
          <div className="w-10 h-full rounded-full bg-islan-milde-100"></div>
          <div className="w-10 h-full rounded-full bg-islan-milde-300"></div>
          <div className="w-10 h-full rounded-full bg-islan-milde-500"></div>
          <div className="w-10 h-full rounded-full bg-islan-milde-700"></div>
          <div className="w-10 h-full rounded-full bg-islan-milde-900"></div>
          <div className="w-10 h-full rounded-full bg-islan-milde-1000"></div>
        </div>
        <div className="h-30 w-full p-10 rounded-3xl text-h3 items-center bg-white/50 flex justify-between">
          Retro Wave
          <div className="w-20 h-full bg-gradient-retro-wave"></div>
          <div className="w-20 h-full bg-gradient-retro-wave-hover"></div>
          <div className="w-20 h-full bg-gradient-retro-wave-pressed"></div>
          <div className="w-20 h-full bg-gradient-retro-wave-disabled"></div>
        </div>
        <div className="h-30 w-full p-10 rounded-3xl text-h3 items-center bg-white/50 flex justify-between">
          Kiwi
          <div className="w-20 h-full bg-gradient-kiwi"></div>
          <div className="w-20 h-full bg-gradient-kiwi-hover"></div>
          <div className="w-20 h-full bg-gradient-kiwi-pressed"></div>
          <div className="w-20 h-full bg-gradient-kiwi-disabled"></div>
        </div>
        <div className="h-30 w-full p-10 rounded-3xl text-h3 items-center bg-white/50 flex justify-between">
          Linear White
          <div className="w-20 h-full bg-gradient-linear-white"></div>
          <div className="w-20 h-full bg-gradient-linear-white-hover"></div>
          <div className="w-20 h-full bg-gradient-linear-white-pressed"></div>
          <div className="w-20 h-full bg-gradient-linear-white-disabled"></div>
        </div>
        {/* <Button className="">Primary</Button> */}
        {/* <div className="absolute top-20 w-full h-100 rounded-2xl bg-border p-[1px]"> */}
        <div className="absolute glass top-20 w-full h-100 rounded-2xl border border-card-disabled p-[1px]"></div>
        <Button className="w-full">
          <Disc />
          Button
          <ArrowRight />
        </Button>
        <Button className="w-full" variant={"blue"}>
          <Disc />
          Button
          <ArrowRight />
        </Button>
        <Button className="w-full" variant={"lilac"}>
          <Disc />
          Button
          <ArrowRight />
        </Button>
        <Button className="w-full" variant={"yellow"}>
          <Disc />
          Button
          <ArrowRight />
        </Button>
        <Button className="w-full" variant={"retro"}>
          <Disc />
          Button
          <ArrowRight />
        </Button>
        <Button className="w-full" variant={"kiwi"}>
          <Disc />
          Button
          <ArrowRight />
        </Button>
        <div className="flex flex-col gap-2">
          <Input
            id="something"
            className="w-full"
            placeholder="Type in cm..."
            label="Masukan panjang kontolmu"
            icon={<User />}
            // prefix="+62"
          />
          <Input
            id="something"
            className="w-full"
            placeholder="Type in cm..."
            label="Masukan panjang kontolmu"
            error="Kurang panjang"
          />
        </div>
        <div className="w-full h-100">
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
