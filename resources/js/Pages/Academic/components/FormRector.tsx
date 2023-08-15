import Input from "@/Components/Input";
import { showToast } from "@/Helpers/alerts";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function FormRector({ name }: { name: string }) {
    const { control, handleSubmit } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    function onsubmit(data: any) {
        setIsLoading(true);
        const options = {
            preserveState: true,
            onSuccess: (e: any) => {
                console.log({ e });
                setIsLoading(false);
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
        };
        router.post(`/academic/rector`, data, options);
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onsubmit)}>
                <Input
                    control={control}
                    name="name"
                    label="Nombre del rector"
                    type="text"
                    defaultValue={name}
                />
                <button
                    disabled={isLoading}
                    className={`rounded-md bg-slate-800 mt-3 text-white px-3 py-2 ${
                        isLoading ? "is-loading" : ""
                    }`}
                    type="submit"
                >
                    Guardar 
                    <i className="fa-regular fa-paper-plane"></i>
                </button>
            </form>
        </div>
    );
}
