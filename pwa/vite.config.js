import { defineConfig, loadEnv } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import nunjucks from 'vite-plugin-nunjucks';
import path, { resolve } from 'path';
import {fileURLToPath} from 'url'
import commonjs from '@rollup/plugin-commonjs';
import { format } from 'path';
import { getMuseumDataByMaker } from './src/helpers/api';

// export default defineConfig({
//   server: {
//     port: 3000,
//   },
//   preview: {
//     port: 8080,
//   },
// });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const rembrand = getMuseumDataByMaker('Rembrandt+van+Rijn');
const Johannes = getMuseumDataByMaker('Johannes+Vermeer');
const data = {
  title: 'home',
  makers: [{
    name: 'Rembrand',
    data: rembrand
  },{
    name: 'Johannes Vermeer',
    data: Johannes
  },
]
}

const pageData = {
  '/index.html': {
    title: 'Main Page',
    makers: [{
      name: 'Rembrand',
      data: rembrand
    },{
      name: 'Johannes Vermeer',
      data: Johannes
    },
  ]
  },
  '/collection.html': {
    title: 'Sub Page',
  },
  '/details.html': {
    title: 'Sub Page',
  },
};

const handlebarConfig = {
  defaultLayout: 'main',
  partialDirectory:'src/server/views/partials',
  context(pagePath) {
    return pageData[pagePath];
  },
}

export default defineConfig({
  plugins: [commonjs(),],
  base: "/",
  optimizeDeps: {exclude: ["fsevents"]},
  appType: "custom",
  publicDir: 'src/public',
  server: {
    port: 3000,
    origin: 'http://localhost:3000',
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..'],
    },
  },
  strictPort: true,
  hmr: {
    clientPort: 3000
  },
  preview: {
    port: 8080,
  },
  ssr: {
    target: 'node'
  },
  build: {
    outDir: 'docs',
    sourcemap: true,
    minify: false,
    manifest: true,
    ssrManifest: true,
    ssr: '/src/server.js',
    rollupOptions: {
      input: './src/server.js',
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
