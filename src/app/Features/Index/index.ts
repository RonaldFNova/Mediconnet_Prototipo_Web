import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { cookieService } from '../../Core/Service/cooke.service';
import { tokenJwtService } from '../../Core/Service/tokenJwt.service';

@Component({
  selector: 'app-index',
  imports: [RouterLink],
  templateUrl: './index.html',
  styleUrl: './index.css'
})
export class Index {

  constructor(private router: Router, private cookieService: cookieService, private tokenjwtService: tokenJwtService) {}


  ngOnInit() {
    const token = this.cookieService.getToken();
    console.log(token);
    if (token) {
      this.tokenjwtService.verificarTokenJwt(token).subscribe({
        next: (response) => {
          this.router.navigate(["Home"]);
        },
        error: (error) => {
        }
      })
    }
  }

}
