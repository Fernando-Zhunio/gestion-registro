import { ICourse } from "../../Courses/types/course.types";

export interface IStudent {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address: string;
    doc_type: string;
    doc_number: string;
    birthday: string;
    gender:string;
    previous_institution:string;
    illness_or_disability:string;
    course_id: number;
    representative_id: number;
    photo:string;
    course?: ICourse;
}
