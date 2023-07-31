import { IParallel } from "@/Pages/Parallels/types/parallel.types";
import { ICourse } from "../../Courses/types/course.types";
import { INote } from "@/Pages/Notes/types/note.types";
import { ITuition } from "@/Pages/Tuitions/types/tuition";
import { IRepresentative } from "@/Pages/Representatives/types/representatives";

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
    // course_id: number;
    representative_id: number;
    representative: IRepresentative;
    photo:string;
    // course?: ICourse;
    // parallel_id: number;
    // parallel?: IParallel;
    notes?: INote[];
    tuitions?: ITuition[];
}
