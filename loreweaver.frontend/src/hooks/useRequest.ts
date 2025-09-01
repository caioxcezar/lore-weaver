const useRequest = () => {
  const get = async <T = any>(url: string) => request<T>(url, "GET");

  const post = async <T = any>(url: string, body?: string | object) =>
    request<T>(url, "POST", body);

  const put = async <T = any>(url: string, body?: string | object) =>
    request<T>(url, "PUT", body);

  const del = async <T = any>(url: string, body?: string | object) =>
    request<T>(url, "DELETE", body);

  const request = async <T>(
    url: string,
    method: "POST" | "PUT" | "GET" | "DELETE",
    body?: string | object
  ) => {
    const response = await fetch(url, {
      method,
      body: buildBody(body),
      headers: { "Content-Type": "application/json" },
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
