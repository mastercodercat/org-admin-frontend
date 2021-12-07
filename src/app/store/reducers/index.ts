import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { loginReducer, LoginState } from 'src/app/login/store/reducers/login.reducer';
import { environment } from '../../../environments/environment';
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
