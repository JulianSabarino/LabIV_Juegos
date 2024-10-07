import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bee',
  standalone: true,
  imports: [],
  templateUrl: './bee.component.html',
  styleUrl: './bee.component.scss'
})
export class BeeComponent {
  @Input() height!:number;
  @Input() width!:number;
  @Input() top!:number;

}
