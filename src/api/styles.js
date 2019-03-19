import axios from 'axios';
import { apiUrl, headerJson } from './CONSTANTS';

export default axios.create({
    baseURL: `${apiUrl}/style/`,
    headers: headerJson
  });