import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { loginRequest } from '../Model/loginRequest.interface';
import { loginResponse } from '../Model/loginResponse.interface';

@Injectable({  providedIn: 'root'
})

export class LoginService {

  private apiUrl1 = 'http://localhost:5000/Api/Login';

  constructor(private http: HttpClient) { }
 
  loginUsuario(LoginPost: loginRequest): Observable<loginResponse> {
    return this.http.post<loginResponse>(this.apiUrl1, LoginPost);
  }

}
