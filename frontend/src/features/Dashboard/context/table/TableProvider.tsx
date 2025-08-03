import { ReactNode, useEffect, useMemo } from "react";

import { usePage } from "./hooks/usePage";
import { useSearch } from "./hooks/useSearch";
import { useSort } from "./hooks/useSort";
import { useUserData } from "./hooks/useUserData";
import { useUserFilters } from "./hooks/useUserFilters";

import { TableContext } from "./TableContext";

export const TableProvider = ({ children }: { children: ReactNode }) => {
    const { pathPush, searchParams } = useUserFilters();
    const { sort, handleSort } = useSort(searchParams, pathPush);
    const { page, handlePage } = usePage(searchParams, pathPush);
    const { setIsOpenSearchBar, ...search } = useSearch(searchParams, pathPush);
    const { data, refetch } = useUserData(
        searchParams.toString() || `page=${page}&sort=${sort}`,
    );

    const contextValue = useMemo(
        () => ({
            ...search,
            data,
            page,
            sort,
            handleSort,
            handlePage,
        }),
        [sort, page, search],
    );

    useEffect(() => {
        setIsOpenSearchBar(false);
        refetch();
    }, [searchParams.toString()]);

    return (
        <TableContext.Provider value={contextValue}>
            {children}
        </TableContext.Provider>
    );
};

