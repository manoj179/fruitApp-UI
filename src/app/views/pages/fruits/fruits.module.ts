import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FruitsRoutingModule } from './fruits-routing.module';
import { AddFruiteComponent } from './add-fruite/add-fruite.component';
import { ListFruitsComponent } from './list-fruits/list-fruits.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderListComponent } from './order-list/order-list.component';
import { UsersListComponent } from './users-list/users-list.component';
import { ChatboardComponent } from './chatboard/chatboard.component';


@NgModule({
  declarations: [
    AddFruiteComponent,
    ListFruitsComponent,
    OrderListComponent,
    UsersListComponent,
    ChatboardComponent
  ],
  imports: [
    CommonModule,
    FruitsRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class FruitsModule { }
