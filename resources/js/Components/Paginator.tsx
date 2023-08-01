import { getDataPaginateService } from "@/services/paginate-service";
import { PaginatorEvent } from "@/types/global";
import TablePagination from "@mui/material/TablePagination";
import { InputHTMLAttributes, forwardRef, useEffect, useState, useImperativeHandle } from "react";
// import { BsSearch } from "react-icons/bs";

type PropSearchPaginator = InputHTMLAttributes<HTMLInputElement> & {
    loadInit?: boolean;
    className?: string;
    children?: any;
    path: string;
    isDisabledBtn?: boolean;
    params?: {[key: string]: any};
    onData: (data: any) => any;
    onError?: (data: any) => any;
};
export const SearchPaginator = forwardRef(
    (
        {
            className = "",
            children,
            path,
            isDisabledBtn,
            onData,
            onError,
            loadInit,
            params,
            ...props
        }: PropSearchPaginator,
        ref
    ) => {
        useImperativeHandle(ref, () => ({
            getData
          }));
        const [rowsPerPageOptions, setRowsPerPageOptions] = useState<number[]>([
            10, 25, 50,
        ]);
        const [paginator, setPaginator] = useState<PaginatorEvent>({
            page: 0,
            pageSize: 10,
            length: 0,
        });
        const [textSearch, setTextSearch] = useState("");
        const [isLoading, setIsLoading] = useState(false);
        const [length, setLength] = useState<number>(0);
        useEffect(() => {
           getData();
           
        }, [paginator]);
        function onRowsPerPageChange(
            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) {
            setPaginator((prevState) => ({
                ...prevState,
                pageSize: parseInt(event.target.value, 10),
            }));
        }

        function handleChangePage(event: unknown, newPage: number) {
            setPaginator((prevState) => ({
                ...prevState,
                page: newPage + 1,
            }));
        }
        
        function getData(_path: string | null = path, _params: {[key: string]: any} | null = null) {
            let __path = _path || path;
            console.log({ path });
            if(!__path) return;
            if(textSearch) {
                __path += `?search=${textSearch}`;
            }
            const __params = _params || params
            // if (params) {
            //     Object.keys(params).forEach((key) => {
            //         __path += `&${key}=${params[key]}`
            //     })
            // }
            console.log({ __path });
            setIsLoading(true);
            getDataPaginateService(__path, paginator.page, paginator.pageSize, __params)
                .then((response) => {
                    console.log({ response });
                    setIsLoading(false);
                    onData(response.data.data);
                    setLength(response.data.total);
                })
                .catch((error) => {
                    setIsLoading(false);
                    console.log(error)
                   onError && onError(error);
                });
        }
        return (
            <>
                <div className="flex items-center">
                    <input
                        className={`border bg-blue-300/5 flex-grow py-2 px-3 block border-gray-300  focus:border-indigo-500  focus:ring-indigo-500 rounded-md shadow ${className}`}
                        type="search"
                        onChange={(e) => {
                            setTextSearch(e.target.value);
                        }}
                        {...props}
                    />
                    <button
                        onClick={() => getData()}
                        disabled={isLoading || isDisabledBtn}
                        className="center w-10 h-10 m-2 rounded-full bg-slate-800 shadow-sm"
                    >
                        {/* <BsSearch className="text-white" /> */}
                        <i className="fa-solid fa-magnifying-glass text-white"></i>
                    </button>
                </div>
                <div>{children}</div>
                <TablePagination
                    rowsPerPageOptions={rowsPerPageOptions || [10, 25, 50]}
                    component="div"
                    count={length}
                    rowsPerPage={paginator.pageSize}
                    page={paginator.page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={onRowsPerPageChange}
                />
            </>
        );
    }
);
