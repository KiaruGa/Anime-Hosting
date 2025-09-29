import { useEffect, useMemo, useRef, useState } from 'react';
import Hls from 'hls.js';

type QualityKey = '480' | '720' | '1080';

export interface VideoPlayerSourceMap {
  '480'?: string;
  '720'?: string;
  '1080'?: string;
}

export interface VideoPlayerProps {
  sources: VideoPlayerSourceMap;
  opening?: { start?: number; stop?: number };
  className?: string;
  height?: string | number;
}

export const VideoPlayer = ({
  sources,
  opening,
  className,
  height = 500,
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [quality, setQuality] = useState<QualityKey>(() =>
    sources['1080'] ? '1080' : sources['720'] ? '720' : '480',
  );
  const [isReady, setIsReady] = useState(false);
  const [showSkip, setShowSkip] = useState(false);
  const [introSkipped, setIntroSkipped] = useState(false);

  const availableQualities = useMemo(() => {
    const list: QualityKey[] = [];
    if (sources['480']) list.push('480');
    if (sources['720']) list.push('720');
    if (sources['1080']) list.push('1080');
    return list;
  }, [sources]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const src = sources[quality];
    if (!src) return;

    // Clean previous instance
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });
      hlsRef.current = hls;
      hls.attachMedia(video);
      hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        hls.loadSource(src);
      });
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsReady(true);
        // Autoplay when ready if user interacted previously
        // video.play().catch(() => {});
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      setIsReady(true);
    } else {
      // Fallback: assign src directly (some servers provide MP4 under same URL)
      video.src = src;
      setIsReady(true);
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [quality, sources]);

  const handleSkipIntro = () => {
    const video = videoRef.current;
    if (!video || !opening?.stop) return;
    video.currentTime = opening.stop;
    setIntroSkipped(true);
    setShowSkip(false);
  };

  const heightStyle = typeof height === 'number' ? `${height}px` : height;

  // Control visibility of the Skip Intro button based on current time
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (
        !opening ||
        opening.start === undefined ||
        opening.stop === undefined ||
        introSkipped
      ) {
        setShowSkip(false);
        return;
      }
      const t = video.currentTime;
      const visible = t >= opening.start && t < opening.stop;
      setShowSkip(visible);
    };

    const handleSeeked = handleTimeUpdate;

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('seeked', handleSeeked);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('seeked', handleSeeked);
    };
  }, [opening?.start, opening?.stop, introSkipped, isReady]);

  // Reset skip state when opening changes (e.g., new episode)
  useEffect(() => {
    setIntroSkipped(false);
    setShowSkip(false);
  }, [opening?.start, opening?.stop]);

  return (
    <div className={className}>
      <div className="relative w-full" style={{ height: heightStyle }}>
        <video
          ref={videoRef}
          controls
          playsInline
          className="w-full h-full bg-black rounded-lg"
        />

        {availableQualities.length > 0 && (
          <div className="absolute top-3 right-3 flex gap-2">
            <select
              value={quality}
              onChange={e => setQuality(e.target.value as QualityKey)}
              className="bg-slate-900/80 text-white text-sm px-2 py-1 rounded border border-slate-700 outline-none"
            >
              {availableQualities.map(q => (
                <option key={q} value={q}>
                  {q}p
                </option>
              ))}
            </select>

            {showSkip && (
              <button
                onClick={handleSkipIntro}
                className="bg-amber-500 hover:bg-amber-600 text-black text-sm font-medium px-3 py-1 rounded"
                title="Пропустить опенинг"
              >
                Пропустить интро
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
