import { Component, OnInit } from '@angular/core';
import { Slide } from 'src/app/interfaces/slide';
import { SlidesService } from 'src/app/services/slides.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  public slides: Array<Slide>;

  public aux: Array<Slide>

  constructor(
    private slidesService: SlidesService
  ) {
    this.slides = new Array<Slide>();
    this.aux = new Array<Slide>();
  }

  ngOnInit(): void {
    this.slidesService.getSlides().subscribe(
      response => {
        this.aux = response
        this.aux.forEach(e => {
          if(e.estado){
            this.slides.push(e)
          }
        });
      }
    )
  }

}
