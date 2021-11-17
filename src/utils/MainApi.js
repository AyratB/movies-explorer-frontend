import { BASE_MAIN_URL, BASE_MOVIES_IMAGE_URL } from "./constants";
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
// ====================== Работа с данными пользователя =======


// ====================== Работа с фильмами ===================
export const saveMovie = (movieData) => {
  return request({
    url: BASE_MAIN_URL,
    endPoint: "movies",
    method: "POST",
    body: JSON.stringify({
      country: movieData.country,
      director: movieData.director,
      duration: movieData.duration,
      year: movieData.year,
      description: movieData.description,
      image: `${BASE_MOVIES_IMAGE_URL}${movieData.image.url}`,
      trailer: movieData.trailerLink,
      nameRU: movieData.nameRU,
      nameEN: movieData.nameEN,
      thumbnail:`${BASE_MOVIES_IMAGE_URL}${movieData.image.formats.thumbnail.url}`,
      movieId: movieData.id
    }),
    credentials: 'include',
  });
};
// ====================== Работа с фильмами ===================