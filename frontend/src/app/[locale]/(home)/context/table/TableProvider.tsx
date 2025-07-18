import { ReactNode, useEffect } from "react";

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
    const { sort, setSort, handleSort } = useSort(searchParams);
    const { page, handlePage, setPage } = usePage(searchParams);
    const {
        deferredSearch,
        isOpenSearchBar,
        setDeferredSearch,
        handleSearchKeyboard,
        updateSearch,
        handleSearch,
        handleIsOpenSearchBar,
        setIsOpenSearchBar,
    } = useSearch(searchParams);
    const { data, refetch } = useUserData(deferredSearch, page, sort);

    useEffect(() => {
        const searchParam = searchParams.get("search") || deferredSearch;
        const sortParam = searchParams.get("sort") || sort;
        const pageParam = searchParams.get("page") || page;

        setDeferredSearch(searchParam);
        setPage(pageParam);
        setSort(sortParam);
        setIsOpenSearchBar(false);
    }, [searchParams.toString()]);

    useEffect(() => {
        refetch();
    }, [deferredSearch, sort, page]);

    return (
        <TableContext.Provider
            value={{
                ...checkbox,
                data,
                page,
                sort,
                deferredSearch,
                isOpenSearchBar,
                handleSort,
                handlePage,
                handleSearchKeyboard,
                updateSearch,
                handleSearch,
                handleIsOpenSearchBar,
            }}
        >
            {children}
        </TableContext.Provider>
    );
};

