import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";

import { getCookie } from "@/utils/getCookie";

const deleteData = (id: string): AxiosPromise<void> => {
    const token = getCookie("jwt");
    const response = axios.delete(process.env.NEXT_PUBLIC_API_URL + `/user?id=${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
};

export const useUserDelete = () => {
    const queryClient = useQueryClient();

    const mutate = useMutation({
        mutationFn: deleteData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: (error) => {
            console.error("Error delete user:", error);
        },
    });

    return mutate;
};

