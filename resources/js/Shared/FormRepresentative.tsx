import AirDatepicker from "air-datepicker";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import localeEs from "air-datepicker/locale/es";
import { IRepresentative } from "@/Pages/Representatives/types/representatives";

interface FormRepresentativeProps {
    // handlerSetForm: (key: any, value: any) => void;
    // onSubmit: (data: any) => void;
    // form: IRepresentative;
    errors: any;
    genders: { label: string; value: string }[];
    courses: { id: number; name: string; nivel: string }[];
    docTypes: { label: string; value: string }[];
    register: any;
}

export default function FormRepresentative({
    // handlerSetForm,
    errors,
    // onSubmit,
    // form,
    register,
    // errors: errorsInertia,
    genders,
    // courses,
    docTypes,
}: FormRepresentativeProps) {
    // const {
    //     register,
    //     formState: { errors },
    //     handleSubmit,
    // } = useForm();
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

    // const onSubmit = (data: any) => {
    //     console.log(data);
    // };
    return (
        <>
            {/* Nombres - r_first_name */}
            <div className="md:col-span-6">
                <label htmlFor="r_first_name">*Nombres:</label>
                <input
                    id="r_first_name"
                    type="text"
                    placeholder="Ingrese el nombre"
                    className={`${
                        errors.r_first_name && "invalid-control"
                    } form-control w-full `}
                    {...register("r_first_name", { required: true })}
                    aria-invalid={errors.r_first_name ? "true" : "false"}
                />
                {errors?.r_first_name?.type === "required" && (
                    <small className="text-red-600">
                        Los nombres es requerido
                    </small>
                )}
            </div>
            {/* Apellidos - r_last_name */}
            <div className="md:col-span-6">
                <label htmlFor="r_last_name">*Apellidos:</label>
                <input
                    type="text"
                    className={`${
                        errors.r_last_name && "invalid-control"
                    } form-control w-full `}
                    {...register("r_last_name", { required: true })}
                />
                {errors?.r_last_name?.type === "required" && (
                    <small className="text-red-600">
                        Los apellidos es requerido
                    </small>
                )}
            </div>

            {/* correo electronico - r_email */}
            <div className="md:col-span-4">
                <label htmlFor="r_email">*Correo electrónico:</label>
                <input
                    id="r_email"
                    type="text"
                    placeholder="Ingrese la fecha de nacimiento"
                    className={`${
                        errors.r_email && "invalid-control"
                    } form-control w-full `}
                    {...register("r_email", { required: true })}
                    aria-invalid={errors.r_email ? "true" : "false"}
                />
                {errors?.r_email?.type === "required" && (
                    <small className="text-red-600">
                        El correo es requerido
                    </small>
                )}
            </div>

            {/* telefono - r_phone */}
            <div className="md:col-span-4">
                <label htmlFor="r_phone">Teléfono</label>
                <input
                    type="number"
                    min={0}
                    className={`form-control w-full `}
                    {...register("r_phone", { required: true })}
                />
                {errors?.r_phone?.type === "required" && (
                    <small className="text-red-600">
                        El teléfono es requerido
                    </small>
                )}
            </div>

            {/* genero - r_gender */}
            <div className="md:col-span-4">
                <label htmlFor="r_gender">*Genero</label>
                <select
                    id="r_gender"
                    className={`${
                        errors.r_gender && "invalid-control"
                    } form-control w-full `}
                    {...register("r_gender", { required: true })}
                >
                    {genders?.map((item: any, index: number) => {
                        return (
                            <option key={index} value={item.value}>
                                {item.label}
                            </option>
                        );
                    })}
                </select>
                {errors?.r_gender?.type === "required" && (
                    <small className="text-red-600">
                        El Genero es requerido
                    </small>
                )}
            </div>

            {/* direccion - r_address */}
            <div className="md:col-span-8">
                <label htmlFor="r_address">*Dirección:</label>
                <input
                    id="r_address"
                    type="text"
                    placeholder="Ingrese la dirección"
                    className={`${
                        errors.r_address && "invalid-control"
                    } form-control w-full `}
                    {...register("r_address", { required: true })}
                    aria-invalid={errors.r_address ? "true" : "false"}
                />
                {errors?.r_address?.type === "required" && (
                    <small className="text-red-600">
                        La dirección es requerida
                    </small>
                )}
            </div>

            {/* tipo de documento - r_doc_type */}
            <div className="md:col-span-4">
                <label htmlFor="r_doc_type">*Tipo de documento</label>
                <select
                    className={`${
                        errors.r_doc_type && "invalid-control"
                    } form-control w-full `}
                    {...register("r_doc_type", { required: true })}
                >
                    {docTypes?.map((item: any) => {
                        return (
                            <option key={item.value} value={item.value}>
                                {item.label}
                            </option>
                        );
                    })}
                </select>
                {errors?.r_doc_type?.type === "required" && (
                    <small className="text-red-600">
                        El tipo de documento es requerido
                    </small>
                )}
            </div>

            {/* numero de documento - r_doc_number */}
            <div className="md:col-span-4">
                <label htmlFor="r_doc_number">*Numero de identificación:</label>
                <input
                    id="r_doc_number"
                    type="text"
                    placeholder="Ingrese la fecha de nacimiento"
                    className={`${
                        errors.r_doc_number && "invalid-control"
                    } form-control w-full `}
                    {...register("r_doc_number", { required: true })}
                    aria-invalid={errors.r_doc_number ? "true" : "false"}
                />
                {errors?.r_doc_number?.type === "required" && (
                    <small className="text-red-600">
                        El numero de identificación es requerido
                    </small>
                )}
            </div>

            {/* ocupación - r_occupation */}
            <div className="md:col-span-4">
                <label htmlFor="r_occupation">*Ocupación:</label>
                <input
                    id="r_occupation"
                    type="text"
                    placeholder="Ingrese la fecha de nacimiento"
                    className={`${
                        errors.r_occupation && "invalid-control"
                    } form-control w-full `}
                    {...register("r_occupation", { required: true })}
                    aria-invalid={errors.r_occupation ? "true" : "false"}
                />
                {errors?.r_occupation?.type === "required" && (
                    <small className="text-red-600">
                        La ocupación es requerido
                    </small>
                )}
            </div>
        </>
    );
}
