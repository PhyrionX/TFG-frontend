import axios from 'axios';

let LocalStorageService = function() {
  this.setAuth = function(token, user, email) {
    localStorage.setItem('tfg-access-token', token);
    localStorage.setItem('tfg-user', user);
    localStorage.setItem('tfg-email', email);
  }

  this.deleteAuth = function() {
    localStorage.removeItem('tfg-access-token');
    localStorage.removeItem('tfg-user');
    localStorage.removeItem('tfg-email');
  }

  this.getToken = function() {
    return localStorage.getItem('tfg-access-token')
  }
  
  this.getAuth = function() {
    return { 
      token: localStorage.getItem('tfg-access-token'),
      user: localStorage.getItem('tfg-user'),
      email: localStorage.getItem('tfg-email')
    }
  }
}

const localStorageService = new LocalStorageService();

export default localStorageService;