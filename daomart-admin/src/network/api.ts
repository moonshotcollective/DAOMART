import GetUrl from './NETWORK_CONSTS';
import axios from 'axios';

export const GetTokenContracts = (token: string, data) =>
    axios({
        method: 'POST',
        url: GetUrl('contract/token'),
        data: data,
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    });
export const MakeNewTokenContract = (token: string, data) =>
    axios({
        method: 'POST',
        url: GetUrl('contract/token/new'),
        data: data,
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    });

export const GetProductContracts = (token: string, data) =>
    axios({
        method: 'POST',
        url: GetUrl('contract/product'),
        data: data,
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    });
export const MakeNewProductContract = (token: string, data) =>
    axios({
        method: 'POST',
        url: GetUrl('contract/product/new'),
        data: data,
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    });
export const GetUsers = (
    token: string,
    data?: {keyword?: string; address?: string; name?: string; badge?: string}
) =>
    axios({
        method: 'POST',
        url: GetUrl('user/query'),
        data: data,
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    });
export const GetUserById = (token: string, data?: {uid?: string}) =>
    axios({
        method: 'POST',
        url: GetUrl('user/id'),
        data: data,
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    });
export const GetHttpLogs = (
    token: string,
    data?: {
        keyword?: string;
        address?: string;
        user?: string;
        method?: string;
        route?: string;
    }
) =>
    axios({
        method: 'POST',
        url: GetUrl('logs/http'),
        data: data,
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    });

export const MakeNewProduct = (token: string, data: Product) =>
    axios({
        method: 'POST',
        url: GetUrl('product/new'),
        data: data,
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    });
export const GetProducts = (token: string) =>
    axios({
        method: 'GET',
        url: GetUrl('product'),
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    });
export const GetProductCategories = (token: string) =>
    axios({
        method: 'GET',
        url: GetUrl('category'),
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    });
export const MakeNewOrder = (token: string, data?: any) =>
    axios({
        method: 'POST',
        url: GetUrl('order/new'),
        data: data,
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    });
export const GetOrders = (token: string, data?: any) =>
    axios({
        method: 'POST',
        url: GetUrl('order/query'),
        data: data,
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    });
export const GetOrderById = (token: string, data?: any) =>
    axios({
        method: 'POST',
        url: GetUrl('order/oid'),
        data: data,
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    });
export const UpdateOrderStatus = (token: string, oid: string, status: string) =>
    axios({
        method: 'POST',
        url: GetUrl('order/update'),
        data: {oid: oid, status: status},
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    });
