import { createContext, useEffect, useState } from "react";
import { AccessTokenPayloadDTO } from "../models/auth";


export type ContextTokenType={
    contextTokenPayload:AccessTokenPayloadDTO |undefined;
    setContextTokenPayload: (accessTokenPayloadDTO: AccessTokenPayloadDTO | undefined) => void;
}
export const ContextToken = createContext<ContextTokenType>({
    contextTokenPayload: undefined,
    setContextTokenPayload: () => {}
});
