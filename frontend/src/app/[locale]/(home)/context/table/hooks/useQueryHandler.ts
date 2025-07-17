import { useCallback } from "react";

import { usePathname } from "@/i18n/routing";
import { useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";

export const useQueryHandler = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const createQueryString = useCallback(
        (queryList: string[][]) => {
            const params = new URLSearchParams(searchParams.toString());

            queryList.forEach((query) => {
                const name: string = query[0];
                const value: string = query[1];

                return value ? params.set(name, value) : params.delete(name);
            });

            return params.toString();
        },
        [searchParams],
    );

    const pathPush = (queryList: string[][]): void => {
        router.push(`${pathname}?${createQueryString(queryList)}`);
    };

    return { pathPush };
};
