import { SearchPaginator } from "@/Components/Paginator";
import { useEffect, useContext, useState } from "react";
import IndexPeriods from "./components/IndexPeriods";
import SelectSearch from "@/Shared/components/SelectSearch";
import { useForm } from "react-hook-form";
import { AppContext } from "@/Context/AppContext";
import { showQuestion, showToast } from "@/Helpers/alerts";
import axios from "axios";
import Select from "@/Components/Select";
import { IParallel } from "../Parallels/types/parallel.types";
import { IPeriod } from "../Periods/types/period.types";

const AcademicIndex = ({data: {periods}}:{data: {periods: IPeriod[]}}) => {
    const { control, watch } = useForm();
    const { appInfo } = useContext(AppContext);
    console.log({ appInfo });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const nextPeriod = watch("period_id");
    async function onChangePeriod() {
        const resultQuestion = await showQuestion({
            title: "¿Seguro que quieres cambiar el periodo?",
            text: "Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si, cambiar",
            cancelButtonText: "Cancelar",
        });
        if (!resultQuestion.isConfirmed) {
            return
        }
        setIsLoading(true);
        console.log({ resultQuestion });
        axios.post(`/academic/periods/${nextPeriod}/period-next`).then(() => {
            setIsLoading(false);
            window.location.reload();

        }).catch(() => {
            setIsLoading(false);
            showToast({ 
                title: 'Error, no se pudo cambiar el periodo',
                icon: 'error'
            })
        })
    }
    return (
        <div>
            <h1 className="font-bold text-xl">Sección Académica</h1>
            <hr />
            <div className="grid grid-cols-12 mt-4">
                <div className="col-span-3 border rounded-md p-4">
                    <h3 className="text-lg">Periodo Actual:</h3>
                    <p className="bg-green-500 rounded-lg inline-block text-white px-2">
                        {appInfo?.currentState?.period?.promotion}
                    </p>
                    <hr className="my-2" />
                    {/* <SelectSearch
                        label="Periodo a cambiar:"
                        name="period_id"
                        control={control}
                        path="/academic/periods-next"
                        cbMap={(period) => {
                            return {
                                label: period.promotion,
                                value: period.id,
                            };
                        }}
                    /> */}
                    <Select
                        label="Periodo a cambiar:"
                        control={control}
                        name="period_id"
                    >
                        <option value="">Seleccione una opción</option>
                        {
                            periods.map((period) => (
                                <option key={period.id} value={period.id}>
                                    {period.promotion}
                                </option>
                            ))
                        }
                    </Select>
                    <div className="mt-3">
                        <button disabled={isLoading || !nextPeriod} onClick={onChangePeriod} className="btn-custom shadow-lg bg-slate-900 rounded-md text-white px-3 py-2">
                            Cambiar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AcademicIndex;
