import "./DashboardCellUser.scss";

import { UserData } from "@/interfaces/UserData";

import { TableCell } from "@/components/prefabs/Table";
import { Checkbox } from "@/components/ui/Checkbox";
import { Typography } from "@/components/ui/Typography";

import { useTable } from "./hooks/useTable";

import { fullNameInitials } from "./utils/fullNameInitials";

import { useTableContext } from "../context/table/TableContext";

type DashboardCellUserProps = {
    userData: Pick<UserData, "fullName" | "username">;
    index: number;
};

export const DashboardCellUser = ({
    userData: { fullName, username },
    index,
}: DashboardCellUserProps) => {
    const { inputIsChecked } = useTable();
    const { handleIsChecked } = useTableContext();

    return (
        <TableCell variant="user">
            <div className="DashboardCellUser-wrape">
                <div className="DashboardCellUser-avatar">
                    {fullNameInitials(fullName)}
                </div>

                <div className="DashboardCellUser-body">
                    <Typography
                        asChild
                        variant="primary"
                    >
                        <div className="DashboardCellUser-name">{fullName}</div>
                    </Typography>

                    <Typography
                        asChild
                        colors="Medium"
                    >
                        <div>{username}</div>
                    </Typography>
                </div>
            </div>

            <Checkbox
                onchange={() => handleIsChecked(index)}
                index={index}
                checked={inputIsChecked(index)}
            />
        </TableCell>
    );
};
