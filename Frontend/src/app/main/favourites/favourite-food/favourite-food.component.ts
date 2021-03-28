import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-favourite-food',
  templateUrl: './favourite-food.component.html',
  styleUrls: ['./favourite-food.component.css']
})
export class FavouriteFoodComponent implements OnInit {

  @Input() food: any;

  constructor() {
  }

  ngOnInit(): void {
  }

}
