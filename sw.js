self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('contadores-cache').then(function(cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/manifest.json',
                '/padrao.mp4',
                '/loadnatal.mp4',
                '/natal.mp4',
                '/ano_novo.mp4',
                '/pascoa.mp4',
                '/music.mp3',
                '/text.json',
                '/icons/icon-192x192.png',
                '/icons/icon-512x512.png'
            ]);
        })
    );
});