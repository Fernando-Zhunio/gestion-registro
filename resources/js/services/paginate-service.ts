import { ResponsePaginator } from "@/types/global";
import axios from "axios";

export function getDataPaginateService(path: string, page: number, pageSize: number, params: any = {}) {  
    return axios.get<ResponsePaginator>(path, {
        params: {
            page,
            pageSize,
            ...params
        }
    }).then((res) => {
        return res.data;
    });
}