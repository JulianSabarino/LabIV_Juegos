import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { ChatService } from './chat.service';
import { Timestamp } from '@angular/fire/firestore';
import { MensajeChat } from './chat.model';
import { MessagedatePipe } from '../../core/pipes/messagedate.pipe';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule,FormsModule,MessagedatePipe],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit{
  chatShow:boolean = true;

  nuevoMensaje: string = ""

  chatsFirebase:MensajeChat[]=[];

  authService = inject(AuthService);
  chatService = inject(ChatService);
  loggedUser: any;

  ngOnInit(): void {
    this.chatService.getMensajes((data)=>{
      this.chatsFirebase=data
      console.log(this.chatsFirebase)
    })
  }


  sendMessage()
  {

    let message = 
    {
      uid: this.authService.user.uid,
      email: this.authService.user.email,
      message:  this.nuevoMensaje,
      date: Timestamp.fromDate(new Date())
    }

    this.chatService.saveMessage(message);

    console.log(this.chatService);

    this.nuevoMensaje="";
  }

  scrollBottom()
  {
    let elements = document.getElementsByClassName('message');
    let last:any = elements[elements.length-1];
    let toppos = last.offsetTop;

    const container = document.getElementById('m-container');
    if (container) {
        container.scrollTop = toppos;
    }
  }

  openCloseChat()
  {
    if(this.chatShow)
    {
      this.chatShow=false;
    }else
    {
      this.chatShow=true;
    }
  }
}
