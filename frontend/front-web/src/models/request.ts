import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "../ultilitarios/system";

axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
  axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
   if(error.response.status===401){
    console.log("erro 401")
   }if(error.response.status===403){
    console.log("erro 403")
   }
    return Promise.reject(error);
  });