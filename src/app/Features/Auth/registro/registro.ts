import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { cookieService } from '../../../Core/Service/cooke.service';
import { SendEmailService } from '../../../Core/Service/sendEmail.service';
import { registrarUsuarioService } from '../../../Core/Service/registrarUsuario.service'; 
import { catchError, switchMap, tap, of } from 'rxjs';

@Component({
  selector: 'app-registro',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})

export class Registro {
  registerForm: FormGroup;
  mensaje: string = '';

  constructor(private fb: FormBuilder, 
    private registrarUsuarioService: registrarUsuarioService, 
    private router: Router, 
    private sendEmailService: SendEmailService, 
    private cookieService: cookieService) 
    {
      this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {

    if (this.registerForm.valid) {
      this.registrarUsuarioService.registrarUsuario(this.registerForm.value).pipe(
        tap(() => this.mensaje = 'Procesando registro...'),
        switchMap(respuesta =>
          this.sendEmailService.sendEmailCode({ Email: this.registerForm.value.email}).pipe(
            catchError(error => {
              console.error('Error enviando email', error);
              return of({emailsend: false, error: error});
            })
          )
        ),
        catchError(error => {
          console.error('Error en registro', error);
          throw error;
        })
      ).subscribe({
        next: (res) => {
          if (res?.emailsend === false) {
            this.mensaje = "Error el correo no se pudo enviar."
            this.router.navigate(['Auth/Login']);
          }

          this.cookieService.setEmail(this.registerForm.value.email);
          this.router.navigate(['Auth/EmailVerificacion']);

        },
        error: (error) => {
          this.mensaje = "Error en el proceso de registro o envío de correo."
        }
      })
    } 
    else {
      this.mensaje = 'Por favor, complete el formulario correctamente.';
    }
  }
}
