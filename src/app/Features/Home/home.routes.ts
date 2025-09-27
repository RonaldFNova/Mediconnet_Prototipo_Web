import { Routes } from '@angular/router';
import { Home } from './home';
import { RoleGuard } from '../../Core/Guard/role.guard';

export const HOME_ROUTES: Routes = [

    {path: '', component: Home,
      canActivate: [RoleGuard],
      data: {roles: ['Paciente']}
    }
]

