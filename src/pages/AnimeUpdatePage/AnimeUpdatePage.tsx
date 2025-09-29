import { useEffect, useState } from 'react';
import type { Title } from '../../types/anime.type';
import { $api } from '../../api';
import { AnimeCard } from '../../components';
import { Loader } from '../../components/Loader/Loader';

export const AnimeUpdatePage = () => {
  const [updates, setUpdates] = useState<Title[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    $api
      .get('/anime/releases/latest', {
        params: {
          limit: 12, // можно регулировать количество последних релизов
        },
      })
      .then(response => {
        console.log('Latest releases:', response.data);
        setUpdates(response.data || []);
      })
      .catch(error => {
        console.error('Ошибка при загрузке последних релизов:', error);
        setUpdates([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container py-5">
      <h1 className="text-2xl font-bold mb-5 text-center">Последние релизы</h1>
      {updates.length === 0 ? (
        <p className="text-center text-gray-400">Нет данных для отображения</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
          {updates.map(release => (
            <AnimeCard
              key={release?.id}
              alias={release?.alias}
              image={release?.poster.src}
              title={release?.name.main}
            />
          ))}
        </div>
      )}
    </div>
  );
};
