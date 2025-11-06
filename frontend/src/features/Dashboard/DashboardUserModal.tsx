import "./DashboardUserModal.scss";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { SubmitHandler } from "react-hook-form";

import { UserMutateSchema } from "@/schemas/UserMutateSchema";

import { IconClose } from "@/components/icons/iconClose";
import { IconSend } from "@/components/icons/IconSend";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Typography } from "@/components/ui/Typography";

import { useUserModalContext } from "./context/userModal/UserModalContext";
import { postUserRegister } from "./DashboardUserModalAPI";

export const DashboardUserModal = () => {
    const {
        isEdit,
        isModalOpen,
        handleIsModalOpen,
        handleUserEdit,
        register,
        handleSubmit,
    } = useUserModalContext();
    const t = useTranslations("HomePage");

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: postUserRegister,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["users"],
            });
        },
    });

    const handleSendUserData: SubmitHandler<UserMutateSchema> = (data) => {
        console.log(data);
        mutate(data);
        handleIsModalOpen();
    };

    if (!isModalOpen) {
        return;
    }

    return (
        <div className="DashboardUserModal-wrap">
            <div className="DashboardUserModal">
                <Typography
                    asChild
                    variant="fourth"
                    text="upperCase"
                >
                    <h1>{isEdit ? t("editUser") : t("createUser")}</h1>
                </Typography>

                <form
                    className="DashboardUserModal-form"
                    onSubmit={handleSubmit(handleSendUserData)}
                >
                    <Input
                        {...register("email")}
                        label={t("email")}
                        id="user-email"
                        autoComplete="email"
                        placeholder="example@fictitious.unreal"
                        type="email"
                    />
                    <Input
                        {...register("username")}
                        label={t("username")}
                        id="user-username"
                        autoComplete="username"
                        placeholder="@barry"
                        type="text"
                    />
                    <Input
                        {...register("fullName")}
                        label={t("fullName")}
                        id="user-fullName"
                        autoComplete="name"
                        placeholder="barry Allen"
                        type="text"
                    />
                    <Input
                        {...register("password")}
                        label={t("password")}
                        id="user-password"
                        autoComplete="new-password"
                        placeholder="********"
                        type="password"
                    />
                    <Input
                        {...register("phone")}
                        label={t("phone")}
                        id="user-phone"
                        autoComplete="tel"
                        placeholder="+55 (11) 29979-2458"
                        type="tel"
                    />
                    <Input
                        {...register("job")}
                        label={t("job")}
                        id="user-job"
                        placeholder="runner"
                        type="text"
                    />

                    <div className="DashboardUserModal-containerButton">
                        <Button
                            variant="primary"
                            size="md"
                            type="submit"
                        >
                            {isEdit ? t("edit") : t("send")}
                            <IconSend />
                        </Button>
                        <Button
                            variant="primary"
                            size="md"
                            type="button"
                            onClick={
                                isEdit
                                    ? () => handleUserEdit(false)
                                    : handleIsModalOpen
                            }
                        >
                            {t("close")}
                            <IconClose />
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
