import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { resetPasswordRequest } from '../Model/resetPasswordRequest.interface';
import { emailCodeRequest } from '../Model/emailCodeRequest.interface';

@Injectable({  providedIn: 'root'
})

export class resetPassword {


    private apiUrl1 = 'http://localhost:5000/Api/PasswordReset/Enviar'
    private apiUrl2 = 'http://localhost:5000/Api/PasswordReset/Verificar';


  constructor(private http: HttpClient) { }

  sendEmailForgotPassword(sendEmail: emailCodeRequest): Observable<any>{
    return this.http.post<any>(this.apiUrl1, sendEmail);
  }  

  resetPassword(resetPassword: resetPasswordRequest): Observable<any> {
    return this.http.post<any>(this.apiUrl2, resetPassword);
  }
}
