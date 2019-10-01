import requestService from "./request";

export function getSuggestions(search) {
  return requestService.http.get('http://localhost:8081/api/twitter/suggestions/' + search);
}

export function getFiendTimeline(search) {
  return requestService.http.get('http://localhost:8081/api/twitter/friend_timeline/' + search);
}
