import { useState } from "react";

import { useRouter } from "@/i18n/routing";

import { mappingSort } from "../constants/mappingSort";

import { useQueryHandler } from "./useQueryHandler";

export const useSort = (searchParams: URLSearchParams) => {
    const router = useRouter();
    const { createPath } = useQueryHandler();

    const [sort, setSort] = useState<string>(
        searchParams.get("sort") || "dateCreated",
    );

    const handleSort = (
        e: React.MouseEvent<HTMLAnchorElement>,
        sort: string,
    ) => {
        e.preventDefault();
        router.push(
            createPath([
                ["sort", mappingSort[sort]],
                ["page", "1"],
            ]),
        );
    };

    return { sort, setSort, handleSort };
};

