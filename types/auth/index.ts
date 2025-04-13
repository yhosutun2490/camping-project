// 定義 UserRegister 型別
export type UserRegister = {
    provider: "local" | "google";
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
};