import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { IAppState } from '../models/app.models';
import { appReducer } from './app.reducer';
import { environment } from '../../environment/environment';

export interface IState {
  app: IAppState;
}

export const reducers: ActionReducerMap<IState> = {
  app: appReducer
};

export const metaReducers: MetaReducer<IState>[] = !environment.production
  ? []
  : [];
