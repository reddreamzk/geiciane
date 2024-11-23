const relationshipStart = new Date('2024-08-22T21:20:00');
const secondMonthDate = new Date('2024-10-22T21:20:00');

// Calcula os meses exatos entre duas datas
function calculateExactMonths(startDate, currentDate) {
    let months = (currentDate.getFullYear() - startDate.getFullYear()) * 12 + (currentDate.getMonth() - startDate.getMonth());
    if (currentDate.getDate() < startDate.getDate()) {
        months--;
    }
    return months;
}

// Retorna a data do próximo "mêsversário"
function getNextAnniversaryDate(startDate, months) {
    const nextAnniversary = new Date(startDate);
    nextAnniversary.setMonth(startDate.getMonth() + months);
    return nextAnniversary;
}

// Carrega texto de arquivo externo
async function loadText() {
    try {
        const response = await fetch('./texts.json');
        const data = await response.json();
        return data.porVc; // Chave definida no JSON
    } catch (error) {
        console.error('Erro ao carregar texto:', error);
        return 'Erro ao carregar texto.';
    }
}

// Atualiza os contadores e exibe o texto quando necessário
async function updateCounters() {
    const now = new Date();
    const relMonths = calculateExactMonths(relationshipStart, now);
    const nextAnniversary = getNextAnniversaryDate(relationshipStart, relMonths + 1);

    const timeDiff = nextAnniversary - now;
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    const counter = document.getElementById('counter');
    const secondCounter = document.getElementById('second-counter');
    const textContent = document.getElementById('text-content');
    const textDiv = document.querySelector('.text');

    counter.innerText = `${relMonths} meses`;
    secondCounter.innerText = `${days} dias, ${hours} horas, ${minutes} minutos e ${seconds} segundos até o próximo mês`;

    // Exibe o texto se for o segundo mês
    if (now >= secondMonthDate) {
        if (!textContent.classList.contains('show')) {
            const text = await loadText(); // Busca o texto do arquivo JSON
            textDiv.innerText = text; // Insere o texto no elemento
            textContent.classList.add('show'); // Exibe o texto
        }
    }
}

setInterval(updateCounters, 1000);