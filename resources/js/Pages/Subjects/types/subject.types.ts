import { ICourse } from "@/Pages/Courses/types/course.types";

export interface ISubject {
    id: number;
    name: string;
    observation: string;
    // nivel: string;
    // hours: number;
    status: string;
    course_id: number;
    course?: ICourse;
}
