import { Component } from '@angular/core';
import { SendEmailService } from '../../../Core/Service/sendEmail.service';
import { TokenService } from '../../../Core/Service/token.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-email-verificacion',
  imports: [ReactiveFormsModule],
  templateUrl: './email-verificacion.html',
  styleUrl: './email-verificacion.css'
})
export class EmailVerificacion {

  emailVerificacion: FormGroup;
  mensaje: string = "";

  constructor(private tokenService: TokenService, private sendEmail: SendEmailService, private fb: FormBuilder, private router: Router) {
    this.emailVerificacion = this.fb.group({
      codigo: ['', Validators.required]
    });

  }

  onSubmit()
  {
    if (this.emailVerificacion.valid){

      this.sendEmail.sendCode(this.emailVerificacion.value).subscribe({

        next: (Response) => {
          
          console.log(Response);
          this.mensaje = "Email verificado correctamente"
          this.router.navigate(['Auth/Login']);
        },

        error: (Response) => {
          this.mensaje = "Error en enviar el codigo"
        }



      })

    }
  }

}
