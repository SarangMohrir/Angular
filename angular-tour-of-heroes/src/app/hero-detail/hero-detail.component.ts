import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero | undefined;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    console.log(this.route);
    if (this.route.snapshot.paramMap.get('id')) {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.heroService.getHero(id).subscribe((hero) => (this.hero = hero));
    }
  }
  goBack(): void {
    this.location.back();
  }
  save(): void {
    let y = this.hero;
    if(y!=undefined){
    this.heroService.updateHero(y).subscribe(() => this.goBack());
  }
}
}
