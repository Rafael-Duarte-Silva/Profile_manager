import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

import { routing } from "./i18n/routing";
import api from "./services/api";

export const intlMiddleware = createMiddleware(routing);

const fetchData = async (token: string) => {
    return await api.get("/auth", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export default async function middleware(request: NextRequest) {
    const token = request.cookies.get("jwt")?.value;
    const locale =
        request.nextUrl.pathname.split("/")[1] ||
        request.cookies.get("NEXT_LOCALE")?.value;

    if (request.nextUrl.pathname.endsWith("/login")) {
        return intlMiddleware(request);
    } else if (!token) {
        return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    }

    try {
        const tokenResponse = await fetchData(token);

        if (tokenResponse.status === 200) {
            return intlMiddleware(request);
        }

        throw new Error("invalid token");
    } catch (error: unknown) {
        console.log(error);
        return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    }
}

export const config = {
    matcher: ["/", "/(pt-BR|en)/:path*"],
};
