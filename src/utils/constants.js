const SERVER_IP = "192.168.1.128:3977";

export const ENV = {
  BASE_PATH: `http://${SERVER_IP}`,
  BASE_API: `http://${SERVER_IP}/api/v1`,
  API_ROUTES: {
    REGISTER: "auth/register",
    LOGIN: "auth/login",
    REFRESH_ACCESS_TOKEN: "auth/refresh_access_token",
    USER_ME: "user/me",
    USER: "user",
    USERS: "users",
    MENU: "menu",
    NEWSLETTER: "newsletter",
    EXERCISE: "exercise",
    LIKE: "like",
  },
  JWT: {
    ACCESS: "access",
    REFRESH: "refresh",
  },
};
