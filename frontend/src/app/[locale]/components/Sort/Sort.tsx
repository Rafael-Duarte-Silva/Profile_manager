import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

import { IconSort } from "@/components/icons/IconSort";
import { Button } from "@/components/ui/Button";
import { Typography } from "@/components/ui/Typography";

import { labelList } from "./constants/labelList";
import { mappingLabel } from "./constants/mappingLabel";

import { useTableContext } from "../../context/table/TableContext";

export const Sort = ({ className = "" }: { className?: string }) => {
    const { handleSort, sort } = useTableContext();

    const t = useTranslations("HomePage");

    return (
        <details
            className={`Heading-details${className ? ` ${className}` : ""}`}
        >
            <summary className="Heading-row Heading-row--filter">
                <Typography colors="DarkMedium">
                    {t(mappingLabel[sort])}
                </Typography>
                <IconSort />
            </summary>

            <Button
                asChild
                className="Heading-modal"
            >
                <ul>
                    {labelList.map((value, index) => (
                        <li
                            key={index}
                            className="Heading-item"
                        >
                            <Typography
                                asChild
                                variant="second"
                                colors="DarkMedium"
                            >
                                <Link
                                    href={`/?sort=${value}&page=1`}
                                    locale="en"
                                    onClick={(e) => handleSort(e, value)}
                                >
                                    {t(value)}
                                </Link>
                            </Typography>
                        </li>
                    ))}
                </ul>
            </Button>
        </details>
    );
};

