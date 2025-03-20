import { getCookie } from "./getCookie";

export function checkCookie(): boolean {
  const user = getCookie("username");
  if (user != "") {
    return true;
  }

  return false;
}
