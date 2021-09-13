import React from 'react';
import {GetProducts, GetProductCategories} from '../network/api';
import {GetProductById} from './../network/api';

const useGetProducts = (token: string): [Product[], boolean, any] => {
    const [products, setproducts] = React.useState<Product[]>([]);
    const [loading, setloading] = React.useState<boolean>(false);
    const [err, seterr] = React.useState<any>('');
    React.useMemo(async () => {
        if (!token) {
            return;
        }
        setloading(false);
        seterr(null);
        setproducts([]);
        GetProducts(token)
            .then((result) => {
                if (result.data.success) {
                    setproducts(result.data.data);
                    setloading(false);
                    seterr(null);
                } else {
                    setloading(false);
                    seterr('Uknow Error');
                    setproducts([]);
                }
            })
            .catch((err) => {
                setloading(false);
                seterr(err);
                setproducts([]);
            });
    }, [token]);
    return [products, loading, err];
};
const useGetProductCategories = (
    token: string,
    data?: CategorySearchParams
): [ProductCategory[], boolean, any] => {
    const [productcat, setproductcat] = React.useState<ProductCategory[]>([]);
    const [loading, setloading] = React.useState<boolean>(false);
    const [err, seterr] = React.useState<any>('');
    React.useMemo(async () => {
        if (!token) {
            return;
        }
        setloading(false);
        seterr(null);
        setproductcat([]);
        GetProductCategories(token, data)
            .then((result) => {
                if (result.data.success) {
                    setproductcat(result.data.data);
                    setloading(false);
                    seterr(null);
                } else {
                    setloading(false);
                    seterr('Uknow Error');
                    setproductcat([]);
                }
            })
            .catch((err) => {
                setloading(false);
                seterr(err);
                setproductcat([]);
            });
    }, [token, data?.keyword]);
    return [productcat, loading, err];
};
const useGetProductById = (
    token: string,
    pid?: string,
    trigger = false
): [Product | null, boolean, any] => {
    const [product, setproduct] = React.useState<Product | null>(null);
    const [loading, setloading] = React.useState<boolean>(false);
    const [err, seterr] = React.useState<any>('');
    React.useMemo(async () => {
        if (!token || !pid) {
            return;
        }
        setloading(false);
        seterr(null);
        setproduct(null);
        GetProductById(token, pid)
            .then((result) => {
                if (result.data.success) {
                    setproduct(result.data.data);
                    setloading(false);
                    seterr(null);
                } else {
                    setloading(false);
                    seterr('Uknow Error');
                    setproduct(null);
                }
            })
            .catch((err) => {
                setloading(false);
                seterr(err);
                setproduct(null);
            });
    }, [token, pid, trigger]);
    return [product, loading, err];
};
export {useGetProducts, useGetProductCategories, useGetProductById};
