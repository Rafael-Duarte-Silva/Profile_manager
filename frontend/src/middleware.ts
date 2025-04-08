import axios from "axios";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

import { routing } from "./i18n/routing";

export const intlMiddleware = createMiddleware(routing);

const fetchData = async (token: string) => {
    return await axios.get(process.env.NEXT_PUBLIC_API_URL + "/auth", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export default async function middleware(request: NextRequest) {
    const token = request.cookies.get("jwt")?.value;

    if (request.nextUrl.pathname.endsWith("/login")) {
        return intlMiddleware(request);
    } else if (!token) {
        return NextResponse.redirect(new URL("/en/login", request.url));
    }

    try {
        const tokenResponse = await fetchData(token);

        if (tokenResponse.status === 200) {
            return intlMiddleware(request);
        }

        throw new Error("invalid token");
    } catch (error: unknown) {
        console.log(error);
        return NextResponse.redirect(new URL("/en/login", request.url));
    }
}

export const config = {
    matcher: ["/", "/(pt-BR|en)/:path*"],
};
