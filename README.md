# Anime Hosting V2 (React + TypeScript + Vite)

Приложение для просмотра аниме с поддержкой HLS, переключения качества и пропуска интро.

## Требования
- Node.js 18+
- PNPM/Yarn/NPM (любой пакетный менеджер)

## Установка
```bash
# Клонирование
git clone <your_repo_url> anime-hosting-v2
cd anime-hosting-v2

# Установка зависимостей
yarn install
# или
npm install
```

## Конфигурация
На данный момент хосты API и медиа захардкожены в `src/api/index.ts`:
```ts
export const IMG_HOST = 'https://anilibria.top/';
export const VIDEO_HOST = 'https://cache-rfn.libria.fun/';
export const $api = axios.create({ baseURL: 'https://anilibria.top/api/v1' });
```
При необходимости, вынесите в `.env` и используйте `import.meta.env`.

## Скрипты
```bash
yarn dev       # запуск локально (Vite)
yarn build     # сборка в /dist
yarn preview   # предпросмотр прод-сборки
yarn lint      # линтинг
```

## Запуск
```bash
yarn dev
# Откройте http://localhost:5173
```

## Сборка
```bash
yarn build
# Артефакты в папке /dist
```

## Структура проекта (основное)
- `src/pages/AnimeDetailPage/AnimeDetailPage.tsx` — страница просмотра эпизода
- `src/components/VideoPlayer/VideoPlayer.tsx` — плеер (HLS, качества, пропуск интро)
- `src/api/index.ts` — базовая конфигурация API/хостов

## Развёртывание на GitHub Pages (опционально)
1. Установите base в `vite.config.ts`, если деплой в сабдиректорию.
2. Сборка: `yarn build`.
3. Залейте содержимое `dist/` на ветку `gh-pages` или используйте GitHub Actions.

## Лицензия
MIT
