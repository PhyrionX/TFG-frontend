import requestService from "./request";

export function getSuggestions(search) {
  return requestService.http.get('http://localhost:8081/api/twitter/suggestions/' + search);
}

export function getFriendTimeline(search) {
  return requestService.http.get('http://localhost:8081/api/twitter/friend_timeline/' + search);
}

export function getSavedSearch(id) {
  return requestService.http.get('http://localhost:8081/api/twitter/saved_search/' + id);
}

export function getSavedTweet(id) {
  return requestService.http.get('http://localhost:8081/api/twitter/saved_tweet/' + id);
}

export function getHistory() {
  return requestService.http.get('http://localhost:8081/api/history');
}
