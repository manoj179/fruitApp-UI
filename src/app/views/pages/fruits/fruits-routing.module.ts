import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListFruitsComponent } from './list-fruits/list-fruits.component';
import { AddFruiteComponent } from './add-fruite/add-fruite.component';
import { OrderListComponent } from './order-list/order-list.component';
import { UsersListComponent } from './users-list/users-list.component';

const routes: Routes = [
  {path:'list',component:ListFruitsComponent},
  {path:'addUpdate/:id',component:AddFruiteComponent},
  {path:'addUpdate',component:AddFruiteComponent},
  {path:'order-list/:id',component:OrderListComponent},
  {path:'user-list',component:UsersListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FruitsRoutingModule { }
