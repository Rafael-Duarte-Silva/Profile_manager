import "./Pagination.scss";

import { useTableContext } from "@/app/[locale]/context/table/TableContext";
import { Link } from "@/i18n/routing";

import { usePagination } from "./hooks/usePagination";

export const Pagination = () => {
    const { handlePage } = useTableContext();
    const { length, calculateValue, classNameIsValid } = usePagination();

    return (
        <ul className="Pagination">
            {new Array(length).fill(0).map((value, index) => {
                value = calculateValue(index);

                return (
                    <li
                        key={value}
                        onClick={() => handlePage(value)}
                        className={`Pagination-item${classNameIsValid(value)}`}
                    >
                        <Link
                            href={`/?page${value}`}
                            className="Pagination-link"
                        >
                            {value.padStart(2, "0")}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};
