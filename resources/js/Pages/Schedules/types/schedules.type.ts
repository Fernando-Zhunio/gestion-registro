export interface ISchedule {
    monday: IScheduleFormat[],
    tuesday: IScheduleFormat[],
    wednesday: IScheduleFormat[],
    thursday: IScheduleFormat[],
    friday: IScheduleFormat[],
    saturday: IScheduleFormat[],
    sunday: IScheduleFormat[],
}

interface IScheduleFormat {
     startTime: string, endTime: string
     startDate: string, endDate: string
}