import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react";

import { useRouter } from "@/i18n/routing";
import { UserData } from "@/interface/UserData";
import { useSearchParams } from "next/navigation";

import { useUserSearch } from "../components/SearchBar/hooks/useUserSearch";

import { IsChecked, useTable } from "../hooks/useTable";
import { useUserData } from "../hooks/useUserData";

type QueryParam = {
    value: string;
    isEnable: boolean;
};

type TableContextProps = {
    initializeIsChecked: (data: UserData[]) => void;
    allIsChecked: boolean;
    handleAllIsChecked: () => void;
    isChecked: IsChecked[];
    handleIsChecked: (position: number) => void;
    page: string;
    sort: string;
    handleSort(e: React.MouseEvent<HTMLAnchorElement>, sort: string): void;
    handlePage(page: string): void;
    data: UserData[] | undefined;
    search: QueryParam;
    handleSarchKeyboard(event: React.KeyboardEvent): void;
    handleSearch(): void;
    setSearch: Dispatch<SetStateAction<QueryParam>>;
};

export const TableContext = createContext<TableContextProps | undefined>(
    undefined,
);

export const TableProvider = ({ children }: { children: ReactNode }) => {
    const router = useRouter();
    const searchParams = new URLSearchParams(useSearchParams().toString());

    const [page, setPage] = useState<QueryParam>({
        value: searchParams.get("page") || "",
        isEnable: false,
    });
    const [sort, setSort] = useState<QueryParam>({
        value: searchParams.get("sort") || "dateCreated",
        isEnable: false,
    });
    const { data, refetch: refetchPage } = useUserData(
        page.value,
        sort.value,
        !searchParams.has("search"),
    );

    const [search, setSearch] = useState<QueryParam>({
        value: searchParams.get("search") || "",
        isEnable: false,
    });
    const { refetch: refetchSearch } = useUserSearch(
        search.value,
        page.value,
        searchParams.has("search"),
    );

    const mappingSort: { [key: string]: string } = {
        user: "login",
        status: "status",
        email: "email",
        phone: "phone",
        job: "job",
        date: "dateCreated",
    };

    const handleSort = (
        e: React.MouseEvent<HTMLAnchorElement>,
        sort: string,
    ) => {
        e.preventDefault();

        router.push(
            `/?${searchParams.get("search") ? `search=${search.value}&` : ""}sort=${mappingSort[sort]}&page=1`,
        );
    };

    const handlePage = (page: string) => {
        router.push(
            `/?${searchParams.get("search") ? `search=${search.value}&` : ""}sort=${sort.value}&page=${page}`,
        );
    };

    const handleSarchKeyboard = (event: React.KeyboardEvent) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    const handleSearch = () => {
        if (search.value && search.value !== searchParams.get("search")) {
            router.push(`/?search=${search.value}&sort=${sort.value}&page=1`);
        }
    };

    useEffect(() => {
        const searchParam = searchParams.get("search") || "";
        const sortParam = searchParams.get("sort") || "";
        const pageParam = searchParams.get("page") || "";

        if (searchParams.has("search")) {
            setSearch({ value: searchParam, isEnable: true });
            setPage({ ...page, value: pageParam });
        } else if (pageParam && sortParam) {
            setSort({ value: sortParam, isEnable: true });
            setPage({ value: pageParam, isEnable: true });
        }
    }, [searchParams.toString()]);

    useEffect(() => {
        if (page.isEnable || search.isEnable || sort.isEnable) {
            if (page.isEnable || sort.isEnable) {
                refetchPage();
            } else {
                refetchSearch();
            }
            setPage({ ...page, isEnable: false });
            setSort({ ...sort, isEnable: false });
            setSearch({ ...search, isEnable: false });
        }
    }, [page.isEnable, search.isEnable, sort.isEnable]);

    const table = useTable();

    return (
        <TableContext.Provider
            value={{
                ...table,
                data,
                page: page.value,
                sort: sort.value,
                handleSort,
                handlePage,
                handleSarchKeyboard,
                handleSearch,
                search,
                setSearch,
            }}
        >
            {children}
        </TableContext.Provider>
    );
};

export const useTableContext = () => {
    const tableContext = useContext(TableContext);

    if (!tableContext) {
        throw new Error("Pagination must be used within a TableProvider");
    }

    return tableContext;
};
