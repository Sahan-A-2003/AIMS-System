import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',   // Tailwind CSS entry
                'resources/js/app.jsx',    //  React app entry
            ],
            refresh: true,
        }),
        react(),
    ],
});
