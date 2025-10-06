import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../../Core/Service/login.service';
import { cookieService } from '../../../Core/Service/cooke.service';
import { Router } from '@angular/router';
import { SendEmailService } from '../../../Core/Service/sendEmail.service';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { Message } from 'primeng/message';

@Component({
  selector: 'app-login',
  imports: [CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    Message],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

    loginForm: FormGroup;
    mensaje: string = '';
    public verificacionEmail?: boolean;

    constructor(private fb: FormBuilder, 
      private loginService: LoginService,
       private router: Router,
       private cookieService: cookieService, 
       private sendEmailService: SendEmailService) {

      this.loginForm = this.fb.group({
        email: ['', [Validators.required,Validators.email]],
        password: ['',Validators.required],
        rememberMe: [false]
      });
    }

    onSubmit(){

      if (!this.loginForm.valid) {
        this.mensaje = "Por favor complete el formulario";
        return;
      }

      this.loginService.loginUsuario(this.loginForm.value).subscribe({
        next: (respuesta) => {
          if (respuesta.verificacionEmail) {
            /*
            if (!this.loginForm.value.rememberMe) {
                this.cookieService.setToken(respuesta.token);
            }
            */
            this.cookieService.setToken(respuesta.token);
            this.cookieService.deleteEmail();
            this.router.navigate(['Home']);
          } else {
            this.sendEmailService.sendEmailCode({ Email: this.loginForm.value.email }).subscribe({
              next: () => {
                this.cookieService.setEmail(this.loginForm.value.email);
                this.router.navigate(['Auth/EmailVerificacion']);
              },
              error: () => {
                this.mensaje = "Error al enviar el código de verificación.";
              }
            });
          }
        },
        error: (error) => {
          this.mensaje = error.error?.mensaje || "Error en el login";
        }
      });
    }
}
