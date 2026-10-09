/**
 * @param {string} path            — '/users' или полный URL
 * @param {object} [options]
 * @param {string} [options.method='GET']
 * @param {object} [options.params]   — query-параметры
 * @param {any}    [options.body]     — объект (уйдёт JSON) или FormData
 * @param {object} [options.headers]
 * @param {number} [options.timeout]  — мс
 * @param {AbortSignal} [options.signal] — внешняя отмена
 */

type ApiRequestOptions = {
  method?: string;
  params?: object;
  body?: object;
};
export async function apiRequest(path: string, { method = 'GET', params, body }: ApiRequestOptions = {}) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const url = new URL(path, apiUrl);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) url.searchParams.append(key, value);
    });
  }

  let response;
  try {
    response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch (err) {
    throw new Error('Ошибка вызова API', { cause: err });
  }

  if (response.status === 204) return null;

  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json')
    ? await response.json().catch(() => null)
    : await response.text();

  if (!response.ok) {
    const message = (data && (data.message || data.error)) || `HTTP ${response.status}`;
    throw new Error(message, { cause: data });
  }

  return data;
}

export const api = {
  get: (path: string, params?: ApiRequestOptions) => apiRequest(path, params),
  post: (path: string, params?: ApiRequestOptions) => apiRequest(path, { ...params, method: 'POST' }),
  delete: (path: string, params?: ApiRequestOptions) => apiRequest(path, { ...params, method: 'DELETE' }),
};
