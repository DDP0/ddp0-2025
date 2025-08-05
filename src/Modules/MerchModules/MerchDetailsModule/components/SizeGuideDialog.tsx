import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import CocoLineArrow from "./CocoLineArrowRight";
import { Button } from "@/components/ui/button";
import CocoLineClose from "./CocoLineClose";
import { generalData } from "../../data/const";

export default function SizeGuideDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'blue'} className="gap-3">Size Guide <CocoLineArrow /></Button>
      </DialogTrigger>
      <DialogContent className="bg-black glass fill text-accent border-[0.5px]" showCloseButton={false}>
        <div className=" flex flex-col justify-between gap-4 text-end">
          <DialogClose asChild>
            <Button className="w-10 h-10 p-0">
              <CocoLineClose size="size-8" />
            </Button>
          </DialogClose>
          <img src={generalData.sizeGuideImage} className="object-cover w-full h-full rounded-md"></img>
        </div>
      </DialogContent>
    </Dialog>
  )
}