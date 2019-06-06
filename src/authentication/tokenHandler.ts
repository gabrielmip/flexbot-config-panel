import axios from 'axios';

export function setDefaultAuthorizationHeader (token: string) {
  axios.defaults.headers.common['Authorization'] = token;
}