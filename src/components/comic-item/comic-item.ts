import {Component, Input} from '@angular/core';

/*
  Generated class for the ComicItem component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'comic-item',
  templateUrl: 'comic-item.html'
})
export class ComicItemComponent {

  @Input() comic: any;

  constructor() {
    console.log('Hello ComicItem Component');
  }

}
