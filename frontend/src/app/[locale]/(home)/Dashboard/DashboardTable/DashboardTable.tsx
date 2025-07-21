"use client";

import "./DashboardTable.scss";

import { useEffect } from "react";

import { UserData } from "@/interfaces/UserData";
import { useTranslations } from "next-intl";

import { TableLabel } from "@/components/prefabs/Table";

import { useTable } from "./hooks/useTable";

import { userList } from "../contants/userList";
import { useTableContext } from "../context/table/TableContext";
import { DashboardCell } from "./DashboardCell";
import { DashboardCellButton } from "./DashboardCellButton";
import { DashboardCellUser } from "./DashboardCellUser";
import { DashboardLabelUser } from "./DashboardLabelUser";

export const DashboardTable = () => {
    const { data } = useTableContext();
    const { initializeIsChecked } = useTableContext();
    const { classNameIsChecked, formatDateToShort } = useTable();

    const t = useTranslations("HomePage");

    useEffect(() => {
        if (data) initializeIsChecked(data);
    }, [data]);

    return (
        <div className="DashboardTable-wrap">
            {data ? (
                <table className="DashboardTable">
                    <thead className="DashboardTable-head">
                        <tr>
                            <DashboardLabelUser />
                            {userList.map((value) => (
                                <TableLabel key={value}>{t(value)}</TableLabel>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="DashboardTable-body">
                        {data.map((userData, index) => (
                            <tr
                                className={`DashboardTable-row${classNameIsChecked(index)}`}
                                key={index}
                            >
                                <DashboardCellUser
                                    index={index}
                                    userData={userData}
                                />
                                {userList
                                    .slice(0, userList.length - 1)
                                    .map((value) => (
                                        <DashboardCell
                                            key={value}
                                            label={value}
                                            text={
                                                userData[
                                                    value as keyof UserData
                                                ]
                                            }
                                        />
                                    ))}
                                <DashboardCell
                                    label="dateCreated"
                                    text={formatDateToShort(
                                        userData.dateCreated,
                                    )}
                                />
                                <DashboardCellButton
                                    index={index}
                                    userData={userData}
                                />
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>Not found</div>
            )}
        </div>
    );
};
