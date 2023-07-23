import Input from "@/Components/Input";
import { INote } from "@/Pages/Notes/types/note.types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const FormCreateOrEditNote = ({ note = null }: { note?: INote | null }) => {
    useEffect(() => {
        console.log(note);
    }, [note]);
    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        watch,
        formState: { errors },
        control,
    } = useForm<INote>();

    const partial1 = () => {
        console.log(getValues("partial_trimester_1"));
        return (
            (getValues("partial_trimester_1") || 0) +
                (getValues("integrating_project_1") || 0) +
                (getValues("evaluation_mechanism_1") || 0) || "fer"
        );
    }
    return (
        <div className="border-l px-4 h-full">
            <form>
                <div className="border border-gray-200 p-4 rounded-md">
                    <h3 className="text-2xl mb-2">Primer Trimestre</h3>
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-3">
                            <Input
                                control={control}
                                name="partial_trimester_1"
                                label="Aporte 90%"
                                type="number"
                                onChange={(e: any) => {
                                    if (!isNaN(e.target.value) && e.target.value <= 90) {
                                        setValue(
                                            "partial_trimester_1",
                                            e.target.value
                                        );
                                    }
                                }}
                            />
                        </div>
                        <div className="col-span-3">
                            <Input
                                control={control}
                                name="integrating_project_1"
                                label="Proyecto 5%"
                                type="number"
                                onChange={(e: any) => {
                                    if (!isNaN(e.target.value) && e.target.value <= 5) {
                                        setValue(
                                            "integrating_project_1",
                                            e.target.value
                                        );
                                    }
                                }}
                            />
                        </div>
                        <div className="col-span-3">
                            {/* <label htmlFor="evaluation_mechanism_1"></label> */}
                            <Input
                                control={control}
                                name="evaluation_mechanism_1"
                                label="Evaluación 5%"
                                max={5}
                                type="number"
                                onChange={(e: any) => {
                                    if (e.target.value <= 5) {
                                        setValue(
                                            "evaluation_mechanism_1",
                                            e.target.value
                                        );
                                    }
                                }}
                            />
                        </div>
                        <div className="col-span-3 flex gap-2">
                            <div className="border-r p-2">
                                <div>Puntos</div>
                                {partial1}
                            </div>
                            <div className="p-2">
                                <div>Puntaje</div>
                                {/* pointPonterated1 */}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default FormCreateOrEditNote;
