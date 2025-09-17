import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RegistroService } from '../../Core/Service/registro.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-registro',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {
  registerForm: FormGroup;
  mensaje: string = '';

  constructor(private fb: FormBuilder, private registroService: RegistroService, private router: Router) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.registroService.registrarUsuario(this.registerForm.value).subscribe({

        next: (response) => {
          this.mensaje = 'Registro exitoso. Por favor, inicie sesión.';
          this.router.navigate(['Auth/EmailVerificacion']);
        }

        , error: (error) => {
          this.mensaje = 'Error en el registro. Inténtelo de nuevo.';
          console.error('Error en el registro:', error);
        }

      });
    } else {
      this.mensaje = 'Por favor, complete el formulario correctamente.';
    }
  }

}
