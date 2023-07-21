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

interface FormCreateOrEditTuitionProps {
    // handlerSetForm: (key: any, value: any) => void;
    // form: any;
    // errors: any;
    isEdit: boolean;
    openSearch: (type?: "student" | "representative") => void;
    representative?: IRepresentative | null;
    clearRepresentative: () => void;
}

const representativeKeys = [
    "id",
    "first_name",
    "last_name",
    "email",
    "phone",
    "address",
    "doc_type",
    "doc_number",
    "occupation",
    "gender",
];

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
    representative: representatives,
    isEdit,
    clearRepresentative,
}: FormCreateOrEditTuitionProps) => {
    const { props } = usePage();
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        formState: { errors },
        setValue,
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
            const representative = student.representative;
            representativeKeys.forEach((key) => {
                if (representative.hasOwnProperty(key)) {
                    setValue(`r_${key}`, representative[key]);
                }
            });
        }
    }, []);

    const onSubmit = (data: any) => {
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
        groupData.student.photo = groupData.student.photo[0];

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
        // if (isEdit) {
        //     router.put(
        //         route("tuitions.update", (props as any).data.id),
        //         groupData,
        //         options
        //     );
        // } else {
            if (representatives) {
                groupData['representative_id'] = representatives.id;
            }
            router.post(route("tuitions.store"), groupData, options);
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
                            register={register}
                            courses={(props as any).courses}
                            docTypes={(props as any).docTypes}
                            errors={errors as any}
                            genders={(props as any).genders}
                            // onSubmit={onSubmit}
                            // handlerSetForm={handlerSetForm}
                            img={(props as any)?.data.student?.photo}
                            // form={form}
                        ></FormStudent>
                    </div>
                </div>

                {!representatives ? (
                    <div className="border px-4 py-3 rounded-lg mt-5">
                        <div className="col-span-12 flex justify-between items-center">
                            <h2 className=" text-slate-700 border-b-1 font-bold text-3xl">
                                Representante
                            </h2>
                            {!isEdit && (
                                <button
                                    onClick={(e) =>
                                        openSearch("representative")
                                    }
                                    type="button"
                                    className="px-3 py-1 bg-slate-600 text-white rounded-sm my-2 shadow-sm"
                                >
                                    El representante ya existe
                                </button>
                            )}
                        </div>
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
                                // handlerSetForm={handlerSetForm}
                                // form={form as any}
                            ></FormRepresentative>
                        </div>
                    </div>
                ) : (
                    <div className="col-span-12 border px-4 py-3 rounded-lg mt-5">
                        <div className="col-span-12 flex justify-between items-center">
                            <h2 className="flex items-center text-slate-700 border-b-1 font-bold text-3xl">
                                Representante
                            </h2>
                            <button
                                onClick={(e) => clearRepresentative()}
                                type="button"
                                className="px-3 py-1 bg-slate-600 text-white rounded-sm my-2 shadow-sm"
                            >
                                El representante no existe
                            </button>
                        </div>
                        <hr />
                        <br />
                        <div className="grid md:grid-cols-12 gap-4">
                            <div className="md:col-span-3">
                                <h3 className="bold text-2xl">Nombres:</h3>
                                {representatives.first_name}
                            </div>
                            <div className="md:col-span-3">
                                <h3 className="bold text-2xl">Apellidos:</h3>
                                {representatives.last_name}
                            </div>
                            <div className="md:col-span-3">
                                <h3 className="bold text-2xl">
                                    Correo electrónico:
                                </h3>
                                {representatives.email}
                            </div>
                            {/* <div className="md:col-span-3">
                        <h3 className="bold text-2xl">
                            Fecha de nacimiento:
                        </h3>
                        {student.birthday}
                    </div> */}
                            <div className="md:col-span-6">
                                <h3 className="bold text-2xl">Dirección:</h3>
                                {representatives.address}
                            </div>
                            <div className="md:col-span-3">
                                <h3 className="bold text-2xl">Sexo:</h3>
                                {
                                    (ConstGender() as any)[
                                        representatives.gender as any
                                    ]
                                }
                            </div>
                            <div className="md:col-span-3">
                                <h3 className="bold text-2xl">Teléfono:</h3>
                                {representatives.phone}
                            </div>
                            <div className="md:col-span-3">
                                <h3 className="bold text-2xl">
                                    Tipo de documento:
                                </h3>
                                {
                                    (ConstDocTypes() as any)[
                                        representatives.doc_type as any
                                    ]
                                }
                            </div>
                            <div className="md:col-span-3">
                                <h3 className="bold text-2xl">
                                    # de documento:
                                </h3>
                                {
                                        representatives.doc_number  
                                    
                                }
                            </div>
                        </div>
                    </div>
                )}

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
                                    El Periodo es requerido
                                </small>
                            )}
                        </div>
                        <div className="md:col-span-4">
                            <label htmlFor="email">*Correo electrónico:</label>
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
                        {isEdit ? "Actualizar" : "Generar"} matricula{" "}
                        <i className="fa-regular fa-paper-plane"></i>
                    </button>
                </div>
            </form>
        </div>
    );
};
export default FormCreateOrEditTuition;
