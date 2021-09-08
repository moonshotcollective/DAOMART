import axios from 'axios';
import {GetBaseUrl} from './NETWORK_CONSTS';

const GetNonce = (address: string): Promise<any> => {
    return axios.get(GetBaseUrl('auth/nonce/' + address));
};
const Login = (
    signedMessage: string,
    nonce: string,
    address: string,
    name: string
): Promise<any> => {
    return axios.post(GetBaseUrl('auth/login'), {
        signedMessage: signedMessage,
        nonce: nonce,
        address: address,
        name: name,
    });
};
export {GetNonce, Login};
