import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { $api, IMG_HOST, VIDEO_HOST } from '../../api';
import type { Title } from '../../types/anime.type';
import { Badge, VideoPlayer } from '../../components';

export const AnimeDetailPage = () => {
  const [title, setTitle] = useState<Title | null>(null);
  const [activeEpisode, setActiveEpisode] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { alias } = useParams();

  useEffect(() => {
    if (alias) {
      setLoading(true);
      setError(null);
      $api
        .get<Title>(`/anime/releases/${alias}`)
        .then(response => {
          console.log('Anime data:', response.data);
          setTitle(response.data);
          // Устанавливаем первый эпизод как активный, если есть эпизоды
          if (response.data.episodes && response.data.episodes.length > 0) {
            setActiveEpisode(response.data.episodes[0].ordinal);
          }
        })
        .catch(error => {
          console.error('Error fetching anime data:', error);
          setError('Ошибка загрузки данных аниме');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [alias]);

  if (loading) {
    return (
      <div className="container py-5">
        <div className="flex justify-center items-center h-64">
          <div className="text-xl">Загрузка...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="flex justify-center items-center h-64">
          <div className="text-xl text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  if (!title) {
    return (
      <div className="container py-5">
        <div className="flex justify-center items-center h-64">
          <div className="text-xl">Аниме не найдено</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container py-5">
        <div className="flex flex-col items-center gap-5 md:flex-row md:items-start">
          <img
            src={IMG_HOST + title.poster.src}
            alt={title.name.main || 'Постер аниме'}
            className="max-w-xs rounded-lg"
          />
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-4">{title.name.main}</h1>
            {title.name.english && (
              <h2 className="text-lg text-gray-400 mb-4">
                {title.name.english}
              </h2>
            )}
            <p className="text-justify mb-4">{title.description}</p>
            <div className="flex flex-wrap gap-2 py-2">
              {title.genres.map(genre => (
                <Badge key={genre.id} text={genre.name} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {title.episodes && title.episodes.length > 0 ? (
        <div className="container py-5">
          <div className="p-5 bg-slate-800/20 rounded-lg">
            <select
              value={activeEpisode}
              onChange={e => setActiveEpisode(Number(e.target.value))}
              className="w-full bg-slate-800 p-2 rounded-lg outline-none cursor-pointer"
            >
              {title.episodes.map(episode => (
                <option key={episode.id} value={episode.ordinal}>
                  Эпизод {episode.ordinal}
                  {episode.name ? `: ${episode.name}` : ''}
                </option>
              ))}
            </select>
            {title.episodes.map(episode => (
              <div className="mt-5" key={episode.id}>
                {episode.ordinal === activeEpisode && (
                  <VideoPlayer
                    height={500}
                    sources={{
                      '480': VIDEO_HOST + episode.hls_480,
                      '720': VIDEO_HOST + episode.hls_720,
                      '1080': VIDEO_HOST + episode.hls_1080,
                    }}
                    opening={{
                      start: episode.opening?.start,
                      stop: episode.opening?.stop,
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="container py-5">
          <div className="text-center text-gray-400">Эпизоды недоступны</div>
        </div>
      )}
    </>
  );
};
