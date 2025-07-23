import { UserData } from "@/interfaces/UserData";

export type DashboardCellProps = {
    label: string;
    text: string;
    lowerCase?: boolean;
};

export type DashboardCellButtonProps = {
    userData: UserData;
    index: number;
};

export type DashboardCellUserProps = {
    userData: Pick<UserData, "fullName" | "username">;
    index: number;
};

