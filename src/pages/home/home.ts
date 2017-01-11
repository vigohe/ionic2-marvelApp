import {Component, ViewChild} from "@angular/core";
import {NavController, Content, Select, DateTime, Button, LoadingController, Loading} from "ionic-angular";
import {Subject, Observable} from "rxjs";
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
  public comics: any;
  public startYear: any;
  private inputSearch$: Subject<any> = new Subject();
  private clearYear$: Subject<any> = new Subject();
  private infiniteScrolling$: Subject<any> = new Subject();

  @ViewChild(Content) ionContent: Content;
  @ViewChild(DateTime) ionDate: DateTime;

  constructor(public navCtrl: NavController,
              public loadingCtrl : LoadingController,
              private _comicsActions: ComicsActions,
              private _store : Store<fromRoot.State>
  ) {
  }

  ionViewDidLoad() {
    console.log('Hello HomePage Page');

    this._store.select(fromRoot.getComicsLoading)
      .takeUntil(this.navCtrl.viewWillUnload)
      .filter(isloading => isloading)
      .map(() => this.createLoader())
      .do(loading => loading.present())
      .delayWhen(loading => this._store.select(fromRoot.getComicsComplete).filter(complete => complete))
      .map(loading => loading.dismiss())
      .subscribe();

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
      .do(title => title.length > 0 ?
        this._store.dispatch(this._comicsActions.searchComics(title)) : this._store.dispatch(this._comicsActions.searchComicsClear()))
      .subscribe(() => this.ionContent.scrollToTop());

    this.inputSearch$
      .takeUntil(this.navCtrl.viewWillUnload)
      .filter(ev => ev.type === 'mousedown')
      .map(() => this._store.dispatch(this._comicsActions.searchComicsClear()))
      .subscribe(() => this.ionContent.scrollToTop());

    this.ionDate.ionChange
      .takeUntil(this.navCtrl.viewWillUnload)
      .map(date => date.year.value)
      .map(startYear => this._store.dispatch(this._comicsActions.searchComicsByYear(startYear)))
      .subscribe(() => this.ionContent.scrollToTop());

    this.clearYear$
      .takeUntil(this.navCtrl.viewWillUnload)
      .do(() => this._store.dispatch(this._comicsActions.searchComicsByYearClear()))
      .subscribe(() => this.startYear = null);

    this.infiniteScrolling$
      .do(() => this._store.dispatch(this._comicsActions.loadComicsOffset()))
      .delayWhen(() => this._store
        .select(fromRoot.getComicsCompleteOffset)
        .filter(complete => complete))
      .map(infiniteScroll => infiniteScroll.complete())
      .subscribe();

    this._store.dispatch(this._comicsActions.loadComics());


  }

  createLoader() : Loading {
    return this.loadingCtrl.create({content: "Loading..."});
  }

}
