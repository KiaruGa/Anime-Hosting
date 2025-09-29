import axios from 'axios';

export const IMG_HOST = 'https://anilibria.top/';
export const VIDEO_HOST = 'https://cache-rfn.libria.fun/';

export const $api = axios.create({
  baseURL: 'https://anilibria.top/api/v1',
});

export const getSchedule = async () => {
  const response = await $api.get('/anime/schedule/week');
  return response.data;
};
