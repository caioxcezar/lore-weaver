const useRequest = () => {
  const get = async (url: string, authenticated: boolean = false) =>
    request(url, "GET", undefined, authenticated);

  const post = async (
    url: string,
    body?: string | object,
    authenticated: boolean = false
  ) => request(url, "POST", body, authenticated);

  const put = async (
    url: string,
    body?: string | object,
    authenticated: boolean = false
  ) => request(url, "PUT", body, authenticated);

  const del = async (
    url: string,
    body?: string | object,
    authenticated: boolean = false
  ) => request(url, "DELETE", body, authenticated);

  const request = async (
    url: string,
    method: "POST" | "PUT" | "GET" | "DELETE",
    body?: string | object,
    authenticated: boolean = false,
    headers?: Headers
  ) => {
    const _headers = new Headers();
    _headers.append("Content-Type", "application/json");
    if (headers)
      for (const [name, value] of headers.entries())
        _headers.append(name, value);

    if (authenticated) {
      const token = localStorage.getItem("token");
      if (token) _headers.append("Authorization", "Bearer " + token);
    }

    const raw = buildBody(body);

    const response = await fetch(url, {
      method,
      body: raw,
      headers: _headers,
    });
    return response2Json(response);
  };

  const buildBody = (body?: string | object) => {
    if (body && typeof body === "object") return JSON.stringify(body);
    return body;
  };

  const response2Json = async (response: Response) => {
    const text = await response.text();
    if (!text) return;
    try {
      const json = JSON.parse(text);

      if (!response.ok) throw new Error(json.message || json.title || text);

      return json;
    } catch (_error) {
      const fallback = `Error with status code: ${response.status}`;
      const error = _error as Error;
      if (!error.message.includes("JSON.parse"))
        throw new Error(error.message || fallback);
      if (!response.ok) throw new Error(text || fallback);
    }

    return text;
  };

  return { get, post, put, del };
};
export default useRequest;
