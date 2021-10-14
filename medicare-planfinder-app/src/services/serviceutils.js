import axios from 'axios';
import qs from 'qs'

const BASE_URL = 'https://healthwealth.wufoo.com/api/v3/';

const AUTH_KEY = 'SUEwTy1ORFdRLUNGMkstVDIyTjpDdzA4MjUwIQ==';
const BASIC_AUTH = 'Basic ' + AUTH_KEY;

const get = (endpoint) => new Promise((resolve, reject) => {
  axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': BASIC_AUTH
    },
  }).get(endpoint)
    .then((response) => {
      return resolve(response);
    }).catch((err) => {
      reject(err);
    });
});

const post = (endpoint, body) => new Promise((resolve, reject) => {
  axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      'Authorization': BASIC_AUTH
    },
  }).post(endpoint, qs.stringify(body))
    .then((response) => {
      return resolve(response);
    }).catch((err) => {
      reject(err);
    });
});

export { get, post }