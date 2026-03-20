/**
 * Creates a lazy-loaded image element with placeholder.
 * @param {object} opts
 * @returns {HTMLElement}
 */
export default function createLazyImage({
  src,
  alt = '',
  className = '',
  width,
  height,
  blurDataURL = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjZjNmNGY2IiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+Cg=='
} = {}) {
  const container = document.createElement('div');
  container.className = `relative overflow-hidden ${className}`;
  if (width) container.style.width = typeof width === 'number' ? width + 'px' : width;
  if (height) container.style.height = typeof height === 'number' ? height + 'px' : height;

  // Blur placeholder
  const placeholder = document.createElement('div');
  placeholder.className = 'absolute inset-0 bg-gray-200 animate-pulse';
  placeholder.style.backgroundImage = `url(${blurDataURL})`;
  placeholder.style.backgroundSize = 'cover';
  placeholder.style.backgroundPosition = 'center';
  container.appendChild(placeholder);

  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      observer.disconnect();
      const img = document.createElement('img');
      img.src = src;
      img.alt = alt;
      if (width) img.width = parseInt(width);
      if (height) img.height = parseInt(height);
      img.loading = 'lazy';
      img.decoding = 'async';
      img.className = `transition-opacity duration-300 opacity-0 ${className}`;
      img.style.imageRendering = 'crisp-edges';

      img.onload = () => {
        img.classList.remove('opacity-0');
        img.classList.add('opacity-100', 'img-shimmer-load');
        placeholder.remove();
      };
      img.onerror = () => {
        img.classList.remove('opacity-0');
        img.classList.add('opacity-100');
        placeholder.remove();
      };
      container.appendChild(img);
    }
  }, { rootMargin: '50px', threshold: 0.1 });

  observer.observe(container);
  return container;
}
