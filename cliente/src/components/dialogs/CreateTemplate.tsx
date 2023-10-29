import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "src/@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "src/@/components/ui/select";

import { Input } from "src/@/components/ui/input";
import { PlusCircle } from "react-feather";
import { Button } from "src/@/components/ui/button";
import { databaseCreateTemplate } from "src/database/databaseTemplates";
import { useAuth } from "src/context/AuthProvider";
import { useState } from "react";
import { useToast } from "src/@/components/ui/use-toast";

export const CreateTemplate = ({
  ...rest
}: React.ComponentPropsWithoutRef<typeof Dialog>) => {
  const { user } = useAuth()!;
  const [name, setName] = useState("");
  const [visibility, setVisibility] = useState<"public" | "private">("public");

  const { toast } = useToast();

  return (
    <Dialog {...rest}>
      <DialogTrigger className="w-fit h-fit" asChild>
        <Button size={'icon'} className="rounded-full" variant={'ghost'}>
          <PlusCircle />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear Template</DialogTitle>

          <Input
            placeholder="Nombre"
            className="mb-2"
            onChange={(e) => setName(e.currentTarget.value)}
          />

          <div className="">
            <p className="mt-5">Visible</p>
            <Select onValueChange={(e) => setVisibility(e as any)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Publico" defaultValue={"public"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem defaultChecked value="public">
                  Publico
                </SelectItem>
                <SelectItem value="private">Privado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="w-full flex justify-end ">
            <DialogClose asChild className="w-fit">
              <Button
                className="mt-4"
                onClick={() => {
                  if (name === "") return;
                  databaseCreateTemplate({
                    template: {
                      _id: "",
                      name: name,
                      foods: [],
                      users: [
                        {
                          userId: user!._id,
                          role: "owner",
                        },
                      ],
                      visibility: visibility,
                    },
                    userId: user!._id,
                  }).then(() => {
                    toast({
                      title: "Template creado ✅",
                      description: "El template se ha creado correctamente",
                      duration: 5000,
                    });
                  });
                }}>
                Crear
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
