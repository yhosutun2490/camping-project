export interface MemberInfo {
    id: string,
    username: string,
    email: string,
    role: "member" | "host" | "admin";
 }