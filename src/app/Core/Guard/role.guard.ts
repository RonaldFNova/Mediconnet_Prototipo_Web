import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { cookieService } from "../Service/cooke.service";
import { jwtDecode } from 'jwt-decode';



@Injectable ({
    providedIn: 'root'
})

export class RoleGuard implements CanActivate {

    constructor(private cookieService: cookieService, private router: Router) {}

    canActivate(route: any): boolean {
        const expectedRoles: string[] = route.data['roles'];
        const token = this.cookieService.getToken();

        if (!token) {
            this.router.navigate(['/Auth/Login']);
            return false;
        }

        try {
            const decoded = jwtDecode<any>(token);
            const userRole = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
            console.log(decoded);

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
