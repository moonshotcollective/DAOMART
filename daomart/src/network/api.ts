import axios from 'axios';
import GetUrl from './NETWORK_CONSTS';

export const GetCandyContract = (token?: string, data?: any) =>
    axios({
        method: 'POST',
        url: GetUrl('contract/candy'),
        data: data,
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    });
export const GetProducts = (token?: string) =>
    axios({
        method: 'GET',
        url: GetUrl('product'),
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    });
export const GetProduct = (token?: string, pid?: string) =>
    axios({
        method: 'POST',
        url: GetUrl('product/pid'),
        data: {pid: pid},
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    });
export const GetProductCategories = (token?: string) =>
    axios({
        method: 'GET',
        url: GetUrl('categories'),
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    });
export const MakeOrder = (token?: string, data?: any) =>
    axios({
        method: 'POST',
        url: GetUrl('order/new'),
        data: data,
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    });
