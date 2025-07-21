import { useTranslations } from "next-intl";

import { TableLabel } from "@/components/prefabs/Table";
import { Checkbox } from "@/components/ui/Checkbox";
import { Typography } from "@/components/ui/Typography";

import { DashboardSort } from "../common/DashboardSort";
import { useTableContext } from "../context/table/TableContext";

export const DashboardLabelUser = () => {
    const { allIsChecked, handleAllIsChecked } = useTableContext();
    const t = useTranslations("HomePage");

    return (
        <TableLabel variant="user">
            <Checkbox
                index={-1}
                onchange={handleAllIsChecked}
                checked={allIsChecked}
            />
            <Typography
                asChild
                colors="DarkMedium"
            >
                <span>{t("username")}</span>
            </Typography>

            <DashboardSort />
        </TableLabel>
    );
};
