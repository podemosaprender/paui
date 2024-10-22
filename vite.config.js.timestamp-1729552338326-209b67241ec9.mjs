// vite.config.js
import { defineConfig } from "file:///E:/temp/Mauri/paui/node_modules/vite/dist/node/index.js";
import { splitVendorChunkPlugin } from "file:///E:/temp/Mauri/paui/node_modules/vite/dist/node/index.js";
import react from "file:///E:/temp/Mauri/paui/node_modules/@vitejs/plugin-react/dist/index.mjs";
import mkcert from "file:///E:/temp/Mauri/paui/node_modules/vite-plugin-mkcert/dist/mkcert.mjs";
import { nodePolyfills } from "file:///E:/temp/Mauri/paui/node_modules/vite-plugin-node-polyfills/dist/index.js";

// manifest.js
import mimeDb from "file:///E:/temp/Mauri/paui/node_modules/mime-db/index.js";

// src/svc/extensions.json
var extensions_default = {
  "1.ada": [
    "code"
  ],
  "2.ada": [
    "code"
  ],
  "3dm": [
    "image"
  ],
  "3ds": [
    "image"
  ],
  "3g2": [
    "video"
  ],
  "3gp": [
    "video"
  ],
  "7z": [
    "archive"
  ],
  a: [
    "archive"
  ],
  aac: [
    "audio"
  ],
  aaf: [
    "video"
  ],
  ada: [
    "code"
  ],
  adb: [
    "code"
  ],
  ads: [
    "code"
  ],
  ai: [
    "image"
  ],
  aiff: [
    "audio"
  ],
  ape: [
    "audio"
  ],
  apk: [
    "archive"
  ],
  ar: [
    "archive"
  ],
  asf: [
    "video"
  ],
  asm: [
    "code"
  ],
  au: [
    "audio"
  ],
  avchd: [
    "video"
  ],
  avi: [
    "video"
  ],
  azw: [
    "book"
  ],
  azw1: [
    "book"
  ],
  azw3: [
    "book"
  ],
  azw4: [
    "book"
  ],
  azw6: [
    "book"
  ],
  bas: [
    "code"
  ],
  bash: [
    "code",
    "exec"
  ],
  bat: [
    "code",
    "exec"
  ],
  bin: [
    "exec"
  ],
  bmp: [
    "image"
  ],
  bz2: [
    "archive"
  ],
  c: [
    "code"
  ],
  "c++": [
    "code"
  ],
  cab: [
    "archive"
  ],
  cbl: [
    "code"
  ],
  cbr: [
    "book"
  ],
  cbz: [
    "book"
  ],
  cc: [
    "code"
  ],
  class: [
    "code"
  ],
  clj: [
    "code"
  ],
  cob: [
    "code"
  ],
  command: [
    "exec"
  ],
  cpio: [
    "archive"
  ],
  cpp: [
    "code"
  ],
  crx: [
    "exec"
  ],
  cs: [
    "code"
  ],
  csh: [
    "code",
    "exec"
  ],
  css: [
    "web"
  ],
  csv: [
    "sheet"
  ],
  cxx: [
    "code"
  ],
  d: [
    "code"
  ],
  dds: [
    "image"
  ],
  deb: [
    "archive"
  ],
  diff: [
    "code"
  ],
  dmg: [
    "archive"
  ],
  doc: [
    "text"
  ],
  docx: [
    "text"
  ],
  drc: [
    "video"
  ],
  dwg: [
    "image"
  ],
  dxf: [
    "image"
  ],
  e: [
    "code"
  ],
  ebook: [
    "text"
  ],
  egg: [
    "archive"
  ],
  el: [
    "code"
  ],
  eot: [
    "font"
  ],
  eps: [
    "image"
  ],
  epub: [
    "book"
  ],
  exe: [
    "exec"
  ],
  f: [
    "code"
  ],
  f77: [
    "code"
  ],
  f90: [
    "code"
  ],
  fish: [
    "code",
    "exec"
  ],
  flac: [
    "audio"
  ],
  flv: [
    "video"
  ],
  for: [
    "code"
  ],
  fth: [
    "code"
  ],
  ftn: [
    "code"
  ],
  gif: [
    "image"
  ],
  go: [
    "code"
  ],
  gpx: [
    "image"
  ],
  groovy: [
    "code"
  ],
  gsm: [
    "audio"
  ],
  gz: [
    "archive"
  ],
  h: [
    "code"
  ],
  hh: [
    "code"
  ],
  hpp: [
    "code"
  ],
  hs: [
    "code"
  ],
  htm: [
    "code",
    "web"
  ],
  html: [
    "code",
    "web"
  ],
  hxx: [
    "code"
  ],
  ics: [
    "sheet"
  ],
  iso: [
    "archive"
  ],
  it: [
    "audio"
  ],
  jar: [
    "archive"
  ],
  java: [
    "code"
  ],
  jpeg: [
    "image"
  ],
  jpg: [
    "image"
  ],
  js: [
    "code",
    "web"
  ],
  jsp: [
    "code"
  ],
  jsx: [
    "code",
    "web"
  ],
  kml: [
    "image"
  ],
  kmz: [
    "image"
  ],
  ksh: [
    "code",
    "exec"
  ],
  kt: [
    "code"
  ],
  less: [
    "web"
  ],
  lha: [
    "archive"
  ],
  lhs: [
    "code"
  ],
  lisp: [
    "code"
  ],
  log: [
    "text"
  ],
  lua: [
    "code"
  ],
  m: [
    "code"
  ],
  m2v: [
    "video"
  ],
  m3u: [
    "audio"
  ],
  m4: [
    "code"
  ],
  m4a: [
    "audio"
  ],
  m4p: [
    "video"
  ],
  m4v: [
    "video"
  ],
  mar: [
    "archive"
  ],
  max: [
    "image"
  ],
  md: [
    "text"
  ],
  mid: [
    "audio"
  ],
  mkv: [
    "video"
  ],
  mng: [
    "video"
  ],
  mobi: [
    "book"
  ],
  mod: [
    "audio"
  ],
  mov: [
    "video"
  ],
  mp2: [
    "video"
  ],
  mp3: [
    "audio"
  ],
  mp4: [
    "video"
  ],
  mpa: [
    "audio"
  ],
  mpe: [
    "video"
  ],
  mpeg: [
    "video"
  ],
  mpg: [
    "video"
  ],
  mpv: [
    "video"
  ],
  msg: [
    "text"
  ],
  msi: [
    "exec"
  ],
  mxf: [
    "video"
  ],
  nim: [
    "code"
  ],
  nsv: [
    "video"
  ],
  odp: [
    "slide"
  ],
  ods: [
    "sheet"
  ],
  odt: [
    "text"
  ],
  ogg: [
    "video"
  ],
  ogm: [
    "video"
  ],
  ogv: [
    "video"
  ],
  org: [
    "text"
  ],
  otf: [
    "font"
  ],
  pages: [
    "text"
  ],
  pak: [
    "archive"
  ],
  patch: [
    "code"
  ],
  pdf: [
    "text"
  ],
  pea: [
    "archive"
  ],
  php: [
    "code",
    "web"
  ],
  pl: [
    "code"
  ],
  pls: [
    "audio"
  ],
  png: [
    "image"
  ],
  po: [
    "code"
  ],
  pp: [
    "code"
  ],
  ppt: [
    "slide"
  ],
  ps: [
    "image"
  ],
  psd: [
    "image"
  ],
  py: [
    "code"
  ],
  qt: [
    "video"
  ],
  r: [
    "code"
  ],
  ra: [
    "audio"
  ],
  rar: [
    "archive"
  ],
  rb: [
    "code"
  ],
  rm: [
    "video"
  ],
  rmvb: [
    "video"
  ],
  roq: [
    "video"
  ],
  rpm: [
    "archive"
  ],
  rs: [
    "code"
  ],
  rst: [
    "text"
  ],
  rtf: [
    "text"
  ],
  s: [
    "code"
  ],
  s3m: [
    "audio"
  ],
  s7z: [
    "archive"
  ],
  scala: [
    "code"
  ],
  scss: [
    "web"
  ],
  sh: [
    "code",
    "exec"
  ],
  shar: [
    "archive"
  ],
  sid: [
    "audio"
  ],
  srt: [
    "video"
  ],
  svg: [
    "image"
  ],
  svi: [
    "video"
  ],
  swg: [
    "code"
  ],
  swift: [
    "code"
  ],
  tar: [
    "archive"
  ],
  tbz2: [
    "archive"
  ],
  tex: [
    "text"
  ],
  tga: [
    "image"
  ],
  tgz: [
    "archive"
  ],
  thm: [
    "image"
  ],
  tif: [
    "image"
  ],
  tiff: [
    "image"
  ],
  tlz: [
    "archive"
  ],
  ttf: [
    "font"
  ],
  txt: [
    "text"
  ],
  v: [
    "code"
  ],
  vb: [
    "code"
  ],
  vcf: [
    "sheet"
  ],
  vcxproj: [
    "code"
  ],
  vob: [
    "video"
  ],
  war: [
    "archive"
  ],
  wasm: [
    "web"
  ],
  wav: [
    "audio"
  ],
  webm: [
    "video"
  ],
  webp: [
    "image"
  ],
  whl: [
    "archive"
  ],
  wma: [
    "audio"
  ],
  wmv: [
    "video"
  ],
  woff: [
    "font"
  ],
  woff2: [
    "font"
  ],
  wpd: [
    "text"
  ],
  wps: [
    "text"
  ],
  xcf: [
    "image"
  ],
  xcodeproj: [
    "code"
  ],
  xls: [
    "sheet"
  ],
  xlsx: [
    "sheet"
  ],
  xm: [
    "audio"
  ],
  xml: [
    "code"
  ],
  xpi: [
    "archive"
  ],
  xz: [
    "archive"
  ],
  yuv: [
    "image",
    "video"
  ],
  zip: [
    "archive"
  ],
  zipx: [
    "archive"
  ],
  zsh: [
    "code",
    "exec"
  ]
};

// manifest.js
var BaseManifest = {
  //A: pwa manifest template HERE
  name: "PAUI",
  short_name: "PAUI",
  description: "PAUI",
  start_url: "./?version=1",
  //A: tiene que ser ABSOLUTA, no ./ para que ande share_target!
  theme_color: "#000000",
  share_target: {
    "action": "./_share-target",
    "enctype": "multipart/form-data",
    "method": "POST",
    "params": {
      "files": [{
        //SEE: https://github.com/GoogleChrome/samples/blob/gh-pages/web-share/src/manifest.json
        "name": "media",
        "accept": []
      }]
    }
  },
  file_handlers: [
    {
      "action": "/",
      "accept": {
        "image/jpeg": [".jpg", ".jpeg"],
        "image/png": [".png"]
      }
    }
  ]
};
var allFileTypesAndMimes = () => {
  let r = {};
  Object.keys(mimeDb).forEach((e) => r[e] = 1);
  Object.keys(extensions_default).forEach((ext) => r["application/" + ext] = 1);
  return Object.keys(r).sort();
};
var allMimeToExtension = () => {
  let r = {};
  Object.entries(extensions_default).forEach(
    ([ext, types]) => r["application/" + ext] = ["." + ext]
  );
  return r;
};
var makeManifest = () => {
  let r = { ...BaseManifest };
  r.share_target.params.files = [
    { name: "text", accept: ["text/plain", "text/string"] },
    {
      name: "media",
      accept: [
        "audio/*",
        "image/*",
        "video/*",
        "application/x-pdf",
        ...allFileTypesAndMimes()
      ]
    }
  ];
  r.file_handlers[0].accept = {
    ...r.file_handlers[0].accept,
    ...allMimeToExtension()
  };
  return r;
};

// vite.config.js
import vitePluginRequire from "file:///E:/temp/Mauri/paui/node_modules/vite-plugin-require/dist/index.js";
import { VitePWA } from "file:///E:/temp/Mauri/paui/node_modules/vite-plugin-pwa/dist/index.js";
import { comlink } from "file:///E:/temp/Mauri/paui/node_modules/vite-plugin-comlink/dist/index.mjs";
var BasePath = (process.env.GITHUB_REPOSITORY || "").replace(/^[^\/]*/, "");
function manualChunks(id) {
  console.log("manualChunks", id);
  if (id.includes("node_modules")) {
    return id.includes("prime") ? "vendor-prime" : id.includes("lezer") ? "vendor-lezer" : id.includes("mirror") ? "vendor-mirror" : id.includes("git") ? "vendor-git" : id.includes("ethers") ? "vendor-ethers" : id.includes("qr-scanner") ? "vendor-qr-scanner" : "vendor";
  }
}
var vite_config_default = defineConfig({
  base: BasePath,
  resolve: {
    alias: {
      src: "/src"
      //A: absolute imports
    }
  },
  worker: {
    plugins: () => [
      nodePolyfills(),
      comlink()
    ]
  },
  plugins: [
    ...process.env.NOSSL ? [] : [basicSsl()],
    // mkcert(),
    react(),
    vitePluginRequire.default(),
    nodePolyfills(),
    comlink(),
    splitVendorChunkPlugin(),
    VitePWA({
      strategies: "injectManifest",
      registerType: "autoUpdate",
      injectRegister: false,
      pwaAssets: { disabled: false, config: true },
      //A: use asset generator
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
        cleanupOutdatedCaches: true,
        clientsClaim: true
      },
      manifest: makeManifest(),
      devOptions: {
        //SEE: https://vite-pwa-org.netlify.app/guide/development.html#type-declarations
        enabled: true,
        //A: can install from npm run dev
        navigateFallback: "index.html",
        suppressWarnings: false,
        type: "module"
      }
    })
  ],
  build: {
    minify: process.env.DBG ? false : true,
    commonjsOptions: { transformMixedEsModules: true },
    rollupOptions: { output: { manualChunks } }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiLCAibWFuaWZlc3QuanMiLCAic3JjL3N2Yy9leHRlbnNpb25zLmpzb24iXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFx0ZW1wXFxcXE1hdXJpXFxcXHBhdWlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXHRlbXBcXFxcTWF1cmlcXFxccGF1aVxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovdGVtcC9NYXVyaS9wYXVpL3ZpdGUuY29uZmlnLmpzXCI7Ly8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHsgc3BsaXRWZW5kb3JDaHVua1BsdWdpbiB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcclxuLy8gaW1wb3J0IGJhc2ljU3NsIGZyb20gJ0B2aXRlanMvcGx1Z2luLWJhc2ljLXNzbCdcclxuaW1wb3J0IG1rY2VydCBmcm9tICd2aXRlLXBsdWdpbi1ta2NlcnQnXHJcbmltcG9ydCB7IG5vZGVQb2x5ZmlsbHMgfSBmcm9tICd2aXRlLXBsdWdpbi1ub2RlLXBvbHlmaWxscydcclxuaW1wb3J0IHsgbWFrZU1hbmlmZXN0LCBhbGxGaWxlVHlwZXNBbmRNaW1lcyB9IGZyb20gJy4vbWFuaWZlc3QuanMnO1xyXG5pbXBvcnQgdml0ZVBsdWdpblJlcXVpcmUgZnJvbSBcInZpdGUtcGx1Z2luLXJlcXVpcmVcIjtcclxuXHJcbi8vU0VFOiBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL3NlcnZlci1vcHRpb25zLmh0bWwjc2VydmVyLWh0dHBzXHJcblxyXG5jb25zdCBCYXNlUGF0aD0gKHByb2Nlc3MuZW52LkdJVEhVQl9SRVBPU0lUT1JZfHwnJykucmVwbGFjZSgvXlteXFwvXSovLCcnKSBcclxuXHJcbmltcG9ydCB7IFZpdGVQV0EgfSBmcm9tICd2aXRlLXBsdWdpbi1wd2EnO1xyXG5pbXBvcnQgeyBjb21saW5rIH0gZnJvbSAndml0ZS1wbHVnaW4tY29tbGluaydcclxuXHJcbmZ1bmN0aW9uIG1hbnVhbENodW5rcyhpZCkge1xyXG5cdGNvbnNvbGUubG9nKFwibWFudWFsQ2h1bmtzXCIsaWQpO1xyXG5cdGlmIChpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzJykpIHtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdGlkLmluY2x1ZGVzKCdwcmltZScpID8gJ3ZlbmRvci1wcmltZScgOlxyXG5cdFx0XHRpZC5pbmNsdWRlcygnbGV6ZXInKSA/ICd2ZW5kb3ItbGV6ZXInIDpcclxuXHRcdFx0aWQuaW5jbHVkZXMoJ21pcnJvcicpID8gJ3ZlbmRvci1taXJyb3InIDpcclxuXHRcdFx0aWQuaW5jbHVkZXMoJ2dpdCcpID8gJ3ZlbmRvci1naXQnIDpcclxuXHRcdFx0aWQuaW5jbHVkZXMoJ2V0aGVycycpID8gJ3ZlbmRvci1ldGhlcnMnIDpcclxuXHRcdFx0aWQuaW5jbHVkZXMoJ3FyLXNjYW5uZXInKSA/ICd2ZW5kb3ItcXItc2Nhbm5lcicgOlxyXG5cdFx0XHQndmVuZG9yJ1xyXG5cdFx0KVxyXG5cdH1cclxufVxyXG5cclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcblx0YmFzZTogQmFzZVBhdGgsXHJcblx0cmVzb2x2ZToge1xyXG5cdFx0YWxpYXM6IHtcclxuXHRcdFx0c3JjOiBcIi9zcmNcIiwgLy9BOiBhYnNvbHV0ZSBpbXBvcnRzXHJcblx0XHR9LFxyXG5cdH0sXHJcblx0d29ya2VyOiB7XHJcblx0XHRwbHVnaW5zOiAoKSA9PiAoW1xyXG5cdFx0XHRub2RlUG9seWZpbGxzKCksXHJcblx0XHRcdGNvbWxpbmsoKSxcclxuXHRcdF0pXHJcblx0fSxcclxuXHRwbHVnaW5zOiBbXHJcblx0XHQuLi4ocHJvY2Vzcy5lbnYuTk9TU0wgPyBbXSA6IFtiYXNpY1NzbCgpXSksXHJcblx0XHQvLyBta2NlcnQoKSxcclxuXHRcdHJlYWN0KCksICBcclxuXHRcdHZpdGVQbHVnaW5SZXF1aXJlLmRlZmF1bHQoKSxcclxuXHRcdG5vZGVQb2x5ZmlsbHMoKSxcclxuXHRcdGNvbWxpbmsoKSxcclxuXHRcdHNwbGl0VmVuZG9yQ2h1bmtQbHVnaW4oKSxcclxuXHRcdFZpdGVQV0Eoe1xyXG5cdFx0XHRzdHJhdGVnaWVzOiAnaW5qZWN0TWFuaWZlc3QnLFxyXG5cdFx0XHRyZWdpc3RlclR5cGU6ICdhdXRvVXBkYXRlJyxcclxuXHRcdFx0aW5qZWN0UmVnaXN0ZXI6IGZhbHNlLFxyXG5cdFx0XHRwd2FBc3NldHM6IHsgZGlzYWJsZWQ6IGZhbHNlLCBjb25maWc6IHRydWUsIH0sIC8vQTogdXNlIGFzc2V0IGdlbmVyYXRvclxyXG5cdFx0XHR3b3JrYm94OiB7XHJcblx0XHRcdFx0Z2xvYlBhdHRlcm5zOiBbJyoqLyoue2pzLGNzcyxodG1sLHN2ZyxwbmcsaWNvfSddLFxyXG5cdFx0XHRcdGNsZWFudXBPdXRkYXRlZENhY2hlczogdHJ1ZSxcclxuXHRcdFx0XHRjbGllbnRzQ2xhaW06IHRydWUsXHJcblx0XHRcdH0sXHJcblx0XHRcdG1hbmlmZXN0OiBtYWtlTWFuaWZlc3QoKSxcclxuXHJcblx0XHRcdGRldk9wdGlvbnM6IHsgLy9TRUU6IGh0dHBzOi8vdml0ZS1wd2Etb3JnLm5ldGxpZnkuYXBwL2d1aWRlL2RldmVsb3BtZW50Lmh0bWwjdHlwZS1kZWNsYXJhdGlvbnNcclxuXHRcdFx0XHRlbmFibGVkOiB0cnVlLCAvL0E6IGNhbiBpbnN0YWxsIGZyb20gbnBtIHJ1biBkZXZcclxuXHRcdFx0XHRuYXZpZ2F0ZUZhbGxiYWNrOiAnaW5kZXguaHRtbCcsXHJcblx0XHRcdFx0c3VwcHJlc3NXYXJuaW5nczogZmFsc2UsXHJcblx0XHRcdFx0dHlwZTogJ21vZHVsZScsXHJcblx0XHRcdH0sXHJcblx0XHR9KV0sXHJcblx0YnVpbGQ6IHtcclxuXHRcdG1pbmlmeTogcHJvY2Vzcy5lbnYuREJHID8gZmFsc2UgOiB0cnVlLFxyXG5cdFx0Y29tbW9uanNPcHRpb25zOiB7IHRyYW5zZm9ybU1peGVkRXNNb2R1bGVzOiB0cnVlIH0sXHJcblx0XHRyb2xsdXBPcHRpb25zOiB7IG91dHB1dDogeyBtYW51YWxDaHVua3MgfX0sXHJcblx0fSxcclxufSlcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFx0ZW1wXFxcXE1hdXJpXFxcXHBhdWlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXHRlbXBcXFxcTWF1cmlcXFxccGF1aVxcXFxtYW5pZmVzdC5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovdGVtcC9NYXVyaS9wYXVpL21hbmlmZXN0LmpzXCI7Ly9JTkZPOiBnZW5lcmF0ZSBtYW5pZmVzdC53ZWJtYW5pZmVzdCwgaW5jbHVkZWQgYnkgdml0ZS5jb25maWcuanNcclxuLy9VOiB1c2luZyAnYXBwbGljYXRpb24vKicgZG9lc24ndCBkbyB0aGUgdHJpY2sgYnV0IGFkZGluZyBhcyBtYW55IG1pbWV0eXBlcyBhbmQgZmlsZXR5cGVzIGFzIHlvdSBjYW4gc2VlbXMgdG8gZ2V0IHRoZSBzZXJ2aWNld29ya2VyIHRvIGFjY2VwdCB0aGVtIGlmIHRoZXkgYXJlIGxpc3RlZCBleHBsaWNpdGx5LlxyXG5cclxuaW1wb3J0IG1pbWVEYiBmcm9tICdtaW1lLWRiJztcclxuaW1wb3J0IGZpbGVUeXBlcyBmcm9tICcuL3NyYy9zdmMvZXh0ZW5zaW9ucy5qc29uJyB3aXRoIHt0eXBlOiAnanNvbid9IC8vRlJPTTogaHR0cHM6Ly9naXRodWIuY29tL2R5bmUvZmlsZS1leHRlbnNpb24tbGlzdC9ibG9iL21hc3Rlci9wdWIvZXh0ZW5zaW9ucy5qc29uXHJcbi8vREJHOiBjb25zb2xlLmxvZyhmaWxlVHlwZXMpXHJcblxyXG4vL1NFRTogaHR0cHM6Ly9kZXZlbG9wZXIuY2hyb21lLmNvbS9kb2NzL2NhcGFiaWxpdGllcy93ZWItYXBpcy93ZWItc2hhcmUtdGFyZ2V0I3NhbXBsZV9hcHBsaWNhdGlvbnNcclxuLy9TRUU6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL01hbmlmZXN0L2ZpbGVfaGFuZGxlcnNcclxuLy9TRUU6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL01hbmlmZXN0L3Nob3J0Y3V0c1xyXG4vL1NFRTogaHR0cHM6Ly9naXRodWIuY29tL0dvb2dsZUNocm9tZS9zYW1wbGVzL2Jsb2IvZ2gtcGFnZXMvd2ViLXNoYXJlL3NyYy9tYW5pZmVzdC5qc29uXHJcbmV4cG9ydCBjb25zdCBCYXNlTWFuaWZlc3Q9IHsgLy9BOiBwd2EgbWFuaWZlc3QgdGVtcGxhdGUgSEVSRVxyXG5cdG5hbWU6ICdQQVVJJyxcclxuXHRzaG9ydF9uYW1lOiAnUEFVSScsXHJcblx0ZGVzY3JpcHRpb246ICdQQVVJJyxcclxuXHRzdGFydF91cmw6ICcuLz92ZXJzaW9uPTEnLCAvL0E6IHRpZW5lIHF1ZSBzZXIgQUJTT0xVVEEsIG5vIC4vIHBhcmEgcXVlIGFuZGUgc2hhcmVfdGFyZ2V0IVxyXG5cdHRoZW1lX2NvbG9yOiAnIzAwMDAwMCcsXHJcblx0c2hhcmVfdGFyZ2V0OiB7XHJcblx0XHRcImFjdGlvblwiOiBcIi4vX3NoYXJlLXRhcmdldFwiLFxyXG5cdFx0XCJlbmN0eXBlXCI6IFwibXVsdGlwYXJ0L2Zvcm0tZGF0YVwiLFxyXG5cdFx0XCJtZXRob2RcIjogXCJQT1NUXCIsXHJcblx0XHRcInBhcmFtc1wiOiB7XHJcblx0XHRcdFwiZmlsZXNcIjogW3sgLy9TRUU6IGh0dHBzOi8vZ2l0aHViLmNvbS9Hb29nbGVDaHJvbWUvc2FtcGxlcy9ibG9iL2doLXBhZ2VzL3dlYi1zaGFyZS9zcmMvbWFuaWZlc3QuanNvblxyXG5cdFx0XHRcdFwibmFtZVwiOiBcIm1lZGlhXCIsXHJcblx0XHRcdFx0XCJhY2NlcHRcIjogW11cclxuXHRcdFx0fV1cclxuXHRcdH1cclxuXHR9LFxyXG5cdGZpbGVfaGFuZGxlcnM6IFtcclxuICAgIHtcclxuICAgICAgXCJhY3Rpb25cIjogXCIvXCIsXHJcbiAgICAgIFwiYWNjZXB0XCI6IHtcclxuICAgICAgICBcImltYWdlL2pwZWdcIjogW1wiLmpwZ1wiLCBcIi5qcGVnXCJdLFxyXG4gICAgICAgIFwiaW1hZ2UvcG5nXCI6IFtcIi5wbmdcIl1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIF1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBhbGxGaWxlVHlwZXNBbmRNaW1lcyA9ICgpID0+IHtcclxuXHRsZXQgcj0ge307XHJcblx0T2JqZWN0LmtleXMobWltZURiKS5mb3JFYWNoKGUgPT4gcltlXT0xKVxyXG5cdE9iamVjdC5rZXlzKGZpbGVUeXBlcykuZm9yRWFjaChleHQgPT4gclsnYXBwbGljYXRpb24vJytleHRdPTEpXHJcblx0cmV0dXJuIE9iamVjdC5rZXlzKHIpLnNvcnQoKTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGFsbE1pbWVUb0V4dGVuc2lvbiA9ICgpID0+IHtcclxuXHRsZXQgcj0ge307XHJcblx0T2JqZWN0LmVudHJpZXMoZmlsZVR5cGVzKS5mb3JFYWNoKChbZXh0LHR5cGVzXSkgPT4gXHJcblx0XHRyWydhcHBsaWNhdGlvbi8nK2V4dF09WycuJytleHRdXHJcblx0KVxyXG5cdHJldHVybiByO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgbWFrZU1hbmlmZXN0ID0gKCkgPT4ge1xyXG5cdGxldCByPSB7Li4uQmFzZU1hbmlmZXN0fVxyXG5cdHIuc2hhcmVfdGFyZ2V0LnBhcmFtcy5maWxlcz1bXHJcblx0XHR7IG5hbWU6ICd0ZXh0JywgYWNjZXB0OiBbJ3RleHQvcGxhaW4nLCAndGV4dC9zdHJpbmcnXSwgfSxcclxuXHRcdHsgbmFtZTogJ21lZGlhJyxcclxuXHRcdFx0YWNjZXB0OiBbXHJcblx0XHRcdFx0J2F1ZGlvLyonLCAnaW1hZ2UvKicsICd2aWRlby8qJywgJ2FwcGxpY2F0aW9uL3gtcGRmJyxcclxuXHRcdFx0XHQuLi5hbGxGaWxlVHlwZXNBbmRNaW1lcygpLFxyXG5cdFx0XHRdLFxyXG5cdFx0fSxcclxuXHRdO1xyXG5cdHIuZmlsZV9oYW5kbGVyc1swXS5hY2NlcHQ9IHtcclxuXHRcdC4uLnIuZmlsZV9oYW5kbGVyc1swXS5hY2NlcHQsXHJcblx0XHQuLi5hbGxNaW1lVG9FeHRlbnNpb24oKSxcclxuXHR9XHJcblx0cmV0dXJuIHI7XHJcbn1cclxuXHJcbiIsICJ7XHJcbiAgXCIxLmFkYVwiOiBbXHJcbiAgICBcImNvZGVcIlxyXG4gIF0sXHJcbiAgXCIyLmFkYVwiOiBbXHJcbiAgICBcImNvZGVcIlxyXG4gIF0sXHJcbiAgXCIzZG1cIjogW1xyXG4gICAgXCJpbWFnZVwiXHJcbiAgXSxcclxuICBcIjNkc1wiOiBbXHJcbiAgICBcImltYWdlXCJcclxuICBdLFxyXG4gIFwiM2cyXCI6IFtcclxuICAgIFwidmlkZW9cIlxyXG4gIF0sXHJcbiAgXCIzZ3BcIjogW1xyXG4gICAgXCJ2aWRlb1wiXHJcbiAgXSxcclxuICBcIjd6XCI6IFtcclxuICAgIFwiYXJjaGl2ZVwiXHJcbiAgXSxcclxuICBcImFcIjogW1xyXG4gICAgXCJhcmNoaXZlXCJcclxuICBdLFxyXG4gIFwiYWFjXCI6IFtcclxuICAgIFwiYXVkaW9cIlxyXG4gIF0sXHJcbiAgXCJhYWZcIjogW1xyXG4gICAgXCJ2aWRlb1wiXHJcbiAgXSxcclxuICBcImFkYVwiOiBbXHJcbiAgICBcImNvZGVcIlxyXG4gIF0sXHJcbiAgXCJhZGJcIjogW1xyXG4gICAgXCJjb2RlXCJcclxuICBdLFxyXG4gIFwiYWRzXCI6IFtcclxuICAgIFwiY29kZVwiXHJcbiAgXSxcclxuICBcImFpXCI6IFtcclxuICAgIFwiaW1hZ2VcIlxyXG4gIF0sXHJcbiAgXCJhaWZmXCI6IFtcclxuICAgIFwiYXVkaW9cIlxyXG4gIF0sXHJcbiAgXCJhcGVcIjogW1xyXG4gICAgXCJhdWRpb1wiXHJcbiAgXSxcclxuICBcImFwa1wiOiBbXHJcbiAgICBcImFyY2hpdmVcIlxyXG4gIF0sXHJcbiAgXCJhclwiOiBbXHJcbiAgICBcImFyY2hpdmVcIlxyXG4gIF0sXHJcbiAgXCJhc2ZcIjogW1xyXG4gICAgXCJ2aWRlb1wiXHJcbiAgXSxcclxuICBcImFzbVwiOiBbXHJcbiAgICBcImNvZGVcIlxyXG4gIF0sXHJcbiAgXCJhdVwiOiBbXHJcbiAgICBcImF1ZGlvXCJcclxuICBdLFxyXG4gIFwiYXZjaGRcIjogW1xyXG4gICAgXCJ2aWRlb1wiXHJcbiAgXSxcclxuICBcImF2aVwiOiBbXHJcbiAgICBcInZpZGVvXCJcclxuICBdLFxyXG4gIFwiYXp3XCI6IFtcclxuICAgIFwiYm9va1wiXHJcbiAgXSxcclxuICBcImF6dzFcIjogW1xyXG4gICAgXCJib29rXCJcclxuICBdLFxyXG4gIFwiYXp3M1wiOiBbXHJcbiAgICBcImJvb2tcIlxyXG4gIF0sXHJcbiAgXCJhenc0XCI6IFtcclxuICAgIFwiYm9va1wiXHJcbiAgXSxcclxuICBcImF6dzZcIjogW1xyXG4gICAgXCJib29rXCJcclxuICBdLFxyXG4gIFwiYmFzXCI6IFtcclxuICAgIFwiY29kZVwiXHJcbiAgXSxcclxuICBcImJhc2hcIjogW1xyXG4gICAgXCJjb2RlXCIsXHJcbiAgICBcImV4ZWNcIlxyXG4gIF0sXHJcbiAgXCJiYXRcIjogW1xyXG4gICAgXCJjb2RlXCIsXHJcbiAgICBcImV4ZWNcIlxyXG4gIF0sXHJcbiAgXCJiaW5cIjogW1xyXG4gICAgXCJleGVjXCJcclxuICBdLFxyXG4gIFwiYm1wXCI6IFtcclxuICAgIFwiaW1hZ2VcIlxyXG4gIF0sXHJcbiAgXCJiejJcIjogW1xyXG4gICAgXCJhcmNoaXZlXCJcclxuICBdLFxyXG4gIFwiY1wiOiBbXHJcbiAgICBcImNvZGVcIlxyXG4gIF0sXHJcbiAgXCJjKytcIjogW1xyXG4gICAgXCJjb2RlXCJcclxuICBdLFxyXG4gIFwiY2FiXCI6IFtcclxuICAgIFwiYXJjaGl2ZVwiXHJcbiAgXSxcclxuICBcImNibFwiOiBbXHJcbiAgICBcImNvZGVcIlxyXG4gIF0sXHJcbiAgXCJjYnJcIjogW1xyXG4gICAgXCJib29rXCJcclxuICBdLFxyXG4gIFwiY2J6XCI6IFtcclxuICAgIFwiYm9va1wiXHJcbiAgXSxcclxuICBcImNjXCI6IFtcclxuICAgIFwiY29kZVwiXHJcbiAgXSxcclxuICBcImNsYXNzXCI6IFtcclxuICAgIFwiY29kZVwiXHJcbiAgXSxcclxuICBcImNsalwiOiBbXHJcbiAgICBcImNvZGVcIlxyXG4gIF0sXHJcbiAgXCJjb2JcIjogW1xyXG4gICAgXCJjb2RlXCJcclxuICBdLFxyXG4gIFwiY29tbWFuZFwiOiBbXHJcbiAgICBcImV4ZWNcIlxyXG4gIF0sXHJcbiAgXCJjcGlvXCI6IFtcclxuICAgIFwiYXJjaGl2ZVwiXHJcbiAgXSxcclxuICBcImNwcFwiOiBbXHJcbiAgICBcImNvZGVcIlxyXG4gIF0sXHJcbiAgXCJjcnhcIjogW1xyXG4gICAgXCJleGVjXCJcclxuICBdLFxyXG4gIFwiY3NcIjogW1xyXG4gICAgXCJjb2RlXCJcclxuICBdLFxyXG4gIFwiY3NoXCI6IFtcclxuICAgIFwiY29kZVwiLFxyXG4gICAgXCJleGVjXCJcclxuICBdLFxyXG4gIFwiY3NzXCI6IFtcclxuICAgIFwid2ViXCJcclxuICBdLFxyXG4gIFwiY3N2XCI6IFtcclxuICAgIFwic2hlZXRcIlxyXG4gIF0sXHJcbiAgXCJjeHhcIjogW1xyXG4gICAgXCJjb2RlXCJcclxuICBdLFxyXG4gIFwiZFwiOiBbXHJcbiAgICBcImNvZGVcIlxyXG4gIF0sXHJcbiAgXCJkZHNcIjogW1xyXG4gICAgXCJpbWFnZVwiXHJcbiAgXSxcclxuICBcImRlYlwiOiBbXHJcbiAgICBcImFyY2hpdmVcIlxyXG4gIF0sXHJcbiAgXCJkaWZmXCI6IFtcclxuICAgIFwiY29kZVwiXHJcbiAgXSxcclxuICBcImRtZ1wiOiBbXHJcbiAgICBcImFyY2hpdmVcIlxyXG4gIF0sXHJcbiAgXCJkb2NcIjogW1xyXG4gICAgXCJ0ZXh0XCJcclxuICBdLFxyXG4gIFwiZG9jeFwiOiBbXHJcbiAgICBcInRleHRcIlxyXG4gIF0sXHJcbiAgXCJkcmNcIjogW1xyXG4gICAgXCJ2aWRlb1wiXHJcbiAgXSxcclxuICBcImR3Z1wiOiBbXHJcbiAgICBcImltYWdlXCJcclxuICBdLFxyXG4gIFwiZHhmXCI6IFtcclxuICAgIFwiaW1hZ2VcIlxyXG4gIF0sXHJcbiAgXCJlXCI6IFtcclxuICAgIFwiY29kZVwiXHJcbiAgXSxcclxuICBcImVib29rXCI6IFtcclxuICAgIFwidGV4dFwiXHJcbiAgXSxcclxuICBcImVnZ1wiOiBbXHJcbiAgICBcImFyY2hpdmVcIlxyXG4gIF0sXHJcbiAgXCJlbFwiOiBbXHJcbiAgICBcImNvZGVcIlxyXG4gIF0sXHJcbiAgXCJlb3RcIjogW1xyXG4gICAgXCJmb250XCJcclxuICBdLFxyXG4gIFwiZXBzXCI6IFtcclxuICAgIFwiaW1hZ2VcIlxyXG4gIF0sXHJcbiAgXCJlcHViXCI6IFtcclxuICAgIFwiYm9va1wiXHJcbiAgXSxcclxuICBcImV4ZVwiOiBbXHJcbiAgICBcImV4ZWNcIlxyXG4gIF0sXHJcbiAgXCJmXCI6IFtcclxuICAgIFwiY29kZVwiXHJcbiAgXSxcclxuICBcImY3N1wiOiBbXHJcbiAgICBcImNvZGVcIlxyXG4gIF0sXHJcbiAgXCJmOTBcIjogW1xyXG4gICAgXCJjb2RlXCJcclxuICBdLFxyXG4gIFwiZmlzaFwiOiBbXHJcbiAgICBcImNvZGVcIixcclxuICAgIFwiZXhlY1wiXHJcbiAgXSxcclxuICBcImZsYWNcIjogW1xyXG4gICAgXCJhdWRpb1wiXHJcbiAgXSxcclxuICBcImZsdlwiOiBbXHJcbiAgICBcInZpZGVvXCJcclxuICBdLFxyXG4gIFwiZm9yXCI6IFtcclxuICAgIFwiY29kZVwiXHJcbiAgXSxcclxuICBcImZ0aFwiOiBbXHJcbiAgICBcImNvZGVcIlxyXG4gIF0sXHJcbiAgXCJmdG5cIjogW1xyXG4gICAgXCJjb2RlXCJcclxuICBdLFxyXG4gIFwiZ2lmXCI6IFtcclxuICAgIFwiaW1hZ2VcIlxyXG4gIF0sXHJcbiAgXCJnb1wiOiBbXHJcbiAgICBcImNvZGVcIlxyXG4gIF0sXHJcbiAgXCJncHhcIjogW1xyXG4gICAgXCJpbWFnZVwiXHJcbiAgXSxcclxuICBcImdyb292eVwiOiBbXHJcbiAgICBcImNvZGVcIlxyXG4gIF0sXHJcbiAgXCJnc21cIjogW1xyXG4gICAgXCJhdWRpb1wiXHJcbiAgXSxcclxuICBcImd6XCI6IFtcclxuICAgIFwiYXJjaGl2ZVwiXHJcbiAgXSxcclxuICBcImhcIjogW1xyXG4gICAgXCJjb2RlXCJcclxuICBdLFxyXG4gIFwiaGhcIjogW1xyXG4gICAgXCJjb2RlXCJcclxuICBdLFxyXG4gIFwiaHBwXCI6IFtcclxuICAgIFwiY29kZVwiXHJcbiAgXSxcclxuICBcImhzXCI6IFtcclxuICAgIFwiY29kZVwiXHJcbiAgXSxcclxuICBcImh0bVwiOiBbXHJcbiAgICBcImNvZGVcIixcclxuICAgIFwid2ViXCJcclxuICBdLFxyXG4gIFwiaHRtbFwiOiBbXHJcbiAgICBcImNvZGVcIixcclxuICAgIFwid2ViXCJcclxuICBdLFxyXG4gIFwiaHh4XCI6IFtcclxuICAgIFwiY29kZVwiXHJcbiAgXSxcclxuICBcImljc1wiOiBbXHJcbiAgICBcInNoZWV0XCJcclxuICBdLFxyXG4gIFwiaXNvXCI6IFtcclxuICAgIFwiYXJjaGl2ZVwiXHJcbiAgXSxcclxuICBcIml0XCI6IFtcclxuICAgIFwiYXVkaW9cIlxyXG4gIF0sXHJcbiAgXCJqYXJcIjogW1xyXG4gICAgXCJhcmNoaXZlXCJcclxuICBdLFxyXG4gIFwiamF2YVwiOiBbXHJcbiAgICBcImNvZGVcIlxyXG4gIF0sXHJcbiAgXCJqcGVnXCI6IFtcclxuICAgIFwiaW1hZ2VcIlxyXG4gIF0sXHJcbiAgXCJqcGdcIjogW1xyXG4gICAgXCJpbWFnZVwiXHJcbiAgXSxcclxuICBcImpzXCI6IFtcclxuICAgIFwiY29kZVwiLFxyXG4gICAgXCJ3ZWJcIlxyXG4gIF0sXHJcbiAgXCJqc3BcIjogW1xyXG4gICAgXCJjb2RlXCJcclxuICBdLFxyXG4gIFwianN4XCI6IFtcclxuICAgIFwiY29kZVwiLFxyXG4gICAgXCJ3ZWJcIlxyXG4gIF0sXHJcbiAgXCJrbWxcIjogW1xyXG4gICAgXCJpbWFnZVwiXHJcbiAgXSxcclxuICBcImttelwiOiBbXHJcbiAgICBcImltYWdlXCJcclxuICBdLFxyXG4gIFwia3NoXCI6IFtcclxuICAgIFwiY29kZVwiLFxyXG4gICAgXCJleGVjXCJcclxuICBdLFxyXG4gIFwia3RcIjogW1xyXG4gICAgXCJjb2RlXCJcclxuICBdLFxyXG4gIFwibGVzc1wiOiBbXHJcbiAgICBcIndlYlwiXHJcbiAgXSxcclxuICBcImxoYVwiOiBbXHJcbiAgICBcImFyY2hpdmVcIlxyXG4gIF0sXHJcbiAgXCJsaHNcIjogW1xyXG4gICAgXCJjb2RlXCJcclxuICBdLFxyXG4gIFwibGlzcFwiOiBbXHJcbiAgICBcImNvZGVcIlxyXG4gIF0sXHJcbiAgXCJsb2dcIjogW1xyXG4gICAgXCJ0ZXh0XCJcclxuICBdLFxyXG4gIFwibHVhXCI6IFtcclxuICAgIFwiY29kZVwiXHJcbiAgXSxcclxuICBcIm1cIjogW1xyXG4gICAgXCJjb2RlXCJcclxuICBdLFxyXG4gIFwibTJ2XCI6IFtcclxuICAgIFwidmlkZW9cIlxyXG4gIF0sXHJcbiAgXCJtM3VcIjogW1xyXG4gICAgXCJhdWRpb1wiXHJcbiAgXSxcclxuICBcIm00XCI6IFtcclxuICAgIFwiY29kZVwiXHJcbiAgXSxcclxuICBcIm00YVwiOiBbXHJcbiAgICBcImF1ZGlvXCJcclxuICBdLFxyXG4gIFwibTRwXCI6IFtcclxuICAgIFwidmlkZW9cIlxyXG4gIF0sXHJcbiAgXCJtNHZcIjogW1xyXG4gICAgXCJ2aWRlb1wiXHJcbiAgXSxcclxuICBcIm1hclwiOiBbXHJcbiAgICBcImFyY2hpdmVcIlxyXG4gIF0sXHJcbiAgXCJtYXhcIjogW1xyXG4gICAgXCJpbWFnZVwiXHJcbiAgXSxcclxuICBcIm1kXCI6IFtcclxuICAgIFwidGV4dFwiXHJcbiAgXSxcclxuICBcIm1pZFwiOiBbXHJcbiAgICBcImF1ZGlvXCJcclxuICBdLFxyXG4gIFwibWt2XCI6IFtcclxuICAgIFwidmlkZW9cIlxyXG4gIF0sXHJcbiAgXCJtbmdcIjogW1xyXG4gICAgXCJ2aWRlb1wiXHJcbiAgXSxcclxuICBcIm1vYmlcIjogW1xyXG4gICAgXCJib29rXCJcclxuICBdLFxyXG4gIFwibW9kXCI6IFtcclxuICAgIFwiYXVkaW9cIlxyXG4gIF0sXHJcbiAgXCJtb3ZcIjogW1xyXG4gICAgXCJ2aWRlb1wiXHJcbiAgXSxcclxuICBcIm1wMlwiOiBbXHJcbiAgICBcInZpZGVvXCJcclxuICBdLFxyXG4gIFwibXAzXCI6IFtcclxuICAgIFwiYXVkaW9cIlxyXG4gIF0sXHJcbiAgXCJtcDRcIjogW1xyXG4gICAgXCJ2aWRlb1wiXHJcbiAgXSxcclxuICBcIm1wYVwiOiBbXHJcbiAgICBcImF1ZGlvXCJcclxuICBdLFxyXG4gIFwibXBlXCI6IFtcclxuICAgIFwidmlkZW9cIlxyXG4gIF0sXHJcbiAgXCJtcGVnXCI6IFtcclxuICAgIFwidmlkZW9cIlxyXG4gIF0sXHJcbiAgXCJtcGdcIjogW1xyXG4gICAgXCJ2aWRlb1wiXHJcbiAgXSxcclxuICBcIm1wdlwiOiBbXHJcbiAgICBcInZpZGVvXCJcclxuICBdLFxyXG4gIFwibXNnXCI6IFtcclxuICAgIFwidGV4dFwiXHJcbiAgXSxcclxuICBcIm1zaVwiOiBbXHJcbiAgICBcImV4ZWNcIlxyXG4gIF0sXHJcbiAgXCJteGZcIjogW1xyXG4gICAgXCJ2aWRlb1wiXHJcbiAgXSxcclxuICBcIm5pbVwiOiBbXHJcbiAgICBcImNvZGVcIlxyXG4gIF0sXHJcbiAgXCJuc3ZcIjogW1xyXG4gICAgXCJ2aWRlb1wiXHJcbiAgXSxcclxuICBcIm9kcFwiOiBbXHJcbiAgICBcInNsaWRlXCJcclxuICBdLFxyXG4gIFwib2RzXCI6IFtcclxuICAgIFwic2hlZXRcIlxyXG4gIF0sXHJcbiAgXCJvZHRcIjogW1xyXG4gICAgXCJ0ZXh0XCJcclxuICBdLFxyXG4gIFwib2dnXCI6IFtcclxuICAgIFwidmlkZW9cIlxyXG4gIF0sXHJcbiAgXCJvZ21cIjogW1xyXG4gICAgXCJ2aWRlb1wiXHJcbiAgXSxcclxuICBcIm9ndlwiOiBbXHJcbiAgICBcInZpZGVvXCJcclxuICBdLFxyXG4gIFwib3JnXCI6IFtcclxuICAgIFwidGV4dFwiXHJcbiAgXSxcclxuICBcIm90ZlwiOiBbXHJcbiAgICBcImZvbnRcIlxyXG4gIF0sXHJcbiAgXCJwYWdlc1wiOiBbXHJcbiAgICBcInRleHRcIlxyXG4gIF0sXHJcbiAgXCJwYWtcIjogW1xyXG4gICAgXCJhcmNoaXZlXCJcclxuICBdLFxyXG4gIFwicGF0Y2hcIjogW1xyXG4gICAgXCJjb2RlXCJcclxuICBdLFxyXG4gIFwicGRmXCI6IFtcclxuICAgIFwidGV4dFwiXHJcbiAgXSxcclxuICBcInBlYVwiOiBbXHJcbiAgICBcImFyY2hpdmVcIlxyXG4gIF0sXHJcbiAgXCJwaHBcIjogW1xyXG4gICAgXCJjb2RlXCIsXHJcbiAgICBcIndlYlwiXHJcbiAgXSxcclxuICBcInBsXCI6IFtcclxuICAgIFwiY29kZVwiXHJcbiAgXSxcclxuICBcInBsc1wiOiBbXHJcbiAgICBcImF1ZGlvXCJcclxuICBdLFxyXG4gIFwicG5nXCI6IFtcclxuICAgIFwiaW1hZ2VcIlxyXG4gIF0sXHJcbiAgXCJwb1wiOiBbXHJcbiAgICBcImNvZGVcIlxyXG4gIF0sXHJcbiAgXCJwcFwiOiBbXHJcbiAgICBcImNvZGVcIlxyXG4gIF0sXHJcbiAgXCJwcHRcIjogW1xyXG4gICAgXCJzbGlkZVwiXHJcbiAgXSxcclxuICBcInBzXCI6IFtcclxuICAgIFwiaW1hZ2VcIlxyXG4gIF0sXHJcbiAgXCJwc2RcIjogW1xyXG4gICAgXCJpbWFnZVwiXHJcbiAgXSxcclxuICBcInB5XCI6IFtcclxuICAgIFwiY29kZVwiXHJcbiAgXSxcclxuICBcInF0XCI6IFtcclxuICAgIFwidmlkZW9cIlxyXG4gIF0sXHJcbiAgXCJyXCI6IFtcclxuICAgIFwiY29kZVwiXHJcbiAgXSxcclxuICBcInJhXCI6IFtcclxuICAgIFwiYXVkaW9cIlxyXG4gIF0sXHJcbiAgXCJyYXJcIjogW1xyXG4gICAgXCJhcmNoaXZlXCJcclxuICBdLFxyXG4gIFwicmJcIjogW1xyXG4gICAgXCJjb2RlXCJcclxuICBdLFxyXG4gIFwicm1cIjogW1xyXG4gICAgXCJ2aWRlb1wiXHJcbiAgXSxcclxuICBcInJtdmJcIjogW1xyXG4gICAgXCJ2aWRlb1wiXHJcbiAgXSxcclxuICBcInJvcVwiOiBbXHJcbiAgICBcInZpZGVvXCJcclxuICBdLFxyXG4gIFwicnBtXCI6IFtcclxuICAgIFwiYXJjaGl2ZVwiXHJcbiAgXSxcclxuICBcInJzXCI6IFtcclxuICAgIFwiY29kZVwiXHJcbiAgXSxcclxuICBcInJzdFwiOiBbXHJcbiAgICBcInRleHRcIlxyXG4gIF0sXHJcbiAgXCJydGZcIjogW1xyXG4gICAgXCJ0ZXh0XCJcclxuICBdLFxyXG4gIFwic1wiOiBbXHJcbiAgICBcImNvZGVcIlxyXG4gIF0sXHJcbiAgXCJzM21cIjogW1xyXG4gICAgXCJhdWRpb1wiXHJcbiAgXSxcclxuICBcInM3elwiOiBbXHJcbiAgICBcImFyY2hpdmVcIlxyXG4gIF0sXHJcbiAgXCJzY2FsYVwiOiBbXHJcbiAgICBcImNvZGVcIlxyXG4gIF0sXHJcbiAgXCJzY3NzXCI6IFtcclxuICAgIFwid2ViXCJcclxuICBdLFxyXG4gIFwic2hcIjogW1xyXG4gICAgXCJjb2RlXCIsXHJcbiAgICBcImV4ZWNcIlxyXG4gIF0sXHJcbiAgXCJzaGFyXCI6IFtcclxuICAgIFwiYXJjaGl2ZVwiXHJcbiAgXSxcclxuICBcInNpZFwiOiBbXHJcbiAgICBcImF1ZGlvXCJcclxuICBdLFxyXG4gIFwic3J0XCI6IFtcclxuICAgIFwidmlkZW9cIlxyXG4gIF0sXHJcbiAgXCJzdmdcIjogW1xyXG4gICAgXCJpbWFnZVwiXHJcbiAgXSxcclxuICBcInN2aVwiOiBbXHJcbiAgICBcInZpZGVvXCJcclxuICBdLFxyXG4gIFwic3dnXCI6IFtcclxuICAgIFwiY29kZVwiXHJcbiAgXSxcclxuICBcInN3aWZ0XCI6IFtcclxuICAgIFwiY29kZVwiXHJcbiAgXSxcclxuICBcInRhclwiOiBbXHJcbiAgICBcImFyY2hpdmVcIlxyXG4gIF0sXHJcbiAgXCJ0YnoyXCI6IFtcclxuICAgIFwiYXJjaGl2ZVwiXHJcbiAgXSxcclxuICBcInRleFwiOiBbXHJcbiAgICBcInRleHRcIlxyXG4gIF0sXHJcbiAgXCJ0Z2FcIjogW1xyXG4gICAgXCJpbWFnZVwiXHJcbiAgXSxcclxuICBcInRnelwiOiBbXHJcbiAgICBcImFyY2hpdmVcIlxyXG4gIF0sXHJcbiAgXCJ0aG1cIjogW1xyXG4gICAgXCJpbWFnZVwiXHJcbiAgXSxcclxuICBcInRpZlwiOiBbXHJcbiAgICBcImltYWdlXCJcclxuICBdLFxyXG4gIFwidGlmZlwiOiBbXHJcbiAgICBcImltYWdlXCJcclxuICBdLFxyXG4gIFwidGx6XCI6IFtcclxuICAgIFwiYXJjaGl2ZVwiXHJcbiAgXSxcclxuICBcInR0ZlwiOiBbXHJcbiAgICBcImZvbnRcIlxyXG4gIF0sXHJcbiAgXCJ0eHRcIjogW1xyXG4gICAgXCJ0ZXh0XCJcclxuICBdLFxyXG4gIFwidlwiOiBbXHJcbiAgICBcImNvZGVcIlxyXG4gIF0sXHJcbiAgXCJ2YlwiOiBbXHJcbiAgICBcImNvZGVcIlxyXG4gIF0sXHJcbiAgXCJ2Y2ZcIjogW1xyXG4gICAgXCJzaGVldFwiXHJcbiAgXSxcclxuICBcInZjeHByb2pcIjogW1xyXG4gICAgXCJjb2RlXCJcclxuICBdLFxyXG4gIFwidm9iXCI6IFtcclxuICAgIFwidmlkZW9cIlxyXG4gIF0sXHJcbiAgXCJ3YXJcIjogW1xyXG4gICAgXCJhcmNoaXZlXCJcclxuICBdLFxyXG4gIFwid2FzbVwiOiBbXHJcbiAgICBcIndlYlwiXHJcbiAgXSxcclxuICBcIndhdlwiOiBbXHJcbiAgICBcImF1ZGlvXCJcclxuICBdLFxyXG4gIFwid2VibVwiOiBbXHJcbiAgICBcInZpZGVvXCJcclxuICBdLFxyXG4gIFwid2VicFwiOiBbXHJcbiAgICBcImltYWdlXCJcclxuICBdLFxyXG4gIFwid2hsXCI6IFtcclxuICAgIFwiYXJjaGl2ZVwiXHJcbiAgXSxcclxuICBcIndtYVwiOiBbXHJcbiAgICBcImF1ZGlvXCJcclxuICBdLFxyXG4gIFwid212XCI6IFtcclxuICAgIFwidmlkZW9cIlxyXG4gIF0sXHJcbiAgXCJ3b2ZmXCI6IFtcclxuICAgIFwiZm9udFwiXHJcbiAgXSxcclxuICBcIndvZmYyXCI6IFtcclxuICAgIFwiZm9udFwiXHJcbiAgXSxcclxuICBcIndwZFwiOiBbXHJcbiAgICBcInRleHRcIlxyXG4gIF0sXHJcbiAgXCJ3cHNcIjogW1xyXG4gICAgXCJ0ZXh0XCJcclxuICBdLFxyXG4gIFwieGNmXCI6IFtcclxuICAgIFwiaW1hZ2VcIlxyXG4gIF0sXHJcbiAgXCJ4Y29kZXByb2pcIjogW1xyXG4gICAgXCJjb2RlXCJcclxuICBdLFxyXG4gIFwieGxzXCI6IFtcclxuICAgIFwic2hlZXRcIlxyXG4gIF0sXHJcbiAgXCJ4bHN4XCI6IFtcclxuICAgIFwic2hlZXRcIlxyXG4gIF0sXHJcbiAgXCJ4bVwiOiBbXHJcbiAgICBcImF1ZGlvXCJcclxuICBdLFxyXG4gIFwieG1sXCI6IFtcclxuICAgIFwiY29kZVwiXHJcbiAgXSxcclxuICBcInhwaVwiOiBbXHJcbiAgICBcImFyY2hpdmVcIlxyXG4gIF0sXHJcbiAgXCJ4elwiOiBbXHJcbiAgICBcImFyY2hpdmVcIlxyXG4gIF0sXHJcbiAgXCJ5dXZcIjogW1xyXG4gICAgXCJpbWFnZVwiLFxyXG4gICAgXCJ2aWRlb1wiXHJcbiAgXSxcclxuICBcInppcFwiOiBbXHJcbiAgICBcImFyY2hpdmVcIlxyXG4gIF0sXHJcbiAgXCJ6aXB4XCI6IFtcclxuICAgIFwiYXJjaGl2ZVwiXHJcbiAgXSxcclxuICBcInpzaFwiOiBbXHJcbiAgICBcImNvZGVcIixcclxuICAgIFwiZXhlY1wiXHJcbiAgXVxyXG59XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFDQSxTQUFTLG9CQUFvQjtBQUM3QixTQUFTLDhCQUE4QjtBQUN2QyxPQUFPLFdBQVc7QUFFbEIsT0FBTyxZQUFZO0FBQ25CLFNBQVMscUJBQXFCOzs7QUNIOUIsT0FBTyxZQUFZOzs7QUNIbkI7QUFBQSxFQUNFLFNBQVM7QUFBQSxJQUNQO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1A7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0w7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE1BQU07QUFBQSxJQUNKO0FBQUEsRUFDRjtBQUFBLEVBQ0EsR0FBSztBQUFBLElBQ0g7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFPO0FBQUEsSUFDTDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQU87QUFBQSxJQUNMO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBTztBQUFBLElBQ0w7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFPO0FBQUEsSUFDTDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQU87QUFBQSxJQUNMO0FBQUEsRUFDRjtBQUFBLEVBQ0EsSUFBTTtBQUFBLElBQ0o7QUFBQSxFQUNGO0FBQUEsRUFDQSxNQUFRO0FBQUEsSUFDTjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQU87QUFBQSxJQUNMO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBTztBQUFBLElBQ0w7QUFBQSxFQUNGO0FBQUEsRUFDQSxJQUFNO0FBQUEsSUFDSjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQU87QUFBQSxJQUNMO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBTztBQUFBLElBQ0w7QUFBQSxFQUNGO0FBQUEsRUFDQSxJQUFNO0FBQUEsSUFDSjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQVM7QUFBQSxJQUNQO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBTztBQUFBLElBQ0w7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFPO0FBQUEsSUFDTDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE1BQVE7QUFBQSxJQUNOO0FBQUEsRUFDRjtBQUFBLEVBQ0EsTUFBUTtBQUFBLElBQ047QUFBQSxFQUNGO0FBQUEsRUFDQSxNQUFRO0FBQUEsSUFDTjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE1BQVE7QUFBQSxJQUNOO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBTztBQUFBLElBQ0w7QUFBQSxFQUNGO0FBQUEsRUFDQSxNQUFRO0FBQUEsSUFDTjtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFPO0FBQUEsSUFDTDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQU87QUFBQSxJQUNMO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBTztBQUFBLElBQ0w7QUFBQSxFQUNGO0FBQUEsRUFDQSxHQUFLO0FBQUEsSUFDSDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBTztBQUFBLElBQ0w7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFPO0FBQUEsSUFDTDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQU87QUFBQSxJQUNMO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBTztBQUFBLElBQ0w7QUFBQSxFQUNGO0FBQUEsRUFDQSxJQUFNO0FBQUEsSUFDSjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQVM7QUFBQSxJQUNQO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBTztBQUFBLElBQ0w7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFPO0FBQUEsSUFDTDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVc7QUFBQSxJQUNUO0FBQUEsRUFDRjtBQUFBLEVBQ0EsTUFBUTtBQUFBLElBQ047QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFPO0FBQUEsSUFDTDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQU87QUFBQSxJQUNMO0FBQUEsRUFDRjtBQUFBLEVBQ0EsSUFBTTtBQUFBLElBQ0o7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFPO0FBQUEsSUFDTDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQU87QUFBQSxJQUNMO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBTztBQUFBLElBQ0w7QUFBQSxFQUNGO0FBQUEsRUFDQSxHQUFLO0FBQUEsSUFDSDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQU87QUFBQSxJQUNMO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBTztBQUFBLElBQ0w7QUFBQSxFQUNGO0FBQUEsRUFDQSxNQUFRO0FBQUEsSUFDTjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQU87QUFBQSxJQUNMO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBTztBQUFBLElBQ0w7QUFBQSxFQUNGO0FBQUEsRUFDQSxNQUFRO0FBQUEsSUFDTjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQU87QUFBQSxJQUNMO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBTztBQUFBLElBQ0w7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFPO0FBQUEsSUFDTDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEdBQUs7QUFBQSxJQUNIO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBUztBQUFBLElBQ1A7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFPO0FBQUEsSUFDTDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLElBQU07QUFBQSxJQUNKO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBTztBQUFBLElBQ0w7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFPO0FBQUEsSUFDTDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE1BQVE7QUFBQSxJQUNOO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBTztBQUFBLElBQ0w7QUFBQSxFQUNGO0FBQUEsRUFDQSxHQUFLO0FBQUEsSUFDSDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQU87QUFBQSxJQUNMO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBTztBQUFBLElBQ0w7QUFBQSxFQUNGO0FBQUEsRUFDQSxNQUFRO0FBQUEsSUFDTjtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQUEsRUFDQSxNQUFRO0FBQUEsSUFDTjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQU87QUFBQSxJQUNMO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBTztBQUFBLElBQ0w7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFPO0FBQUEsSUFDTDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQU87QUFBQSxJQUNMO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBTztBQUFBLElBQ0w7QUFBQSxFQUNGO0FBQUEsRUFDQSxJQUFNO0FBQUEsSUFDSjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQU87QUFBQSxJQUNMO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBVTtBQUFBLElBQ1I7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFPO0FBQUEsSUFDTDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLElBQU07QUFBQSxJQUNKO0FBQUEsRUFDRjtBQUFBLEVBQ0EsR0FBSztBQUFBLElBQ0g7QUFBQSxFQUNGO0FBQUEsRUFDQSxJQUFNO0FBQUEsSUFDSjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQU87QUFBQSxJQUNMO0FBQUEsRUFDRjtBQUFBLEVBQ0EsSUFBTTtBQUFBLElBQ0o7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQUEsRUFDQSxNQUFRO0FBQUEsSUFDTjtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFPO0FBQUEsSUFDTDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQU87QUFBQSxJQUNMO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBTztBQUFBLElBQ0w7QUFBQSxFQUNGO0FBQUEsRUFDQSxJQUFNO0FBQUEsSUFDSjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQU87QUFBQSxJQUNMO0FBQUEsRUFDRjtBQUFBLEVBQ0EsTUFBUTtBQUFBLElBQ047QUFBQSxFQUNGO0FBQUEsRUFDQSxNQUFRO0FBQUEsSUFDTjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQU87QUFBQSxJQUNMO0FBQUEsRUFDRjtBQUFBLEVBQ0EsSUFBTTtBQUFBLElBQ0o7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBTztBQUFBLElBQ0w7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFPO0FBQUEsSUFDTDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQU87QUFBQSxJQUNMO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUFBLEVBQ0EsSUFBTTtBQUFBLElBQ0o7QUFBQSxFQUNGO0FBQUEsRUFDQSxNQUFRO0FBQUEsSUFDTjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQU87QUFBQSxJQUNMO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBTztBQUFBLElBQ0w7QUFBQSxFQUNGO0FBQUEsRUFDQSxNQUFRO0FBQUEsSUFDTjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQU87QUFBQSxJQUNMO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBTztBQUFBLElBQ0w7QUFBQSxFQUNGO0FBQUEsRUFDQSxHQUFLO0FBQUEsSUFDSDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQU87QUFBQSxJQUNMO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBTztBQUFBLElBQ0w7QUFBQSxFQUNGO0FBQUEsRUFDQSxJQUFNO0FBQUEsSUFDSjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQU87QUFBQSxJQUNMO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBTztBQUFBLElBQ0w7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFPO0FBQUEsSUFDTDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQU87QUFBQSxJQUNMO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBTztBQUFBLElBQ0w7QUFBQSxFQUNGO0FBQUEsRUFDQSxJQUFNO0FBQUEsSUFDSjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQU87QUFBQSxJQUNMO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBTztBQUFBLElBQ0w7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFPO0FBQUEsSUFDTDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE1BQVE7QUFBQSxJQUNOO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBTztBQUFBLElBQ0w7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFPO0FBQUEsSUFDTDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQU87QUFBQSxJQUNMO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBTztBQUFBLElBQ0w7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFPO0FBQUEsSUFDTDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQU87QUFBQSxJQUNMO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBTztBQUFBLElBQ0w7QUFBQSxFQUNGO0FBQUEsRUFDQSxNQUFRO0FBQUEsSUFDTjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQU87QUFBQSxJQUNMO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBTztBQUFBLElBQ0w7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFPO0FBQUEsSUFDTDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQU87QUFBQSxJQUNMO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBTztBQUFBLElBQ0w7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFPO0FBQUEsSUFDTDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQU87QUFBQSxJQUNMO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBTztBQUFBLElBQ0w7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFPO0FBQUEsSUFDTDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQU87QUFBQSxJQUNMO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBTztBQUFBLElBQ0w7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFPO0FBQUEsSUFDTDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQU87QUFBQSxJQUNMO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBTztBQUFBLElBQ0w7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFPO0FBQUEsSUFDTDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQVM7QUFBQSxJQUNQO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBTztBQUFBLElBQ0w7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFTO0FBQUEsSUFDUDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQU87QUFBQSxJQUNMO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBTztBQUFBLElBQ0w7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQUEsRUFDQSxJQUFNO0FBQUEsSUFDSjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQU87QUFBQSxJQUNMO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBTztBQUFBLElBQ0w7QUFBQSxFQUNGO0FBQUEsRUFDQSxJQUFNO0FBQUEsSUFDSjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLElBQU07QUFBQSxJQUNKO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBTztBQUFBLElBQ0w7QUFBQSxFQUNGO0FBQUEsRUFDQSxJQUFNO0FBQUEsSUFDSjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQU87QUFBQSxJQUNMO0FBQUEsRUFDRjtBQUFBLEVBQ0EsSUFBTTtBQUFBLElBQ0o7QUFBQSxFQUNGO0FBQUEsRUFDQSxJQUFNO0FBQUEsSUFDSjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEdBQUs7QUFBQSxJQUNIO0FBQUEsRUFDRjtBQUFBLEVBQ0EsSUFBTTtBQUFBLElBQ0o7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFPO0FBQUEsSUFDTDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLElBQU07QUFBQSxJQUNKO0FBQUEsRUFDRjtBQUFBLEVBQ0EsSUFBTTtBQUFBLElBQ0o7QUFBQSxFQUNGO0FBQUEsRUFDQSxNQUFRO0FBQUEsSUFDTjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQU87QUFBQSxJQUNMO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBTztBQUFBLElBQ0w7QUFBQSxFQUNGO0FBQUEsRUFDQSxJQUFNO0FBQUEsSUFDSjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQU87QUFBQSxJQUNMO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBTztBQUFBLElBQ0w7QUFBQSxFQUNGO0FBQUEsRUFDQSxHQUFLO0FBQUEsSUFDSDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQU87QUFBQSxJQUNMO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBTztBQUFBLElBQ0w7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFTO0FBQUEsSUFDUDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE1BQVE7QUFBQSxJQUNOO0FBQUEsRUFDRjtBQUFBLEVBQ0EsSUFBTTtBQUFBLElBQ0o7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUFBLEVBQ0EsTUFBUTtBQUFBLElBQ047QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFPO0FBQUEsSUFDTDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQU87QUFBQSxJQUNMO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBTztBQUFBLElBQ0w7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFPO0FBQUEsSUFDTDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQU87QUFBQSxJQUNMO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBUztBQUFBLElBQ1A7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFPO0FBQUEsSUFDTDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE1BQVE7QUFBQSxJQUNOO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBTztBQUFBLElBQ0w7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFPO0FBQUEsSUFDTDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQU87QUFBQSxJQUNMO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBTztBQUFBLElBQ0w7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFPO0FBQUEsSUFDTDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE1BQVE7QUFBQSxJQUNOO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBTztBQUFBLElBQ0w7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFPO0FBQUEsSUFDTDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQU87QUFBQSxJQUNMO0FBQUEsRUFDRjtBQUFBLEVBQ0EsR0FBSztBQUFBLElBQ0g7QUFBQSxFQUNGO0FBQUEsRUFDQSxJQUFNO0FBQUEsSUFDSjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQU87QUFBQSxJQUNMO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBVztBQUFBLElBQ1Q7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFPO0FBQUEsSUFDTDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQU87QUFBQSxJQUNMO0FBQUEsRUFDRjtBQUFBLEVBQ0EsTUFBUTtBQUFBLElBQ047QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFPO0FBQUEsSUFDTDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE1BQVE7QUFBQSxJQUNOO0FBQUEsRUFDRjtBQUFBLEVBQ0EsTUFBUTtBQUFBLElBQ047QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFPO0FBQUEsSUFDTDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQU87QUFBQSxJQUNMO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBTztBQUFBLElBQ0w7QUFBQSxFQUNGO0FBQUEsRUFDQSxNQUFRO0FBQUEsSUFDTjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQVM7QUFBQSxJQUNQO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBTztBQUFBLElBQ0w7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFPO0FBQUEsSUFDTDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQU87QUFBQSxJQUNMO0FBQUEsRUFDRjtBQUFBLEVBQ0EsV0FBYTtBQUFBLElBQ1g7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFPO0FBQUEsSUFDTDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE1BQVE7QUFBQSxJQUNOO0FBQUEsRUFDRjtBQUFBLEVBQ0EsSUFBTTtB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
