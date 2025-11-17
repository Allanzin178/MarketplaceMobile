import axios from 'axios';

const LOCAL_IP = '192.168.1.27';

export const api = axios.create({
  baseURL: `http://${LOCAL_IP}:3000/api`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});