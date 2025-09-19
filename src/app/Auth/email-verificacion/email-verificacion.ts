import { Component } from '@angular/core';
import { TokenService } from '../../Core/Service/token.service';
import { sendEmailService } from '../../Core/Service/sendEmail.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-email-verificacion',
  imports: [ReactiveFormsModule],
  templateUrl: './email-verificacion.html',
  styleUrl: './email-verificacion.css'
})
export class EmailVerificacion {

  emailVerificacion: FormGroup;

  constructor(private tokenService: TokenService, private sendEmail: sendEmailService, private fb: FormBuilder ) {
    this.emailVerificacion = this.fb.group({
      codigo: ['', Validators.required]
    });

  }

  onSubmit()
  {

  }


  

}
