import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginGet, LoginPost } from '../Model/login.interface';

@Injectable({  providedIn: 'root'
})

export class LoginService {

  private apiUrl1 = 'http://localhost:5000/Api/Login';

  constructor(private http: HttpClient) { }
 
  loginUsuario(LoginPost: LoginPost): Observable<LoginGet> {
    return this.http.post<LoginGet>(this.apiUrl1, LoginPost);
  }

}
