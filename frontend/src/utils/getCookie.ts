export function getCookie(cookieName: string): string {
  const name = `${cookieName}=`;
  const cookieNameList = document.cookie.split(";");
  for (let i = 0; i < cookieNameList.length; i++) {
    let cookieNameSearch = cookieNameList[i];
    while (cookieNameSearch.charAt(0) == " ") {
      cookieNameSearch = cookieNameSearch.substring(1);
    }
    if (cookieNameSearch.indexOf(name) == 0) {
      return cookieNameSearch.substring(name.length, cookieNameSearch.length);
    }
  }
  return "";
}
