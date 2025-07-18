"use client";

import "./Table.scss";

import { useEffect } from "react";

import { useTableContext } from "@/app/[locale]/(home)/context/table/TableContext";
import { userList } from "@/contants/userList";
import { UserData } from "@/interfaces/UserData";

import { TableCell } from "./components/TableCell";
import { TableCellButtons } from "./components/TableCellButtons";
import { TableCellUser } from "./components/TableCellUser";
import { TableLabel } from "./components/TableLabel";
import { TableLabelUser } from "./components/TableLabelUser";

import { useTable } from "./hooks/useTable";

export const Table = () => {
    const { data } = useTableContext();
    const { initializeIsChecked } = useTableContext();
    const { classNameIsChecked, formatDateToShort } = useTable();

    useEffect(() => {
        if (data) initializeIsChecked(data);
    }, [data]);

    return (
        <div className="Table-wrap">
            {data ? (
                <table className="Table">
                    <thead className="Table-head">
                        <tr>
                            <TableLabelUser />
                            {userList.map((value) => (
                                <TableLabel
                                    key={value}
                                    label={value}
                                />
                            ))}
                        </tr>
                    </thead>
                    <tbody className="Table-body">
                        {data.map((userData, index) => (
                            <tr
                                className={`Table-row${classNameIsChecked(index)}`}
                                key={index}
                            >
                                <TableCellUser
                                    index={index}
                                    userData={userData}
                                />
                                {userList
                                    .slice(0, userList.length - 1)
                                    .map((value) => (
                                        <TableCell
                                            key={value}
                                            label={value}
                                            text={
                                                userData[
                                                    value as keyof UserData
                                                ]
                                            }
                                        />
                                    ))}
                                <TableCell
                                    label="dateCreated"
                                    text={formatDateToShort(
                                        userData.dateCreated,
                                    )}
                                />
                                <TableCellButtons
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
