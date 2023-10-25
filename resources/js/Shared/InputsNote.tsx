import Input from "@/Components/Input";
import { INote } from "@/Pages/Academic/types/acedemy.type";

export function InputsNote({ note, control }: { note: INote[], control: any }) {
    return (
        <div>
            {note.map((note, index) => (
                <div key={index} className="col-span-3">
                    <Input
                        control={control}
                        name={}
                        label={`${note.name} ${note.value}%`}
                        type="number"
                        min="1"
                        max="10"
                        disabled={disabled}
                        onChange={(e: any) => {
                            if (
                                !isNaN(e.target.value) &&
                                e.target.value <= 10
                            ) {
                                setValue(
                                    `integrating_project_${trimester}`,
                                    e.target.value
                                );
                            }
                        }}
                    />
                </div>;
            ))}
        </div>
    );
}
