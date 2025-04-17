import { useState } from "react";

import { useRouter } from "@/i18n/routing";

import { useQueryHandler } from "./useQueryHandler";

export const useSearch = (
    searchParams: URLSearchParams,
    isOpenSearchBar: boolean,
) => {
    const router = useRouter();
    const { createPath } = useQueryHandler();

    let search = searchParams.get("search") || "";
    const [deferredSearch, setDeferredSearch] = useState<string>(search);

    const handleSarchKeyboard = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const updateSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        search = e.target.value;
    };

    const handleSearch = (e?: React.MouseEvent) => {
        if (e) {
            e.stopPropagation();
        }

        if (search !== searchParams.get("search")) {
            if (
                (window.screen.width <= 375 && isOpenSearchBar) ||
                !(window.screen.width <= 375)
            ) {
                router.push(
                    createPath([
                        ["search", search],
                        ["page", "1"],
                    ]),
                );
            }
        }
    };

    return {
        deferredSearch,
        setDeferredSearch,
        handleSarchKeyboard,
        updateSearch,
        handleSearch,
    };
};

