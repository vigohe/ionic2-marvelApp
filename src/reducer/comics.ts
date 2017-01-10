import {
  LOAD_COMICS, LOAD_COMICS_SUCCESS, LOAD_COMICS_FAIL, LOAD_COMICS_OFFSET,
  LOAD_COMICS_OFFSET_SUCCESS
} from "../actions/comics";
import {Action} from "@ngrx/store";
/**
 * Created by vigohe on 09-01-17.
 */

export interface State{
  entities : any [],
  loading : boolean,
  complete : boolean,
  selectedComicId: number | null,
  offset : number,
  limit : number,
  loadingOffset : boolean,
  completeOffset : boolean
}

const initialState : State = {
  entities: [],
  loading: false,
  complete: false,
  selectedComicId: null,
  offset : 0,
  limit : 5,
  loadingOffset : false,
  completeOffset : false
};

export function reducer(state = initialState, action : Action) : State {

  switch (action.type){

    case LOAD_COMICS:
      return Object.assign({}, state, {
        loading: true,
        complete: false
      });

    case LOAD_COMICS_SUCCESS:
      return {
        entities : state.entities.concat(action.payload.entities),
        loading : false,
        complete : true,
        selectedComicId : null,
        offset : action.payload.offset,
        limit : 5,
        loadingOffset: false,
        completeOffset: false
      };

    case LOAD_COMICS_OFFSET:
      return Object.assign({}, state, {
        loadingOffset : true,
        completeOffset : false
      });

    case LOAD_COMICS_OFFSET_SUCCESS:
      return {
        entities : state.entities.concat(action.payload.entities),
        loading : false,
        complete : true,
        selectedComicId : null,
        offset : action.payload.offset,
        limit : 5,
        loadingOffset: false,
        completeOffset: true
      };

    default:
      return state;
  }

}

// SELECTORS
export const getLoading = (state: State) => state.loading;
export const getComplete = (state: State) => state.complete;
export const getEntities = (state: State) => state.entities;
export const getLimit = (state: State) => state.limit;
export const getOffset = (state: State) => state.offset;
export const getLoadingOffset = (state: State) => state.loadingOffset;
export const getCompleteOffset = (state: State) => state.completeOffset;
