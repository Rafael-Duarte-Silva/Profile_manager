import { ReactNode, useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";

import { useCheckbox } from "./hooks/useCheckbox";
import { usePage } from "./hooks/usePage";
import { useSearch } from "./hooks/useSearch";
import { useSort } from "./hooks/useSort";
import { useUserData } from "./hooks/useUserData";

import { TableContext } from "./TableContext";

export const TableProvider = ({ children }: { children: ReactNode }) => {
    const searchParams = new URLSearchParams(useSearchParams().toString());
    const checkbox = useCheckbox();

    const { sort, setSort, handleSort } = useSort(searchParams);
    const { handlePage, page, setPage } = usePage(searchParams);
    const [isOpenSearchBar, setIsOpenSearchBar] = useState<boolean>(false);
    const {
        deferredSearch,
        setDeferredSearch,
        handleSarchKeyboard,
        updateSearch,
        handleSearch,
    } = useSearch(searchParams, isOpenSearchBar);
    const { data, refetch } = useUserData(deferredSearch, page, sort);

    const handleIsOpenSearchBar = () => {
        if (!isOpenSearchBar && window.screen.width <= 375) {
            setIsOpenSearchBar(true);
        }
    };

    useEffect(() => {
        const searchParam = searchParams.get("search") || "";
        const sortParam = searchParams.get("sort") || "";
        const pageParam = searchParams.get("page") || "";

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
                handleSort,
                handlePage,
                handleSarchKeyboard,
                updateSearch,
                handleSearch,
                isOpenSearchBar,
                handleIsOpenSearchBar,
            }}
        >
            {children}
        </TableContext.Provider>
    );
};

