import "./Pagination.scss";

import { useTableContext } from "@/app/[locale]/context/table/TableContext";
import { Link } from "@/i18n/routing";

import { usePagination } from "./hooks/usePagination";

export const Pagination = () => {
    const { handlePage } = useTableContext();
    const { length, calculatePageValue, classNameIsValid, formatToTwoDigits } =
        usePagination();

    return (
        <ol className="Pagination">
            {new Array(length).fill(0).map((page, index) => {
                page = calculatePageValue(index);

                return (
                    <li
                        key={page}
                        onClick={() => handlePage(page)}
                        className={`Pagination-item${classNameIsValid(page)}`}
                    >
                        <Link
                            href={`/?page${page}`}
                            className="Pagination-link"
                        >
                            {formatToTwoDigits(page)}
                        </Link>
                    </li>
                );
            })}
        </ol>
    );
};
