import { Component, input, output } from '@angular/core';
import { MENU_ITEMS } from '../../constraints/menu-items';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mobile-filter',
  imports: [CommonModule],
  templateUrl: './mobile-filter.html',
  styleUrl: './mobile-filter.css',
})
export class MobileFilter {
  view = input<string>('All');
  typeSelected = output<string>();
  isOpen = false;
  items = MENU_ITEMS;

  toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  selectType(type: string) {
    this.typeSelected.emit(type === 'All types' ? '' : type.toLowerCase());
    this.isOpen = false;
  }
}
