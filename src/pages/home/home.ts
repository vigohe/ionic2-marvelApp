import {Component, ViewChild} from "@angular/core";
import {NavController, Content} from "ionic-angular";
import {Subject} from "rxjs";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/takeUntil";
import * as fromRoot from "../../reducer/index";
import {ComicsActions} from "../../actions/comics";
import {Store} from "@ngrx/store";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public comics: any [] = [];
  private inputSearch$: Subject<any> = new Subject();
  @ViewChild(Content) ionContent: Content;

  constructor(public navCtrl: NavController,
              private _comicsActions: ComicsActions,
              private _store : Store<fromRoot.State>
  ) {

  }

  ionViewDidLoad() {
    console.log('Hello HomePage Page');

    this._store.select(fromRoot.getComicsEntities)
      .takeUntil(this.navCtrl.viewWillUnload)
      .map(comics => this.comics = comics)
      .subscribe();

    this.inputSearch$
      .takeUntil(this.navCtrl.viewWillUnload)
      .filter(ev => ev.type === 'input')
      .map(ev => ev.target.value)
      .debounceTime(1000)
      .distinctUntilChanged()
      .map(title => title.length > 0 ?
        this._store.dispatch(this._comicsActions.searchComics(title)) : this._store.dispatch(this._comicsActions.loadComics()))
      .subscribe(() => this.ionContent.scrollToTop());

    this.inputSearch$
      .takeUntil(this.navCtrl.viewWillUnload)
      .filter(ev => ev.type === 'mousedown')
      .map(() => this._store.dispatch(this._comicsActions.loadComics()))
      .subscribe(() => this.ionContent.scrollToTop());

    this._store.dispatch(this._comicsActions.loadComics());


  }

  getItems(ev: any) {
    this.inputSearch$.next(ev);
  }

  doInfinite(infiniteScroll: any) {

    console.log("doInfinite");

    this._store.dispatch(this._comicsActions.loadComicsOffset());

    this._store
      .select(fromRoot.getComicsCompleteOffset)
      .filter(complete => complete)
      .first()
      .subscribe(() => infiniteScroll.complete());
  }

}
