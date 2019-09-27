import axios from 'axios';

class RequestService {
  static HTTP_ERROR_CODES = {
    UNAUTHORIZED: 401,
    FORBIDDEN: 403
  };

  constructor() {
    this.http = axios.create({});
    this.cancelToken = axios.CancelToken;

    this.addInterceptors();
  }
}