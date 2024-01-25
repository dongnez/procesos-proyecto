import { Dialog } from "@radix-ui/react-dialog";
import { atom, useAtom } from "jotai";
import { CalendarDayDialog, CalendarDayDialogProps } from "src/components/dialogs/CalendarDayDialog";
import { ConfirmDialog, ConfirmDialogProps } from "src/components/dialogs/ConfirmDialog";
import { ProfileDialogParams,ProfileDialog } from "src/components/dialogs/ProfileDialog";
import { ShareLinkDialog, ShareLinkDialogParams } from "src/components/dialogs/ShareLinkDialog";

export type DialogParams = { id: "profile"; params: ProfileDialogParams }
| {id: "sharelink"; params: ShareLinkDialogParams}
| {id: "calendar_day", params: CalendarDayDialogProps}
| {id: "confirm", params: ConfirmDialogProps};

export type ROUTE_DIALOG_ID = DialogParams["id"];

//Patron Strategy
export const DialogComponentById: Record<
  ROUTE_DIALOG_ID,
  React.FC<any> | React.LazyExoticComponent<any>
> = {
  profile: ProfileDialog,
  sharelink: ShareLinkDialog,
  calendar_day: CalendarDayDialog,
  confirm: ConfirmDialog,
};

export const dialogsAtom = atom<
  Array<{
    params: DialogParams;
    onClose: () => void;
    key: string;
  }>
>([]);

export type DialogProps = React.ComponentPropsWithoutRef<typeof Dialog> & {
  onClose: () => void;
};

export const DialogStack = () => {
  const [dialogStack, setDialogStack] = useAtom(dialogsAtom);

  return (
    <div className="z-40 absolute">
      {dialogStack.map((dialog) => {
        const DialogComponent =
          DialogComponentById[dialog.params.id as ROUTE_DIALOG_ID];

        return (
          <DialogComponent
            key={dialog.key}
            {...dialog.params.params}
            onOpenChange={(open) => {
              if (!open) {
                dialog.onClose();
                setTimeout(() => {
                  setDialogStack((stack) =>
                    stack.filter((item) => item.key !== dialog.key)
                  );
                }, 200);
              }
            }}
            onClose={() => {
              dialog.onClose();
              setTimeout(() => {
                setDialogStack((stack) =>
                  stack.filter((item) => item.key !== dialog.key)
                );
              }, 200);
            }}
          />
        );
      })}
    </div>
  );
};
