import { ICourse } from "@/Pages/Courses/types/course.types";

export interface IParallel {
    id: number;
    name: string;
    description: string;
    quota: number;
    registered: number;
    course_id: number;
    course: ICourse;
}
