import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { resetPassword } from '../../../Core/Service/resetPassword.service';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { Message } from 'primeng/message'

@Component({
  selector: 'app-reset-password',
  imports: [CommonModule, 
    ReactiveFormsModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    Message],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css'
})
export class ResetPassword {
  resetPasswordForm : FormGroup;
  mensaje: string = "";

  constructor(private fb: FormBuilder, private router: Router,
    private resetPassword: resetPassword, private route: ActivatedRoute)
  {
    this.resetPasswordForm = this.fb.group({newPassword: ["", Validators.required],
      confirmPassword: ["", Validators.required] })
  }

  onSubmit() {

    const token = this.route.snapshot.queryParamMap.get('token') ?? "";

    if (!token) {
      console.log(token)
      this.router.navigate(['index']);
      return;
    }

    if (!this.resetPasswordForm.valid) {
      this.mensaje = "Por favor complete el formulario";
      return;
    }

    if (this.resetPasswordForm.value.confirmPassword =! this.resetPasswordForm.value.newPassword)
    {
      this.mensaje = "Contraseña no son iguales"
      return;
    }
    
    console.log({Passwrod: this.resetPasswordForm.value.confirmPassword, Token: token});

    this.resetPassword.resetPassword({Password: this.resetPasswordForm.value.confirmPassword, Token: token}).subscribe({
      next: (respuesta) => {
        this.router.navigate(['Auth/Login'])
      },
      error: (error) => {
        this.mensaje = "Error token invalido"
      }
    })

  }

}
