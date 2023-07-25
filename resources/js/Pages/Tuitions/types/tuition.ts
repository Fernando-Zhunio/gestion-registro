import { ICourse } from "@/Pages/Courses/types/course.types";
import { IParallel } from "@/Pages/Parallels/types/parallel.types";
import { IPeriod } from "@/Pages/Periods/types/period.types";
import { IStudent } from "@/Pages/Students/types/student.types";

export interface ITuition {
    id: number;
    student: IStudent;
    period: IPeriod;
    course: ICourse;
    approved: '0'|'1';
    student_id: number;
    course_id: number;
    period_id: number;
    parallel_id: number;
    parallel: IParallel;
}