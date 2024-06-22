import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  private hubConnection: signalR.HubConnection;
  private userDetailsObs = new Subject<{status:string,userId:number}>();

  updatedUser$ = this.userDetailsObs

  constructor(private toastr:ToastrService) { }

  public startConnection = (userId) => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.baseUrl}/chathub?userId=${userId}`)
      .build();

      this.hubConnection
      .start()
      .then(() => {
        console.log('Connection started');
        // this.addMessageListener();
      })
      .then(m=>{
        this.hubConnection.invoke('getconnectionid')
        .then((data) => {
          console.log('ConnectionId: ',data);
        });
      })
      .catch(err => console.log('Error while starting connection: ' + err));
  }

  // public getMessageObservable() {
  //   return this.messageSubject.asObservable();
  // }

  public addMessageListener = () => {
    this.hubConnection.on('ReceiveChat', (user:string,message: string) => {
      // debugger;
      console.log(`Received message: , ${message} | User:${user}`);
      // this.messageSubject.next({ user, message });
      // Do something with the received message
    });

    this.hubConnection.on('ReceiveUserStatus', (status: string,userId:number) => {
      // debugger;
      console.log(`Received message: ,User Status Message:${status} | UserId: ${userId}`);
      let data = {status:status,userId:userId};
      this.userDetailsObs.next(data);
      // this.messageSubject.next({ user, message });
      // Do something with the received message
    });
  }

  public sendMessage(user,message,recipientId){
    this.hubConnection.invoke('getconnectionid')
    .then((data) => {
      console.log('This Machine ConnectionId: ',data);
      this.hubConnection.invoke('getConnectIdOfUser',recipientId)
      .then((data)=>{
        console.log(`userId: ${recipientId} -> ConnectionId: ${data}`);
        this.hubConnection.invoke('SendMessage',user,message,data)
        .then((data)=>{
          console.log('Result Data: ',data);
        })
        .catch(err=>console.error(err));
        }).catch((err)=>{
          console.log(err);
      })
    });

    

    
   
  }
}
