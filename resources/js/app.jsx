import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

import MainLayout from './Layouts/MainLayout';

const appName = import.meta.env.VITE_APP_NAME || 'AIMS';

createInertiaApp({
  title: (title) => title ? `${title} | ${appName}` : appName,
  resolve: async (name) => {
    const pages = import.meta.glob('./Pages/**/*.jsx');
    const page = (await pages[`./Pages/${name}.jsx`]()).default;

    page.layout ??= (page) => <MainLayout>{page}</MainLayout>;

    return page;
  },
  setup({ el, App, props }) {
    const root = createRoot(el);
    root.render(<App {...props} />);
  },
  progress: {
    color: '#4B5563',
  },
});