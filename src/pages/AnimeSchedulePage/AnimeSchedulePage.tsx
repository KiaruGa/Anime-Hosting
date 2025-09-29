import { useEffect, useState } from 'react';
import { getSchedule } from '../../api';
import type { IScheduleArray } from '../../types/schedule.type';
import { AnimeCard } from '../../components';

export const AnimeSchedulePage = () => {
  const [schedule, setSchedule] = useState<IScheduleArray>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const createSchedule = async () => {
    try {
      setLoading(true);
      setError(null);
      const timeoutSchedule = await getSchedule();
      setSchedule(timeoutSchedule);
    } catch (err) {
      console.error('Error fetching schedule:', err);
      setError('Ошибка загрузки расписания');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    createSchedule();
  }, []);

  const daysOfWeek = [
    { name: 'Понедельник', value: 1 },
    { name: 'Вторник', value: 2 },
    { name: 'Среда', value: 3 },
    { name: 'Четверг', value: 4 },
    { name: 'Пятница', value: 5 },
    { name: 'Суббота', value: 6 },
    { name: 'Воскресенье', value: 7 },
  ];

  const DaySchedule = ({
    dayName,
    dayValue,
  }: {
    dayName: string;
    dayValue: number;
  }) => {
    const dayAnime = schedule.filter(
      item => item.release.publish_day.value === dayValue,
    );

    return (
      <div className="py-5">
        <h2 className="text-center font-bold text-2xl mb-5">{dayName}:</h2>
        {dayAnime.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {dayAnime.map(item => (
              <AnimeCard
                key={item.release.id}
                image={item.release.poster.src}
                title={item.release.name.main}
                alias={item.release.alias}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 py-8">
            Нет аниме на этот день
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="container py-[20px]">
        <div className="flex justify-center items-center h-64">
          <div className="text-xl">Загрузка расписания...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-[20px]">
        <div className="flex justify-center items-center h-64">
          <div className="text-xl text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container py-[20px]">
        <h1 className="text-3xl font-semibold text-center mb-8">
          Расписание выхода серий
        </h1>
        <div>
          {daysOfWeek.map(day => (
            <DaySchedule
              key={day.value}
              dayName={day.name}
              dayValue={day.value}
            />
          ))}
        </div>
      </div>
    </>
  );
};
