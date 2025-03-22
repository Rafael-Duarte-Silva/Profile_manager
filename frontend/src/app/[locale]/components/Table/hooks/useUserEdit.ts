import { useUserModalContext } from "@/app/[locale]/context/UserModalContext";
import { UserData } from "@/interface/UserData";

export const useUserEdit = () => {
    const { setValue, handelIsModalOpen } = useUserModalContext();

    const handleUserEdit = (userData: UserData) => {
        handelIsModalOpen(true);

        setValue("email", userData.email);
        setValue("login", userData.login);
        setValue("fullName", userData.fullName);
        setValue("phone", userData.phone);
        setValue("job", userData.job);
    };

    return { handleUserEdit };
};

