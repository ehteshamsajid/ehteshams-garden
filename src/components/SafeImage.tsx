import { useState, ImgHTMLAttributes } from "react";

const FALLBACK =
  "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&h=800&fit=crop";

interface SafeImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
}

const SafeImage = ({ fallback = FALLBACK, src, onError, ...props }: SafeImageProps) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [errored, setErrored] = useState(false);

  return (
    <img
      {...props}
      src={currentSrc as string}
      loading="lazy"
      onError={(e) => {
        if (!errored) {
          setErrored(true);
          setCurrentSrc(fallback);
        }
        onError?.(e);
      }}
    />
  );
};

export default SafeImage;
