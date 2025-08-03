import { createContext, useContext } from "react";

import { TableContextProps } from "./types";

export const TableContext = createContext<TableContextProps | undefined>(
    undefined,
);

export const useTableContext = () => {
    const tableContext = useContext(TableContext);

    if (!tableContext) {
        throw new Error("Data must be used within a FiltersProvider");
    }

    return tableContext;
};
