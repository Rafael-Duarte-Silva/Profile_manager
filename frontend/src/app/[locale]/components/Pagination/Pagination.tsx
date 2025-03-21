import "./Pagination.scss";

import { useTableContext } from "@/app/[locale]/context/TableContext";
import { Link } from "@/i18n/routing";

export const Pagination = () => {
    const { page, handlePage } = useTableContext();

    const length: number = 7;

    return (
        <ul className="Pagination">
            {new Array(length).fill(0).map((value, index) => {
                const pageNumber: number = parseInt(page);
                const mid = Math.floor(length / 2);

                value = (pageNumber <= mid ? index + 1 : index - mid + pageNumber).toString();

                return (
                    <li
                        key={value}
                        onClick={() => handlePage(value)}
                        className={`Pagination-item${value === page ? " is-valid" : ""}`}
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

