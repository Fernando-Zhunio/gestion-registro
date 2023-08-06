import { ResponsePaginator } from "@/types/global";
import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    useContext,
} from "react";
import { IParallel } from "../Parallels/types/parallel.types";
import { ISchedule } from "./types/schedules.type";
import CreateOrEditSchedule from "./components/CreateOrEditSchedule";
import { ManagerSchedule } from "./tools/manager-schedule";
import SelectSearch from "@/Shared/components/SelectSearch";
import { useForm } from "react-hook-form";
import axios from "axios";
import { showQuestion, showToast } from "@/Helpers/alerts";
import { AppContext } from "@/Context/AppContext";

interface IPropsScheduleIndex {
    parallels: IParallel[];
    roles: {name: 'student' | 'teacher' | 'super-admin'}[],
};
const IndexSchedule = ({
    data: {roles}
}: {data: IPropsScheduleIndex}) => {
    const [schedule, setSchedule] = useState<ISchedule>();
    const { role } = useContext(AppContext);
    const [schedulesHours, setSchedulesHours] = useState<any[]>(
        ManagerSchedule.getHours()
    );
    const [schedulesDays, setSchedulesDays] = useState<
        { value: any; label: string }[]
    >(ManagerSchedule.getDays());
    const [isOpen, setIsOpen] = useState(false);
    // const [blockedHours, setBlockedHours] = useState<boolean>(true);
    const [parallel, setParallel] = useState<IParallel | null>(null);
    const [period_id, setPeriodId] = useState<number | "">("");
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    let [managerSchedule, setManagerSchedule] = useState<ManagerSchedule>();
    const [parallels, setParallels] = useState<IParallel[]>([]);
    const [isAuthManager, setIsAuthManager] = useState<boolean>(false);

    useEffect(() => {
        managerSchedule! = new ManagerSchedule("table-schedule");
        setManagerSchedule(managerSchedule);
        const _isAuthManager = roles.some((res) => res.name === 'student' || res.name === 'teacher');
        setIsAuthManager(_isAuthManager);
        if (_isAuthManager) return;
        managerSchedule.subscribeClickSchedule(async (schedule) => {
            const response = await showQuestion({
                title: "¿Que desea hace al horario?",
                cancelButtonText: "Cancelar",
                confirmButtonText: "Eliminar",
                text: "¿Seleccione una opción?",
                showCancelButton: true,
                showConfirmButton: true,
                showDenyButton: true,
                denyButtonText: "Editar",
                // confirmButtonColor: '#dc3545',
            });
            if (response.isConfirmed) {
                const responseDelete = await showQuestion({
                    title: "¿Esta seguro de eliminar el horario?",
                    cancelButtonText: "Cancelar",
                    showCancelButton: true,
                    confirmButtonText: "Eliminar",
                });
                if (responseDelete.isConfirmed) {
                    axios
                        .delete(`/schedules/${schedule.schedule.id}`)
                        .then((response) => {
                            managerSchedule?.removeScheduleInView(schedule.schedule.id);
                        })
                        .catch((error) => {
                            console.log({ error });
                            showToast({
                                icon: "error",
                                text: error.response.data.message,
                                title: "Error al crear el horario",
                            });
                        });
                }
            } else if (response.isDenied) {
                console.log("edit schedule", schedule.schedule);
                setIsEdit(true);
                setSchedule(schedule.schedule);
                setIsOpen(true);
            }
        });
        const listener = (e: any) => onClickCell(e);
        managerSchedule.getTable().addEventListener("click", listener);
        return () => {
            managerSchedule?.getTable().removeEventListener("click", listener);
        };
    }, []);

    function onChangePeriod(e: any) {
        const value = e.target.value;
        // setParallel(null)
        managerSchedule?.refreshSchedules([]);
        setPeriodId(() => {
            return value;
        });
        setParallel(() => {
            return null;
        });
        setParallels([]);
        if (!value) return;
        getParallels(value);
    }

    function onChangeParallel(event: any) {
        const value = parallels.find((x) => x.id == event.target.value);
        managerSchedule?.refreshSchedules([]);
        setParallel(() => {
            return value || null;
        });
        if (!value) return;
        getScheduleByParallel(value.id);
    }

    function getParallels(period_id: number) {
        setIsLoading(true);
        axios
            .get(`/schedules/periods/${period_id}/parallels`)
            .then((response) => {
                const parallels = response.data.data;
                setParallels(parallels);
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
                showToast({
                    title: "Error",
                    text: "Error al cargar los periodos",
                    icon: "error",
                });
            });
    }

    const onClickCell = (e: any) => {
        if (role == "teacher" || role == "student") return;
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
            description: "",
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
    };

    function getScheduleByParallel(parallelId: number) {
        setIsLoading(true);
        axios
            .get(`/schedules/parallels/${parallelId}?period_id=${period_id}`)
            .then((response) => {
                managerSchedule?.refreshSchedules(response.data.data);
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
                showToast({
                    title: "Error",
                    text: "Error al cargar los horarios de este paralelo",
                    icon: "error",
                });
            });
    }

    const { appInfo } = useContext(AppContext);

    return (
        <div>
            <div className="grid grid-cols-12 my-3 gap-3">
                <div className="col-span-4">
                    <label htmlFor="period_id">Periodo</label>
                    <select
                        disabled={isLoading}
                        onChange={onChangePeriod}
                        className="border py-2 px-3 w-full block border-gray-300  focus:border-indigo-500  focus:ring-indigo-500 rounded-md shadow-sm"
                        id="period_id"
                    >
                        <option value="">Seleccione una opción</option>

                        {appInfo.periods?.map((period) => (
                            <option key={period.id} value={period.id}>
                                {period.promotion}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col-span-4">
                    <label htmlFor="name">Paralelos:</label>
                    <select
                        disabled={isLoading}
                        onChange={onChangeParallel}
                        className="border py-2 px-3 w-full block border-gray-300  focus:border-indigo-500  focus:ring-indigo-500 rounded-md shadow-sm"
                        id="period_id"
                    >
                        <option value="">Seleccione una opcion</option>
                        {parallels?.map((parallel) => (
                            <option key={parallel.id} value={parallel.id}>
                                {parallel.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="mt-4 relative">
                {!period_id || !parallel || period_id != appInfo?.currentState?.period_id || isAuthManager ? (
                    <div className="overlay-table bg-slate-500/10 z-50"></div>
                ) : null}
                <table
                    id="table-schedule"
                    className="table-auto table-schedule relative user-select-none w-full"
                >
                    <thead>
                        <tr>
                            <th style={{ width: "63px" }}>Hora</th>
                            {schedulesDays?.map((day) => {
                                return (
                                    <th key={day.value} className="text-center">
                                        <div className="day-label">
                                            {day.label}
                                        </div>
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {schedulesHours.map((scheduleHour, index) => {
                            return (
                                <tr key={scheduleHour}>
                                    <td className="td-hour">
                                        <div className="hour-label">
                                            {index != 0 ? scheduleHour : ""}
                                        </div>
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
