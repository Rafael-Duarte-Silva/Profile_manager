"use client";

import "./Table.scss";

import { useEffect } from "react";

import { useTableContext } from "@/app/[locale]/context/TableContext";
import { useTranslations } from "next-intl";

import { IconCheckbox } from "@/components/icons/IconCheckbox";
import { IconDelete } from "@/components/icons/IconDelete";
import { IconEdit } from "@/components/icons/IconEdit";
import { Typography } from "@/components/ui/Typography";

import { useUserDelete } from "./hooks/useUserDelete";
import { useUserEdit } from "./hooks/useUserEdit";

import { fullNameInitials } from "./utils/fullNameInitials";

import { Sort } from "../Sort";

export const Table = () => {
    const { data } = useTableContext();
    const { handleUserEdit } = useUserEdit();
    const { handleUserDelete } = useUserDelete();
    const {
        initializeIsChecked,
        allIsChecked,
        handleAllIsChecked,
        isChecked,
        handleIsChecked,
    } = useTableContext();
    const t = useTranslations("HomePage");

    useEffect(() => {
        if (data) initializeIsChecked(data);
    }, [data]);

    return (
        <div className="Table-wrap">
            <table className="Table">
                <thead className="Table-head">
                    <tr>
                        <Typography
                            asChild
                            colors="DarkMedium"
                            className="Table-head-row Table-head-row--user"
                        >
                            <th>
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
                                    >
                                        <IconCheckbox className="Table-iconProfile" />
                                    </label>
                                </div>
                                {t("user")}
                                <Sort className="Table-sort" />
                            </th>
                        </Typography>
                        <Typography
                            asChild
                            colors="DarkMedium"
                            className="Table-head-row"
                        >
                            <th>{t("status")}</th>
                        </Typography>
                        <Typography
                            asChild
                            colors="DarkMedium"
                            className="Table-head-row"
                        >
                            <th>{t("email")}</th>
                        </Typography>
                        <Typography
                            asChild
                            colors="DarkMedium"
                            className="Table-head-row"
                        >
                            <th>{t("phone")}</th>
                        </Typography>
                        <Typography
                            asChild
                            colors="DarkMedium"
                            className="Table-head-row"
                        >
                            <th>{t("job")}</th>
                        </Typography>
                        <Typography
                            asChild
                            colors="DarkMedium"
                            className="Table-head-row"
                        >
                            <th>{t("date")}</th>
                        </Typography>
                    </tr>
                </thead>
                <tbody className="Table-body">
                    {data ? (
                        data?.map((userData, index) => (
                            <tr
                                className={`Table-row${isChecked[index] ? (isChecked[index].checked ? " is-checked" : "") : ""}`}
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
                                                checked={
                                                    isChecked[index]
                                                        ? isChecked[index]
                                                              .checked
                                                        : false
                                                }
                                                onChange={() =>
                                                    handleIsChecked(index)
                                                }
                                            />
                                            <label
                                                className="Table-profile-label"
                                                htmlFor={`profileInput${index}`}
                                            >
                                                <IconCheckbox className="Table-iconProfile" />
                                            </label>
                                        </div>
                                    </td>
                                </Typography>
                                <Typography asChild>
                                    <td className="Table-cell">
                                        <Typography
                                            asChild
                                            colors="Medium"
                                            className="Table-label"
                                        >
                                            <span>{t("status")}</span>
                                        </Typography>
                                        {userData.status}
                                    </td>
                                </Typography>
                                <Typography asChild>
                                    <td className="Table-cell">
                                        <Typography
                                            asChild
                                            colors="Medium"
                                            className="Table-label"
                                        >
                                            <span>{t("email")}</span>
                                        </Typography>
                                        {userData.email}
                                    </td>
                                </Typography>
                                <Typography asChild>
                                    <td className="Table-cell">
                                        <Typography
                                            asChild
                                            colors="Medium"
                                            className="Table-label"
                                        >
                                            <span>{t("phone")}</span>
                                        </Typography>
                                        {userData.phone}
                                    </td>
                                </Typography>
                                <Typography asChild>
                                    <td className="Table-cell">
                                        <Typography
                                            asChild
                                            colors="Medium"
                                            className="Table-label"
                                        >
                                            <span>{t("job")}</span>
                                        </Typography>
                                        {userData.job}
                                    </td>
                                </Typography>
                                <Typography asChild>
                                    <td className="Table-cell">
                                        <Typography
                                            asChild
                                            colors="Medium"
                                            className="Table-label"
                                        >
                                            <span>{t("date")}</span>
                                        </Typography>
                                        {userData.dateCreated}
                                    </td>
                                </Typography>
                                <Typography asChild>
                                    <td className="Table-cell Table-cell--icons">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleUserEdit(userData)
                                            }
                                        >
                                            <IconEdit />
                                        </button>
                                        <button
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
