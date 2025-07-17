export function setCookie(
    cookieName: string,
    cookieValue: string,
    expirateSeconds: number,
): void {
    const currentDate = new Date();
    currentDate.setTime(currentDate.getTime() + expirateSeconds * 1000);
    const expires = "expires=" + currentDate.toUTCString();
    document.cookie = `${cookieName}=${cookieValue};${expires};path=/`;
}
