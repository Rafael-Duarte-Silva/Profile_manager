import { useState } from "react";

import { useQueryHandler } from "./useQueryHandler";

export const usePage = (searchParams: URLSearchParams) => {
    const { pathPush } = useQueryHandler();

    const [page, setPage] = useState<string>(searchParams.get("page") || "1");

    const handlePage = (page: string) => {
        pathPush([["page", page]]);
    };

    return { page, setPage, handlePage };
};

