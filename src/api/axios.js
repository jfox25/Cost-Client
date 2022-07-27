import axios from 'axios';
// const BASE_URL = 'https://cost-api-v1.herokuapp.com/api/';
const BASE_URL = 'https://localhost:5001/api/';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type' : 'application/json'},
    withCredentials: true
});