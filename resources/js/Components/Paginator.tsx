import { getDataPaginateService } from "@/services/paginate-service";
import { PaginatorEvent } from "@/types/global";
import TablePagination from "@mui/material/TablePagination";
import { useEffect, useState } from "react";

export const Paginator = ({path, onData} : {path: string, onData: (data: any) => any}) => {
    const [rowsPerPageOptions, setRowsPerPageOptions] = useState<number[]>([10, 25, 50]);
    const [paginator, setPaginator] = useState<PaginatorEvent>({
        page: 0,
        pageSize: 10,
        length: 0,
    });
    const [length, setLength] = useState<number>(0)
    useEffect(() => {
        getData()
    }, [paginator])
    function onRowsPerPageChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setPaginator((prevState) => ({
            ...prevState,
            pageSize: parseInt(event.target.value, 10),
            page: 0,
        }));
    }

    function handleChangePage(event: unknown, newPage: number) {
        setPaginator((prevState) => ({
            ...prevState,
            page: newPage+1,
        }));
    }

    function getData() {
        getDataPaginateService(path, paginator.page, paginator.pageSize)
            .then((response) => {
                onData(response.data.data);
                setLength(response.data.total)
            })
    }
    return (
        <TablePagination
            rowsPerPageOptions={rowsPerPageOptions || [10, 25, 50]}
            component="div"
            count={length}
            rowsPerPage={paginator.pageSize}
            page={paginator.page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={onRowsPerPageChange}
        />
    )
}