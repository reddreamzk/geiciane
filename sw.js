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
                '/dia_dos_namorados.mp4',
                '/aniversário_amor.mp4',
                '/aniversário_bruno.mp4',
                '/music.mp3',
                '/icons/icon-192x192.png',
                '/icons/icon-512x512.png'
            ]);
        })
    );
});