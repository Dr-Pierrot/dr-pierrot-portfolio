/**
 * Performance Monitoring Dashboard
 * 
 * Development-only component that displays real-time performance metrics
 * and optimization recommendations.
 */

'use client';

import { useEffect, useState } from 'react';
import { 
  getPerformanceMonitor, 
  type WebVitals, 
  checkPerformanceBudget,
  DEFAULT_PERFORMANCE_BUDGET 
} from '@/lib/performance';

interface PerformanceDashboardProps {
  enabled?: boolean;
}

export default function PerformanceDashboard({ enabled = process.env.NODE_ENV === 'development' }: PerformanceDashboardProps) {
  const [metrics, setMetrics] = useState<Partial<WebVitals>>({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    const monitor = getPerformanceMonitor();
    if (!monitor) return;

    // Update metrics every 2 seconds
    const interval = setInterval(() => {
      const currentMetrics = monitor.getMetrics();
      setMetrics(currentMetrics);
    }, 2000);

    // Keyboard shortcut to toggle dashboard (Ctrl/Cmd + Shift + P)
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'P') {
        setIsVisible(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [enabled]);

  if (!enabled || !isVisible) return null;

  const budgetCheck = checkPerformanceBudget(metrics, DEFAULT_PERFORMANCE_BUDGET);

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black/90 text-white p-4 rounded-lg shadow-lg max-w-sm text-sm font-mono">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-green-400">⚡ Performance</h3>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white"
          aria-label="Close performance dashboard"
        >
          ×
        </button>
      </div>

      <div className="space-y-2">
        {/* Core Web Vitals */}
        <div>
          <div className="text-xs text-gray-400 mb-1">Core Web Vitals</div>
          
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className={`p-2 rounded ${getMetricColor(metrics.fcp, 1800, 3000)}`}>
              <div>FCP</div>
              <div className="font-bold">
                {metrics.fcp ? `${Math.round(metrics.fcp)}ms` : 'N/A'}
              </div>
            </div>
            
            <div className={`p-2 rounded ${getMetricColor(metrics.lcp, 2500, 4000)}`}>
              <div>LCP</div>
              <div className="font-bold">
                {metrics.lcp ? `${Math.round(metrics.lcp)}ms` : 'N/A'}
              </div>
            </div>
            
            <div className={`p-2 rounded ${getMetricColor(metrics.fid, 100, 300)}`}>
              <div>FID</div>
              <div className="font-bold">
                {metrics.fid ? `${Math.round(metrics.fid)}ms` : 'N/A'}
              </div>
            </div>
            
            <div className={`p-2 rounded ${getMetricColor(metrics.cls, 0.1, 0.25, true)}`}>
              <div>CLS</div>
              <div className="font-bold">
                {metrics.cls !== undefined ? metrics.cls.toFixed(3) : 'N/A'}
              </div>
            </div>
          </div>
        </div>

        {/* Budget Status */}
        <div>
          <div className="text-xs text-gray-400 mb-1">Budget Status</div>
          <div className={`text-xs p-2 rounded ${budgetCheck.passed ? 'bg-green-900' : 'bg-red-900'}`}>
            {budgetCheck.passed ? '✅ Within Budget' : `❌ ${budgetCheck.violations.length} violations`}
          </div>
        </div>

        {/* Performance Tips */}
        {!budgetCheck.passed && (
          <div>
            <div className="text-xs text-gray-400 mb-1">Recommendations</div>
            <div className="text-xs space-y-1">
              {budgetCheck.violations.slice(0, 2).map((violation, index) => (
                <div key={index} className="text-yellow-400">
                  • {violation}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-3 pt-2 border-t border-gray-700 text-xs text-gray-400">
        Press Ctrl/Cmd + Shift + P to toggle
      </div>
    </div>
  );
}

function getMetricColor(value: number | null | undefined, good: number, poor: number, inverse = false): string {
  if (value === null || value === undefined) return 'bg-gray-700';
  
  if (inverse) {
    // For metrics where lower is better (CLS)
    if (value <= good) return 'bg-green-900';
    if (value <= poor) return 'bg-yellow-900';
    return 'bg-red-900';
  } else {
    // For metrics where lower is better (FCP, LCP, FID)
    if (value <= good) return 'bg-green-900';
    if (value <= poor) return 'bg-yellow-900';
    return 'bg-red-900';
  }
}