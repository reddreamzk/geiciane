const counter = document.getElementById('counter');
const relationshipStart = new Date('2024-08-22T21:20:00');

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

function updateCounter() {
  const now = new Date();
  const relMonths = calculateExactMonths(relationshipStart, now);
  const nextAnniversary = getNextAnniversaryDate(relationshipStart, relMonths + 1);

  const timeDiff = nextAnniversary - now;
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

  counter.innerText = `${relMonths} meses | Próximo mês em: ${days}d ${hours}h ${minutes}m ${seconds}s`;
}

setInterval(updateCounter, 1000);
