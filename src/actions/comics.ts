import {Injectable} from "@angular/core";
import {Action} from "@ngrx/store";
/**
 * Created by vigohe on 09-01-17.
 */

export const LOAD_COMICS = 'LOAD_COMICS';
export const LOAD_COMICS_SUCCESS = 'LOAD_COMICS_SUCCESS';
export const LOAD_COMICS_FAIL = 'LOAD_COMICS_FAIL';
export const LOAD_COMICS_OFFSET = 'LOAD_COMICS_OFFSET';
export const SELECTED_COMIC = 'SELECTED_COMIC';
export const LOAD_COMICS_OFFSET_SUCCESS = 'LOAD_COMICS_OFFSET_SUCCESS';
export const SEARCH_COMICS = 'SEARCH_COMICS';
export const SEARCH_COMICS_SUCCESS = 'SEARCH_COMICS_SUCCESS';
export const SEARCH_COMICS_BY_YEAR = 'SEARCH_COMICS_BY_YEAR';
export const SEARCH_COMICS_BY_YEAR_SUCCESS = 'SEARCH_COMICS_BY_YEAR_SUCCESS';
export const SEARCH_COMICS_CLEAR = 'SEARCH_COMICS_CLEAR';
export const SEARCH_COMICS_BY_YEAR_CLEAR = 'SEARCH_COMICS_BY_YEAR_CLEAR';


@Injectable()
export class ComicsActions{

  loadComics() : Action{
    return {
      type: LOAD_COMICS,
      payload: 0
    };
  }

  loadComicsSuccess(comics : any) : Action {
    return {
      type: LOAD_COMICS_SUCCESS,
      payload: {
        entities: comics.entities,
        offset: comics.offset
      }
    };
  }

  loadComicsFail(error : any) : Action {
    return {
      type: LOAD_COMICS_FAIL,
      payload: error
    };
  }

  loadComicsOffset() : Action {
    return {
      type: LOAD_COMICS_OFFSET
    };

  }

  loadComicsOffsetSuccess(comics : any) : Action {
    return {
      type: LOAD_COMICS_OFFSET_SUCCESS,
      payload: {
        entities: comics.entities,
        offset: comics.offset
      }
    };
  }

  searchComics(title : string) : Action {
    return {
      type: SEARCH_COMICS,
      payload: title
    };
  }

  searchComicsSuccess(comics : any) : Action {
    return {
      type: SEARCH_COMICS_SUCCESS,
      payload: comics
    };
  }

  searchComicsByYear(year : number) : Action {
    return {
      type: SEARCH_COMICS_BY_YEAR,
      payload: year
    }
  }

  searchComicsByYearSuccess(comics : any) : Action {
    return {
      type: SEARCH_COMICS_SUCCESS,
      payload: comics
    };
  }

  searchComicsClear() : Action {
    return {
      type: SEARCH_COMICS_CLEAR
    }
  }

  searchComicsByYearClear() : Action {
    return {
      type: SEARCH_COMICS_BY_YEAR_CLEAR
    }
  }


}
