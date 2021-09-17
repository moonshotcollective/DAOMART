let SERVER = 'http://176.9.180.134:8081/api/';
if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'production') {
    SERVER = 'http://localhost:8081/api/';
}
console.log('SERVER', SERVER);
const GetUrl = (i: string) => {
    return SERVER + 'admin/' + i;
};
const GetBaseUrl = (i: string) => {
    return SERVER + '' + i;
};

export default GetUrl;

export {SERVER, GetBaseUrl};
