import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegistroPost } from '../Model/registro,interface.js';


@Injectable({  providedIn: 'root'
})
export class RegistroService {

  private apiUrl = '';

  constructor(private http: HttpClient) { }

  registrarUsuario(usuario: RegistroPost): Observable<any> {
    return this.http.post<any>(this.apiUrl, usuario);
  }
}
