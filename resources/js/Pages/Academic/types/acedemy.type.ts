export interface IInputNote {
    id: number;
    name: string;
    value: number;
    input_note_id: number;
    manager_note_id: number;
    manager_note: IManagerNote;
}

export interface IManagerNote {
    id: number,
    input_notes?: IInputNote[], 
    is_active: boolean,
    partial: number, 
    period_id: number,
}