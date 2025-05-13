export interface CookieOptions {
  path?: string;
  domain?: string;
  expires?: Date;
  "max-age"?: number;
  secure?: boolean;
  samesite?: "Strict" | "Lax" | "None";
  [key: string]: string | number | boolean | Date | undefined;
}

export function setCookie(
  name: string,
  value: string,
  options: CookieOptions = {},
) {
  //옵션 설정
  options = {
    path: "/",
    ...options,
  };

  let cookieString = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (const optionKey in options) {
    const optionValue = options[optionKey];

    if (optionValue === undefined || optionValue === null) {
      continue;
    }

    let finalValue = optionValue;
    if (optionValue instanceof Date) {
      finalValue = optionValue.toUTCString();
    }

    cookieString += `; ${optionKey}`;

    if (finalValue !== true) {
      cookieString += `=${finalValue}`;
    }
  }

  document.cookie = cookieString;
}

export function isCookieExists(name: string) {
  const endodedName = encodeURIComponent(name);
  return document.cookie
    .split("; ")
    .some((cookie) => cookie.startsWith(endodedName + "="));
}

export function deleteCookie(name: string) {
  setCookie(name, "", { "max-age": 0 });
}
