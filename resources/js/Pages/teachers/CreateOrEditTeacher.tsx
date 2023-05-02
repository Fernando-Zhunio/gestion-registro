import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
// import FormControl from "@mui/material/FormControl";
// import FormLabel from "@mui/material/FormLabel";
// import Input from "@mui/material/Input";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DateField } from "@mui/x-date-pickers/DateField";
import TextField from "@mui/material/TextField";
import { type CreateOrEditProps } from "@/types/global";
import { Divider, FormControl, MenuItem, Select } from "@mui/material";
import InputLabel from "@/Components/InputLabel";

export const CreateOrEditTeacher = ({
    isEdit: _isEdit,
    data,
    metaData,
}: CreateOrEditProps) => {
    const [isEdit, setIsEdit] = useState(_isEdit);
    const [values, setValues] = useState<any>({
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

        observation: "",
        start_date: "",
        end_date: "",
        contract_file: "",
        contract_state: "",
        contract_type: "",
        salary: "",
    });
    useEffect(() => {
        console.log({ isEdit });
    });

    function handleChange(e: any) {
        const target = e?.target;
        const key = target?.id || target?.name;
        console.log({ target });
        setValues((values: any) => ({
            ...values,
            [key]: target.value,
        }));
    }

    function handleChangeDate(key: string, value: any) {
        value = value?.format("YYYY-MM-DD");
        console.log({ value });
        setValues((values: any) => ({
            ...values,
            [key]: value,
        }));
    }

    function handlerSubmit(event: any): void {
        event.preventDefault();
        if (isEdit) {
            router.put(`/teachers/${data.id}`);
        } else {
            router.post(`/teachers`);
        }
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="px-5">
                <h1 className="title mb-4">
                    {isEdit
                        ? `Editando profesor ${data.first_name}`
                        : "Creando profesor"}
                </h1>
                <Card className="rounded-full">
                    <CardContent>
                        <form onSubmit={handlerSubmit} className="p-5">
                            <h3 className="text-2xl text-gray-500 mb-2">
                                Datos del Maestro
                            </h3>
                            <div className="grid md:grid-cols-3 gap-5">
                                <div>
                                    <TextField
                                        fullWidth
                                        required
                                        variant="filled"
                                        label="Nombres"
                                        value={values.first_name}
                                        error
                                        id="first_name"
                                        helperText="Nombres del profes@r (obligatorio)"
                                        onChange={handleChange}
                                    ></TextField>
                                </div>
                                <div>
                                    <TextField
                                        fullWidth
                                        required
                                        variant="filled"
                                        label="Apellidos"
                                        id="last_name"
                                        value={values.last_name}
                                        helperText="Apellidos del profesor (obligatorio)"
                                        onChange={handleChange}
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
                                        onChange={handleChange}
                                        value={values.email}
                                        helperText="Correo electrónico del profesor (obligatorio)"
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
                                        onChange={handleChange}
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
                                            },
                                        }}
                                        format="DD/MM/YYYY"
                                        disableFuture
                                        value={values.birthday}
                                        label="Año de nacimiento"
                                    />
                                </div>
                                <div>
                                    <TextField
                                        className="w-full"
                                        required
                                        variant="filled"
                                        label="Dirección"
                                        value={values.address}
                                        id="address"
                                        onChange={handleChange}
                                    ></TextField>
                                </div>
                                <div>
                                    <TextField
                                        className="w-full"
                                        required
                                        variant="filled"
                                        label="Titulo académico"
                                        value={values.academic_title}
                                        id="academic_title"
                                        onChange={handleChange}
                                    ></TextField>
                                </div>
                                <div>
                                    <TextField
                                        className="w-full"
                                        required
                                        variant="filled"
                                        label="Titulo académico"
                                        value={values.academic_title}
                                        id="academic_title"
                                        onChange={handleChange}
                                    ></TextField>
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
                                            },
                                        }}
                                        disableFuture
                                        value={values.working_day}
                                        label="Fecha de ingreso"
                                        defaultValue={new Date()}
                                    />
                                </div>
                            </div>
                            <hr />
                            <h3 className="text-2xl text-gray-500 mt-4 mb-2">
                                Datos del contrato
                            </h3>
                            <div className="grid md:grid-cols-3 gap-5">
                                {/* <div>
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
                                            },
                                        }}
                                        maxDate={values.end_date}
                                        format="DD/MM/YYYY"
                                        disableFuture
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
                                            },
                                        }}
                                        minDate={values.start_date}
                                        format="DD/MM/YYYY"
                                        disableFuture
                                        value={values.end_date}
                                        label="Fin de contrato"
                                    />
                                </div> */}

                                <div>
                                    <TextField
                                        id="outlined-select-currency"
                                        select
                                        variant="filled"
                                        label="Tipo de contrato"
                                        defaultValue="EUR"
                                        helperText="Please select your currency">
                                            <MenuItem value="undefined">
                                                Indefinido
                                            </MenuItem>
                                            <MenuItem value="defined">
                                                Definido
                                            </MenuItem>
                                    </TextField>
                                </div>
                            </div>
                            <div className="mt-5">
                                <button className="btn-custom btn-store">
                                    Guardar
                                    <i className="fa-regular fa-paper-plane"></i>
                                </button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </LocalizationProvider>
    );
};

export default CreateOrEditTeacher;
