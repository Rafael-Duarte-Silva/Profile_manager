import { UserData } from "@/interfaces/UserData";

import { IconCheckbox } from "@/components/icons/IconCheckbox";
import { Typography } from "@/components/ui/Typography";

import { useTable } from "../hooks/useTable";
import { useAccessibilityKeyboard } from "@/hooks/useAccessibilityKeyboard";

import { fullNameInitials } from "../utils/fullNameInitials";

import { useTableContext } from "../../../context/table/TableContext";

type TableCellUserProps = {
    userData: Pick<UserData, "fullName" | "username">;
    index: number;
};

export const TableCellUser = ({
    userData: { fullName, username },
    index,
}: TableCellUserProps) => {
    const { inputIsChecked } = useTable();
    const { accessibilityKeyDown } = useAccessibilityKeyboard();
    const { handleIsChecked } = useTableContext();

    return (
        <Typography asChild>
            <td className="Table-cell Table-cell--user">
                <div className="Table-profile-wrape">
                    <div className="Table-avatar">
                        {fullNameInitials(fullName)}
                    </div>

                    <div className="Table-profile-body">
                        <Typography
                            asChild
                            variant="primary"
                        >
                            <div className="Table-profile-name">{fullName}</div>
                        </Typography>

                        <Typography
                            asChild
                            colors="Medium"
                        >
                            <div>{username}</div>
                        </Typography>
                    </div>
                </div>

                <div>
                    <input
                        className="Table-profile-input"
                        id={`profileInput${index}`}
                        type="checkbox"
                        checked={inputIsChecked(index)}
                        onChange={() => handleIsChecked(index)}
                    />
                    <label
                        className="Table-profile-label"
                        htmlFor={`profileInput${index}`}
                        tabIndex={0}
                        onKeyDown={accessibilityKeyDown}
                    >
                        <IconCheckbox className="Table-iconProfile" />
                    </label>
                </div>
            </td>
        </Typography>
    );
};
