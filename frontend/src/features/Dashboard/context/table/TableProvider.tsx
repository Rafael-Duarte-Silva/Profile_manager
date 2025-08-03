import { ReactNode, useEffect, useMemo } from "react";

import { UserData } from "@/interfaces/UserData";
import api from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosPromise } from "axios";
import { useSearchParams } from "next/navigation";

import { useFiltersContext } from "../filters/FiltersContext";
import { TableContext } from "./TableContext";

const getUserData = (
    endpoint: string,
    signal: AbortSignal,
): AxiosPromise<UserData[]> => {
    const response = api.get<UserData[]>(endpoint, { signal });
    return response;
};

export const TableProvider = ({ children }: { children: ReactNode }) => {
    const searchParams = useSearchParams();
    const { endpoint } = useFiltersContext();
    const { refetch, ...query } = useQuery({
        queryFn: ({ signal }) => getUserData(`users/?${endpoint}`, signal),
        queryKey: ["users"],
        retry: 2,
    });

    useEffect(() => {
        refetch();
    }, [searchParams.toString()]);

    const contextValue = useMemo(
        () => ({
            ...query,
            data: query.data?.data,
        }),
        [query.data?.data],
    );

    return (
        <TableContext.Provider value={contextValue}>
            {children}
        </TableContext.Provider>
    );
};

