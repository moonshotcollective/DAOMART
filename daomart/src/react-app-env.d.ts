/// <reference types="react-scripts" />
/// <reference types="react-scripts" />
type Product = {
    contract?: string;
    product_id?: string;
    name: string;
    description: string;
    category: string;
    code: string;
    tags: string[];
    avatar?: string;
    type?: string;
};
type ProductCategory = {
    category_id?: string;
    type?: string;
    name: string;
    description: string;
    tags: string[];
    avatar: ?string;
};

type TokenContract = {
    address: string;
    chain: string;
};

type ProductContract = {
    type: string;
    name: string;
    address: string;
    chain: string;
    productCount: number;
};

type User = {
    name: string;
    email: string;
    address: string;
    user_id: string;
    status: string;
    email: string;
    avatar: string;
    badge: string;
};

type NetworkLog = {
    type: string;
    method: string;
    route: string;
    ip: string;
    geolocation: string;
    timestamp: string;
    user?: string;
};
