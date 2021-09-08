import {ethers} from 'ethers';
import React from 'react';

declare const window: any;

const useGetAllProducts = (contract: any): [string[], boolean, any] => {
    const [projects, setprojects] = React.useState<string[]>([]);
    const [loading, setloading] = React.useState<boolean>(false);
    const [err, seterr] = React.useState<any>(null);
    React.useMemo(async () => {
        if (!contract || !contract.methods) {
            return;
        }
        setloading(false);
        seterr(null);
        setprojects([]);

        try {
            contract.methods
                .getAllProducts()
                .call()
                .then((result) => {
                    setprojects(result);
                    setloading(false);
                    seterr(null);
                })
                .catch((err) => {
                    console.log('err', err);
                    setloading(false);
                    seterr(err);
                    setprojects([]);
                });
        } catch (err) {
            console.log('err1121', err);
            setloading(false);
            seterr(err);
            setprojects([]);
        }
    }, [contract]);
    return [projects, loading, err];
};

const useGetXByIndex = (
    contract: any,
    id?: string,
    trigger = false
): [string, boolean, any] => {
    const [currentX, setcurrentX] = React.useState<string>('');
    const [loading, setloading] = React.useState<boolean>(false);
    const [err, seterr] = React.useState<any>('');

    React.useMemo(async () => {
        if (!contract || !contract.methods) {
            return;
        }

        if (!id) {
            return;
        }

        setloading(false);
        seterr(null);
        setcurrentX('');

        try {
            contract.methods
                .currentX(id)
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
                    setcurrentX('');
                });
        } catch (err) {
            console.log('err', err);
            setloading(false);
            seterr(err);
            setcurrentX('');
        }
    }, [contract, id, trigger]);
    return [currentX, loading, err];
};

const useGetEtherAmountForX = (
    contract: any,
    x?: string,
    trigger = false
): [string, boolean, any] => {
    const [currentPriceChange, setcurrentPriceChange] =
        React.useState<string>('');
    const [loading, setloading] = React.useState<boolean>(false);
    const [err, seterr] = React.useState<any>('');

    React.useMemo(async () => {
        setloading(false);
        seterr(null);
        setcurrentPriceChange('');
        if (!contract || !contract.methods) {
            return;
        }

        if (!x) {
            return;
        }

        try {
            setloading(true);
            contract.methods
                .getEtherAmountForX(x)
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
                    setcurrentPriceChange('');
                });
        } catch (err) {
            console.log('err', err);
            setloading(false);
            seterr(err);
            setcurrentPriceChange('');
        }
    }, [contract, x, trigger]);
    return [currentPriceChange, loading, err];
};
const useGetCandyAmountForX = (
    contract: any,
    x?: string,
    trigger = false
): [string, boolean, any] => {
    const [currentPriceChange, setcurrentPriceChange] =
        React.useState<string>('');
    const [loading, setloading] = React.useState<boolean>(false);
    const [err, seterr] = React.useState<any>('');

    React.useMemo(async () => {
        setloading(false);
        seterr(null);
        setcurrentPriceChange('');
        if (!contract || !contract.methods) {
            return;
        }

        if (!x) {
            return;
        }

        try {
            setloading(true);
            contract.methods
                .getCandyAmountForX(x)
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
                    setcurrentPriceChange('');
                });
        } catch (err) {
            console.log('err', err);
            setloading(false);
            seterr(err);
            setcurrentPriceChange('');
        }
    }, [contract, x, trigger]);
    return [currentPriceChange, loading, err];
};

const useGetPriceChangeForPrice = (
    contract?: any,
    initAmount?: string,
    trigger = false
): [string, boolean, any] => {
    const [amount, setamount] = React.useState<string>('');
    const [loading, setloading] = React.useState<boolean>(false);
    const [err, seterr] = React.useState<any>('');

    React.useMemo(async () => {
        if (!contract || !contract.methods) {
            return;
        }
        if (!initAmount) {
            return;
        }
        setloading(false);
        seterr(null);
        setamount('');

        try {
            setloading(true);
            contract.methods
                .getPriceChangeForPrice(initAmount)
                .call()
                .then((result) => {
                    console.log('result', result);
                    setamount(ethers.utils.formatEther(result).toString());
                    setloading(false);
                    seterr(null);
                })
                .catch((err) => {
                    console.log('err', err);
                    setloading(false);
                    seterr(err);
                    setamount('');
                });
        } catch (err) {
            console.log('err', err);
            setloading(false);
            seterr(err);
            setamount('');
        }
    }, [contract, initAmount, trigger]);
    return [amount, loading, err];
};

const useGetInterestPerBlock = (
    contract?: any,
    initAmount?: any
): [string, boolean, any] => {
    const [amount, setamount] = React.useState<string>('');
    const [loading, setloading] = React.useState<boolean>(false);
    const [err, seterr] = React.useState<any>('');

    React.useMemo(async () => {
        if (!contract || !contract.methods) {
            return;
        }
        if (!initAmount) {
            return;
        }

        setloading(false);
        seterr(null);
        setamount('');

        try {
            setloading(true);
            contract.methods
                .getInterestPerBlock(initAmount)
                .call()
                .then((result) => {
                    setamount(ethers.utils.formatEther(result).toString());
                    setloading(false);
                    seterr(null);
                })
                .catch((err) => {
                    console.log('err', err);
                    setloading(false);
                    seterr(err);
                    setamount('');
                });
        } catch (err) {
            console.log('err', err);
            setloading(false);
            seterr(err);
            setamount('');
        }
    }, [contract, initAmount]);
    return [amount, loading, err];
};

const useGetCurrentPaid = (
    contract?: any,
    id?: string,
    addr?: string,
    trigger = false
): [string, boolean, any] => {
    const [amount, setamount] = React.useState<string>('');
    const [loading, setloading] = React.useState<boolean>(false);
    const [err, seterr] = React.useState<any>('');

    React.useMemo(async () => {
        if (!contract || !contract.methods) {
            return;
        }
        if (!id || !addr) {
            return;
        }

        setloading(false);
        seterr(null);
        setamount('');

        try {
            setloading(true);
            contract.methods
                .amountPaid(id, addr)
                .call()
                .then((result) => {
                    setamount(ethers.utils.formatEther(result).toString());
                    setloading(false);
                    seterr(null);
                })
                .catch((err) => {
                    console.log('err', err);
                    setloading(false);
                    seterr(err);
                    setamount('');
                });
        } catch (err) {
            console.log('err', err);
            setloading(false);
            seterr(err);
            setamount('');
        }
    }, [contract, id, addr, trigger]);
    return [amount, loading, err];
};

const useGetCurrentStreak = (
    contract?: any,
    id?: string,
    addr?: string,
    trigger = false
): [string, boolean, any] => {
    const [streak, setstreak] = React.useState<string>('');
    const [loading, setloading] = React.useState<boolean>(false);
    const [err, seterr] = React.useState<any>('');

    React.useMemo(async () => {
        if (!contract || !contract.methods) {
            return;
        }
        if (!id || !addr) {
            return;
        }

        setloading(false);
        seterr(null);
        setstreak('');

        try {
            setloading(true);
            contract.methods
                .currentStreaks(id, addr)
                .call()
                .then((result) => {
                    setstreak(result);
                    setloading(false);
                    seterr(null);
                })
                .catch((err) => {
                    console.log('err', err);
                    setloading(false);
                    seterr(err);
                    setstreak('');
                });
        } catch (err) {
            console.log('err', err);
            setloading(false);
            seterr(err);
            setstreak('');
        }
    }, [contract, id, addr, trigger]);
    return [streak, loading, err];
};

const useGetLastPaidBlock = (
    contract?: any,
    id?: string,
    addr?: string,
    trigger = false
): [string, boolean, any] => {
    const [lastBlockPaid, setlastBlockPaid] = React.useState<string>('');
    const [loading, setloading] = React.useState<boolean>(false);
    const [err, seterr] = React.useState<any>('');

    React.useMemo(async () => {
        setloading(false);
        seterr(null);
        setlastBlockPaid('');
        if (!contract || !contract.methods) {
            return;
        }
        if (!id || !addr) {
            return;
        }

        try {
            setloading(true);
            contract.methods
                .lastPaidBlock(id, addr)
                .call()
                .then((result) => {
                    setlastBlockPaid(result);
                    setloading(false);
                    seterr(null);
                })
                .catch((err) => {
                    console.log('err', err);
                    setloading(false);
                    seterr(err);
                    setlastBlockPaid('');
                });
        } catch (err) {
            console.log('err', err);
            setloading(false);
            seterr(err);
            setlastBlockPaid('');
        }
    }, [contract, id, addr, trigger]);
    return [lastBlockPaid, loading, err];
};
const useGetMinMaxStreakInterval = (
    contract?: any
): [{min: number; max: number} | null, boolean, any] => {
    const [minMaxInterval, setminMaxInterval] = React.useState<{
        min: number;
        max: number;
    } | null>(null);
    const [loading, setloading] = React.useState<boolean>(false);
    const [err, seterr] = React.useState<any>('');

    React.useMemo(async () => {
        setloading(false);
        seterr(null);
        setminMaxInterval(null);
        if (!contract || !contract.methods) {
            return;
        }

        try {
            setloading(true);
            Promise.all([
                contract.methods.streakMinInterval().call(),
                contract.methods.streakMaxInterval().call(),
            ])
                .then(([minInterval, maxInterval]) => {
                    setminMaxInterval({
                        min: Number(minInterval),
                        max: Number(maxInterval),
                    });
                    setloading(false);
                    seterr(null);
                })
                .catch((err) => {
                    console.log('err', err);
                    setloading(false);
                    seterr(err);
                    setminMaxInterval(null);
                });
        } catch (err) {
            console.log('err', err);
            setloading(false);
            seterr(err);
            setminMaxInterval(null);
        }
    }, [contract]);
    return [minMaxInterval, loading, err];
};
const useGetCompoundingInterest = (
    contract?: any,
    startingBlock?: number,
    endingBlock?: number,
    amount?: number,
    streak?: number
): [string | null, boolean, any] => {
    const [interest, setinterest] = React.useState<string | null>(null);
    const [loading, setloading] = React.useState<boolean>(false);
    const [err, seterr] = React.useState<any>('');

    React.useMemo(async () => {
        setloading(false);
        seterr(null);
        setinterest(null);
        if (!contract || !contract.methods) {
            return;
        }
        if (!startingBlock || !endingBlock || !amount || !streak) {
            return;
        }

        try {
            setloading(true);
            contract.methods
                .getCompoundingInterest(
                    startingBlock,
                    endingBlock,
                    ethers.utils.parseEther(amount.toString()),
                    streak
                )
                .call()

                .then((result) => {
                    setinterest(ethers.utils.formatEther(result));
                    setloading(false);
                    seterr(null);
                })
                .catch((err) => {
                    console.log('err', err);
                    setloading(false);
                    seterr(err);
                    setinterest(null);
                });
        } catch (err) {
            console.log('err', err);
            setloading(false);
            seterr(err);
            setinterest(null);
        }
    }, [contract, startingBlock, endingBlock, amount, streak]);
    return [interest, loading, err];
};

export {
    useGetXByIndex,
    useGetAllProducts,
    useGetEtherAmountForX,
    useGetCandyAmountForX,
    useGetPriceChangeForPrice,
    useGetInterestPerBlock,
    useGetCurrentPaid,
    useGetCurrentStreak,
    useGetLastPaidBlock,
    useGetMinMaxStreakInterval,
    useGetCompoundingInterest,
};
