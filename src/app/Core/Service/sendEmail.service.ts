import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CodeSend } from '../Model/code.interface';

@Injectable({  providedIn: 'root'
})
export class sendEmailService {

  private apiUrl = 'http://localhost:5000/Api/EmailCode';

  constructor(private http: HttpClient) { }
 
  sendEmailCode(token: string): Observable<any> {
    const headers = {'Authorization': `Bearer ${token}` };
    console.log("Llamando a:", this.apiUrl, "con headers:", headers);
    return this.http.post<any>(this.apiUrl, {}, {headers});
  }

  sendCode(token: string, code: CodeSend): Observable<any> {
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.post<any>(this.apiUrl, code, { headers });
  }

}
