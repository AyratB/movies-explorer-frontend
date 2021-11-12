export const request = async ({ url, endPoint, method, body, requestHeaders, credentials }) => {
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
  
    const res = await fetch(
        path,
        body ? { ...fetchInit, body } : fetchInit
    );

    return getResponseData(res);
}

function getResponseData(res) {
    return res.ok ? res.json() : Promise.reject(res.status);
}