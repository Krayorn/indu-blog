const baseURL = 'http://localhost:' + 3001

export async function getJsonResponse (response) {
    let json
    try {
    json = await response.json()
    if (response.ok) return json
    } catch (error) {
        console.error('Failed to fetch', json) // eslint-disable-line no-console
        return false
    }
}

export async function restGet (uri, headers = {}) {
  const authorizationHeaders = {}

  return fetch(`${baseURL}${uri}`, {
    mode: 'cors',
    headers: {
      ...headers,
      ...authorizationHeaders,
      'content-type': 'application/json'
    }
  })
    .then(getJsonResponse)
}

export async function restPost (uri, body, headers = {}) {
  const authorizationHeaders = {}

  return fetch(`${baseURL}${uri}`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      ...headers,
      ...authorizationHeaders,
      'content-type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  .then(getJsonResponse)
}

export async function restDelete (uri, headers = {}) {
  const authorizationHeaders = {}

  return fetch(`${baseURL}${uri}`, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      ...headers,
      ...authorizationHeaders,
      'content-type': 'application/json'
    },
  })
  .then(getJsonResponse)
}

export async function restPut (uri, body, headers = {}) {
  const authorizationHeaders = {}

  return fetch(`${baseURL}${uri}`, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      ...headers,
      ...authorizationHeaders,
      'content-type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  .then(getJsonResponse)
}

