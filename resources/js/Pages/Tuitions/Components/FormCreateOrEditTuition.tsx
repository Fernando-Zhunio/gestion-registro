import TextField from "@mui/material/TextField";
import { IStudent } from "../../Students/types/student.types";
import { router, usePage } from "@inertiajs/react";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
// import Input from "@/Components/Input";
import "air-datepicker/air-datepicker.css";
import AirDatepicker from "air-datepicker";
import localeEs from "air-datepicker/locale/es";
import FormStudent from "../../../Shared/FormStudent";
import FormRepresentative from "../../../Shared/FormRepresentative";
import { useForm as useFormInertia } from "@inertiajs/react";
import { showToast } from "@/Helpers/alerts";

interface FormCreateOrEditTuitionProps {
    handlerSetForm: (key: any, value: any) => void;
    form: any;
    errors: any;
    setIsOpen: (isOpen: boolean) => void;
}

const FormCreateOrEditTuition = ({
    handlerSetForm,
    form,
    // errors: errorsInertia,
    setIsOpen,
}: FormCreateOrEditTuitionProps) => {
    const { props } = usePage();
    const [isLoading, setIsLoading] = useState(false);
    // const inputPhoto = useRef(null);
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    // const { post, transform, setData } = useFormInertia();

    useEffect(() => {
        new AirDatepicker("#birthday", {
            locale: localeEs,
        });
        console.log({ props });
    }, []);

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
        // data.preventDefault();
        console.log(data);
        const groupData = Object.keys(data).reduce(
            (result: any, key: string) => {
                const prefix = key.substring(0, 2);
                if (prefix === "r_") {
                    result.representative[key.replace("r_", "")] = data[key];
                } else {
                    result.student[key] = data[key];
                }
                return result;
            },
            { student: {}, representative: {} }
        );
        setIsLoading(true);
        // setData(groupData);
        groupData.student.photo = groupData.student.photo[0];
        console.log({ groupData });
        router.post(route("tuitions.store"),groupData, {
            forceFormData: true,
            onSuccess: () => {
                setIsLoading(false);
            },
            onError: (error) => {
                console.log({ error });
                setIsLoading(false);
                showToast({icon: "error", text: Object.values(error).join('\n') , title: "Error al crear el estudiante"});
            },
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="col-span-12 border px-4 py-3 rounded-lg mt-5">
                    <div className="col-span-12 flex justify-between items-center">
                        <h2 className=" text-slate-700 border-b-1 font-bold text-3xl">
                            Estudiante
                        </h2>
                        <button
                            onClick={(e) => setIsOpen(true)}
                            type="button"
                            className="px-3 py-1 bg-slate-600 text-white rounded-sm my-2 shadow-sm"
                        >
                            El estudiante ya existe
                        </button>
                    </div>
                    <hr />
                    <br />
                    <div className="grid md:grid-cols-12 gap-4">
                        <FormStudent
                            register={register}
                            courses={(props as any).courses}
                            docTypes={(props as any).docTypes}
                            errors={errors as any}
                            genders={(props as any).genders}
                            // onSubmit={onSubmit}
                            handlerSetForm={handlerSetForm}
                            form={form}
                        ></FormStudent>
                    </div>
                </div>

                <div className="border px-4 py-3 rounded-lg mt-5">
                    <h2 className="col-span-12 text-slate-700 border-b-1 font-bold text-3xl">
                        Representante
                    </h2>
                    <hr />
                    <br />
                    <div className="grid md:grid-cols-12 gap-4">
                        <FormRepresentative
                            register={register}
                            courses={(props as any).courses}
                            docTypes={(props as any).docTypes}
                            errors={errors as any}
                            genders={(props as any).genders}
                            // onSubmit={onSubmit}
                            handlerSetForm={handlerSetForm}
                            form={form as any}
                        ></FormRepresentative>
                    </div>
                </div>
                <div className="border px-4 py-3 rounded-lg mt-5">
                    <h2 className="col-span-12 text-slate-700 border-b-1 font-bold text-3xl">
                        Otros Datos
                    </h2>
                    <hr />
                    <br />
                    <div className="grid md:grid-cols-12 gap-4">
                        <div className="md:col-span-4">
                            <label htmlFor="r_gender">Periodo</label>
                            <select
                                // value={(props.period as any)?.[0].id}
                                className={`${
                                    errors.r_gender && "invalid-control"
                                } form-control w-full `}
                                {...register("r_gender", { required: true })}
                            >
                                {(props.period as any)?.map(
                                    (item: any, index: number) => {
                                        return (
                                            <option
                                                className="p-3"
                                                key={index}
                                                value={item.id}
                                            >
                                                {item.promotion} desde{" "}
                                                {item.start_date} -{" "}
                                                {item.end_date}
                                            </option>
                                        );
                                    }
                                )}
                            </select>
                            {errors?.r_gender?.type === "required" && (
                                <small className="text-red-600">
                                    El Genero es requerido
                                </small>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-span-12 my-3">
                    <button
                        // disabled={isLoading}
                        className="rounded-md bg-slate-800 text-white px-3 py-2"
                        type="submit"
                    >
                        Generar matricula{" "}
                        <i className="fa-regular fa-paper-plane"></i>
                    </button>
                </div>
            </form>
        </div>
    );
};
export default FormCreateOrEditTuition;
