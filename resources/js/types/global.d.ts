import { AxiosInstance } from 'axios';
import ziggyRoute, { Config as ZiggyConfig } from 'ziggy-js';

declare global {
    interface Window {
        axios: AxiosInstance;
    }

    var route: typeof ziggyRoute;
    var Ziggy: ZiggyConfig;
}

export interface CreateOrEditProps<T = any> {
    isEdit?: boolean;
    data?: T
    metaData?: any;
}

export interface ResponseDataPaginator<T = any> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
        url: string;
        label: string;
        active: boolean;
    }[];
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string;
    to: number;
    total: number;
}

export interface ResponsePaginator<T = any> {
    success: boolean;
    data: ResponseDataPaginator<T>;
}

export interface PaginatorEvent {
    page: number;
    pageSize: number;
    length: number;
}