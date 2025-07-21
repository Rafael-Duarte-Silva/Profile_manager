import "./DashboardPagination.scss";

import { Link } from "@/i18n/routing";

import { usePagination } from "./hooks/usePagination";

import { useTableContext } from "../context/table/TableContext";

export const DashboardPagination = () => {
    const { handlePage } = useTableContext();
    const { length, calculatePageValue, classNameIsValid, formatToTwoDigits } =
        usePagination();

    return (
        <ol className="DashboardPagination">
            {new Array(length).fill(0).map((page, index) => {
                page = calculatePageValue(index);

                return (
                    <li
                        key={page}
                        onClick={() => handlePage(page)}
                        className={`DashboardPagination-item${classNameIsValid(page)}`}
                    >
                        <Link
                            href={`/?page${page}`}
                            className="DashboardPagination-link"
                        >
                            {formatToTwoDigits(page)}
                        </Link>
                    </li>
                );
            })}
        </ol>
    );
};
