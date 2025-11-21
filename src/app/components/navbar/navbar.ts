import { Component } from '@angular/core';
import { Logo } from "../logo/logo";
import { BurgerMenu } from "../burger-menu/burger-menu";

@Component({
  selector: 'app-navbar',
  imports: [Logo, BurgerMenu],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

}
