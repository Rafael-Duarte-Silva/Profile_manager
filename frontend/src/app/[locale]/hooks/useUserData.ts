import { UserData } from "@/interface/UserData";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";

import { getCookie } from "@/utils/getCookie";

const fetchData = (page: string): AxiosPromise<UserData[]> => {
    const token = getCookie("jwt");
    const response = axios.get(process.env.NEXT_PUBLIC_API_URL + `/user?page=${page}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
};

export const useUserData = (page: string = "") => {
    const query = useQuery({
        queryFn: () => fetchData(page),
        queryKey: ["food-data"],
        retry: 2,
    });

    return {
        ...query,
        data: query.data?.data,
    };
};

