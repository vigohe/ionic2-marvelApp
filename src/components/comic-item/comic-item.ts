import {Component, Input, AfterViewInit, OnInit} from '@angular/core';
import moment from 'moment';

/*
  Generated class for the ComicItem component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'comic-item',
  templateUrl: 'comic-item.html'
})
export class ComicItemComponent implements OnInit, AfterViewInit {

  @Input() comic: any;
  public saleDate;

  constructor() {
    console.log('Hello ComicItem Component');
  }

  ngOnInit(){
    this.saleDate = moment(this.getSaleDate()).format('MMMM Do YYYY');
  }

  ngAfterViewInit(){

  }

  getSaleDate(){
    return this.comic.dates.filter(dates => dates.type === "onsaleDate").map(dateObj => dateObj.date);
  }

}
