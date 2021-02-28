export interface SignUpResponseModel {
    success: boolean;
    user: string;
    token: string;
    expiresIn: string;
}
