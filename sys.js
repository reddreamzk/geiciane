// Lógica JavaScript separada para sys.js

const videos = {
    '11-27:12-24': 'loadnatal.mp4',
    '12-25': 'natal.mp4',
    '12-31:01-01': 'ano_novo.mp4',
    '04-20': 'pascoa.mp4',
    '05-17': 'dia_dos_namorados.mp4',
    '07-22': 'aniversário_amor.mp4',
    '10-16': 'aniversário_bruno.mp4',
};

const relationshipStart = new Date('2024-08-22T21:20:00');
const texts = {}; // Para armazenar textos carregados do JSON

function calculateExactMonths(startDate, currentDate) {
    let months = (currentDate.getFullYear() - startDate.getFullYear()) * 12 + (currentDate.getMonth() - startDate.getMonth());
    if (currentDate.getDate() < startDate.getDate()) {
        months--;
    }
    return months;
}

function getNextAnniversaryDate(startDate, months) {
    const nextAnniversary = new Date(startDate);
    nextAnniversary.setMonth(startDate.getMonth() + months);
    return nextAnniversary;
}

function updateCounters() {
    const now = new Date();
    const relMonths = calculateExactMonths(relationshipStart, now);
    const nextAnniversary = getNextAnniversaryDate(relationshipStart, relMonths + 1);

    const timeDiff = nextAnniversary - now;
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    document.getElementById('counter').innerText = `${relMonths} meses`;
    document.getElementById('second-counter').innerText = `${days} dias, ${hours} horas, ${minutes} minutos e ${seconds} segundos até o próximo mês`;
}

function updateVideo() {
    const now = new Date();
    const videoElement = document.getElementById('video-background');
    const basePath = ''; 

    let selectedVideo = 'padrao.mp4';

    for (const [key, video] of Object.entries(videos)) {
        const [start, end] = key.split(':');
        const startDate = new Date(`${now.getFullYear()}-${start}`);
        const endDate = new Date(`${now.getFullYear()}-${end}`);

        if (startDate <= now && now <= endDate) {
            selectedVideo = video;
            break;
        }
    }

    const newVideoSrc = basePath + selectedVideo;

    if (!videoElement.src.includes(newVideoSrc)) {
        videoElement.src = newVideoSrc;
        videoElement.load();
    }
}

function loadTexts() {
    fetch('text.json')
        .then(response => response.json())
        .then(data => {
            Object.assign(texts, data);
            updateText();
        })
        .catch(error => console.error('Erro ao carregar textos:', error));
}

function updateText() {
    const now = new Date();
    const dynamicTextElement = document.getElementById('dynamic-text');
    let selectedText = texts.default || '';

    // Verificando o texto especial para o dia 22 de cada mês
    if (now.getDate() === 22) {
        selectedText = texts["22"] ? `<p style="font-family: ${texts["22"].font};">${texts["22"].text}</p>` : '';
    }

    for (const [key, textData] of Object.entries(texts)) {
        const [start, end] = key.split(':');
        const startDate = new Date(`${now.getFullYear()}-${start}`);
        const endDate = new Date(`${now.getFullYear()}-${end}`);

        if (startDate <= now && now <= endDate) {
            selectedText = `<p style="font-family: ${textData.font};">${textData.text}</p>`;
            break;
        }
    }

    dynamicTextElement.innerHTML = selectedText;
}

// Executando as atualizações a cada segundo
setInterval(() => {
    updateCounters();
    updateVideo();
    updateText();
}, 1000);

// Carregando os textos ao inicializar a página
loadTexts();
