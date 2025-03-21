import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";

import { usePathname, useRouter } from "@/i18n/routing";
import { UserData } from "@/interface/UserData";
import { useSearchParams } from "next/navigation";

import { useUserData } from "../hooks/useUserData";

type TableContextProps = {
    page: string;
    handlePage(page: string): void;
    data: UserData[] | undefined;
};

export const TableContext = createContext<TableContextProps | undefined>(undefined);

export const TableProvider = ({ children }: { children: ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [page, setPage] = useState<string>(searchParams.get("page") || "");
    const { data, refetch } = useUserData(page);

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);

            return params.toString();
        },
        [searchParams],
    );

    const handlePage = (page: string) => {
        router.push(`${pathname}?${createQueryString("page", page)}`);

        setPage(page);
    };

    useEffect(() => {
        refetch();
    }, [page]);

    useEffect(() => {
        setPage(searchParams.get("page") || "");
    }, [searchParams.get("page")]);

    return <TableContext.Provider value={{ data, page, handlePage }}>{children}</TableContext.Provider>;
};

export const useTableContext = () => {
    const tableContext = useContext(TableContext);

    if (!tableContext) {
        throw new Error("Pagination must be used within a TableProvider");
    }

    return tableContext;
};

