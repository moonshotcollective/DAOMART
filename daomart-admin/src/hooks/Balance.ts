import {BaseProvider} from '@ethersproject/providers';

import React from 'react';

const useGetBalance = (addr: string, provider: BaseProvider) => {
    const [balance, setbalance] = React.useState('');
    React.useMemo(async () => {
        if (addr && provider) {
            try {
                let a = Number(await provider.getBalance(addr)) / 1e18;
                let b = parseFloat(a.toString()).toFixed(2);
                setbalance(b);
            } catch (error) {}
        } else {
            setbalance('');
        }
    }, [addr, provider]);
    return balance;
};

export {useGetBalance};
