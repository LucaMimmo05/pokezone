import { Component, output } from '@angular/core';
import { Logo } from '../logo/logo';
import { BurgerMenu } from '../burger-menu/burger-menu';

@Component({
  selector: 'app-navbar',
  imports: [Logo, BurgerMenu],
  templateUrl: './navbar.html'
})
export class Navbar {
  typeSelected = output<string>();

  onTypeSelected(type: string) {
    this.typeSelected.emit(type);
  }
}
