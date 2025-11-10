import axios from 'axios';
import { Platform } from 'react-native';

export const api = axios.create({
  baseURL: 'http://192.168.1.16:3000/api', // IP local do seu computador
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});