import { useEffect } from "react";
import SelectCourse from "./components/SelectCourse";
import AirDatepicker from "air-datepicker";
import localeEs from "air-datepicker/locale/es";
import { ConstDocTypes, ValueDocTypes } from "@/Classes/Consts";
import Input from "@/Components/Input";
import InputDate from "@/Components/InputDate";

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
    isEdit: boolean;
    control: any;
    data: any;
    // img?: string;
    // validators?: { [key: string]: any };
}
const FormTeacher = ({ errors, register, control, setValue }: FormTeacherProps) => {
    useEffect(() => {
        // new AirDatepicker("#birthday", {
        //     locale: localeEs,
        //     dateFormat: "yyyy-MM-dd",
        // });

        // new AirDatepicker("#working_day", {
        //     locale: localeEs,
        //     dateFormat: "yyyy-MM-dd",
        // });

        // new AirDatepicker("#start_date", {
        //     locale: localeEs,
        //     dateFormat: "yyyy-MM-dd",
        // });
        // new AirDatepicker("#end_date", {
        //     locale: localeEs,
        //     dateFormat: "yyyy-MM-dd",
        // });

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
                <Input
                    label="Nombres"
                    control={control}
                    name="first_name"
                    placeholder="Ingrese los nombres"
                    rules={{ required: true }}
                />
            </div>

            <div className="md:col-span-6">
                <Input
                    label="Apellidos"
                    control={control}
                    name="last_name"
                    placeholder="Ingrese los apellidos"
                    rules={{ required: true }}
                />
            </div>

            <div className="md:col-span-6">
                <Input
                    label="Correo"
                    control={control}
                    name="email"
                    type="email"
                    placeholder="Ingrese el correo electronico"
                    rules={{ required: true }}
                />
            </div>

            <div className="md:col-span-6">
                <Input
                    label="Dirección"
                    control={control}
                    name="address"
                    placeholder="Ingrese la dirección"
                    rules={{ required: true }}
                />
            </div>

            <div className="md:col-span-4">
                <Input
                    label="Teléfono"
                    control={control}
                    name="phone"
                    placeholder="Ingrese el teléfono"
                    rules={{ required: true }}
                />
            </div>

            <div className="md:col-span-4">
                <InputDate
                    setValue={setValue}
                    label="Fecha de nacimiento"
                    readOnly={true}
                    control={control}
                    name="birthday"
                    id="birthday"
                    placeholder="Ingrese la fecha de nacimiento"
                    rules={{ required: true }}
                />
            </div>

            <div className="md:col-span-4">
                <InputDate
                    setValue={setValue}
                    label="Fecha de contratación"
                    readOnly={true}
                    control={control}
                    name="working_day"
                    id="working_day"
                    placeholder="Ingrese la fecha de contratación"
                    rules={{ required: true }}
                />
            </div>

            <div className="md:col-span-6">
                <Input
                    label="Titulo académico"
                    control={control}
                    name="academic_title"
                    placeholder="Ingrese el titulo académico"
                    rules={{ required: true }}
                />
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
                    {ValueDocTypes().map((item, index) => (
                        <option key={item.value} value={item.value}>
                            {item.text}
                        </option>
                    ))}
                </select>
                {errors?.doc_type?.type === "required" && (
                    <small className="text-red-600">
                        El titulo académico es requerido
                    </small>
                )}
            </div>

            <div className="md:col-span-6">
                <Input
                    label="Número de documento"
                    control={control}
                    name="doc_number"
                    type="number"
                    placeholder="Ingrese el número de documento"
                    rules={{ required: true }}
                />
            </div>

            <div className="md:col-span-6">
                <InputDate
                    setValue={setValue}
                    label="Inicio de contrato"
                    readOnly={true}
                    control={control}
                    name="start_date"
                    id="start_date"
                    placeholder="Ingrese del inicio de contrato"
                    rules={{ required: true }}
                />
            </div>
            <div className="md:col-span-6">
                <InputDate
                    setValue={setValue}
                    readOnly={true}
                    type="text"
                    id="end_date"
                    label="Fin de contrato"
                    control={control}
                    name="end_date"
                    placeholder="Ingrese del fin de contrato"
                />
            </div>
            <div className="md:col-span-6">
                <Input
                    type="number"
                    label="Salario"
                    rules={{ required: true }}
                    control={control}
                    name="salary"
                    placeholder="Ingrese el salario"
                />
            </div>
        </>
    );
};

export default FormTeacher;
