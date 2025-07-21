import { UserData } from "@/interfaces/UserData";
import { useTranslations } from "next-intl";

import { IconDelete } from "@/components/icons/IconDelete";
import { IconEdit } from "@/components/icons/IconEdit";
import { TableCell } from "@/components/prefabs/Table";

import { useUserDelete } from "./hooks/useUserDelete";

import { useTableContext } from "../context/table/TableContext";
import { useUserModalContext } from "../context/userModal/UserModalContext";

type DashboardCellButtonProps = {
    userData: UserData;
    index: number;
};

export const DashboardCellButton = ({
    userData,
    index,
}: DashboardCellButtonProps) => {
    const t = useTranslations("HomePage");

    const { handleUserEdit } = useUserModalContext();
    const { handleUserDelete } = useUserDelete();
    const { isChecked } = useTableContext();

    return (
        <TableCell variant="icons">
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
        </TableCell>
    );
};
