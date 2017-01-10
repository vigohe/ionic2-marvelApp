/**
 * Created by vigohe on 10-01-17.
 */

import {Injectable} from "@angular/core";
import {Effect, Actions} from "@ngrx/effects";
import {Observable} from "rxjs";
import {Action, Store} from "@ngrx/store";
import {MarvelService} from "../providers/marvel-service";
import {LOAD_COMICS, ComicsActions, LOAD_COMICS_OFFSET, SEARCH_COMICS} from "../actions/comics";
import * as fromRoot from "../reducer/index";

@Injectable()
export class ComicsEffects {

  constructor(private _actions$: Actions, private _marvelService: MarvelService, private _comicsActions: ComicsActions, private _store: Store<fromRoot.State>) {
  }

  @Effect()
  loadComics$: Observable<Action> = this._actions$
    .ofType(LOAD_COMICS)
    .switchMap(() => this._marvelService.getComics({offset: 0}).catch(error => Observable.of(this._comicsActions.loadComicsFail(error))))
    .map(res => {
      return {offset: res.data.offset, entities: res.data.results};
    })
    .map(comics => this._comicsActions.loadComicsSuccess(comics));

  @Effect()
  loadComicsOffset$: Observable<Action> = this._actions$
    .ofType(LOAD_COMICS_OFFSET)
    .switchMap(() => Observable.zip( this._store.select(fromRoot.getComicsLimit).first(), this._store.select(fromRoot.getComicsOffset).first(), (limit,offset) => limit + offset ))
    .switchMap(offset => Observable.zip(Observable.of(offset), this._store.select(fromRoot.getComicsSearchTitle),(offset,searchTitle) => {
      return {offset : offset, title : searchTitle}
    }))
    .switchMap(search => this._marvelService.getComics(search).catch(error => Observable.of(this._comicsActions.loadComicsFail(error))))
    .map(res => {
      return {offset: res.data.offset, entities: res.data.results};
    })
    .map(comics => this._comicsActions.loadComicsOffsetSuccess(comics));

  @Effect()
  searchComics$ : Observable<Action> = this._actions$
    .ofType(SEARCH_COMICS)
    .map(action => action.payload)
    .switchMap(title => this._marvelService.getComics({offset: 0, title: title }).catch(error => Observable.of(this._comicsActions.loadComicsFail(error))))
    .map(res => res.data.results)
    .map(comics => this._comicsActions.searchComicsSuccess(comics));


}
