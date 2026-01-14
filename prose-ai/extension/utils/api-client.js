import { getApiEndpoint } from './storage.js';

export async function rewriteText(text, tone) {
  try {
    const apiEndpoint = await getApiEndpoint();
    const url = `${apiEndpoint}/api/rewrite`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, tone })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'API request failed');
    }

    return {
      success: true,
      rewrittenText: data.rewrittenText,
      provider: data.provider
    };
  } catch (error) {
    console.error('API Client Error:', error);
    return {
      success: false,
      error: error.message || 'Failed to rewrite text'
    };
  }
}

export async function checkApiHealth() {
  try {
    const apiEndpoint = await getApiEndpoint();
    const url = `${apiEndpoint}/api/rewrite`;

    const response = await fetch(url, {
      method: 'GET'
    });

    return response.ok;
  } catch (error) {
    console.error('API Health Check Failed:', error);
    return false;
  }
}
