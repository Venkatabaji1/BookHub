const tokenKey = "bookhub_token";

export function getToken(): string | null {
  return window.localStorage.getItem(tokenKey);
}

export function setToken(token: string): void {
  window.localStorage.setItem(tokenKey, token);
}