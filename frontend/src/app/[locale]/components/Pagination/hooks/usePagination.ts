import { useTableContext } from "@/app/[locale]/context/table/TableContext";

export const usePagination = () => {
    const { page } = useTableContext();

    const length: number = 7;
    const pageNumber: number = parseInt(page);
    const mid = Math.floor(length / 2);

    const calculatePageValue = (index: number): string =>
        (pageNumber <= mid ? ++index : index - mid + pageNumber).toString();

    const classNameIsValid = (value: string): string =>
        value === page ? " is-valid" : "";

    const formatToTwoDigits = (value: string): string => value.padStart(2, "0");

    return { length, calculatePageValue, classNameIsValid, formatToTwoDigits };
};

