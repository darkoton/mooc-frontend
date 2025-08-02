import { useState } from "react";

interface IImgWithFallback {
  src?: string | null;
  alt: string;
  style?: React.CSSProperties;
  className?: string;
  fallbackSrc?: string;
}

const DEFAULT_FALLBACK = "/src/shared/assets/images/fallbackImg.jpg";

function ImgWithFallback({
  src,
  alt,
  style,
  className,
  fallbackSrc = DEFAULT_FALLBACK,
}: IImgWithFallback) {
  const [error, setError] = useState(false);

  const isValidSrc = src && !error;

  return (
    <img
      src={isValidSrc ? src : fallbackSrc}
      onError={() => setError(true)}
      alt={alt}
      style={style}
      className={className}
    />
  );
}

export default ImgWithFallback;
