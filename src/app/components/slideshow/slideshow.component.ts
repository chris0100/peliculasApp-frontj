import {AfterContentInit, AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Movie} from '../../interfaces/cartelera-response';
import {Swiper} from 'swiper';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, AfterViewInit {

  @Input() movies: Movie[];
  public swiper: Swiper; // undefined

  constructor() { }

  ngAfterViewInit(): void {
    this.swiper = new Swiper('.swiper-container', {
      loop: true,
    });
  }

  ngOnInit(): void {
  }


  onSlideNext(): void{
    this.swiper.slideNext();
  }


  onSlidePrev(): void{
    this.swiper.slidePrev();
  }



}
