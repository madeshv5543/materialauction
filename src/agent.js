import superagentPromise from 'superagent-promise'
import _superagent from 'superagent'

const superagent = superagentPromise(_superagent, Promise)

const API_ROOT = 'http://localhost:8080/api'

const encode = encodeURIComponent;
const responseBody = res => res.body;
let token = null
const tokenPlugin  = req => {
  if(token)
    req.set('x-access-token', token);
}

const requests = {
  del: url =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: url => 
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody) 
}

const Auth =  {
  current: () => 
    requests.get('/user'),
  login: (email, password) => 
    requests.post('/login', {address:email, password}),
  register: (username, email, password, confirmPassword) => 
    requests.post('/signup', {username, email, password, confirmPassword}),
  save : user =>
    requests.put('/user', user)
}

export default {
  Auth,
  setToken: _token => { token = _token }
}