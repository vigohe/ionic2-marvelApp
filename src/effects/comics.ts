/**
 * Created by vigohe on 10-01-17.
 */

import {Injectable} from "@angular/core";
import {Effect, Actions} from "@ngrx/effects";
import {Observable} from "rxjs";
import {Action, Store} from "@ngrx/store";
import {MarvelService} from "../providers/marvel-service";
import {LOAD_COMICS, ComicsActions, LOAD_COMICS_OFFSET} from "../actions/comics";
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
    .zip(this._store.select(fromRoot.getComicsLimit).first(), this._store.select(fromRoot.getComicsOffset).first(), (limit,offset) => limit + offset)
    .do(x=>console.log("LOAD_COMICS_OFFSET",x))
    .switchMap(offset => this._marvelService.getComics({offset: offset}).catch(error => Observable.of(this._comicsActions.loadComicsFail(error))))
    .map(res => {
      return {offset: res.data.offset, entities: res.data.results};
    })
    .map(comics => this._comicsActions.loadComicsSuccess(comics));


}
