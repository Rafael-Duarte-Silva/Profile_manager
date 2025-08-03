import { useRef, useState } from "react";

export const useSearch = (
    searchParams: URLSearchParams,
    pathPush: (queryList: string[][]) => void,
) => {
    const searchRef = useRef<HTMLInputElement>(null);
    const searchDefaultValue = searchParams.get("search") || "";

    const [isOpenSearchBar, setIsOpenSearchBar] = useState<boolean>(false);

    const handleSearchKeyboard = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSearch();
        }
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

        if (searchRef.current?.value !== searchParams.get("search")) {
            if (
                (window.screen.width <= 1200 && isOpenSearchBar) ||
                window.screen.width > 1200
            ) {
                pathPush([
                    ["search", searchRef.current?.value || ""],
                    ["page", "1"],
                ]);
            }
        }
    };

    return {
        ref: searchRef,
        searchDefaultValue,
        isOpenSearchBar,
        handleSearchKeyboard,
        handleSearch,
        handleIsOpenSearchBar,
        setIsOpenSearchBar,
    };
};

