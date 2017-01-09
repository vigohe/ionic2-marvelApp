import { Injectable } from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import {Observable} from "rxjs";

/*
  Generated class for the MarvelService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
export const API_MARLVEL = "https://gateway.marvel.com:443/v1/public/comics?apikey=9b87dae0e58fe8d0482c6d90a347c988&hash=59ac14f2bd20e50f967dc8765bfd5262&ts=1483976056";

@Injectable()
export class MarvelService {

  constructor(public http: Http) {
    console.log('Hello MarvelService Provider');
  }

  getComics(search? : any) : Observable<any>{

    let params: URLSearchParams = new URLSearchParams();


    if(search != null){
      params.set('titleStartsWith', search.title);
    }

    return this.http.get(API_MARLVEL, {search : params})
      .map(res => res.json());
  }

}
