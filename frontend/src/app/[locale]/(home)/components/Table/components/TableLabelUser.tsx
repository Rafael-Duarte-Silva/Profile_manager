import { useTranslations } from "next-intl";

import { IconCheckbox } from "@/components/icons/IconCheckbox";
import { Typography } from "@/components/ui/Typography";

import { useAccessibilityKeyboard } from "@/hooks/useAccessibilityKeyboard";

import { useTableContext } from "../../../context/table/TableContext";
import { Sort } from "../../Sort";

export const TableLabelUser = () => {
    const { allIsChecked, handleAllIsChecked } = useTableContext();
    const { accessibilityKeyDown } = useAccessibilityKeyboard();
    const t = useTranslations("HomePage");

    return (
        <th className="Table-head-cell Table-head-cell--user">
            <div>
                <input
                    className="Table-profile-input"
                    id={`profileAllInput`}
                    type="checkbox"
                    checked={allIsChecked}
                    onChange={handleAllIsChecked}
                />
                <label
                    className="Table-profile-label"
                    htmlFor={`profileAllInput`}
                    tabIndex={0}
                    onKeyDown={accessibilityKeyDown}
                >
                    <IconCheckbox className="Table-iconProfile" />
                </label>
            </div>
            <Typography
                asChild
                colors="DarkMedium"
            >
                <span>{t("username")}</span>
            </Typography>

            <Sort className="Table-sort" />
        </th>
    );
};
