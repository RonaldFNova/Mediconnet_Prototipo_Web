import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { codeRequest } from '../Model/codeRequest.interface';
import { emailCodeRequest } from '../Model/emailCodeRequest.interface';

@Injectable({  providedIn: 'root'
})
export class SendEmailService {

  private apiUrl1 = 'http://localhost:5000/Api/EmailCode';
  private apiUrl2 = 'http://localhost:5000/Api/EmailCode/Verificar';
  private apiUrl3 = 'http://localhost:5000/Api/EmailCode/Email';
  private apiUrl4 = 'http://localhost:5000/Api/EmailCode/Verificar/Email';

  constructor(private http: HttpClient) { }
 
  sendCode(verificacion: codeRequest): Observable<any> {
    return this.http.post<any>(this.apiUrl4, verificacion);
  }

  sendEmailCode(LoginPost: emailCodeRequest): Observable<any>{
    console.log(this.http.post<any>(this.apiUrl3, LoginPost, { headers: { 'Content-Type': 'application/json' }} ));
    return this.http.post<any>(this.apiUrl3, LoginPost);
  }

}
