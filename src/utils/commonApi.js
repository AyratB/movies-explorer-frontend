export const request = ({ url, endPoint, method, body, requestHeaders, credentials }) => {
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

    const path = typeof endPoint !== "undefined"
        ? `${url}/${endPoint}`
        : `${url}`;

    return fetch(
      path, body ? { ...fetchInit, body } : fetchInit)
      .then((res) => getResponseData(res));
}

const getResponseData = (res) =>  res.ok ? res.json() : Promise.reject(res.status); 