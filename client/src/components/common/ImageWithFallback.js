import React, { useState } from 'react';

const ImageWithFallback = ({ 
  src, 
  alt, 
  fallbackSrc, 
  className = '', 
  ...props 
}) => {
  const [imgSrc, setImgSrc] = useState(src.startsWith('http') ? src : `${process.env.REACT_APP_API_URL}${src}`);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      if (fallbackSrc) {
        setImgSrc(fallbackSrc);
      } else {
        // Create a placeholder with the food item name
        setImgSrc(`data:image/svg+xml;base64,${btoa(`
          <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#f3f4f6"/>
            <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="16" fill="#6b7280" text-anchor="middle" dy=".3em">
              ${alt || 'Food Image'}
            </text>
          </svg>
        `)}`);
      }
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      {...props}
    />
  );
};

export default ImageWithFallback;