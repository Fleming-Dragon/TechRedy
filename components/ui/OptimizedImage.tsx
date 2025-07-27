"use client";

import { useState } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fallback?: string;
  className?: string;
  priority?: boolean;
}

/**
 * Industrial standard image component with:
 * - Error handling with fallback
 * - Loading states
 * - Optimized for static exports
 * - Accessibility compliance
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  fallback = "/images/placeholder.svg",
  className = "",
  priority = false,
  ...props
}: OptimizedImageProps) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleError = () => {
    console.error(`Failed to load image: ${src}`);
    setError(true);
    setLoading(false);
  };

  const handleLoad = () => {
    console.log(`Successfully loaded image: ${src}`);
    setLoading(false);
  };

  return (
    <div className={`relative ${className}`}>
      {loading && (
        <div
          className="absolute inset-0 bg-gray-200 animate-pulse rounded"
          style={{ width, height }}
        />
      )}
      <img
        src={error ? fallback : src}
        alt={alt}
        width={width}
        height={height}
        onError={handleError}
        onLoad={handleLoad}
        className={`${
          loading ? "opacity-0" : "opacity-100"
        } transition-opacity duration-300`}
        loading={priority ? "eager" : "lazy"}
        style={{ maxWidth: "100%", height: "auto" }}
        {...props}
      />
    </div>
  );
}
