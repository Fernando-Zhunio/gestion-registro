import TextField from "@mui/material/TextField";
import { Student } from "../types/student.types";
import { usePage } from "@inertiajs/react";
import MenuItem from "@mui/material/MenuItem";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useRef, useState } from "react";

interface FormCreateOrEditStudentProps {
    handlerSetForm: (key: any, value: any) => void;
    form: Student;
    errors: Student;
}

const FormCreateOrEditStudent = ({
    handlerSetForm,
    form,
    errors,
}: FormCreateOrEditStudentProps) => {
    const { props } = usePage();
    const [preview, setPreview] = useState<any>(null);
    const inputPhoto = useRef(null)

  // Manejar el cambio del archivo
  function handleFileChange(key: string, e: any) {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      // Actualizar el estado del archivo
      handlerSetForm(key, selectedFile);

      // Mostrar una imagen previa
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  }
    return (
        <div>
            <div className="grid md:grid-cols-12 gap-4">
                <div className="md:col-span-6">
                    <TextField
                        required
                        fullWidth
                        label="Nombres"
                        variant="filled"
                        value={form.first_name}
                        onChange={(e) => {
                            handlerSetForm("first_name", e.target.value);
                        }}
                        id="first_name"
                        error={Boolean(errors.first_name)}
                        helperText={errors.first_name}
                    ></TextField>
                </div>
                <div className="md:col-span-6">
                    <TextField
                        required
                        fullWidth
                        label="Apellidos"
                        variant="filled"
                        value={form.last_name}
                        onChange={(e) => {
                            handlerSetForm("last_name", e.target.value);
                        }}
                        id="last_name"
                        error={Boolean(errors.last_name)}
                        helperText={errors.last_name}
                    ></TextField>
                </div>
                <div className="md:col-span-4">
                    <TextField
                        required
                        fullWidth
                        label="Correo Electrónico"
                        variant="filled"
                        value={form.email}
                        onChange={(e) => {
                            handlerSetForm("email", e.target.value);
                        }}
                        id="email"
                        error={Boolean(errors.email)}
                        helperText={errors.email}
                    ></TextField>
                </div>
                <div className="md:col-span-4">
                    <TextField
                        required
                        fullWidth
                        label="Teléfono"
                        variant="filled"
                        value={form.phone}
                        onChange={(e) => {
                            handlerSetForm("phone", e.target.value);
                        }}
                        id="phone"
                        type="number"
                        error={Boolean(errors.phone)}
                        helperText={errors.phone}
                    ></TextField>
                </div>
                <div className="md:col-span-4">
                    <TextField
                        select
                        variant="filled"
                        fullWidth={true}
                        label="Genero"
                        required
                        value={form.gender}
                        helperText={errors?.gender}
                        error={Boolean(errors.gender)}
                        onChange={(e) => {
                            handlerSetForm("gender", e.target.value);
                        }}
                    >
                        {(props as any).gender?.map(
                            (item: any, index: number) => {
                                return (
                                    <MenuItem key={index} value={item.value}>
                                        {item.label}
                                    </MenuItem>
                                );
                            }
                        )}
                    </TextField>
                </div>
                <div className="md:col-span-8">
                    <TextField
                        variant="filled"
                        fullWidth={true}
                        label="Dirección"
                        required
                        value={form.address}
                        helperText={errors?.address}
                        error={Boolean(errors.address)}
                        onChange={(e) => {
                            handlerSetForm("address", e.target.value);
                        }}
                    ></TextField>
                </div>
                <div className="md:col-span-4">
                    <DatePicker
                        onChange={(value: any) =>
                            handlerSetForm("birthday", value)
                        }
                        className="w-full"
                        slotProps={{
                            textField: {
                                variant: "filled",
                                id: "birthday",
                                required: true,
                                helperText: errors?.birthday,
                                error: Boolean(errors.birthday),
                                inputProps: {
                                    readOnly: true,
                                },
                            },
                        }}
                        format="DD/MM/YYYY"
                        disabled={false}
                        value={form.birthday}
                        label="Fecha de nacimiento"
                        defaultValue={new Date()}
                    />
                </div>
                <div className="md:col-span-4 row-span-2">
                    {/* <TextField
                        required
                        fullWidth
                        label="Foto"
                        variant="filled"
                        value={form.photo}
                        onChange={(e) => {
                            handleFileChange("photo", e);
                        }}
                        id="photo"
                        type="file"
                        error={Boolean(errors.photo)}
                        helperText={errors.photo}
                    ></TextField> */}
                    <div className="flex items-center gap-2">
                    {preview && <img src={preview} alt="Preview" className="rounded-full object-contain shadow-sm" style={{ width: '150px', height: '150px' }} />}
                    <button className="bg-emerald-800 text-white py-1 px-2 rounded-md h-8" onClick={() => {
                        inputPhoto?.current  && (inputPhoto?.current as any).click();
                    }}>subir foto</button>
                    <input ref={inputPhoto} hidden id="photo" type="file" onChange={(e) =>{handleFileChange('photo', e)}} />
                    </div>
                </div>
                <div className="md:col-span-4">
                    <TextField
                        select
                        variant="filled"
                        fullWidth={true}
                        label="Curso"
                        required
                        value={form.course_id}
                        helperText={errors?.course_id}
                        error={Boolean(errors.course_id)}
                        onChange={(e) => {
                            handlerSetForm("course_id", e.target.value);
                        }}
                    >
                        {(props as any).courses?.map(
                            (item: any, index: number) => {
                                return (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.name} - {item.nivel}
                                    </MenuItem>
                                );
                            }
                        )}
                    </TextField>
                </div>
                <div className="md:col-span-8">
                    <TextField
                        select
                        variant="filled"
                        fullWidth={true}
                        label="Curso"
                        required
                        value={form.course_id}
                        helperText={errors?.course_id}
                        error={Boolean(errors.course_id)}
                        onChange={(e) => {
                            handlerSetForm("course_id", e.target.value);
                        }}
                    >
                        {(props as any).courses?.map(
                            (item: any, index: number) => {
                                return (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.name} - {item.nivel}
                                    </MenuItem>
                                );
                            }
                        )}
                    </TextField>
                </div>
                <div className="md:col-span-4">
                    <TextField
                        select
                        variant="filled"
                        fullWidth={true}
                        label="Curso"
                        required
                        value={form.course_id}
                        helperText={errors?.course_id}
                        error={Boolean(errors.course_id)}
                        onChange={(e) => {
                            handlerSetForm("course_id", e.target.value);
                        }}
                    >
                        {(props as any).courses?.map(
                            (item: any, index: number) => {
                                return (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.name} - {item.nivel}
                                    </MenuItem>
                                );
                            }
                        )}
                    </TextField>
                </div>
            </div>
        </div>
    );
};
export default FormCreateOrEditStudent;
