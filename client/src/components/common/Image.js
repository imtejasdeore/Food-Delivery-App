import React, { useState, useEffect } from 'react';

const Image = ({ src, alt, ...props }) => {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  const handleImageError = () => {
    setImgSrc('/images/default-product.png');
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={handleImageError}
      {...props}
    />
  );
};

export default Image;