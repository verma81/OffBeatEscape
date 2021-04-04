export interface LoginModel {
    success: boolean;
}

export interface UserCredentials {
    password: string;
    username: string;
    confirmPassword?: string;
    email?: string;
}
