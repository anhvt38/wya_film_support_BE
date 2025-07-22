export async function apiRequest(url, method = 'GET', data = null, customHeaders = {}) {
  const HOST_API = process.env.HOST_API;

  const baseURL = `${HOST_API}${url}`;

  const headers = {
    ...customHeaders,
  };

  const options = {
    method,
    headers,
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(baseURL, options);

    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');
    const result = isJson ? await response.json() : await response.text();

    if (!response.ok) {
      throw new Error(result.message || `API error: ${response.status}`);
    }

    return result;
  } catch (error) {
    console.error(`[API] Error: ${error.message}`);
    throw error;
  }
}