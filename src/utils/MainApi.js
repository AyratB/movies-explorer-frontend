export const BASE_URL = "https://api.aburnashev-movies.nomoredomains.club";

// обращение к нашему api на локальной машине
// export const BASE_URL = "http://localhost:3006";

// ====================== AUTH ================================
async function request({ endPoint, method, body, requestHeaders, credentials }) {
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
  
    const res = await fetch(
        `${BASE_URL}/${endPoint}`,
        body ? { ...fetchInit, body } : fetchInit
    );

    return getResponseData(res);
}

function getResponseData(res) {
    return res.ok ? res.json() : Promise.reject(res.status);
}

export const register = async (userEmail, userPassword, userName) => {
    return await request({
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

export const authorize = async (identifier, password) => {
    debugger;
    return await request({
      endPoint: "signin",
      method: "POST",
      body: JSON.stringify({
        email: identifier,
        password: password,
      }),
      credentials: 'include',
    });
};
// ====================== AUTH ================================

export const getContent = async (token) => {  
    return await request({
      endPoint: "users/me",
      method: "GET",
      requestHeaders: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,      
      },
      credentials: 'include',
    });
};
  
