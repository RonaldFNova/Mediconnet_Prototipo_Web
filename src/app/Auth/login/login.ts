import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../Core/Service/login.service';
import { TokenService } from '../../Core/Service/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

    loginForm: FormGroup;
    mensaje: string = '';

    constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router,private tokenService: TokenService) {

      this.loginForm = this.fb.group({
        email: ['', [Validators.required,Validators.email]],
        password: ['',Validators.required]
      });
    }


    onSubmit(){
      if (this.loginForm.valid) {
        this.loginService.loginUsuario(this.loginForm.value).subscribe({

          next: (response) => {
            console.log("paso")

            this.mensaje = response.mensaje;
            this.tokenService.setToken(response.token)
            this.router.navigate(['Auth/Registro']);

          },
          
          error: (error) => {
            this.mensaje = error.Mensaje;
          }

        })

      }

    }

}
