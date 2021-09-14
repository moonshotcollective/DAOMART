import React from 'react';
import {GetCategoryById} from './../network/api';

const useGetCategoryById = (
    token: string,
    cid?: string,
    trigger = false
): [ProductCategory | null, boolean, any] => {
    const [product, setproduct] = React.useState<ProductCategory | null>(null);
    const [loading, setloading] = React.useState<boolean>(false);
    const [err, seterr] = React.useState<any>('');
    React.useMemo(async () => {
        if (!token || !cid) {
            return;
        }
        setloading(false);
        seterr(null);
        setproduct(null);
        GetCategoryById(token, cid)
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
    }, [token, cid, trigger]);
    return [product, loading, err];
};
export {useGetCategoryById};
