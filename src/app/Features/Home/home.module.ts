import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Home } from './home';
import { RouterModule } from '@angular/router';
import { HOME_ROUTES } from './home.routes';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Home,
    RouterModule.forChild(HOME_ROUTES)
  ]
})
export class HomeModule { }
