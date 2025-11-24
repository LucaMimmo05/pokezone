import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-details-title',
  imports: [],
  templateUrl: './pokemon-details-title.html',
  styleUrl: './pokemon-details-title.css',
})
export class PokemonDetailsTitle {
  @Input()
  name: string = "";

  @Input()
  id!: number;

  get idWithZeros(): void | string {
    if(this.id){
      return '#' + this.id.toString().padStart(3, '0')
    }
    else return;
  }
}
