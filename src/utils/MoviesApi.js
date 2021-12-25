import { BASE_MOVIES_URL } from "./constants";
import { request } from "./../utils/commonApi";

export const getFilms = () => {
    return request({
      url: BASE_MOVIES_URL,
      method: "GET"
    });
};