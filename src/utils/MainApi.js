// обращение к нашему api

export const BASE_URL = "https://api.aburnashev-movies.nomoredomains.club";

// обращение к нашему api на локальной машине
// export const BASE_URL = "https://api.aburnashev-movies.nomoredomains.club";

// ====================== AUTH ================================

function request({ endPoint, method, body, requestHeaders, credentials }) {
    const fetchInit = {
      method: method,
      headers: Object.assign(
        {
          "Content-Type": "application/json",
        },
        requestHeaders
      ),
      credentials: credentials
    };
  
    return fetch(
      `${BASE_URL}/${endPoint}`,
      body ? { ...fetchInit, body } : fetchInit
    ).then((res) => getResponseData(res));
}

function getResponseData(res) {
    return res.ok ? res.json() : Promise.reject(res.status);
}

// регистрация - email, password и name
export const register = (identifier, password, name) => {
    return request({
      endPoint: "signup",
      method: "POST",
      body: JSON.stringify({
        email: identifier,
        password: password,
        name: name,
      }),
      requestHeaders: {
        Accept: "application/json",
      },
    });
};

// ====================== AUTH ================================


// вход - email, password
export const authorize = (identifier, password) => {   
    return request({
      endPoint: "signin",
      method: "POST",
      body: JSON.stringify({
        email: identifier,
        password: password,
      }),
      credentials: 'include',
    });
};
  

  
export const getContent = (token) => {  
    return request({
      endPoint: "users/me",
      method: "GET",
      requestHeaders: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,      
      },
      credentials: 'include',
    });
};
  
