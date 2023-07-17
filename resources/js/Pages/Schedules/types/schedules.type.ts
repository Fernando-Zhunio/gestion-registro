import { IPeriod } from "@/Models/period";
import { ITeacher } from "@/Models/teacher";
import { IParallel } from "@/Pages/Parallels/types/parallel.types";
import { ISubject } from "@/Pages/Subjects/types/subject.types";

export interface ISchedule {
    id: number;
    description?: string;
    status: 0| 1;
    day: number;
    start_time: string;
    end_time: string;
    parallel_id: number;
    parallel: IParallel;
    subject_id: number;
    subject: ISubject;
    teacher_id: number;
    teacher: ITeacher;
    period_id: number;
    period: IPeriod;
}