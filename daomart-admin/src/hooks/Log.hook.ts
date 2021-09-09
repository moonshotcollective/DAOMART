import React from 'react';
import {GetHttpLogs, GetUniqueLogsByIp} from '../network/api';

const useGetAllHttpLogs = (
    token: string,
    params?: HttpLogSearchParams
): [NetworkLog[], boolean, any] => {
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
        GetHttpLogs(token, params)
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
    {user}: HttpLogSearchParams
): [NetworkLog[], boolean, any] => {
    const [logs, setlogs] = React.useState<NetworkLog[]>([]);
    const [loading, setloading] = React.useState<boolean>(false);
    const [err, seterr] = React.useState<any>('');
    React.useMemo(async () => {
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
const useGetUniqueIpLogs = (
    token: string
): [{ips: string[]; geolocations: string[]} | null, boolean, any] => {
    const [logs, setlogs] = React.useState<{
        ips: string[];
        geolocations: string[];
    } | null>(null);
    const [loading, setloading] = React.useState<boolean>(false);
    const [err, seterr] = React.useState<any>('');
    React.useMemo(async () => {
        setloading(false);
        seterr(null);
        setlogs(null);
        if (!token) {
            return;
        }

        GetUniqueLogsByIp(token)
            .then((result) => {
                if (result.data.success) {
                    setlogs(result.data.data);
                    setloading(false);
                    seterr(null);
                } else {
                    setloading(false);
                    seterr('Uknow Error');
                    setlogs(null);
                }
            })
            .catch((err) => {
                setloading(false);
                seterr(err);
                setlogs(null);
            });
    }, [token]);
    return [logs, loading, err];
};

export {useGetAllHttpLogs, useGetHttpLogs, useGetUniqueIpLogs};
