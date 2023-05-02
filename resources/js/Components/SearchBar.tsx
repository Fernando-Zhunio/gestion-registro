import { PaginatorEvent, ResponsePaginator } from "@/types/global";
import { router } from "@inertiajs/react";
import { CircularProgress, TablePagination } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

interface SearchBarProps {
    path: string;
    title: string;
    placeholder?: string;
    notLoadDataOnInit?: boolean;
    params?: any;
    // paramsPage
    onIsLoading?: (isLoading: boolean) => void;
    onSetData?: (data: any) => void;
    onError?: (error: any) => void;
    children?: any;
    buttons?: any;
    withPaginator?: boolean;
    rowsPerPageOptions?: number[];
}

const SearchBarComponent = ({
    path,
    title,
    placeholder,
    notLoadDataOnInit,
    withPaginator,
    rowsPerPageOptions,
    onIsLoading,
    onSetData,
    onError,
    children,
    buttons,
}: SearchBarProps) => {
    const [data, setData] = useState<any[]>([]);
    const [pass, setPass] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<any>(false);
    const [error, setError] = useState<any>(null);
    const [searchText, setSearchText] = useState<string>("");
    const [paginator, setPaginator] = useState<PaginatorEvent>({
        page: 0,
        pageSize: 10,
        length: 0,
    });
    useEffect(() => {
        if (notLoadDataOnInit && !pass) {
            setPass(true);
            return;
        };
        fetchUrl();
    }, [paginator]);

    function handlerSetIsLoading(isLoading: boolean) {
        setIsLoading(isLoading);
        onIsLoading && onIsLoading(isLoading);
    }
    function handlerSetData(data: any) {
        setData(data);
        onSetData && onSetData(data);
    }
    function handlerSetError(error: any) {
        setError(error);
        onError && onError(error);
    }

    async function fetchUrl() {
        handlerSetIsLoading(true);
        // axios.get(path).then((response) => {
        //     handlerSetData(response.data);
        //     handlerSetIsLoading(false);
        // }).catch((error) => {
        //     console.log({ error });
        //     handlerSetError(error);
        //     handlerSetIsLoading(false);
        // });
        console.log({ paginator })
        const params = {
            search: searchText,
            page: paginator.page + 1,
            pageSize: paginator.pageSize,
        }
        router.get(path, params, {
            preserveState: true,
            onSuccess: (data) => {
                handlerSetData((data.props.data as any)?.data || []);
                handlerSetIsLoading(false);
            },
            onError: (error) => {
                handlerSetIsLoading(false);
            }
        });
    }
    function onClickSearch() {
        fetchUrl();
    }
    function handleChangePage(_event: any, page: number): void {
        console.log({ page });
        setPaginator((prevState) => ({ ...prevState, page }));
        // fetchUrl();
    }

    return (
        <div>
            <div className="flex items-center justify-between position-sticky">
                <div className="flex items-center gap-2">
                    <h2 className="text-3xl">{title}</h2>
                    <div className="search-bar bg-white shadow-sm rounded-md px-2 flex items-center">
                        <button onClick={onClickSearch} className="btn-search">
                            <i className="fa-solid fa-search text-gray-500"></i>
                        </button>
                        <input
                            className="border-none outline-none focus:ring-0 bg-transparent"
                            placeholder={placeholder || "Buscador"}
                            onChange={(e) => setSearchText(e.target.value)}
                            onKeyUp={(e) => {
                                if (e.key === "Enter") {
                                    onClickSearch();
                                }
                            }}
                            type="text"
                        />
                        {isLoading && <CircularProgress size={20} />}
                    </div>
                </div>
                <div className="flex gap-2">{buttons}</div>
            </div>

            <div className="mt-5">
                {children}

                {withPaginator && (
                    <TablePagination
                        rowsPerPageOptions={rowsPerPageOptions || [10, 25, 50]}
                        component="div"
                        count={100}
                        rowsPerPage={paginator.pageSize}
                        page={paginator.page}
                        onPageChange={handleChangePage}
                    />
                )}
            </div>
        </div>
    );
};

export default SearchBarComponent;
