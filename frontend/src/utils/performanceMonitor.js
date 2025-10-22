// Performance monitoring utility for Core Web Vitals and metrics
class PerformanceMonitor {
  constructor() {
    this.metrics = {};
    this.observers = [];
    this.isDev = import.meta.env.DEV;
    this.init();
  }

  init() {
    if (typeof window === 'undefined') return;
    
    // Track Core Web Vitals
    this.trackLCP();
    this.trackFID();
    this.trackCLS();
    this.trackFCP();
    this.trackTTFB();
    this.trackINP();
    
    // Track custom metrics
    this.trackBundleSize();
    this.trackLongTasks();
    this.trackMemoryUsage();
    
    // Track navigation timing
    this.trackNavigationTiming();
    
    if (this.isDev) {
      this.logMetrics();
    }
  }

  trackLCP() {
    if (!('PerformanceObserver' in window)) return;
    
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.metrics.lcp = lastEntry.startTime;
      
      if (this.isDev) {
        console.log('🚀 LCP (Largest Contentful Paint):', lastEntry.startTime.toFixed(2), 'ms');
      }
    });
    
    observer.observe({ entryTypes: ['largest-contentful-paint'] });
    this.observers.push(observer);
  }

  trackFID() {
    if (!('PerformanceObserver' in window)) return;
    
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        this.metrics.fid = entry.processingStart - entry.startTime;
        
        if (this.isDev) {
          console.log('⚡ FID (First Input Delay):', this.metrics.fid.toFixed(2), 'ms');
        }
      });
    });
    
    observer.observe({ entryTypes: ['first-input'] });
    this.observers.push(observer);
  }

  trackCLS() {
    if (!('PerformanceObserver' in window)) return;
    
    let clsValue = 0;
    let lastLoggedValue = 0;
    
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      
      this.metrics.cls = clsValue;
      
      if (this.isDev && (Math.abs(clsValue - lastLoggedValue) > 0.001 || lastLoggedValue === 0)) {
        console.log('📐 CLS (Cumulative Layout Shift):', clsValue.toFixed(4));
        lastLoggedValue = clsValue;
      }
    });
    
    observer.observe({ entryTypes: ['layout-shift'] });
    this.observers.push(observer);
  }

  trackFCP() {
    if (!('PerformanceObserver' in window)) return;
    
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        this.metrics.fcp = entry.startTime;
        
        if (this.isDev) {
          console.log('🎨 FCP (First Contentful Paint):', entry.startTime.toFixed(2), 'ms');
        }
      });
    });
    
    observer.observe({ entryTypes: ['paint'] });
    this.observers.push(observer);
  }

  trackTTFB() {
    if (!('PerformanceNavigationTiming' in window)) return;
    
    const navigation = performance.getEntriesByType('navigation')[0];
    if (navigation) {
      this.metrics.ttfb = navigation.responseStart - navigation.requestStart;
      
      if (this.isDev) {
        console.log('🌐 TTFB (Time to First Byte):', this.metrics.ttfb.toFixed(2), 'ms');
      }
    }
  }

  trackINP() {
    if (!('PerformanceObserver' in window)) return;
    
    let longestInteraction = 0;
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.duration > longestInteraction) {
          longestInteraction = entry.duration;
          this.metrics.inp = longestInteraction;
          
          if (this.isDev) {
            console.log('🖱️ INP (Interaction to Next Paint):', longestInteraction.toFixed(2), 'ms');
          }
        }
      });
    });
    
    observer.observe({ entryTypes: ['event'] });
    this.observers.push(observer);
  }

  trackBundleSize() {
    if (!('PerformanceObserver' in window)) return;
    
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.entryType === 'resource' && entry.name.includes('.js')) {
          const size = entry.transferSize || entry.decodedBodySize || 0;
          this.metrics.bundleSize = (this.metrics.bundleSize || 0) + size;
        }
      });
    });
    
    observer.observe({ entryTypes: ['resource'] });
    this.observers.push(observer);
  }

  trackLongTasks() {
    if (!('PerformanceObserver' in window)) return;
    
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        this.metrics.longTasks = (this.metrics.longTasks || 0) + 1;
        
        if (this.isDev) {
          console.warn('⚠️ Long Task detected:', entry.duration.toFixed(2), 'ms');
        }
      });
    });
    
    observer.observe({ entryTypes: ['longtask'] });
    this.observers.push(observer);
  }

  trackMemoryUsage() {
    if (!('memory' in performance)) return;
    
    const updateMemoryInfo = () => {
      const memory = performance.memory;
      this.metrics.memory = {
        used: memory.usedJSHeapSize,
        total: memory.totalJSHeapSize,
        limit: memory.jsHeapSizeLimit
      };
      
      if (this.isDev) {
        console.log('💾 Memory Usage:', {
          used: `${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
          total: `${(memory.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
          limit: `${(memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2)} MB`
        });
      }
    };
    
    updateMemoryInfo();
    setInterval(updateMemoryInfo, 5000);
  }

  trackNavigationTiming() {
    if (!('PerformanceNavigationTiming' in window)) return;
    
    const navigation = performance.getEntriesByType('navigation')[0];
    if (navigation) {
      this.metrics.navigation = {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.navigationStart,
        loadComplete: navigation.loadEventEnd - navigation.navigationStart,
        domInteractive: navigation.domInteractive - navigation.navigationStart
      };
      
      if (this.isDev) {
        console.log('⏱️ Navigation Timing:', this.metrics.navigation);
      }
    }
  }

  // Performance marks for user interactions
  markUserInteraction(action) {
    if (!('performance' in window)) return;
    
    performance.mark(`user-interaction-${action}-start`);
    
    if (this.isDev) {
      console.log(`📝 User interaction marked: ${action}`);
    }
  }

  measureUserInteraction(action) {
    if (!('performance' in window)) return;
    
    try {
      performance.measure(
        `user-interaction-${action}`,
        `user-interaction-${action}-start`
      );
      
      const measure = performance.getEntriesByName(`user-interaction-${action}`)[0];
      if (measure) {
        this.metrics[`interaction-${action}`] = measure.duration;
        
        if (this.isDev) {
          console.log(`⏱️ ${action} interaction took:`, measure.duration.toFixed(2), 'ms');
        }
      }
    } catch (error) {
      console.warn('Failed to measure user interaction:', error);
    }
  }

  // Get current metrics
  getMetrics() {
    return { ...this.metrics };
  }

  // Get performance score based on Core Web Vitals
  getPerformanceScore() {
    const { lcp, fid, cls } = this.metrics;
    let score = 100;
    
    // LCP scoring (Good: <2.5s, Needs Improvement: 2.5-4s, Poor: >4s)
    if (lcp > 4000) score -= 30;
    else if (lcp > 2500) score -= 15;
    
    // FID scoring (Good: <100ms, Needs Improvement: 100-300ms, Poor: >300ms)
    if (fid > 300) score -= 30;
    else if (fid > 100) score -= 15;
    
    // CLS scoring (Good: <0.1, Needs Improvement: 0.1-0.25, Poor: >0.25)
    if (cls > 0.25) score -= 30;
    else if (cls > 0.1) score -= 15;
    
    return Math.max(0, score);
  }

  // Log metrics in development
  logMetrics() {
    setTimeout(() => {
      console.group('🚀 Performance Metrics Summary');
      console.log('Core Web Vitals:', {
        LCP: this.metrics.lcp ? `${this.metrics.lcp.toFixed(2)}ms` : 'N/A',
        FID: this.metrics.fid ? `${this.metrics.fid.toFixed(2)}ms` : 'N/A',
        CLS: this.metrics.cls ? this.metrics.cls.toFixed(4) : 'N/A',
        FCP: this.metrics.fcp ? `${this.metrics.fcp.toFixed(2)}ms` : 'N/A',
        TTFB: this.metrics.ttfb ? `${this.metrics.ttfb.toFixed(2)}ms` : 'N/A',
        INP: this.metrics.inp ? `${this.metrics.inp.toFixed(2)}ms` : 'N/A'
      });
      
      console.log('Performance Score:', this.getPerformanceScore() + '/100');
      
      if (this.metrics.bundleSize) {
        console.log('Bundle Size:', `${(this.metrics.bundleSize / 1024).toFixed(2)} KB`);
      }
      
      if (this.metrics.longTasks) {
        console.log('Long Tasks:', this.metrics.longTasks);
      }
      
      console.groupEnd();
    }, 3000);
  }

  // Cleanup observers
  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Create global instance
const performanceMonitor = new PerformanceMonitor();

export default performanceMonitor;
export { PerformanceMonitor };
