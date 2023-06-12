// vite.config.js
import { defineConfig, loadEnv } from "file:///Users/Giovanni/Developer/progressive-web-apps/node_modules/.pnpm/vite@4.2.1/node_modules/vite/dist/node/index.js";
import commonjs from "file:///Users/Giovanni/Developer/progressive-web-apps/node_modules/.pnpm/@rollup+plugin-commonjs@24.0.1/node_modules/@rollup/plugin-commonjs/dist/es/index.js";
var vite_config_default = defineConfig({
  appType: "custom",
  base: "./",
  plugins: [commonjs()],
  optimizeDeps: { exclude: ["fsevents"] },
  publicDir: "src/public",
  server: {
    port: 3e3,
    origin: "http://localhost:3000"
  },
  hmr: {
    clientPort: 5173
  },
  preview: {
    port: 3e3
  },
  ssr: {
    target: "node"
  },
  build: {
    outDir: "build",
    assetsDir: " ",
    sourcemap: true,
    minify: false,
    manifest: true,
    ssrManifest: true,
    rollupOptions: {
      input: "./assets/main.js"
    }
  },
  prerender: true
}, ({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    // vite config
    define: {
      __APP_ENV__: env.APP_ENV
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvR2lvdmFubmkvRGV2ZWxvcGVyL3Byb2dyZXNzaXZlLXdlYi1hcHBzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvR2lvdmFubmkvRGV2ZWxvcGVyL3Byb2dyZXNzaXZlLXdlYi1hcHBzL3ZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9HaW92YW5uaS9EZXZlbG9wZXIvcHJvZ3Jlc3NpdmUtd2ViLWFwcHMvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJztcbmltcG9ydCBjb21tb25qcyBmcm9tICdAcm9sbHVwL3BsdWdpbi1jb21tb25qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGFwcFR5cGU6IFwiY3VzdG9tXCIsXG4gIGJhc2U6IFwiLi9cIixcbiAgcGx1Z2luczogW2NvbW1vbmpzKCksXSxcbiAgb3B0aW1pemVEZXBzOiB7ZXhjbHVkZTogW1wiZnNldmVudHNcIl19LFxuICBwdWJsaWNEaXI6ICdzcmMvcHVibGljJyxcbiAgc2VydmVyOiB7XG4gICAgcG9ydDogMzAwMCxcbiAgICBvcmlnaW46ICdodHRwOi8vbG9jYWxob3N0OjMwMDAnXG4gIH0sXG4gIGhtcjoge1xuICAgIGNsaWVudFBvcnQ6IDUxNzNcbiAgfSxcbiAgcHJldmlldzoge1xuICAgIHBvcnQ6IDMwMDAsXG4gIH0sXG4gIHNzcjoge1xuICAgIHRhcmdldDogJ25vZGUnXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgb3V0RGlyOiAnYnVpbGQnLFxuICAgIGFzc2V0c0RpcjogJyAnLFxuICAgIHNvdXJjZW1hcDogdHJ1ZSxcbiAgICBtaW5pZnk6IGZhbHNlLFxuICAgIG1hbmlmZXN0OiB0cnVlLFxuICAgIHNzck1hbmlmZXN0OiB0cnVlLFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGlucHV0OiAnLi9hc3NldHMvbWFpbi5qcycsXG4gICAgfVxuICB9LFxuICBwcmVyZW5kZXI6IHRydWVcbn0sKHsgY29tbWFuZCwgbW9kZSB9KSA9PiB7XG4gIC8vIExvYWQgZW52IGZpbGUgYmFzZWQgb24gYG1vZGVgIGluIHRoZSBjdXJyZW50IHdvcmtpbmcgZGlyZWN0b3J5LlxuICAvLyBTZXQgdGhlIHRoaXJkIHBhcmFtZXRlciB0byAnJyB0byBsb2FkIGFsbCBlbnYgcmVnYXJkbGVzcyBvZiB0aGUgYFZJVEVfYCBwcmVmaXguXG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSwgJycpXG4gIHJldHVybiB7XG4gICAgLy8gdml0ZSBjb25maWdcbiAgICBkZWZpbmU6IHtcbiAgICAgIF9fQVBQX0VOVl9fOiBlbnYuQVBQX0VOVixcbiAgICB9LFxuICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE0VCxTQUFTLGNBQWMsZUFBZTtBQUNsVyxPQUFPLGNBQWM7QUFFckIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLEVBQ1QsTUFBTTtBQUFBLEVBQ04sU0FBUyxDQUFDLFNBQVMsQ0FBRTtBQUFBLEVBQ3JCLGNBQWMsRUFBQyxTQUFTLENBQUMsVUFBVSxFQUFDO0FBQUEsRUFDcEMsV0FBVztBQUFBLEVBQ1gsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sUUFBUTtBQUFBLEVBQ1Y7QUFBQSxFQUNBLEtBQUs7QUFBQSxJQUNILFlBQVk7QUFBQSxFQUNkO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0gsUUFBUTtBQUFBLEVBQ1Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLFdBQVc7QUFBQSxJQUNYLFdBQVc7QUFBQSxJQUNYLFFBQVE7QUFBQSxJQUNSLFVBQVU7QUFBQSxJQUNWLGFBQWE7QUFBQSxJQUNiLGVBQWU7QUFBQSxNQUNiLE9BQU87QUFBQSxJQUNUO0FBQUEsRUFDRjtBQUFBLEVBQ0EsV0FBVztBQUNiLEdBQUUsQ0FBQyxFQUFFLFNBQVMsS0FBSyxNQUFNO0FBR3ZCLFFBQU0sTUFBTSxRQUFRLE1BQU0sUUFBUSxJQUFJLEdBQUcsRUFBRTtBQUMzQyxTQUFPO0FBQUE7QUFBQSxJQUVMLFFBQVE7QUFBQSxNQUNOLGFBQWEsSUFBSTtBQUFBLElBQ25CO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
