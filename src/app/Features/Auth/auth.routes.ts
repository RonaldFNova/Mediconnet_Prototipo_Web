import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Registro } from './registro/registro';
import { EmailVerificacion } from './email-verificacion/email-verificacion';
import { ForgotPassword } from './forgot-password/forgot-password';

export const AUTH_ROUTES: Routes = [

    {path: 'Login', component: Login},
    {path: 'Registro', component: Registro},
    {path: 'EmailVerificacion', component: EmailVerificacion},
    {path: 'Forgot-Password', component: ForgotPassword}
]

