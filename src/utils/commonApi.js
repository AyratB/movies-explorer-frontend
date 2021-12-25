export const request = async ({ url, endPoint, method, body, requestHeaders, credentials }) => {
    const fetchInit = {
      method: method,
      headers: Object.assign(
        {
          "Content-Type": "application/json",
        },
        requestHeaders
      ),
      mode: 'cors', // 'cors', // no-cors, *cors, same-origin
    };

    const path = typeof endPoint !== "undefined"
        ? `${url}/${endPoint}`
        : `${url}`;

        var fetchResponce = await fetch(path, body ? { ...fetchInit, body } : fetchInit);

        var responce = await getResponseData(fetchResponce);
    
        return responce;      
}

const getResponseData = async (res) =>  res.ok ? await Promise.resolve(res.json()) : await Promise.reject(res.status);