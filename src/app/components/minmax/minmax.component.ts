import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterContentInit, Component, inject, OnInit } from '@angular/core';
import { catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-minmax',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './minmax.component.html',
  styleUrl: './minmax.component.scss'
})
export class MinmaxComponent implements OnInit{

  deck: any;
  cardList: any;

  lastCard: any;
  currentCard: any;



  httpService  = inject(HttpClient);

  ngOnInit(): void {
    this.initiateDeck();
  }



  initiateDeck() { 
    // Use getACard() to fetch the data
    this.getDeck().subscribe(
      (deckData) => {
        console.log(deckData);
        //console.log(this.deck);
        //console.log('Card data:', cardData); // Do something with cardData
      },
      (error) => { 
        // Handle errors
        console.error('Error getting card:', error); 
      }
    );
  }

  getDeck() {
    const headers = new HttpHeaders({
      'User-Agent': 'Colmenas & Dragones', 
      Accept: '*/*' 
    });

    return this.httpService.get<any>(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`, { headers: headers }).pipe(
      map(data => {

        this.deck = data;

        return this.deck;
         
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


  getDeckOfCards()
  {
    this.getAllCards().subscribe(
      (deckData) => {
        console.log(deckData);
        //console.log(this.currentCard);
        //console.log('Card data:', cardData); // Do something with cardData

        this.currentCard=this.cardList[52-this.deck.remaining]

        this.deck.remaining -= 1;
      },
      (error) => { 
        // Handle errors
        console.error('Error getting card:', error); 
      }
    );
  }

  getAllCards()
  {
    const headers = new HttpHeaders({
      'User-Agent': 'Colmenas & Dragones', 
      Accept: '*/*' 
    });

    return this.httpService.get<any>(`https://deckofcardsapi.com/api/deck/${this.deck.deck_id}/draw/?count=52`, { headers: headers }).pipe(
      map(data => {

        this.cardList = data.cards;

        return this.cardList;
         
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

  getCard()
  {
    this.currentCard = this.cardList[52-this.deck.remaining];
    switch(this.currentCard.value)
    {
      case "ACE":
        this.currentCard.value = 1;
        break;
      case "JACK":
        this.currentCard.value = 11;
        break;
      case "QUEEN":
        this.currentCard.value = 12;
        break;
      case "KING":
        this.currentCard.value = 13;
        break;
    }
    this.deck.remaining -=1;

  }


    isSmaller()
    {
      this.lastCard = this.currentCard;
      this.getCard();

      if(this.currentCard.value < this.lastCard.value)
      {
        console.log("nice");
      }
      else
      {
        console.log("you lose");
      }
    }
    isBigger()
    {
      this.lastCard = this.currentCard;
      this.getCard();

      if(this.currentCard.value > this.lastCard.value)
      {
        console.log("nice");
      }
      else
      {
        console.log("you lose");
      }
    }
    
}
