import { useState, useEffect } from 'react';

export const BackgroundMetrics = () => {
  const [metrics, setMetrics] = useState({
    zoom: 100,
    width: window.innerWidth,
    height: window.innerHeight,
    dead: 0,
    alive: 0,
    drawn: 0,
    fps: 0
  });

  const [lastFrameTime, setLastFrameTime] = useState(performance.now());

  useEffect(() => {
    const handleResize = () => {
      setMetrics(prev => ({
        ...prev,
        width: window.innerWidth,
        height: window.innerHeight
      }));
    };

    const updateFPS = () => {
      const now = performance.now();
      const delta = now - lastFrameTime;
      const fps = Math.round(1000 / delta);

      setMetrics(prev => ({ ...prev, fps }));
      setLastFrameTime(now);
      requestAnimationFrame(updateFPS);
    };

    window.addEventListener('resize', handleResize);
    requestAnimationFrame(updateFPS);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [lastFrameTime]);

  const handleZoom = (direction: 'in' | 'out') => {
    setMetrics(prev => ({
      ...prev,
      zoom: direction === 'in' ? Math.min(prev.zoom + 10, 200) : Math.max(prev.zoom - 10, 50)
    }));
  };

  const captureScreenshot = () => {
    console.log('Screenshot captured');
  };

  return (
    <div className="fixed top-4 right-4 bg-black/30 backdrop-blur-sm rounded-lg p-4 text-sm font-mono z-50 border border-gray-800">
      <div className="space-y-2">
        <div className="flex gap-2">
          <span className="zoom">
            <button 
              onClick={() => handleZoom('in')}
              className="w-6 h-6 flex items-center justify-center bg-black/50 rounded hover:bg-gray-800 transition-colors text-white"
            >
              +
            </button>
            <button 
              onClick={() => handleZoom('out')}
              className="w-6 h-6 flex items-center justify-center bg-black/50 rounded hover:bg-gray-800 transition-colors text-white"
            >
              -
            </button>
          </span>
        </div>
        <p className="text-gray-400">{metrics.zoom}% - ({metrics.width}px)({metrics.height}px)</p>
        <p className="text-gray-400">Dead: {metrics.dead}</p>
        <p className="text-gray-400">Alive: {metrics.alive}</p>
        <p className="text-gray-400">Drawn: {metrics.drawn}</p>
        <p className="text-gray-400">{metrics.fps} FPS</p>
        <button 
          onClick={captureScreenshot}
          className="text-green-500 hover:text-green-400 transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  );
};