import { useRef, useState } from "react";

import { useUserFilters } from "./useUserFilters";

export const useSearch = (searchParams: URLSearchParams) => {
    const { pathPush } = useUserFilters();

    const search = useRef<string>("");
    const deferredSearch: string = searchParams.get("search") || "";
    const [isOpenSearchBar, setIsOpenSearchBar] = useState<boolean>(false);

    const handleSearchKeyboard = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const updateSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        search.current = event.target.value;
    };

    const handleIsOpenSearchBar = () => {
        if (!isOpenSearchBar && window.screen.width <= 1200) {
            setIsOpenSearchBar(true);
        }
    };

    const handleSearch = (event?: React.MouseEvent) => {
        if (event) {
            event.stopPropagation();
        }

        if (search.current !== searchParams.get("search")) {
            if (
                (window.screen.width <= 1200 && isOpenSearchBar) ||
                window.screen.width > 1200
            ) {
                pathPush([
                    ["search", search.current],
                    ["page", "1"],
                ]);
            }
        }
    };

    return {
        deferredSearch,
        isOpenSearchBar,
        handleSearchKeyboard,
        updateSearch,
        handleSearch,
        handleIsOpenSearchBar,
        setIsOpenSearchBar,
    };
};

