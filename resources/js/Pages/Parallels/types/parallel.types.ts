import { ICourse } from "@/Pages/Courses/types/course.types";

export interface IParallel {
    id: number;
    name: string;
    observation: string;
    quota: number;
    registered: number;
    course_id: number;
    course: ICourse;
}
