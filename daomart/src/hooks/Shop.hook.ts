import React from 'react';
import {GetProducts, GetProduct, GetProductCategories} from '../network/api';

const useGetProducts = (token?: string): [Product[], boolean, any] => {
    const [products, setproducts] = React.useState<Product[]>([]);
    const [loading, setloading] = React.useState<boolean>(false);
    const [err, seterr] = React.useState<any>('');
    React.useMemo(async () => {
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
const useGetProduct = (
    token?: string,
    pid?: string
): [Product | null, boolean, any] => {
    const [products, setproducts] = React.useState<Product | null>(null);
    const [loading, setloading] = React.useState<boolean>(false);
    const [err, seterr] = React.useState<any>('');
    React.useMemo(async () => {
        setloading(false);
        seterr(null);
        setproducts(null);
        if (!token) {
            return;
        }
        if (!pid) {
            return;
        }
        GetProduct(token, pid)
            .then((result) => {
                if (result.data.success) {
                    setproducts(result.data.data);
                    setloading(false);
                    seterr(null);
                } else {
                    setloading(false);
                    seterr('Uknow Error');
                    setproducts(null);
                }
            })
            .catch((err) => {
                setloading(false);
                seterr(err);
                setproducts(null);
            });
    }, [token]);
    return [products, loading, err];
};
const useGetProductCategories = (
    token?: string
): [ProductCategory[], boolean, any] => {
    const [productcat, setproductcat] = React.useState<ProductCategory[]>([]);
    const [loading, setloading] = React.useState<boolean>(false);
    const [err, seterr] = React.useState<any>('');
    React.useMemo(async () => {
        setloading(false);
        seterr(null);
        setproductcat([]);
        GetProductCategories(token)
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
    }, [token]);
    return [productcat, loading, err];
};

export {useGetProducts, useGetProduct, useGetProductCategories};
