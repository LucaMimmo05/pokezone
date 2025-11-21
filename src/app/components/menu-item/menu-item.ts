import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu-item',
  imports: [CommonModule, RouterModule],
  templateUrl: './menu-item.html',
  styleUrl: './menu-item.css',
})
export class MenuItem {
  label = input<string>();
  icon = input<any>();
  route = input<string>();
  isActive = input<boolean>();
}
