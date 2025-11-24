import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PokeballSvg } from '../../svg/pokeball-svg/pokeball-svg';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, PokeballSvg],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
})
export class NotFound {}
