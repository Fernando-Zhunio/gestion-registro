import { IPeriod } from "@/Models/period";
import { ITeacher } from "@/Models/teacher";
import { IStudent } from "@/Pages/Students/types/student.types";
import { ISubject } from "@/Pages/Subjects/types/subject.types";

export interface INote {
    id: number;
    partial_trimester_1: number;
    partial_trimester_2: number;
    partial_trimester_3: number;
    integrating_project_1: number;
    integrating_project_2: number;
    integrating_project_3: number;
    evaluation_mechanism_1: number;
    evaluation_mechanism_2: number;
    evaluation_mechanism_3: number;
    project_final: number;
    subject_id: number;
    student_id: number;
    teacher_id: number;
    period_id: number;
    observation: string;
    created_at: string;
    updated_at: string;
    student?: IStudent;
    teacher?: ITeacher;
    subject?: ISubject;
    period?: IPeriod;
}
