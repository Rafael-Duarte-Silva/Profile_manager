import "./UserModal.scss";

import { Input } from "./components/Input";
import { IconSend } from "@/components/icons/IconSend";
import { Button } from "@/components/ui/Button";
import { Typography } from "@/components/ui/Typography";

import { useUserModalContext } from "../../context/UserModalContext";

export const UserModal = () => {
    const {
        isModalOpen,
        handleIsModalOpen,
        register,
        handleSubmit,
        handleSendUserData,
        isEdit,
    } = useUserModalContext();

    if (!isModalOpen) {
        return;
    }

    return (
        <div className="UserModal-background">
            <div className="UserModal">
                <Typography
                    asChild
                    variant="fourth"
                >
                    <h1>{isEdit ? "Edit a User" : "Create a User"}</h1>
                </Typography>

                <form
                    className="UserModal-form"
                    onSubmit={handleSubmit(handleSendUserData)}
                >
                    <Input
                        {...register("email")}
                        label="Email"
                        id="user-email"
                        autoComplete="email"
                        placeholder="example@fictitious.unreal"
                        type="email"
                    />
                    <Input
                        {...register("login")}
                        label="Login"
                        id="user-login"
                        autoComplete="name"
                        placeholder="@Barry"
                        type="text"
                    />
                    <Input
                        {...register("fullName")}
                        label="Full Name"
                        id="user-fullName"
                        autoComplete="name"
                        placeholder="Barry Allen"
                        type="text"
                    />
                    <Input
                        {...register("password")}
                        label="Password"
                        id="user-password"
                        autoComplete="new-password"
                        placeholder="********"
                        type="password"
                    />
                    <Input
                        {...register("phone")}
                        label="Phone"
                        id="user-phone"
                        autoComplete="tel"
                        placeholder="+55 (11) 29979-2458"
                        type="tel"
                    />
                    <Input
                        {...register("job")}
                        label="Job"
                        id="user-job"
                        placeholder="Runner"
                        type="text"
                    />

                    <div className="UserModal-containerButton">
                        <Button
                            variant="primary"
                            size="maxMd"
                            type="submit"
                        >
                            {isEdit ? "Edit" : "Send"}
                            <IconSend />
                        </Button>
                        <Button
                            variant="primary"
                            size="maxMd"
                            type="button"
                            onClick={() => handleIsModalOpen(false)}
                        >
                            Cancel
                            <IconSend />
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
