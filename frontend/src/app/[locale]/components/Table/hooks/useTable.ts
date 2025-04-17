import { useTableContext } from "@/app/[locale]/context/table/TableContext";
import { useLocale } from "next-intl";

export const useTable = () => {
    const { isChecked } = useTableContext();
    const locale = useLocale();

    const classNameIsChecked = (index: number): string =>
        isChecked[index] ? (isChecked[index].checked ? " is-checked" : "") : "";

    const inputIsChecked = (index: number): boolean =>
        isChecked[index] ? isChecked[index].checked : false;

    const formatDateToShort = (isoDateStr: string): string => {
        const date = new Date(isoDateStr);
        return date.toLocaleDateString(locale, {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
        });
    };

    return { classNameIsChecked, inputIsChecked, formatDateToShort };
};

