import { IPeriod } from "@/Models/period";
import { ITeacher } from "@/Models/teacher";
import { IUser } from "@/Pages/Academic/components/TableUsersAcademic";
import { IInputNote } from "@/Pages/Academic/types/acedemy.type";
import { IStudent } from "@/Pages/Students/types/student.types";
import { ISubject } from "@/Pages/Subjects/types/subject.types";

export interface INote {
    id: number;
    // partial_trimester_1: number;
    // partial_trimester_2: number;
    // partial_trimester_3: number;
    // integrating_project_1: number;
    // integrating_project_2: number;
    // integrating_project_3: number;
    // evaluation_mechanism_1: number;
    // evaluation_mechanism_2: number;
    // evaluation_mechanism_3: number;
    // project_final: number;
    value: number;
    input_note_id: number
    subject_id: number;
    student_id: number;
    user_id: number;
    period_id: number;
    observation: string;
    created_at: string;
    updated_at: string;
    input_note?: IInputNote;
    student?: IStudent;
    user?: IUser;
    subject?: ISubject;
    period?: IPeriod;
}
