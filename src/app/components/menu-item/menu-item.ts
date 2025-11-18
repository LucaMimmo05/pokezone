import { Component, input } from '@angular/core';

@Component({
  selector: 'app-menu-item',
  imports: [],
  templateUrl: './menu-item.html',
  styleUrl: './menu-item.css',
})
export class MenuItem {
  label = input<string>();
  icon = input<any>();
  route = input<string>();
}
