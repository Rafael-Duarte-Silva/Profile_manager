import "./DashboardPagination.scss";

import { Link } from "@/i18n/routing";

import { useTableContext } from "./context/table/TableContext";

export const DashboardPagination = () => {
    const { handlePage } = useTableContext();

    const { page } = useTableContext();
    const length: number = 7;
    const mid = Math.floor(length / 2);

    const pageNumber: number = parseInt(page);
    const calculatePageValue = (index: number): string =>
        (pageNumber <= mid ? ++index : index - mid + pageNumber).toString();

    const classNameIsValid = (value: string): string =>
        value === page ? " is-valid" : "";

    const formatToTwoDigits = (value: string): string => value.padStart(2, "0");

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
