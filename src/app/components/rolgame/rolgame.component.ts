import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-rolgame',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rolgame.component.html',
  styleUrl: './rolgame.component.scss'
})
export class RolgameComponent implements OnInit{
  
  boarStatus: any =
  {
    action: "",
    position: "near",
    health: 3,
    isAttacking: false
  }

  cdRef = inject(ChangeDetectorRef);

  gameStatus:any =
  {
    isAttacking: false,
    isWin:false,
    isDead:false
  }


  ngOnInit(): void {
    this.boarStatus.action = this.getRandomAction();
  }

  getRandomAction()
  {
    let action = Math.floor(Math.random() * (4));
    switch(action)
    {
      case 1:
        return "Preparandose para embestir"
      case 2:
        return "Preparandose para huir"
      default:
        return "Está atontado"
    }
  }

  advanceGame(action: string)
  {
    
    if (action === 'attack') {
      this.gameStatus.isAttacking = true;

      
      setTimeout(() => {
        this.gameStatus.isAttacking = false;
        this.cdRef.detectChanges(); 
      }, 500); 
    }

    switch(this.boarStatus.action)
    {
      case "Preparandose para embestir":

        this.boarStatus.isAttacking = true;
        setTimeout(() => {
          this.boarStatus.isAttacking = false;
          this.cdRef.detectChanges(); 
        }, 500); 

        if(action=="dodge")
        {
          this.boarStatus.action="Está atontado";
          this.boarStatus.position="near";
        }
        else
        {
          this.gameStatus.isDead = true;
          console.log("LOSE");
        }
        break;

      case "Preparandose para huir":
        if(this.boarStatus.position =="near")
        {
          this.boarStatus.position = "away";
          if(action == "close")
          {
            this.boarStatus.position = "near";
          }
          else
          {
            console.log("Too far away");
          }
          this.boarStatus.action = this.getRandomAction();
        }
        else
        {
          if(action == "close")
            {
              this.boarStatus.position = "near";
            }
            else
            {
              this.gameStatus.isDead = true;
              console.log("YOU LOSE");
            } 
        }

        break;
      case "Está atontado":
        if(this.boarStatus.position == "near" && action == "attack")
        {
          this.boarStatus.health -=1;
        }
        else if(this.boarStatus.position == "away" && action == "close")
        {
          this.boarStatus.position = "near";
        }
        else
        {
          console.log("This does nothing");
        }
        this.boarStatus.action = this.getRandomAction();
        break;
    }

    if(this.boarStatus.health == 0)
    {
      console.log("YOU WIN");
      setTimeout(() => {
        this.gameStatus.isWin = true;
        this.cdRef.detectChanges(); 
      }, 2500); 
    }

    console.log(this.boarStatus.position);
  }

}
