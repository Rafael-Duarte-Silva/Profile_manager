export const usePage = (
    searchParams: URLSearchParams,
    pathPush: (queryList: string[][]) => void,
) => {
    const page = searchParams.get("page") || "1";

    const handlePage = (page: string) => {
        pathPush([["page", page]]);
    };

    return { page, handlePage };
};

