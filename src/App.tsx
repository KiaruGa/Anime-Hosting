import { Route, Routes } from 'react-router-dom';
import {
  AnimeUpdatePage,
  AnimeDetailPage,
  AnimeListPage,
  HomePage,
  AnimeSchedulePage,
} from './pages';
import { Layout } from './components';

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} index />
          <Route path="/anime-list" element={<AnimeListPage />} />
          <Route path="/title/:alias" element={<AnimeDetailPage />} />
          <Route path="/last-updates" element={<AnimeUpdatePage />} />
          <Route path="/schedule" element={<AnimeSchedulePage />} />
        </Route>
      </Routes>
    </>
  );
};
