import React from 'react';
const Image = ({src, alt, ...props}: any) => {
    return <img {...props} src={src} alt={alt} />;
};

export default Image;
