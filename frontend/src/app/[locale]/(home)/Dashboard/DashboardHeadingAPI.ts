import api from "@/services/api";
import { AxiosPromise } from "axios";

export const postUserGenerate = (): AxiosPromise<void> => {
    const response = api.post<void, undefined>("/auth/register/generate");

    return response;
};

