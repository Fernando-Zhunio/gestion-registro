import axios, { type AxiosRequestConfig } from "axios";
import { useCallback, useEffect, useState } from "react";

enum Methods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}
export const useFetch = (url: string, method: Methods = Methods.GET, info: Omit<AxiosRequestConfig<any>, 'url'|'method'> = {}, initLoad: boolean = true) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<any>(false);
    useEffect(() => {
        
       initLoad && fetchUrl();

    }, [])

    const fetchUrl = useCallback(async function fetchUrl<T = any>(options:{url?: string, method?: Methods, info?: Omit<AxiosRequestConfig<any>, 'url'|'method'> } = {}) {
            setLoading(true);
            const url1 = options?.url || url;
            const _info = options?.info || info;
            const response = await axios({..._info, url: url1, method});
            setLoading(false);
            setData(response.data);
            return response.data as T;
        }, [])

    return {data, loading, fetchUrl};
}