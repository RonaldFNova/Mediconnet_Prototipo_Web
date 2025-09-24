export interface LoginPost
{
    Email: string
    Password: string
}

export interface LoginGet
{
    mensaje: string
    token: string
    verificacionEmail: boolean
}
export interface LoginPost2
{
    Email: string
}