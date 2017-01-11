import {Component, ViewChild, OnDestroy} from "@angular/core";
import {NavController, Content, DateTime, LoadingController} from "ionic-angular";
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
export class HomePage implements OnDestroy {
  public comics$: Observable<any>;
  public isLoading$: Observable<any>;
  public notFound$: Observable<any>;
  public startYear: any;
  private inputSearch$: Subject<any> = new Subject();
  private clearYear$: Subject<any> = new Subject();
  private infiniteScrolling$: Subject<any> = new Subject();
  private destroy$: Subject<any> = new Subject();

  @ViewChild(Content) ionContent: Content;
  @ViewChild(DateTime) ionDate: DateTime;

  constructor(public navCtrl: NavController,
              private _comicsActions: ComicsActions,
              private _store : Store<fromRoot.State>
  ) {}

  ionViewDidLoad() {
    console.log('Hello HomePage Page');

    this.comics$ = this._store.select(fromRoot.getComicsEntities);
    this.isLoading$ = this._store.select(fromRoot.getComicsLoading)
      .do(() => this.ionContent.scrollToTop());
    this.notFound$ = this._store.select(fromRoot.getComicsNotFound);


    this.inputSearch$
      .takeUntil(this.destroy$)
      .filter(ev => ev.type === 'input')
      .map(ev => ev.target.value)
      .debounceTime(1000)
      .distinctUntilChanged()
      .do(title => title.length > 0 ?
        this._store.dispatch(this._comicsActions.searchComics(title)) : this._store.dispatch(this._comicsActions.searchComicsClear()))
      .subscribe();

    this.inputSearch$
      .takeUntil(this.destroy$)
      .filter(ev => ev.type === 'mousedown')
      .map(() => this._store.dispatch(this._comicsActions.searchComicsClear()))
      .subscribe();

    this.ionDate.ionChange
      .takeUntil(this.destroy$)
      .map(date => date.year.value)
      .map(startYear => this._store.dispatch(this._comicsActions.searchComicsByYear(startYear)))
      .subscribe();

    this.clearYear$
      .takeUntil(this.destroy$)
      .do(() => this._store.dispatch(this._comicsActions.searchComicsByYearClear()))
      .do(() => this.startYear = null).subscribe();

    this.infiniteScrolling$
      .do(() => this._store.dispatch(this._comicsActions.loadComicsOffset()))
      .delayWhen(() => this._store
        .select(fromRoot.getComicsCompleteOffset)
        .filter(complete => complete))
      .map(infiniteScroll => infiniteScroll.complete()).subscribe();

    this._store.dispatch(this._comicsActions.loadComics());

  }

  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }


}
