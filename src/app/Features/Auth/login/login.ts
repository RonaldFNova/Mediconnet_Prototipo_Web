import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../../Core/Service/login.service';
import { TokenService } from '../../../Core/Service/token.service';
import { Router } from '@angular/router';
import { SendEmailService } from '../../../Core/Service/sendEmail.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

    loginForm: FormGroup;
    mensaje: string = '';
    public verificacionEmail?: boolean;

    constructor(private fb: FormBuilder, private loginService: LoginService,
       private router: Router,private tokenService: TokenService, private sendEmailService: SendEmailService) {

      this.loginForm = this.fb.group({
        email: ['', [Validators.required,Validators.email]],
        password: ['',Validators.required]
      });
    }

    onSubmit(){
      if (this.loginForm.valid) {
        this.loginService.loginUsuario(this.loginForm.value).subscribe({

          next: (response) => {

            this.mensaje = response.mensaje;
            this.verificacionEmail = response.verificacionEmail;

            if (this.verificacionEmail) {
                this.tokenService.setToken(response.token)
                this.router.navigate(['/home']);
              }
          },
          error: (error) => {
            console.log(error.status);
            this.mensaje = error.error.mensaje;
          }
        })

        this.sendEmailService.sendEmailCode({ Email: this.loginForm.value.email}).subscribe({

          next: (response) => {

            this.sendEmailService.sendEmailCode(this.loginForm.value.email);
            this.router.navigate(['/Auth/EmailVerificacion'])
              
          },
          error: (error) => {
              console.log(error.status);
              this.mensaje = error.error.mensaje;
          }

        })
      }
    }

}
