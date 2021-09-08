import {ethers} from 'ethers';
import React from 'react';
import {getNetworkName} from '../util/network';
import {ACTIONS} from './actions';
declare const window: any;
type Action = {type: string; payload?: any};
type Dispatch = (action: Action) => void;

type State = {
    chain_id: string;
    profile: {name: string; user_id: string; address: string} | null;
    token: string;
    wallet: number;
    provider: any;
    wallets: string[];
    isAuth: 'NEED_AUTH' | 'AUTHED' | '';
    candyBalance: number | null;
    candyBalanceTrigger: boolean;
};
type GitcoinProviderProps = {children: React.ReactNode};

const profile = localStorage.getItem('profile');
const initialState: State = {
    chain_id: '42',
    profile: profile ? JSON.parse(profile) : null,
    token: localStorage.getItem('token') || '',
    wallet: 0,
    wallets: [],
    provider: null,
    isAuth: '',
    candyBalance: null,
    candyBalanceTrigger: false,
};

const GitcoinContext = React.createContext<{state: State; dispatch: Dispatch}>(
    initialState as any
);

const gitcoinReducer = (state: State, action: Action): State => {
    // console.log(action);

    switch (action.type) {
        case ACTIONS.SET_WALLETS: {
            return {
                ...state,
                wallets: [...action.payload],
            };
        }

        case ACTIONS.SETUP: {
            localStorage.setItem(
                'profile',
                JSON.stringify(action.payload.profile)
            );
            localStorage.setItem('token', action.payload.token);

            return {
                ...state,
                token: action.payload.token,
                profile: action.payload.profile,
                isAuth: '',
            };
        }

        case ACTIONS.SET_TOKEN: {
            return {
                ...state,
                token: action.payload,
            };
        }

        case ACTIONS.SET_PROFILE: {
            return {...state, profile: action.payload};
        }

        case ACTIONS.SET_CHAIN_ID: {
            return {
                ...state,
                chain_id: action.payload,
                provider: new ethers.providers.Web3Provider(
                    window.ethereum,
                    'any'
                ),
            };
        }

        case ACTIONS.SET_PROVIDER: {
            return {
                ...state,
                provider: action.payload,
            };
        }

        case ACTIONS.AUTHCHECK: {
            const isAuth =
                state.token && state.token !== '' ? 'AUTHED' : 'NEED_AUTH';
            return {
                ...state,
                isAuth: isAuth,
            };
        }

        case ACTIONS.RESETAUTH: {
            localStorage.removeItem('profile');
            localStorage.removeItem('token');

            return {
                ...state,
                token: '',
                profile: null,
                isAuth: 'NEED_AUTH',
            };
        }

        case ACTIONS.SET_CANDY_BALANCE: {
            return {
                ...state,
                candyBalance: action.payload,
            };
        }

        case ACTIONS.TRIGGER_CANDY_BALANCE: {
            return {
                ...state,
                candyBalanceTrigger: !state.candyBalanceTrigger,
            };
        }

        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
};

const GitcoinProvider = ({children}: GitcoinProviderProps) => {
    const [state, dispatch] = React.useReducer(gitcoinReducer, initialState);

    return (
        <GitcoinContext.Provider value={{state, dispatch}}>
            {children}
        </GitcoinContext.Provider>
    );
};
export {GitcoinContext, GitcoinProvider};
