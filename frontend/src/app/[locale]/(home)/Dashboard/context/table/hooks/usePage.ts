import { useUserFilters } from "./useUserFilters";

export const usePage = (searchParams: URLSearchParams) => {
    const { pathPush } = useUserFilters();

    const page = searchParams.get("page") || "1";

    const handlePage = (page: string) => {
        pathPush([["page", page]]);
    };

    return { page, handlePage };
};

