import { IItemSidebar } from "@/Models/sidebar";
import axios from "axios";

export const getItemSidebar = () => {
    const path = '/sidebar';
    return axios.get<{data:IItemSidebar[], success: boolean}>(path).then((res) => {
        return res.data.data;
    });
}