import {Component, Input} from '@angular/core';

/*
  Generated class for the ComicDetails component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'comic-details',
  templateUrl: 'comic-details.html'
})
export class ComicDetailsComponent {

  @Input() comic: any;

  constructor() {
    console.log('Hello ComicDetails Component');
  }

}
