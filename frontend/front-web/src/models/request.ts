import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "../ultilitarios/system";

export function requestBackend(config: AxiosRequestConfig){
  return axios({...config, baseURL: BASE_URL});
}
