import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CodeSend } from '../Model/code.interface';

@Injectable({  providedIn: 'root'
})
export class SendEmailService {

  private apiUrl1 = 'http://localhost:5000/Api/EmailCode';
  private apiUrl2 = 'http://localhost:5000/Api/EmailCode/Verificar'

  constructor(private http: HttpClient) { }
 
  sendEmailCode(token: string): Observable<any> {
    const headers = {'Authorization': `Bearer ${token}` };
    console.log("Llamando a:", this.apiUrl1, "con headers:", headers);
    return this.http.post<any>(this.apiUrl1, {}, {headers});
  }

  sendCode(token: string, code: CodeSend): Observable<any> {
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.post<any>(this.apiUrl2, code, { headers });
  }

}
