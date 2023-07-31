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
import { IRepresentative } from "@/Pages/Representatives/types/representatives";
import { ConstDocTypes, ConstGender } from "@/Classes/Consts";
import Input from "@/Components/Input";

interface FormCreateOrEditTuitionProps {
    // handlerSetForm: (key: any, value: any) => void;
    // form: any;
    // errors: any;
    isEdit: boolean;

    openSearch: (type?: "student" | "representative") => void;
    representative?: IRepresentative | null;
    clearRepresentative: () => void;
}

// const representativeKeys = [
//     "id",
//     "first_name",
//     "last_name",
//     "email",
//     "phone",
//     "address",
//     "doc_type",
//     "doc_number",
//     "occupation",
//     "gender",
// ];

const studentKeys = [
    "id",
    "first_name",
    "last_name",
    "email",
    "phone",
    "address",
    "doc_type",
    "doc_number",
    "birthday",
    "gender",
    "photo",
    "previous_institution",
    "illness_or_disability",
    "course_id",
    "representative_id",
    "user_id",
];

const FormCreateOrEditTuition = ({
    // handlerSetForm,
    openSearch,
    representative,
    isEdit,
    clearRepresentative,
}: FormCreateOrEditTuitionProps) => {
    const { props } = usePage();
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const {
        register,
        formState: { errors },
        setValue,
        control,
        handleSubmit,
    } = useForm();

    useEffect(() => {
        if (props.data) {
            const { student } = (props as any).data;
            studentKeys.forEach((key) => {
                if (student.hasOwnProperty(key)) {
                    setValue(key, student[key]);
                }
            });
            // const representative = student.representative;
            // representativeKeys.forEach((key) => {
            //     if (representative.hasOwnProperty(key)) {
            //         setValue(`r_${key}`, representative[key]);
            //     }
            // });
        }
    }, []);

    const onSubmit = (data: any) => {
        console.log(data);
        // const groupData = Object.keys(data).reduce(
        //     (result: any, key: string) => {
        //         const prefix = key.substring(0, 2);
        //         if (prefix === "r_") {
        //             result.representative[key.replace("r_", "")] = data[key];
        //         } else {
        //             result.student[key] = data[key];
        //         }
        //         return result;
        //     },
        //     { student: {}, representative: {} }
        // );
        setIsLoading(true);
        data['photo'] = data['photo'][0];

        const options = {
            forceFormData: true,
            onSuccess: () => {
                setIsLoading(false);
            },
            onError: (error: any) => {
                console.log({ error });
                setIsLoading(false);
                showToast({
                    icon: "error",
                    text: Object.values(error).join("\n"),
                    title: "Error al crear el estudiante",
                });
            },
        };
        if (!representative) {
           showToast({
               icon: "error",
               text: "Debe seleccionar un representante",
               title: "Error al crear el estudiante",
           })
           return;
        }
        router.post(route("tuitions.store"), data, options);
        // }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="col-span-12 border px-4 py-3 rounded-lg mt-5">
                    <div className="col-span-12 flex justify-between items-center">
                        <h2 className=" text-slate-700 border-b-1 font-bold text-3xl">
                            Estudiante
                        </h2>
                        {!isEdit && (
                            <button
                                onClick={(e) => openSearch()}
                                type="button"
                                className="px-3 py-1 bg-slate-600 text-white rounded-sm my-2 shadow-sm"
                            >
                                El estudiante ya existe
                            </button>
                        )}
                    </div>
                    <hr />
                    <br />
                    <div className="grid md:grid-cols-12 gap-4">
                        <FormStudent
                            control={control}
                            setValue={setValue}
                            _parallels={[]}
                            register={register}
                            courses={(props as any).courses}
                            docTypes={(props as any).docTypes}
                            errors={errors as any}
                            genders={(props as any).genders}
                            img={(props as any)?.data.student?.photo}
                        ></FormStudent>
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
                            {/* <label htmlFor="email">*Correo electrónico:</label>
                            <input
                                id="email"
                                type="text"
                                placeholder="Ingrese un correo electrónico"
                                className={`${
                                    errors.email && "invalid-control"
                                } form-control w-full `}
                                {...register("email", { required: true })}
                                aria-invalid={errors.email ? "true" : "false"}
                            />
                            {errors?.email?.type === "required" && (
                                <small className="text-red-600">
                                    El correo es requerido
                                </small>
                            )} */}
                            <Input
                                control={control}
                                name="email"
                                label="Correo electrónico"
                                rules={{ required: true }}
                            />
                        </div>
                        <div className="md:col-span-8">
                            <div>*Representante</div>
                            <div className="flex gap-2 items-center mt-1">
                                <button
                                    className="text-white rounded-md px-2 py-1 bg-slate-900"
                                    type="button"
                                    onClick={() => openSearch("representative")}
                                >
                                    Buscar
                                </button>
                                <button
                                    onClick={() => setIsOpen(true)}
                                    className="text-white rounded-md px-2 py-1 bg-lime-600"
                                    type="button"
                                >
                                    Crear
                                </button>
                                <div className="leading-none">
                                    <div>
                                        {representative?.first_name}{" "}
                                        {representative?.last_name}
                                    </div>
                                    <small className="text-gray-500">
                                        {representative?.email} /{" "}
                                        {representative?.doc_number}
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 my-3">
                    <button
                        disabled={isLoading}
                        className="rounded-md bg-slate-800 text-white px-3 py-2"
                        type="submit"
                    >
                        {isEdit ? "Actualizar" : "Generar"} matricula{" "}
                        <i className="fa-regular fa-paper-plane"></i>
                    </button>
                </div>
            </form>
            {isOpen && (
                <FormRepresentative
                    returnJson={true}
                    representative={null}
                    isOpen={isOpen}
                    setOpen={setIsOpen}
                />
            )}
        </div>
    );
};
export default FormCreateOrEditTuition;
