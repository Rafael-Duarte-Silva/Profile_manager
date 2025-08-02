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

export const useUserData = (endpoint: string) => {
    const query = useQuery({
        queryFn: ({ signal }) => getUserData(`users/?${endpoint}`, signal),
        queryKey: ["users"],
        retry: 2,
    });

    return {
        ...query,
        data: query.data?.data,
    };
};
