import { Injectable } from '@angular/core';
import { signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FooterVisibilityService {
  showFooter = signal(true);

  hideFooter() {
    this.showFooter.set(false);
  }

  showFooterAgain() {
    this.showFooter.set(true);
  }
}
