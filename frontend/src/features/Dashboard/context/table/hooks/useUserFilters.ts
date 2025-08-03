import { useCallback } from "react";

import { usePathname } from "@/i18n/routing";
import { useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";

export const useUserFilters = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const setFilters = useCallback(
        (queryList: string[][]) => {
            const params = new URLSearchParams(searchParams.toString());

            queryList.forEach(([name, value]) => {
                return value ? params.set(name, value) : params.delete(name);
            });

            return params.toString();
        },
        [searchParams],
    );

    const pathPush = (queryList: string[][]): void => {
        router.push(`${pathname}?${setFilters(queryList)}`);
    };

    return { pathPush, searchParams };
};

