import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { loginReducer, LoginState } from '../../login/store/reducers/login.reducer';
import { userReducer, UserState } from './user.reducer';


export interface AppState {
  user: UserState,
  login: LoginState,
}

export const reducers: ActionReducerMap<AppState> = {
  user: userReducer,
  login: loginReducer,
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
