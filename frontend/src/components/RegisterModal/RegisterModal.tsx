import "./RegisterModal.scss";

import { Button } from "../ui/Button";
import { Typography } from "../ui/Typography";
import { Input } from "./components/Input";

import { useRegisterModal } from "./hooks/useRegisterModal";

type RegisterModalProps = {
    handleModalOpen(): void;
};

export const RegisterModal = ({ handleModalOpen }: RegisterModalProps) => {
    const { register, handleSubmit, errors, handleRegisterModal } = useRegisterModal(handleModalOpen);

    return (
        <div className="RegisterModal-background">
            <div className="RegisterModal">
                <Typography
                    asChild
                    variant="fourth"
                >
                    <h1>Create a User</h1>
                </Typography>

                <form
                    className="RegisterModal-form"
                    onSubmit={handleSubmit(handleRegisterModal)}
                >
                    <Input
                        {...register("email")}
                        label="Email"
                        id="register-email"
                        autoComplete="email"
                        placeholder="example@fictitious.unreal"
                        type="email"
                    />
                    <Input
                        {...register("login")}
                        label="Login"
                        id="register-login"
                        autoComplete="name"
                        placeholder="@Barry"
                        type="text"
                    />
                    <Input
                        {...register("full_name")}
                        label="Full Name"
                        id="register-full_name"
                        autoComplete="name"
                        placeholder="Barry Allen"
                        type="text"
                    />
                    <Input
                        {...register("password")}
                        label="Password"
                        id="register-password"
                        autoComplete="new-password"
                        placeholder="********"
                        type="password"
                    />
                    <Input
                        {...register("phone")}
                        label="Phone"
                        id="register-phone"
                        autoComplete="tel"
                        placeholder="+55 (11) 29979-2458"
                        type="tel"
                    />
                    <Input
                        {...register("job")}
                        label="Job"
                        id="register-job"
                        placeholder="Runner"
                        type="text"
                    />

                    <Button
                        variant="primary"
                        size="maxMd"
                        type="submit"
                    >
                        Send
                    </Button>
                </form>
            </div>
        </div>
    );
};

