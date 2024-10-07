import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit{
  nuevoMensaje: string = ""
  messageList:any = [
    {
      emisor: "id",
      message:  "message"
    }
  ]

  authService = inject(AuthService);
  loggedUser: any;

  ngOnInit(): void {
    //traer mensaje aca
  }

  sendMessage()
  {
    this.loggedUser = 
    {
      email: this.authService.user.email,
      uid: this.authService.user.uid as string
    }
    console.log(this.loggedUser);
    
    this.messageList.push(
      {
        emisor: this.loggedUser.uid,
        message:  this.nuevoMensaje
      }
    )

    console.log(this.messageList);

    this.nuevoMensaje="";
  }
}
