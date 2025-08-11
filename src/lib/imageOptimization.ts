// Image optimization utilities

interface OptimizedImageInfo {
  original: string;
  optimized: string;
  savings: number;
}

interface OptimizationManifest {
  timestamp: string;
  processed: number;
  totalOriginalSize: string;
  totalOptimizedSize: string;
  savings: string;
  images: OptimizedImageInfo[];
}

// Cache for the manifest to avoid repeated file reads
let manifestCache: OptimizationManifest | null = null;

/**
 * Get the optimization manifest
 */
export async function getOptimizationManifest(): Promise<OptimizationManifest | null> {
  if (manifestCache) {
    return manifestCache;
  }

  try {
    const manifestPath = '/optimized/optimization-manifest.json';
    const response = await fetch(manifestPath);

    if (!response.ok) {
      return null;
    }

    const manifest = await response.json();
    manifestCache = manifest;
    return manifest;
  } catch (error) {
    console.warn('Could not load optimization manifest:', error);
    return null;
  }
}

/**
 * Get the optimized version of an image if available
 */
export async function getOptimizedImage(originalPath: string): Promise<string> {
  try {
    const manifest = await getOptimizationManifest();

    if (!manifest) {
      return originalPath;
    }

    // Find the optimized version
    const imageInfo = manifest.images.find(img =>
      img.original === originalPath.replace('/images/', 'images/')
    );

    if (imageInfo) {
      return imageInfo.optimized;
    }

    return originalPath;
  } catch (error) {
    console.warn('Error getting optimized image:', error);
    return originalPath;
  }
}

/**
 * Get optimized image with fallback
 * Returns an object with src and fallback for use in components
 */
export async function getOptimizedImageWithFallback(originalPath: string) {
  const optimizedPath = await getOptimizedImage(originalPath);

  return {
    src: optimizedPath,
    fallback: originalPath,
    isOptimized: optimizedPath !== originalPath
  };
}

/**
 * Get optimized image path for use in components
 * Usage: const optimizedSrc = await getOptimizedImagePath("/images/articles/hull.png");
 */
export async function getOptimizedImagePath(originalPath: string): Promise<string> {
  return await getOptimizedImage(originalPath);
}

/**
 * Get image optimization stats
 */
export async function getOptimizationStats() {
  const manifest = await getOptimizationManifest();

  if (!manifest) {
    return {
      isOptimized: false,
      totalSavings: 0,
      processedCount: 0
    };
  }

  return {
    isOptimized: true,
    totalSavings: parseFloat(manifest.savings),
    processedCount: manifest.processed,
    totalOriginalSize: manifest.totalOriginalSize,
    totalOptimizedSize: manifest.totalOptimizedSize
  };
}
