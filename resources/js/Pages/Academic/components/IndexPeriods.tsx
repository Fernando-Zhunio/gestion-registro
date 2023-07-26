import DialogCustom from "@/Components/DialogCustom"
import { SearchPaginator } from "@/Components/Paginator"
import { IPeriod } from "@/Models/period"
import { useEffect, useState } from "react"

const IndexPeriods = () => {

    const [periods, setPeriods] = useState<IPeriod[]>([])
    useEffect(() => {

    })
    function getPeriods(data: IPeriod[]) {
        setPeriods(data)
    }

    return (
        <div>
            <div>
                <button className="text-white p-1 mb-2 px-2 rounded-md bg-slate-800">
                    <i className="fas fa-plus"></i>
                </button>
            </div>
            <table className="table-auto table-periods">
                <thead>
                    <tr>
                        <th>Promoción</th>
                        <th>Periodo</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        periods.map((period, index) => {
                            return (
                                <tr  key={index}>
                                    <td>{period.promotion}</td>
                                    <td>{period.start_date} A {period.end_date}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <SearchPaginator path='/academic/periods' onData={getPeriods} />
            <DialogCustom
                title="Crear Periodo"
                open={isOpen}
            >
                
            </DialogCustom>

        </div>
    )
}

export default IndexPeriods