import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-hangedman',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hangedman.component.html',
  styleUrl: './hangedman.component.scss'
})
export class HangedmanComponent implements AfterViewInit  {
  word: string;
  guesses: number = 6;
  guessedLetters: string[] = [];
  buttons: NodeListOf<HTMLButtonElement>;
  guessers: NodeListOf<HTMLDivElement>
  
  @ViewChild('keyboard') keyboard: ElementRef | undefined;
  @ViewChild('wordGuesser') wordGuesser: ElementRef | undefined;

  constructor()
  {
    this.word = "COLMENAS";
    //this.guessedLetters = "";
    this.buttons = document.querySelectorAll('.key') as NodeListOf<HTMLButtonElement>;
    this.guessers = document.querySelectorAll('.wordGuesser') as NodeListOf<HTMLDivElement>; 
  }

  ngAfterViewInit() {
    if (this.keyboard && this.wordGuesser) { 
      this.buttons = this.keyboard.nativeElement.querySelectorAll('.key') as NodeListOf<HTMLButtonElement>;
      this.guessers = this.wordGuesser.nativeElement.querySelectorAll('.wordGuesser') as NodeListOf<HTMLDivElement>; 

      this.updateWordDisplay();
      this.buttons.forEach(button => button.addEventListener('click', this.handleClick.bind(this)));

    } else {
      console.error("keyboard not found in the DOM");
    }
  }

  handleClick(event: MouseEvent) {

    const button = event.target as HTMLButtonElement;
    console.log(button.textContent);
    if(button.textContent)
    {
      this.guessedLetters.push(button.textContent);
      button.disabled = true;
      if(!this.word.includes(button.textContent))
      {
        this.guesses -= 1;
      }
      this.updateWordDisplay();
    }
    //const index = parseInt(cell.getAttribute('data-index')!, 10);
  }

  updateWordDisplay() {
    this.guessers[0].textContent = '';
    this.guessers[1].textContent = '';

    const guessSpan = document.createElement('span');
    guessSpan.textContent = "Guesses restantes: " + this.guesses.toString();
    this.guessers[1].appendChild(guessSpan);

    for (let i = 0; i < this.word.length; i++)
      {
      const letterSpan = document.createElement('span');
      if (this.guessedLetters.includes(this.word[i].toUpperCase())) { 
        letterSpan.textContent = this.word[i];
      } else {
        letterSpan.textContent = '_';
      }
      this.guessers[0].appendChild(letterSpan);
    }
    this.checkState();
  }

  checkState()
  {
    if(this.guesses == 0)
    {
      console.log("You Lose")
      this.disableButtons();
    }
    else if(this.guessers[0].textContent == this.word)
    {
      console.log("You Win");
      this.disableButtons();
    }
  }

  disableButtons()
  {
    this.buttons.forEach(button  => button.disabled = true)
  }

}
