import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-flappybee',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flappybee.component.html',
  styleUrl: './flappybee.component.scss'
})
export class FlappybeeComponent implements OnInit, OnDestroy{

  gameStarted:boolean=false;
  
  bee: any = {
    height: 30,
    width: 30,
    position:300
  }

  beeInterval!: any;

  score!:number;

  flappyBee: any;

  ngOnInit(): void {
    this.beeInterval = setInterval(() => {
      this.addGravity.bind(this);
    }, 240);
  }

  ngOnDestroy(): void {
    //hacer un clear de intervalo.
  }

  startFlying()
  {
    this.gameStarted = true;
    this.score=0;
    //this.flappyBee = new ImageComponent(30, 30, 10, 120, "assets/logo.png");
  }

  addGravity()
  {
    let gravity = 5
    if(this.gameStarted )
      {
        this.bee.position += gravity;
      }
   
  }

  start() {
    // Game loop
  }

  draw() {
    // Clear canvas, draw bird, pipes, and score
  }

  update() {
    // Update bird position, pipe movement, and collision detection
  }
}
