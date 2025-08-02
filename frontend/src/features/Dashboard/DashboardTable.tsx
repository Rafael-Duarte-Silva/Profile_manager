"use client";

import "./DashboardTable.scss";

import { memo, useEffect } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";

import { IconDelete } from "@/components/icons/IconDelete";
import { IconEdit } from "@/components/icons/IconEdit";
import { TableCell, TableLabel } from "@/components/prefabs/Table";
import { Checkbox } from "@/components/ui/Checkbox";
import { Typography } from "@/components/ui/Typography";

import {
    DashboardCellButtonProps,
    DashboardCellProps,
    DashboardCellUserProps,
} from "./types";
import { IsChecked } from "@/types/IsCheckedType";

import { useTableContext } from "./context/table/TableContext";
import { useUserModalContext } from "./context/userModal/UserModalContext";
import { DashboardSort } from "./DashboardSort";
import { deleteUser } from "./DashboardTableAPI";

export const DashboardTable = () => {
    const t = useTranslations("HomePage");

    const { data, isChecked, initializeIsChecked } = useTableContext();

    const classNameIsChecked = (index: number): string =>
        isChecked[index] ? (isChecked[index].checked ? " is-checked" : "") : "";

    const locale = useLocale();
    const formatDateToShort = (isoDateStr: string): string => {
        const date = new Date(isoDateStr);
        return date.toLocaleDateString(locale, {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
        });
    };

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
                            <TableLabel>{t("status")}</TableLabel>
                            <TableLabel>{t("email")}</TableLabel>
                            <TableLabel>{t("phone")}</TableLabel>
                            <TableLabel>{t("job")}</TableLabel>
                            <TableLabel>{t("dateCreated")}</TableLabel>
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
                                <DashboardCell
                                    label="status"
                                    text={userData.status}
                                />
                                <DashboardCell
                                    label="email"
                                    text={userData.email}
                                />
                                <DashboardCell
                                    label="phone"
                                    text={userData.phone}
                                />
                                <DashboardCell
                                    label="job"
                                    text={userData.job}
                                />
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

const DashboardCell = memo(function DashboardCell({
    label = "",
    text = "",
}: DashboardCellProps) {
    const t = useTranslations("HomePage");

    return (
        <TableCell>
            <>
                <Typography
                    asChild
                    colors="Medium"
                    className="DashboardTable-label"
                >
                    <span>{t(label)}</span>
                </Typography>
                {text}
            </>
        </TableCell>
    );
});

const DashboardCellButton = ({ userData, index }: DashboardCellButtonProps) => {
    const t = useTranslations("HomePage");
    const { handleUserEdit } = useUserModalContext();
    const { isChecked } = useTableContext();

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: deleteUser,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["users"],
            });
        },
        onError: (error) => {
            console.error("Error delete user:", error);
        },
    });

    const handleUserDelete = (position: number, isChecked: IsChecked[]) => {
        const ids: string[] = isChecked
            .filter((value, i) => value.checked || position === i)
            .map((value) => value.id);

        mutate(ids);
    };

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

const DashboardLabelUser = () => {
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

const DashboardCellUser = ({
    userData: { fullName, username },
    index,
}: DashboardCellUserProps) => {
    const { handleIsChecked, isChecked } = useTableContext();

    const inputIsChecked = (index: number): boolean =>
        isChecked[index] ? isChecked[index].checked : false;

    const fullNameInitials = (fullName: string | undefined): string => {
        return fullName
            ? fullName
                  .split(" ")
                  .map((word) => word.charAt(0).toLowerCase())
                  .join("")
            : "";
    };

    return (
        <TableCell variant="user">
            <div className="DashboardTable-cell-wrap">
                <div className="DashboardTable-avatar">
                    {fullNameInitials(fullName)}
                </div>

                <div className="DashboardTable-cell-body">
                    <Typography
                        asChild
                        variant="primary"
                    >
                        <div className="DashboardTable-name">{fullName}</div>
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
