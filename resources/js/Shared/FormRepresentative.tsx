import AirDatepicker from "air-datepicker";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import localeEs from "air-datepicker/locale/es";
import { IRepresentative } from "@/Pages/Representatives/types/representatives";
import Input from "@/Components/Input";
import Select from "@/Components/Select";
import DialogCustom from "@/Components/DialogCustom";
import { showToast } from "@/Helpers/alerts";
import { router } from "@inertiajs/react";

interface FormRepresentativeProps {
    // handlerSetForm: (key: any, value: any) => void;
    // onSubmit: (data: any) => void;
    // form: IRepresentative;
    // errors: any;
    // genders: { label: string; value: string }[];
    // courses: { id: number; name: string; nivel: string }[];
    // docTypes: { label: string; value: string }[];
    // register: any;
    representative: IRepresentative | null;
    isOpen: boolean;
    setOpen: (isOpen: boolean) => void;
    returnJson?: boolean;
}

export default function FormRepresentative({
    representative,
    isOpen,
    setOpen,
    returnJson,
}: // handlerSetForm,
// errors,
// // onSubmit,
// // form,
// register,
// // errors: errorsInertia,
// genders,
// // courses,
// docTypes,
FormRepresentativeProps) {
    const {
        // register,
        formState: { errors },
        handleSubmit,
        control,
    } = useForm({
        defaultValues: representative || {},
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);
    // const [preview, setPreview] = useState<any>(null);

    // useEffect(() => {
    //     new AirDatepicker('#birthday', {
    //         locale: localeEs,

    //     })
    // }, []);

    // function handleFileChange(key: string, e: any) {
    //     const selectedFile = e.target.files[0];
    //     console.log({ selectedFile });

    //     if (selectedFile) {
    //         handlerSetForm(key, selectedFile);

    //         const reader = new FileReader();
    //         reader.onload = () => {
    //             setPreview(reader.result);
    //         };
    //         reader.readAsDataURL(selectedFile);
    //     }
    // }

    const onSubmit = (data: any) => {
        setIsLoading(true);
        const options = {
            preserveState: true,
            onSuccess: (e: any) => {
                console.log({ e });
                setIsLoading(false);
                setOpen(false);
                // reset();
            },
            onError: (e: { [s: string]: unknown } | ArrayLike<unknown>) => {
                console.log({ e });
                showToast({
                    icon: "error",
                    text: Object.values(e).join("\n"),
                    title: "Error al crear el representante",
                });
                setIsLoading(false);
            },
        };

        if (!representative) {
            router.post("/representatives", {...data, returnJson}, options);
        } else {
            router.put(`/representatives/${representative?.id}`, data, options);
        }
    };
    return (
        <div>
            <DialogCustom
                open={isOpen}
                title={`${
                    !representative ? "Creando" : "Editando"
                } Representante`}
            >
                <form
                    className="grid md:grid-cols-12 grid-cols-1 gap-4"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="md:col-span-6">
                        <Input
                            control={control}
                            type="text"
                            name="first_name"
                            label="Nombres"
                            rules={{ required: true }}
                        />
                    </div>

                    <div className="md:col-span-6">
                        <Input
                            control={control}
                            type="text"
                            name="last_name"
                            label="Apellidos"
                            rules={{ required: true }}
                        />
                    </div>

                    <div className="md:col-span-6">
                        <Input
                            control={control}
                            type="text"
                            name="email"
                            label="Correo electrónico"
                            rules={{ required: true }}
                        />
                    </div>

                    <div className="md:col-span-6">
                        <Select
                            control={control}
                            name="doc_type"
                            label="Tipo de documento"
                            rules={{ required: true }}
                            defaultValue={''}
                        >
                            <option value={''}>Seleccione una opción</option>
                            <option value={1}>Cédula de ciudadanía</option>
                            <option value={2}>Pasaporte</option>
                            <option value={3}>Cédula de extranjería</option>
                        </Select>
                    </div>

                    <div className="md:col-span-6">
                        <Input
                            control={control}
                            type="number"
                            name="phone"
                            label="Teléfono"
                            rules={{ required: true }}
                        />
                    </div>

                    <div className="md:col-span-6">
                        <Select
                            control={control}
                            name="gender"
                            label="Genero"
                            rules={{ required: true }}
                            defaultValue={''}
                        >
                            <option value={''}>Seleccione una opción</option>
                            <option value={1}>Masculino</option>
                            <option value={2}>Femenino</option>
                        </Select>
                    </div>

                    <div className="md:col-span-6">
                        <Input
                            control={control}
                            type="text"
                            name="address"
                            label="Dirección"
                            rules={{ required: true }}
                        />
                    </div>

                    <div className="md:col-span-6">
                        <Input
                            label="Número de identificación"
                            type="number"
                            name="doc_number"
                            control={control}
                            rules={{ required: true }}
                        />
                    </div>

                    <div className="md:col-span-6">
                        <Input
                            label="Ocupación"
                            type="text"
                            name="occupation"
                            control={control}
                            rules={{ required: true }}
                        />
                    </div>
                    <div className="md:col-span-12 mt-3">
                        <div className="flex items-center gap-2">
                            <button
                                disabled={isLoading}
                                className={`rounded-md bg-slate-800 text-white px-3 py-2 ${
                                    isLoading ? "is-loading" : ""
                                }`}
                                type="submit"
                            >
                                Guardar{" "}
                                <i className="fa-regular fa-paper-plane ml-2"></i>
                            </button>
                            
                            <button
                                className="rounded-md bg-red-500 text-white px-3 py-2 "
                                type="button"
                                onClick={() => setOpen(false)}
                            >
                                Cerrar <i className="fa-solid fa-xmark ml-2"></i>
                            </button>
                        </div>
                    </div>
                </form>
            </DialogCustom>
        </div>
    );
}
