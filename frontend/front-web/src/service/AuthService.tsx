import QueryString from "qs";
import {
  AccessTokenPayloadDTO,
  CredentialsDTO,
  RoleEnum,
} from "../models/auth";
import { CLIENT_ID, CLIENT_SECRET } from "../ultilitarios/system";
import * as accessTokenRepository from "../localstorage/access-token-repository";

import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../models/request";
import jwtDecode from "jwt-decode";

export async function loginRequest(loginData: CredentialsDTO) {
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: "Basic " + window.btoa(CLIENT_ID + ":" + CLIENT_SECRET),
  };
  const requestBody = QueryString.stringify({
    ...loginData,
    grant_type: "password",
  });

  const config: AxiosRequestConfig = {
    method: "POST",
    url: "/oauth/token",
    data: requestBody,
    headers,
  };
  return requestBackend(config);
}

export function logout() {
  accessTokenRepository.remove();
}
export function saveAccessToken(token: string) {
  accessTokenRepository.save(token);
}
export function getAccessToken() {
  return accessTokenRepository.get();
}
export function getAccessTokenPayload(): AccessTokenPayloadDTO | undefined {
  try {
    const token = accessTokenRepository.get();
    return token == null
      ? undefined
      : (jwtDecode(token) as AccessTokenPayloadDTO);
  } catch (error) {
    return undefined;
  }
}
export function isAuthenticated(): boolean {
  let tokenPayload = getAccessTokenPayload();
  if (tokenPayload && tokenPayload.exp * 1000 > Date.now()) {
    return true;
  }
  return false;
}

export function hasAnyRoles(roles: RoleEnum[]): boolean {
  if (roles.length === 0) {
    return true;
  }

  const tokenPayload = getAccessTokenPayload();

  // 🔹 Verifica se o token e authorities existem antes de acessar `.includes()`
  if (tokenPayload && tokenPayload.authorities) {
    return roles.some((role) => tokenPayload!.authorities.includes(role));
  }

  return false;
}
