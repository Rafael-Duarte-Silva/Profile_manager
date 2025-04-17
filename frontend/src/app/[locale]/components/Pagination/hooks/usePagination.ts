import { useTableContext } from "@/app/[locale]/context/table/TableContext";

export const usePagination = () => {
    const { page } = useTableContext();

    const length: number = 7;
    const pageNumber: number = parseInt(page);
    const mid = Math.floor(length / 2);

    const calculateValue = (index: number): string =>
        (pageNumber <= mid ? index + 1 : index - mid + pageNumber).toString();

    const classNameIsValid = (value: string): string =>
        value === page ? " is-valid" : "";

    return { length, calculateValue, classNameIsValid };
};

