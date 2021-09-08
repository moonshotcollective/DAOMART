import React from 'react';
import {GetHttpLogs} from '../network/api';

const useGetAllHttpLogs = (token: string): [NetworkLog[], boolean, any] => {
    const [logs, setlogs] = React.useState<NetworkLog[]>([]);
    const [loading, setloading] = React.useState<boolean>(false);
    const [err, seterr] = React.useState<any>('');
    React.useMemo(async () => {
        if (!token) {
            return;
        }
        setloading(false);
        seterr(null);
        setlogs([]);
        GetHttpLogs(token)
            .then((result) => {
                if (result.data.success) {
                    setlogs(result.data.data);
                    setloading(false);
                    seterr(null);
                } else {
                    setloading(false);
                    seterr('Uknow Error');
                    setlogs([]);
                }
            })
            .catch((err) => {
                setloading(false);
                seterr(err);
                setlogs([]);
            });
    }, [token]);
    return [logs, loading, err];
};
const useGetHttpLogs = (
    token: string,
    {user}: {user?: string}
): [NetworkLog[], boolean, any] => {
    const [logs, setlogs] = React.useState<NetworkLog[]>([]);
    const [loading, setloading] = React.useState<boolean>(false);
    const [err, seterr] = React.useState<any>('');
    React.useMemo(async () => {
        console.log('token', token);
        setloading(false);
        seterr(null);
        setlogs([]);
        if (!token) {
            return;
        }
        if (!user) {
            return;
        }

        GetHttpLogs(token, {user: user})
            .then((result) => {
                if (result.data.success) {
                    setlogs(result.data.data);
                    setloading(false);
                    seterr(null);
                } else {
                    setloading(false);
                    seterr('Uknow Error');
                    setlogs([]);
                }
            })
            .catch((err) => {
                setloading(false);
                seterr(err);
                setlogs([]);
            });
    }, [token, user]);
    return [logs, loading, err];
};

export {useGetAllHttpLogs, useGetHttpLogs};
