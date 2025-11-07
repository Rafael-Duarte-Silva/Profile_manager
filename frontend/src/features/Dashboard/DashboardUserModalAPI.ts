import { UserData } from "@/interfaces/UserData";
import api from "@/services/api";
import { AxiosPromise } from "axios";

import { UserMutateSchema } from "@/schemas/UserMutateSchema";

export const postUserRegister = (
    data: UserMutateSchema,
): AxiosPromise<void> => {
    const response = api.post<void, UserMutateSchema>("/auth/register", data);
    return response;
};

export const putUserData = (data: UserData): AxiosPromise<void> => {
    const response = api.put<void, UserData>("/users", data);
    return response;
};

