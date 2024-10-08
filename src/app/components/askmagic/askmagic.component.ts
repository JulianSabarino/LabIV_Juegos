import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, inject, OnInit, QueryList, ViewChildren } from '@angular/core';
import { catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-askmagic',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './askmagic.component.html',
  styleUrl: './askmagic.component.scss'
})
export class AskmagicComponent implements OnInit, AfterViewInit{

  optbuttons!: NodeListOf<HTMLButtonElement>;
  httpService  = inject(HttpClient);
  cardSelected: any =
  {
    name:"",
    img: ""
  };

  cardOptions: any[] = [];
  gameStarted: boolean = false;

  ngOnInit(): void {

    for(let i=0;i <=3; i++)
    {
      this.getCard();
    }

    console.log(this.cardOptions);
  }

  ngAfterViewInit(): void {
    this.optbuttons = document.querySelectorAll('.btn-option') as NodeListOf<HTMLButtonElement>;
    console.log(this.optbuttons);
  }

  showList()
  {
    console.log(this.cardOptions);
  }

  getCard() { 
    // Use getACard() to fetch the data
    this.getACard().subscribe(
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

  getACard() {
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
        this.cardOptions.push(res);
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

  startGame()
  {
    this.gameStarted = true;

    let cardNum = Math.floor(Math.random() * (4));
    this.cardSelected = this.cardOptions[cardNum];

    console.log(this.cardSelected);

  }

  sendResults(name:string)
  {
    this.optbuttons.forEach(optbutton => {
      optbutton.disabled=true;  
    });

    if(this.cardSelected.name == name)
    {
      console.log("Ganaste");
    }
    else
    {
      console.log("Perdiste")
    }
  }


}
  