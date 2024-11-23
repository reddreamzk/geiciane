const relationshipStart = new Date('2024-08-22T21:20:00');
const secondMonthDate = new Date('2024-10-22T21:20:00');

export function calculateExactMonths(startDate: Date, currentDate: Date): number {
    let months = (currentDate.getFullYear() - startDate.getFullYear()) * 12 + (currentDate.getMonth() - startDate.getMonth());
    if (currentDate.getDate() < startDate.getDate()) {
        months--;
    }
    return months;
}

export function getNextAnniversaryDate(startDate: Date, months: number): Date {
    const nextAnniversary = new Date(startDate);
    nextAnniversary.setMonth(startDate.getMonth() + months);
    return nextAnniversary;
}

export async function loadText(): Promise<string> {
    const response = await fetch('./texts.json');
    const texts = await response.json();
    return texts.porVc;
}

export async function updateCounters(): Promise<void> {
    const now = new Date();
    const relMonths = calculateExactMonths(relationshipStart, now);
    const nextAnniversary = getNextAnniversaryDate(relationshipStart, relMonths + 1);

    const timeDiff = nextAnniversary.getTime() - now.getTime();
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    const counter = document.getElementById('counter')!;
    const secondCounter = document.getElementById('second-counter')!;
    const textContent = document.getElementById('text-content')!;

    counter.textContent = `${relMonths} meses`;
    secondCounter.textContent = `${days} dias, ${hours} horas, ${minutes} minutos e ${seconds} segundos até o próximo mês`;

    if (now >= secondMonthDate) {
        const textDiv = textContent.querySelector('.text')!;
        const text = await loadText();
        textDiv.innerHTML = text;
        textContent.classList.add('show');
    }
}
