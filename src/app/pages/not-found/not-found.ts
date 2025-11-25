import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PokeballSvg } from '../../svg/pokeball-svg/pokeball-svg';
import { FooterVisibilityService } from '../../services/footer-visibility.service';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, PokeballSvg],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
})
export class NotFound {
    private readonly footerService = inject(FooterVisibilityService);

    ngOnInit() {
        this.footerService.hideFooter();
    }

    ngOnDestroy() {
        this.footerService.showFooterAgain();
    }

}
