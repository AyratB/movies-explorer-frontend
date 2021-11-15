import { BASE_MAIN_URL } from "./constants";
import { request } from "./../utils/commonApi";

// ====================== AUTH ================================
export const register = (userEmail, userPassword, userName) => {
    return request({
      url: BASE_MAIN_URL,
      endPoint: "signup",
      method: "POST",
      body: JSON.stringify({
        email: userEmail,
        password: userPassword,
        name: userName,
      }),
      requestHeaders: {
        Accept: "application/json",
      },
    });
};

export const authorize = (identifier, password) => {
    return request({
      url: BASE_MAIN_URL,
      endPoint: "signin",
      method: "POST",
      body: JSON.stringify({
        email: identifier,
        password: password,
      }),
      credentials: 'include',
    });
};

export const getUserInfo = (token) => {
    return request({
      url: BASE_MAIN_URL,
      endPoint: "users/me",
      method: "GET",
      requestHeaders: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    });
};
// ====================== AUTH ================================

// ====================== Работа с данными пользователя =======
export const updateUserData = (userEmail, userName) => {
    return request({
      url: BASE_MAIN_URL,
      endPoint: "users/me",
      method: "PATCH",
      body: JSON.stringify({
        email: userEmail,
        name: userName,
      }),
      credentials: 'include',
    });
};