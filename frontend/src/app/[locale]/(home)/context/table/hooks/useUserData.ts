import { UserData } from "@/interface/UserData";
import api from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosPromise } from "axios";

import { getCookie } from "@/utils/getCookie";

const fetchData = (endpoint: string): AxiosPromise<UserData[]> => {
    const response = api.get<UserData[]>(endpoint, {
        headers: {
            Authorization: `Bearer ${getCookie("jwt")}`,
        },
    });
    return response;
};

export const useUserData = (
    search: string = "",
    page: string = "",
    sort: string = "",
) => {
    const endpoint = `/users?search=${search}&page=${page}&sort=${sort}`;

    const query = useQuery({
        queryFn: () => fetchData(endpoint),
        queryKey: ["users"],
        retry: 2,
    });

    return {
        ...query,
        data: query.data?.data,
    };
};
