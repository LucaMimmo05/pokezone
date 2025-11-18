import { Component } from '@angular/core';
import { MenuItem } from '../menu-item/menu-item';
import { Item1 } from '../../svg/item1/item1';
import { Item2 } from '../../svg/item2/item2';

@Component({
  selector: 'app-menu',
  imports: [MenuItem],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})

export class Menu {
  items = [
    { label: 'All types', icon: Item1, route: '/' }, // Added route property
    { label: 'Insect', icon: Item2, route: '/' },
    { label: 'Dragon', icon: Item1, route: '/' },
    { label: 'Electric', icon: Item1, route: '/' },
    { label: 'Fairy', icon: Item1, route: '/' },
    { label: 'Fighting', icon: Item1, route: '/' },
    { label: 'Fire', icon: Item1, route: '/' },
    { label: 'Flying', icon: Item1, route: '/' },
    { label: 'Ghost', icon: Item1, route: '/' },
    { label: 'Grass', icon: Item1, route: '/' },
    { label: 'Ground', icon: Item1, route: '/' },
    { label: 'Ice', icon: Item1, route: '/' },
    { label: 'Normal', icon: Item1, route: '/' },
    { label: 'Poison', icon: Item1, route: '/' },
    { label: 'Psychic', icon: Item1, route: '/' },
    { label: 'Rock', icon: Item1, route: '/' },
    { label: 'Steel', icon: Item1, route: '/' },
    { label: 'Water', icon: Item1, route: '/' },
  ];
}

