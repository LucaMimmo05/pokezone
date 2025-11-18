import { Component } from '@angular/core';
import { Logo } from '../logo/logo';
import { DropSVG } from "../svg/drop-svg/drop-svg";
import { LightningSVG } from "../svg/lightning-svg/lightning-svg";
import { MessageSVG } from "../svg/message-svg/message-svg";
import { FireSVG } from "../svg/fire-svg/fire-svg";
import { SnowSVG } from "../svg/snow-svg/snow-svg";
import { LeafSVG } from "../svg/leaf-svg/leaf-svg";
import { SparkSVG } from "../svg/spark-svg/spark-svg";
import { StarSVG } from "../svg/star-svg/star-svg";
import { PokeballShadow } from "../pokeball-shadow/pokeball-shadow";

@Component({
  selector: 'app-home',
  imports: [Logo, DropSVG, LightningSVG, MessageSVG, FireSVG, SnowSVG, LeafSVG, SparkSVG, StarSVG, PokeballShadow],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
