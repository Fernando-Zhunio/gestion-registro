export interface INote {
    id: number;
    name: string;
    value: number;
}

export interface IManagerNote {
    id: number,
    input_notes: INote[], 
    partial: number, 
    period_id: number,
}