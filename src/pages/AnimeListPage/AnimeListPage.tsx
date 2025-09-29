import { useEffect, useState } from 'react';
import { $api } from '../../api';
import { Pagination, type PaginationProps } from 'antd';
import type { AnimeList, IPagination, Title } from '../../types/anime.type';
import { AnimeCard } from '../../components';
import { Loader } from '../../components/Loader/Loader';

export const AnimeListPage = () => {
  const [titles, setTitles] = useState<Title[]>();
  const [pagination, setPagination] = useState<IPagination>();
  const [activePage, setActivePage] = useState(1);
  const [loading, setLoading] = useState(false);

  const changePage: PaginationProps['onChange'] = (page: number) => {
    setActivePage(page);
  };

  useEffect(() => {
    setLoading(true);
    $api
      .get<AnimeList>('/anime/catalog/releases', {
        params: {
          page: activePage,
          limit: 6,
        },
      })
      .then(response => {
        setTitles(response.data.data);
        setPagination(response.data.meta.pagination);
        setLoading(false);
      });
  }, [activePage]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
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
        <div className="flex items-center justify-center py-2">
          <Pagination
            className="md:hidden block"
            current={activePage}
            total={pagination?.total_pages}
            defaultCurrent={1}
            onChange={changePage}
            showSizeChanger={false}
            size="small"
          />
          <Pagination
            className="hidden md:block"
            current={activePage}
            total={pagination?.total_pages}
            defaultCurrent={1}
            onChange={changePage}
            showSizeChanger={false}
          />
        </div>
      </div>
    </>
  );
};
