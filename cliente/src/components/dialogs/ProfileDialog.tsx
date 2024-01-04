import { useQuery } from "react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "src/@/components/ui/dialog";
import { trpcClient } from "src/api/trpc";
import { UserIcon } from "src/components/UserIcon";
import { DialogProps } from "src/components/dialogs/DialogStack";
import { UserInterface } from "src/interfaces/UserInterfaces";

export type ProfileDialogParams = {
  userId: string;
};

export const ProfileDialog = ({
  userId,
  ...rest
}: DialogProps & ProfileDialogParams) => {

  const userRes = useQuery("getUser", () =>
    trpcClient.user.getUser.query({
      userId: userId,
    })
  );

  const user:UserInterface = userRes.data;

  return (
    <Dialog defaultOpen {...rest}>
      <DialogContent>
      {userRes.isLoading ? 
      <>
      Loading
      </> : 
      <>
        <DialogHeader>
          <DialogTitle className="flex flex-col items-center gap-2 mb-10">
            <UserIcon image={user.photoURL}  size={120}/>
            <p>{user.name}</p>
          </DialogTitle>

          <p className="text-foreground/90">Email</p>
          <p>{user.email}</p>

          
        </DialogHeader>
      </>}
      </DialogContent>
    </Dialog>
  );
};
