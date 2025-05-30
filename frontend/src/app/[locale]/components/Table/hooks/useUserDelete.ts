import api from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosPromise } from "axios";

import { getCookie } from "@/utils/getCookie";

import { IsChecked } from "../../../context/table/hooks/useCheckbox";

const deleteData = (ids: string[]): AxiosPromise<void> => {
    const response = api.delete<void>("/user", {
        headers: {
            Authorization: `Bearer ${getCookie("jwt")}`,
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
                queryKey: ["users"],
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
