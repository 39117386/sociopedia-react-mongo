const normalizeBaseUrl = (value) => value.replace(/\/+$/, "");

export const API_URL = normalizeBaseUrl(
  process.env.REACT_APP_API_URL || "/api"
);
export const BASE_URL = normalizeBaseUrl(
  process.env.REACT_APP_ASSETS_URL || "/assets"
);
export const ASSETS_URL = BASE_URL;

export const getAssetUrl = (path) => {
  if (!path) return "";

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith("/assets/")
    ? path.replace(/^\/assets\//, "")
    : path.replace(/^\/+/, "");

  return `${BASE_URL}/${normalizedPath}`;
};
