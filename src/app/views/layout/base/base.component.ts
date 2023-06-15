import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { SessionMgmtService } from 'src/app/services/session-mgmt.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent {

  userType:any;
  constructor(private router:Router,private sessionService:SessionMgmtService,){
    if(this.sessionService.getUserData()!=null){
      this.userType = this.sessionService.getUserData().userType.toUpperCase();
    }
  }

  navigateToOrder(){
    if(this.sessionService.getUserData().userType.toLocaleLowerCase()=="admin"){
      this.router.navigate(['/fruit/order-list/0']);
    }
    else{
      this.router.navigate([`/fruit/order-list/${this.sessionService.getUserData().id}`]);
    }
  }

  logiOut(){
    this.sessionService.clearSession();
    this.router.navigate(['/']);
  }

  userIsAdmin(){
    return this.sessionService.getUserData().userType=='admin'?true:false;
  }
}
