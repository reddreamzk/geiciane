// sys.js

const videos = {
    '11-27:12-24': 'loadnatal.mp4',
    '12-25': 'natal.mp4',
    '12-31:01-01': 'ano_novo.mp4',
    '04-20': 'pascoa.mp4',
    '05-17': 'dia_dos_namorados.mp4',
    '07-22': 'aniversario_amor.mp4',
    '10-16': 'aniversario_bruno.mp4',
};

const relationshipStart = new Date('2024-08-22T21:20:00');

// Função para calcular o número exato de meses
function calculateExactMonths(startDate, currentDate) {
    let months = (currentDate.getFullYear() - startDate.getFullYear()) * 12 + (currentDate.getMonth() - startDate.getMonth());
    if (currentDate.getDate() < startDate.getDate()) {
        months--;
    }
    return months;
}

// Função para calcular a próxima data de aniversário
function getNextAnniversaryDate(startDate, months) {
    const nextAnniversary = new Date(startDate);
    nextAnniversary.setMonth(startDate.getMonth() + months);
    return nextAnniversary;
}

// Função para atualizar os contadores de meses e o tempo restante até o próximo mês
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

// Função para atualizar o vídeo com base no dia e mês
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

// Função para atualizar o texto com base no dia
function updateText() {
    const now = new Date();
    const textElement = document.getElementById('text-content');

    if (now.getDate() === 22) {
        textElement.innerHTML = '<p>Texto personalizado para o dia 22!</p>';
    } else {
        textElement.innerHTML = '<p>🧸</p>';
    }
}

// Função para atualizar o layout com base na data
function updateLayoutByDate() {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1; // Janeiro é 0, então somamos 1

    // Referência ao elemento <link> com ID "theme-link"
    const themeLink = document.getElementById('theme-link');

    // Verificar a data específica
    if (day === 22 && month === 12) {
        themeLink.href = 'style.css'; // Dia 22: muda para style.css
    } else if (day === 23 && month === 12) {
        themeLink.href = 'layout.css'; // Dia 23: volta para layout.css
    } else {
        themeLink.href = 'layout.css'; // Padrão
    }
}

// Chamar a função para atualizar o layout ao carregar o site
updateLayoutByDate();

// Chamar as funções periodicamente
setInterval(() => {
    updateCounters();
    updateVideo();
    updateText();
    updateLayoutByDate();  // Atualizar layout conforme a data
}, 1000);