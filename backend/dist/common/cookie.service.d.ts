import { Response } from 'express';
export declare class CookieService {
    setCookie(response: Response, name: string, value: string, options?: Partial<{
        maxAge: number;
        httpOnly: boolean;
        secure: boolean;
        path: string;
        sameSite: boolean | 'lax' | 'strict' | 'none';
    }>): void;
}
