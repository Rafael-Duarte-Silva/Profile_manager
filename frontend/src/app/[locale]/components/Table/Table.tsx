"use client";

import "./Table.scss";

import { useEffect } from "react";

import { useTableContext } from "@/app/[locale]/context/TableContext";
import { useTranslations } from "next-intl";

import { IconCheckbox } from "@/components/icons/IconCheckbox";
import { IconDelete } from "@/components/icons/IconDelete";
import { IconEdit } from "@/components/icons/IconEdit";
import { Typography } from "@/components/ui/Typography";

import { useTable } from "./hooks/useTable";
import { useUserDelete } from "./hooks/useUserDelete";
import { useUserEdit } from "./hooks/useUserEdit";

import { fullNameInitials } from "./utils/fullNameInitials";

export const Table = () => {
    const { data } = useTableContext();
    const { handleEdit } = useUserEdit();
    const { mutate } = useUserDelete();
    const { initializeIsChecked, allIsChecked, handleAllIsChecked, isChecked, handleIsChecked } = useTable();
    const t = useTranslations("HomePage");

    useEffect(() => {
        if (data?.length) initializeIsChecked(data?.length);
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
                    {data?.map((userData, index) => (
                        <tr
                            className="Table-row"
                            key={index}
                        >
                            <Typography asChild>
                                <td className="Table-cell Table-cell--user">
                                    <div className="Table-profile-wrape">
                                        <div className="Table-avatar">{fullNameInitials(userData.fullName)}</div>

                                        <div className="Table-profile-body">
                                            <Typography
                                                asChild
                                                variant="primary"
                                            >
                                                <div className="Table-profile-name">{userData.fullName}</div>
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
                                            checked={isChecked[index] ?? false}
                                            onChange={() => handleIsChecked(index)}
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
                                        onClick={() => handleEdit(userData)}
                                    >
                                        <IconEdit />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => mutate(userData.id)}
                                    >
                                        <IconDelete />
                                    </button>
                                </td>
                            </Typography>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

