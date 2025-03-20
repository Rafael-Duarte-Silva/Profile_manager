import "./Pagination.scss";

import { useTableContext } from "@/app/[locale]/context/TableContext";

export const Pagination = () => {
    const { page, handlePage } = useTableContext();

    return (
        <ul className="Pagination">
            {["1", "2", "3", "4", "5", "6"].map((value, index) => (
                <li
                    key={index}
                    onClick={() => handlePage(value)}
                    className={`Pagination-item${value === page ? " is-valid" : ""}`}
                >
                    {`0${value}`}
                </li>
            ))}
        </ul>
    );
};

