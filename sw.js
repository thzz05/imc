// Nome do cache (controle de versão)
const CACHE_NAME = 'cache-v1';
// Arquivos a serem armazenados em cache
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/hal192.png',
  '/hal512.png',
  '/tabelaimc',
  '/media.js',
  '/style.css' // Adicionei um possivel arquivo de estilo CSS que você pode ter
];

// Instalando o Service Worker e armazenando os arquivos no cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache aberto');
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

// Interceptando as solicitações de rede e servindo arquivos do cache quando offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Se o arquivo está no cache, serve o arquivo do cache
        if (response) {
          return response;
        }
        // Caso contrário, faz uma solicitação de rede
        return fetch(event.request);
      })
  );
});

// Ativando o Service Worker e removendo caches antigos
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});   
