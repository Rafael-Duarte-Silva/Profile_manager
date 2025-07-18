import { UserData } from "@/interfaces/UserData";
import { useTranslations } from "next-intl";

import { IconDelete } from "@/components/icons/IconDelete";
import { IconEdit } from "@/components/icons/IconEdit";
import { Typography } from "@/components/ui/Typography";

import { useUserDelete } from "../hooks/useUserDelete";

import { useTableContext } from "../../../context/table/TableContext";
import { useUserModalContext } from "../../../context/userModal/UserModalContext";

type TableCellButtonsProps = {
    userData: UserData;
    index: number;
};

export const TableCellButtons = ({
    userData,
    index,
}: TableCellButtonsProps) => {
    const t = useTranslations("HomePage");

    const { handleUserEdit } = useUserModalContext();
    const { handleUserDelete } = useUserDelete();
    const { isChecked } = useTableContext();

    return (
        <Typography asChild>
            <td className="Table-cell Table-cell--icons">
                <button
                    title={t("edit")}
                    type="button"
                    onClick={() => handleUserEdit(true, userData)}
                >
                    <IconEdit />
                </button>
                <button
                    title={t("delete")}
                    type="button"
                    onClick={() => handleUserDelete(index, isChecked)}
                >
                    <IconDelete />
                </button>
            </td>
        </Typography>
    );
};
