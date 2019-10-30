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

export function getAnalitycInfo(id) {
  return requestService.http.get('http://localhost:8081/api/twitter/saved_analityc_info/' + id);
}

export function getTweetsByMention(id, mention) {
  return requestService.http.get('http://localhost:8081/api/twitter/getTweetsByMention/' + id + '/' + mention);
}

export function getTweetsByHashtag(id, hashtag) {
  return requestService.http.get('http://localhost:8081/api/twitter/getTweetsByHashtag/' + id + '/' + hashtag);
}

export function getHistory() {
  return requestService.http.get('http://localhost:8081/api/history');
}
