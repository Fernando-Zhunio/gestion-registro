import { router, useForm } from "@inertiajs/react";
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
// import { useFormValidation } from "@/Hooks/FormValidation";
// import { Validator } from "@/Classes/Validator";
 const CreateOrEditTeacher = ({
    isEdit,
    teacher,
    periods,
}: {
    isEdit: boolean;
    teacher: ITeacher;
    periods: IPeriod[];
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const {
        data: values,
        post,
        put,
        setData: setValues,
        errors,
    } = useForm<any>({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        address: "",
        doc_type: "",
        doc_number: "",
        birthday: "",
        academic_title: "",
        working_day: "",
        period_id: "",

        observation: "",
        start_date: "",
        end_date: "",
        contract_file: "",
        contract_state: "",
        contract_type: "",
        salary: "",
    });
    const {errors: errorsValidator, handleChange} = useFormValidation(values, setValues)

    // function handleChange(e: any) {
    //     const target = e?.target;
    //     const key = target?.id || target?.name;
    //     setValues((values: any) => ({
    //         ...values,
    //         [key]: target.value,
    //     }));
    // }

    function handleChangeDate(key: string, value: any) {
        // value = value?.format("YYYY-MM-DD");
        setValues((values: any) => ({
            ...values,
            [key]: value,
        }));
    }

    function handleChangeSimple(key: string, value: any) {
        setValues((values: any) => ({
            ...values,
            [key]: value,
        }));
    }

    function handlerSubmit(event: any): void {
        setIsLoading(true);
        event.preventDefault();
        const options = {
            preserveState: true,
            replace: false,
            preserveScroll: true,
            onSuccess: () => {
                router.get("/teachers");
            },
            onError: () => {
                setIsLoading(false);
            },
        };
        if (isEdit) {
            put(`/teachers/${teacher.id}`, options);
        } else {
            post(`/teachers`, options);
        }
    }

    return (
            <div className="px-5">
                <h1 className="title mb-4">
                    {isEdit
                        ? `Editando profesor ${teacher.first_name}`
                        : "Creando profesor"}
                </h1>
                <Card className="rounded-full">
                    <CardContent>
                        <form onSubmit={handlerSubmit} className="p-5">
                            <h3 className="text-2xl text-gray-500 mb-2">
                                Datos del Maestro(a)
                            </h3>
                            <div className="grid md:grid-cols-3 gap-5">
                                <div>
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        label="Nombres"
                                        value={values.first_name}
                                        id="first_name"
                                        helperText={errorsValidator?.first_name}
                                        error={Boolean(errorsValidator.first_name)}
                                        onChange={(e) => {
                                            handleChange('first_name', e.target.value, () => new Validator(e.target.value).required() );
                                        }}
                                    ></TextField>
                                </div>
                                <div>
                                    <TextField
                                        fullWidth
                                        required
                                        variant="filled"
                                        label="Apellidos"
                                        id="last_name"
                                        helperText={errorsValidator?.last_name}
                                        error={Boolean(errorsValidator.last_name)}
                                        value={values.last_name}
                                        onChange={(e) => handleChange('last_name', e.target.value, () => new Validator(e.target.value).required() )}
                                    ></TextField>
                                </div>
                                <div>
                                    <TextField
                                        fullWidth
                                        required
                                        variant="filled"
                                        label="Correo electrónico"
                                        type="email"
                                        id="email"
                                        helperText={errorsValidator?.email}
                                        error={Boolean(errorsValidator.email)}
                                        onChange={(e) => handleChange('email', e.target.value, () => new Validator(e.target.value).required().email() )}
                                        value={values.email}
                                    ></TextField>
                                </div>
                                <div className="md:col-span-3">
                                    <TextField
                                        className="w-full"
                                        required
                                        multiline
                                        variant="filled"
                                        label="Dirección"
                                        value={values.address}
                                        id="address"
                                        // onChange={handleChange}
                                    ></TextField>
                                </div>
                                <div>
                                    <TextField
                                        fullWidth
                                        required
                                        variant="filled"
                                        label="Teléfono"
                                        value={values.phone}
                                        type="number"
                                        id="phone"
                                        // onChange={handleChange}
                                    ></TextField>
                                </div>
                                
                                <div>
                                    <DatePicker
                                        onChange={(value: any) =>
                                            handleChangeDate("birthday", value)
                                        }
                                        className="w-full"
                                        slotProps={{
                                            textField: {
                                                variant: "filled",
                                                id: "birthday",
                                                fullWidth: true,
                                                required: true,
                                            },
                                        }}
                                        format="DD/MM/YYYY"
                                        disableFuture
                                        value={values.birthday}
                                        label="Año de nacimiento"
                                    />
                                </div>
                                <div>
                                    <DatePicker
                                        onChange={(value: any) =>
                                            handleChangeDate(
                                                "working_day",
                                                value
                                            )
                                        }
                                        className="w-full"
                                        slotProps={{
                                            textField: {
                                                variant: "filled",
                                                id: "working_day",
                                                required: true,
                                            },
                                        }}
                                        disableFuture
                                        value={values.working_day}
                                        label="Fecha de ingreso"
                                        defaultValue={new Date()}
                                    />
                                </div>
                               
                                <div className="md:col-span-2">
                                    <TextField
                                        className="w-full"
                                        required
                                        variant="filled"
                                        label="Titulo académico"
                                        value={values.academic_title}
                                        id="academic_title"
                                        // onChange={handleChange}
                                    ></TextField>
                                </div>
                                <div>
                                    <TextField
                                        select
                                        variant="filled"
                                        fullWidth={true}
                                        label="Tipo de documento"
                                        required
                                        value={values.doc_type}
                                        onChange={(value) =>
                                            handleChangeSimple(
                                                "doc_type",
                                                value.target.value
                                            )
                                        }
                                    >
                                        <MenuItem value="CI">
                                            Cédula de identidad
                                        </MenuItem>
                                        <MenuItem value="PASSPORT">
                                            Pasaporte
                                        </MenuItem>
                                    </TextField>
                                </div>
                                <div>
                                    <TextField
                                        className="w-full"
                                        required
                                        variant="filled"
                                        label="Número de documento"
                                        value={values.doc_number}
                                        id="doc_number"
                                        type="number"
                                        // onChange={handleChange}
                                    ></TextField>
                                </div>
                                
                                <div>
                                    <TextField
                                        id="outlined-select-currency"
                                        select
                                        variant="filled"
                                        fullWidth={true}
                                        label="Periodo"
                                        defaultValue=""
                                        value={values.period_id}
                                        onChange={(value) =>
                                            handleChangeSimple(
                                                "period_id",
                                                value.target.value
                                            )
                                        }
                                        required
                                        // helperText="Tipo de contrato"
                                    >
                                        {periods?.map((period) => (
                                            <MenuItem
                                                key={period.id}
                                                value={period.id}
                                            >
                                                {period.description}&nbsp; (
                                                <small>
                                                    {period.start_date +
                                                        " a " +
                                                        period.end_date}
                                                </small>
                                                )
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                            </div>
                            <Divider className="py-3" />
                            <h3 className="text-2xl text-gray-500 mt-4 mb-2">
                                Datos del contrato
                            </h3>
                            <div className="grid md:grid-cols-3 gap-5">
                                <div>
                                    <TextField
                                        id="outlined-select-currency"
                                        select
                                        variant="filled"
                                        fullWidth={true}
                                        label="Tipo de contrato"
                                        required
                                        value={values.contract_type}
                                        onChange={(value) =>
                                            handleChangeSimple(
                                                "contract_type",
                                                value.target.value
                                            )
                                        }
                                    >
                                        <MenuItem value="undefined">
                                            Indefinido
                                        </MenuItem>
                                        <MenuItem value="defined">
                                            Definido
                                        </MenuItem>
                                    </TextField>
                                </div>

                                <div>
                                    <DatePicker
                                        onChange={(value: any) =>
                                            handleChangeDate(
                                                "start_date",
                                                value
                                            )
                                        }
                                        className="w-full"
                                        slotProps={{
                                            textField: {
                                                variant: "filled",
                                                id: "start_date",
                                                fullWidth: true,
                                                required:
                                                    values.contract_type ==
                                                    "defined",
                                                disabled:
                                                    values.contract_type !=
                                                    "defined",
                                            },
                                        }}
                                        maxDate={values.end_date}
                                        format="DD/MM/YYYY"
                                        disableFuture
                                        disabled={values.contract_type !="defined"}
                                        value={values.start_date}
                                        label="Inicio de contrato"
                                    />
                                </div>
                                <div>
                                    <DatePicker
                                        onChange={(value: any) =>
                                            handleChangeDate("end_date", value)
                                        }
                                        className="w-full"
                                        slotProps={{
                                            textField: {
                                                variant: "filled",
                                                id: "end_date",
                                                fullWidth: true,
                                                required:
                                                    values.contract_type ==
                                                    "defined",
                                                disabled:
                                                    values.contract_type !=
                                                    "defined",
                                            },
                                        }}
                                        disabled={values.contract_type !="defined"}
                                        minDate={values.start_date}
                                        format="DD/MM/YYYY"
                                        disableFuture
                                        value={values.end_date}
                                        label="Fin de contrato"
                                    />
                                </div>

                                <div>
                                    <TextField
                                        className="w-full"
                                        required
                                        variant="filled"
                                        label="Salario"
                                        value={values.salary}
                                        id="salary"
                                        type="number"
                                        // onChange={handleChange}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    $
                                                </InputAdornment>
                                            ),
                                        }}
                                    ></TextField>
                                </div>
                                <div className="md:col-span-2">
                                    <TextField
                                        className="w-full"
                                        variant="filled"
                                        label="Observación"
                                        multiline
                                        value={values.observation}
                                        id="observation"
                                        // onChange={handleChange}
                                    ></TextField>
                                </div>
                            </div>
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

