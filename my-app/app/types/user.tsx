import { Role } from "./role";

//app/types/user.tsx
export interface User{
    id:number;
    email: string;
    password?:string;
    fullName:string;
    phone:string;
    address:string;
    role?:Role;
}

