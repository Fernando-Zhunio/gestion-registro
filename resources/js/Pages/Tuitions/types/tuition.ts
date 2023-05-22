import { ICourse } from "@/Pages/Courses/types/course.types";
import { IPeriod } from "@/Pages/Periods/types/period.types";
import { IStudent } from "@/Pages/Students/types/student.types";

export interface ITuition {
    id: number;
    student: IStudent;
    period: IPeriod;
    course: ICourse;
}