import axios from 'axios';
import localStorageService from './localStorage';
import store from '../store'

let RequestService = function() {
  this.HTTP_ERROR_CODES = {
    UNAUTHORIZED: 401,
    FORBIDDEN: 403
  };

  this.http = axios.create({});
  this.cancelToken = axios.CancelToken;

  this.http.interceptors.request.use(
    request => {
      request.headers.authorization = localStorageService.getToken();
      
      return request;
    }
  )

  this.http.interceptors.response.use(
    response => response,
    ({ response: {status} }, error) => {
      switch (status) {
        case this.HTTP_ERROR_CODES.UNAUTHORIZED:
        case this.HTTP_ERROR_CODES.FORBIDDEN:
            window.location.assign("#/logout");
          break;
      }
      
      return Promise.reject(error);
    }
  )
}

const requestService = new RequestService();

export default requestService;