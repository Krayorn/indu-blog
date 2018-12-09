const baseURL = process.env.NODE_ENV === 'production' ? process.env.baseURL : 'http://localhost:' + (process.env.PORT || 3001)

export async function getJsonResponse (response) {
    const json = await response.json()
    if (response.ok){
      return json
    } else {
      throw json
    }
}

export async function restGet (uri, headers = {}) {
  const authorizationHeaders = {}

  return fetch(`${baseURL}/api${uri}`, {
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

  return fetch(`${baseURL}/api${uri}`, {
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

  return fetch(`${baseURL}/api${uri}`, {
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

  return fetch(`${baseURL}/api${uri}`, {
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

export async function restPatch (uri, body, headers = {}) {
  const authorizationHeaders = {}

  return fetch(`${baseURL}/api${uri}`, {
    method: 'PATCH',
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

