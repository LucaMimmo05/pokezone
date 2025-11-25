import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from "./components/footer/footer";
import { FooterVisibilityService } from './services/footer-visibility.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('pokezone');
  private footerService = inject(FooterVisibilityService);

  get showFooter() {
    return this.footerService.showFooter;
  }
}
