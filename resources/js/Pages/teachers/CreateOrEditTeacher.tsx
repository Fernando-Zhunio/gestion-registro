import { router, useForm as useFormInertia } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
// import FormControl from "@mui/material/FormControl";
// import FormLabel from "@mui/material/FormLabel";
// import Input from "@mui/material/Input";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
// import { type CreateOrEditProps } from "@/types/global";
// import InputLabel from "@/Components/InputLabel";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import { ITeacher } from "@/Models/teacher";
import { IPeriod } from "@/Models/period";
import { useFormValidation } from "@/Hooks/FormValidation";
import { Validator } from "@/Classes/Validator";
import Swal from "sweetalert2";
import { showToast } from "@/Helpers/alerts";
import ConvertValidationError from "@/Helpers/convertValidationError";
import dayjs from "dayjs";
import FormTeacher from "@/Shared/FormTeachers";
import { useForm } from "react-hook-form";
import AirDatepicker from "air-datepicker";
import localeEs from "air-datepicker/locale/es";
import { patchValues } from "@/Helpers/patchValues";
import Input from "@/Components/Input";
import Textarea from "@/Components/Textarea";

// import { useFormValidation } from "@/Hooks/FormValidation";
// import { Validator } from "@/Classes/Validator";
const CreateOrEditTeacher = ({
    isEdit,
    teacher,
}: // periods,

{
    isEdit: boolean;
    teacher?: ITeacher;
    // periods: IPeriod[];
}) => {
    const [isLoading, setIsLoading] = useState(false);
    // const {
    //     data: values,
    //     post,
    //     put,
    //     setData: setValues,
    //     // errors,
    // } = useFormInertia<any>({
    //     first_name: "",
    //     last_name: "",
    //     email: "",
    //     phone: "",
    //     address: "",
    //     doc_type: "",
    //     doc_number: "",
    //     birthday: "",
    //     academic_title: "",
    //     working_day: "",
    //     period_id: "",

    //     observation: "",
    //     start_date: "",
    //     end_date: "",
    //     contract_file: "",
    //     contract_state: "",
    //     contract_type: "",
    //     salary: "",
    // });
    // const { errors: errorsValidator, handleChange } = useFormValidation(
    //     values,
    //     setValues
    // );

    useEffect(() => {
        if (isEdit) {
            
        }
    }, []);

    // function handleChangeDate(key: string, value: any) {
    //     // value = value?.format("YYYY-MM-DD");
    //     setValues((values: any) => ({
    //         ...values,
    //         [key]: value,
    //     }));
    // }

    // function handleChangeSimple(key: string, value: any) {
    //     setValues((values: any) => ({
    //         ...values,
    //         [key]: value,
    //     }));
    // }

    const {
        register,
        formState: { errors },
        setValue,
        handleSubmit,
        setError,
        reset,
        control,
    } = useForm({
        defaultValues: {
            ...patchValues({first_name: "",
            last_name: "",
            email: "",
            phone: "",
            address: "",
            doc_type: "",
            doc_number: "",
            birthday: "",
            academic_title: "",
            working_day: "",
            observation: "",
            start_date: "",
            end_date: "",
            contract_file: "",
            contract_state: "",
            contract_type: "",
            salary: "",}, teacher)
        },
        // defaultValues: teacher,
    });
    const [isContractDefined, setIsContractDefined] = useState(false);

    // useEffect(() => {
        // new AirDatepicker("#start_date", {
        //     locale: localeEs,
        //     dateFormat: "yyyy-MM-dd",
        //     onChangeView: function (view: any) {
        //         console.log({ view });
        //     },
        //     onSelect: function ({ date, formattedDate, datepicker }) {
        //         console.log({ date, formattedDate, datepicker });
        //         setValue("start_date", formattedDate);
        //     },
        // });
        // new AirDatepicker("#end_date", {
        //     locale: localeEs,
        //     dateFormat: "yyyy-MM-dd",
        //     onSelect: function ({ date, formattedDate, datepicker }) {
        //         console.log({ date, formattedDate, datepicker });
        //         setValue("end_date", formattedDate);
        //     },
        // });

        // if (validators) {
        //     setValidator((prevState: any) => {
        //         return {
        //             ...prevState,
        //             ...validators,
        //         };
        //     });
        // }
    // }, []);

    const onSubmit = (_data: any) => {
        console.log({ _data });
        if (!isEdit) {
            router.post("/teachers", _data, {
                preserveState: true,
                onSuccess: (e) => {
                    console.log({ e });
                    setIsLoading(false);
                    // setIsOpen(false);
                    reset();
                },
                onError: (e) => {
                    showToast({
                        icon: "error",
                        text: Object.values(e).join("\n"),
                        title: "Error al crear el estudiante",
                    });
                    
                    setIsLoading(false);
                },
            });
        } else {
            console.log({ teacher });
            router.put(`/teachers/${teacher?.id}`, _data, {
                preserveState: true,
                replace: false,
                preserveScroll: true,
                onSuccess: (e) => {
                    console.log({ e });
                    setIsLoading(false);
                    // setIsOpen(false);
                },
                onError: (e) => {
                    showToast({
                        icon: "error",
                        text: Object.values(e).join("\n"),
                        title: "Error al crear el estudiante",
                    });
                    setIsLoading(false);
                },
            });
        }
    };
    return (
        <div className="px-5">
            <h1 className="title mb-4">
                {isEdit
                    ? `Editando profesor ${teacher?.first_name}`
                    : "Creando profesor"}
            </h1>
            <Card className="rounded-full">
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="p-5">
                        <h3 className="text-2xl text-gray-500 mb-2">
                            Datos del Maestro(a)
                        </h3>
                        <div className="grid md:grid-cols-12 gap-5">
                            <FormTeacher
                                data={null}
                                isEdit={isEdit}
                                setValue={setValue}
                                register={register}
                                control={control}
                                errors={errors}
                            />
                        </div>
                        {/* <Divider className="py-3" />
                        <h3 className="text-2xl text-gray-500 mt-4 mb-2">
                            Datos del contrato
                        </h3>
                        <div className="grid md:grid-cols-12 gap-5">
                            <div className="md:col-span-6">
                                <label htmlFor="contract_type">
                                    *Tipo de contrato:
                                </label>
                                <select
                                    id="contract_type"
                                    placeholder="Ingrese el tipo de contrato"
                                    className={`${
                                        errors.contract_type &&
                                        "invalid-control"
                                    } form-control w-full `}
                                    {...register("contract_type", {
                                        required: true,
                                    })}
                                    onChange={(e) => {
                                        setIsContractDefined(
                                            e.target.value == "defined"
                                        );
                                    }}
                                >
                                    <option value="undefined">
                                        Indefinido
                                    </option>
                                    <option value="defined">Definido</option>
                                </select>
                                {errors?.contract_type?.type === "required" && (
                                    <small className="text-red-600">
                                        El titulo académico es requerido
                                    </small>
                                )}
                            </div>

                            <div
                                className={`md:col-span-6 `}
                            >
                                <label htmlFor="start_date">
                                    *Inicio de contrato:
                                </label>
                                <input
                                    id="start_date"
                                    type="text"
                                    readOnly={true}
                                    placeholder="Ingrese del inicio de contrato"
                                    className={`form-control w-full`}
                                    {...register("start_date", {
                                        required: isContractDefined,
                                    })}
                                    aria-invalid={
                                        errors.start_date ? "true" : "false"
                                    }
                                />
                                {errors?.start_date?.type === "required" && (
                                    <small className="text-red-600">
                                        El inicio de contrato es requerido
                                    </small>
                                )}
                            </div>

                            <div
                                className={`md:col-span-6 ${
                                    isContractDefined ? "block" : "hidden"
                                }`}
                            >
                                {/* <label htmlFor="end_date">
                                    *Fin de contrato:
                                </label>
                                <input
                                    id="end_date"
                                    type="text"
                                    readOnly={true}
                                    placeholder="Ingrese del fin de contrato"
                                    className={`${
                                        errors.end_date && "invalid-control"
                                    } form-control w-full `}
                                    {...register("end_date", {
                                        required: isContractDefined,
                                    })}
                                />
                                {errors?.start_date?.type === "required" && (
                                    <small className="text-red-600">
                                        El fin de contrato es requerido
                                    </small>
                                )} 
                                <div className="md:col-span-6">
                                    <Input
                                        readOnly={true}
                                        type="text"
                                        id="end_date"
                                        label="Fin de contrato"
                                        rules={{ required: isContractDefined }}
                                        control={control}
                                        name="end_date"
                                        placeholder="Ingrese del fin de contrato"
                                    />
                                </div>
                            </div>

                            <div className="md:col-span-6">
                                {/* <label htmlFor="salary">*Salario:</label>
                                <input
                                    id="salary"
                                    type="text"
                                    placeholder="Ingrese el salario"
                                    className={`${
                                        errors.salary && "invalid-control"
                                    } form-control w-full `}
                                    {...register("salary", {
                                        required: true,
                                    })}
                                    aria-invalid={
                                        errors.salary ? "true" : "false"
                                    }
                                />
                                {errors?.salary?.type === "required" && (
                                    <small className="text-red-600">
                                        El salario es requerido
                                    </small>
                                )} 
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
                            </div>

                            {/* <div className="md:col-span-6">
                                <label htmlFor="observation">
                                    *Observación:
                                </label>
                                <textarea
                                    id="observation"
                                    placeholder="Ingrese el observación"
                                    className={`${
                                        errors.observation && "invalid-control"
                                    } form-control w-full `}
                                    {...register("observation", {
                                        required: true,
                                    })}
                                    aria-invalid={
                                        errors.observation ? "true" : "false"
                                    }
                                ></textarea>
                                
                            </div> 

                            <div className="md:col-span-6">
                                <Textarea
                                    label="Observación"
                                    
                                    control={control}
                                    name="observation"
                                    placeholder="Ingrese la observación"
                                />
                            </div>
                        </div> */}
                        <div className="mt-5">
                            <button
                                disabled={isLoading}
                                className="btn-custom btn-store"
                            >
                                Guardar
                                <i className="fa-regular fa-paper-plane"></i>
                            </button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default CreateOrEditTeacher;
