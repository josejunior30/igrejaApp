import { TOKEN_KEY } from "../ultilitarios/system";

export function save(token:string){
    return localStorage.setItem(TOKEN_KEY,token);
}
export function get():string | null{
   return localStorage.getItem(TOKEN_KEY);
}

export function remove(){
    localStorage.removeItem(TOKEN_KEY);
}
export function getUserData(): any | null {
    const userDataString = localStorage.getItem("userData");
    return userDataString ? JSON.parse(userDataString) : null;
}

export function saveUserData(token:string, userData: any){
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem("userData", JSON.stringify(userData));
}