interface Props {
  input: string | URL | globalThis.Request;
  method: string;
  body?: unknown;
}

const _fetch = async ({ input, method, body }: Props) => {
  const response = await fetch(input, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  let json = {};
  if (response.status !== 204) json = response.json();
  if (!response.ok) throw json;
  return json;
};

export const get = async (input: string) => _fetch({ input, method: "GET" });
export const post = async (input: string, body?: unknown) =>
  _fetch({ input, method: "POST", body });
export const put = async (input: string, body?: unknown) =>
  _fetch({ input, method: "PUT", body });
export const del = async (input: string) => _fetch({ input, method: "GET" });
