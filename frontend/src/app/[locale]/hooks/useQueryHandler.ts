import { useCallback } from "react";

import { usePathname } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";

export const useQueryHandler = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);

            return params.toString();
        },
        [searchParams],
    );

    const createPath = (name: string, value: string) =>
        `${pathname}?${createQueryString(name, value)}`;

    return { createPath, searchParams };
};
