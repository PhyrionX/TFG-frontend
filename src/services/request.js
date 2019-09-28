import axios from 'axios';

let RequestService = function() {
  this.HTTP_ERROR_CODES = {
    UNAUTHORIZED: 401,
    FORBIDDEN: 403
  };

  this.http = axios.create({});
  this.cancelToken = axios.CancelToken;

}

const requestService = new RequestService();

export default requestService;