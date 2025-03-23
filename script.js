
document.addEventListener("DOMContentLoaded", () => {
    const inicioRelacionamento = new Date('2024-08-22T21:20:00');
    const textContent = document.getElementById("text-content");

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
        document.getElementById('second-counter').innerText = `${dias}d ${horas}h ${minutos}m ${segundos}s`;
    }

    function carregarTextoRomantico() {
        fetch("textos.json")
            .then(response => response.json())
            .then(data => {
                const agora = new Date();
                if (agora.getDate() === 22) {
                    const textos = data.textos;
                    const textoAleatorio = textos[Math.floor(Math.random() * textos.length)];
                    textContent.innerText = textoAleatorio;
                } else {
                    textContent.innerText = "";
                }
            })
            .catch(error => console.error("Erro ao carregar os textos:", error));
    }

    setInterval(() => {
        atualizarContadores();
        carregarTextoRomantico();
    }, 1000);

    atualizarContadores();
    carregarTextoRomantico();
});
