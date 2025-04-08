import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";

import { IsChecked } from "../../../hooks/useTable";

import { getCookie } from "@/utils/getCookie";

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
            queryClient.invalidateQueries({
                queryKey: ["users", { filter: "deactivate" }],
            });
        },
        onError: (error) => {
            console.error("Error delete user:", error);
        },
    });

    const handleUserDelete = (position: number, isChecked: IsChecked[]) => {
        const ids: string[] = [];

        for (let i: number = 0; i < isChecked.length; i++) {
            if (isChecked[i].checked || position === i) {
                ids.push(isChecked[i].id);
            }
        }

        mutate(ids);
    };

    return { handleUserDelete };
};
