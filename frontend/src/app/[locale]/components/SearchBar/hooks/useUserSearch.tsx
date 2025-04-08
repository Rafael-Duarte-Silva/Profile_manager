import { UserData } from "@/interface/UserData";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";

import { getCookie } from "@/utils/getCookie";

const fetchData = (search: string, page: string): AxiosPromise<UserData[]> => {
    const token = getCookie("jwt");
    const response = axios.get(
        process.env.NEXT_PUBLIC_API_URL +
            `/user/search?search=${search}&page=${page}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );
    return response;
};

export const useUserSearch = (
    search: string = "",
    page: string = "",
    enabled: boolean = false,
) => {
    const { refetch } = useQuery({
        queryFn: () => fetchData(search, page),
        queryKey: ["users", { filter: `${search ? "deactivate" : "active"}` }],
        retry: 2,
        enabled: enabled,
    });

    return { refetch };
};
