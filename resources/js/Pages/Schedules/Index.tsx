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

function generarColorAleatorio() {
    // Generar componentes de color RGB aleatorios entre 0 y 255
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);

    // Combinar los componentes de color en un formato hexadecimal
    var colorHex = "#" + r.toString(16) + g.toString(16) + b.toString(16);

    return colorHex;
}

const IndexSchedule = () => {
    const tableRef = useRef<any>(null);
    // const [cellIndex, setCellIndex] = useState<number | null>(null);
    // const data = [
    //     {
    //         Id: 1,
    //         Subject: "Meeting",
    //         StartTime: new Date(2023, 1, 15, 10, 0),
    //         EndTime: new Date(2023, 1, 15, 12, 30),
    //     },
    // ];
    const [partition, setPartition] = useState<any[]>([]);
    const [typePartition, setTypePartition] = useState<string>("minutes");
    useEffect(() => {
        for (let index = 0; index < 24; index++) {
            if (typePartition == "minutes") {
                for (let index2 = 0; index2 < 60; index2 = index2 + 10) {
                    const time = `${String(index).padStart(2, "0")}:${String(
                        index2
                    ).padStart(2, "0")}`;
                    console.log({ time });
                    setPartition((state) => [...state, time]);
                }
            }
        }
    }, []);

    let isMouseDown = false;
    let initialCell: { parentNode: { rowIndex: any }; cellIndex: any } | null =
        null;
    let overlayDiv!: HTMLDivElement;
    let selectedColumnIndex: number | null = null;
    let isMovementStarted = false;

    const onMouseDown = (e: any) => {
        // console.log({ e });
        isMouseDown = true;
        document.body.style.pointerEvents = "none";
        initialCell = e.target;
        overlayDiv = document.createElement("div");
        overlayDiv.classList.add("schedules-overlay");
        overlayDiv.style.backgroundColor = generarColorAleatorio();
        tableRef.current?.appendChild(overlayDiv);
        const hour = partition[initialCell?.parentNode.rowIndex];
        console.log({ cellIndex: initialCell?.cellIndex, hour });
    };

    const onMouseMove = (e: any) => {
        // console.log({ e });
        isMovementStarted = true;
        if (isMouseDown) {
            updateOverlaySize(e);
        }
    };

    const onMouseUp = (e: any) => {
        isMouseDown = false;
        initialCell = null;
        overlayDiv.style.pointerEvents;
        document.body.style.pointerEvents = "all";
        console.log({ overlayDiv });
        tableRef.current?.removeChild(overlayDiv);
        isMovementStarted = false;
        const hour = partition[e.target?.parentNode.rowIndex];
        console.log({ cellIndex: e.target?.cellIndex, hour });
    };

    function updateOverlaySize(event: { target: any }) {
        let currentCell = event.target;
        let initialRowIndex = initialCell?.parentNode.rowIndex;
        var initialCellIndex = initialCell?.cellIndex;
        var currentRowIndex = currentCell.parentNode.rowIndex;
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
    }
    return (
        <div>
            <div>
                <div>
                    <nav>
                        <span>Junio 25</span>
                        <span>Semana</span>
                    </nav>
                    <div className="">
                        <table
                            ref={tableRef}
                            className="table-auto table-schedule relative"
                            onMouseMove={onMouseMove}
                                onMouseDown={onMouseDown}
                                onMouseUp={onMouseUp}
                        >
                            <thead className="pointer-events-none">
                                <td>Horas</td>
                                <td>Lunes</td>
                                <td>Martes</td>
                                <td>Miércoles</td>
                                <td>Jueves</td>
                                <td>Viernes</td>
                                <td>Sábado</td>
                                <td>Domingo</td>
                            </thead>
                            <tbody
                                className="schedules"
                                
                            >
                                {partition.map((item, index) => {
                                    return (
                                        <tr key={index} data-hour={item}>
                                            <td className="pointer-events-none user-select-none">
                                                {item}
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
                </div>
            </div>
        </div>
    );
};

export default IndexSchedule;
