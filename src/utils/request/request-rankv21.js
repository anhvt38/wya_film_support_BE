export async function apiRequestRankv21(url, method = 'GET', data = null, customHeaders = {}) {
  const HOST_API_RANKV21 = process.env.HOST_API_RANKV21;

  const baseURL = `${HOST_API_RANKV21}${url}`;

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