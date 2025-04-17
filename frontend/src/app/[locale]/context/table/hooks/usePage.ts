import { useState } from "react";

import { useRouter } from "@/i18n/routing";

import { useQueryHandler } from "./useQueryHandler";

export const usePage = (searchParams: URLSearchParams) => {
    const router = useRouter();
    const { createPath } = useQueryHandler();

    const [page, setPage] = useState<string>(searchParams.get("page") || "");

    const handlePage = (page: string) => {
        router.push(createPath([["page", page]]));
    };

    return { page, setPage, handlePage };
};

