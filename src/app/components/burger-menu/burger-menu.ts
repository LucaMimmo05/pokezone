import { Component, output } from '@angular/core';
import { MENU_ITEMS } from '../../constraints/menu-items';
import { MenuItem } from '../menu-item/menu-item';

@Component({
  selector: 'app-burger-menu',
  imports: [MenuItem],
  templateUrl: './burger-menu.html',
  styleUrl: './burger-menu.css',
})
export class BurgerMenu {
  items = MENU_ITEMS;
  activeIndex = 0;
  typeSelected = output<string>();

  toggleMenu(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  setActive(index: number, checkbox: HTMLInputElement) {
    this.activeIndex = index;
    const type =
      this.items[index].label === 'All types' ? '' : this.items[index].label.toLowerCase();
    this.typeSelected.emit(type);
    checkbox.checked = false; // Close the menu after selection
    document.body.style.overflow = ''; // Restore scroll
  }
}
