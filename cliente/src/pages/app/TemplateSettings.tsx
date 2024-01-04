import { SimpleSelect } from "src/components/SimpleSelect";
import { useTemplate } from "src/hooks/useTemplate";
import { Loader } from "src/components/Loader";
import { UserIcon } from "src/components/UserIcon";
import { ArrowLeft, Eye, UserPlus } from "lucide-react";
import { Button } from "src/@/components/ui/button";
import { useOpenDialog } from "src/hooks/useOpenDialog";
import { WEB_URL } from "src/constants/config";
import { useNavigate } from "src/hooks/useNavigate";
import { cn } from "src/@/lib/utils";
import { databaseGenerateNewCode } from "src/database/databaseTemplates";

export const TemplateSettings = () => {
  // Limitar el acceso a esta ruta solo a los usuarios que tengan el rol de admin
  //Change visibility of template
  //Change template name
  //Change template description
  //Add or remove template users
  //Remove template foods

  const { template, setTemplate } = useTemplate();
  const { openDialog, closeLastDialog  } = useOpenDialog();
  const navigate = useNavigate();

  const friendsLink = `${WEB_URL}/invite/${template?._id}/${template?.inviteCode}`;

  if (!template) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <div className="flex gap-2 items-center mb-2">
        <Button
          variant={"ghost"}
          size={"icon"}
          className="rounded-full"
          onClick={() => {
            //Navigate to template page
            navigate(`/app/template/${template._id}`);
          }}>
          <ArrowLeft size={24} />
        </Button>
        <h1 className="flex-1 text-center text-xl ">{template.name}</h1>
      </div>

      <div className="p-3 rounded-md bg-card/90 h-fit max-w-[500px] mx-auto w-full">
        <h3 className="text-lg">Ajustes</h3>
        <hr className="mb-2" />

        <section className="flex gap-2 items-center">
          <Eye />
          <p className="flex-1">Visibilidad</p>
          <SimpleSelect
            defaultValue={"public"}
            list={[
              { name: "Público", value: "public" },
              { name: "Privado", value: "private" },
            ]}
          />
        </section>

        <div className="flex items-center mt-4 mb-1">
          <h3 className="text-lg font-medium  flex-1">
            {template.users.length} Miembros{" "}
          </h3>
          <Button
            className="rounded-full w-7 h-7"
            size={"icon"}
            onClick={() => {
              openDialog({
                id: "sharelink",
                params: {
                  title: "Comparte para dar acceso a los usuarios",
                  link: friendsLink,
                  topChildren: (
                    <div className="">
                      <p className="mb-1 text-foreground/90">Código Actual</p>
                      <div className="flex gap-2 items-center border border-primary rounded-sm p-1">
                        <p
                          className="text-xl flex-1 font-semibold  ">
                          {template?.inviteCode}
                        </p>
                        <Button
                          variant="secondary"
                          onClick={() => {
                            databaseGenerateNewCode(template._id).then(
                              (newCode) => {
                                if (!newCode) return;
                                setTemplate((prev: any) => ({
                                  ...prev,
                                  inviteCode: newCode.data,
                                }));
                                closeLastDialog();
                              }
                            );
                          }}>
                          Generar nuevo código
                        </Button>
                      </div>
                      <hr className="my-2" />
                    </div>
                  ),
                },
              });
            }}>
            <UserPlus size={16} className="pl-[1px]" />
          </Button>
        </div>
        <hr />

        {template.users.map((user, index) => {
          return (
            <div
              key={index}
              onClick={() =>{
                openDialog({
                  id: "profile",
                  params: {
                    userId: user.userRef._id,
                  },
                });
              }} 
              className="flex gap-5 p-3 hover:bg-muted duration-200 items-center">
              <UserIcon
                image={user.userRef?.photoURL}
                fallback={user.userRef?.name}
                size={30}
              />
              <p className="text-lg flex-1">{user.userRef?.name}</p>
              <p
                className={cn(
                  "text-xs primary text-foreground/60",
                  user.role === "owner" && "text-blue-500",
                  user.role === "admin" && "text-green-500"
                )}>
                {user.role}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
