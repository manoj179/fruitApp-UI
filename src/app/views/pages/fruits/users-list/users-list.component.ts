import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { SessionMgmtService } from 'src/app/services/session-mgmt.service';
import { SignalrService } from 'src/app/services/signalr.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit,OnDestroy {

  constructor(private toast:ToastrService,private userSerivce:UserService,
    private chatServices:SignalrService,private session:SessionMgmtService
  ){}

  updatedUserSync = new Subscription;

  message:string;
  userList:User[];
  status:boolean;
  ngOnInit(): void {
    this.initUserFetch();
    this.chatServices.startConnection(this.session.getUserData().id);
    this.chatServices.addMessageListener()

    this.updatedUserSync = this.chatServices.updatedUser$.subscribe((res)=>{
      if(res!=null){
        let status = res.status=='Active'?true:false;
        this.userList.filter(m=>m.id==res.userId)[0].isActive = status;
      }
    });
  }

  

  initUserFetch(){
    try{
      this.userSerivce.getuserList().then(res=>{
        if(res.status){
          this.userList = res.data;
        }
        else{
          this.toast.warning(res.message);
        }
      }).catch(err=>{
        console.log(err);
        this.toast.error('Failed to fetch data');
      });
    }
    catch(err){
      console.log(err);
    }
  }

  sendMessage(message,userid){
    this.chatServices.sendMessage(this.session.getUserData().name,message,userid);
  }

  async updateStatus(id,item){

    try{
      let status = item.target.checked?'Active':'InActive';
      var res = await this.userSerivce.updateUserStatus(id,status);
      if(res.status){
        this.toast.success('Updated successfullt');
        this.initUserFetch();
      }
      else{
        this.toast.warning(res.message);
      }
    }
    catch(err){
      console.log(err);
      this.toast.error('Failed to fetch data');
    }
  }

  ngOnDestroy(){
    if(this.updatedUserSync){
      this.updatedUserSync.unsubscribe();
    }
  }
}
