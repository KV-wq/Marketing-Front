const KEY = "forma_post_auth_redirect";

export function setPostAuthRedirect(path) {
  if (typeof window !== "undefined") localStorage.setItem(KEY, path);
}

export function getPostAuthRedirect(fallback = "/account") {
  if (typeof window === "undefined") return fallback;
  return localStorage.getItem(KEY) || fallback;
}

export function clearPostAuthRedirect() {
  if (typeof window !== "undefined") localStorage.removeItem(KEY);
}
