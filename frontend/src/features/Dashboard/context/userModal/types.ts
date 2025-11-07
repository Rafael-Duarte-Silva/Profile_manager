import { UserData } from "@/interfaces/UserData";

export type UserModalContextProps = {
    userData: UserData | null;
    isCreateModalOpen: boolean;
    isEditModalOpen: boolean;
    handleIsCreateModalOpen(): void;
    handleIsEditModalOpen(userData?: UserData): void;
};

