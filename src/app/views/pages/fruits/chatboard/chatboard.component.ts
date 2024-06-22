import { Component, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { SessionMgmtService } from 'src/app/services/session-mgmt.service';
import { SignalrService } from 'src/app/services/signalr.service';

@Component({
  selector: 'app-chatboard',
  templateUrl: './chatboard.component.html',
  styleUrls: ['./chatboard.component.scss']
})
export class ChatboardComponent implements OnInit {

  message:string;
  recMsg:string;
  private hubConnection: HubConnection;

  constructor(private session:SessionMgmtService,private signalRService: SignalrService){
  }
  
  ngOnInit() {
    // this.hubConnection = new HubConnectionBuilder().withUrl('/chathub').build();
    // this.hubConnection.start();
    // this.addMessageListener();
    this.signalRService.startConnection(this.session.getUserData().id);
    this.signalRService.addMessageListener();
  }

  sendMsg():void{
    // this.hubConnection.invoke("SendMessage", this.session.getUserData().name, this.message)
    // .catch(err => console.error(err));

    this.signalRService.sendMessage(this.session.getUserData().name,this.message,0);
  }

  // public addMessageListener = () => {
  //   this.hubConnection.on('ReceiveMessage', (message: string) => {
  //     console.log('Received message: ', message);
  //     this.recMsg+=" "+message;
  //     // Do something with the received message
  //   });
  // }
}
