import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';

@Component({
  selector: 'rating-star',
  templateUrl: './rating-star.component.html',
  styleUrls: ['./rating-star.component.scss']
})
export class RatingStarComponent implements OnInit{
  @Input() max: number;
  @Output() onRating = new EventEmitter<Number>();

  maxItem: any[];
  ratedCount: number;

  constructor(){
    this.ratedCount = 0;
  }

  ngOnInit() {
    this.maxItem = [];
    for (let i = 0; i < this.max; i++) {
      this.maxItem.push(i + 1);
    }
  }
  toggleRating(s: number) {
    this.ratedCount = s;
    this.onRating.emit(this.ratedCount);
  }

}
