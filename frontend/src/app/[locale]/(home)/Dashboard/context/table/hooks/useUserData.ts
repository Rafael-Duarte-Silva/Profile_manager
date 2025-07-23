import { UserData } from "@/interfaces/UserData";
import api from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosPromise } from "axios";

const getUserData = (
    endpoint: string,
    signal: AbortSignal,
): AxiosPromise<UserData[]> => {
    const response = api.get<UserData[]>(endpoint, { signal });
    return response;
};

export const useUserData = (
    search: string = "",
    page: string = "",
    sort: string = "",
) => {
    const endpoint = `/users?search=${search}&page=${page}&sort=${sort}`;

    const query = useQuery({
        queryFn: ({ signal }) => getUserData(endpoint, signal),
        queryKey: ["users"],
        retry: 2,
    });

    return {
        ...query,
        data: query.data?.data,
    };
};
