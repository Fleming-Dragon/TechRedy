"use client";

import { useState } from "react";

interface StaticImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fallback?: string;
  priority?: boolean;
}

/**
 * Static image component optimized for static exports
 * Uses regular img tag to avoid Next.js Image optimization issues
 */
export default function StaticImage({
  src,
  alt,
  width,
  height,
  className = "",
  fallback = "/images/placeholder.svg",
  priority = false,
}: StaticImageProps) {
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
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  );
}
