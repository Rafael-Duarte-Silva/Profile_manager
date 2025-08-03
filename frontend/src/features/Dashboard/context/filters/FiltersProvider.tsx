import { ReactNode, useMemo } from "react";

import { usePage } from "./hooks/usePage";
import { useSearch } from "./hooks/useSearch";
import { useSort } from "./hooks/useSort";
import { useUserFilters } from "./hooks/useUserFilters";

import { FiltersContext } from "./FiltersContext";

export const FiltersProvider = ({ children }: { children: ReactNode }) => {
    const { pathPush, searchParams } = useUserFilters();
    const sort = useSort(searchParams, pathPush);
    const page = usePage(searchParams, pathPush);
    const search = useSearch(searchParams, pathPush);

    const contextValue = useMemo(
        () => ({
            ...search,
            ...page,
            ...sort,
            endpoint: searchParams.toString() || `page=${page}&sort=${sort}`,
        }),
        [sort, page, search],
    );

    return (
        <FiltersContext.Provider value={contextValue}>
            {children}
        </FiltersContext.Provider>
    );
};

