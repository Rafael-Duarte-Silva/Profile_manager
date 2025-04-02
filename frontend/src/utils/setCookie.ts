export function setCookie(
    cookieName: string,
    cookieValue: string,
    expirateHours: number,
): void {
    const currentDate = new Date();
    currentDate.setTime(currentDate.getTime() + expirateHours * 60 * 60 * 1000);
    const expires = "expires=" + currentDate.toUTCString();
    document.cookie = `${cookieName}=${cookieValue};${expires};path=/`;
}
