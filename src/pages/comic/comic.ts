import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Store} from "@ngrx/store";
import {ComicsActions} from "../../actions/comics";
import * as fromRoot from "../../reducer/index";
import {Observable} from "rxjs";

/*
  Generated class for the Comic page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-comic',
  templateUrl: 'comic.html'
})
export class ComicPage {

  comic$ : Observable<any>;

  constructor(public navParams: NavParams,
              private _store : Store<fromRoot.State>,
              private _comicsActions : ComicsActions
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComicPage');
    this.comic$ = this._store.select(fromRoot.getSelectedComic);
    this._store.dispatch(this._comicsActions.loadComicCharacters());
  }



}
