"use client";

import "./Table.scss";

import { useEffect } from "react";

import { useTableContext } from "@/app/[locale]/context/table/TableContext";
import { useTranslations } from "next-intl";

import { Cell } from "./components/Cell";
import { Label } from "./components/Label";
import { IconCheckbox } from "@/components/icons/IconCheckbox";
import { IconDelete } from "@/components/icons/IconDelete";
import { IconEdit } from "@/components/icons/IconEdit";
import { Typography } from "@/components/ui/Typography";

import { useAccessibilityKeyboard } from "../../hooks/useAccessibilityKeyboard";
import { useTable } from "./hooks/useTable";
import { useUserDelete } from "./hooks/useUserDelete";

import { fullNameInitials } from "./utils/fullNameInitials";

import { useUserModalContext } from "../../context/userModal/UserModalContext";
import { Sort } from "../Sort";

export const Table = () => {
    const { data } = useTableContext();
    const { handleUserDelete } = useUserDelete();
    const {
        initializeIsChecked,
        allIsChecked,
        handleAllIsChecked,
        isChecked,
        handleIsChecked,
    } = useTableContext();
    const { handleUserEdit } = useUserModalContext();
    const { classNameIsChecked, inputIsChecked, formatDateToShort } =
        useTable();
    const { accessibilityKeyDown } = useAccessibilityKeyboard();
    const t = useTranslations("HomePage");

    useEffect(() => {
        if (data) initializeIsChecked(data);
    }, [data]);

    return (
        <div className="Table-wrap">
            <table className="Table">
                <thead className="Table-head">
                    <tr>
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
                                <span>{t("user")}</span>
                            </Typography>

                            <Sort className="Table-sort" />
                        </th>
                        <Label label="status" />
                        <Label label="email" />
                        <Label label="phone" />
                        <Label label="job" />
                        <Label label="date" />
                    </tr>
                </thead>
                <tbody className="Table-body">
                    {data ? (
                        data?.map((userData, index) => (
                            <tr
                                className={`Table-row${classNameIsChecked(index)}`}
                                key={index}
                            >
                                <Typography asChild>
                                    <td className="Table-cell Table-cell--user">
                                        <div className="Table-profile-wrape">
                                            <div className="Table-avatar">
                                                {fullNameInitials(
                                                    userData.fullName,
                                                )}
                                            </div>

                                            <div className="Table-profile-body">
                                                <Typography
                                                    asChild
                                                    variant="primary"
                                                >
                                                    <div className="Table-profile-name">
                                                        {userData.fullName}
                                                    </div>
                                                </Typography>

                                                <Typography
                                                    asChild
                                                    colors="Medium"
                                                >
                                                    <div>{userData.login}</div>
                                                </Typography>
                                            </div>
                                        </div>

                                        <div>
                                            <input
                                                className="Table-profile-input"
                                                id={`profileInput${index}`}
                                                type="checkbox"
                                                checked={inputIsChecked(index)}
                                                onChange={() =>
                                                    handleIsChecked(index)
                                                }
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
                                <Cell
                                    label="status"
                                    text={userData.status}
                                />
                                <Cell
                                    label="email"
                                    text={userData.email}
                                    lowerCase
                                />
                                <Cell
                                    label="phone"
                                    text={userData.phone}
                                />
                                <Cell
                                    label="job"
                                    text={userData.job}
                                />
                                <Cell
                                    label="date"
                                    text={formatDateToShort(
                                        userData.dateCreated,
                                    )}
                                />
                                <Typography asChild>
                                    <td className="Table-cell Table-cell--icons">
                                        <button
                                            title={t("edit")}
                                            type="button"
                                            onClick={() =>
                                                handleUserEdit(true, userData)
                                            }
                                        >
                                            <IconEdit />
                                        </button>
                                        <button
                                            title={t("delete")}
                                            type="button"
                                            onClick={() =>
                                                handleUserDelete(
                                                    index,
                                                    isChecked,
                                                )
                                            }
                                        >
                                            <IconDelete />
                                        </button>
                                    </td>
                                </Typography>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td>Not found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
