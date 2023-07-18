import { Paginator } from "@/Components/Paginator";
import { useEffect, useContext } from "react";
import IndexPeriods from "./components/IndexPeriods";
import SelectSearch from "@/Shared/components/SelectSearch";
import { useForm } from "react-hook-form";
import { AppContext } from "@/Context/AppContext";

const AcademicIndex = () => {
    const {control } = useForm()
    const {appInfo} = useContext(AppContext);
    console.log(appInfo)
    return (
        <div>
            <h1 className="font-bold text-xl">Sección Académica</h1>
            <hr />
            <div className="grid grid-cols-12 mt-4">
                <div className="col-span-3">
                    <h2 className="text-lg">Periodo Actual</h2>
                    <p>{appInfo?.currentState?.period?.promotion}</p>
                    <SelectSearch
                        label="Periodo"
                        name="period_id"
                        control={control}
                        path="/academic/periods"
                        cbMap={period => {return {label: period.promotion, value: period.id}} }
                    />
                </div>
            </div>
        </div>
    );
}

export default AcademicIndex;