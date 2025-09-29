import { Component } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SendEmailService } from '../../../Core/Service/sendEmail.service';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css'
})
export class ForgotPassword {

  forgotPasswordForm: FormGroup;
  mensaje: string = "";

  constructor(private fb: FormBuilder, private sendEmilService: SendEmailService)
  {
    this.forgotPasswordForm = this.fb.group({email: ['', Validators.required]});
  }

  onSubmit(){

    if (!this.forgotPasswordForm.valid) {
      this.mensaje = "Tienes que llenar el campo";
    }

    this.sendEmilService.sendEmailForgotPassword(this.forgotPasswordForm.value).subscribe({
      next: (respuesta) => {
        this.mensaje = "Correo de cambio de contraseña enviado"
      },
      error: (error) => {
        this.mensaje = "El correo no existe"
      }
    });
    

  }

}
