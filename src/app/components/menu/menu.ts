import { Component, output } from '@angular/core';
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
  typeSelected = output<string>();

  setActive(index: number) {
    this.activeIndex = index;
    const selectedType = this.items[index].label.toLowerCase();
    this.typeSelected.emit(selectedType === 'all types' ? '' : selectedType);
  }
}
