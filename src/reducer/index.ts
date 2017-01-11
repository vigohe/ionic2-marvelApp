import * as fromComics from './comics';
import {ActionReducer, combineReducers, Action} from "@ngrx/store";
import {createSelector} from "reselect";

/**
 * Created by vigohe on 09-01-17.
 */

export interface State {
  comics: fromComics.State
}

const reducers = {
  comics: fromComics.reducer
};

export const reducer: ActionReducer<State> = combineReducers(reducers);

export const rootReducer = (state: State, action: Action) => {
  return reducer(state, action);
};

export const getComicsState = (state: State) => state.comics;

// Comics
export const getComicsEntities = createSelector(getComicsState,fromComics.getEntities);
export const getComicsLoading = createSelector(getComicsState,fromComics.getLoading);
export const getComicsComplete = createSelector(getComicsState,fromComics.getComplete);
export const getComicsLimit = createSelector(getComicsState, fromComics.getLimit);
export const getComicsOffset = createSelector(getComicsState, fromComics.getOffset);
export const getComicsLoadingOffset = createSelector(getComicsState,fromComics.getLoadingOffset);
export const getComicsCompleteOffset = createSelector(getComicsState,fromComics.getCompleteOffset);
export const getComicsSearchTitle = createSelector(getComicsState, fromComics.getSearchTitle);
export const getComicsStartYear = createSelector(getComicsState, fromComics.getStartYear);
export const getComicsNotFound = createSelector(getComicsState, fromComics.getNotFound);
