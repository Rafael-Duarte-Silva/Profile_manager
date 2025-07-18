import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

import { routing } from "./i18n/routing";

export const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
    const token = request.cookies.get("jwt")?.value;
    const locale =
        request.nextUrl.pathname.split("/")[1] ||
        request.cookies.get("NEXT_LOCALE")?.value ||
        routing.defaultLocale;

    if (request.nextUrl.pathname.endsWith("/login")) {
        return intlMiddleware(request);
    }

    if (!token) {
        return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    }

    return intlMiddleware(request);
}

export const config = {
    matcher: ["/", "/(pt-BR|en)/:path*"],
};
