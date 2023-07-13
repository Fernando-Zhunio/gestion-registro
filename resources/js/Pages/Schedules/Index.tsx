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
import { useEffect, useRef, useState } from "react";
import AsyncSelect from "react-select/async";
import { IParallel } from "../Parallels/types/parallel.types";
import { useFetch } from "@/Hooks/UseFetch";
import { ISchedule } from "./types/schedules.type";
import Hours from "react-hours";
import { ManagerSchedule } from "./tools/schedules.tools";

function generarColorAleatorio() {
    // Generar componentes de color RGB aleatorios entre 0 y 255
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);

    // Combinar los componentes de color en un formato hexadecimal
    var colorHex = "#" + r.toString(16) + g.toString(16) + b.toString(16);

    return colorHex;
}
const SCHEDULE_DATE: ISchedule = {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
};

const IndexSchedule = ({
    data,
}: ResponsePaginator<{ parallels: IParallel }>) => {
    const [schedules, setSchedules] = useState<ISchedule>(SCHEDULE_DATE);
    const tableRef = useRef<HTMLTableElement>(null);
    const [schedulesHours, setSchedulesHours] = useState<any[]>([]);
    const [typePartition, setTypePartition] = useState<string>("minutes");
    useEffect(() => {
        const managerSchedule = new ManagerSchedule("table-schedule");
        const _scheduleHours = managerSchedule.generateHours();
        setSchedulesHours(_scheduleHours);
        // const _onMouseUp = (e: any) => {
        //     onMouseUp(e);
        // };
        // let isMouseDown = false;
        // let initialCell: {
        //     parentNode: { rowIndex: any };
        //     cellIndex: any;
        // } | null = null;
        // let endCellCurrent: any | null = null;
        // var overlayDiv!: HTMLDivElement;
        // let overlayChild!: HTMLDivElement;
        // var isMovementStarted = false;
        // document.body.addEventListener("mouseup", _onMouseUp);
        // tableRef?.current?.addEventListener("mousemove", onMouseMove);
        // tableRef?.current?.addEventListener("mousedown", onMouseDown);
    }, []);

    const { fetchUrl } = useFetch("/schedules/parallels/search");
    const loadOptionsCourse = async (inputValue: string) => {
        const response = await fetchUrl<ResponsePaginator<IParallel>>({
            info: {
                params: {
                    search: inputValue,
                },
            },
        });
        const data = response.data.data;
        console.log({ response, data });
        const data2 = data.map((course: { id: any; name: any }) => {
            return {
                value: course.id,
                label: course.name,
            };
        });
        return data2;
    };

    return (
        <div>
            <div>
                <div>
                    <div className=" my-3">
                        <label htmlFor="name">Paralelos:</label>
                        <AsyncSelect
                            onChange={(e: any) => {
                                console.log({ e });
                                // setValue("course_id", e?.value);
                            }}
                            className="w-full"
                            loadOptions={loadOptionsCourse}
                        />
                    </div>
                    <div className="rounded-xl border shadow-lg overflow-hidden bg-white mt-6">
                        {/* <Hours
                            onChange={(osmString) => {
                                console.log(osmString);
                            }}
                        /> */}

                        <table
                            ref={tableRef}
                            id="table-schedule"
                            className="table-auto table-schedule relative user-select-none w-full"
                        >
                            <thead className="pointer-events-none">
                                <tr>
                                    <td>
                                        <div>
                                            <div>
                                                <table className="w-full">
                                                    <colgroup>
                                                        <col
                                                            style={{
                                                                width: "57px",
                                                            }}
                                                        />
                                                    </colgroup>
                                                    <tbody>
                                                        <tr>
                                                            <th></th>
                                                            <th>Lunes</th>
                                                            <th>Martes</th>
                                                            <th>Miércoles</th>
                                                            <th>Jueves</th>
                                                            <th>Viernes</th>
                                                            <th>Sábado</th>
                                                            <th>Domingo</th>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </thead>
                            <tbody
                                draggable="false"
                                className="schedules user-select-none"
                            >
                                <td>
                                    <div className="content-table">
                                        <div className="slots-table">
                                            <table className="w-full">
                                                <colgroup>
                                                    <col
                                                        style={{ width: "57px" }}
                                                    />
                                                </colgroup>
                                                <tbody>
                                                    {schedulesHours.map(
                                                        (item, index) => {
                                                            return (
                                                                <tr
                                                                    draggable="false"
                                                                    key={index}
                                                                    data-hour={item}
                                                                    className="user-select-none text-center text-sm text-slate-800"
                                                                >
                                                                    <td className="pointer-events-none user-select-none">
                                                                        {item}
                                                                    </td>
                                                                    <td draggable="false"></td>
                                                                    {/* <td draggable="false"></td>
                                                                    <td draggable="false"></td>
                                                                    <td draggable="false"></td>
                                                                    <td draggable="false"></td>
                                                                    <td draggable="false"></td>
                                                                    <td draggable="false"></td> */}
                                                                </tr>
                                                            );
                                                        }
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="columns-table">
                                            <table className="w-full h-full">
                                                <colgroup>
                                                    <col
                                                        style={{ width: "57px" }}
                                                    />
                                                </colgroup>
                                                <tbody>
                                                    {
                                                        <tr>
                                                            {[
                                                                1, 2, 3, 4, 5, 6, 7,8
                                                            ].map((item, index) => {
                                                                return (
                                                                   <td className="">
                                                                     <div
                                                                         key={item}
                                                                         className="h-full"
                                                                     >
                                                                         <div className="fc-timegrid-col-bg"></div>
                                                                         <div className="fc-timegrid-col-events"></div>
                                                                         <div className="fc-timegrid-col-events"></div>
                                                                         <div className="fc-timegrid-now-indicator-container"></div>
                                                                     </div>
                                                                   </td>
                                                                );
                                                            })}
                                                        </tr>
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </td>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IndexSchedule;
