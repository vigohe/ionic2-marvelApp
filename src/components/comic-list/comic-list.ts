import {Component, Input, OnDestroy} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {NavController} from "ionic-angular";
import {ComicPage} from "../../pages/comic/comic";
import * as fromRoot from "../../reducer/index";
import {Store} from "@ngrx/store";
import {ComicsActions} from "../../actions/comics";

/*
 Generated class for the ComicList component.

 See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 for more info on Angular 2 Components.
 */
@Component({
  selector: 'comic-list',
  templateUrl: 'comic-list.html'
})
export class ComicListComponent implements OnDestroy {

  @Input() comics: any [];
  destroy$: Subject<any> = new Subject();
  onClick$: Subject<any> = new Subject();

  constructor(public navCtrl: NavController,
              private _store: Store<fromRoot.State>,
              private _comicsActions : ComicsActions
  ) {
    console.log('Hello ComicList Component');

    this.onClick$
      .takeUntil(this.destroy$)
      .do(item => this._store.dispatch(this._comicsActions.selectedComic(item.id)))
      .do(item => this.navCtrl.push(ComicPage))
      .subscribe(x => console.log(x), error => console.log("error",error), () => console.log("COMPLETE:::::::"));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe()
  }
}
