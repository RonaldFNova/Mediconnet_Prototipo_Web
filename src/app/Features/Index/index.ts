import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { cookieService } from '../../Core/Service/cooke.service';
import { tokenJwtService } from '../../Core/Service/tokenJwt.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-index',
  imports: [RouterLink,CommonModule],
  templateUrl: './index.html',
  styleUrl: './index.css'
})
export class Index {

    specialties = [
    'Medicina General',
    'Pediatría',
    'Cardiología',
    'Dermatología',
    'Ginecología',
    'Traumatología',
    'Oftalmología',
    'Odontología'
  ];

  constructor(private router: Router, private cookieService: cookieService, private tokenjwtService: tokenJwtService) {}

    scrollToEspecialidades() {
    const element = document.getElementById('especialidades');
    element?.scrollIntoView({ behavior: 'smooth' });
  }

    scrollToServicios() {
    const element = document.getElementById('servicios');
    element?.scrollIntoView({ behavior: 'smooth' });
  }

    scrollToContacto() {
    const element = document.getElementById('contacto');
    element?.scrollIntoView({ behavior: 'smooth' });
  }


  ngOnInit() {
    const token = this.cookieService.getToken();
    console.log(token);
    if (token) {
      this.tokenjwtService.verificarTokenJwt(token).subscribe({
        next: (response) => {
          this.router.navigate(["Home"]);
        },
        error: (error) => {
        }
      })
    }
  }

}
