import { PaginatorEvent, ResponseDataPaginator, ResponsePaginator } from "@/types/global";
import { router, usePage } from "@inertiajs/react";
import { CircularProgress, TablePagination } from "@mui/material";
import axios from "axios";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

interface SearchBarProps {
    path: string;
    title: string;
    placeholder?: string;
    notLoadDataOnInit?: boolean;
    width?: 1|2|3|4|5|6|7|8|9;
    params?: any;
    data?: ResponseDataPaginator<any> | null;
    // paramsPage
    onIsLoading?: (isLoading: boolean) => void;
    onSetData?: (data: any) => void;
    onError?: (error: any) => void;
    children?: any;
    buttons?: any;
    withPaginator?: boolean;
    rowsPerPageOptions?: number[];
}

const SearchBarComponent = forwardRef(({
    path,
    title,
    placeholder,
    notLoadDataOnInit = true,
    withPaginator,
    rowsPerPageOptions,
    width = 2,
    params = {},
    onIsLoading,
    onSetData,
    onError,
    children,
    buttons,
    data = null,
}: SearchBarProps, ref) => {
    useImperativeHandle(ref, () => ({
        fetchUrl
      }));
    // const [data, setData] = useState<any[]>([]);
    const [pass, setPass] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<any>(false);
    const [error, setError] = useState<any>(null);
    const [searchText, setSearchText] = useState<string>("");
    const [paginator, setPaginator] = useState<PaginatorEvent>({
        page: 0,
        pageSize: 10,
        length: 0,
    });
    const {props} = usePage() as any;

    useEffect(() => {
        setPaginator({
            page: props.data.current_page - 1,
            pageSize: props.data.per_page,
            length: props.data.total,
        })
        setSearchText(getQueryParamSearch());
        if (notLoadDataOnInit && !pass) {
            setPass(true);
            return;
        };
        fetchUrl();
        console.log({ props });
    }, []);

    // useEffect(() => {
    //     console.log({ props3: data });
    //     if (data) {
    //         setPaginator({
    //             page: data.current_page - 1,
    //             pageSize: data.per_page,
    //             length: data.total,
    //         })
    //     }
    // }, data as any);
    
    function getQueryParamSearch() {
        const urlParams = new URLSearchParams(window.location.search);
        console.log({ urlParams: urlParams.get('search') });
        return urlParams.get('search') || '';
    }

    function handlerSetIsLoading(isLoading: boolean) {
        setIsLoading(isLoading);
        onIsLoading && onIsLoading(isLoading);
    }
    // function handlerSetData(data: any) {
    //     setData(data);
    //     onSetData && onSetData(data);
    // }
    // function handlerSetError(error: any) {
    //     setError(error);
    //     onError && onError(error);
    // }

    async function fetchUrl(page: number | null = null, params2: {[key: string]: any} | null = null) {
        handlerSetIsLoading(true);
        const _params = {
            search: searchText,
            page: page || paginator.page + 1,
            pageSize: paginator.pageSize,
            ...params,
            ...params2
        }
        router.get(path, _params, {
            preserveState: true,
            onSuccess: (data: any) => {
                console.log({ data });
                setPaginator({
                    page: data.props.data.current_page - 1,
                    pageSize: data.props.data.per_page,
                    length: data.props.data.total,
                })
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
        fetchUrl(page + 1);
    }

    return (
        <div>
            <div className="flex flex-grow gap-2 items-center justify-between position-sticky">
                <div className="flex flex-grow items-center gap-2">
                    <h2 className="text-3xl">{title}</h2>
                    <div style={{'flexGrow': `0.${width || 2}`}} className="search-bar bg-slate-200 shadow-sm rounded-md px-2 flex items-center">
                        <button onClick={onClickSearch} className="btn-search">
                            <i className="fa-solid fa-search text-gray-500"></i>
                        </button>
                        <input
                            className="border-none outline-none focus:ring-0 bg-transparent"
                            placeholder={placeholder || "Buscador"}
                            onChange={(e) => setSearchText(e.target.value)}
                            value={searchText}
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
                        count={data?.total || paginator.length}
                        rowsPerPage={data?.per_page || paginator.pageSize}
                        page={((data?.current_page || 1) -1) || paginator.page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={(event) => {
                            setPaginator((prevState) => ({
                                ...prevState,
                                pageSize: parseInt(event.target.value, 10),
                                page: 0,
                            }));
                            fetchUrl();
                        }}
                    />
                )}
            </div>
        </div>
    );
});

export default SearchBarComponent;
