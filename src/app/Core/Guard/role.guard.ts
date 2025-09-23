import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { TokenService } from "../Service/token.service";
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../Model/payload.interface'; 



@Injectable ({
    providedIn: 'root'
})

export class RoleGuard implements CanActivate {

    constructor(private tokenService: TokenService, private router: Router) {}

    canActivate(route: any): boolean {
        const expectedRoles: string[] = route.data['roles'];
        const token = this.tokenService.getToken();

        if (!token) {
            this.router.navigate(['/Auth/Login']);
            return false;
        }

        try {
            const decoded = jwtDecode<JwtPayload>(token);
            const userRole = decoded.role;

            if (expectedRoles.includes(userRole)) {
                return true;
            }
             else {
                this.router.navigate(['/unauthorized'])
                return false;
             }
        }
        catch (e) {
            this.router.navigate(['/Auth/Login']);
            return false;
        }
    }
}
