import { ResponsePaginator } from "@/types/global";
import {
    ScheduleComponent,
    Day,
    Week,
    WorkWeek,
    Month,
    Agenda,
    Inject,
} from "@syncfusion/ej2-react-schedule";
import { useCallback, useEffect, useRef, useState } from "react";
import AsyncSelect from "react-select/async";
import { IParallel } from "../Parallels/types/parallel.types";
import { useFetch } from "@/Hooks/UseFetch";
import { ISchedule } from "./types/schedules.type";
import Hours from "react-hours";
// import { ManagerSchedule } from "./tools/schedules.tools";
import CreateOrEditSchedule from "./components/CreateOrEditSchedule";
import { ManagerSchedule } from "./tools/manager-schedule";
import SelectSearch from "@/Shared/components/SelectSearch";
import { useForm } from "react-hook-form";

function generarColorAleatorio() {
    // Generar componentes de color RGB aleatorios entre 0 y 255
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);

    // Combinar los componentes de color en un formato hexadecimal
    var colorHex = "#" + r.toString(16) + g.toString(16) + b.toString(16);

    return colorHex;
}
// const SCHEDULE_DATE: ISchedule = {
//     monday: [],
//     tuesday: [],
//     wednesday: [],
//     thursday: [],
//     friday: [],
//     saturday: [],
//     sunday: [],
// };

const IndexSchedule = ({
    data,
}: ResponsePaginator<{ parallels: IParallel }>) => {
    const [schedule, setSchedule] = useState<ISchedule>();
    const tableRef = useRef<HTMLTableElement>(null);
    const [schedulesHours, setSchedulesHours] = useState<any[]>(ManagerSchedule.getHours());
    const [schedulesDays, setSchedulesDays] = useState<{value: any, label: string}[]>(ManagerSchedule.getDays());
    const [isOpen, setIsOpen] = useState(false);
    const [parallel, setParallel] = useState<IParallel | null>(null);
    useEffect(() => {
        // const hour = [...ManagerSchedule.getHours()]
        // console.log({hour})
        // setSchedulesHours(() => hour);
        // setSchedulesDays([...ManagerSchedule.getDays()]);
        tableRef?.current?.addEventListener("click", (e) => {onClickCell(e);});
    }, []);

    // const { fetchUrl } = useFetch("/schedules/parallels/search");
    // const loadOptionsCourse = async (inputValue: string) => {
    //     const response = await fetchUrl<ResponsePaginator<IParallel>>({
    //         info: {
    //             params: {
    //                 search: inputValue,
    //             },
    //         },
    //     });
    //     const data = response.data.data;
    //     console.log({ response, data });
    //     const data2 = data.map((course: { id: any; name: any }) => {
    //         return {
    //             value: course.id,
    //             label: course.name,
    //         };
    //     });
    //     return data2;
    // };

    const onClickCell = (e: any) => {
        e.stopPropagation();
        console.log({ e });
        if (!isCell(e)) return;
        const hourIndex = e.target.parentNode.rowIndex;
        const dayIndex = e.target.cellIndex;
        
        const hour = schedulesHours[hourIndex - 1];
        const day = schedulesDays[dayIndex - 1];
        setSchedule({
            day: day.value,
            start_time: hour,
            end_time: null,
            description: '',
            parallel_id: parallel?.id,

        } as any);
        console.log({schedulesHours, schedulesDays });
        setIsOpen(true);
    };

    const isCell = (e: any) => {
        return e?.target?.localName == "td";
    };

    const { control } = useForm();

    return (
        <div>
            <div className=" my-3">
                <label htmlFor="name">Paralelos:</label>
                <SelectSearch
                    path="/schedules/parallels/search"
                    control={control}
                    name="paralelo_id"
                    disabled={true}
                    onChange={(e: any) => {
                        console.log({ e });
                        setParallel(e.item);
                    }}
                />
            </div>
            <div className="mt-4 relative container-table p-3">
                {!parallel && <div className="overlay-table"></div>}
                <table
                    ref={tableRef}
                    className="table-auto table-schedule relative user-select-none w-full"
                >
                    <thead>
                        <tr>
                            <th style={{ width: "63px" }}>Hora</th>
                            {schedulesDays.map((day) => {
                                return <th key={day.value} className="text-center">{day.label}</th>;
                            })}
                            {/* <th>Lunes</th>
                            <th>Martes</th>
                            <th>Miércoles</th>
                            <th>Jueves</th>
                            <th>Viernes</th>
                            <th>Sábado</th>
                            <th>Domingo</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {schedulesHours.map((scheduleHour) => {
                            return (
                                <tr key={scheduleHour}>
                                    <td className="pointer-events-none">
                                        {scheduleHour}
                                    </td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {parallel?.course_id && isOpen && (
                <CreateOrEditSchedule
                    course_id={parallel.course_id}
                    isEdit={false}
                    setIsOpen={setIsOpen}
                    isOpen={isOpen}
                    schedule={schedule!}
                />
            )}
        </div>

        // <div>
        //     <div>
        //         <div>
        //             <div className=" my-3">
        //                 <label htmlFor="name">Paralelos:</label>
        //                 <AsyncSelect
        //                     onChange={(e: any) => {
        //                         console.log({ e });
        //                         // setValue("course_id", e?.value);
        //                     }}
        //                     className="w-full"
        //                     loadOptions={loadOptionsCourse}
        //                 />
        //             </div>
        //             <div className="rounded-xl border shadow-lg overflow-hidden bg-white mt-6">
        //                 {/* <Hours
        //                     onChange={(osmString) => {
        //                         console.log(osmString);
        //                     }}
        //                 /> */}

        //                 <table
        //                     ref={tableRef}
        //                     id="table-schedule"
        //                     className="table-auto table-schedule relative user-select-none w-full"
        //                 >
        //                     <thead className="pointer-events-none">
        //                         <tr>
        //                             <th>
        //                                 <div>
        //                                     <div>
        //                                         <table className="w-full">
        //                                             <colgroup>
        //                                                 <col
        //                                                     style={{
        //                                                         width: "57px",
        //                                                     }}
        //                                                 />
        //                                             </colgroup>
        //                                             <tbody>
        //                                                 <tr>
        //                                                     <th></th>
        //                                                     <th>Lunes</th>
        //                                                     <th>Martes</th>
        //                                                     <th>Miércoles</th>
        //                                                     <th>Jueves</th>
        //                                                     <th>Viernes</th>
        //                                                     <th>Sábado</th>
        //                                                     <th>Domingo</th>
        //                                                 </tr>
        //                                             </tbody>
        //                                         </table>
        //                                     </div>
        //                                 </div>
        //                             </th>
        //                         </tr>
        //                     </thead>
        //                     <tbody
        //                         draggable="false"
        //                         className="schedules"
        //                     >
        //                         <tr>
        //                             <td>
        //                                 <div className="content-table">
        //                                     <div className="slots-table">
        //                                         <table id="slots-table" className="w-full">
        //                                             <colgroup>
        //                                                 <col
        //                                                     style={{ width: "57px" }}
        //                                                 />
        //                                             </colgroup>
        //                                             <tbody>
        //                                                 {schedulesHours.map(
        //                                                     (item, index) => {
        //                                                         return (
        //                                                             <tr
        //                                                                 draggable="false"
        //                                                                 key={index}
        //                                                                 data-hour={item}
        //                                                                 className="user-select-none text-center text-sm text-slate-800"
        //                                                             >
        //                                                                 <td className="pointer-events-none user-select-none">
        //                                                                     {item}
        //                                                                 </td>
        //                                                                 <td draggable="false"></td>
        //                                                             </tr>
        //                                                         );
        //                                                     }
        //                                                 )}
        //                                             </tbody>
        //                                         </table>
        //                                     </div>
        //                                     <div className="columns-table">
        //                                         <table id="columns-table" className="w-full h-full">
        //                                             <colgroup>
        //                                                 <col
        //                                                     style={{ width: "57px" }}
        //                                                 />
        //                                             </colgroup>
        //                                             <tbody>
        //                                                 {
        //                                                     <tr>
        //                                                         {[
        //                                                             1, 2, 3, 4, 5, 6, 7, 8
        //                                                         ].map((item, index) => {
        //                                                             return (
        //                                                                 <td key={index} className="h-full">
        //                                                                     {/* <div
        //                                                                         key={item}
        //                                                                         className="h-full"
        //                                                                     >
        //                                                                         <div className="fc-timegrid-col-bg"></div>
        //                                                                         <div className="fc-timegrid-col-events"></div>
        //                                                                         <div className="fc-timegrid-col-events"></div>
        //                                                                         <div className="fc-timegrid-now-indicator-container"></div>
        //                                                                     </div> */}
        //                                                                 </td>
        //                                                             );
        //                                                         })}
        //                                                     </tr>
        //                                                 }
        //                                             </tbody>
        //                                         </table>
        //                                     </div>
        //                                 </div>
        //                             </td>
        //                         </tr>
        //                     </tbody>
        //                 </table>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
};

export default IndexSchedule;
