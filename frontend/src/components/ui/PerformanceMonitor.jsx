import { useState, useEffect } from 'react';
import performanceMonitor from '../../utils/performanceMonitor';

const PerformanceMonitor = () => {
  const [metrics, setMetrics] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [fps, setFps] = useState(60);
  
  useEffect(() => {
    if (!import.meta.env.DEV) return;
    
    // Update metrics every second
    const interval = setInterval(() => {
      setMetrics(performanceMonitor.getMetrics());
    }, 1000);
    
    // Track FPS
    let lastTime = performance.now();
    let frameCount = 0;
    
    const trackFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (currentTime - lastTime)));
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(trackFPS);
    };
    
    trackFPS();
    
    return () => {
      clearInterval(interval);
    };
  }, []);
  
  if (!import.meta.env.DEV) return null;
  
  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };
  
  const getMetricColor = (value, thresholds) => {
    if (value <= thresholds.good) return 'text-green-400';
    if (value <= thresholds.needsImprovement) return 'text-yellow-400';
    return 'text-red-400';
  };
  
  const performanceScore = performanceMonitor.getPerformanceScore();
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="mb-2 px-3 py-2 bg-gray-800 text-white rounded-lg shadow-lg hover:bg-gray-700 transition-colors text-sm font-mono"
      >
        📊 Perf {performanceScore}/100
      </button>
      
      {/* Metrics Panel */}
      {isVisible && (
        <div className="bg-gray-900 text-white rounded-lg shadow-xl p-4 w-80 max-h-96 overflow-y-auto font-mono text-xs">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-bold">Performance Monitor</h3>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          
          {/* Performance Score */}
          <div className="mb-4 p-2 bg-gray-800 rounded">
            <div className="flex justify-between items-center">
              <span>Overall Score:</span>
              <span className={`font-bold ${getScoreColor(performanceScore)}`}>
                {performanceScore}/100
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
              <div
                className={`h-2 rounded-full ${
                  performanceScore >= 90 ? 'bg-green-400' :
                  performanceScore >= 70 ? 'bg-yellow-400' : 'bg-red-400'
                }`}
                style={{ width: `${performanceScore}%` }}
              />
            </div>
          </div>
          
          {/* Core Web Vitals */}
          <div className="mb-4">
            <h4 className="font-bold mb-2 text-blue-400">Core Web Vitals</h4>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>LCP:</span>
                <span className={getMetricColor(metrics.lcp || 0, { good: 2500, needsImprovement: 4000 })}>
                  {metrics.lcp ? `${metrics.lcp.toFixed(0)}ms` : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>FID:</span>
                <span className={getMetricColor(metrics.fid || 0, { good: 100, needsImprovement: 300 })}>
                  {metrics.fid ? `${metrics.fid.toFixed(0)}ms` : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>CLS:</span>
                <span className={getMetricColor(metrics.cls || 0, { good: 0.1, needsImprovement: 0.25 })}>
                  {metrics.cls ? metrics.cls.toFixed(3) : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>FCP:</span>
                <span className={getMetricColor(metrics.fcp || 0, { good: 1800, needsImprovement: 3000 })}>
                  {metrics.fcp ? `${metrics.fcp.toFixed(0)}ms` : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>TTFB:</span>
                <span className={getMetricColor(metrics.ttfb || 0, { good: 800, needsImprovement: 1800 })}>
                  {metrics.ttfb ? `${metrics.ttfb.toFixed(0)}ms` : 'N/A'}
                </span>
              </div>
            </div>
          </div>
          
          {/* Additional Metrics */}
          <div className="mb-4">
            <h4 className="font-bold mb-2 text-green-400">Additional Metrics</h4>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>FPS:</span>
                <span className={fps >= 55 ? 'text-green-400' : fps >= 30 ? 'text-yellow-400' : 'text-red-400'}>
                  {fps}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Bundle Size:</span>
                <span className="text-blue-400">
                  {metrics.bundleSize ? `${(metrics.bundleSize / 1024).toFixed(1)}KB` : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Long Tasks:</span>
                <span className={metrics.longTasks > 0 ? 'text-red-400' : 'text-green-400'}>
                  {metrics.longTasks || 0}
                </span>
              </div>
            </div>
          </div>
          
          {/* Memory Usage */}
          {metrics.memory && (
            <div className="mb-4">
              <h4 className="font-bold mb-2 text-purple-400">Memory Usage</h4>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Used:</span>
                  <span className="text-blue-400">
                    {(metrics.memory.used / 1024 / 1024).toFixed(1)}MB
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Total:</span>
                  <span className="text-blue-400">
                    {(metrics.memory.total / 1024 / 1024).toFixed(1)}MB
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Limit:</span>
                  <span className="text-blue-400">
                    {(metrics.memory.limit / 1024 / 1024).toFixed(1)}MB
                  </span>
                </div>
              </div>
            </div>
          )}
          
          {/* Navigation Timing */}
          {metrics.navigation && (
            <div>
              <h4 className="font-bold mb-2 text-orange-400">Navigation</h4>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>DOM Ready:</span>
                  <span className="text-blue-400">
                    {metrics.navigation.domContentLoaded.toFixed(0)}ms
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Load Complete:</span>
                  <span className="text-blue-400">
                    {metrics.navigation.loadComplete.toFixed(0)}ms
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PerformanceMonitor;
