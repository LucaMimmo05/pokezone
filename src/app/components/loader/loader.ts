import { Component } from '@angular/core';
import { PokeballSvg } from '../../svg/pokeball-svg/pokeball-svg';

@Component({
  selector: 'app-loader',
  imports: [PokeballSvg],
  templateUrl: './loader.html',
  styleUrl: './loader.css'
})
export class LoaderComponent {}
