import { useState } from 'react';

export function useImageFallback(src: string, fallback: string) {
  const [imgSrc, setImgSrc] = useState(src);
  return {
    imgSrc,
    onError: () => setImgSrc(fallback),
    isFallback: imgSrc === fallback,
  };
}
