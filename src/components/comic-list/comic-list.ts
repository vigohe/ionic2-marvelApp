import {Component, Input} from '@angular/core';

/*
  Generated class for the ComicList component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'comic-list',
  templateUrl: 'comic-list.html'
})
export class ComicListComponent {

  @Input() comics: any [];

  constructor() {
    console.log('Hello ComicList Component');
  }

}
