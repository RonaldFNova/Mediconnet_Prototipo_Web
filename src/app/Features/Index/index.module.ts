import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Index } from './index';
import { RouterModule } from '@angular/router';
import { INDEX_ROUTES } from './index.routes';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Index,
    RouterModule.forChild(INDEX_ROUTES)
  ]
})

export class IndexModule { }
