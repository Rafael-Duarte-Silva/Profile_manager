import "./DashboardSort.scss";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

import { IconSort } from "@/components/icons/IconSort";
import { Typography } from "@/components/ui/Typography";

import { userList } from "../contants/userList";
import { useTableContext } from "../context/table/TableContext";
import { DashboardDropdown } from "./DashboardDropdown";

export const DashboardSort = () => {
    const { handleSort, sort } = useTableContext();

    const t = useTranslations("HomePage");

    return (
        <DashboardDropdown.Root variant="primary">
            <DashboardDropdown.Trigger className="Sort-summary">
                <Typography colors="DarkMedium">{t(sort)}</Typography>
                <IconSort />
            </DashboardDropdown.Trigger>
            <DashboardDropdown.Content>
                {["username", ...userList].map((value, index) => (
                    <DashboardDropdown.Item
                        key={index}
                        id={index}
                    >
                        <Link
                            href={`/?sort=${value}&page=1`}
                            locale="en"
                            onClick={(e) => handleSort(e, value)}
                        >
                            {t(value)}
                        </Link>
                    </DashboardDropdown.Item>
                ))}
            </DashboardDropdown.Content>
        </DashboardDropdown.Root>
    );
};

/*<details
            className={`DashboardHeading-details${className ? ` ${className}` : ""}`}
        >
            <summary className="Sort-summary">
                <Typography colors="DarkMedium">{t(sort)}</Typography>
                <IconSort />
            </summary>

            <Button
                asChild
                className="DashboardToggleLanguage-modal"
            >
                <ul>
                    {["username", ...userList].map((value, index) => (
                        <li
                            key={index}
                            className="DashboardToggleLanguage-item"
                        >
                            <Typography
                                className="DashboardToggleLanguage-link"
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
        </details>*/

