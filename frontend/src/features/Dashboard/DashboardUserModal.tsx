import "./DashboardUserModal.scss";

import { useEffect } from "react";

import { UserData } from "@/interfaces/UserData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm, UseFormRegister } from "react-hook-form";

import { userMutateSchema, UserMutateSchema } from "@/schemas/UserMutateSchema";

import { IconClose } from "@/components/icons/iconClose";
import { IconSend } from "@/components/icons/IconSend";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Typography } from "@/components/ui/Typography";

import { useUserModalContext } from "./context/userModal/UserModalContext";
import { postUserRegister, putUserData } from "./DashboardUserModalAPI";

type DashboardUserModalProps = {
    isModalOpen: boolean;
    titleText: string;
    onSubmit(): void;
    submitText: string;
    onClickClose(): void;
    register: UseFormRegister<UserMutateSchema>;
};

export const DashboardUserModal = ({
    isModalOpen,
    onClickClose,
    onSubmit,
    submitText,
    titleText,
    register,
}: DashboardUserModalProps) => {
    const t = useTranslations("HomePage");

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
                    <h1>{titleText}</h1>
                </Typography>

                <form
                    className="DashboardUserModal-form"
                    onSubmit={onSubmit}
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
                            {submitText}
                            <IconSend />
                        </Button>
                        <Button
                            variant="primary"
                            size="md"
                            type="button"
                            onClick={onClickClose}
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

export const DashboardUserModalCreate = () => {
    const { isCreateModalOpen, handleIsCreateModalOpen } =
        useUserModalContext();
    const t = useTranslations("HomePage");
    const queryClient = useQueryClient();

    const { register, handleSubmit } = useForm<UserMutateSchema>({
        resolver: zodResolver(userMutateSchema),
        mode: "onBlur",
    });

    const { mutate } = useMutation({
        mutationFn: postUserRegister,
        retry: 2,
        onSuccess: () => {
            handleIsCreateModalOpen();
            queryClient.invalidateQueries({
                queryKey: ["users"],
            });
        },
    });

    const handleSendUserData: SubmitHandler<UserMutateSchema> = (data) => {
        mutate(data);
    };

    return (
        <DashboardUserModal
            isModalOpen={isCreateModalOpen}
            titleText={t("createUser")}
            submitText={t("send")}
            onClickClose={handleIsCreateModalOpen}
            onSubmit={handleSubmit(handleSendUserData)}
            register={register}
        />
    );
};
export const DashboardUserModalEdit = () => {
    const { userData, isEditModalOpen, handleIsEditModalOpen } =
        useUserModalContext();
    const t = useTranslations("HomePage");
    const queryClient = useQueryClient();

    const { register, handleSubmit, setValue } = useForm<UserMutateSchema>({
        resolver: zodResolver(userMutateSchema),
        mode: "onBlur",
    });

    const handleSendUserData: SubmitHandler<UserMutateSchema> = async (
        data,
    ) => {
        if (!userData) return;

        await putUserData({ ...userData, ...data });
        handleIsEditModalOpen();
        queryClient.invalidateQueries({
            queryKey: ["users"],
        });
    };

    useEffect(() => {
        [
            "username",
            "fullName",
            "email",
            "phone",
            "job",
            "dateCreated",
        ].forEach((key) => {
            setValue(
                key as keyof UserMutateSchema,
                userData ? userData[key as keyof UserData] : "",
            );
        });
    }, [isEditModalOpen]);

    return (
        <DashboardUserModal
            isModalOpen={isEditModalOpen}
            titleText={t("editUser")}
            submitText={t("edit")}
            onClickClose={handleIsEditModalOpen}
            onSubmit={handleSubmit(handleSendUserData)}
            register={register}
        />
    );
};
