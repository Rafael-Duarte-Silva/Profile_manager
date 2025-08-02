import { ReactNode, useEffect, useMemo } from "react";

import { useSearchParams } from "next/navigation";

import { useCheckbox } from "./hooks/useCheckbox";
import { usePage } from "./hooks/usePage";
import { useSearch } from "./hooks/useSearch";
import { useSort } from "./hooks/useSort";
import { useUserData } from "./hooks/useUserData";

import { TableContext } from "./TableContext";

export const TableProvider = ({ children }: { children: ReactNode }) => {
    const checkbox = useCheckbox();

    const searchParams = new URLSearchParams(useSearchParams().toString());
    const { sort, handleSort } = useSort(searchParams);
    const { page, handlePage } = usePage(searchParams);
    const { setIsOpenSearchBar, ...search } = useSearch(searchParams);
    const { data, refetch } = useUserData(
        searchParams.toString() || `page=${page}&sort=${sort}`,
    );

    const contextValue = useMemo(
        () => ({
            ...checkbox,
            ...search,
            data,
            page,
            sort,
            handleSort,
            handlePage,
        }),
        [sort, page, search, checkbox.allIsChecked, checkbox.isChecked],
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

