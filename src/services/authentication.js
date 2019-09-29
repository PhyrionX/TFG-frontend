import requestService from "./request";

export function getAuth() {
  requestService.http.get('http://localhost:8081/api/user')
    .then((({data}) => console.log(data))).catch(err => console.log(err));
}

export function signUp(signUpInfo) {
  return requestService.http.post('http://localhost:8081/api/register', signUpInfo)
}

export function login(loginInfo) {
  return requestService.http.post('http://localhost:8081/api/login', loginInfo)
}
