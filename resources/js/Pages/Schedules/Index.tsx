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

const getPrefixDayForIndex = (index: number) => {
    const days = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"];
    return days[index];
}
const IndexSchedule = ({data}: ResponsePaginator<{parallels:IParallel}>) => {
    const tableRef = useRef<any>(null);
    const [partition, setPartition] = useState<any[]>([]);
    const [typePartition, setTypePartition] = useState<string>("minutes");
    useEffect(() => {
        for (let index = 6; index < 24; index++) {
            if (typePartition == "minutes") {
                for (let index2 = 0; index2 < 60; index2 = index2 + 15) {
                    const time = `${String(index).padStart(2, "0")}:${String(
                        index2
                    ).padStart(2, "0")}`;
                    // console.log({ time });
                    setPartition((state) => [...state, time]);
                }
            }
        }
    }, []);

    const [schedules, setSchedules] = useState<ISchedule>(SCHEDULE_DATE);

    let isMouseDown = false;
    let initialCell: { parentNode: { rowIndex: any }; cellIndex: any } | null =
        null;
        let endCell: { parentNode: { rowIndex: any }; cellIndex: any } | null =
        null;
    let overlayDiv!: HTMLDivElement;
    let overlayChild!: HTMLDivElement;
    let isMovementStarted = false;

    const onMouseDown = (e: any) => {
        console.log({ mouseDown: e });
        isMouseDown = true;
        document.body.style.pointerEvents = "none";
        initialCell = e.target;
        overlayDiv = document.createElement("div");
        overlayChild = document.createElement("div");
        overlayChild.classList.add("schedules-overlay-child");
        overlayDiv.appendChild(overlayChild);
        overlayDiv.classList.add("schedules-overlay");
        overlayDiv.setAttribute("draggable", "false");

        overlayDiv.addEventListener("mousedown", (e) => {
            e.stopPropagation();
        });
        // overlayDiv.style.backgroundColor = '' //generarColorAleatorio();
        tableRef.current?.appendChild(overlayDiv);
        const hour = partition[initialCell?.parentNode.rowIndex];
        // console.log({ cellIndex: initialCell?.cellIndex, hour });
    };

    const onMouseMove = (e: any) => {
        // console.log({ e });
        isMovementStarted = true;
        if (isMouseDown && e.target?.localName == 'td') {
            updateOverlaySize(e);
        }
    };

    const onMouseUp = (e: any) => {
        endCell = e.target;
        isMouseDown = false;
        overlayDiv.style.pointerEvents = "all";
        document.body.style.pointerEvents = "all";
        addHtmlTimeForSelection();
        console.log({ mouseUp: overlayDiv });
        // tableRef.current?.removeChild(overlayDiv);
        isMovementStarted = false;
        const hour = partition[endCell?.parentNode.rowIndex];
        console.log({ cellIndex: endCell?.cellIndex, hour });
        initialCell = null;
    };

    const updateOverlaySize = (event: { target: any }) => {
        let currentCell = event.target;
        var currentRowIndex = currentCell.parentNode.rowIndex;
        let initialRowIndex = initialCell?.parentNode.rowIndex;
        var initialCellIndex = initialCell?.cellIndex;
        var currentCellIndex = currentCell.cellIndex;

        var startRow = Math.min(initialRowIndex, currentRowIndex);
        var endRow = Math.max(initialRowIndex, currentRowIndex);
        var startCell = Math.min(initialCellIndex, currentCellIndex);
        var endCell = Math.max(initialCellIndex, currentCellIndex);
        if (!tableRef.current) return;

        var startCellElement =
            tableRef!.current!.rows[startRow].cells[startCell];
        var endCellElement = tableRef!.current!.rows[endRow].cells[endCell];

        var startCellRect = startCellElement.getBoundingClientRect();
        var endCellRect = endCellElement.getBoundingClientRect();

        var overlayTop =
            startCellRect.top - tableRef.current.getBoundingClientRect().top;
        var overlayLeft =
            startCellRect.left - tableRef.current.getBoundingClientRect().left;
        var overlayHeight = endCellRect.bottom - startCellRect.top;
        var overlayWidth = endCellRect.right - startCellRect.left;

        overlayDiv.style.top = overlayTop + "px";
        overlayDiv.style.left = overlayLeft + "px";
        overlayDiv.style.height = overlayHeight + "px";
        overlayDiv.style.width = overlayWidth + "px";

        // var celdasNoSeleccionadas = Array.from(
        //     tableRef.current.querySelectorAll(
        //         "tbody td:not(:nth-child(" + ((selectedColumnIndex || 0) + 1) + "))"
        //     )
        // );
        // celdasNoSeleccionadas.forEach(function (celda: any) {
        //     celda.style.pointerEvents = "none";
        // });
    };

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

    function addHtmlTimeForSelection() {
        const startDate = initialCell?.cellIndex;
        const endDate = endCell?.cellIndex;
        const startHour = partition[initialCell?.parentNode.rowIndex -1];
        const endHour = partition[endCell?.parentNode.rowIndex -1];
        if(!startDate || !endDate || !startHour || !endHour) {
            tableRef.current?.removeChild(overlayDiv);
        };

        let textHtml = `${startHour} - ${endHour}`
        if (startDate !== endDate) {
            const minDate = Math.min(startDate, endDate);
            const maxDate = Math.max(startDate, endDate);
            textHtml += ` | ${getPrefixDayForIndex(minDate -1)} - ${getPrefixDayForIndex(maxDate -1)}`
        }
        overlayChild.innerHTML = textHtml;
    }



    return (
        <div>
            <div>
                <div>
                    <div className="col-span-6 my-3">
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
                        <table
                            ref={tableRef}
                            className="table-auto table-schedule relative user-select-none"
                            onMouseMove={onMouseMove}
                            onMouseDown={onMouseDown}
                            onMouseUp={onMouseUp}
                        >
                            <thead className="pointer-events-none">
                                <tr>
                                    <th>Horas</th>
                                    <th>Lunes</th>
                                    <th>Martes</th>
                                    <th>Miércoles</th>
                                    <th>Jueves</th>
                                    <th>Viernes</th>
                                    <th>Sábado</th>
                                    <th>Domingo</th>
                                </tr>
                            </thead>
                            <tbody draggable="false" className="schedules user-select-none">
                                {partition.map((item, index) => {
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
                                            <td draggable="false"></td>
                                            <td draggable="false"></td>
                                            <td draggable="false"></td>
                                            <td draggable="false"></td>
                                            <td draggable="false"></td>
                                            <td draggable="false"></td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IndexSchedule;
