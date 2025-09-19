import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegistroPost } from '../Model/registro,interface.js';
import { CookieService } from 'ngx-cookie-service';


@Injectable({  providedIn: 'root'
})
export class RegistroService {

  private apiUrl = 'http://localhost:5000/Api/Usuario';

  constructor(private http: HttpClient, private cookieService: CookieService ) { }

  registrarUsuario(usuario: RegistroPost): Observable<any> {
    return this.http.post<any>(this.apiUrl, usuario);
  }

  setToken(token: string) {
    this.cookieService.set('authToken', token, {
      expires: 14,       // expira en 1 día
      path: '/',        // accesible en toda la app
      secure: true,     // solo en HTTPS
      sameSite: 'Strict' // evita CSRF
    });
  }


}
