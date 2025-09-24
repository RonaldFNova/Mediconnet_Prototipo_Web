import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RegistroService } from '../../../Core/Service/registro.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TokenService } from '../../../Core/Service/token.service';
import { SendEmailService } from '../../../Core/Service/sendEmail.service';


@Component({
  selector: 'app-registro',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})

export class Registro {
  registerForm: FormGroup;
  mensaje: string = '';

  constructor(private fb: FormBuilder, private registroService: RegistroService, 
    private router: Router, private sendEmailService: SendEmailService) {
    
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

        }, 
        error: (error) => {
          this.mensaje = 'Error en el registro. Inténtelo de nuevo.';
        }
      });

      this.sendEmailService.sendEmailCode2({ Email: this.registerForm.value.email}).subscribe({

        next: (response) => {
          this.router.navigate(['Auth/EmailVerificacion']);

        }, 
        error: (error) => {
          this.mensaje = 'Error en el registro. Inténtelo de nuevo.';
        }
      });

    } else {
      this.mensaje = 'Por favor, complete el formulario correctamente.';
    }
    
  }

}
