const minimizeAddress = (addr: string, _k: number = 4): string => {
    let len = addr.length;
    return addr.substr(0, _k + 2) + '...' + addr.substr(len - _k, len);
};

export {minimizeAddress};
