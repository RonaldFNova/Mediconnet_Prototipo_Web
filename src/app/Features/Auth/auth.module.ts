import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { Registro } from './registro/registro';
import { Login } from './login/login';
import { AUTH_ROUTES } from './auth.routes';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Registro,
    Login,
    RouterModule.forChild(AUTH_ROUTES)
  ]
})
export class AuthModule {}