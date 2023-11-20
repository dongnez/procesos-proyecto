import { useSetAtom } from "jotai";
import { DialogParams, dialogsAtom } from "src/components/dialogs/DialogStack";

let nextKey = 0;

export const useOpenDialog = () => {
  const setDialogStack = useSetAtom(dialogsAtom);

  function openDialog(params: DialogParams) {
    return new Promise<void>((resolve) => {
      setDialogStack((stack) => [
        ...stack,
        {
          params,
          onClose: () => resolve(),
          key: String("dialog_" + nextKey++),
        },
      ]);
    });
  }

  return { openDialog, };
};
