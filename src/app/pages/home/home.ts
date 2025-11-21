import { Component, OnInit, OnDestroy, HostListener, inject } from '@angular/core';
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
import { Menu } from '../../components/menu/menu';
import { SmallPokeballSvg } from '../../svg/small-pokeball-svg/small-pokeball-svg';
import { MobileFilter } from '../../components/mobile-filter/mobile-filter';
import { BurgerMenu } from '../../components/burger-menu/burger-menu';
import { PokemonCard as PokemonCardComponent } from '../../components/pokemon-card/pokemon-card';
import { PokemonCard } from '../../models/dashboard/pokemon-card';
import { PokemonService } from '../../services/pokemon.service';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-home',
  imports: [
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
    PokemonCardComponent,
    Navbar,
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
  pokemons: PokemonCard[] = [];
  pokemonService = inject(PokemonService);
  private offset = 0;
  private limit = 9;
  isLoading = false;
  selectedType = '';
  searchQuery = '';
  isSearching = false;

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  ngOnInit() {
    this.checkScreenSize();
    this.getPokemons();
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

  async getPokemons() {
    this.isSearching = false;
    this.isLoading = true;
    const newPokemons = await this.pokemonService.getPokemonCards(
      this.limit,
      this.offset,
      this.selectedType
    );
    this.pokemons = newPokemons;
    this.offset += this.limit;
    this.isLoading = false;
  }

  async loadMore() {
    if (this.isLoading || this.isSearching) return;
    this.isLoading = true;
    const newPokemons = await this.pokemonService.getPokemonCards(
      this.limit,
      this.offset,
      this.selectedType
    );
    this.pokemons = [...this.pokemons, ...newPokemons];
    this.offset += this.limit;
    this.isLoading = false;
  }

  async onTypeSelected(type: string) {
    this.selectedType = type;
    this.offset = 0;
    await this.getPokemons();
    this.scrollToPokemonSection();
  }

  private scrollToPokemonSection() {
    const section = document.querySelector('.sec3');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  async onSearchInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;

    const termAsNumber = Number(this.searchQuery);
    const isNumericSearch = !isNaN(termAsNumber) && termAsNumber > 0;

    // Controlla i minimi caratteri richiesti
    const hasMinChars = (isNumericSearch && this.searchQuery.length >= 2) ||
      (!isNumericSearch && this.searchQuery.length >= 3);

    if (hasMinChars) {
      await this.performSearch();
    } else if (this.searchQuery.length === 0) {
      this.offset = 0;
      this.getPokemons();
    }
  }

  async onSearchSubmit() {
    const termAsNumber = Number(this.searchQuery);
    const isNumericSearch = !isNaN(termAsNumber) && termAsNumber > 0;

    // Controlla i minimi caratteri richiesti anche per il submit
    const hasMinChars = (isNumericSearch && this.searchQuery.length >= 2) ||
      (!isNumericSearch && this.searchQuery.length >= 3);

    if (this.searchQuery.trim() && hasMinChars) {
      await this.performSearch();
    }
  }

  private async performSearch() {
    this.isSearching = true;
    this.isLoading = true;

    try {
      const searchResults = await this.pokemonService.searchPokemon(this.searchQuery);

      if (searchResults.length > 0) {
        this.pokemons = searchResults.map(pokemon => ({
          id: pokemon.id,
          name: pokemon.name,
          imageUrl: pokemon.imageUrl,
          types: []
        }));
      } else {
        this.pokemons = [];
      }
    } catch (error) {
      console.error('Errore durante la ricerca:', error);
      this.pokemons = [];
    } finally {
      this.isLoading = false;
    }
  }
}