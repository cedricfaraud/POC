import inject from '@rollup/plugin-inject';
import { defineConfig, PluginOption } from 'vite';

export default defineConfig({
  plugins: [
    inject({
      global: 'globalThis', // Injection du polyfill pour "global".
    }) as unknown as PluginOption, // Conversion explicite vers PluginOption.
  ],
  resolve: {
    alias: {
      buffer: 'buffer',
      process: 'process/browser',
    },
  },
});
