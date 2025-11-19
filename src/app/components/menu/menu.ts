import { Component } from '@angular/core';
import { MenuItem } from '../menu-item/menu-item';
import { PokeballSvg } from '../../svg/pokeball-svg/pokeball-svg';
import { InsectSvg } from '../../svg/insect-svg/insect-svg';
import { DragonSvg } from '../../svg/dragon-svg/dragon-svg';
import { ElectricSvg } from '../../svg/electric-svg/electric-svg';
import { FairySvg } from '../../svg/fairy-svg/fairy-svg';
import { FightingSvg } from '../../svg/fighting-svg/fighting-svg';
import { Fire2Svg } from '../../svg/fire2-svg/fire2-svg';
import { FlyingSvg } from '../../svg/flying-svg/flying-svg';
import { GhostSvg } from '../../svg/ghost-svg/ghost-svg';
import { GrassSvg } from '../../svg/grass-svg/grass-svg';
import { GroundSvg } from '../../svg/ground-svg/ground-svg';
import { IceSvg } from '../../svg/ice-svg/ice-svg';
import { NormalSvg } from '../../svg/normal-svg/normal-svg';
import { PoisonSvg } from '../../svg/poison-svg/poison-svg';
import { PsychicSvg } from '../../svg/psychic-svg/psychic-svg';
import { RockSvg } from '../../svg/rock-svg/rock-svg';
import { SteelSvg } from '../../svg/steel-svg/steel-svg';
import { WaterSvg } from '../../svg/water-svg/water-svg';

@Component({
  selector: 'app-menu',
  imports: [MenuItem],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})

export class Menu {
  items = [
    { label: 'All types', icon: PokeballSvg, route: '/' }, // Added route property
    { label: 'Insect', icon: InsectSvg, route: '/' },
    { label: 'Dragon', icon: DragonSvg, route: '/' },
    { label: 'Electric', icon: ElectricSvg, route: '/' },
    { label: 'Fairy', icon: FairySvg, route: '/' },
    { label: 'Fighting', icon: FightingSvg, route: '/' },
    { label: 'Fire', icon: Fire2Svg, route: '/' },
    { label: 'Flying', icon: FlyingSvg, route: '/' },
    { label: 'Ghost', icon: GhostSvg, route: '/' },
    { label: 'Grass', icon: GrassSvg, route: '/' },
    { label: 'Ground', icon: GroundSvg, route: '/' },
    { label: 'Ice', icon: IceSvg, route: '/' },
    { label: 'Normal', icon: NormalSvg, route: '/' },
    { label: 'Poison', icon: PoisonSvg, route: '/' },
    { label: 'Psychic', icon: PsychicSvg, route: '/' },
    { label: 'Rock', icon: RockSvg, route: '/' },
    { label: 'Steel', icon: SteelSvg, route: '/' },
    { label: 'Water', icon: WaterSvg, route: '/' },
  ];
}

