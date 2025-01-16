// sys.js

const inicioRelacionamento = new Date('2024-08-22T21:20:00');

function calcularMesesExatos(dataInicio, dataAtual) {
    let meses = (dataAtual.getFullYear() - dataInicio.getFullYear()) * 12 + (dataAtual.getMonth() - dataInicio.getMonth());
    if (dataAtual.getDate() < dataInicio.getDate()) {
        meses--;
    }
    return meses;
}

function calcularProximoAniversario(dataInicio, meses) {
    const proximoAniversario = new Date(dataInicio);
    proximoAniversario.setMonth(dataInicio.getMonth() + meses);
    return proximoAniversario;
}

function atualizarContadores() {
    const agora = new Date();
    const mesesRelacionamento = calcularMesesExatos(inicioRelacionamento, agora);
    const proximoAniversario = calcularProximoAniversario(inicioRelacionamento, mesesRelacionamento + 1);

    const diferencaTempo = proximoAniversario - agora;
    const dias = Math.floor(diferencaTempo / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencaTempo % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencaTempo % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencaTempo % (1000 * 60)) / 1000);

    document.getElementById('counter').innerText = `${mesesRelacionamento} meses`;
    document.getElementById('second-counter').innerText = `${dias} dias, ${horas} horas, ${minutos} minutos e ${segundos} segundos até o próximo mês`;
}

function atualizarVideo() {
    const videoElement = document.getElementById('video-background');
    const caminhoBase = ''; // Defina o caminho base do vídeo, se necessário.
    const videoUnico = 'video.mp4'; // Substitua pelo nome do seu vídeo.

    const novoVideoSrc = caminhoBase + videoUnico;

    // Verifica se o vídeo atual já é o correto para evitar recarregamentos desnecessários
    if (!videoElement.src.includes(novoVideoSrc)) {
        videoElement.src = novoVideoSrc;
        videoElement.load();
    }
}

function atualizarTexto() {
    const agora = new Date();
    const elementoTexto = document.getElementById('text-content');

    if (agora.getDate() === 22) {
        elementoTexto.innerHTML = '<p>Você é incrível ❤️</p>';
    } else {
        elementoTexto.innerHTML = '<p>Organizando...</p>';
    }
}

setInterval(() => {
    atualizarContadores();
    atualizarVideo();
    atualizarTexto();
}, 1000);