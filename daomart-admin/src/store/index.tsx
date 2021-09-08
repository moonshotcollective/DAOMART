import {ethers} from 'ethers';
import React from 'react';
import {getNetworkName} from '../util/network';
import {ACTIONS} from './actions';
declare const window: any;
type Action = {type: string; payload?: any};
type Dispatch = (action: Action) => void;

type State = {
    chain_id: string;
    profile: {name: string; user_id: string; address: string};
    token: string;
    wallet: number;
    provider: any;
    wallets: string[];
    drawerOpen: boolean;
};
type GitcoinProviderProps = {children: React.ReactNode};

const initialState: State = {
    chain_id: '42',
    profile: JSON.parse(
        localStorage.getItem('profile') ||
            JSON.stringify({
                name: '',
                user_id: '',
                address: '',
            })
    ),
    token: localStorage.getItem('token') || '',
    wallet: 0,
    wallets: [],
    provider: null,
    drawerOpen: false,
};

const GitcoinContext = React.createContext<{state: State; dispatch: Dispatch}>(
    initialState as any
);

const gitcoinReducer = (state: State, action: Action): State => {
    // console.log(action);

    switch (action.type) {
        case ACTIONS.TOGGLE_DRAWER: {
            return {
                ...state,
                drawerOpen: !state.drawerOpen,
            };
        }

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
