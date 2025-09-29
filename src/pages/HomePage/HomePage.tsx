import { useEffect, useState } from 'react';
import type { AnimeList, Title } from '../../types/anime.type';
import { $api } from '../../api';
import { AnimeCard } from '../../components';
import { Loader } from '../../components/Loader/Loader';

export const HomePage = () => {
  const [title, setTitle] = useState<Title>();
  const [search, setSearch] = useState('');
  const [titles, setTitles] = useState<Title[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    $api.get<Title[]>('/anime/releases/random').then(response => {
      setTitle(response.data.at(0));
      setLoading(false);
    });
  }, []);

  const getSearchTitles = async () => {
    if (!search.trim()) return; // если строка пустая — не отправляем запрос
    setLoading(true);
    $api
      .get<AnimeList>('/anime/catalog/releases', {
        params: {
          limit: 6,
          'f[search]': search,
        },
      })
      .then(response => {
        setTitles(response?.data.data);
        setLoading(false);
      });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="container py-5">
        <div className="max-w-96 mx-auto">
          {title && (
            <AnimeCard
              alias={title?.alias}
              image={title?.poster.src}
              title={title?.name.main}
            />
          )}
        </div>
        <div>
          <form
            onSubmit={e => {
              e.preventDefault();
              getSearchTitles();
            }}
            className="py-5 flex flex-col md:flex-row items-center gap-2"
          >
            <input
              type="text"
              placeholder="Начните вводить название тайтла..."
              className="outline-none bg-slate-950 border border-slate-800 w-full py-1 px-2 rounded-lg"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button className="w-full md:w-auto bg-slate-800 rounded-lg px-3 py-1 border border-slate-500">
              Найти
            </button>
          </form>
        </div>
      </div>
      <div className="container py-5">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 justify-items-center">
          {titles &&
            titles?.map(title => (
              <AnimeCard
                key={title.id}
                alias={title?.alias}
                image={title.poster.src}
                title={title?.name.main}
              />
            ))}
        </div>
      </div>
    </>
  );
};
