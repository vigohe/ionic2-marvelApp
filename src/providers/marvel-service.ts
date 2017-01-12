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

const API_KEY = "?apikey=9b87dae0e58fe8d0482c6d90a347c988&hash=59ac14f2bd20e50f967dc8765bfd5262&ts=1483976056&limit=5";
const API_MARVEL = "https://gateway.marvel.com:443/v1/public";

@Injectable()
export class MarvelService {

  constructor(public http: Http) {
    console.log('Hello MarvelService Provider');
  }

  getComics(search? : any) : Observable<any>{

    let params: URLSearchParams = new URLSearchParams();

    if(search != null){
      if(search.title != null) params.set('titleStartsWith', search.title);
      if(search.offset != null) params.set('offset', search.offset);
      if(search.startYear != null) params.set('startYear', search.startYear);
    }

    return this.http.get(API_MARVEL + "/comics" + API_KEY, {search : params})
      .map(res => res.json());
  }

  getCharacters(comicId : number){
    return this.http.get(API_MARVEL+"/comics/"+comicId+"/characters" + API_KEY)
      .map(res => res.json());
  }

}
