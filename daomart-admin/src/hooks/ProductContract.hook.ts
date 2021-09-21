import {ethers} from 'ethers';
import React from 'react';
import Web3 from 'web3';
import {getProductContractMeta} from '../contracts';
declare const window: any;
export const useGetProductContract = (address?: string) => {
    const [contract, setcontract] = React.useState<any>(null);
    const [loading, setloading] = React.useState<boolean>(false);
    const [err, seterr] = React.useState<any>('');
    React.useMemo(async () => {
        setloading(false);
        seterr(null);
        setcontract(null);

        if (!address) {
            return;
        }

        try {
            const metadata = await getProductContractMeta();
            let myweb3: any = new Web3(window.ethereum);
            const contract = new myweb3.eth.Contract(metadata.abi, address);
            setcontract(contract);
        } catch (err) {
            console.log('err', err);
            setloading(false);
            seterr(err);
            setcontract(null);
        }
    }, [address]);
    return [contract, loading, err];
};
export const useGetProductContractItems = (
    contract?: any
): [any[], boolean, any] => {
    const [items, setitems] = React.useState<any[]>([]);
    const [loading, setloading] = React.useState<boolean>(false);
    const [err, seterr] = React.useState<any>('');
    React.useMemo(async () => {
        setloading(false);
        seterr(null);
        setitems([]);
        if (!contract) {
            return;
        }

        try {
            contract.methods
                .getAllProducts()
                .call()
                .then((result) => {
                    setitems(result);
                    setloading(false);
                    seterr(null);
                })
                .catch((err) => {
                    console.log('err', err);
                    setloading(false);
                    seterr(err);
                    setitems([]);
                });
        } catch (err) {
            console.log('err', err);
            setloading(false);
            seterr(err);
            setitems([]);
        }
    }, [contract]);
    return [items, loading, err];
};

export const useGetProductQueue = (
    contract?: any,
    productId?: string,
    trigger: boolean = false
): [any[], boolean, any] => {
    const [queue, setqueue] = React.useState<any[]>([]);
    const [loading, setloading] = React.useState<boolean>(false);
    const [err, seterr] = React.useState<any>('');
    React.useMemo(async () => {
        setloading(false);
        seterr(null);
        setqueue([]);

        if (!contract || !productId) {
            return;
        }

        try {
            contract.methods
                .getQue(productId)
                .call()
                .then((result) => {
                    setqueue(result);
                    setloading(false);
                    seterr(null);
                })
                .catch((err) => {
                    console.log('err', err);
                    setloading(false);
                    seterr(err);
                    setqueue([]);
                });
        } catch (err) {
            console.log('err', err);
            setloading(false);
            seterr(err);
            setqueue([]);
        }
    }, [contract, productId, trigger]);
    return [queue, loading, err];
};

export const useGetProductJar = (
    contract?: any,
    productId?: string,
    trigger: boolean = false
): [string, boolean, any] => {
    const [jar, setjar] = React.useState<any>('');
    const [loading, setloading] = React.useState<boolean>(false);
    const [err, seterr] = React.useState<any>('');
    React.useMemo(async () => {
        setloading(false);
        seterr(null);
        setjar('');
        if (!contract || !productId) {
            return;
        }

        try {
            contract.methods
                .getJar(productId)
                .call()
                .then((result) => {
                    setjar(result);
                    setloading(false);
                    seterr(null);
                })
                .catch((err) => {
                    console.log('err', err);
                    setloading(false);
                    seterr(err);
                    setjar('');
                });
        } catch (err) {
            console.log('err', err);
            setloading(false);
            seterr(err);
            setjar('');
        }
    }, [contract, productId, trigger]);
    return [jar, loading, err];
};

export const useGetX = (
    contract: any,
    productId?: string,
    trigger = false
): [string | null, boolean, any] => {
    const [currentX, setcurrentX] = React.useState<string | null>(null);
    const [loading, setloading] = React.useState<boolean>(false);
    const [err, seterr] = React.useState<any>('');

    React.useMemo(async () => {
        if (!contract || !contract.methods) {
            return;
        }

        if (!productId) {
            return;
        }

        setloading(false);
        seterr(null);
        setcurrentX(null);

        try {
            contract.methods
                .currentX(productId)
                .call()
                .then((result) => {
                    setcurrentX(result);
                    setloading(false);
                    seterr(null);
                })
                .catch((err) => {
                    console.log('err', err);
                    setloading(false);
                    seterr(err);
                    setcurrentX(null);
                });
        } catch (err) {
            console.log('err', err);
            setloading(false);
            seterr(err);
            setcurrentX(null);
        }
    }, [contract, productId, trigger]);
    return [currentX, loading, err];
};
export const useGetCoefForId = (
    contract: any,
    productId?: string,
    trigger = false
): [string | null, boolean, any] => {
    const [coef, setcoef] = React.useState<string | null>(null);
    const [loading, setloading] = React.useState<boolean>(false);
    const [err, seterr] = React.useState<any>('');

    React.useMemo(async () => {
        if (!contract || !contract.methods) {
            return;
        }

        if (!productId) {
            return;
        }

        setloading(false);
        seterr(null);
        setcoef(null);

        try {
            contract.methods
                .coefficients(productId)
                .call()
                .then((result) => {
                    setcoef(result);
                    setloading(false);
                    seterr(null);
                })
                .catch((err) => {
                    console.log('err', err);
                    setloading(false);
                    seterr(err);
                    setcoef(null);
                });
        } catch (err) {
            console.log('err', err);
            setloading(false);
            seterr(err);
            setcoef(null);
        }
    }, [contract, productId, trigger]);
    return [coef, loading, err];
};
export const useGetQuantityForId = (
    contract: any,
    productId?: string,
    trigger = false
): [string | null, boolean, any] => {
    const [quantity, setquantity] = React.useState<string | null>(null);
    const [loading, setloading] = React.useState<boolean>(false);
    const [err, seterr] = React.useState<any>('');

    React.useMemo(async () => {
        if (!contract || !contract.methods) {
            return;
        }

        if (!productId) {
            return;
        }

        setloading(false);
        seterr(null);
        setquantity(null);

        try {
            contract.methods
                .quantities(productId)
                .call()
                .then((result) => {
                    setquantity(result);
                    setloading(false);
                    seterr(null);
                })
                .catch((err) => {
                    console.log('err', err);
                    setloading(false);
                    seterr(err);
                    setquantity(null);
                });
        } catch (err) {
            console.log('err', err);
            setloading(false);
            seterr(err);
            setquantity(null);
        }
    }, [contract, productId, trigger]);
    return [quantity, loading, err];
};
export const useGetQueueIndexForAddress = (
    contract: any,
    productId?: string | null,
    addr?: string | null,
    trigger = false
): [string | null, boolean, any] => {
    const [qIndex, setqIndex] = React.useState<string | null>(null);
    const [loading, setloading] = React.useState<boolean>(false);
    const [err, seterr] = React.useState<any>('');
    console.log('addr', addr);
    React.useMemo(async () => {
        if (!contract || !contract.methods) {
            return;
        }

        if (!productId) {
            return;
        }
        if (!addr) {
            return;
        }

        setloading(false);
        seterr(null);
        setqIndex(null);

        try {
            contract.methods
                .getQueueIndex(productId, addr)
                .call()
                .then((result) => {
                    setqIndex(result);
                    setloading(false);
                    seterr(null);
                })
                .catch((err) => {
                    console.log('err12', err);
                    setloading(false);
                    seterr(err);
                    setqIndex(null);
                });
        } catch (err) {
            console.log('err123', err);
            setloading(false);
            seterr(err);
            setqIndex(null);
        }
    }, [contract, productId, addr, trigger]);
    return [qIndex, loading, err];
};
export const useGetRemaningAmountForQueueIndex = (
    contract: any,
    productId?: string | null,
    qIndex?: string | null,
    trigger = false
): [string | null, boolean, any] => {
    const [remAmount, setremAmount] = React.useState<string | null>(null);
    const [loading, setloading] = React.useState<boolean>(false);
    const [err, seterr] = React.useState<any>('');

    React.useMemo(async () => {
        if (!contract || !contract.methods) {
            return;
        }

        if (!productId) {
            return;
        }
        if (!qIndex) {
            return;
        }

        setloading(false);
        seterr(null);
        setremAmount(null);

        try {
            contract.methods
                .getRemaningAmountForIndexInQueue(productId, qIndex)
                .call()
                .then((result) => {
                    setremAmount(result);
                    setloading(false);
                    seterr(null);
                })
                .catch((err) => {
                    console.log('err', err);
                    setloading(false);
                    seterr(err);
                    setremAmount(null);
                });
        } catch (err) {
            console.log('err', err);
            setloading(false);
            seterr(err);
            setremAmount(null);
        }
    }, [contract, productId, qIndex, trigger]);
    return [remAmount, loading, err];
};

export const useGetEtherAmountForX = (
    contract: any,
    productId?: string,
    x?: string | null,
    trigger = false
): [string | null, boolean, any] => {
    const [currentPriceChange, setcurrentPriceChange] = React.useState<
        string | null
    >(null);
    const [loading, setloading] = React.useState<boolean>(false);
    const [err, seterr] = React.useState<any>('');

    React.useMemo(async () => {
        setloading(false);
        seterr(null);
        setcurrentPriceChange(null);
        if (!contract || !contract.methods) {
            return;
        }

        if (!productId) {
            return;
        }

        if (!x) {
            return;
        }
        console.log('x', x);
        try {
            setloading(true);
            contract.methods
                .getEtherAmountForX(productId, x, 4)
                .call()
                .then((result) => {
                    setcurrentPriceChange(
                        ethers.utils.formatEther(result).toString()
                    );
                    setloading(false);
                    seterr(null);
                })
                .catch((err) => {
                    console.log('err', err);
                    setloading(false);
                    seterr(err);
                    setcurrentPriceChange(null);
                });
        } catch (err) {
            console.log('err', err);
            setloading(false);
            seterr(err);
            setcurrentPriceChange(null);
        }
    }, [contract, productId, x, trigger]);
    return [currentPriceChange, loading, err];
};
