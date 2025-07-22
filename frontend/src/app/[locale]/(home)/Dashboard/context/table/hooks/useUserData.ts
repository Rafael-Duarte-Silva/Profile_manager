import { UserData } from "@/interfaces/UserData";
import api from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosPromise } from "axios";

const fetchData = (endpoint: string): AxiosPromise<UserData[]> => {
    const response = api.get<UserData[]>(endpoint);
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
