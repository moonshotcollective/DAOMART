import React from 'react';
import {
    GetProductContracts,
    GetQuadraticLootContracts,
    GetTokenContracts,
} from '../network/api';

const useGetTokenContracts = (
    token: string,
    {
        chain,
    }: {
        chain: string;
    }
): [TokenContract[], boolean, any] => {
    const [contracts, setcontracts] = React.useState<TokenContract[]>([]);
    const [loading, setloading] = React.useState<boolean>(false);
    const [err, seterr] = React.useState<any>('');
    React.useMemo(async () => {
        setloading(false);
        seterr(null);
        setcontracts([]);
        if (!token) {
            return;
        }
        if (!chain) {
            return;
        }
        GetTokenContracts(token, {chain: chain})
            .then((result) => {
                if (result.data.success) {
                    setcontracts(result.data.data);
                    setloading(false);
                    seterr(null);
                } else {
                    setloading(false);
                    seterr('Uknow Error');
                    setcontracts([]);
                }
            })
            .catch((err) => {
                setloading(false);
                seterr(err);
                setcontracts([]);
            });
    }, [token]);
    return [contracts, loading, err];
};

const useGetProductContracts = (
    token: string,
    {
        chain,
    }: {
        chain: string;
    }
): [ProductContract[], boolean, any] => {
    const [contracts, setcontracts] = React.useState<ProductContract[]>([]);
    const [loading, setloading] = React.useState<boolean>(false);
    const [err, seterr] = React.useState<any>('');
    React.useMemo(async () => {
        setloading(false);
        seterr(null);
        setcontracts([]);
        if (!token) {
            return;
        }
        if (!chain) {
            return;
        }

        GetProductContracts(token, {chain: chain})
            .then((result) => {
                if (result.data.success) {
                    setcontracts(result.data.data);
                    setloading(false);
                    seterr(null);
                } else {
                    setloading(false);
                    seterr('Uknow Error');
                    setcontracts([]);
                }
            })
            .catch((err) => {
                setloading(false);
                seterr(err);
                setcontracts([]);
            });
    }, [token]);
    return [contracts, loading, err];
};
const useGetQuadraticLootContracts = (
    token: string,
    {
        chain,
    }: {
        chain: string;
    }
): [QuadraticLootContract[], boolean, any] => {
    const [contracts, setcontracts] = React.useState<QuadraticLootContract[]>(
        []
    );
    const [loading, setloading] = React.useState<boolean>(false);
    const [err, seterr] = React.useState<any>('');
    React.useMemo(async () => {
        setloading(false);
        seterr(null);
        setcontracts([]);
        if (!token) {
            return;
        }
        if (!chain) {
            return;
        }

        GetQuadraticLootContracts(token, {chain: chain})
            .then((result) => {
                if (result.data.success) {
                    setcontracts(result.data.data);
                    setloading(false);
                    seterr(null);
                } else {
                    setloading(false);
                    seterr('Uknow Error');
                    setcontracts([]);
                }
            })
            .catch((err) => {
                setloading(false);
                seterr(err);
                setcontracts([]);
            });
    }, [token]);
    return [contracts, loading, err];
};

export {
    useGetTokenContracts,
    useGetProductContracts,
    useGetQuadraticLootContracts,
};
