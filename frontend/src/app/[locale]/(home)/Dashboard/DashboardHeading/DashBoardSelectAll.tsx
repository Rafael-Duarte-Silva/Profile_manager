import "./DashBoardSelectAll.scss";

import { useTranslations } from "next-intl";

import { Checkbox } from "@/components/ui/Checkbox";
import { Typography } from "@/components/ui/Typography";

import { useTableContext } from "../context/table/TableContext";

export const DashBoardSelectAll = () => {
    const { allIsChecked, handleAllIsChecked } = useTableContext();
    const t = useTranslations("HomePage");

    return (
        <div className="DashBoardSelectAll">
            <Checkbox
                index={-1}
                onchange={handleAllIsChecked}
                checked={allIsChecked}
            />
            <Typography colors="DarkMedium">{t("select")}</Typography>
        </div>
    );
};

