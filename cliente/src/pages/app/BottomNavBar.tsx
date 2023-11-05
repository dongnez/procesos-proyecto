import { Menu } from "react-feather";
import { useAtom } from "jotai";
import {
  openLeftSideBarAtom,
  openRightSideBarAtom,
} from "src/context/openLayoutsAtoms";
import { Button } from "src/@/components/ui/button";
import { User2 } from "lucide-react";

export const BottomNavBar = () => {
  const [openLeft, setOpenLeft] = useAtom(openLeftSideBarAtom);
  const [openRight, setOpenRight] = useAtom(openRightSideBarAtom);

  return (
    <section className="sm:hidden flex z-30 bg-card p-2">
      {/* Show LeftBar */}
      <Button
		size={'icon'}
		className="rounded-full"
        onClick={() => {
          setOpenLeft(!openLeft);
          setOpenRight(false);
        }}>
        <Menu className="w-6 h-6 " />
      </Button>
      <section className="flex-1"></section>
      {/* Show RightBar */}
      <Button
		size={'icon'}
		className="rounded-full"
        onClick={() => {
          setOpenRight(!openRight);
          setOpenLeft(false);
        }}>
        <User2 className="w-6 h-6 " />
      </Button>
    </section>
  );
};
