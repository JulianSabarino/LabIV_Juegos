import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, inject, OnInit, QueryList, ViewChildren } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { GamesService } from '../../core/services/games.service';
import { Router } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-askmagic',
  standalone: true,
  imports: [CommonModule,NgxSpinnerModule],
  templateUrl: './askmagic.component.html',
  styleUrl: './askmagic.component.scss'
})
export class AskmagicComponent implements OnInit, AfterViewInit{

  optbuttons!: NodeListOf<HTMLButtonElement>;
  httpService  = inject(HttpClient);
  spinner = inject(NgxSpinnerService);
  toastr = inject(ToastrService);
  cardSelected: any =
  {
    name:"",
    img: ""
  };

  cardOptions: any[][] = [];
  gameStarted: boolean = false;
  puntuacion: number = 0;
  gameService = inject(GamesService);
  endOfGame:boolean = false;
  rooter = inject(Router)

  async ngOnInit() {
    this.spinner.show();

    await this.getFourRandomCards(0);
    await this.getFourRandomCards(1);
    await this.gameService.getPointsByGame("asked");

    this.spinner.hide();

  }

  ngAfterViewInit(): void {
    this.optbuttons = document.querySelectorAll('.btn-option') as NodeListOf<HTMLButtonElement>;
    console.log(this.optbuttons);
  }

  showList()
  {
    console.log(this.cardOptions);
  }

  async getFourRandomCards(round:number)
  {

    this.cardOptions[round] = [];
    for(let i=0;i <=3; i++)
      {
        await this.getCard(round);
      }
  
      console.log(this.cardOptions);

  }

  getCard(round: number) { 
    // Use getACard() to fetch the data
    this.getACard(round).subscribe(
      (cardData) => {
        console.log("Cargado");
        //console.log('Card data:', cardData); // Do something with cardData
      },
      (error) => { 
        // Handle errors
        console.error('Error getting card:', error); 
      }
    );
  }

  getACard(round: number) {
    const headers = new HttpHeaders({
      'User-Agent': 'Colmenas & Dragones', 
      Accept: '*/*' 
    });

    return this.httpService.get<any>(`https://api.scryfall.com/cards/random`, { headers: headers }).pipe(
      map(data => {

        
        let res =
        {
          name: data.name,
          img: data.image_uris.normal
        }
        this.cardOptions[round].push(res);
        //console.log('Card data:', data.image_uris.normal); // Log the data
        return res
         
      }),
      catchError(err => {
        console.error('Error getting random card:', err);
        return of({ 
          name: '', 
          imageUrl: '' 
        });
      })
    );
  }

  startGame(round: number)
  {
    this.gameStarted = true;

    let cardNum = Math.floor(Math.random() * (4));
    this.cardSelected = this.cardOptions[round][cardNum];

    console.log(this.cardSelected);
  }

  async sendResults(name:string)
  {
    this.spinner.show()
    this.optbuttons.forEach(optbutton => {
      optbutton.disabled=true;  
    });

    if(this.cardSelected.name == name)
    {
      console.log("Ganaste");
      this.puntuacion+=1;
      await this.getFourRandomCards(this.puntuacion+1);
      this.startGame(this.puntuacion);
      this.toastr.success("Correcto")
    }
    else
    {
      console.log("Perdiste");
      this.toastr.error("Fin del Juego")
      this.endOfGame=true;
      if(this.gameService.userPoints.asked < this.puntuacion)
      {
        this.gameService.setGameInfo("asked",this.puntuacion);
      }
    }
    this.spinner.hide();
  }

  RootPath(path:string)
  {
    this.rooter.navigate([path]);
    this.puntuacion = 0;
    this.endOfGame = false;
  }

}
  