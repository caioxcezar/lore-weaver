const useRequest = () => {
  const get = async <T = any>(url: string, authenticated: boolean = false) =>
    request<T>(url, "GET", undefined, authenticated);

  const post = async <T = any>(
    url: string,
    body?: string | object,
    authenticated: boolean = false
  ) => request<T>(url, "POST", body, authenticated);

  const put = async <T = any>(
    url: string,
    body?: string | object,
    authenticated: boolean = false
  ) => request<T>(url, "PUT", body, authenticated);

  const del = async <T = any>(
    url: string,
    body?: string | object,
    authenticated: boolean = false
  ) => request<T>(url, "DELETE", body, authenticated);

  const request = async <T>(
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
      const res = localStorage.getItem("token");
      if (res) {
        const token = JSON.parse(res);
        _headers.append("Authorization", token.value);
      }
    }

    const raw = buildBody(body);

    const response = await fetch(url, {
      method,
      body: raw,
      headers: _headers,
    });
    return response2Json<T>(response);
  };

  const buildBody = (body?: string | object) => {
    if (body && typeof body === "object") return JSON.stringify(body);
    return body;
  };

  const response2Json = async <T>(response: Response) => {
    if (response.status === 204) return;
    const text = await response.text();
    try {
      const json = JSON.parse(text);
      if (!response.ok) throw new Error(json.message || json.title || text);
      return json as T;
    } catch (_error) {
      const error = _error as Error;
      if (!error.message.includes("JSON.parse")) throw error;
      throw new Error(text || `Error with status code: ${response.status}`);
    }
  };

  return { get, post, put, del };
};
export default useRequest;
