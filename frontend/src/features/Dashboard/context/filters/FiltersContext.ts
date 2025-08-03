import { createContext, useContext } from "react";

import { FiltersContextProps } from "./types";

export const FiltersContext = createContext<FiltersContextProps | undefined>(
    undefined,
);

export const useFiltersContext = () => {
    const filtersContext = useContext(FiltersContext);

    if (!filtersContext) {
        throw new Error("Pagination must be used within a FiltersProvider");
    }

    return filtersContext;
};
