import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Logo } from '../../components/logo/logo';
import { DropSVG } from '../../svg/drop-svg/drop-svg';
import { LightningSVG } from '../../svg/lightning-svg/lightning-svg';
import { MessageSVG } from '../../svg/message-svg/message-svg';
import { FireSVG } from '../../svg/fire-svg/fire-svg';
import { SnowSVG } from '../../svg/snow-svg/snow-svg';
import { LeafSVG } from '../../svg/leaf-svg/leaf-svg';
import { SparkSVG } from '../../svg/spark-svg/spark-svg';
import { StarSVG } from '../../svg/star-svg/star-svg';
import { CarouselDot } from '../../components/carousel-dot/carousel-dot';
import { Menu } from "../../components/menu/menu";
import { SmallPokeballSvg } from "../../svg/small-pokeball-svg/small-pokeball-svg";
import { MobileFilter } from "../../components/mobile-filter/mobile-filter";
import { BurgerMenu } from "../../components/burger-menu/burger-menu";

@Component({
  selector: 'app-home',
  imports: [
    Logo,
    DropSVG,
    LightningSVG,
    MessageSVG,
    FireSVG,
    SnowSVG,
    LeafSVG,
    SparkSVG,
    StarSVG,
    CarouselDot,
    Menu,
    SmallPokeballSvg,
    MobileFilter,
    BurgerMenu
],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {
  currentActiveIndex = 0;
  currentBgColor = '#c20001';
  currentSvgColor = '#E87878';
  currentShadowColor = '#e81414';
  isMobile = false;
  private interval: any;

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  ngOnInit() {
    this.checkScreenSize();
    this.interval = setInterval(() => {
      this.currentActiveIndex = (this.currentActiveIndex + 1) % 2;
      this.onChangeBg();
    }, 7000);
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  handleActiveItem(index: number) {
    return this.currentActiveIndex === index;
  }

  onChangeBg() {
    if (this.currentActiveIndex === 0) {
      this.currentBgColor = '#c20001';
      this.currentSvgColor = '#E87878';
      this.currentShadowColor = '#e81414';
    } else {
      this.currentBgColor = '#3f67ba';
      this.currentSvgColor = '#6F96E8';
      this.currentShadowColor = '#3f67ba';
    }
  }

  isChangePokeball() {
    return this.currentActiveIndex === 0;
  }

  handleSVG() {
    return this.currentActiveIndex === 0 ? '#ff9a76' : '#76c7ff';
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth <= 480;
  }
}
