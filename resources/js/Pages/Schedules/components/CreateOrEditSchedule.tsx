import DialogCustom from "@/Components/DialogCustom";
import Input from "@/Components/Input";
import TextInput from "@/Components/TextInput";
import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { ManagerSchedule } from "../tools/manager-schedule";
import SelectSearch from "@/Shared/components/SelectSearch";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { ISchedule } from "../types/schedules.type";
import { router } from "@inertiajs/react";
import { showToast } from "@/Helpers/alerts";
import Select from "@/Components/Select";
import Textarea from "@/Components/Textarea";

interface ICreateOrEditScheduleProps {
    isOpen: boolean;
    isEdit: boolean;
    course_id: number;
    setIsOpen: (isOpen: boolean) => void;
    schedule: ISchedule;
}
const CreateOrEditSchedule = ({
    isOpen,
    isEdit,
    course_id,
    setIsOpen,
    schedule,
}: ICreateOrEditScheduleProps) => {
    const { control, setValue, register, handleSubmit } = useForm({
        defaultValues: {
            start_time: schedule.start_time,
            end_time: schedule.end_time,
            day: schedule.day,
            description: schedule.description,
            parallel_id: schedule.parallel_id,
        }
    });
    const [hoursStart, setHoursStart] = useState<string[]>([]);
    const [hoursEnd, setHoursEnd] = useState<string[]>([]);
    const [days, setDays] = useState<{ value: any; label: string }[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    useEffect(() => {
        console.log({ schedule });
        setHoursStart(() => [...ManagerSchedule.getHours()]);
        setDays(() => [...ManagerSchedule.getDays()]);

        handlerOnChangeHourStart({ target: { value: schedule.start_time } });
        // setValue("start_time", schedule.start_time);
        // setValue("test", schedule.start_time);
    }, [schedule]);

    const handlerOnChangeHourStart = (e: any) => {
        console.log(e.target.value);
        const value = e.target.value;
        const hoursStart = ManagerSchedule.getHours();
        const index = hoursStart.findIndex((hour: any) => hour === value);
        if (hoursStart[index + 1]) {
            setHoursEnd(hoursStart.slice(index + 1));
            return;
        } else {
            setHoursEnd([]);
            return;
        }
    };

    function onSubmit(data: any) {
        console.log({ data });
        const options = {
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
        data.subject_id = data.subject_id.value;
        data.teacher_id = data.teacher_id.value;
        data.day = data.day.value || data.day;
        if (isEdit) {
            console.log("editando");
            router.put(`schedules/${schedule.id}`, data, options);
        } else {
            console.log("creando");
            router.post(`schedules`, data, options);
        }
        console.log(data);
    }

    return (
        <div>
            <DialogCustom
                open={isOpen}
                title={`${!isEdit ? "Creando" : "Editando"} Horario`}
            >
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-12 gap-3"
                >
                    <div className="col-span-4">
                        {/* <label htmlFor="start_time">Hora de inicio</label>
                        <select
                            id="start_time"
                            {...register("start_time", { required: true })}
                            className="w-full block border-gray-300  focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                            onChange={handlerOnChangeHourStart}
                        >
                            {hoursStart.map((hour) => {
                                return (
                                    <option
                                        selected={hour == schedule.start_time}
                                        key={hour}
                                        value={hour}
                                    >
                                        {hour}
                                    </option>
                                );
                            })}
                        </select> */}
                        <Select
                            label="Hora de inicio"
                            id="start_time"
                            control={control}
                            name="start_time"
                            rules={{ required: true }}
                        >
                            {hoursStart.map((hour) => {
                                return (
                                    <option
                                        selected={hour == schedule.start_time}
                                        key={hour}
                                        value={hour}
                                    >
                                        {hour}
                                    </option>
                                );
                            })}
                        </Select>
                    </div>
                    {/* <div>
                        <input  type="text" {...register('test')} />
                    </div> */}
                    <div className="col-span-4">
                        <label htmlFor="end_time">Hora fin</label>
                        <select
                            defaultValue={schedule?.end_time}
                            id="end_time"
                            {...register("end_time", { required: true })}
                            className="w-full block border-gray-300  focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                        >
                            {hoursEnd.map((hour) => {
                                return (
                                    <option
                                        selected={hour == schedule.end_time}
                                        key={hour}
                                        value={hour}
                                    >
                                        {hour}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="col-span-4">
                        {/* <label htmlFor="day">Dia</label>
                        <select
                            {...register("day", { required: true })}
                            id="day"
                            className="w-full block border-gray-300  focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                        >
                            {days.map((day) => {
                                return (
                                    <option
                                        selected={day.value == schedule.day}
                                        key={day.value}
                                        value={day.value}
                                    >
                                        {day.label}
                                    </option>
                                );
                            })}
                        </select> */}
                        <Select
                            label="Dia"
                            id="day"
                            control={control}
                            name="day"
                            rules={{ required: true }}
                        >
                            {days.map((day) => {
                                return (
                                    <option
                                        selected={day.value == schedule.day}
                                        key={day.value}
                                        value={day.value}
                                    >
                                        {day.label}
                                    </option>
                                );
                            })}
                        </Select>
                    </div>
                    <div className="col-span-12">
                        {/* <label htmlFor="teacher_id">Materia</label> */}
                        <SelectSearch
                            label="Materia"
                            path="/schedules/subjects/search"
                            control={control}
                            name="subject_id"
                            rules={{ required: true }}
                            moreParams={{ course_id }}
                        />
                    </div>
                    <div className="col-span-12">
                        {/* <label htmlFor="teacher_id">Profesor</label> */}
                        <SelectSearch
                            label="Profesor"
                            path="/schedules/teachers/search"
                            control={control}
                            rules={{ required: true }}
                            cbMap={(teacher: any) => {
                                return {
                                    label: `${teacher.first_name} ${teacher.last_name}`,
                                    value: teacher.id,
                                };
                            }}
                            name="teacher_id"
                        />
                    </div>
                    <div className="col-span-12">
                        <Textarea
                            label="Descripcion"
                            control={control}
                            name="description"
                            rules={{ required: true }}
                        ></Textarea>
                    </div>
                    <hr className="my-3 col-span-12" />
                    <div className="col-span-12 flex gap-4">
                        <button
                            disabled={isLoading}
                            className="btn bg-create"
                            type="submit"
                        >
                            Guardar{" "}
                            <i className="fa-regular fa-paper-plane"></i>
                            {isLoading && (
                                <i className="fa-solid fa-spinner animate-spin ml-2"></i>
                            )}
                        </button>
                        <button
                            disabled={isLoading}
                            className="btn bg-delete"
                            type="button"
                            onClick={() => setIsOpen(false)}
                        >
                            Cerrar <i className="fa-solid fa-xmark ml-2"></i>
                        </button>
                    </div>
                </form>
            </DialogCustom>
        </div>
    );
};

export default CreateOrEditSchedule;
