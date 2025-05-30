import { useTableContext } from "@/app/[locale]/context/table/TableContext";
import { useTranslations } from "next-intl";

import { IconCheckbox } from "@/components/icons/IconCheckbox";
import { Typography } from "@/components/ui/Typography";

export const SelectAll = () => {
    const { allIsChecked, handleAllIsChecked } = useTableContext();
    const t = useTranslations("HomePage");

    return (
        <div className="Heading-row Heading-row--selectAll">
            <div>
                <input
                    className="Table-profile-input"
                    id="profileInputAll"
                    type="checkbox"
                    checked={allIsChecked}
                    onChange={handleAllIsChecked}
                />
                <label
                    className="Table-profile-label"
                    htmlFor="profileInputAll"
                >
                    <IconCheckbox className="Table-iconProfile" />
                </label>
            </div>
            <Typography colors="DarkMedium">{t("select")}</Typography>
        </div>
    );
};

