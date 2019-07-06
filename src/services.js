let prefix = '/api'
if (process.env.NODE_ENV !== 'production') {
  prefix = ''
}

export function fakeApi() {
  return new Promise(resolve => setTimeout(resolve, 1000))
}

export function add(name, schema) {
  return fetch(prefix + '/schema', {
    method: 'POST',
    body: JSON.stringify({ name, schema }),
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  }).then(resp => resp.json())
}

export function remove(id) {
  return fetch(prefix + '/schema/' + id, {
    method: 'DELETE'
  }).then(resp => resp.json())
}

export function get(id) {
  return fetch(prefix + '/schema/' + id).then(resp => resp.json())
}

export function getList() {
  return fetch(prefix + '/schema').then(resp => resp.json())
}
