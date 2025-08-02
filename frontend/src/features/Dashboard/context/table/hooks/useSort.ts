import { useUserFilters } from "./useUserFilters";

export const useSort = (searchParams: URLSearchParams) => {
    const { pathPush } = useUserFilters();

    const sort = searchParams.get("sort") || "dateCreated";

    const handleSort = (
        e: React.MouseEvent<HTMLAnchorElement>,
        sort: string,
    ) => {
        e.preventDefault();
        pathPush([
            ["sort", sort],
            ["page", "1"],
        ]);
    };

    return { sort, handleSort };
};

