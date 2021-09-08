import React from 'react';
import {GetOrders, GetOrderById} from '../network/api';

const useGetOrders = (token: string, data?: any): [Order[], boolean, any] => {
    const [orders, setorders] = React.useState<Order[]>([]);
    const [loading, setloading] = React.useState<boolean>(false);
    const [err, seterr] = React.useState<any>('');
    React.useMemo(async () => {
        if (!token) {
            return;
        }
        setloading(false);
        seterr(null);
        setorders([]);
        GetOrders(token, data)
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
    }, [token]);
    return [orders, loading, err];
};
const useGetOrderById = (
    token: string,
    oid?: string
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
        GetOrderById(token, {oid: oid})
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
    }, [token]);
    return [order, loading, err];
};

export {useGetOrders, useGetOrderById};