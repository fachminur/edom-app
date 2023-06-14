import axios from 'axios';

import { parse, stringify } from 'qs';

export const axiosClient = axios.create({
  baseURL: process.env.BASE_URL_ORI,
  headers: { 
    // 'Access-Control-Allow-Origin' : '*',
    // 'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Content-Type': 'application/json',
    'api-key': '1fbe8b77791849d1189d4ae6e2f65dc03fded0c05348e6664e035b694bd5d45f81e9eee1b84052026c9e96c2a0ebe9a28c250966e1cf31d5a570482ef35b9013',
    // 'Access-Control-Allow-Origin': '*'
    // 'x-apikey': '59a7ad19f5a9fa0808f11931',
  },
  paramSerializer: {
    encode: parse,
    serialize: stringify,
  },
  // withCredentials: true
});
