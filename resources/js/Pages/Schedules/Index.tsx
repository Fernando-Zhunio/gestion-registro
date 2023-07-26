import { ResponsePaginator } from "@/types/global";
import { useCallback, useEffect, useMemo, useRef, useState, useContext } from "react";
import { IParallel } from "../Parallels/types/parallel.types";
import { ISchedule } from "./types/schedules.type";
import CreateOrEditSchedule from "./components/CreateOrEditSchedule";
import { ManagerSchedule } from "./tools/manager-schedule";
import SelectSearch from "@/Shared/components/SelectSearch";
import { useForm } from "react-hook-form";
import axios from "axios";
import { showQuestion } from "@/Helpers/alerts";
import { AppContext } from "@/Context/AppContext";


const IndexSchedule = ({
    data,
}: ResponsePaginator<{ parallels: IParallel }>) => {
    const [schedule, setSchedule] = useState<ISchedule>();
    const { role } = useContext(AppContext)
    const [schedulesHours, setSchedulesHours] = useState<any[]>(ManagerSchedule.getHours());
    const [schedulesDays, setSchedulesDays] = useState<{ value: any, label: string }[]>(ManagerSchedule.getDays());
    const [isOpen, setIsOpen] = useState(false);
    const [blockedHours, setBlockedHours] = useState<boolean>(true);
    const [parallel, setParallel] = useState<IParallel | null>(null);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    let [managerSchedule, setManagerSchedule] = useState<ManagerSchedule>()

    useEffect(() => {
        managerSchedule! = new ManagerSchedule('table-schedule');
        setManagerSchedule(managerSchedule);
        if (role == 'teacher' || role == 'student') return
        managerSchedule.subscribeClickSchedule(async (schedule) => {
            const response = await showQuestion({
                title: '¿Que desea hace al horario?',
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Eliminar',
                text: '¿Seleccione una opción?',
                showCancelButton: true,
                showConfirmButton: true,
                showDenyButton: true,
                denyButtonText: 'Editar',
                // confirmButtonColor: '#dc3545',
            });
            if (response.isConfirmed) {
                const responseDelete = await showQuestion({
                    title: '¿Esta seguro de eliminar el horario?',
                    cancelButtonText: 'Cancelar',
                    showCancelButton: true,
                    confirmButtonText: 'Eliminar',
                })
                if (responseDelete.isConfirmed) {
                    await axios.delete(`/schedules/${schedule.schedule.id}`);
                    managerSchedule?.removeScheduleInView(schedule.schedule.id);
                }
            } else if (response.isDenied) {
                console.log('edit schedule', schedule.schedule)
                setIsEdit(true);
                setSchedule(schedule.schedule);
                setIsOpen(true);
            }
        })
        const listener = (e: any) => onClickCell(e);
        managerSchedule.getTable().addEventListener("click", listener);
        return () => {
            managerSchedule?.getTable().removeEventListener('click', listener);
        };
    }, []);

    const onClickCell = (e: any) => {
        if (role == 'teacher' || role == 'student') return
        e.stopPropagation();
        if (!isCell(e)) return;
        setIsEdit(false);
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
        setIsOpen(true);
    };

    const isCell = (e: any) => {
        return e?.target?.localName == "td";
    };

    const onClose = (schedule?: ISchedule) => {
        setIsOpen(false);
        if (schedule) {
            if (isEdit) {
                managerSchedule?.editScheduleInView(schedule.id, schedule);
            } else {
                managerSchedule!?.addScheduleInView(schedule);
            }
        }
    }

    function getScheduleByParallel(parallelId: number) {
        axios.get(`/schedules/parallels/${parallelId}`)
            .then((response) => {
                managerSchedule?.refreshSchedules(response.data.data);
            })
    }

    const { control } = useForm();

    return (
        <div>
            <div>
                <div className=" my-3">
                    <label htmlFor="name">Paralelos:</label>
                    <SelectSearch
                        className="z-10"
                        path="/schedules/parallels/search"
                        control={control}
                        name="paralelo_id"
                        disabled={true}
                        onChange={(e: any) => {
                            setParallel(e.item);
                            setBlockedHours(false);
                            getScheduleByParallel(e.item.id);
                        }}
                    />
                </div>
                <div>
                    
                </div>
            </div>
            <div className="mt-4 relative">
                {blockedHours && <div className="overlay-table"></div>}
                <table
                    id="table-schedule"
                    className="table-auto table-schedule relative user-select-none w-full"
                >
                    <thead>
                        <tr>
                            <th style={{ width: "63px" }}>Hora</th>
                            {schedulesDays.map((day) => {
                                return <th key={day.value} className="text-center"><div className="day-label">{day.label}</div></th>;
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {schedulesHours.map((scheduleHour, index) => {
                            return (
                                <tr key={scheduleHour}>
                                    <td className="td-hour">
                                        <div className="hour-label">{index != 0 ? scheduleHour : ''}</div>
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
            {isOpen && (
                <CreateOrEditSchedule
                    parallel={parallel!}
                    isEdit={isEdit}
                    close={onClose}
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
