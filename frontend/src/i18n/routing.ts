import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
    locales: ["en", "pt-BR"],
    defaultLocale: "en",
});

export const { Link, redirect, usePathname, useRouter } =
    createNavigation(routing);
