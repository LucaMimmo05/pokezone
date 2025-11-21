import { Component } from '@angular/core';
import { MenuItem } from '../menu-item/menu-item';
import { MENU_ITEMS } from '../../constraints/menu-items';

@Component({
  selector: 'app-menu',
  imports: [MenuItem],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  items = MENU_ITEMS;
  activeIndex = 0;

  setActive(index: number) {
    this.activeIndex = index;
  }
}
