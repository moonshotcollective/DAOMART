import React from 'react';
import {GetProducts, GetProductCategories} from '../network/api';

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

export {useGetProducts, useGetProductCategories};
