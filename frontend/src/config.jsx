const BACKEND_URL = "http://localhost:5000";
const BACKEND_WS_URL = "ws://localhost:5000";

// Authentication-related
const BACKEND_AUTH_AUTHORIZE = "/authorize";
export const BACKEND_AUTH_GITHUB_PROVIDER =
  BACKEND_URL + BACKEND_AUTH_AUTHORIZE + "/github";
export const BACKEND_AUTH_GOOGLE_PROVIDER =
  BACKEND_URL + BACKEND_AUTH_AUTHORIZE + "/google";
export const BACKEND_REFRESH_URL = BACKEND_URL + "/refresh";

// Websocket-related
export const FETCH_IMAGES_DELAY = 1000;
export const FETCH_CONTAINERS_DELAY = 1000;
export const BACKEND_WS_ENDPOINT = BACKEND_WS_URL + "/ws";
