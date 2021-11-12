import { BASE_MOVIES_URL } from "./constants";
import { request } from "./../utils/commonApi";

export const getFilms = async () => {
    return await request({
      url: BASE_MOVIES_URL,
      method: "GET"
    });
};