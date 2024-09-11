import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import UnoCSS from 'unocss/vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig(({ command }) => ({
  plugins: [
    // UnoCSS(),
    svelte({ inspector: true }),
    command === 'build' && viteSingleFile({ removeViteModuleLoader: true }) //npm run build
  ],
  build: {
    minify: true
  }
}));
