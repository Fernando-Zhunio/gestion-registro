import DialogCustom from "@/Components/DialogCustom";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useState } from "react";
import { INote } from "./types/note.types";
import Button from "@mui/material/Button";
import axios from "axios";
import { router } from "@inertiajs/react";
import DialogActions from "@mui/material/DialogActions";
import SelectSearch from "@/Shared/components/SelectSearch";
import { useForm } from "react-hook-form";
// import dayjs from "dayjs";
// import Snackbar from "@mui/material/Snackbar";
// import Alert from "@mui/material/Alert";
// import { showToast } from "@/Helpers/alerts";

interface CreateOrEditNoteProps {
    state: "create" | "edit";
    data?: INote;
}

const CreateOrEditNote = ({
    data,
}: CreateOrEditNoteProps) => {
    // const {
    //     data: form,
    //     setData: setForm,
    //     reset,
    //     post,
    //     errors,
    //     clearErrors,
    //     put,
    // } = useForm<any>({
    //     name: "",
    //     description: "",
    //     nivel: "",
    // });

    const {control} =  useForm();

    const [state, setState] = useState<"create" | "edit">("create");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // useEffect(() => {
    //     if (data) {
    //         setForm({
    //             ...data,
    //         });
    //         setState("edit");
    //     } else {
    //         setForm({
    //             name: "",
    //             description: "",
    //             nivel: "",
    //         });
    //         setState("create");
    //     }
    //     console.log({ data })
    // }, [data]);

    // function handlerSetForm(e: any) {
    //     setForm({ ...form, [e.target.id]: e.target.value });
    // }

    

    // function saveInServer() {
    //     if (state === "create") {
    //         post("/courses", {
    //             preserveState: true,
    //             onSuccess: (e) => {
    //                 console.log({ e });
    //                 setIsLoading(false);
    //                 setIsOpen(false);
    //                 reset();
    //             },
    //             onError: (e) => {
    //                 console.log({ e });
    //                 setIsLoading(false);
    //             },
    //         });
    //     } else if (state === "edit") {
    //         put(`/courses/${data?.id}`, {
    //             preserveState: true,
    //             replace: false,
    //             preserveScroll: true,
    //             onSuccess: (e) => {
    //                 console.log({ e });
    //                 setIsLoading(false);
    //                 setIsOpen(false);
    //             },
    //             onError: (e) => {
    //                 console.log({ e });
    //                 setIsLoading(false);
    //             },
    //         });
    //     }
    // }

    return (
        <div>

                <form>
                    <div className="grid grid-cols-1 gap-5">
                        
                        <SelectSearch cbMap={(item) => { return {value: item.id, label: 'fernando'}}} control={control} path="/notes/parallels" />

            
                        {/* <TextField
                            required
                            fullWidth
                            label="Descripción"
                            variant="filled"
                            value={form.description}
                            onChange={handlerSetForm}
                            id="description"
                            error={Boolean(errors.description)}
                            helperText={errors.description}
                        ></TextField>
                        <TextField
                            fullWidth
                            required
                            label="Promoción"
                            variant="filled"
                            value={form.nivel}
                            id="nivel"
                            onChange={handlerSetForm}
                            error={Boolean(errors.nivel)}
                            helperText={errors.nivel}
                        ></TextField> */}

                        <div></div>
                    </div>
                </form>
                
        </div>
    );
};

export default CreateOrEditNote;