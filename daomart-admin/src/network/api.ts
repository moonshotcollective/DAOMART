import GetUrl from './NETWORK_CONSTS';
import axios from 'axios';

export const GetCandyContractMetadata = (token: string, data) =>
    axios({
        method: 'POST',
        url: GetUrl('contract/candy'),
        data: data,
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    });
export const GetQuadraticLootContracts = (token: string, data) =>
    axios({
        method: 'POST',
        url: GetUrl('contract/quadratic-loot'),
        data: data,
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    });

export const MakeNewQuadraticLootContract = (token: string, data) =>
    axios({
        method: 'POST',
        url: GetUrl('contract/quadratic-loot/new'),
        data: data,
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    });
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
export const UpdateUserBadge = (
    token: string,
    {uid, badge}: {uid: string; badge: string}
) =>
    axios({
        method: 'POST',
        url: GetUrl('user/update-badge'),
        data: {uid, badge},
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    });
export const UpdateUserStatus = (
    token: string,
    {uid, status}: {uid: string; status: string}
) =>
    axios({
        method: 'POST',
        url: GetUrl('user/update-status'),
        data: {uid, status},
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
export const GetUniqueLogsByIp = (token: string) =>
    axios({
        method: 'POST',
        url: GetUrl('logs/unique-ip'),

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

export const GetProductById = (token: string, pid: any) =>
    axios({
        method: 'POST',
        url: GetUrl('product/pid'),
        data: {pid: pid},
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    });
export const UpdateProductStatus = (
    token: string,
    pid: string,
    status: string
) =>
    axios({
        method: 'POST',
        url: GetUrl('product/update'),
        data: {pid: pid, status: status},
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    });
export const MakeNewProductCategory = (token: string, data: ProductCategory) =>
    axios({
        method: 'POST',
        url: GetUrl('category/new'),
        data: data,
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    });
export const GetProductCategories = (
    token: string,
    data?: CategorySearchParams
) =>
    axios({
        method: 'POST',
        url: GetUrl('category'),
        data: data,
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    });
export const GetCategoryById = (token: string, cid: any) =>
    axios({
        method: 'POST',
        url: GetUrl('category/cid'),
        data: {cid: cid},
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
export const GetOrders = (token: string, {item, user}: OrderSearchParams) =>
    axios({
        method: 'POST',
        url: GetUrl('order/query'),
        data: {item: item, user: user},
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    });
export const GetOrderById = (token: string, oid: any) =>
    axios({
        method: 'POST',
        url: GetUrl('order/oid'),
        data: {oid: oid},
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

export const GetLobby = (token: string) =>
    axios({
        method: 'POST',
        url: GetUrl('user/lobby'),
        data: JSON.stringify({}),
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    });
