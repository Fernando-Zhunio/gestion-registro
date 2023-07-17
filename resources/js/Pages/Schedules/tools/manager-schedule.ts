
export class ManagerSchedule {

    private static instance: ManagerSchedule;
    private static hours: any = null;
    private scheduleHours: string[] = [];
     constructor() {
        // this.generateHours();
    }
    
    // public static getInstance(): ManagerSchedule {
    //     if (!ManagerSchedule.instance) {
    //         ManagerSchedule.instance = new ManagerSchedule();

    //     }
    //     return ManagerSchedule.instance;
    // }

    public static getHours() {
        return ManagerSchedule.hours || ManagerSchedule.generateHours();
    }

    public static getDays() {
        return [
            {value: 1, label: "Lunes"},
            {value: 2, label: "Martes"},
            {value: 3, label: "Miércoles"},
            {value: 4, label: "Jueves"},
            {value: 5, label: "Viernes"},
            {value: 6, label: "Sábado"},
            {value: 7, label: "Domingo"},
        ]
    }

    private static generateHours(interval: number| null = null) {
        // const _scheduleHours = [];
        ManagerSchedule.hours = [];
        for (let index = 6; index < 24; index++) {
            for (let index2 = 0; index2 < 60; index2 = index2 + 15) {
                const time = `${String(index).padStart(2, "0")}:${String(
                    index2
                ).padStart(2, "0")}`;

                ManagerSchedule.hours.push(time);
            }
        }
        return ManagerSchedule.hours;
    };
}