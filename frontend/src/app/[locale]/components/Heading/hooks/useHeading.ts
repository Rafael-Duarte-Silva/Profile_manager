import { usePathname } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";

export const useHeading = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams().toString();

    const hrefWithoutLocale = () => {
        return `${pathname}${searchParams ? `?${searchParams}` : ""}`;
    };

    return { hrefWithoutLocale };
};

