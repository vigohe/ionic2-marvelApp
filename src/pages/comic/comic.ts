import {Component, OnDestroy} from '@angular/core';
import {NavController, NavParams, Alert, AlertController} from 'ionic-angular';
import {Store} from "@ngrx/store";
import {ComicsActions} from "../../actions/comics";
import * as fromRoot from "../../reducer/index";
import {Observable, Subject} from "rxjs";

/*
  Generated class for the Comic page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-comic',
  templateUrl: 'comic.html'
})
export class ComicPage implements OnDestroy{

  comic$ : Observable<any>;
  characters$: Observable<any>;
  isDescriptionEmpty$: Observable<boolean>;
  isCharacterEmpty$: Observable<boolean>;
  destroy$: Subject<any> = new Subject();

  constructor(public navParams: NavParams,
              private _store : Store<fromRoot.State>,
              private _comicsActions : ComicsActions,
              public alertCtrl : AlertController
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComicPage');

    this.comic$ = this.getComic();
    this.characters$ = this.getCharacters();
    this.isDescriptionEmpty$ = this.isDescriptionEmpty();
    this.isCharacterEmpty$ = this.isCharacterEmpty();
    this.onErrorCharacters();
    this.loadCharacters();

  }

  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  private getComic() : Observable<any> {
    return this._store.select(fromRoot.getSelectedComic);
  }

  private getCharacters() : Observable<any>{
    return this._store.select(fromRoot.getComicCharacters);
  }

  loadCharacters(){
    this._store.dispatch(this._comicsActions.loadComicCharacters());
  }

  private isDescriptionEmpty() : Observable<boolean> {
    return this.isDescriptionEmpty$ = this.getComic()
      .map(comic => comic.description)
      .map(description => description === null);
  }

  private isCharacterEmpty() : Observable<boolean> {
    return this.isCharacterEmpty$ = this.getCharacters()
      .map(characters => characters.length === 0);
  }

  createAlert() : Alert{
    return this.alertCtrl.create({
      title: 'Error',
      subTitle: "Ups!!! We can't retrieve the list of characters, try later...",
      buttons: ['OK']
    });
  }

  private onErrorCharacters() {
    this._store.select(fromRoot.getErrorCharacters)
      .filter(isError => isError)
      .map(() => this.createAlert())
      .do(alert => alert.present())
      .takeUntil(this.destroy$)
      .subscribe();
  }


}
