import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Outlet, RouterProvider, ScrollRestoration } from 'react-router';
import Canvas, { type Page } from './Canvas';
import './styles.css';

const HOME_SLUG = 'aminatadiakite';

const pagesByFilePath = import.meta.glob<Page>('./data/pages/*.json', {
  eager: true,
  import: 'default',
});

function slugFromFilePath(filePath: string): string {
  const fileName = filePath.split('/').pop();
  if (!fileName) throw new Error(`Cannot extract filename from ${filePath}`);
  return fileName.replace('.json', '');
}

const routes = Object.entries(pagesByFilePath).map(([filePath, page]) => {
  const slug = slugFromFilePath(filePath);
  const path = slug === HOME_SLUG ? '/' : `/${slug}`;
  return { path, element: <Canvas key={slug} page={page} /> };
});

const homeRoute = routes.find((route) => route.path === '/');
if (!homeRoute) throw new Error(`Missing home page JSON: data/pages/${HOME_SLUG}.json`);

const router = createBrowserRouter([
  {
    element: (
      <>
        <Outlet />
        <ScrollRestoration />
      </>
    ),
    children: [...routes, { path: '*', element: homeRoute.element }],
  },
]);

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Missing #root element in index.html');

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
