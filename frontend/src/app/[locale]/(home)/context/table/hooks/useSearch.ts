import { useState } from "react";

import { useQueryHandler } from "./useQueryHandler";

export const useSearch = (searchParams: URLSearchParams) => {
    const { pathPush } = useQueryHandler();

    let search = searchParams.get("search") || "";
    const [deferredSearch, setDeferredSearch] = useState<string>(search);
    const [isOpenSearchBar, setIsOpenSearchBar] = useState<boolean>(false);

    const handleSearchKeyboard = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const updateSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        search = event.target.value;
    };

    const handleIsOpenSearchBar = () => {
        if (!isOpenSearchBar && window.screen.width <= 375) {
            setIsOpenSearchBar(true);
        }
    };

    const handleSearch = (event?: React.MouseEvent) => {
        if (event) {
            event.stopPropagation();
        }

        if (search !== searchParams.get("search")) {
            if (
                (window.screen.width <= 375 && isOpenSearchBar) ||
                !(window.screen.width <= 375)
            ) {
                pathPush([
                    ["search", search],
                    ["page", "1"],
                ]);
            }
        }
    };

    return {
        deferredSearch,
        isOpenSearchBar,
        setDeferredSearch,
        handleSearchKeyboard,
        updateSearch,
        handleSearch,
        handleIsOpenSearchBar,
        setIsOpenSearchBar,
    };
};

