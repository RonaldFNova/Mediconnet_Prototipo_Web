import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { registroRequest } from '../Model/registroRequest,interface.js';


@Injectable({  providedIn: 'root'
})
export class registrarUsuarioService {

  private apiUrl = 'http://localhost:5000/Api/Usuario';

  constructor(private http: HttpClient) { }

  registrarUsuario(usuario: registroRequest): Observable<any> {
    return this.http.post<any>(this.apiUrl, usuario);
  }

}
