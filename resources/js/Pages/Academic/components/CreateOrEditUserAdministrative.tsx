import DialogCustom from "@/Components/DialogCustom";
import { useForm } from "react-hook-form";
import { IUser } from "./TableUsersAcademic";
import Input from "@/Components/Input";
import Select from "@/Components/Select";
import { useState } from "react";
import { router } from "@inertiajs/react";
import { showToast } from "@/Helpers/alerts";

interface CreateOrEditUserAdministrativeProps {
    isOpen: boolean;
    user?: IUser;
    setIsOpen: (isOpen: boolean) => void;
}
export default function CreateOrEditUserAdministrative({
    isOpen,
    user,
    setIsOpen,
}: CreateOrEditUserAdministrativeProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { control, handleSubmit } = useForm({
        defaultValues: {
            name: user?.name,
            email: user?.email,
            role: user?.roles[0].name
        }
    });

    function onSubmit(data: any) {
        console.log(data);
        setIsLoading(true);
        const options = {
            preserveState: true,
            onSuccess: (e: any) => {
                console.log({ e });
                setIsLoading(false);
                setIsOpen(false);
            },
            onError: (e: any) => {
                console.log({ e });
                setIsLoading(false);
                showToast({
                    icon: "error",
                    text: Object.values(e).join("\n"),
                    title: "Error en esta petición, vuelva a intentarlo",
                });
            },
        }
        if (!user) {
            router.post("/academic/users", data, options);
        } else {
            router.put(`/academic/users/${user?.id}`, data, options);
        }
    }
    return (
        <DialogCustom open={isOpen} title={`${!user  ? "Creando" : "Editando"} Usuario`}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div>
                        <Input
                            control={control}
                            name="name"
                            label="Nombres"
                            type="text"
                            rules={{ required: true }}
                        />
                    </div>
                    <div>
                        <Input
                            control={control}
                            name="email"
                            label="Correo electrónico"
                            type="email"
                            rules={{ required: true }}
                        />
                    </div>
                    <div>
                        <Select
                            control={control}
                            name="role"
                            label="Rol"
                            rules={{ required: true }}
                        >
                            <option value="">Seleccioné un rol</option>
                            <option value="admin">Administrador</option>
                            <option value="secretary">Secretario(a)</option>
                        </Select>
                    </div>
                </div>
                <div className="flex items-center gap-2 mt-4">
                        <button
                            disabled={isLoading}
                            type="submit"
                            className={`btn-custom text-white bg-slate-900 ${isLoading ? "is-loading" : ""}`}
                        >
                            Guardar
                            <i className="fa-regular fa-paper-plane ml-2"></i>
                        </button>
                        <button
                            disabled={isLoading}
                            className="btn-custom text-white bg-red-600"
                            onClick={() => setIsOpen(false)}
                        >
                            Cerrar <i className="fa-solid fa-xmark ml-2"></i>
                        </button>
                    </div>
            </form>
        </DialogCustom>
    );
}
