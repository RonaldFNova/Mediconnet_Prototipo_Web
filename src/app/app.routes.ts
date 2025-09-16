import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: 'Auth',
        loadChildren: () => import('./Auth/auth.routes').then(c => c.AUTH_ROUTES)
    }
];
