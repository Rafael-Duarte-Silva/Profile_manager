import { useState } from "react";

export const useModal = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleIsModalOpen = () => {
        setIsModalOpen(!isModalOpen);
    };

    return { handleIsModalOpen, isModalOpen };
};

