import { useState } from "react";

import { mappingSort } from "../constants/mappingSort";

import { useQueryHandler } from "./useQueryHandler";

export const useSort = (searchParams: URLSearchParams) => {
    const { pathPush } = useQueryHandler();

    const [sort, setSort] = useState<string>(
        searchParams.get("sort") || "dateCreated",
    );

    const handleSort = (
        e: React.MouseEvent<HTMLAnchorElement>,
        sort: string,
    ) => {
        e.preventDefault();
        pathPush([
            ["sort", mappingSort[sort]],
            ["page", "1"],
        ]);
    };

    return { sort, setSort, handleSort };
};

