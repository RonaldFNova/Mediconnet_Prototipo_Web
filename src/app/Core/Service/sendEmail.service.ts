import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { codeRequest } from '../Model/codeRequest.interface';
import { emailCodeRequest } from '../Model/emailCodeRequest.interface';

@Injectable({  providedIn: 'root'
})
export class SendEmailService {

  private apiUrl1 = 'http://localhost:5000/Api/EmailCode/Verificar/Email';
  private apiUrl2 = 'http://localhost:5000/Api/EmailVerificacion/Enviar';

  constructor(private http: HttpClient) { }

  sendVerificarCode(verificacion: codeRequest): Observable<any> {
    console.log(verificacion);
    return this.http.post<any>(this.apiUrl1, verificacion);
  }

  sendEmailCode(emailCode: emailCodeRequest): Observable<any>{
    return this.http.post<any>(this.apiUrl2, emailCode);
  }


}
