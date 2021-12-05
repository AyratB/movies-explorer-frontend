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

    let response = await fetch(path, body ? { ...fetchInit, body } : fetchInit);
    let data = await getResponseData(response);

    return data;
}

const getResponseData = async (res) =>  res.ok ? await res.json() : await Promise.reject(res.status);