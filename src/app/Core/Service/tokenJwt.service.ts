import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({  providedIn: 'root'
})

export class tokenJwtService {

  private apiUrl1 = 'http://localhost:5000/Api/Auth/TokenJWT';

  constructor(private http: HttpClient) { }
 
  verificarTokenJwt(token: string): Observable<any> {
    
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.post<any>(this.apiUrl1,{}, { headers });  
}

}
