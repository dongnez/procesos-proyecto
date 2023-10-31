import { useRef } from "react";
import { useClickAway } from "react-use";
import { useSetAtom } from "jotai";
import {
  openLeftSideBarAtom,
  openRightSideBarAtom,
} from "src/context/openLayoutsAtoms";

export const useCloseAll = () => {
  const closeRef = useRef<any>(null);
  const closeLeft = useSetAtom(openLeftSideBarAtom);
  const closeRight = useSetAtom(openRightSideBarAtom);

  useClickAway(closeRef, () => {
    //Close all
	close()
  });

  function close() {
    closeLeft(false);
    closeRight(false);
  }

  return { closeRef,close };
};
