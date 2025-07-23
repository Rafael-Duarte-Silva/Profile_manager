import { LoginData } from "@/interfaces/LoginData";
import api from "@/services/api";
import { AxiosPromise } from "axios";

import { LoginPromise } from "./types";

export const postUserLogin = (data: LoginData): AxiosPromise<LoginPromise> => {
    const response = api.post<LoginPromise, LoginData>("/auth/login", data);
    return response;
};

