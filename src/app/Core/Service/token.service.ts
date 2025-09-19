import { Injectable } from "@angular/core";
import { CookieService } from 'ngx-cookie-service';

@Injectable({  providedIn: 'root'})

export class TokenService {  

    constructor(private cookieService: CookieService) {}

    setToken(token: string) {        
        this.cookieService.set('authToken', token, {
        expires: 14,       // expira en 1 día
        path: '/',        // accesible en toda la app
        secure: true,     // solo en HTTPS
        sameSite: 'Strict' // evita CSRF
        });
    }

    getToken(): string{
        return this.cookieService.get("authToken")
    }

}