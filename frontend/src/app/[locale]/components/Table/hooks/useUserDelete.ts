import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";

import { getCookie } from "@/utils/getCookie";

import { IsChecked } from "./useTable";

const deleteData = (ids: string[]): AxiosPromise<void> => {
    const token = getCookie("jwt");
    const response = axios.delete(process.env.NEXT_PUBLIC_API_URL + "/user", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: ids,
    });
    return response;
};

export const useUserDelete = () => {
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: deleteData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: (error) => {
            console.error("Error delete user:", error);
        },
    });

    const handleUserDelete = (position: number, isChecked: IsChecked[]) => {
        const ids: string[] = [];

        for (let i: number = 0; i < isChecked.length; i++) {
            if (isChecked[i].checked) {
                ids.push(isChecked[i].id);
            } else if (position === i) {
                ids.push(isChecked[i].id);
            } else {
                continue;
            }
        }

        mutate(ids);
    };

    return { handleUserDelete };
};

