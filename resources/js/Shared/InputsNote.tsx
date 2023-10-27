import Input from "@/Components/Input";
import { INote } from "@/Pages/Academic/types/acedemy.type";
import { useState } from "react";
export function InputsNote({ note, control }: { note: INote[], control: any }) {
    const [disabled, setDisabled] = useState(false);
    const [total, setTotal] = useState(0);
    // const []
    return (
        <div className="flex gap-x-4 flex-wrap">
            {note.map((note, index) => (
                <div key={index} className="col-span-3 mt-2">
                    {/* <div>{note.name}</div> */}
                    <Input
                        control={control}
                        name={note.id.toString()}
                        label={`${note.name} ${note.value}%`}
                        type="number"
                        min="1"
                        max="10"
                        disabled={disabled}
                        // onChange={(e: any) => {
                        //     if (
                        //         !isNaN(e.target.value) &&
                        //         e.target.value <= 10
                        //     ) {
                        //         setValue(
                        //             `integrating_project_${trimester}`,
                        //             e.target.value
                        //         );
                        //     }
                        // }}
                    />
                </div>
            ))}
            {

            }
        </div>
    );
}
