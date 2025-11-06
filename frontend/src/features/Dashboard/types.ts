import { UserData } from "@/interfaces/UserData";

export type DashboardCellProps = {
    label: string;
    text: string;
    upperCase?: boolean;
};

export type DashboardCellButtonProps = {
    userData: UserData;
    id: string;
};

export type DashboardCellUserProps = {
    userData: Pick<UserData, "fullName" | "username">;
    id: string;
};

