import GetUrl, {SERVER} from './NETWORK_CONSTS';
import {Manager} from 'socket.io-client';
import {useState, useMemo} from 'react';
import axios from 'axios';
import {GetLobby} from './api';

let mainManager;
let mainSocket;

const Connect = (token) => {
    if (!token) {
        return;
    }

    mainSocket.on('error', (err) => {
        console.log('error', err);
    });
    mainSocket.on('connect_error', (err) => {
        console.log('connect_error', err);
    });

    mainSocket.on('reconnect', () => {
        console.log('reconnected to rainbow :', mainSocket.id);
    });
    mainSocket.on('error', (err) => {
        console.log('error', err);
    });
    mainSocket.on('reconnect_attempt', (d) => {
        console.log('reconnect_attempt', d);
    });
};
const Disconnect = () => {
    if (mainSocket) {
        mainSocket.close();
    }

    mainSocket = null;
    mainManager = null;
};

const useGetSocket = (token, setup = 1) => {
    const [status, setstatus] = useState(mainSocket && mainSocket.connected);
    const [id, setid] = useState(
        mainSocket && mainSocket.connected ? mainSocket.id : ''
    );
    useMemo(async () => {
        if (token && setup === 1) {
            if (!mainManager || !mainSocket) {
                mainManager = new Manager(SERVER, {
                    reconnection: true,
                    reconnectionDelay: 1000,
                    reconnectionDelayMax: 10000,
                    reconnectionAttempts: 5,
                });
                mainSocket = mainManager.socket('/', {
                    auth: {
                        token: 'Bearer ' + token,
                    },
                });
                mainSocket.on('connect', () => {
                    console.log('connect');
                    setstatus(1);
                    setid(mainSocket.id);
                    console.log('CONNECTED connected :', mainSocket.id);
                });
                mainSocket.on('disconnect', () => {
                    setstatus(0);
                    setid('');
                    console.log(' disconnected :');
                });
            }
        }
        return () => Disconnect();
    }, [token, setup]);
    return [status, id];
};

const useSubToMembers = (token): [any[], boolean, any] => {
    const [members, setmembers] = useState<any[]>([]);
    const [loading, setloading] = useState(false);
    const [err, seterr] = useState('');

    const tryRemove = (obj) => {
        const i = members.findIndex((m: any) => m.address == obj.address);
        if (i > -1) {
            members.splice(i, 1);
            setmembers([...members]);
        }
    };
    const tryAdd = (obj: any) => {
        const i = members.findIndex((m: any) => m.address == obj.address);
        if (i < 0) {
            members.push(obj);
            setmembers([...members]);
        }
    };
    useMemo(() => {
        if (!token) {
            return;
        }
        setloading(true);

        GetLobby(token)
            .then((result) => {
                if (result.data.success) {
                    setloading(false);
                    setmembers(result.data.data);
                } else {
                    console.log('result.data', result.data);
                    setloading(false);
                    seterr('UNKNOW ERROR');
                }
            })
            .catch((err) => {
                setloading(false);
                setmembers([]);
                seterr(err);
                console.log('err', err);
            });

        if (mainSocket) {
            mainSocket.on('ON_ENTER', (res) => {
                tryAdd(res.data);
            });

            mainSocket.on('ON_EXIT', (res) => {
                tryRemove(res.data);
            });
        }
        return () => {
            if (mainSocket) {
                mainSocket.off('ON_ENTER');
                mainSocket.off('ON_EXIT');
            }
        };
    }, [token]);

    return [members, loading, err];
};
export {useGetSocket, useSubToMembers};
