import { Component } from '@angular/core';
import { SendEmailService } from '../../../Core/Service/sendEmail.service';
import { cookieService } from '../../../Core/Service/cooke.service';
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

  constructor(private cookieService: cookieService, 
    private sendEmailService: SendEmailService, 
    private fb: FormBuilder, 
    private router: Router) {
    this.emailVerificacion = this.fb.group({
      codigo: ['', Validators.required]
    });
  }

  onSubmit()
  {
    if (this.emailVerificacion.valid){
      this.sendEmailService.sendVerificarCode({Email: this.cookieService.getEmail(), Codigo: this.emailVerificacion.value.codigo}).subscribe({

        next: (Response) => {
          this.mensaje = Response.mensaje;
          this.cookieService.setToken(Response.token);
          this.cookieService.deleteEmail();
          this.router.navigate(['Home/Home']);
        },
        error: (error) => {
          console.log(error)
          this.mensaje = error.error.mensaje;
        }
      })
    }
    else{

      this.mensaje = "Por favor, complete el formulario correctamente."

    }
  }

  reenviarCodigo(){
    this.sendEmailService.sendEmailCode({Email: this.cookieService.getEmail()}).subscribe({

      next: (Response) => {
        this.mensaje = "Codigo reenviado correctamente"
      },
      error: (error) =>{

        this.mensaje = "Error tendras que logearte de nuevo para poder verificarte"
      }  
    })

  }

}
