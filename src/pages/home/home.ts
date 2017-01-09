import {Component, Input, ViewChild} from '@angular/core';

import {NavController, Searchbar} from 'ionic-angular';
import {MarvelService} from "../../providers/marvel-service";
import {Observable, Subject} from "rxjs";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public comics$: Observable<any>;
  public comics: any [] = [];
  private inputSearch$: Subject<any> = new Subject();

  constructor(public navCtrl: NavController, private _marvelService: MarvelService) {

  }

  ionViewDidLoad() {
    console.log('Hello HomePage Page');

    this._marvelService.getComics()
      .map(res => res.data.results)
      .map(comics => this.comics = comics)
      .first()
      .subscribe();

    this.inputSearch$
      .takeUntil(this.navCtrl.viewWillUnload)
      .filter(ev => ev.type === 'input')
      .map(ev => ev.target.value)
      .debounceTime(1000)
      .distinctUntilChanged()
      .switchMap(text => text.length > 0 ?
        this._marvelService.getComics({title: text}) : this._marvelService.getComics())
      .map(res => res.data.results)
      .map(comics => this.comics = comics)
      .subscribe();

    this.inputSearch$
      .takeUntil(this.navCtrl.viewWillUnload)
      .filter(ev => ev.type === 'mousedown')
      .switchMapTo(
        this._marvelService.getComics()
        .map(res => res.data.results)
        .map(comics => this.comics = comics)
      ).subscribe();

  }

  getItems(ev: any) {
    this.inputSearch$.next(ev);
  }

  doInfinite(ev:any){
    console.log(ev);
  }

}
