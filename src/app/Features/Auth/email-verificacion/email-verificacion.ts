import { Component, OnDestroy, OnInit } from '@angular/core';
import { SendEmailService } from '../../../Core/Service/sendEmail.service';
import { cookieService } from '../../../Core/Service/cooke.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InputOtpModule } from 'primeng/inputotp';
import { ButtonModule } from 'primeng/button';
import { Message } from 'primeng/message';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-email-verificacion',
  imports: [ReactiveFormsModule,
    FormsModule,
    InputOtpModule,
    ButtonModule,
    Message,
    CommonModule],
  templateUrl: './email-verificacion.html',
  styleUrl: './email-verificacion.css'
})
export class EmailVerificacion implements OnInit, OnDestroy {

  mensajeTipo: string = ""; 
  emailVerificacion: FormGroup;
  mensaje: string = "";

  tiempoRestante: number = 0;
  tiempoFormateado: string = "15:00";
  private intervalo: any;
  private readonly STORAGE_KEY = "codigoExpiracion";


  constructor(private cookieService: cookieService, 
    private sendEmailService: SendEmailService, 
    private fb: FormBuilder, 
    private router: Router) {
    this.emailVerificacion = this.fb.group({
      codigo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.iniciarContador();
  }

  ngOnDestroy(): void {
    if (this.intervalo) {
      clearInterval(this.intervalo);
    }
  }

  iniciarContador() {
    const tiempoExpiracion = localStorage.getItem(this.STORAGE_KEY);

    if (tiempoExpiracion) {

      const tiempoExpiracionNum = parseInt(tiempoExpiracion);
      const ahora = Date.now();
      const diferencia = Math.floor((tiempoExpiracionNum - ahora) / 1000);
      
      if (diferencia > 0) {
        this.tiempoRestante  = diferencia;
      }
      else {
        this.tiempoRestante = 0;
      }
    }
    else {
      this.tiempoRestante = 15 * 60;
      const tiempoExpiracion = Date.now() + (this.tiempoRestante * 1000);
      localStorage.setItem(this.STORAGE_KEY, tiempoExpiracion.toString());
    }

    this.actualizarTiempoFormateado();

    if (this.intervalo) {
      clearInterval(this.intervalo);
    }

    this.intervalo = setInterval(() => {
      this.tiempoRestante--;
      this.actualizarTiempoFormateado();

      if (this.tiempoRestante <= 0) {
        clearInterval(this.intervalo);
        localStorage.removeItem(this.STORAGE_KEY);
      }
    }, 1000);
  }

    actualizarTiempoFormateado() {
    const minutos = Math.floor(this.tiempoRestante / 60);
    const segundos = this.tiempoRestante % 60;
    this.tiempoFormateado = `${minutos}:${segundos.toString().padStart(2, '0')}`;
  }




  onSubmit()
  {
    if (this.emailVerificacion.valid){
      this.sendEmailService.sendVerificarCode({Email: this.cookieService.getEmail(), Codigo: this.emailVerificacion.value.codigo}).subscribe({

        next: (response) => {
          this.mensaje = response.mensaje;
          this.cookieService.setToken(response.token);
          this.cookieService.deleteEmail();
          localStorage.removeItem(this.STORAGE_KEY);
          clearInterval(this.intervalo);
          this.router.navigate(['Home']);
        },
        error: (error) => {
          console.log(error)
          this.mensaje = error.error.mensaje;
        }
      })
    }
    else{
      this.mensajeTipo = "warn"
      this.mensaje = "Por favor, complete el formulario correctamente."

    }
  }

  reenviarCodigo(){
    
    this.tiempoRestante = 15 * 60;
    const tiempoExpiracion = Date.now() + (this.tiempoRestante * 1000);
    localStorage.setItem(this.STORAGE_KEY, tiempoExpiracion.toString());
    
    if (this.intervalo) {
      clearInterval(this.intervalo);
    }
    this.iniciarContador();


    this.sendEmailService.sendEmailCode({Email: this.cookieService.getEmail()}).subscribe({

      next: (response) => {
        this.mensaje = response.mensaje;;
      },
      error: (error) =>{
        this.mensaje = error.error.mensaje;
      }
    });

  }

}
