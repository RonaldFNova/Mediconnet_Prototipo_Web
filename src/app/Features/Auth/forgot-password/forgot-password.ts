import { Component } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { resetPassword } from '../../../Core/Service/resetPassword.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css'
})
export class ForgotPassword {

  forgotPasswordForm: FormGroup;
  mensaje: string = "";

  constructor(private fb: FormBuilder, private resetPassword: resetPassword,
    private router: Router
  )
  {
    this.forgotPasswordForm = this.fb.group({email: ['', Validators.required]});
  }

  onSubmit(){

    if (!this.forgotPasswordForm.valid) {
      this.mensaje = "Tienes que llenar el campo";
    }

    this.resetPassword.sendEmailForgotPassword(this.forgotPasswordForm.value).subscribe({
      next: (respuesta) => {
        this.mensaje = "Correo de cambio de contraseña enviado"
        this.router.navigate(['Auth/Login'])
      },
      error: (error) => {
        this.mensaje = "El correo no existe" 
      }
    });
    

  }

}
