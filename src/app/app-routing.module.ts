import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';
import { BaseComponent } from './views/layout/base/base.component';
import { ListFruitsComponent } from './views/pages/fruits/list-fruits/list-fruits.component';
import { ErrorComponent } from './views/pages/error/error.component';

const routes: Routes = [
  {path:'auth',loadChildren:()=> import('./views/auth/auth.module').then(m=>m.AuthModule)},
  {path:'',redirectTo: 'auth', pathMatch: 'full' },
  {
    path:'',
    canActivate:[authGuard],
    component:BaseComponent,
    children:[
      {
        path:'fruit',
        loadChildren: ()=> import('./views/pages/fruits/fruits.module').then(m=>m.FruitsModule)
      }
    ]
  },
  {
    path: 'error',
    component: ErrorComponent,
    data: {
      'type': 404,
      'title': 'Page Not Found',
      'desc': 'Oopps!! The page you were looking for doesn\'t exist.'
    }
  },
  {
    path: 'error/:type',
    component: ErrorComponent
  },
  { path: '', redirectTo: 'landingpage', pathMatch: 'full' },
  { path: '**', redirectTo: 'error', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
