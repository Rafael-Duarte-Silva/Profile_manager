import api from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosPromise } from "axios";

import { IsChecked } from "@/types/IsChecked";

import { getCookie } from "@/utils/getCookie";

const deleteData = (ids: string[]): AxiosPromise<void> => {
    const response = api.delete<void>("/users", {
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
        const ids: string[] = isChecked
            .filter((value, i) => value.checked || position === i)
            .map((value) => value.id);

        mutate(ids);
    };

    return { handleUserDelete };
};
