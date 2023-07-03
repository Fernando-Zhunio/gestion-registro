import { useEffect } from "react";
import SelectCourse from "./components/SelectCourse";
import AirDatepicker from "air-datepicker";
import localeEs from "air-datepicker/locale/es";
import { ConstDocTypes, ValueDocTypes } from "@/Classes/Consts";

interface FormTeacherProps {
    // handlerSetForm: (key: any, value: any) => void;
    onSubmit?: (data: any) => void;
    // form: IStudent;
    errors: any;
    // genders: { label: string; value: string }[];
    // courses: { id: number; name: string; nivel: string }[];
    // docTypes: { label: string; value: string }[];
    register: any;
    setValue: any;
    isEdit: boolean
    control: any
    data: any
    // img?: string;
    // validators?: { [key: string]: any };
}
const FormTeacher = ({ 
    errors,
    register,
    control,
}: FormTeacherProps) => {
    useEffect(() => {
        new AirDatepicker("#birthday", {
            locale: localeEs,
            dateFormat: "yyyy-MM-dd",
        });

        new AirDatepicker("#working_day", {
            locale: localeEs,
            dateFormat: "yyyy-MM-dd",
        });
        

        // if (validators) {
        //     setValidator((prevState: any) => {
        //         return {
        //             ...prevState,
        //             ...validators,
        //         };
        //     });
        // }
    }, []);
    return (
        <>
            <div className="md:col-span-6">
                <label htmlFor="first_name">*Nombres:</label>
                <input
                    id="first_name"
                    type="text"
                    placeholder="Ingrese los nombres"
                    className={`${
                        errors.first_name && "invalid-control"
                    } form-control w-full `}
                    {...register("first_name", { required: true })}
                    aria-invalid={errors.first_name ? "true" : "false"}
                />
                {errors?.first_name?.type === "required" && (
                    <small className="text-red-600">
                        Los nombre son requerido
                    </small>
                )}
            </div>

            <div className="md:col-span-6">
                <label htmlFor="last_name">*Apellidos:</label>
                <input
                    id="last_name"
                    type="text"
                    placeholder="Ingrese los apellidos"
                    className={`${
                        errors.last_name && "invalid-control"
                    } form-control w-full `}
                    {...register("last_name", { required: true })}
                    aria-invalid={errors.last_name ? "true" : "false"}
                />
                {errors?.last_name?.type === "required" && (
                    <small className="text-red-600">
                        Los apellidos son requerido
                    </small>
                )}
            </div>

            <div className="md:col-span-6">
                <label htmlFor="email">*Correo:</label>
                <input
                    id="email"
                    type="text"
                    placeholder="Ingrese el correo electronico"
                    className={`${
                        errors.email && "invalid-control"
                    } form-control w-full `}
                    {...register("email", { required: true })}
                    aria-invalid={errors.email ? "true" : "false"}
                />
                {errors?.email?.type === "required" && (
                    <small className="text-red-600">
                        El correo electronico son requerido
                    </small>
                )}
            </div>

            <div className="md:col-span-6">
                <label htmlFor="address">*Dirección:</label>
                <input
                    id="address"
                    type="text"
                    placeholder="Ingrese la dirección"
                    className={`${
                        errors.address && "invalid-control"
                    } form-control w-full `}
                    {...register("address", { required: true })}
                    aria-invalid={errors.address ? "true" : "false"}
                />
                {errors?.address?.type === "required" && (
                    <small className="text-red-600">
                        El dirección son requerido
                    </small>
                )}
            </div>

            <div className="md:col-span-4">
                <label htmlFor="phone">*Teléfono:</label>
                <input
                    id="phone"
                    type="text"
                    placeholder="Ingrese el teléfono"
                    className={`${
                        errors.phone && "invalid-control"
                    } form-control w-full `}
                    {...register("phone", { required: true })}
                    aria-invalid={errors.phone ? "true" : "false"}
                />
                {errors?.phone?.type === "required" && (
                    <small className="text-red-600">
                        El teléfono es requerido
                    </small>
                )}
            </div>

            <div className="md:col-span-4">
                <label htmlFor="birthday">*Fecha de nacimiento:</label>
                <input
                    id="birthday"
                    type="text"
                    readOnly={true}
                    placeholder="Ingrese la fecha de nacimiento"
                    className={`${
                        errors.birthday && "invalid-control"
                    } form-control w-full `}
                    {...register("birthday", { required: true })}
                    aria-invalid={errors.birthday ? "true" : "false"}
                />
                {errors?.birthday?.type === "required" && (
                    <small className="text-red-600">
                        La fecha de nacimiento es requerido
                    </small>
                )}
            </div>

            <div className="md:col-span-4">
                <label htmlFor="working_day">*Fecha de contratación:</label>
                <input
                    id="working_day"
                    type="text"
                    readOnly={true}
                    placeholder="Ingrese la fecha de contratación"
                    className={`${
                        errors.working_day && "invalid-control"
                    } form-control w-full `}
                    {...register("working_day", { required: true })}
                    aria-invalid={errors.working_day ? "true" : "false"}
                />
                {errors?.working_day?.type === "required" && (
                    <small className="text-red-600">
                        La fecha de contratación es requerida
                    </small>
                )}
            </div>

            <div className="md:col-span-6">
                <label htmlFor="academic_title">*Titulo académico:</label>
                <input
                    id="academic_title"
                    type="text"
                    placeholder="Ingrese el titulo académico"
                    className={`${
                        errors.academic_title && "invalid-control"
                    } form-control w-full `}
                    {...register("academic_title", { required: true })}
                    aria-invalid={errors.academic_title ? "true" : "false"}
                />
                {errors?.academic_title?.type === "required" && (
                    <small className="text-red-600">
                        El titulo académico es requerido
                    </small>
                )}
            </div>

            <div className="md:col-span-6">
                <label htmlFor="doc_type">*Tipo de documento:</label>
                <select
                    id="doc_type"
                    type="text"
                    placeholder="Ingrese el tipo de documento"
                    className={`${
                        errors.doc_type && "invalid-control"
                    } form-control w-full `}
                    {...register("doc_type", { required: true })}
                    aria-invalid={errors.doc_type ? "true" : "false"}
                >
                    {
                        ValueDocTypes().map((item, index) => (
                            <option key={item.value} value={item.value}>{item.text}</option>
                        ))
                    }
                </select>
                {errors?.doc_type?.type === "required" && (
                    <small className="text-red-600">
                        El titulo académico es requerido
                    </small>
                )}
            </div>


            <div className="md:col-span-6">
                <label htmlFor="doc_number">*Número de documento:</label>
                <input
                    id="doc_number"
                    type="text"
                    placeholder="Ingrese el número de documento"
                    className={`${
                        errors.doc_number && "invalid-control"
                    } form-control w-full `}
                    {...register("doc_number", { required: true })}
                    aria-invalid={errors.doc_number ? "true" : "false"}
                />
                {errors?.doc_number?.type === "required" && (
                    <small className="text-red-600">
                        El titulo académico es requerido
                    </small>
                )}
            </div>
        </>
    );
};

export default FormTeacher;
