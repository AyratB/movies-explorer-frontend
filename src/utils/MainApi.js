import { BASE_MAIN_URL, BASE_MOVIES_IMAGE_URL } from "./constants";
import { request } from "./../utils/commonApi";

// ====================== AUTH ================================
export const register = async (userEmail, userPassword, userName) => {
    return await request({
      url: BASE_MAIN_URL,
      endPoint: "signup",
      method: "POST",
      body: JSON.stringify({
        email: userEmail,
        password: userPassword,
        name: userName,
      })
    });
};

export const authorize = async (identifier, password) => {
    return await request({
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

export const getUserInfo = async (token) => {
    return await request({
      url: BASE_MAIN_URL,
      endPoint: "users/me",
      method: "GET",
      requestHeaders: {
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    });
};
// ====================== AUTH ================================


// ====================== Работа с данными пользователя =======
export const updateUserData = async (userEmail, userName, token) => {
    return await request({
      url: BASE_MAIN_URL,
      endPoint: "users/me",
      method: "PATCH",
      body: JSON.stringify({
        email: userEmail,
        name: userName,
      }),
      requestHeaders: {
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    });
};
// ====================== Работа с данными пользователя =======


// ====================== Работа с фильмами ===================
export const saveMovie = async (movieData, token) => {

  return await request({
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
    requestHeaders: {
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  });
};

export const getMovies = async (token) => {
  return await request({
    url: BASE_MAIN_URL,
    endPoint: "movies",
    method: "GET",    
    credentials: 'include',    
    requestHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteMovies = async (movieId, token) => {
  return await request({
    url: BASE_MAIN_URL,
    endPoint: `movies/${movieId}`,
    method: "DELETE",
    requestHeaders: {
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include'
  });
};
// ====================== Работа с фильмами ===================