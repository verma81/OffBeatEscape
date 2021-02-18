export interface UserInterface {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}

export interface UserCredentials {
    password: string;
    username: string;
    confirmPassword?: string;
}