import { Component, Input } from '@angular/core';
import { DropSVG } from '../../../svg/drop-svg/drop-svg';
import { LightningSVG } from '../../../svg/lightning-svg/lightning-svg';
import { MessageSVG } from '../../../svg/message-svg/message-svg';
import { FireSVG } from '../../../svg/fire-svg/fire-svg';
import { SnowSVG } from '../../../svg/snow-svg/snow-svg';
import { LeafSVG } from '../../../svg/leaf-svg/leaf-svg';
import { SparkSVG } from '../../../svg/spark-svg/spark-svg';

@Component({
  selector: 'dashboard-hero',
  imports: [
    DropSVG,
    LightningSVG,
    MessageSVG,
    FireSVG,
    SnowSVG,
    LeafSVG,
    SparkSVG,
  ],
  templateUrl: './dashboard-hero.html',
  styleUrl: './dashboard-hero.css',
})
export class DashboardHeroComponent {
  @Input() currentBgColor: string = '#c20001';
  @Input() currentSvgColor: string = '#E87878';
}
