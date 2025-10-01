import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { resetPassword } from '../../../Core/Service/resetPassword.service';

@Component({
  selector: 'app-reset-password',
  imports: [CommonModule, ReactiveFormsModule],
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
      this.router.navigate(['index']);
      return;
    }

    if (!this.resetPasswordForm.valid) {
      this.mensaje = "Por favor complete el formulario";
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
