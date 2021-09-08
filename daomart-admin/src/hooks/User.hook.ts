import React from 'react';
import {GetUsers, GetUserById} from '../network/api';

const useGetUsers = (token: string): [User[], boolean, any] => {
    const [users, setusers] = React.useState<User[]>([]);
    const [loading, setloading] = React.useState<boolean>(false);
    const [err, seterr] = React.useState<any>('');
    React.useMemo(async () => {
        setloading(false);
        seterr(null);
        setusers([]);
        if (!token) {
            return;
        }

        GetUsers(token)
            .then((result) => {
                if (result.data.success) {
                    setusers(result.data.data);
                    setloading(false);
                    seterr(null);
                } else {
                    setloading(false);
                    seterr('Uknow Error');
                    setusers([]);
                }
            })
            .catch((err) => {
                setloading(false);
                seterr(err);
                setusers([]);
            });
    }, [token]);
    return [users, loading, err];
};

const useGetUserById = (
    token: string,
    uid: string
): [User | null, boolean, any] => {
    const [user, setuser] = React.useState<User | null>(null);
    const [loading, setloading] = React.useState<boolean>(false);
    const [err, seterr] = React.useState<any>('');
    React.useMemo(async () => {
        setloading(false);
        seterr(null);
        setuser(null);
        if (!token) {
            return;
        }
        if (!uid) {
            return;
        }

        GetUserById(token, {uid: uid})
            .then((result) => {
                if (result.data.success) {
                    setuser(result.data.data);
                    setloading(false);
                    seterr(null);
                } else {
                    setloading(false);
                    seterr('Uknow Error');
                    setuser(null);
                }
            })
            .catch((err) => {
                setloading(false);
                seterr(err);
                setuser(null);
            });
    }, [token, uid]);
    return [user, loading, err];
};

export {useGetUsers, useGetUserById};
