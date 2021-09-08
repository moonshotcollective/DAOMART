import axios from 'axios';
import GetUrl from './NETWORK_CONSTS';

const adminPostReqHandler = (token, url, data) =>
    axios({
        method: 'POST',
        url: GetUrl(url),
        data: {...data},

        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    }).then((res) => res.data);

export {adminPostReqHandler};
