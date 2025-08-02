import "./DashboardSort.scss";

import { memo } from "react";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

import { IconSort } from "@/components/icons/IconSort";
import { Typography } from "@/components/ui/Typography";

import { useTableContext } from "./context/table/TableContext";
import { DashboardDropdown } from "./DashboardDropdown";

export const DashboardSort = memo(function DashboardSort() {
    const { sort, handleSort } = useTableContext();

    const t = useTranslations("HomePage");

    return (
        <DashboardDropdown.Root variant="primary">
            <DashboardDropdown.Trigger className="Sort-summary">
                <Typography colors="DarkMedium">{t(sort)}</Typography>
                <IconSort />
            </DashboardDropdown.Trigger>
            <DashboardDropdown.Content>
                {[
                    "username",
                    "status",
                    "email",
                    "phone",
                    "job",
                    "dateCreated",
                ].map((value, index) => (
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
});

