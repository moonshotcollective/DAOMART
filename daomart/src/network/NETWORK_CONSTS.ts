let SERVER = 'http://157.90.19.32:8081/api/';
if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'production') {
    SERVER = 'http://localhost:8081/api/';
}

const GetUrl = (i: string) => {
    return SERVER + i;
};
const GetBaseUrl = (i: string) => {
    return SERVER + '' + i;
};

export default GetUrl;

export {SERVER, GetBaseUrl};
