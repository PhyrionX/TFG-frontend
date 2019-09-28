import requestService from "./request";

export function getAuth() {
  console.log('hola');
  requestService.http.get('/')
    .then((({data}) => console.log(data))).catch(err => console.log(err));
}

export function signUp(signUpInfo) {
  return requestService.http.post('http://localhost:8081/api/register', signUpInfo)
}
