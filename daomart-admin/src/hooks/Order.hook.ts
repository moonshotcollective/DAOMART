import React from 'react';
import {GetOrders, GetOrderById} from '../network/api';

const useGetOrders = (
    token: string,
    trigger = false
): [Order[], boolean, any] => {
    const [orders, setorders] = React.useState<Order[]>([]);
    const [loading, setloading] = React.useState<boolean>(false);
    const [err, seterr] = React.useState<any>('');
    React.useMemo(async () => {
        setloading(false);
        seterr(null);
        setorders([]);
        if (!token) {
            return;
        }

        GetOrders(token, {})
            .then((result) => {
                if (result.data.success) {
                    setorders(result.data.data);
                    setloading(false);
                    seterr(null);
                } else {
                    setloading(false);
                    seterr('Uknow Error');
                    setorders([]);
                }
            })
            .catch((err) => {
                setloading(false);
                seterr(err);
                setorders([]);
            });
    }, [token, trigger]);
    return [orders, loading, err];
};

const useGetOrdersByUser = (
    token: string,
    user?: string,
    trigger = false
): [Order[], boolean, any] => {
    const [orders, setorders] = React.useState<Order[]>([]);
    const [loading, setloading] = React.useState<boolean>(false);
    const [err, seterr] = React.useState<any>('');
    React.useMemo(async () => {
        setloading(false);
        seterr(null);
        setorders([]);
        if (!token) {
            return;
        }
        if (!user) {
            return;
        }

        GetOrders(token, {user})
            .then((result) => {
                if (result.data.success) {
                    setorders(result.data.data);
                    setloading(false);
                    seterr(null);
                } else {
                    setloading(false);
                    seterr('Uknow Error');
                    setorders([]);
                }
            })
            .catch((err) => {
                setloading(false);
                seterr(err);
                setorders([]);
            });
    }, [token, user, trigger]);
    return [orders, loading, err];
};

const useGetOrdersByProduct = (
    token: string,
    product?: string,
    trigger = false
): [Order[], boolean, any] => {
    const [orders, setorders] = React.useState<Order[]>([]);
    const [loading, setloading] = React.useState<boolean>(false);
    const [err, seterr] = React.useState<any>('');
    React.useMemo(async () => {
        setloading(false);
        seterr(null);
        setorders([]);
        if (!token) {
            return;
        }
        if (!product) {
            return;
        }

        GetOrders(token, {item: product})
            .then((result) => {
                if (result.data.success) {
                    setorders(result.data.data);
                    setloading(false);
                    seterr(null);
                } else {
                    setloading(false);
                    seterr('Uknow Error');
                    setorders([]);
                }
            })
            .catch((err) => {
                setloading(false);
                seterr(err);
                setorders([]);
            });
    }, [token, product, trigger]);
    return [orders, loading, err];
};

const useGetOrderById = (
    token: string,
    oid?: string,
    trigger = false
): [Order | null, boolean, any] => {
    const [order, setorder] = React.useState<Order | null>(null);
    const [loading, setloading] = React.useState<boolean>(false);
    const [err, seterr] = React.useState<any>('');
    React.useMemo(async () => {
        if (!token || !oid) {
            return;
        }
        setloading(false);
        seterr(null);
        setorder(null);
        GetOrderById(token, oid)
            .then((result) => {
                if (result.data.success) {
                    setorder(result.data.data);
                    setloading(false);
                    seterr(null);
                } else {
                    setloading(false);
                    seterr('Uknow Error');
                    setorder(null);
                }
            })
            .catch((err) => {
                setloading(false);
                seterr(err);
                setorder(null);
            });
    }, [token, oid, trigger]);
    return [order, loading, err];
};

export {
    useGetOrders,
    useGetOrderById,
    useGetOrdersByProduct,
    useGetOrdersByUser,
};
