import axios, { type AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";

enum Methods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}
export const useFetch = (url: string, method: Methods = Methods.GET, info: Omit<AxiosRequestConfig<any>, 'url'|'method'> = {}) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<any>(false);
    useEffect(() => {
        async function fetchUrl() {
            setLoading(true);
            const response = await axios({...info, url, method});
            setLoading(false);
            setData(response.data);
        }
        fetchUrl();

    }, [])

    return {data, loading};
}