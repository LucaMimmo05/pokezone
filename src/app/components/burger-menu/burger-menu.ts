import { Component } from '@angular/core';
import { MENU_ITEMS } from '../../constraints/menu-items';
import { MenuItem } from "../menu-item/menu-item";

@Component({
  selector: 'app-burger-menu',
  imports: [MenuItem],
  templateUrl: './burger-menu.html',
  styleUrl: './burger-menu.css',
})
export class BurgerMenu {
    items = MENU_ITEMS;
}
