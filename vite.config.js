import { defineConfig, loadEnv } from 'vite';
import commonjs from '@rollup/plugin-commonjs';

export default defineConfig({
  appType: "custom",
  base: "./",
  plugins: [commonjs(),],
  optimizeDeps: {exclude: ["fsevents"]},
  publicDir: 'src/public',
  server: {
    port: 3000,
    origin: 'http://localhost:3000'
  },
  hmr: {
    clientPort: 5173
  },
  preview: {
    port: 3000,
  },
  ssr: {
    target: 'node'
  },
  build: {
    outDir: 'build',
    assetsDir: 'assets',
    sourcemap: true,
    minify: true,
    manifest: true,
    ssrManifest: true,
    rollupOptions: {
      input: './src/assets/main.js',
    }
  },
  prerender: true
},({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  return {
    // vite config
    define: {
      __APP_ENV__: env.APP_ENV,
    },
  }
})
