import api from "@/services/api";
import { AxiosPromise } from "axios";

export const deleteUser = (ids: string[]): AxiosPromise<void> => {
    const response = api.delete<void>("/users", {
        data: ids,
    });
    return response;
};

