import { EventEmitter } from "@/Helpers/event-emitter";
import { ISchedule } from "../types/schedules.type";

export class ManagerSchedule {

    private static instance: ManagerSchedule;
    private static hours: any = null;
    // private scheduleHours: string[] = [];
    private table!: HTMLTableElement
    private tableId = "table-schedule";
    private headerHeight = 35;
    private eventEmitter = EventEmitter;

    constructor(tableId: string) {
        this.table = document.getElementById(tableId) as HTMLTableElement;
        this.table.addEventListener("click", (e) => {
            const target = e.target;
            if (target instanceof HTMLDivElement &&
                target.classList.contains("schedules-overlay-content")) {
                const scheduleId = target.parentElement!.getAttribute("data-schedule-id");
                if (scheduleId) {
                    console.log(scheduleId)
                    this.eventEmitter.dispatch("click-table" as any, this.schedulesMap.get(parseInt(scheduleId)));
                }
            }
        });
    }

    subscribeClickSchedule(callback: (data: { schedule: ISchedule, element: HTMLDivElement }) => any) {
        return this.eventEmitter.subscribe("click-table" as any, callback);
    }

    getTable() {
        return this.table;
    }

    refreshSchedules(schedules: ISchedule[]) {
        this.schedulesMap.forEach((value) => {
            value.element.remove();
        })
        this.schedulesMap.clear();
        schedules.forEach((schedule) => {
            this.addScheduleInView(schedule);
        });
    }

    public static getHours() {
        return ManagerSchedule.hours || ManagerSchedule.generateHours();
    }

    public static getDays() {
        return [
            { value: 1, label: "Lunes" },
            { value: 2, label: "Martes" },
            { value: 3, label: "Miércoles" },
            { value: 4, label: "Jueves" },
            { value: 5, label: "Viernes" },
            { value: 6, label: "Sábado" },
            { value: 7, label: "Domingo" },
        ]
    }

    private static generateHours(interval: number | null = null) {
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

    schedulesMap = new Map<number, { element: HTMLDivElement, schedule: ISchedule }>();

    addScheduleInView(schedule: ISchedule) {
        // debugger
        // console.log(schedule);
        const start_hour = schedule.start_time.substring(0, 5);
        const end_hour = schedule.end_time.substring(0, 5);
        const day = schedule.day;
        const elementDiv = document.createElement("div");
        elementDiv.classList.add("schedules-overlay");
        elementDiv.setAttribute("data-schedule-id", schedule.id?.toString());
        this.schedulesMap.set(schedule.id, { element: elementDiv, schedule });
        const elementDivChild = document.createElement("div");
        elementDivChild.classList.add("schedules-overlay-content");
        elementDivChild.innerHTML = `<span>
            <strong>Profesor: </strong>${schedule.teacher.first_name} - ${schedule.teacher.last_name}
        </span>
        <span>
            <strong>Material: </strong>${schedule.subject.name}
        </span>
        <span>
            <strong>Hora: </strong>${schedule.start_time} A ${schedule.end_time}
        </span>
        `
        elementDiv.appendChild(elementDivChild);

        const hours = ManagerSchedule.getHours();
        const indexStart = hours.indexOf(start_hour);
        const indexEnd = hours.indexOf(end_hour);
        const startCell = this.table.rows[indexStart].cells[day];
        const endCell = this.table.rows[indexEnd].cells[day];

        const startDiffMinutes = this.getDiffMinutes(hours[0], start_hour);
        const endDiffMinutes = this.getDiffMinutes(start_hour, end_hour);

        const startDiffPixels = this.convertMinutesToPixels(startDiffMinutes) + 35;
        const endDiffPixels = this.convertMinutesToPixels(endDiffMinutes);

        const left = startCell.getBoundingClientRect().left - this.table.getBoundingClientRect().left;
        const width = startCell.getBoundingClientRect().width;

        elementDiv.style.top = `${startDiffPixels}px`;
        elementDiv.style.left = `${left}px`;
        elementDiv.style.width = `${width}px`;
        elementDiv.style.height = `${endDiffPixels}px`;
        this.table.appendChild(elementDiv);
    }

    removeScheduleInView(id: number) {
        const elementDiv = this.schedulesMap.get(id)?.element;
        if (!elementDiv) return;
        elementDiv.remove();
        this.schedulesMap.delete(id);
    }

    editScheduleInView(id: number, schedule: ISchedule) {
        const start_hour = schedule.start_time.substring(0, 5);
        const end_hour = schedule.end_time.substring(0, 5);
        const day = schedule.day;
        const elementDiv = this.schedulesMap.get(id)?.element;
        if (!elementDiv) return;
        elementDiv.innerHTML = ''
        // elementDiv.classList.add("schedules-overlay");
        // elementDiv.setAttribute("data-schedule-id", schedule.id?.toString());
        // this.schedulesMap.set(schedule.id, { element: elementDiv, schedule });
        const elementDivChild = document.createElement("div");
        elementDivChild.classList.add("schedules-overlay-content");
        elementDivChild.innerHTML = `<div>
            <strong>Profesor: </strong>${schedule.teacher.first_name} - ${schedule.teacher.last_name}
        </div>
        <div>
            <strong>Material: </strong>${schedule.subject.name}
        </div>
        <div>
            <strong>Hora: </strong>${schedule.start_time} A ${schedule.end_time}
        </div>
        `
        // elementDiv.appendChild(elementDivChild);

        const hours = ManagerSchedule.getHours();
        const indexStart = hours.indexOf(start_hour);
        const indexEnd = hours.indexOf(end_hour);
        const startCell = this.table.rows[indexStart].cells[day];
        const endCell = this.table.rows[indexEnd].cells[day];

        const startDiffMinutes = this.getDiffMinutes(hours[0], start_hour);
        const endDiffMinutes = this.getDiffMinutes(start_hour, end_hour);

        const startDiffPixels = this.convertMinutesToPixels(startDiffMinutes) + 35;
        const endDiffPixels = this.convertMinutesToPixels(endDiffMinutes);

        const left = startCell.getBoundingClientRect().left - this.table.getBoundingClientRect().left;
        const width = startCell.getBoundingClientRect().width;

        elementDiv.style.top = `${startDiffPixels}px`;
        elementDiv.style.left = `${left}px`;
        elementDiv.style.width = `${width}px`;
        elementDiv.style.height = `${endDiffPixels}px`;
        this.table.appendChild(elementDiv);
    }

    getDiffMinutes(start: string, end: string) {
        const startHour = parseInt(start.split(":")[0]);
        const startMin = parseInt(start.split(":")[1]);
        const endHour = parseInt(end.split(":")[0]);
        const endMin = parseInt(end.split(":")[1]);
        const diffHour = endHour - startHour;
        const diffMin = endMin - startMin;
        return diffHour * 60 + diffMin;
    }

    convertMinutesToPixels(minutes: number) {
        return minutes * 2.33333333;
    }
}