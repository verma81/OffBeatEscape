export interface LoginModel {
    success: boolean;
    token: string;
    expiresIn: string;
}

export interface UserCredentials {
    password: string;
    username: string;
    confirmPassword?: string;
}
